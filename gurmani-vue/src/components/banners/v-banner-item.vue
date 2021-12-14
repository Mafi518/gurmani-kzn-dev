<template>
  <div class="banner__item">
    <img src="../../assets/media/img/banners/web.png"  alt="" />
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
  }
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
