<template>
  <section class="thx">
    <img src="@/assets/media/img/logo.svg" alt="logo" />
    <h1 class="thx__title">Спасибо за заказ!</h1>
    <p class="thx__subtitle">
      Вы указали номер :
      {{ ORDER.order_phone !== undefined ? ORDER.order_phone : "" }} Оператор
      свяжется с вами в ближайшее время
    </p>

    <p class="thx__subtitle">
      {{
        CART_DATA.delivery.type == "delivery"
          ? `Приблизительное время доставки час/полтора`
          : ORDER.order_pickup == "Сам-з undefined"
          ? `Тип заказа – предзаказ`
          : `Тип заказа – самовывоз`
      }}
    </p>

    <router-link to="/" class="v-back-btn"
      >Вернуться на главную <v-icon name="home-icon"></v-icon
    ></router-link>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "thx",
  computed: {
    ...mapGetters(["CART_DATA", "ORDER"]),
  },
};
</script>
<style lang="scss" scoped>
.thx {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100vh;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
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
