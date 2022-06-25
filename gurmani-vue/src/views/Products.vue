<template>
  <div class="products">
    <v-product-list></v-product-list>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vProductList from "@/components/products/v-product-list";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "v-category-products",
  methods: {
    ...mapActions([
      "GET_POPULARS_FROM_API",
      "SET_SAVED_FAVORITES",
      "GET_CATEGORY_PRODUCTS_FROM_API",
      "GET_CATEGORIES_FROM_API",
    ]),
    async getFavorites() {
      if (this.FAVORITES.length <= 0) {
        await this.GET_POPULARS_FROM_API();
        await this.GET_CATEGORY_PRODUCTS_FROM_API(
          localStorage.getItem("categoryID")
        );
        this.SET_SAVED_FAVORITES(localStorage.getItem("SAVED_FAVORITES"));
      }
    },
  },
  mounted() {
    this.getFavorites();
  },
  computed: {
    ...mapGetters(["FAVORITES", "CATEGORY_PRODUCTS"]),
  },
  components: {
    vProductList,
  },
};
</script>

<style></style>
