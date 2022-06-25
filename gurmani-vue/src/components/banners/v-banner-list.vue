<template>
  <section class="banner">
    <div class="banner__list">
      <v-banner-item
        v-for="item in FILTER_BANNERS"
        :key="item.promo_name"
        :banner_data="item"
      ></v-banner-item>
    </div>
  </section>
</template>
<script>
import vBannerItem from "@/components/banners/v-banner-item";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-banner-list",
  components: {
    vBannerItem,
  },
  methods: {
    ...mapActions(["GET_BANNERS"]),
  },
  computed: {
    ...mapGetters(["SET_BANNERS"]),
    FILTER_BANNERS() {
      return this.SET_BANNERS.filter((el) => el.location == "header");
    },
  },
  mounted() {
    this.GET_BANNERS();
  },
};
</script>
<style lang="scss" scoped>
.banner {
  margin: 0 auto;
  &__list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: auto;
  }
}
@media (max-width: 1920px) and (min-width: 1025px) {
  .banner {
    &__list {
      padding: 0 10px;
      padding-bottom: 10px;
    }
  }
}
</style>
