<template>
  <section class="category">
    <h2 class="category__title"><slot></slot></h2>
    <div class="category__list">
      <v-category-item
        v-for="category in CATEGORIES"
        :key="category.id"
        :category_data="category"
        @getCategoryProducts="getCategoryProducts"
      ></v-category-item>
    </div>
  </section>
</template>
<script>
import vCategoryItem from "@/components/categories/v-category-item";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-category-list",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["CATEGORIES"]),
  },
  methods: {
    ...mapActions([
      "GET_CATEGORIES_FROM_API",
      "GET_CATEGORY_PRODUCTS_FROM_API",
    ]),
    async getCategoryProducts(data) {
      await this.GET_CATEGORY_PRODUCTS_FROM_API(data);
      if (this.$store.state.categoryProducts.length !== 0) {
        localStorage.setItem("categoryID", data);
        this.$router.push("/products");
      }
    },
  },
  mounted() {
    this.GET_CATEGORIES_FROM_API();
  },
  components: {
    vCategoryItem,
  },
};
</script>
<style lang="scss">
.category {
  padding: 20px 0px 20px 20px;
  &__title {
    @include h2;
  }
  &__list {
    display: flex;
    overflow: auto;
  }
}
</style>
