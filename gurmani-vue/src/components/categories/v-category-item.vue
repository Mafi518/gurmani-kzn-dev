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
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 124px;
    padding: 5px;
    min-height: 98px;
    background-color: #ffd1ad;
    margin-right: 20px;
    &:nth-child(2) {
      background-color: #ffc6bd;
    }
    &:nth-child(3) {
      background-color: #ffdeb4;
    }
  }
  &__item-title {
    @include h3;
    margin-top: 7px;
    text-align: center;
  }
}
</style>
