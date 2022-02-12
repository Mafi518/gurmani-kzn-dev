<template>
  <section class="popular">
    <h2 class="popular__title">Популярное</h2>
    <div class="popular__list">
      <v-popular-item
        v-for="popular in POPULAR"
        :key="popular.id"
        :popular_data="popular"
      ></v-popular-item>
    </div>
  </section>
</template>
<script>
import vPopularItem from "@/components/populars/v-popular-item";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-popular-list",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["POPULAR"]),
  },
  methods: {
    ...mapActions(["GET_POPULAR_FROM_API"]),
  },
  mounted() {
    // this.GET_POPULAR_FROM_API();
  },
  components: {
    vPopularItem,
  },
};
</script>
<style lang="scss">
.popular {
  &__title {
    @include h2;
  }
  &__list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: auto;
  }
}
@media (max-width: 1920px) and (min-width: 1025px) {
  .popular {
    &__list {
      padding-bottom: 10px;
    }
  }
}
@media (max-width: 1024px) and (min-width: 1px) {
  .popular {
    &__title {
      @include h2;
      margin-left: 20px;
    }
  }
}
</style>
