<template>
  <article class="card" @click="getProductInfo">
    <div class="card__head">
      <img
        :src="`https://gurmanikzndev.joinposter.com${like_data.photo_origin}`"
        alt=""
        class="card__image"
      />
      <v-favorite-btn></v-favorite-btn>
    </div>
    <div class="card__body">
      <h3 class="card__title">{{ like_data.product_name }}</h3>
      <p class="card__description">
        {{ like_data.product_production_description }}
      </p>
    </div>
    <div class="card__footer">
      <p class="card__price">{{ like_data.spots[0].price.slice(0, -2) }} ₽</p>
      <v-icon name="plus-icon"></v-icon>
    </div>
  </article>
</template>

<script>
export default {
  name: "v-card-small",
  props: {
    like_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    getProductInfo() {
      this.$emit("getProductInfo", this.like_data);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include container;
  min-width: 200px;
  max-width: 200px;
  width: 100%;
  padding: 12px 9px;
  min-height: 208px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 20px;

  &__list {
    display: flex;
    overflow: auto;
    padding-bottom: 5px;
    padding-top: 5px;
  }
  &__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }
  &__image {
    max-width: 127px;
    max-height: 84px;
  }
  &__body {
  }
  &__title {
    @include h3;
    margin-bottom: 10px;
  }
  &__description {
    color: $second-black;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__footer {
    display: flex;
    align-items: center;
  }
  &__price {
    font-weight: 500;
  }
}
</style>
