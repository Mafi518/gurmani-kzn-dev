<template>
  <section class="category">
    <h2 class="category__title"><slot></slot></h2>
    <div class="category__list">
      <transition-group appear @before-enter="beforeEnter" @enter="enter">
        <v-category-item
          v-for="(category, index) in CATEGORIES"
          :key="category.category_id"
          :category_data="category"
          @getCategoryProducts="getCategoryProducts"
          :data-index="index"
        ></v-category-item>
      </transition-group>
    </div>
  </section>
</template>
<script>
import vCategoryItem from "@/components/categories/v-category-item";
import { mapActions, mapGetters } from "vuex";
import { gsap } from "gsap";

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
    // this.GET_CATEGORIES_FROM_API();
  },
  components: {
    vCategoryItem,
  },
  setup() {
    const beforeEnter = (el) => {
      el.style.opacity = 0;
      el.style.transform = "translateX(20px)";
    };
    const enter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.3,
        delay: el.dataset.index * 0.2,
        onComplete: done,
      });
    };

    return { beforeEnter, enter };
  },
};
</script>
<style lang="scss">
.category {
  padding-bottom: 10px;
  &__title {
    @include h2;
  }
  &__list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: auto;
  }
}
@media (max-width: 1920px) and (min-width: 1025px) {
  .category {
    &__list {
      padding-bottom: 10px;
    }
  }
}
@media (max-width: 1024px) and (min-width: 1px) {
  .category {
    &__title {
      margin-left: 20px;
    }
  }
}
</style>
