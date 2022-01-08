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
      <p class="card__price">{{ like_data.price[1].slice(0, -2) }} ₽</p>
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

  &__list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: auto;
    padding-bottom: 5px;
    padding-top: 5px;
  }
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
  }
  &__price {
    font-weight: 500;
  }
}
</style>
