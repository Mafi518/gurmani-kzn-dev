<template>
  <div class="home">
    <v-header></v-header>
    <v-banner-list></v-banner-list>
    <v-category-list>Меню</v-category-list>
    <v-popular-list></v-popular-list>
    <v-product-popup v-if="PRODUCT.product_name"></v-product-popup>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vHeader from "@/components/v-header-top";
import vBannerList from "@/components/banners/v-banner-list";
import vCategoryList from "@/components/categories/v-category-list";
import vPopularList from "@/components/populars/v-popular-list";

export default {
  name: "Home",
  components: {
    vHeader,
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

<style lang="scss"></style>
