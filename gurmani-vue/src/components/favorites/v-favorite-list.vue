<template>
  <div class="favorites favorites__list">
    <v-favorite-item
      v-for="favorite in FAVORITES"
      :key="favorite.product_id"
      :favorite_data="favorite"
    >
    </v-favorite-item>
  </div>
</template>
<script>
import vFavoriteItem from "@/components/favorites/v-favorite-item";
import { mapGetters } from "vuex";
export default {
  name: "v-favorite-list",
  components: {
    vFavoriteItem,
  },
  methods: {},
  computed: {
    ...mapGetters(["FAVORITES"]),
  },
};
</script>
<style lang="scss" scoped>
.fix {
  margin-right: 20px;
}

.favorites {
  margin-left: 20px;
  &__list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
}
</style>
