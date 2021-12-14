<template>
  <section class="banner">
    <div class="banner__list">
      <v-banner-item
        v-for="item in SET_BANNERS"
        :key="item.promo_name"
        :banner_data="item"
      ></v-banner-item>
    </div>
  </section>
</template>
<script>
import vBannerItem from "@/components/banners/v-banner-item";
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "v-banner-list",
  components: {
    vBannerItem,
  },
  methods: {
    ...mapActions(["GET_BANNERS"])
  },
  computed: {
    ...mapGetters(["SET_BANNERS"])
  },
  mounted() {
    this.GET_BANNERS()
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
