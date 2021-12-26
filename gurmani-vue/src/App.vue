<template>
  <v-header-desktop v-if="clientWidth > 768"></v-header-desktop>
  <v-header-mobile v-if="clientWidth <= 768"></v-header-mobile>
  <v-gurmani-closed></v-gurmani-closed>

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script>
import vHeaderDesktop from '@/components/v-header-top-desktop'
import vHeaderMobile from '@/components/v-header-top-mobile'
import vGurmaniClosed from '@/components/v-gurmani-closed'
import { mapActions } from "vuex";
export default {
  components: {vHeaderDesktop, vHeaderMobile, vGurmaniClosed},
  data() {
    return {
      clientWidth: 0,
    };
  },
  methods: {
    ...mapActions(["SET_SAVED_FAVORITES_TO_STATE", "GET_POPULAR_FROM_API", "GET_TIME"]),
  },
  mounted() {
    this.SET_SAVED_FAVORITES_TO_STATE(localStorage.getItem("saved favorites"));
    this.clientWidth = window.innerWidth
    this.GET_TIME()
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
  transition: opacity 0.2s ease-out;
}

.animate-circle {
  position: fixed;
  left: -50%;
  bottom: -50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  transform-origin: bottom left;
  background-color: $white;
  z-index: 3;
}
</style>
