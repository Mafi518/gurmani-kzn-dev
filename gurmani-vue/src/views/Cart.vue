<template>
  <section class="cart">
    <v-back-menu><h2>Ваш заказ</h2></v-back-menu>
    <v-cart v-if="CART.length" :cart_data="CART"></v-cart>
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
    ...mapActions(["RESET_PRODUCT"]),
    reset() {
      this.RESET_PRODUCT();
    },
  },
  computed: {
    ...mapGetters(["CART"]),
  },
  mounted() {
    this.reset();
  },
};
</script>

<style lang="scss">
.cart {
  padding: 0 20px 20px 20px;
}
.buy-btn {
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
