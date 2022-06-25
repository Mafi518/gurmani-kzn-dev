<template>
  <section class="category">
    <h2 class="category__title"><slot></slot></h2>
    <div class="category__list">
      <button
        class="category__item-add"
        v-show="admin_settings.visible"
        @click="$emit('setNewCategory')"
      >
        Добавить новую категорию
      </button>
      <!-- <v-category-item
        :category_data="admin_settings.template"
        v-show="admin_settings.popup_data.options.visible"
      ></v-category-item> -->
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
  props: {
    admin_settings: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    ...mapGetters(["CATEGORIES", "CATEGORY_PRODUCTS"]),
  },
  methods: {
    ...mapActions(["GET_CATEGORIES", "GET_CATEGORY_PRODUCTS_FROM_API"]),
    async getCategoryProducts(ID) {
      await this.GET_CATEGORY_PRODUCTS_FROM_API(ID);

      if (this.CATEGORY_PRODUCTS.length !== 0) {
        localStorage.setItem("categoryID", ID);
        this.$router.push("/products");
      }
    },
  },
  mounted() {
    this.GET_CATEGORIES();
  },
  components: {
    vCategoryItem,
  },
  setup() {
    const beforeEnter = (el) => {
      el.style.opacity = 0;
      el.style.transform = "translateX(20px)";
    };
    const enter = (el) => {
      gsap.fromTo(
        el,
        0.3,
        {
          opacity: 0,
          delay: el.dataset.index * 0.2,
        },
        {
          opacity: 1,
          delay: el.dataset.index * 0.2,
        }
      );
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

  // .category__item-add

  &__item-add {
    min-width: 160px;
    max-width: 160px;
    width: 100%;
    min-height: 138px;
    height: 100%;
    display: flex;
    border-radius: 10px;
    font-size: 16px;
    margin-right: 14px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: $white;
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
    &__list {
      padding-right: 20px;
    }
  }
}
</style>
