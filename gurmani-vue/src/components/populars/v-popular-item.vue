<template>
  <article class="popular__item" @click="getProductInfo">
    <div class="popular__head">
      <img
        :src="`https://gurmanikzndev.joinposter.com${popular_data.photo_origin}`"
        alt=""
        class="popular__image"
      />
      <h3 class="popular__item-title">{{ popular_data.product_name }}</h3>
    </div>
    <p class="popular__description">
      {{ popular_data.product_production_description }}
    </p>
    <div class="popular__info-wrap">
      <div class="popular__calories">
        <v-icon name="calories-icon"></v-icon> {{ popular_data.barcode }} Ккал
      </div>
      <div class="popular__weight">
        <v-icon name="scales-icon"></v-icon> {{ (popular_data.cooking_time / 60) }} г
      </div>
      <v-favorite-btn v-if="!popular_data.favorites"></v-favorite-btn>
      <v-favorite-btn-active
        v-if="popular_data.favorites == true"
      ></v-favorite-btn-active>
    </div>
    <v-add-btn>{{ popular_data.price[1].slice(0, -2) }} ₽</v-add-btn>
  </article>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "v-popular-item",
  props: {
    popular_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCT_INFO", "ADD_TO_CART", "ADD_TO_FAVORITES"]),
    async getProductInfo(e) {
      if (e.target.classList.contains("buy-btn")) {
        await this.GET_PRODUCT_INFO(this.popular_data);
        await this.ADD_TO_CART(this.popular_data);
        this.$store.state.product = { product: "empty" };
      } else if (
        e.target.parentNode.classList.contains("favorite-btn") ||
        e.target.classList.contains("favorite-icon-path") ||
        e.target.classList.contains("favorite-icon-active") ||
        e.target.classList.contains("favorite-icon")
      ) {
        this.ADD_TO_FAVORITES(this.popular_data);
      } else {
        this.GET_PRODUCT_INFO(this.popular_data);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.buy-btn {
  position: static !important;
  width: 100% !important;
}
.popular {
  &__item {
    min-width: 312px;
    max-width: 312px;
    min-height: 362px;
    padding: 20px;
    @include container;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-right: 20px;
  }
  &__head {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
  }
  &__image {
    max-width: 160px;
    max-height: 120px;
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 1;
    order: 1;
  }
  &__item-title {
    @include h3;
    margin-bottom: 0;
    font-size: 18px;
    max-width: 167px;
    width: 100%;
  }
  &__description {
    color: $second-black;
    font-weight: 400;
    line-height: 130%;
    max-height: 75px;
    height: 100%;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }
  &__info-wrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  &__calories,
  &__weight {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-weight: bold;
    svg {
      margin-right: 12px;
    }
  }
  &__favorite {
    width: 32px;
    height: 32px;
    background-color: $unactive-accent;
    border-radius: 10px;
  }
  &__cart {
    border-radius: 10px;
    background-color: $accent;
    color: $white;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 76px;
    padding: 15px;
  }
  &__cart-left {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    font-family: roboto, sans-serif;
    p:nth-child(1) {
      font-size: 16px;
      margin-bottom: 6px;
    }
    p:nth-child(2) {
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>
