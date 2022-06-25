<template>
  <!-- <button @click.prevent="sendOrder">DDDDDDDDDDDDDDDDDDDDDDDDDD</button> -->

  <div class="cart__parent" v-if="this.clientWidth <= 1024">
    <v-back-menu>
      <v-back-btn v-if="this.confirm_order == false" :to="`/`"></v-back-btn>

      <button
        class="cart-back-btn"
        v-if="this.confirm_order == true"
        @click.prevent="this.confirm_order = false"
      >
        <v-icon name="back-icon"></v-icon>
      </button>

      <h2 class="cart__back-title">
        {{ confirm_order == false ? "Ваш заказ" : "Продолжаем оформление" }}
      </h2></v-back-menu
    >
    <div class="cart__desktop">
      <div class="cart__container" v-if="this.confirm_order == false">
        <div class="cart__list" style="padding-bottom: 140px">
          <transition-group appear @before-enter="beforeEnter" @enter="enter">
            <v-cart-item
              v-for="item in cart_data"
              :key="item.id"
              :cart_item_data="item"
              @increment="increment"
              @decrement="decrement"
              @toggleSize="toggleSize"
            >
            </v-cart-item>
          </transition-group>
        </div>
      </div>

      <div class="cart__confirm">
        <transition name="confirm" mode="out-in">
          <form
            action=""
            class="confirm confrim__mobileFix"
            :class="{ confirm__support: this.confirm_order == true }"
            id="confirm"
          >
            <div class="confirm__input-wrapper block-input">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                id="name"
                class="confirm__input"
                v-model.trim="form.order_name"
                :class="{ invalid: v$.form.order_name.$error }"
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
                v-phone
                autocomplete="tel"
                :class="{ invalid: v$.form.order_phone.$error }"
                v-model.trim="form.order_phone"
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
                @change="sendCutleryCount"
              >
                <option
                  v-for="(item, index) in 11"
                  :key="item"
                  :value="`Приборы ${index}`"
                >
                  {{ "Кол-во персон " + index }}
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
                checked
                @click="vue_fix(), setOrderType('delivery')"
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
                @click="vue_fix(), setOrderType('pickup')"
              />

              <label for="pickup" class="confirm__label confirm__input">
                <v-icon name="cashless-icon"></v-icon>
                Самовывоз
                <span
                  class="confirm__percent"
                  :class="{
                    confirm__percentActive:
                      this.CART_DATA.delivery.type == 'pickup',
                  }"
                  >-10%</span
                >
              </label>
            </div>

            <div class="confirm__input-wrapper block-input">
              <select
                name="pickup-address"
                id="pickup-address"
                readonly
                class="confirm__input confirm__label block-input"
                v-if="this.CART_DATA.delivery.type == 'pickup'"
                @change="sendPickupTime"
              >
                <option
                  v-for="item in SORT_PICKUP_TIME"
                  :key="item"
                  :value="`Сам-з ${item}`"
                >
                  {{ item }}
                </option>
              </select>

              <div
                class="confirm__delivery"
                v-if="this.CART_DATA.delivery.type == 'delivery'"
              >
                <div class="confirm__input-wrapper block-input">
                  <input
                    type="text"
                    placeholder="Улица"
                    class="confirm__input block-input"
                    v-model.trim="form.order_address.search_value"
                    @input="searchAddress"
                    :class="{
                      invalid: v$.form.order_address.search_value.$error,
                    }"
                  />

                  <span
                    class="form-error"
                    v-if="v$.form.order_address.search_value.$error"
                  >
                    {{
                      v$.form.order_address.search_value.$errors[0].$message ==
                      `The value must be equal to the other value`
                        ? `Выберите ближайшую улицу и укажите ваш адрес в комментариях`
                        : v$.form.order_address.search_value.$errors[0]
                            .$message == `Value is required`
                        ? `Выберите адрес из списка`
                        : v$.form.order_address.search_value.$errors[0].$message
                    }}
                  </span>
                </div>

                <div class="confirm__delivery--spot">
                  <input
                    type="text"
                    placeholder="Дом"
                    name="house"
                    v-model.trim="form.order_address.house"
                    class="confirm__input"
                    maxlength="5"
                    :class="{ invalid: v$.form.order_address.house.$error }"
                  />
                  <input
                    type="number"
                    placeholder="Квартира"
                    v-model.trim="form.order_address.apartment"
                    class="confirm__input"
                    pattern="[0-9]+"
                    :class="{ invalid: v$.form.order_address.apartment.$error }"
                  />
                  <input
                    type="number"
                    placeholder="Подъезд"
                    v-model.trim="form.order_address.entrance"
                    class="confirm__input"
                    pattern="[0-9]+"
                    :class="{ invalid: v$.form.order_address.entrance.$error }"
                  />
                  <input
                    type="number"
                    placeholder="Этаж"
                    v-model.trim="form.order_address.floor"
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
            <div class="cart-info__promocode">
              <input
                type="text"
                class="cart-info__promocode-inp"
                id="promocode"
                placeholder="Есть промокод? Жми сюда!"
                v-model.trim="promocode_input"
                @input="apply_promo(this.promocode_input), vue_fix()"
                maxlength="10"
              />
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
        </transition>

        <form
          action=""
          class="cart-info"
          :class="{ 'cart-info--mobile': this.confirm_order == true }"
          id="cart-info"
        >
          <div class="cart-info__list">
            <div class="cart-info__item">
              <p class="cart-info__description">Промежуточный итог</p>
              <p class="cart-info__description">
                {{ this.CART_DATA.subtotal }} ₽
              </p>
            </div>

            <div class="cart-info__item" v-if="this.confirm_order == true">
              <p class="cart-info__description">
                Промокод {{ promocode_input }}
              </p>
              <p class="cart-info__description">
                {{
                  this.CART_DATA.discount.type == "product" &&
                  this.CART_DATA.discount.success == true
                    ? this.CART_DATA.discount.discount_product
                    : "- " + this.CART_DATA.discount.total + " ₽"
                }}
              </p>
            </div>

            <div class="cart-info__item" v-if="this.confirm_order == true">
              <p class="cart-info__description">
                {{
                  this.CART_DATA.delivery.type == "delivery"
                    ? "Доставка"
                    : "Самовывоз"
                }}
              </p>
              <p class="cart-info__description">
                {{
                  this.CART_DATA.delivery.pay_per_delivery == false
                    ? "- " + this.CART_DATA.delivery.pay
                    : this.CART_DATA.delivery.pay
                }}
                ₽
              </p>
            </div>

            <div class="cart-info__item" v-if="this.WARNING !== 0">
              <p class="cart-info__description" ref="warning">
                {{ this.WARNING }}
              </p>
            </div>
            <div class="cart-info__item" v-if="this.ERROR !== 0">
              <p class="cart-info__description">
                {{ this.ERROR }}
              </p>
            </div>
          </div>
          <p class="cart-info__description cart-info__dashes">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </p>
          <router-link class="cart-info__policy" to="/privacy"
            >Политика конфиденциальности</router-link
          >
          <button
            class="send-form-btn"
            @click.prevent="sendOrder"
            ref="sendOrderBtn"
          >
            <div>
              <p>
                {{
                  this.confirm_order == false
                    ? `Перейти к оформлению`
                    : `Оформить`
                }}
              </p>
              <p>{{ this.CART_DATA.total }} ₽</p>
            </div>
            <img src="@/assets/media/icons/plus-icon.svg" alt="" />
          </button>
        </form>
      </div>
    </div>
  </div>
  <div class="cart__parent" v-else>
    <v-back-menu>
      <v-back-btn :to="`/`"></v-back-btn>

      <h2 class="cart__back-title">
        {{ confirm_order == false ? "Ваш заказ" : "Продолжаем оформление" }}
      </h2></v-back-menu
    >
    <div class="cart__desktop" v-if="this.confirm_order == false">
      <div class="cart__container">
        <div class="cart__list">
          <transition-group appear @before-enter="beforeEnter" @enter="enter">
            <v-cart-item
              v-for="item in cart_data"
              :key="item.id"
              :cart_item_data="item"
              @increment="increment"
              @decrement="decrement"
              @toggleSize="toggleSize"
            >
            </v-cart-item>
          </transition-group>
        </div>
      </div>

      <div class="cart__confirm">
        <transition name="confirm" mode="out-in">
          <form action="" class="confirm" id="confirm">
            <div class="confirm__input-wrapper block-input">
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                id="name"
                class="confirm__input"
                v-model.trim="form.order_name"
                :class="{ invalid: v$.form.order_name.$error }"
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
                v-phone
                autocomplete="tel"
                :class="{ invalid: v$.form.order_phone.$error }"
                v-model.trim="form.order_phone"
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
                @change="sendCutleryCount"
              >
                <option
                  v-for="(item, index) in 11"
                  :key="item"
                  :value="`Приборы ${index}`"
                >
                  {{ "Кол-во персон " + index }}
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
                checked
                @click="vue_fix(), setOrderType('delivery')"
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
                @click="vue_fix(), setOrderType('pickup')"
              />

              <label for="pickup" class="confirm__label confirm__input">
                <v-icon name="cashless-icon"></v-icon>
                Самовывоз
                <span
                  class="confirm__percent"
                  :class="{
                    confirm__percentActive:
                      this.CART_DATA.delivery.type == 'pickup',
                  }"
                  >-10%</span
                >
              </label>
            </div>

            <div class="confirm__input-wrapper block-input">
              <select
                name="pickup-address"
                id="pickup-address"
                readonly
                class="confirm__input confirm__label block-input"
                v-if="this.CART_DATA.delivery.type == 'pickup'"
                @change="sendPickupTime"
              >
                <option
                  v-for="item in SORT_PICKUP_TIME"
                  :key="item"
                  :value="`Сам-з ${item}`"
                >
                  {{ item }}
                </option>
              </select>

              <div
                class="confirm__delivery"
                v-if="this.CART_DATA.delivery.type == 'delivery'"
              >
                <div class="confirm__input-wrapper block-input">
                  <input
                    type="text"
                    placeholder="Улица"
                    class="confirm__input block-input"
                    v-model.trim="form.order_address.search_value"
                    @input="searchAddress"
                    :class="{
                      invalid: v$.form.order_address.search_value.$error,
                    }"
                  />

                  <span
                    class="form-error"
                    v-if="v$.form.order_address.search_value.$error"
                  >
                    {{
                      v$.form.order_address.search_value.$errors[0].$message ==
                      `The value must be equal to the other value`
                        ? `Выберите ближайшую улицу и укажите ваш адрес в комментариях`
                        : v$.form.order_address.search_value.$errors[0]
                            .$message == `Value is required`
                        ? `Выберите адрес из списка`
                        : v$.form.order_address.search_value.$errors[0].$message
                    }}
                  </span>
                </div>

                <div class="confirm__delivery--spot">
                  <input
                    type="text"
                    placeholder="Дом"
                    name="house"
                    v-model.trim="form.order_address.house"
                    class="confirm__input"
                    maxlength="5"
                    :class="{ invalid: v$.form.order_address.house.$error }"
                  />
                  <input
                    type="number"
                    placeholder="Квартира"
                    v-model.trim="form.order_address.apartment"
                    class="confirm__input"
                    pattern="[0-9]+"
                    :class="{ invalid: v$.form.order_address.apartment.$error }"
                  />
                  <input
                    type="number"
                    placeholder="Подъезд"
                    v-model.trim="form.order_address.entrance"
                    class="confirm__input"
                    pattern="[0-9]+"
                    :class="{ invalid: v$.form.order_address.entrance.$error }"
                  />
                  <input
                    type="number"
                    placeholder="Этаж"
                    v-model.trim="form.order_address.floor"
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
            <div class="cart-info__promocode">
              <input
                type="text"
                class="cart-info__promocode-inp"
                id="promocode"
                placeholder="Есть промокод? Жми сюда!"
                v-model.trim="promocode_input"
                @input="apply_promo(this.promocode_input), vue_fix()"
                maxlength="10"
              />
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
        </transition>

        <form action="" class="cart-info" id="cart-info">
          <div class="cart-info__list">
            <div class="cart-info__item">
              <p class="cart-info__description">Промежуточный итог</p>
              <p class="cart-info__description">
                {{ this.CART_DATA.subtotal }} ₽
              </p>
            </div>

            <div class="cart-info__item">
              <p class="cart-info__description">
                Промокод {{ promocode_input }}
              </p>
              <p class="cart-info__description">
                {{
                  this.CART_DATA.discount.type == "product" &&
                  this.CART_DATA.discount.success == true
                    ? this.CART_DATA.discount.discount_product
                    : "- " + this.CART_DATA.discount.total + " ₽"
                }}
              </p>
            </div>

            <div class="cart-info__item">
              <p class="cart-info__description">
                {{
                  this.CART_DATA.delivery.type == "delivery"
                    ? "Доставка"
                    : "Самовывоз"
                }}
              </p>
              <p class="cart-info__description">
                {{
                  this.CART_DATA.delivery.pay_per_delivery == false
                    ? "- " + this.CART_DATA.delivery.pay
                    : this.CART_DATA.delivery.pay
                }}
                ₽
              </p>
            </div>

            <div class="cart-info__item" v-if="this.WARNING !== 0">
              <p class="cart-info__description" ref="warning">
                {{ this.WARNING }}
              </p>
            </div>
            <div class="cart-info__item" v-if="this.ERROR !== 0">
              <p class="cart-info__description">
                {{ this.ERROR }}
              </p>
            </div>
          </div>
          <p class="cart-info__description cart-info__dashes">
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          </p>
          <router-link class="cart-info__policy" to="/privacy"
            >Политика конфиденциальности</router-link
          >
          <button
            class="send-form-btn"
            @click.prevent="sendOrder"
            ref="sendOrderBtn"
          >
            <div>
              <p>
                {{
                  this.confirm_order == false
                    ? `Перейти к оформлению`
                    : `Оформить`
                }}
              </p>
              <p>{{ this.CART_DATA.total }} ₽</p>
            </div>
            <img src="@/assets/media/icons/plus-icon.svg" alt="" />
          </button>
        </form>
      </div>
    </div>
  </div>

  <v-preloader v-if="this.preloader == true">Отправляю заказ</v-preloader>
  <v-pickup-popup
    @sendFrontpadOrder="sendFrontpadOrder"
    @togglePickupPopup="togglePickupPopup"
    v-if="this.pickup_popup == true"
  ></v-pickup-popup>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import vCartItem from "@/components/cart/v-cart-item";
import useValidate from "@vuelidate/core";
import { required, minLength, maxLength, sameAs } from "@vuelidate/validators";
import { gsap } from "gsap";

export default {
  name: "v-cart",
  data() {
    return {
      v$: useValidate(),
      form: {
        order_name: "",
        order_phone: "",
        order_pickup: "",
        order_cutlery: 0,
        order_address: {
          search_value: "",
          house: "",
          apartment: "",
          entrance: "",
          floor: "",
        },
        order_comment: "",
        order_payment_type: "Безнал",
      },
      clientWidth: window.innerWidth,
      active_element: "",
      preloader: false,
      pickup_popup: false,
      promocode_input: "",
      choosen_cutlery_count: 0,
      product_id: "",
      confirm_order: false,
      search_flag: false,
      pickup_time: "",
      order_btn: "",
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
      ],
    };
  },
  validations() {
    sameAs;
    if (this.CART_DATA.delivery.type == "delivery") {
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
              maxLength: maxLength(8),
              minLength: minLength(1),
              required,
            },
            apartment: {
              maxLength: maxLength(4),
              minLength: minLength(1),
              required,
            },
            entrance: {
              maxLength: maxLength(2),
              minLength: minLength(1),
              required,
            },
            floor: {
              maxLength: maxLength(2),
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
      "INCREMENT",
      "DECREMENT",
      "TOGGLE_SIZE_OF_PIZZA",
      "TOTAL_PRICE",
      "DELIVERY_TYPE",
      "GET_ADDRESSES",
      "GET_ADDRESS",
      "GET_PROMOCODES",
      "APPLY_PROMOCODE",
      "GET_ORDER_DATA",
      "SEND_ORDER_DATA",
      "ADD_TO_CART",
      "SEND_ORDER_DATA_TO_FRONTPAD",
    ]),
    increment(data) {
      this.INCREMENT(data);
      this.TOTAL_PRICE(data);
    },
    decrement(data) {
      this.DECREMENT(data);
      this.TOTAL_PRICE(data);
    },
    toggleSize(data) {
      console.log(data);
      this.TOGGLE_SIZE_OF_PIZZA(data);
      this.TOTAL_PRICE(data.PRODUCT_INFO);
    },
    setOrderType(data) {
      this.DELIVERY_TYPE(data);
    },
    async orderData() {
      await this.GET_ORDER_DATA(this.form);
    },
    async sendOrder() {
      if (this.confirm_order == false && this.clientWidth <= 1024) {
        this.confirm_order = true;
      } else {
        this.v$.$validate();
        if (!this.v$.$error && this.$store.state.error == "") {
          if (this.CART_DATA.delivery.type == "pickup") {
            this.pickup_popup = true;
            await this.GET_ORDER_DATA(this.form);
          } else {
            this.preloader = true;
            this.$refs.sendOrderBtn.disabled = true;
            await this.GET_ORDER_DATA(this.form);
            await this.SEND_ORDER_DATA(this.ORDER);
            await this.SEND_ORDER_DATA_TO_FRONTPAD(this.FRONTPAD_ORDER);
            this.$refs.sendOrderBtn.disabled = false;
            this.preloader = false;
            this.$router.push("/thx");
          }
        } else {
          window.scrollBy(0, -300);
          if (this.v$.form.order_phone.$errors.length) {
            this.v$.form.order_phone.$errors[0].$message == "Value is required"
              ? (this.v$.form.order_phone.$errors[0].$message =
                  "Телефон должен состоять из 11 цифр")
              : "";
          }

          if (this.v$.form.order_name.$errors.length) {
            this.v$.form.order_name.$errors[0].$message == "Value is required"
              ? (this.v$.form.order_name.$errors[0].$message =
                  "Поле обязательно для заполнения")
              : "";
          }

          if (this.v$.form.order_address.search_value.$errors.length) {
            switch (
              this.v$.form.order_address.search_value.$errors[0].$validator
            ) {
              case "required":
                this.v$.form.order_address.search_value.$errors[0].$message =
                  "Выберите адрес из списка";
                break;
              default:
                break;
            }
          }
        }
      }
    },
    async sendFrontpadOrder() {
      this.preloader = true;
      this.$refs.sendOrderBtn.disabled = true;
      await this.GET_ORDER_DATA(this.form);
      await this.SEND_ORDER_DATA(this.ORDER);
      await this.SEND_ORDER_DATA_TO_FRONTPAD(this.FRONTPAD_ORDER);
      this.$refs.sendOrderBtn.disabled = false;
      this.preloader = false;
      this.$router.push("/thx");
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
    sendPickupTime(e) {
      this.form.order_pickup = e.target.value;
    },
    sendCutleryCount(e) {
      this.form.order_cutlery = e.target.value;
    },
    setPromo() {
      if (localStorage.getItem("setPromo")) {
        console.log("promoset");
        setTimeout(() => {
          this.promocode_input = localStorage.getItem("setPromo");
          this.apply_promo(this.promocode_input);
          localStorage.removeItem("setPromo");
        }, 400);
      }
    },
    apply_promo(data) {
      let sake = {
        id: 141,
        name: "Сяке Хот за 230р",
        price: 230,
        fixed_price: 230,
        total_price: 230,
        weight: 180,
        calory: 320,
        ingredients: [
          {
            name: "Лосось",
          },
          {
            name: "Огурцы",
          },
          {
            name: "Сливочный сыр",
          },
          {
            name: "Рис",
          },
          {
            name: "Кунжут Белый",
          },
        ],
        category_id: 4,
        count: 1,
        favorites: "false",
        description: "Лосось, сливочный сыр, рис, унаги, кунжут",
        category_name: "Жаренные роллы",
        modifications: [
          {
            name: "Соевый соус",
            modification: true,
            price: 25,
            fixed_price: 25,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Васаби",
            modification: true,
            price: 10,
            fixed_price: 10,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Имбирь",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Унаги",
            modification: true,
            price: 40,
            fixed_price: 40,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Огурец",
            modification: true,
            price: 15,
            fixed_price: 15,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Авокадо",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Халапеньо",
            modification: true,
            price: 30,
            fixed_price: 30,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Спайс",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Цезарь",
            modification: true,
            price: 30,
            fixed_price: 30,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
        ],
        image: "",
      };
      let gift_roll = {
        id: 213,
        name: "Маки с курицей",
        price: 0,
        fixed_price: 0,
        total_price: 0,
        weight: 110,
        calory: 310,
        stock: true,
        ingredients: [
          {
            name: "Лосось",
          },
          {
            name: "Рис",
          },
        ],
        category_id: 6,
        count: 1,
        favorites: "false",
        description: "Лосось, рис",
        category_name: "Маки и Суши",
        modifications: [
          {
            name: "Соевый соус",
            modification: true,
            price: 25,
            fixed_price: 25,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Васаби",
            modification: true,
            price: 10,
            fixed_price: 10,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Имбирь",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Унаги",
            modification: true,
            price: 40,
            fixed_price: 40,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Огурец",
            modification: true,
            price: 15,
            fixed_price: 15,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Авокадо",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Халапеньо",
            modification: true,
            price: 30,
            fixed_price: 30,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Спайс",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Цезарь",
            modification: true,
            price: 30,
            fixed_price: 30,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
        ],
        image: "",
      };
      let set_mini = {
        id: 555,
        name: "Сет мини за 405р",
        price: 405,
        fixed_price: 405,
        total_price: 405,
        weight: 110,
        calory: 310,
        ingredients: [
          {
            name: "Лосось",
          },
          {
            name: "Рис",
          },
        ],
        category_id: 6,
        count: 1,
        favorites: "false",
        description: "Лосось, рис",
        category_name: "Маки и Суши",
        modifications: [
          {
            name: "Соевый соус",
            modification: true,
            price: 25,
            fixed_price: 25,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Васаби",
            modification: true,
            price: 10,
            fixed_price: 10,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Имбирь",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Унаги",
            modification: true,
            price: 40,
            fixed_price: 40,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Огурец",
            modification: true,
            price: 15,
            fixed_price: 15,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Авокадо",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Халапеньо",
            modification: true,
            price: 30,
            fixed_price: 30,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Спайс",
            modification: true,
            price: 20,
            fixed_price: 20,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
          {
            name: "Соус Цезарь",
            modification: true,
            price: 30,
            fixed_price: 30,
            count: 0,
            image: "soi-sauce",
            selected: false,
            required: false,
          },
        ],
        image: "",
      };

      if (data.toLowerCase() == "mini") {
        this.ADD_TO_CART(set_mini);
        this.TOTAL_PRICE(set_mini);
      } else if (data.toLowerCase() !== "mini") {
        if (
          this.CART.filter((item) => item.name == "Сет мини за 405р").length
        ) {
          this.decrement(
            this.CART.filter((item) => item.name == "Сет мини за 405р")[0]
          );
        }
      }
      if (data.toLowerCase() == "сяке") {
        this.ADD_TO_CART(sake);
        this.TOTAL_PRICE(sake);
      } else if (data.toLowerCase() !== "сяке") {
        if (
          this.CART.filter((item) => item.name == "Сяке Хот за 230р").length
        ) {
          this.decrement(
            this.CART.filter((item) => item.name == "Сяке Хот за 230р")[0]
          );
        }
      }
      if (data.toLowerCase() == "700") {
        this.ADD_TO_CART(gift_roll);
        this.TOTAL_PRICE(gift_roll);
      } else if (data.toLowerCase() !== "700") {
        if (
          this.CART.filter((item) => item.name == "Маки с лососем в подарок")
            .length
        ) {
          this.decrement(
            this.CART.filter(
              (item) => item.name == "Маки с лососем в подарок"
            )[0]
          );
        }
      }
      this.APPLY_PROMOCODE(data);
    },
    vue_fix() {
      let fix_item = this.CART[0];
      this.form.order_address.search_value = "";

      this.increment(fix_item);
      this.decrement(fix_item);
    },
    togglePickupPopup() {
      if (this.pickup_popup == true) {
        this.pickup_popup = false;
      } else {
        this.pickup_popup = true;
      }
    },
  },
  computed: {
    ...mapGetters([
      "CART_DATA",
      "WARNING",
      "ERROR",
      "ADDRESSES",
      "ORDER",
      "CART",
      "FRONTPAD_ORDER",
    ]),
    CHECK_ADDRESS() {
      if (
        this.ADDRESSES.filter((elem) =>
          elem.address
            .toLowerCase()
            .includes(this.form.order_address.search_value.toLowerCase())
        )
      ) {
        return this.ADDRESSES.filter((elem) =>
          elem.address
            .toLowerCase()
            .includes(this.form.order_address.search_value.toLowerCase())
        );
      } else {
        return "";
      }
    },
    SORT_PICKUP_TIME() {
      let curr_hour = new Date().getHours();
      let pickup = this.pickup.filter((item) => {
        return +item.substr(0, 2) >= curr_hour;
      });

      return pickup.slice(1, -1);
    },
  },
  watch: {
    form: {
      handler() {
        if (!this.v$.$error) {
          this.$refs.sendOrderBtn.disabled = false;
        }
      },
      deep: true,
    },
  },
  mounted() {
    this.GET_ADDRESSES();
    // console.log(this.ADDRESSES.filter(item => item.affilate == null));
    this.GET_PROMOCODES();
    this.form.order_pickup = "Сам-з " + this.SORT_PICKUP_TIME[0];
    this.setPromo();
  },
  setup() {
    const beforeEnter = (el) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(15px)";
    };
    const enter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        delay: el.dataset.index * 0.2,
        onComplete: done,
      });
    };

    return { beforeEnter, enter };
  },
};
</script>
<style lang="scss">
.cart-info {
  @include container;
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  z-index: 2;
  padding: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  &--mobile {
    position: static;
  }
  &__policy {
    text-align: center;
    text-decoration: underline;
    margin: 8px 0;
  }
  &__promocode {
    top: -75px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    position: absolute;
    width: 85%;
    margin-bottom: 18px;
    &-inp {
      width: 100%;
      padding: 14px 10px;
      border: none;
      @include container;
    }
    &:before {
      content: "%";
      color: $white;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      position: absolute;
      right: 0;
      top: 50%;
      -webkit-transform: translate(-10px, -50%);
      -ms-transform: translate(-10px, -50%);
      transform: translate(-10px, -50%);
      font-size: 18px;
      border-radius: 10px;
      right: 0;
      width: 30px;
      height: 30px;
      background-color: $accent;
    }
  }
  &__dashes {
    white-space: nowrap;
    -o-text-overflow: clip;
    text-overflow: clip;
    overflow: hidden;
    min-height: 17px;
  }
  &__item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 30px;
  &__percent {
    margin-left: 6px;
    color: tomato;
    font-weight: bold;
  }
  &__input {
    @include container;
    position: relative;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 14px;
    font-size: 13px;
    border: none;
    outline: none;
    &::-webkit-input-placeholder {
      color: $second-black;
    }
    &::-moz-placeholder {
      color: $second-black;
    }
    &:-ms-input-placeholder {
      color: $second-black;
    }
    &::-ms-input-placeholder {
      color: $second-black;
    }
    &::placeholder {
      color: $second-black;
    }
    &-wrapper {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      max-width: 47%;
      width: 100%;
      margin-bottom: 18px;
    }
  }
  &__radio {
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
    cursor: pointer;
  }
  &__delivery {
    position: relative;
  }
  &__addresses {
    position: absolute;
    top: 40%;
    @include container;
    -webkit-box-shadow: none;
    box-shadow: none;
    z-index: 1;
    width: 100%;
    max-height: 175px;
    overflow: auto;
  }
  &__address {
    -webkit-box-shadow: none;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 76px;
  padding: 15px;
  font-family: roboto, sans-serif;
  width: 100%;
  bottom: 64px;
  cursor: pointer;
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
.cart__back-title {
  @include h2;
  width: 100%;
  text-align: center;
  margin-bottom: 0;
}
.confirm-enter-from,
.confirm-leave-to {
  opacity: 0;
}

.confirm-enter-active,
.confirm-leave-active {
  -webkit-transition: opacity 0.2s ease-out;
  -o-transition: opacity 0.2s ease-out;
  transition: opacity 0.2s ease-out;
}
.cart-back-btn {
  @include shadow;
  min-width: 38px;
  height: 38px;
  background-color: $white;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.confirm__percentActive {
  color: $white;
}

.confrim__mobileFix {
  height: 0;
  overflow: hidden;
}
.confirm__support {
  height: auto;
}

@media (max-width: 1920px) and (min-width: 1025px) {
  .cart {
    padding-bottom: 0 !important;

    &__desktop {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
    }

    &__container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      width: 100%;
    }

    &__list {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      margin-right: 30px;
    }

    &__item {
      max-width: 100%;
      width: 100%;

      &-img {
        max-width: 162px;
        max-height: 107px;
      }

      &-image {
        max-width: 162px;
        max-height: 107px;
      }
    }

    &__confirm {
      max-width: 430px;
    }
  }

  .cart-info {
    position: static;

    &__promocode {
      position: relative;
      width: 100%;
      margin-bottom: 18px;
      top: initial;
    }

    &__promocode-inp {
      width: 100%;
    }
  }
}
@media (max-width: 1025px) and (min-width: 1px) {
  .cart-info {
    &__promocode {
      top: initial;
      left: initial;
      transform: initial;
      position: relative;
      width: 100%;
    }
  }
}
</style>
