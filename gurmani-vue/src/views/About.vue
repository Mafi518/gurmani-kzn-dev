<template>
  <section class="about">
    <v-back-menu>
      <v-back-btn :to="`/menu`"></v-back-btn>
      <h2 class="cart__back-title">О нас</h2></v-back-menu
    >
    <h2 class="about__title">ПРИВЕТ! НА СВЯЗИ ОСНОВАТЕЛИ ДОСТАВКИ GURMANI.</h2>
    <p class="about__subtitle">
      Основной нашей задачей было - создать качественный продукт, используя
      лучшие ингредиенты, при этом установить адекватную цену. И мы смогли найти
      этот баланс.
    </p>
    <p class="about__subtitle">
      Мы ручаемся за высокое качество каждого ингредиента в Вашем блюде. В
      GURMANI всегда используются свежие продукты и только охлаждённый лосось.
    </p>
    <p class="about__subtitle">
      Наша главная цель - радовать вас, доставляя вкусную еду, приносить
      удовольствие и впечатления.
    </p>
  </section>
</template>
<script>
export default {
  name: "v-about",
};
</script>
<style lang="scss" scoped>
.about {
  padding: 20px;
  &__title {
    @include h2;
    margin-top: 20px;
  }
  &__subtitle {
    margin-top: 30px;
    line-height: 140%;
  }
}
</style>

