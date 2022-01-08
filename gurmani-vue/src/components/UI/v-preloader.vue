<template>
  <div class="preloader" :style="{ backgroundColor: preloader_props.bgColor }">
    <div class="preloader__logo">
      <div class="preloader__animate"></div>
      <img
        class="preloader__logo-img"
        src="@/assets/media/img/logo.png"
        alt=""
      />
    </div>
    <h1
      class="preloader__subtitle"
      :style="{ color: preloader_props.subtitleColor }"
    >
      {{ this.preloader_props.subtitle }}
      <span class="preloader__dot">.</span>
      <span class="preloader__dot">.</span>
      <span class="preloader__dot">.</span>
    </h1>
  </div>
</template>
<script>
import gsap from "gsap";
import { TimelineMax } from "gsap";

export default {
  name: "v-preloader",
  props: {
    preloader_props: {
      type: Object,
      default() {
        return {
          subtitle: "Отправляю заказ",
          bgColor: "background-color: rgba($second-black, 0.7)",
          subtitleColor: "#fff",
          circleColor: "FF6800",
          homePage: false,
        };
      },
    },
  },
  data() {
    return {
      preload: this.preloader_props,
    };
  },
  methods: {
    // test() {
    //   console.log(this.preload);
    // },
  },
  mounted() {
    let dots = document.querySelectorAll(".preloader__dot");
    gsap;
    let props = this.preloader_props;
    console.log(props);

    let interval = setInterval(() => {
      if (props.homePage == true && props.loaded == true) {
        setTimeout(() => {
          gsap.to(".preloader__animate", 1.5, {
            scale: 10,
            zIndex: 3,
          });

          gsap.to(".preloader__animate", 1.5, {
            delay: 1.5,
            scale: 0,
          });

          gsap.to(".preloader__subtitle", 0, {
            delay: 1.5,
            display: "none",
          });

          gsap.to(".preloader", 1.5, {
            delay: 1.5,
            display: "none",
            backgroundColor: "transparent",
          });

          gsap.to(".preloader__logo-img", 1.5, {
            delay: 1.5,
            opacity: 0,
          });

          clearInterval(interval);
        }, 200);
      }
    }, 300);

    let tl = new TimelineMax({ repeat: -1 })
      .to(dots, 0.5, { opacity: 0, stagger: 0.1 })
      .to(dots, 0.5, { opacity: 1, stagger: 0.1 });
    tl.play();
  },
  // setup() {
  //   const beforeEnter = (el) => {
  //       gsap.to(el, 1, {opacity: 0})
  //   }
  //   const enter = (el) => {
  //       gsap.to(el, 2, {opacity: 1})
  //   }

  //   return {beforeEnter, enter}
  // }
};
</script>
<style lang="scss" scoped>
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($second-black, 0.7);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__logo {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &__logo-img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 4;
  }
  &__animate {
    content: "";
    width: 160px;
    height: 160px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: $accent;
    z-index: -1;
    border-radius: 50%;
  }
  &__subtitle {
    margin-top: 230px;
    @include h1;
    color: #fff;
    font-weight: 400;
    display: flex;
  }
}
</style>