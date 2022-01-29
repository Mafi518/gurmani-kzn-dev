<template>
  <article @click="getCategoryID" class="category__item">
    <img
      :src="`https://gurmanikzndev.joinposter.com${category_data.category_photo_origin}`"
      alt=""
      class="category__image"
    />
    <h3 class="category__item-title">{{ category_data.category_name }}</h3>
  </article>
</template>
<script>
export default {
  props: {
    category_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    getCategoryID() {
      this.$emit("getCategoryProducts", this.category_data.category_id);
    },
  },
};
</script>
<style lang="scss">
.category {
  &__item {
    @include container;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 124px;
    padding: 5px;
    min-height: 98px;
    background-color: #ffd1ad;
    margin-right: 20px;
    cursor: pointer;
    img {
      max-width: 50px;
    }
    &:nth-child(2) {
      background-color: #ffc6bd;
    }
    &:nth-child(3) {
      background-color: #ffdeb4;
    }
    &:nth-child(4) {
      background-color: #ffc5af;
    }
    &:nth-child(5) {
      background-color: #ffafb5;
    }
    &:nth-child(6) {
      background-color: #ffafa5;
    }
    &:nth-child(7) {
      background-color: #ffa68a;
    }
  }
  &__item-title {
    @include h3;
    text-align: center;
  }
}

@media (max-width: 1920px) and (min-width: 1025px) {
  .category {
    &__item {
      min-width: 160px;
      min-height: 138px;
      img {
        max-width: 80px;
      }
    }
  }
}
@media (max-width: 1024px) and (min-width: 1px) {
  .category {
    padding-right: 0px !important;
    padding-top: 10px !important;
    padding-bottom: 0px !important;
    &__item {
      
      &:first-child {
        margin-left: 20px;
      }
    }
  }
}
</style>
