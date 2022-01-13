<template>
  <section class="menu">
    <v-back-menu>
      <v-back-btn :to="`/`"></v-back-btn>
      <h2 class="menu__title">Меню</h2>
    </v-back-menu>
    <v-category-list style="padding-left: 0px"></v-category-list>
    <div class="menu__list">
      <!-- <h2 class="menu__title">Наша миссия</h2> -->

      <v-menu-item @click="this.$router.push('/about')">О нас</v-menu-item>
      <v-menu-item @click="this.$router.push('/conditions')"
        >Условия доставки способы оплаты время доставки</v-menu-item
      >
    </div>
    <v-footer style="padding: 0px;">
      <div class="footer__business">
        <p>{{ this.current_year }} GURMANI</p>
        <p>ИП КОРНИЛОВ А. А.</p>
        <p>ИНН: 503614560405</p>
        <p>ОГРН: 321169000049507</p>
      </div>
      <div class="footer__payments">
        <img
          class="footer__payment"
          src="@/assets/media/img/mastercard.png"
          alt=""
        />
        <img class="footer__payment" src="@/assets/media/img/sber.png" alt="" />
        <img class="footer__payment" src="@/assets/media/img/visa.png" alt="" />
      </div>
    </v-footer>
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
  data() {
    return {
      current_year: new Date().getFullYear(),
    };
  },
};
</script>

<style lang="scss">
.menu {
  padding: 0px 20px 20px 20px;
  min-height: 90vh;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  &__title {
    @include h2;
    width: 100%;
    text-align: center;
    margin-bottom: 0;
  }
  &__list {
    margin-bottom: 18px;
  }
  &__contacts {
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
  &__social {
    width: 84px;
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
