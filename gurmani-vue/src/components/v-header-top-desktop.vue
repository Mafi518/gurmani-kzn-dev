<template>
  <header class="header">
    <div class="header__container">
      <img
        src="@/assets/media/img/logo.svg"
        @click="toMain"
        alt="logo"
        class="header__logo"
      />
      <span
        style="
          font-size: 37px;
          font-weight: 200;
          line-height: 100%;
          height: 43px;
          letter-spacing: 4px;
          font-family: 'Antonio', sans-serif;
        "
      >
        GURMANI
      </span>
    </div>

    <div class="header__flag">
      <svg
        width="135"
        height="31"
        viewBox="0 0 135 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M129.534 30.7664C129.381 29.6698 128.671 28.035 128.336 26.9485L125.878 19.597C125.076 17.1804 124.771 17.3733 125.716 16.1142L133.128 6.40703C133.494 5.92979 133.869 5.60486 134.073 5.00578C131.402 4.99563 127.452 4.85347 124.934 5.09717C124.69 7.81843 123.807 10.9865 123.35 13.6062C122.863 16.3884 122.304 19.1198 121.756 21.9629C121.675 22.3792 121.451 23.8617 121.258 24.1155L110.546 30.7461L129.524 30.7664H129.534Z"
          fill="#FA6A0A"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.97095 0.15231L124.416 0L119.167 23.5674L108.972 28.6443L109.754 24.0852L109.805 23.8314L24.42 23.7806L25.0394 28.7053L14.6418 23.608L9.97095 0.15231Z"
          fill="#FA6A0A"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.88472 5.29011L12.794 24.2983L23.5267 30.8984L4.84344 31L9.26042 17.4241L0 5.25964L8.88472 5.29011Z"
          fill="#FA6A0A"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M65.3309 22.1663L66.1128 22.217L66.1839 4.24451L68.7122 18.7647L70.0322 18.7748L72.6113 4.14297C72.8144 6.21438 72.6621 16.612 72.6621 20.2167C72.6621 21.6078 72.4286 22.0546 72.9667 22.217L73.3627 22.1155L73.3221 1.69586L72.327 1.72632C71.4741 5.52391 70.8953 10.0526 70.1541 14.0228L69.4331 17.8305L66.458 1.69586L65.4629 1.72632C65.1177 4.78267 65.8285 20.6635 65.3411 22.1663H65.3309Z"
          fill="#2B2A29"
          stroke="#2B2A29"
          stroke-width="0.8"
          stroke-miterlimit="22.9256"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M94.1073 21.2321L94.0972 22.0647C95.0313 22.2576 94.8283 22.481 94.8181 20.3588C94.7978 15.8911 94.6556 7.08758 94.879 3.52354L98.7985 22.1865C99.4686 22.2576 99.8443 22.4404 99.8951 21.821C99.8545 18.4702 99.8951 15.0788 99.8951 11.7279C99.8951 10.4079 100.098 2.36598 99.7631 1.78721H99.3265C99.1234 2.13244 99.1843 2.26445 99.1843 2.79245C99.1945 7.13835 99.3569 17.2619 99.1132 20.2573L95.1836 1.68567L94.1276 1.72628V21.2422L94.1073 21.2321Z"
          fill="#2B2A29"
          stroke="#2B2A29"
          stroke-width="0.8"
          stroke-miterlimit="22.9256"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M53.3496 2.38644C57.9494 2.27474 57.3097 3.46276 57.3097 7.61573C57.3097 12.8044 57.726 12.8958 53.2989 12.8755L53.3496 2.38644V2.38644ZM55.7967 13.5863C57.1066 13.4136 58.0204 12.2967 58.0306 10.8447C58.0509 1.91936 58.5891 1.68581 52.6896 1.67566C52.4865 2.48798 52.4662 20.9682 52.6591 22.207L53.2989 22.1562V13.5761L54.9743 13.6167C55.6546 14.7134 57.0355 21.4759 57.7564 22.2476L58.1931 22.1156C58.3961 21.5267 56.081 14.9875 55.7967 13.5863V13.5863Z"
          fill="#2B2A29"
          stroke="#2B2A29"
          stroke-width="0.8"
          stroke-miterlimit="22.9256"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M39.6207 10.1132C39.6309 13.2914 39.5497 16.7742 39.702 19.9219C39.8644 23.1509 44.8094 23.029 44.8094 19.7696C44.8094 13.7788 44.8906 7.78792 44.7282 1.79708L44.1189 1.78693C43.926 7.43253 44.058 13.5148 44.1088 19.1908C44.1189 20.7038 43.7534 21.6379 42.0983 21.5669C40.4737 21.5059 40.4229 20.3179 40.4127 18.8964L40.1995 1.79708L39.5598 1.78693L39.6207 10.1132V10.1132Z"
          fill="#2B2A29"
          stroke="#2B2A29"
          stroke-width="0.8"
          stroke-miterlimit="22.9256"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M32.1986 11.4337C31.7925 11.4337 31.3863 11.4337 30.97 11.4337C30.8177 11.4337 30.5232 11.4236 30.3912 11.4337L29.7922 11.5759L29.8023 12.0125L30.5334 12.1445C30.8279 12.1547 31.1934 12.1344 31.4879 12.1344C31.5082 12.8756 31.5589 19.9123 31.366 20.4403C31.1731 20.9785 30.4217 21.5268 29.6602 21.5573C27.5684 21.6385 27.6395 19.8514 27.6395 18.0034V6.73246C27.6395 4.82352 27.1826 2.94503 29.0205 2.43733C29.9242 2.19364 30.5943 2.49826 31.0512 2.9958C31.6199 3.62535 31.498 4.2752 31.498 5.26014C31.498 5.69676 31.4777 6.16384 31.4777 6.60046C31.4777 6.98631 31.4168 7.91032 32.0463 7.38232C32.1682 7.28078 33.3257 1.51332 29.518 1.65548C27.8934 1.7164 26.8983 2.74195 26.9186 4.5392C26.949 8.28602 26.9287 12.0531 26.9186 15.8101C26.9186 17.3637 26.5124 19.7702 27.2841 20.9785C27.9644 22.0446 29.6906 22.928 31.1934 21.7299C32.5439 20.6535 32.1783 19.1203 32.1783 17.1301C32.1885 15.2516 32.2393 13.3021 32.1885 11.4337H32.1986Z"
          fill="#2B2A29"
          stroke="#2B2A29"
          stroke-width="0.8"
          stroke-miterlimit="22.9256"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M83.9025 3.10672C84.2376 4.40643 85.8927 16.3475 85.7912 17.3527L82.085 17.3629C81.9936 16.5912 83.6182 4.23381 83.9025 3.10672V3.10672ZM80.6228 22.2876L81.1711 22.1759L81.9022 18.0432L85.9435 18.0534C86.4207 20.1349 86.2583 22.3079 87.1721 22.1657C87.1924 22.1251 87.2127 22.0236 87.2127 22.0439C87.2127 22.0642 87.2432 21.9525 87.2533 21.922L84.4712 1.67501L83.405 1.66486L80.6228 22.2774V22.2876Z"
          fill="#2B2A29"
          stroke="#2B2A29"
          stroke-width="0.8"
          stroke-miterlimit="22.9256"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M107.998 22.1357V1.77695L107.338 1.70587C107.308 5.13791 107.328 8.58011 107.338 12.002C107.338 13.9516 107.085 20.7953 107.42 22.1763L108.009 22.1255L107.998 22.1357Z"
          fill="#2B2A29"
          stroke="#2B2A29"
          stroke-width="0.8"
          stroke-miterlimit="22.9256"
          stroke-linejoin="round"
        />
      </svg>
      <span>море вкуса для тебя</span>
    </div>

    <!-- <h1 class="header__title">
      <a href="tel:+78432390012" class="header__phone"
        >+7 (843) 239-00-12 - <span>Казань</span></a
      >
      <a href="tel:+78432900012" class="header__phone"
        >+7 (843) 290-00-12 - <span>Дербышки</span></a
      >
      <span class="header__info"> {{ (day == 5 || day == 6) ? '10:00 - 23:00' : '10:00 - 22:00' }} </span>
    </h1> -->

    <span class="header__info">
      <span> 10:00 </span>
      <span style="line-height: 50%"> – </span>
      <span>
        {{ day == 5 || day == 6 ? "23:00" : "22:00" }}
      </span>
    </span>

    <nav id="navbar" class="navbar">
      <router-link class="navbar__item" to="/"
        ><v-icon name="home-icon"></v-icon>
        <span class="navbar__text">Главная</span>
      </router-link>
      <router-link class="navbar__item" to="/menu">
        <v-icon name="menu-icon" class="burger"></v-icon>
        <span class="navbar__text">Меню</span></router-link
      >
      <router-link class="navbar__item navbar__cart" to="/cart">
        <v-icon name="cart-icon"></v-icon>
        <span class="navbar__text">Корзина</span>
        <!-- <p class="navbar__item-counter" v-if="CART.length" >  </p -->
      </router-link>
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
  data() {
    return {
      day: new Date().getDay(),
    };
  },
  methods: {
    toMain() {
      console.log(window.location.href);
      if (
        window.location.href !== "https://185.251.89.10/admin-dashboard" ||
        window.location.href !== "https://gurmanikzn.ru/admin-dashboard" ||
        window.location.href !== "http://localhost:8080/admin-dashboard"
      ) {
        this.$router.push("/");
      }
    },
  },
  computed: {},
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
  padding: 0px 20px 10px 20px;
  z-index: 2;
  &__container {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
  }
  &__logo {
    margin-right: 10px;
    width: 40px;
  }
  &__title {
    @include h1;
    display: inline;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  &__phone {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    span {
      margin-left: 4px;
      font-size: 12px;
    }
  }
  &__info {
    font-size: 16px;
    font-weight: 900;
    display: flex;
    flex-direction: column;
    text-align: center;
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
    &__text {
      display: none;
    }

    .burger {
      path {
        stroke: $black;
      }
    }
  }
  &__cart {
    position: relative;
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
  }
}
@media (max-width: 465px) {
  .header__flag {
    display: none;
  }
}
</style>
