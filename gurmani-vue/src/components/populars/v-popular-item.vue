<template>
  <article class="popular__item" @click="getProductInfo">
    <div class="popular__head">
      <img
        :src="`https://gurmanikzndev.joinposter.com${popular_data.photo_origin}`"
        alt=""
        class="popular__image"
      />
      <h2 class="popular__item-title">{{ popular_data.product_name }}</h2>
    </div>
    <p class="popular__description">
      {{ popular_data.product_production_description }}
    </p>
    <div class="popular__info-wrap">
      <div class="popular__calories">
        <v-icon name="calories-icon"></v-icon> 299 Ккал
      </div>
      <div class="popular__weight">
        <v-icon name="scales-icon"></v-icon> {{ popular_data.out }} г
      </div>
      <v-favorite-btn></v-favorite-btn>
    </div>
    <v-add-btn>{{ popular_data.spots[0].price.slice(0, -2) }} ₽</v-add-btn>
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
    getProductInfo(e) {
      if (e.target.classList.contains("buy-btn")) {
        this.ADD_TO_CART(this.popular_data);
      } else if (
        e.target.parentNode.classList.contains("favorite") ||
        e.target.classList.contains("favorite-icon")
      ) {
        this.ADD_TO_FAVORITES(this.popular_data);
        e.target.parentNode.style.backgroundColor = "#FF6800";
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-right: 20px;
  }
  &__head {
    display: flex;
    align-items: flex-end;
  }
  &__image {
    max-width: 136px;
    max-height: 93px;
    order: 1;
  }
  &__item-title {
    @include h2;
    margin-bottom: 0;
    font-size: 18px;
    max-width: 167px;
    width: 100%;
  }
  &__description {
    color: $second-black;
    font-weight: 400;
    line-height: 130%;
    max-height: 90px;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__calories,
  &__weight {
    display: flex;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 76px;
    padding: 15px;
  }
  &__cart-left {
    display: flex;
    flex-direction: column;
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
