<template>
  <section class="banner">
    <div class="banner__list column__banner-list">
      <v-banner-item
        v-for="item in FILTER_BANNERS"
        :key="item.promo_name"
        :banner_data="item"
      ></v-banner-item>
    </div>
  </section>
</template>
<script>
import vBannerItem from "@/components/column_banners/v-banner-item";
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
      return this.SET_BANNERS.filter((el) => el.location == "body");
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
    padding: 0 5px;
    margin: 20px 0;
    margin-bottom: 0;
    img {
      max-width: 100%;
    }
  }
  &__item {
    margin: 0 5px;
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

@media (max-width: 768px) {
  .banner {
    &__list {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
    &__item {
      max-width: 45%;
      margin-bottom: 20px;
    }
  }
}
@media (max-width: 650px) {
  .banner {
    &__list {
      flex-direction: column;
      padding-right: 20px;
    }
    &__item {
      max-width: 100%;
    }
  }
}
</style>
