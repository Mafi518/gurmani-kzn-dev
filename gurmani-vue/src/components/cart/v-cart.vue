<template>
  <div>
    <v-back-menu
      ><h2>
        {{ confirm_order == false ? "Ваш заказ" : "Продолжаем оформление" }}
      </h2></v-back-menu
    >

    <div>
      <v-cart-item
        v-for="(item, index) in cart_data"
        :key="item.product_id"
        :cart_item_data="item"
        @increment="increment(index)"
        @decrement="decrement(index)"
        @click="check(index)"
      >
      </v-cart-item>
    </div>

    <form v-if="confirm_order == true" action="" class="confirm" id="confirm">
      <div class="confirm__input-wrapper block-input">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          id="name"
          class="confirm__input"
          :class="{ invalid: v$.form.order_name.$error }"
          v-model.trim="form.order_name"
          @input="orderData"
        />
        <span class="form-error" v-if="v$.form.order_name.$error">
          {{ v$.form.order_name.$errors[0].$message }}
        </span>
      </div>
      <div class="confirm__input-wrapper">
        <input
          type="tel"
          name="phone"
          placeholder="Номер телефона"
          id="phone"
          class="confirm__input"
          maxlength="16"
          pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
          :class="{ invalid: v$.form.order_phone.$error }"
          v-model.trim="form.order_phone"
          v-phone
          autocomplete="tel"
          @input="orderData"
        />
        <span class="form-error" v-if="v$.form.order_phone.$error">
          {{ v$.form.order_phone.$errors[0].$message }}
        </span>
      </div>
      <div class="confirm__input-wrapper">
        <select
          name="person"
          id="person"
          class="confirm__input confirm__select"
        >
          <option
            v-for="(item, index) in 11"
            :key="item"
            :value="`Кол-во персон (${index})`"
          >
            {{ index !== 0 ? "Кол-во персон " + index : "" }}
          </option>
        </select>
      </div>
      <div class="confirm__input-wrapper">
        <input
          type="radio"
          name="delivery_type"
          id="delivery"
          class="confirm__radio"
          value="3"
          @click="getDeliveryType"
        />

        <label for="delivery" class="confirm__label confirm__input">
          <v-icon name="delivery-icon"></v-icon>
          Доставка по адресу
        </label>
      </div>
      <div class="confirm__input-wrapper">
        <input
          type="radio"
          name="delivery_type"
          id="pickup"
          class="confirm__radio"
          value="2"
          @click="getDeliveryType"
          checked
        />

        <label for="pickup" class="confirm__label confirm__input">
          <v-icon name="cashless-icon"></v-icon>
          Самовывоз
        </label>
      </div>

      <div class="confirm__input-wrapper block-input">
        <select
          name="pickup-address"
          id="pickup-address"
          readonly
          class="confirm__input confirm__label block-input"
          v-if="this.$store.state.deliveryType == 2"
          @change="pickupTime"
        >
          <option
            v-for="item in SORT_PICKUP_TIME"
            :key="item"
            :value="`Самовывоз ${item}`"
          >
            {{ `Казань, Оренбургский тракт, 8в (${item})` }}
          </option>
        </select>

        <div
          class="confirm__delivery"
          v-if="this.$store.state.deliveryType == 3"
        >
          <div class="confirm__input-wrapper block-input">
            <input
              type="text"
              placeholder="Улица"
              class="confirm__input block-input"
              v-model.trim="form.order_address.search_value"
              @input="searchAddress"
              :class="{ invalid: v$.form.order_address.search_value.$error }"
            />

            <span
              class="form-error"
              v-if="v$.form.order_address.search_value.$error"
            >
              {{ v$.form.order_address.search_value.$errors[0].$message }}
            </span>
          </div>

          <!-- {{ v$.form.search_value.$errors[0].$message }} -->
          <div class="confirm__delivery--spot">
            <input
              type="text"
              placeholder="Дом"
              name="house"
              v-model.trim="form.order_address.house"
              @input="sendAddress2('house', this.form.order_address.house)"
              class="confirm__input"
              maxlength="5"
              :class="{ invalid: v$.form.order_address.house.$error }"
            />
            <input
              type="number"
              placeholder="Квартира"
              v-model.trim="form.order_address.apartment"
              @input="
                sendAddress2('apartment', this.form.order_address.apartment)
              "
              class="confirm__input"
              pattern="[0-9]+"
              :class="{ invalid: v$.form.order_address.apartment.$error }"
            />
            <input
              type="number"
              placeholder="Подъезд"
              v-model.trim="form.order_address.entrance"
              @input="
                sendAddress2('entrance', this.form.order_address.entrance)
              "
              class="confirm__input"
              pattern="[0-9]+"
              :class="{ invalid: v$.form.order_address.entrance.$error }"
            />
            <input
              type="number"
              placeholder="Этаж"
              v-model.trim="form.order_address.floor"
              @input="sendAddress2('floor', this.form.order_address.floor)"
              class="confirm__input"
              pattern="[0-9]+"
              :class="{ invalid: v$.form.order_address.floor.$error }"
            />
          </div>
          <div class="confirm__addresses" v-if="search_flag">
            <div
              class="confirm__address confirm__input block-input"
              v-for="item in CHECK_ADDRESS"
              :key="item.id"
              @click="getSelectAddress(item)"
            >
              {{ item.address }}
            </div>
          </div>
        </div>
      </div>
      <div class="confirm__input-wrapper">
        <input
          type="radio"
          name="payment_type"
          id="cashless"
          class="confirm__radio"
          value="Безнал"
          v-model="form.order_payment_type"
          @click="getPaymentType"
          checked
        />

        <label for="cashless" class="confirm__label confirm__input">
          <v-icon name="credit-card-icon"></v-icon>
          Безналичными
        </label>
      </div>
      <div class="confirm__input-wrapper">
        <input
          type="radio"
          name="payment_type"
          id="cash"
          class="confirm__radio"
          value="Нал"
          @click="getPaymentType"
          v-model="form.order_payment_type"
        />

        <label for="cash" class="confirm__label confirm__input">
          <v-icon name="wallet-icon"></v-icon>
          Наличными
        </label>
      </div>
      <div class="confirm__input-wrapper block-input">
        <input
          type="text"
          name="comment"
          id="comment"
          v-model="form.order_comment"
          placeholder="Комментарий к заказу..."
          class="confirm__input block-input"
          @input="orderData"
        />
      </div>
    </form>

    <form action="" class="cart-info" id="cart-info">
      <input
        type="text"
        class="cart-info__promocode"
        id="promocode"
        placeholder="У вас уже есть промокод? Жмите сюда!"
        v-model.trim="promocode_input"
        @input="validatePromocode"
        maxlength="10"
      />
      <div class="cart-info__list">
        <div class="cart-info__item">
          <p class="cart-info__description">Промежуточный итог</p>
          <p class="cart-info__description">
            {{ this.SUBTOTAL_PRICE.toString().slice(0, -2) }} ₽
          </p>
        </div>
        <div class="cart-info__item">
          <p class="cart-info__description">Промокод {{ promocode_input }}</p>
          <p class="cart-info__description">
            {{
              this.PROMOCODE_TOTAL == 0
                ? this.PROMOCODE_TOTAL + " ₽"
                : typeof this.PROMOCODE_TOTAL == typeof 1
                ? "- " + this.PROMOCODE_TOTAL.toString().slice(0, -2) + " ₽"
                : this.PROMOCODE_TOTAL
            }}
          </p>
        </div>
        <div class="cart-info__item">
          <p class="cart-info__description">
            {{ this.$store.state.deliveryType == 3 ? "Доставка" : "Самовывоз" }}
          </p>
          <p class="cart-info__description">
            {{
              this.DELIVERY_PAY == 0
                ? this.DELIVERY_PAY
                : this.DELIVERY_TYPE == 2 && this.DELIVERY_PAY !== 0
                ? this.DELIVERY_PAY.toString().slice(0, -2)
                : this.DELIVERY_PAY.toString().slice(0, -2)
            }}
            ₽
          </p>
        </div>
        <div class="cart-info__item" v-if="this.WARNING.length !== 0">
          <p class="cart-info__description">
            {{ this.WARNING }}
          </p>
        </div>
        <div class="cart-info__item" v-if="this.ERROR.length !== 0">
          <p class="cart-info__description">
            {{ this.ERROR }}
          </p>
        </div>
      </div>
      <p class="cart-info__description">
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - -
      </p>
      <button class="send-form-btn" @click.prevent="sendOrder">
        <div>
          <p>Перейти к оформлению заказа</p>
          <p>{{ this.TOTAL_PRICE.toString().slice(0, -2) }} ₽</p>
        </div>
        <img src="@/assets/media/icons/plus-icon.svg" alt="" />
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vCartItem from "@/components/cart/v-cart-item";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength, sameAs } from "@vuelidate/validators";

export default {
  name: "v-cart",

  data() {
    return {
      v$: useValidate(),
      form: {
        order_name: "",
        order_phone: "",
        order_address: {
          search_value: "",
          house: "",
          apartment: "",
          entrance: "",
          floor: "",
        },
        order_comment: "",
        order_payment_type: "",
      },
      promocode_input: "",
      product_id: "",
      confirm_order: true,
      search_flag: false,
      pickup_time: "",
      pickup: [
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
        "00:00",
      ],
    };
  },
  validations() {
    if (this.DELIVERY_TYPE == 3) {
      return {
        form: {
          order_name: { required },
          order_phone: { required, minLength: minLength(16) },
          order_address: {
            search_value: {
              sameAs: sameAs(
                this.ADDRESSES.filter(
                  (item) => item.address == this.form.order_address.search_value
                )
                  .map((item) => item.address)
                  .toString()
              ),
              required,
            },
            house: {
              maxLength: maxLength(4),
              minLength: minLength(1),
              required,
            },
            apartment: {
              maxLength: maxLength(4),
              minLength: minLength(1),
              required,
            },
            entrance: {
              maxLength: maxLength(4),
              minLength: minLength(1),
              required,
            },
            floor: {
              maxLength: maxLength(4),
              minLength: minLength(1),
              required,
            },
          },
          order_comment: "",
        },
      };
    } else {
      return {
        form: {
          order_name: { required },
          order_phone: { required, minLength: minLength(16) },
          order_address: {
            street: "",
          },
          order_comment: "",
        },
      };
    }
  },
  components: {
    vCartItem,
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapActions([
      "INCREMENT_POPUP_ITEM",
      "DECREMENT_POPUP_ITEM",
      "TOGGLE_SIZE_OF_PIZZA",
      "VALIDATE_PROMOCODE",
      "GET_DISCOUNT_PRODUCT",
      "GET_DELIVERY_TYPE",
      "CONFIRM_ORDER_DATA",
      "GET_ADDRESSES",
      "GET_ADDRESS",
      "SEND_ORDER",
      "FORM_VALIDATION_ERROR",
      "GET_ADDRESS2",
      "GET_PAYMENT_TYPE",
    ]),
    increment(index) {
      this.INCREMENT_POPUP_ITEM(index);
    },
    decrement(index) {
      this.DECREMENT_POPUP_ITEM(index);
    },
    check(index) {
      localStorage.setItem("cartItem", index);
    },
    validatePromocode() {
      this.VALIDATE_PROMOCODE(this.promocode_input);
      if (this.$store.state.discount.product_id) {
        setTimeout(() => {
          this.GET_DISCOUNT_PRODUCT(this.$store.state.discountProduct);
        }, 1);
      }
    },
    getDeliveryType(e) {
      this.GET_DELIVERY_TYPE(e.target.value);
      this.VALIDATE_PROMOCODE(this.promocode_input);
      this.$store.state.selectAddress = { delivery_pay: 0 };
      this.form.order_address.search_value = "";
    },
    getPaymentType(e) {
      this.GET_PAYMENT_TYPE(e.target.value);
      console.log(e.target.value);
    },
    orderData() {
      this.CONFIRM_ORDER_DATA();
      // console.log(this.order_phone.replace(/[^0-9]/g, ''));
      this.$store.state.order_name = this.form.order_name;
      this.$store.state.order_phone = this.form.order_phone.replace(
        /[^0-9]/g,
        ""
      );
      this.$store.state.order_comment = this.form.order_comment;
    },
    searchAddress() {
      this.search_flag = true;
    },
    getSelectAddress(data) {
      this.GET_ADDRESS(data);
      this.form.order_address.search_value = data.address;
      if (data.address === this.form.order_address.search_value) {
        this.search_flag = false;
      } else {
        this.search_flag = true;
      }
    },
    sendOrder() {
      this.v$.$validate();
      console.log(this.v$.$errors);
      if (!this.v$.$error) {
        console.log("form has been submited");
        // console.log(this.SEND_ORDER(this.ORDER_DATA));
        this.SEND_ORDER(this.ORDER_DATA);
      } else {
        console.log("error");

        if (this.v$.form.order_phone.$errors.length >= 1) {
          this.v$.form.order_phone.$errors[0].$message == "Value is required"
            ? (this.v$.form.order_phone.$errors[0].$message =
                "Поле обязательно для заполнения")
            : this.v$.form.order_phone.$errors[0].$message ==
              "This field should be at least 16 long"
            ? "Заполните поле до конца"
            : "";
        }

        if (this.v$.form.order_name.$errors.length >= 1) {
          this.v$.form.order_name.$errors[0].$message == "Value is required"
            ? (this.v$.form.order_name.$errors[0].$message =
                "Поле обязательно для заполнения")
            : "";
        }

        if (this.v$.form.order_address.search_value.$errors.length >= 1) {
          this.v$.form.order_address.search_value.$errors[0].$message ==
          "Value is required"
            ? (this.v$.form.order_address.search_value.$errors[0].$message =
                "Поле обязательно для заполнения")
            : "";
        }
      }

      // this.SEND_ORDER(this.$store.state.order);
    },
    sendAddress2(key, value) {
      this.GET_ADDRESS2({
        key: key,
        value: value,
      });
    },
    pickupTime(e) {
      this.pickup_time = e.target.value;
      this.orderData();
    },
    sendPickupTime() {
      this.pickup_time == "" && this.$store.state.deliveryType == 2
        ? "Самовывоз " + this.SORT_PICKUP_TIME[0] + " "
        : this.$store.state.deliveryType == 3
        ? ""
        : this.pickup_time + " ";
    },
  },

  computed: {
    ...mapGetters([
      "SUBTOTAL_PRICE",
      "DISCOUNT",
      "DISCOUNT_PRODUCT",
      "DISCOUNT_CURRENT_PRODUCT",
      "DELIVERY_TYPE",
      "ADDRESSES",
      "ADDRESS",
      "TOTAL_PRICE",
      "DELIVERY_PAY",
      "ERROR",
      "CURRENT_TIME",
      "PROMOCODE_TOTAL",
      "WARNING",
      "FORM_ERROR",
      "ORDER_DATA",
    ]),
    CHECK_ADDRESS() {
      if (
        this.$store.state.selectAdresses.filter((elem) =>
          elem.address
            .toLowerCase()
            .includes(this.form.order_address.search_value.toLowerCase())
        )
      ) {
        return this.$store.state.selectAdresses.filter((elem) =>
          elem.address
            .toLowerCase()
            .includes(this.form.order_address.search_value.toLowerCase())
        );
      } else {
        return this.$store.state.selectAddress;
      }
    },

    SORT_PICKUP_TIME() {
      return this.pickup.filter(
        (item) => item > this.$store.state.current_time
      );
    },
  },
  mounted() {
    this.INCREMENT_POPUP_ITEM(0);
    this.DECREMENT_POPUP_ITEM(0);
    this.orderData();
    // this.DELIVERY_TYPE()
    document
      .querySelectorAll('input[name="delivery_type"]:checked')
      .forEach((element) => {
        this.GET_DELIVERY_TYPE(element.attributes.value.nodeValue);
      });
    this.GET_ADDRESSES();
  },
};
</script>
<style lang="scss">
.cart-info {
  @include container;
  min-height: 270px;
  position: fixed;
  bottom: 52px;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__promocode {
    top: -75px;
    position: absolute;
    width: 90vw;
    padding: 24px 10px;
    border: none;
    @include container;
  }
  &__list {
  }
  &__item {
    display: flex;
    justify-content: space-between;
    color: $second-black;
    margin-bottom: 18px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__description {
  }
}
.confirm {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  &__input {
    @include container;
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 14px;
    font-size: 13px;
    border: none;
    outline: none;
    &::placeholder {
      color: $second-black;
    }
    &-wrapper {
      display: flex;
      flex-direction: column;
      max-width: 47%;
      width: 100%;
      margin-bottom: 18px;
    }
  }
  &__select {
    option:first-child {
      display: none;
    }
  }
  &__radio {
    // appearance: none;
    // display: none;
    display: none;
    &:checked + label {
      background-color: $accent;
      color: $white;
      svg {
        path {
          fill: $white;
        }
      }
    }
  }
  &__label {
    color: $second-black;
    padding: 10px 8px;
  }
  &__delivery {
    position: relative;
  }
  &__addresses {
    position: absolute;
    top: 40%;
    @include container;
    box-shadow: none;
    z-index: 1;
    width: 100%;
    max-height: 175px;
    overflow: auto;
  }
  &__address {
    box-shadow: none;
    &:hover {
      border-bottom: 1px solid $accent;
    }
  }
}
.block-input {
  max-width: 100%;
  width: 100%;
}
.radio--active {
  background-color: $accent;
  color: $white;
  svg {
    path {
      fill: $white;
    }
  }
}
.confirm__delivery--spot {
  display: flex;
  justify-content: space-between;
  input {
    max-width: 23%;
    width: 100%;
    text-align: center;
  }
}
.form-error {
  margin-top: 4px;
  white-space: normal;
  color: tomato;
  margin-left: 5px;
  font-size: 12px;
}
.invalid {
  border: 2px solid tomato;
}
.send-form-btn {
  border-radius: 10px;
  background-color: $accent;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  padding: 15px;
  font-family: roboto, sans-serif;
  width: 100%;
  bottom: 64px;
  p {
    text-align: left;
  }
  p:nth-child(1) {
    font-size: 16px;
    margin-bottom: 6px;
  }
  p:nth-child(2) {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
