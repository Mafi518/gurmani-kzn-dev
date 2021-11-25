<template>
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
    <form action="" class="cart-info" id="cart-info">
      <input
        type="text"
        class="cart-info__promocode"
        id="promocode"
        placeholder="У вас уже есть промокод? Жмите сюда!"
        v-model="promocode_input"
        @input="validatePromocode"
        maxlength="10"
      />
      <div class="cart-info__list">
        <div class="cart-info__item">
          <p class="cart-info__description">Промежуточный итог</p>
          <p class="cart-info__description">
            {{ this.TOTAL_PRICE.toString().slice(0, -2) }} ₽
          </p>
        </div>
        <div class="cart-info__item">
          <p class="cart-info__description">Промокод {{ promocode_input }}</p>
          <p class="cart-info__description">
            {{
              this.DISCOUNT.promocode_type == 1
                ? this.DISCOUNT.total_discount
                : this.DISCOUNT.total_discount + " ₽"
            }}
            <!-- {{
              this.DISCOUNT_CURRENT_PRODUCT
            }} -->
          </p>
        </div>
        <div class="cart-info__item">
          <p class="cart-info__description">Самовывоз</p>
          <p class="cart-info__description">0 ₽</p>
        </div>
        <div class="cart-info__item">
          <p class="cart-info__description" v-if="this.DISCOUNT.error"> {{ this.DISCOUNT.error }} </p>
        </div>
      </div>
      <p class="cart-info__description">
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - -
      </p>
      <button class="buy-btn">
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
export default {
  name: "v-cart",
  data() {
    return {
      promocode_input: "",
      product_id: ""
    };
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
      setTimeout(() => {
        this.GET_DISCOUNT_PRODUCT(this.$store.state.discountProduct)
      }, 700);
      // setTimeout(() => {
      //   this.GET_DISCOUNT_PRODUCT(this.product_id)
      // }, 500);

    },
    // getDisctountProduct() {
    //   this.DISCOUNT_PRODUCT(this.product_id)
    // }
  },
  // watch: {
  //   product_id
  // },
  computed: {
    ...mapGetters(["TOTAL_PRICE", "DISCOUNT", "DISCOUNT_PRODUCT", "DISCOUNT_CURRENT_PRODUCT"]),
    // totalPrice() {

    //   let cart = this.cart_data.map((item) => item.price[1]);

    //   let reducer = (previousValue, currentValue) =>
    //     +previousValue + +currentValue;
    //   let result = cart.reduce(reducer).toString().slice(0, -2)
    //   localStorage.setItem("totalPrice", result)
    //   return result;

    //   // Есть вариант сделать все вычисления в отдельный ключ объекта внутри v-cart-item и оттуда уже складывать стоимость корзины
    // },
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
</style>
