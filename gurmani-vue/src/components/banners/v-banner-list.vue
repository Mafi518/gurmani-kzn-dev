<template>
  <section class="banner">
    <div class="banner__list">
      <v-banner-item></v-banner-item>
      <v-banner-item></v-banner-item>
      <v-banner-item></v-banner-item>
    </div>
  </section>
</template>
<script>
import vBannerItem from "@/components/banners/v-banner-item";
export default {
  name: "v-banner-list",
  components: {
    vBannerItem,
  },
};
</script>
<style lang="scss">
.banner {
  margin: 0 auto;
  &__list {
    display: flex;
    overflow: auto;
  }
}
</style>
