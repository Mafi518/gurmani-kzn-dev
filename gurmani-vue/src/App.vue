<template>
  <v-header-desktop></v-header-desktop>
  <!-- <v-header-mobile v-if="clientWidth <= 1"></v-header-mobile> -->
  <v-gurmani-closed
    v-if="this.display_warn_of_closed == true"
    @click="closeWarnOfClosed"
  ></v-gurmani-closed>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import vHeaderDesktop from "@/components/v-header-top-desktop";
// import vHeaderMobile from "@/components/v-header-top-mobile";
import vGurmaniClosed from "@/components/v-gurmani-closed";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { vHeaderDesktop, vGurmaniClosed },
  data() {
    return {
      clientWidth: 0,
      display_warn_of_closed: false,
      close_warn_of_closed: false,
    };
  },
  methods: {
    ...mapActions([
      "SET_SAVED_FAVORITES_TO_STATE",
      "GET_POPULAR_FROM_API",
      "GET_TIME",
    ]),
    displayWarnOfClosed() {
      let current_time = +this.CURRENT_TIME;
      if (localStorage.getItem("TIME_WARN_DISPLAYED") == null) {
        localStorage.setItem("TIME_WARN_DISPLAYED", false);
      }

      let warn = JSON.parse(localStorage.getItem("TIME_WARN_DISPLAYED"));

      if (current_time > 22 || current_time < 10) {
        if (warn !== true) {
          this.display_warn_of_closed = true;
          localStorage.setItem("TIME_WARN_DISPLAYED", true);
        }
      } else {
        this.display_warn_of_closed = false;
        localStorage.setItem("TIME_WARN_DISPLAYED", false);
      }
    },
    closeWarnOfClosed(e) {
      if (
        e.target.classList.contains("bg") ||
        e.target.classList.contains("closed-popup__btn")
      ) {
        console.log("close");
        this.display_warn_of_closed = false;
      }
    },
  },
  mounted() {
    this.SET_SAVED_FAVORITES_TO_STATE(localStorage.getItem("saved favorites"));
    this.clientWidth = window.innerWidth;
    this.displayWarnOfClosed();
  },
  computed: {
    ...mapGetters(["CURRENT_TIME"]),
    SCREEN_WIDTH() {
      console.log(window.innerWidth);
      return window.innerWidth
    },
  },

  // Попробуй сделать это через промисы, чтобы перед роутом выполнялась анимация, а только потом он через await дожидался данных, потом уже отображался
};
</script>

<style lang="scss">
#app {
  padding-top: 40px;
  padding-bottom: 60px;
}
.navbar {
  &__item {
    svg {
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
.burger {
  path {
    stoke: $black;
  }
}
.plus-icon {
  width: 38px;
  height: 38px;
  path {
    fill: $accent;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  -webkit-transition: opacity 0.2s ease-out;
  -o-transition: opacity 0.2s ease-out;
  transition: opacity 0.2s ease-out;
}

.animate-circle {
  position: fixed;
  left: -50%;
  bottom: -50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  -webkit-transform-origin: bottom left;
  -ms-transform-origin: bottom left;
  transform-origin: bottom left;
  background-color: $white;
  z-index: 3;
}
@media (max-width: 1920px) and (min-width: 1025px) {
  #app {
    max-width: 1280px;
    margin: 0 auto;
  }
  ::-webkit-scrollbar {
    height: 10px;
    background-color: $unactive-accent;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: $accent;
    border-radius: 10px;
  }
  body::-webkit-scrollbar {
    display: none;
    width: 0;
  }
}
@media (max-width: 1024px) {
  ::-webkit-scrollbar {
    width: 0;
    display: none;
  }
}
</style>
