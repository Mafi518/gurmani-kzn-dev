<template>
  <section class="cart" @click="getCurrentEl">
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
import { gsap } from "gsap";

export default {
  components: {
    vCart,
  },
  data() {
    return {
      active_element: "",
    };
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
    getCurrentEl(e) {
      this.active_element = e.target;

      // if (e.target.className)
      console.log(this.active_element.tagName);
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
  watch: {
    active_element: {
      handler() {
        if (
          this.active_element.tagName == "INPUT" && window.innerWidth <= 768
          // this.active_element.className.includes("confirm") ||
          // this.active_element.className.includes("cart-info__promocode-inp")
        ) {
          if (
            this.active_element.className.includes("cart-info__promocode-inp")
          ) {
            gsap.to(".cart-info", {
              transform: "translateY(100%)",
              duration: 0.6,
            });
          } else {
            gsap.to(".cart-info", {
              transform: "translateY(200%)",
              duration: 0.6,
            });
          }
        } else {
          gsap.to(".cart-info", {
            transform: "translateY(0%)",
            duration: 0.6,
          });
        }

        // if (
        //   this.active_element.className.includes("cart-info__promocode-inp")
        // ) {
        //   console.log("promo inp");
        //   gsap.to(".cart-info", {
        //     transform: "translateY(50%)",
        //     duration: 0.6,
        //   });
        // } else {

        //   gsap.to(".cart-info", {
        //     transform: "translateY(0%)",
        //     duration: 0.6,
        //   });
        // }
      },
    },
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
  @include h1;
}
</style>
