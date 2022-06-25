<template>
  <div class="banner__item" @click="setPromo">
    <img
      :src="`https://gurmanikzn.ru:3000/${banner_data.promo_picture}`"
      alt=""
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "v-banner-item",
  props: {
    banner_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...mapActions(["ADD_TO_CART"]),
    setPromo() {
      localStorage.setItem("setPromo", this.banner_data.promo_name);
      this.$router.push("/cart");
    },
  },
};
</script>
<style lang="scss">
.banner__item {
  margin-right: 20px;
  margin-right: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  cursor: pointer;
  // img {
  //   max-width: 384px;
  //   border-radius: 10px;
  // }
  img {
    max-width: 374px;
    border-radius: 10px;
    margin-left: 20px;
  }
}

// @media (max-width: 1025px) and (min-width: 1px) {
//   .banner__item {
//     img {
//       // max-width: 320px;
//     }
//   }
// }
@media (max-width: 768px) {
  .banner__item {
    img {
      max-width: 340px;
    }
  }
}
</style>
