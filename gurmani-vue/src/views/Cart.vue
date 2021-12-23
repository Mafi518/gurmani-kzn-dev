<template>
  <section class="cart">
    <v-cart v-if="CART.length" :cart_data="CART"></v-cart>
    <div class="cart__empty" v-if="!CART.length">
      <img src="@/assets/media/img/logo.png" alt="" />
      Корзина пуста
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vCart from "@/components/cart/v-cart";

export default {
  components: {
    vCart,
  },
  methods: {
    ...mapActions(["RESET_PRODUCT", "SET_OLD_CART", "GET_PROMOCODES"]),
    reset() {
      this.RESET_PRODUCT();
    },
    getOldCart() {
      if (this.CART.length <= 0) {
        this.SET_OLD_CART(localStorage.getItem("cart"));
      }
    },
    getPromocodes() {
      this.GET_PROMOCODES();
    },
  },
  computed: {
    ...mapGetters(["CART", "OLD_CART", "PROMOCODES", "TOTAL_PRICE"]),
  },
  mounted() {
    this.reset();
    this.getOldCart();
    this.getPromocodes();
  },
};
</script>

<style lang="scss">
.cart {
  padding: 0 20px 20px 20px;
  padding-bottom: 350px;
  width: 100%;
  min-height: 100vh;
}
.cart__empty {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
  img {
    margin-bottom: 30px;
  }
  font-size: 16px;
}
</style>
