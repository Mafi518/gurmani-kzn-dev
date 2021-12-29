<template>
  <div class="banner__item" @click="setPromo">
    <img :src="`http://185.185.68.196:3000/${banner_data.promo_picture}`"  alt="" />
  </div>
</template>
<script>
export default {
  name: 'v-banner-item',
  props: {
    banner_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    setPromo() {
      localStorage.setItem("setPromo", this.banner_data.promo_name)
      this.$router.push('/cart')
    }
  },
};
</script>
<style lang="scss">
.banner__item {
  margin: 0 20px;
  margin-right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 374px;
    max-height: 154px;
  }
}
</style>
