<template>
  <article class="favorite" @click="getProductInfo">
    <slot>
      <div class="favorite__head">
        <picture class="favorite__image">
          <source
            :srcset="`https://gurmanikzn.ru:3000/products/${favorite_data.image}.png`"
          />
          <img
            :src="`https://gurmanikzn.ru:3000/products/${favorite_data.image}.png`"
            alt=""
          />
        </picture>
        <v-favorite-btn v-if="!favorite_data.favorites"></v-favorite-btn>
        <v-favorite-btn-active
          v-if="favorite_data.favorites == true"
        ></v-favorite-btn-active>
      </div>
      <div class="favorite__body">
        <h3 class="favorite__title">{{ favorite_data.name }}</h3>
        <p class="favorite__description">
          {{ favorite_data.description }}
        </p>
      </div>
      <div class="favorite__footer buy-btn">
        <p class="favorite__price">{{ favorite_data.total_price }} ₽</p>
        <v-icon name="plus-icon" class="plus-icon"></v-icon>
      </div>
    </slot>
  </article>
  <transition name="popup" mode="out-in">
    <v-product-popup v-if="PRODUCT_INFO.product_name"></v-product-popup>
  </transition>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
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
      "SET_SAVED_FAVORITES",
    ]),
    reset() {
      this.size = "small-size";
    },
    getCategoryID(data) {
      data = this.PRODUCT_INFO.menu_category_id;
      console.log(data);
    },
    async getProductInfo(e, data) {
      data = this.favorite_data;
      if (e.target.classList.contains("buy-btn")) {
        await this.GET_PRODUCT_INFO(data);
        await this.ADD_TO_CART(data);
        this.$store.state.product = { product: "empty" };
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
    ...mapGetters(["PRODUCT_INFO", "POPULAR"]),
  },
  mounted() {
    this.SET_SAVED_FAVORITES();
  },
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;
  &__head {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  &__image * {
    max-width: 120px;
    max-height: 100%;
    min-height: 78px;
  }
  &__body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
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
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  &__footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  &__price {
    font-weight: 500;
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
  .favorite {
    min-width: initial;
    max-width: 47%;
    margin-right: 0;
    position: relative;
    .favorite-btn {
      position: absolute;
      top: 12px;
      right: 9px;
    }
  }
}
</style>
