<template>
  <article class="menu__item">
    <p class="menu__suptitle">Полезная информация</p>
    <h2 class="menu__item-title">
      <slot></slot>
    </h2>
    <img src="@/assets/media/img/menu-image.png" alt="" class="menu__image" />
  </article>
</template>

<script>
export default {
  name: "v-menu-item",
};
</script>

<style lang="scss" scoped>
.menu {
  &__item {
    background-color: $white;
    padding: 30px 19px;
    @include shadow;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    margin-top: 30px;
    &-title {
      @include h2;
      margin-bottom: 0;
      max-width: 225px;
    }
  }
  &__suptitle {
    color: #94a2b9;
    font-size: 10px;
    font-weight: normal;
    margin-bottom: 15px;
  }
  &__image {
    position: absolute;
    top: -20px;
    right: -35px;
    height: 154px;
  }
}
</style>
