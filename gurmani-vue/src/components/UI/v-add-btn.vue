<template>
  <button
    class="buy-btn buy-support"
    ref="buy"
    @click="animate(this.$refs.buy)"
    v-if="this.added == false"
  >
    <div class="buy-support buy-support--container">
      <p class="buy-support buy-hidden buy-animate-text">Добавлено в корзину</p>
      <p class="buy-support">Добавить в корзину</p>
      <p class="buy-support"><slot></slot></p>
    </div>
    <img class="buy-support" src="@/assets/media/icons/plus-icon.svg" alt="" />
    <img
      class="buy-support buy-animate-icon"
      src="@/assets/media/icons/success-icon.svg"
      alt=""
    />
  </button>
</template>

<script>
import { TimelineMax } from "gsap";
export default {
  name: "v-add-btn",
  data() {
    return {
      added: false,
    };
  },
  methods: {
    animate(ref) {
      let icon = ref.childNodes[1];
      let hiddenText = ref.childNodes[0].childNodes[0];
      let hiddenImage = ref.childNodes[2];
      let text = ref.childNodes[0].childNodes[1];
      let price = ref.childNodes[0].childNodes[2];
      hiddenText;
      text;
      price;
      icon;
      hiddenImage;
      let tl = new TimelineMax({});

      tl.to(text, 0.5, {
        transform: "translateY(-30px)",
        opacity: 0,
      });

      tl.to(
        price,
        0.5,
        {
          transform: "translateY(30px)",
          opacity: 0,
        },
        "-=0.5"
      );

      tl.to(
        icon,
        0.5,
        {
          rotate: "160deg",
          opacity: 0,
          transform: "scale(0)",
        },
        "-=0.5"
      );

      tl.to(icon, 0, {
        display: "none",
      });

      tl.to(text, 0, {
        height: 0,
      });

      tl.to(price, 0, {
        height: 0,
      });

      tl.to(hiddenText, 0.5, {
        height: "auto",
        marginTop: "10px",
        opacity: 1,
      });

      tl.to(
        hiddenImage,
        0.5,
        {
          rotate: "0",
          opacity: 1,
          transform: "scale(1)",
          display: "initial",
        },
        "-=0.4"
      );

      tl.play().then(() => {
        setTimeout(() => {
          tl.reverse();
        }, 1000);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.buy-btn {
  border-radius: 10px;
  background-color: $accent;
  color: $white;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 76px;
  padding: 15px;
  font-family: roboto, sans-serif;
  width: 90%;
  bottom: 20px;
  position: fixed;
  overflow: hidden;
  cursor: pointer;
  p {
    text-align: left;
  }
  p:nth-child(1),
  p:nth-child(2) {
    font-size: 16px;
    margin-bottom: 6px;
  }
  p:nth-child(3) {
    font-size: 18px;
    font-weight: bold;
  }
  p,
  img,
  div {
    pointer-events: none;
  }
}
.animate-btn {
}
.animate-image {
  max-width: 100%;
  height: 100%;
}
.buy-cart-animate {
  opacity: 0;
}
.buy-hidden {
  height: 0;
  opacity: 0;
  overflow: hidden;
}
.buy-support {
  overflow: hidden;
}
.buy-support--container {
  position: relative;
}
.buy-animate-text {
}
.buy-animate-icon {
  transform: scale(0);
  display: none;
}
</style>
