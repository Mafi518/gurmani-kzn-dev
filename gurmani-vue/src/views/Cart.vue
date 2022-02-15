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
    },
    showBarOnScroll() {
      if (document.querySelector(".cart-info")) {
        gsap.to(".cart-info", 0.7, {
          height: "auto",
        });
      }
    },
  },
  computed: {
    ...mapGetters(["CART", "OLD_CART", "PROMOCODES"]),
  },
  mounted() {
    this.reset();
    this.getOldCart();
    this.getPromocodes();
    window.addEventListener("scroll", this.showBarOnScroll);
  },
  watch: {
    active_element: {
      handler() {
        if (
          this.active_element.tagName == "INPUT" &&
          !this.active_element.classList.contains("confirm__radio") &&
          window.innerWidth <= 768
        ) {
          if (
            this.active_element.className.includes("cart-info__promocode-inp")
          ) {
            gsap.to(".cart-info", 0.7, {
              height: "0%",
            });
          } else {
            gsap.to(".cart-info", 0.7, {
              height: "0%",
            });
          }
        } else {
          if (document.querySelector(".cart-info")) {
            gsap.to(".cart-info", 0.7, {
              height: "auto",
            });
          }
        }
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 80vh;
  img {
    margin-bottom: 30px;
  }
  @include h1;
}
</style>
