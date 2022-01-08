<template>
  <section class="products">
    <v-back-menu class="fix">
      <v-back-btn :to="`/`"> </v-back-btn>
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
  <transition name="popup" mode="out-in">
    <v-product-popup v-if="PRODUCT.product_name"></v-product-popup>
  </transition>
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
    ...mapActions([
      "GET_CATEGORY_PRODUCTS_FROM_API",
      "GET_CATEGORIES_FROM_API",
    ]),
    async reRenderCards() {
      await this.GET_CATEGORY_PRODUCTS_FROM_API(
        localStorage.getItem("categoryID")
      );
    },
  },
  mounted() {
    this.GET_CATEGORIES_FROM_API();
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  &__title {
    width: 100%;
    text-align: center;
    margin-bottom: 0;
  }
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
@media (max-width: 416px) {
  .products__list {
    padding-right: 20px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
}
</style>
