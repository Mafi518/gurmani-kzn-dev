<template>
  <div class="home">
    <header class="header" v-if="clientWidth <= 768">
      <img src="@/assets/media/img/logo.png" @click="this.$router.push('/')" alt="logo" class="header__logo" />
      <h1 class="header__title">gurmani</h1>
      <span class="header__info">10:00</span>
    </header>
    <v-banner-list></v-banner-list>
    <v-category-list>Меню</v-category-list>
    <v-popular-list></v-popular-list>
    <transition name="popup" mode="out-in">
      <v-product-popup v-if="PRODUCT.product_name"></v-product-popup>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vBannerList from "@/components/banners/v-banner-list";
import vCategoryList from "@/components/categories/v-category-list";
import vPopularList from "@/components/populars/v-popular-list";

export default {
  name: "Home",
  data() {
    return {
      clientWidth: 0,
    };
  },
  components: {
    vBannerList,
    vCategoryList,
    vPopularList,
  },
  methods: {
    ...mapActions(["RESET_PRODUCT"]),
    reset() {
      this.RESET_PRODUCT();
    },
  },
  computed: {
    ...mapGetters(["PRODUCT"]),
  },
  mounted() {
    this.reset();
    this.clientWidth = window.innerWidth;
  },
};
</script>

<style lang="scss">
.popup-enter-from,
.popup-leave-to {
  transform: translateX(-100%);
}

.popup-enter-active,
.popup-leave-active {
  transition: transform 0.4s ease-in-out;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 20px 20px;
  &__logo {
    width: 42px;
  }
  &__title {
    @include h1;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
    display: inline;
    text-transform: uppercase;
  }
  &__info {
    font-weight: bold;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
  }
}
</style>
