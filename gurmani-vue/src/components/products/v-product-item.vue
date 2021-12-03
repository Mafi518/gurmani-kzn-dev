<template>
  <article class="card" @click="getProductInfo">
    <slot>
      <div class="card__head">
        <picture class="card__image">
          <source
            :srcset="`https://gurmanikzndev.joinposter.com${product_data.photo_origin}`"
          />
          <img
            :src="`https://gurmanikzndev.joinposter.com${product_data.photo_origin}`"
            alt=""
          />
        </picture>
        <v-favorite-btn></v-favorite-btn>
      </div>
      <div class="card__body">
        <h3 class="card__title">{{ product_data.product_name }}</h3>
        <p class="card__description">
          {{ product_data.product_production_description }}
        </p>
      </div>
      <div class="card__footer buy-btn">
        <p class="card__price">
          {{ product_data.price[1].slice(0, -2) }} ₽
        </p>
        <v-icon name="plus-icon"></v-icon>
      </div>
    </slot>
  </article>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-product-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCT_INFO", "GET_POPULAR_FROM_API", "ADD_TO_CART"]),
    reset() {
      this.size = "small-size";
    },
    getCategoryID(data) {
      data = this.PRODUCT.menu_category_id;
      console.log(data);
    },
    getProductInfo(e, data) {
      data = this.product_data;
      if (e.target.classList.contains("buy-btn")) {
        this.ADD_TO_CART(data);
      } else {
        this.GET_PRODUCT_INFO(data);
      }
    },
  },
  computed: {
    ...mapGetters(["PRODUCT", "POPULAR"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.product {
  margin-left: 20px;
}

.card {
  @include container;
  min-width: 176px;
  max-width: 176px;
  width: 100%;
  padding: 12px 9px;
  min-height: 208px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;
  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  &__image * {
    max-width: 120px;
    max-height: 78px;
    min-height: 78px;
  }
  &__body {
    flex: 1 1 auto;
  }
  &__title {
    @include h3;
    margin-bottom: 10px;
  }
  &__description {
    color: $second-black;
    font-size: 12px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__price {
    font-weight: 500;
  }
}
</style>
