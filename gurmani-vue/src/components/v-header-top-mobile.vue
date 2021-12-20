<template>
  <div>
    <nav id="navbar" class="navbar">
      <router-link class="navbar__item" to="/"
        ><v-icon name="home-icon"></v-icon>
        <span class="navbar__text">Главная</span>
      </router-link>
      <router-link class="navbar__item" to="/menu">
        <v-icon name="menu-icon" class="burger"></v-icon>
        <span class="navbar__text">Меню</span></router-link
      >
      <router-link class="navbar__item" to="/cart">
        <v-icon name="cart-icon"></v-icon>
        <span class="navbar__text">Корзина</span></router-link
      >
      <router-link class="navbar__item" to="/favorite">
        <v-icon name="favorite-icon"></v-icon>
        <span class="navbar__text">Избранное</span></router-link
      >
    </nav>
  </div>
</template>
<script>

export default {
  name: "v-header-mobile",
};
</script>
<style lang="scss" scoped>

.navbar {
  @include container;
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  padding: 7px 0;
  height: 54px;
  z-index: 1;
  &__item {
    display: flex;
    align-items: center;
    padding: 6px 10px;
    svg {
      margin-right: 5px;
      path {
        fill: $black;
      }
    }
    span {
      display: none;
    }
    .burger {
      path {
        stroke: $black;
      }
    }
  }
}
.router-link-active {
  @include container;
  background-color: $accent;
  color: $white;
  box-shadow: none;
  transition: 0.3s background-color;
  span {
    display: inline;
  }
  svg {
    path {
      fill: $white;
    }
  }
  .burger {
    path {
      stroke: $white;
    }
  }
}
</style>