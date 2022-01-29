<template>
  <header class="header">
    <div class="header__container">
      <img
        src="@/assets/media/img/logo.png"
        @click="toMain"
        alt="logo"
        class="header__logo"
      />
    </div>

    <div class="header__flag">
      <img src="@/assets/media/img/gurmani.svg" alt="" />
      <span>море вкуса для тебя</span>
    </div>

    <h1 class="header__title">
      <a href="tel:+78432390012" class="header__phone">+7 (843) 239-00-12</a>
      <span class="header__info">10:00 - 22:00</span>
    </h1>

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
  </header>
</template>
<script>
export default {
  name: "v-header-desktop",
  methods: {
    toMain() {
      console.log(window.location.href);
      if (
        window.location.href !== "http://185.185.70.214/admin-dashboard" ||
        window.location.href !== "http://localhost:8080/admin-dashboard"
      ) {
        this.$router.push("/");
      }
    },
  },
};
</script>
<style lang="scss">
.header {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0px 20px 20px 20px;
  z-index: 2;
  &__container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
  }
  &__logo {
    margin-right: 10px;
    width: 70px;
  }
  &__title {
    @include h1;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
    display: inline;
    text-transform: uppercase;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  &__phone {
    font-size: 18px;
  }
  &__info {
    font-size: 12px;
    font-weight: bold;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
  }
  &__flag {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
}
.navbar {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  padding: 7px 0;
  height: 54px;
  z-index: 1;
  &__item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
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
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-transition: 0.3s background-color;
  -o-transition: 0.3s background-color;
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
@media (max-width: 768px) {
  .navbar {
    @include container;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    padding: 7px 0;
    height: 54px;
    z-index: 1;
  }
  .header__title {
    text-align: right;
  }
}
@media (max-width: 465px) {
  .header__flag {
    display: none;
  }
}
</style>
