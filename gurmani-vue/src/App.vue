<template>
  <v-header-desktop></v-header-desktop>
  <!-- <v-header-mobile v-if="clientWidth <= 1"></v-header-mobile> -->
  <div class="modification-warn" v-if="TOOLTIP">{{ this.TOOLTIP }}</div>
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
    ...mapActions(["SET_SAVED_FAVORITES", "GET_POPULAR_FROM_API"]),
    displayWarnOfClosed() {
      let current_time = new Date().getHours();
      console.log(current_time);
      let current_day = new Date().getDay();

      let time_start = current_day == 5 || current_day == 6 ? 10 : 10;
      let time_end = current_day == 5 || current_day == 6 ? 23 : 22;

      if (localStorage.getItem("TIME_WARN_DISPLAYED") == null) {
        localStorage.setItem("TIME_WARN_DISPLAYED", false);
      }

      let warn = JSON.parse(localStorage.getItem("TIME_WARN_DISPLAYED"));

      if (current_time >= time_end || current_time < time_start) {
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
    this.SET_SAVED_FAVORITES(localStorage.getItem("SAVED_FAVORITES"));
    this.clientWidth = window.innerWidth;
    this.displayWarnOfClosed();
  },
  computed: {
    ...mapGetters(["TOOLTIP"]),
  },
};
</script>

<style lang="scss">
#app {
  padding-top: 10px;
  padding-bottom: 60px;
}
.navbar {
  &__item {
    position: relative;
    svg {
      path {
        fill: $black;
      }
    }
    span {
      display: none;
    }
    &-counter {
      background-color: $accent;
      border-radius: 50%;
      width: 12px;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      color: $white;
      position: absolute;
      top: -2px;
      right: 9px;
    }
    .burger {
      path {
        stroke: $black;
      }
    }
  }
}
.modification-warn {
  position: absolute;
  top: 60px;
  right: 60px;
  background-color: tomato;
  padding: 20px;
  border-radius: 20px;
  color: #fff;
  z-index: 5;
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
