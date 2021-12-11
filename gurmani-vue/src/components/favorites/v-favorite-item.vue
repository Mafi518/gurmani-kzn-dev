<template>
  <article class="favorite" @click="getProductInfo">
    <slot>
      <div class="favorite__head">
        <picture class="favorite__image">
          <source
            :srcset="`https://gurmanikzndev.joinposter.com${favorite_data.photo_origin}`"
          />
          <img
            :src="`https://gurmanikzndev.joinposter.com${favorite_data.photo_origin}`"
            alt=""
          />
        </picture>
      <v-favorite-btn v-if="!favorite_data.favorites"></v-favorite-btn>
      <v-favorite-btn-active v-if="favorite_data.favorites == true"></v-favorite-btn-active>
      </div>
      <div class="favorite__body">
        <h3 class="favorite__title">{{ favorite_data.product_name }}</h3>
        <p class="favorite__description">
          {{ favorite_data.product_production_description }}
        </p>
      </div>
      <div class="favorite__footer buy-btn">
        <p class="favorite__price">
          {{ favorite_data.price[1].slice(0, -2) }} ₽
        </p>
        <v-icon name="plus-icon"></v-icon>
      </div>
    </slot>
  </article>
  <v-product-popup></v-product-popup>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "v-favorite-item",
  props: {
    favorite_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...mapActions([
      "GET_PRODUCT_INFO",
      "GET_POPULAR_FROM_API",
      "ADD_TO_CART",
      "ADD_TO_FAVORITES",
    ]),
    reset() {
      this.size = "small-size";
    },
    getCategoryID(data) {
      data = this.PRODUCT.menu_category_id;
      console.log(data);
    },
    getProductInfo(e, data) {
      data = this.favorite_data;
      if (e.target.classList.contains("buy-btn")) {
        this.ADD_TO_CART(data);
      } else if (
        e.target.parentNode.classList.contains("favorite-btn") ||
        e.target.classList.contains("favorite-icon-path") ||
        e.target.classList.contains("favorite-icon-active") ||
        e.target.classList.contains("favorite-icon")
      ) {
        this.ADD_TO_FAVORITES(data);
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
// .favorite {
//   margin-left: 20px;
// }

.favorite {
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