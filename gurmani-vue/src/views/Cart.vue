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
</style>
