<template>
  <div class="home">
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
</style>
