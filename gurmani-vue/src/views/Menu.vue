<template>
  <section class="menu">
    <v-back-menu>
      <v-back-btn :to="`/`"></v-back-btn>
      <h2 class="menu__title">Меню</h2>
      </v-back-menu>
    <v-category-list style="padding-left: 0px;"></v-category-list>
    <div class="menu__list">
      <h2 class="menu__title">Наша миссия</h2>

      <v-menu-item @click="this.$router.push('/about')"
        >На связи основатели GURMANI – расскажем немного о нас</v-menu-item
      >
      <v-menu-item @click="this.$router.push('/conditions')"
        >Условия доставки способы оплаты время доставки</v-menu-item
      >
    </div>
    <div class="menu__contacts">
      <div class="menu__social">
        <a
          href="https://www.instagram.com/gurmani.kzn/"
          target="_blank"
          class="menu__social-link"
        >
          <v-icon name="instagram-icon"></v-icon>
        </a>
        <a
          href="https://vk.com/gurmanikzn"
          target="_blank"
          class="menu__social-link"
        >
          <v-icon name="vk-icon"></v-icon>
        </a>
      </div>
      <div class="menu__info">
        <a href="tel:+88432390012" class="menu__phone">88432390012</a>
        <h3 class="menu__info-title">10:00 – 22:00</h3>
        <h3 class="menu__info-title">г. Казань</h3>
      </div>
    </div>
  </section>
</template>

<script>
import vMenuItem from "@/components/v-menu-item";
import vCategoryList from "@/components/categories/v-category-list";

export default {
  name: "Menu",
  components: {
    vMenuItem,
    vCategoryList,
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
    margin-bottom: 18px;
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
