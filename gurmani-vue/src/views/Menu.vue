<template>
  <section class="menu">
    <v-back-menu><h2 class="menu__title">Меню</h2></v-back-menu>
    <div class="menu__list">
      <v-menu-item></v-menu-item>
      <v-menu-item></v-menu-item>
      <v-menu-item></v-menu-item>
    </div>
    <div class="menu__contacts">
      <div class="menu__social">
        <a href="#" class="menu__social-link">
          <v-icon name="instagram-icon"></v-icon>
        </a>
        <a href="#" class="menu__social-link">
          <v-icon name="vk-icon"></v-icon>
        </a>
      </div>
      <div class="menu__info">
        <a href="tel:+89377711838" class="menu__phone">8 (937) 771 1838</a>
        <h3 class="menu__info-title">10:00 – 00:00</h3>
        <h3 class="menu__info-title">г. Казань</h3>
      </div>
    </div>
  </section>
</template>

<script>
import vMenuItem from "@/components/v-menu-item";
export default {
  name: "Menu",
  components: {
    vMenuItem,
  },
};
</script>

<style lang="scss">
.menu {
  padding: 0px 20px 20px 20px;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  &__title {
    @include h2;
  }
  &__list {
    flex: 1 1 auto;
  }
  &__contacts {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__social {
    width: 84px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__info {
    &-title {
      @include h3;
      margin-top: 5px;
    }
  }
  &__phone {
    @include h2;
    margin-bottom: 0;
  }
}
</style>
