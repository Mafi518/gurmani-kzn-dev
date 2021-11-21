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
      />
      <div class="cart-info__list">
        <div class="cart-info__item">
          <p class="cart-info__description">Промежуточный итог</p>
          <p class="cart-info__description">0 ₽</p>
        </div>
        <div class="cart-info__item">
          <p class="cart-info__description">Промокод</p>
          <p class="cart-info__description">0 ₽</p>
        </div>
        <div class="cart-info__item">
          <p class="cart-info__description">Самовывоз</p>
          <p class="cart-info__description">0 ₽</p>
        </div>
      </div>
      <p>
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
        - - - - - - - - - - - - - - -
      </p>
      <button class="buy-btn">
        <div>
          <p>Перейти к оформлению заказа</p>
          <p>{{ totalPrice }}</p>
        </div>
        <img src="@/assets/media/icons/plus-icon.svg" alt="" />
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import vCartItem from "@/components/cart/v-cart-item";
export default {
  name: "v-cart",
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
  },
  computed: {
    totalPrice() {
      let cart = this.cart_data.map((item) => item);

      console.log(cart.map(item => item.product_name));
      // let reducer = (previousValue, currentValue) =>
      //   +previousValue + +currentValue;
      // return cart.reduce(reducer);
      return 1

      // Есть вариант сделать все вычисления в отдельный ключ объекта внутри v-cart-item и оттуда уже складывать стоимость корзины
    },
    // modificationPrice() {
    //   if (this.cart_data.product_name.includes("Пицца")) {
    //     let checkedModification =
    //       this.cart_data.group_modifications.filter(
    //         (mode) => mode.checked == true
    //       );
    //     return (
    //       this.cart_data.count *
    //         checkedModification[0].modifications.map((mode) => mode.price) -
    //       this.cart_data.price[1].slice(0, -2) * this.cart_data.count
    //     );
    //   } else {
    //     let array = this.cart_data.group_modifications.map(
    //       (mode) => mode.count * mode.modifications.map((modif) => modif.price)
    //     );
    //     let reducer = (previousValue, currentValue) =>
    //       previousValue + currentValue;
    //     return array.reduce(reducer);
    //   }
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
