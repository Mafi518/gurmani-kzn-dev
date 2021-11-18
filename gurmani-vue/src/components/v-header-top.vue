<template>
  <header class="header">
    <img src="@/assets/media/img/logo.png" alt="logo" class="header__logo" />
    <h1 class="header__title">gurmani</h1>
    <span class="header__info">10:00</span>
  </header>
</template>
<script>
export default {
  name: "v-header",
};
</script>
<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 20px 20px;
  &__logo {
    width: 42px;
  }
  &__title {
    @include h1;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
    display: inline;
    text-transform: uppercase;
  }
  &__info {
    font-weight: bold;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
  }
}
</style>
