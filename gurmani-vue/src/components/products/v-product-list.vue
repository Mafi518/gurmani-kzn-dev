<template>
  <section class="products">
    <v-back-menu class="fix">
      <h2 class="products__title" v-if="CATEGORY_PRODUCTS.length !== 0">
        {{ CATEGORY_PRODUCTS[0].category_name }}
      </h2>
    </v-back-menu>
    <v-category-list style="padding: 30px 0px"></v-category-list>
    <div class="products__list">
      <v-product-item
        v-for="product in CATEGORY_PRODUCTS"
        :key="product.product_id"
        :product_data="product"
      ></v-product-item>
    </div>
  </section>
  <v-product-popup v-if="PRODUCT.product_name"></v-product-popup>
</template>

<script>
import vProductItem from "@/components/products/v-product-item";
import vCategoryList from "@/components/categories/v-category-list";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-product-list",
  components: {
    vProductItem,
    vCategoryList,
  },
  computed: {
    ...mapGetters(["CATEGORY_PRODUCTS", "PRODUCT"]),
  },
  methods: {
    ...mapActions(["GET_CATEGORY_PRODUCTS_FROM_API"]),
    async reRenderCards() {
      await this.GET_CATEGORY_PRODUCTS_FROM_API(
        localStorage.getItem("categoryID")
      );
      setTimeout(() => {}, 1000);
    },
  },
  mounted() {
    this.reRenderCards();
  },
};
</script>

<style lang="scss" scoped>
.fix {
  margin-right: 20px;
}

.products {
  margin-left: 20px;
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
