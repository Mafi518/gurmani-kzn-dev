<template>
  <section class="thx">
    <img src="@/assets/media/img/logo.png" alt="logo" />
    <h1 class="thx__title">Спасибо за заказ!</h1>
    <p class="thx__subtitle">
      Вы указали номер :
      {{ ORDER_DATA.phone !== undefined ? ORDER_DATA.phone : "" }} Оператор
      свяжется с вами в ближайшее время
    </p>

    <router-link to="/" class="v-back-btn">Вернуться на главную <v-icon name="home-icon"></v-icon></router-link>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "thx",
  computed: {
    ...mapGetters(["ORDER_DATA"]),
  },
};
</script>
<style lang="scss" scoped>
.thx {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  &__title {
    @include h1;
    margin: 60px 0 30px 0;
  }
  &__subtitle {
    font-size: 18px;
  }
}
.v-back-btn {
  border-radius: 10px;
  background-color: $accent;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  padding: 15px;
  font-family: roboto, sans-serif;
  width: 90%;
  bottom: 64px;
  font-size: 16px;
  margin-top: 30px;
}
</style>