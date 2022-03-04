<template>
  <button
    class="buy-btn buy-support"
    ref="buy"
    @click="test(this.$refs.buy)"
    v-if="this.added == false"
  >
    <div class="buy-support">
      <p class="buy-support buy-animate-text">Добавить в корзину</p>
      <p class="buy-support buy-animate-price"><slot></slot></p>
    </div>
    <img
      class="buy-support buy-animate-icon"
      src="@/assets/media/icons/plus-icon.svg"
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
    test(ref) {
      // let head = ref.childNodes[0].childNodes[0];
      // let price = ref.childNodes[0].childNodes[1];
      let icon = ref.childNodes[1];
      // head, price, icon, animation_image
      // let animation_image =
      //   ref.parentNode.childNodes[0].childNodes[0].getAttribute("src");

      let tl = new TimelineMax({})

      tl.to(icon, 0.7, {
        scale: 1.3
      })

      tl.play().then(() => {
        tl.reverse()
      })

      // this.addAnimation(head, price, icon, animation_image, ref);
    },

    // addAnimation(head, price, icon, animation_image, ref) {
    //   console.log(head, price, icon, animation_image);
    //   gsap;
    //   TimelineMax;
    //   const tl = new TimelineMax({});

    //   console.log(tl);

    //   tl.to(head, 0.7, {
    //     transform: "translateY(15px)",
    //     opacity: 0,
    //     ease: Power2.easeInOut,
    //   });
    //   tl.to(
    //     price,
    //     0.7,
    //     {
    //       transform: "translateY(15px)",
    //       opacity: 0,
    //       ease: Power2.easeInOut,
    //     },
    //     "-=0.6"
    //   );
    //   tl.to(
    //     icon,
    //     0.7,
    //     {
    //       opacity: 0,
    //     },
    //     "-=0.6"
    //   );

    //   tl.play().then(() => {
    //     let tl2 = new TimelineMax({});
    //     // tl.reverse()
    //     this.added = true;
    //     console.log(this.added);

    //     setTimeout(() => {
    //       tl2.to(this.$refs.animate_btn.childNodes[1], 0.7, {
    //         opacity: 1,
    //       });
    //       tl2.to(this.$refs.animate_btn.childNodes[0], 0.7, {
    //         attr: { src: animation_image },
    //       });
    //       tl2.to(this.$refs.animate_btn.childNodes[0], 0.7, {
    //         transform: `translateX(${
    //           this.$refs.animate_btn.getBoundingClientRect().width - 60
    //         }px)`,
    //         opacity: 0,
    //         ease: Power2.easeInOut,
    //         scale: 0.5,
    //       });
    //       tl2.to(
    //         this.$refs.animate_btn.childNodes[1],
    //         0.3,
    //         {
    //           scale: 1.3,
    //         },
    //         "-=0.5"
    //       );
    //       tl2
    //         .to(this.$refs.animate_btn.childNodes[1], 0.3, {
    //           scale: 1,
    //         })
    //         .then(() => {
    //           tl2.to(this.$refs.animate_btn, 0.7, {
    //             delay: 0.3,
    //             onComplete: () => {
    //               console.log();
    //               this.added = false;

    //               console.log(ref);
    //               // gsap.to(ref, 0.3, {
    //               //   opacity: 1,
    //               // })
    //             },
    //           });
    //         });
    //     }, 200);
    //   })

    //   // this.added = true;
    // },
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
  p:nth-child(1) {
    font-size: 16px;
    margin-bottom: 6px;
  }
  p:nth-child(2) {
    font-size: 18px;
    font-weight: bold;
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
</style>
