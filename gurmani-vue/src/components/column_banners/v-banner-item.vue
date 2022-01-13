<template>
  <div
    class="banner__item column__banner-item"
    ref="column_banner"
    @click="setPromo"
  >
    <img
      :src="`http://localhost:3000/column-banners/${banner_data.promo_picture}`"
      alt=""
    />
  </div>
</template>
<script>
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
    setPromo() {
      localStorage.setItem("setPromo", this.banner_data.promo_name);
      this.$router.push("/cart");
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
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
  img {
    margin-left: 15px;
  }
}
</style>
