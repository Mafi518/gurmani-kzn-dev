<template>
  <section class="conditions">
    <v-back-menu>
      <v-back-btn :to="`/menu`"></v-back-btn>
      <h2 class="cart__back-title">Условия доставки</h2></v-back-menu
    >
    <h2 class="conditions__title">ДОСТАВКА И ОПЛАТА </h2>
    <p class="conditions__subtitle">
      Самовывоз по адресу Казань, ул. Оренбургский тракт, 8В. Самовывоз осуществляется ежедневно до 22:00.
    </p>
    <h2 class="conditions__title">УСЛОВИЯ ДОСТАВКИ </h2>
    <p class="conditions__subtitle">
      Узнайте условия доставки по вашему адресу в корзине. Начните вводить нужную улицу в разделе «Адрес» и нажмите на свою улицу в выпадающем списке.
    </p>
    <h2 class="conditions__title">СПОСОБЫ ОПЛАТЫ</h2>
    <p class="conditions__subtitle">
      <ul class="conditions__list">
          <li class="conditions__item">
              Наличными курьеру
          </li>
          <li class="conditions__item">
              Банковской картой курьеру
          </li>
      </ul>
      Подробные условия уточняйте у операторов
    </p>
    <h2 class="conditions__title">ВРЕМЯ ДОСТАВКИ</h2>
    <p class="conditions__subtitle">
      Среднее время доставки 80 минут. Время доставки может быть увеличено в зависимости от погодных условий и ситуации на дороге и иных обстоятельств.
    </p>

  <v-footer></v-footer>
  </section>
</template>
<script>
export default {
  name: "v-conditions",
};
</script>
<style lang="scss" scoped>
.conditions {
  padding: 20px;
  &__title {
    @include h2;
    margin-top: 20px;
  }
  &__subtitle {
    margin-top: 30px;
    line-height: 140%;
  }
  &__list {
    list-style: none;
  }
  &__item {
    color: $accent;
  }
}
.cart__back-title {
  width: 100%;
  text-align: center;
  margin-bottom: 0;
}
</style>

