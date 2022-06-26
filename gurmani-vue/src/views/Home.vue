<template>
  <section class="home">
    <v-preloader
      v-if="preloader == true"
      :preloader_props="preloader_props"
    ></v-preloader>
    <v-banner-list></v-banner-list>
    <v-category-list>Меню</v-category-list>
    <v-column-banner-list></v-column-banner-list>
    <v-popular-list></v-popular-list>
    <transition name="popup" mode="out-in">
      <v-product-popup v-if="PRODUCT_INFO.name"></v-product-popup>
    </transition>
    <v-footer>
      <div class="footer__payments">
        <img
          class="footer__payment"
          src="@/assets/media/img/mastercard.png"
          alt=""
        />
        <img class="footer__payment" src="@/assets/media/img/sber.png" alt="" />
        <img class="footer__payment" src="@/assets/media/img/visa.png" alt="" />
      </div>
    </v-footer>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vBannerList from "@/components/banners/v-banner-list";
import vColumnBannerList from "@/components/column_banners/v-banner-list";
import vCategoryList from "@/components/categories/v-category-list";
import vPopularList from "@/components/populars/v-popular-list";

export default {
  name: "Home",
  data() {
    return {
      clientWidth: 0,
      preloader: false,
      preloader_props: {
        bgColor: "#F5F5F7",
        subtitle: `Море вкуса для тебя`,
        subtitleColor: "#000",
        circleColor: "#FF6800",
        homePage: true,
      },
    };
  },
  components: {
    vBannerList,
    vCategoryList,
    vPopularList,
    vColumnBannerList,
  },
  methods: {
    ...mapActions(["GET_POPULARS_FROM_API", "SET_SAVED_FAVORITES"]),
    async getFavorites() {
      if (this.FAVORITES.length <= 0) {
        this.SET_SAVED_FAVORITES(localStorage.getItem("SAVED_FAVORITES"));
      }
    },
    getLogoPosition() {
      let el = document.querySelector(".header__logo").getBoundingClientRect();
      return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY,
        width: el.width,
        height: el.height,
      };
    },
    async animateLogoPosition() {
      if ((this.CATEGORIES.length, this.POPULARS.length)) {
        this.preloader = false;
      } else {
        // this.preloader = true;
        await this.GET_POPULARS_FROM_API();
        // this.preloader_props.loaded = true;
        // this.preloader_props.logoPosition = {
        //   left: this.getLogoPosition().left,
        //   top: this.getLogoPosition().top,
        //   width: this.getLogoPosition().width,
        //   height: this.getLogoPosition().width,
        // };
      }
    },
  },
  computed: {
    ...mapGetters(["PRODUCT_INFO", "CATEGORIES", "POPULARS", "FAVORITES"]),
  },
  mounted() {
    this.animateLogoPosition(this.$refs.logo);
    this.clientWidth = window.innerWidth;
    this.getFavorites();
    console.log(process.env);
  },
};
</script>

<style lang="scss">
.test {
  background-color: $accent;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: fixed;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  z-index: 1;
}
.popup-enter-from,
.popup-leave-to {
  -webkit-transform: translateX(-100%);
  -ms-transform: translateX(-100%);
  transform: translateX(-100%);
}

.popup-enter-active,
.popup-leave-active {
  -webkit-transition: -webkit-transform 0.4s ease-in-out;
  transition: -webkit-transform 0.4s ease-in-out;
  -o-transition: transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out;
  transition: transform 0.4s ease-in-out, -webkit-transform 0.4s ease-in-out;
}
</style>
