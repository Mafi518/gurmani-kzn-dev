<template>
  <div>
    <v-favorite-list> </v-favorite-list>
  </div>
</template>

<script>
import vFavoriteList from "@/components/favorites/v-favorite-list";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "v-favorite",
  components: {
    vFavoriteList,
  },
  methods: {
    ...mapActions(["SET_SAVED_FAVORITES"]),
    getFavorites() {
      if (this.FAVORITES.length <= 0) {
        this.SET_SAVED_FAVORITES(localStorage.getItem("SAVED_FAVORITES"));
      }
    },
  },
  computed: {
    ...mapGetters(["FAVORITES"]),
  },
  mounted() {
    this.getFavorites();
  },
};
</script>

<style lang="scss"></style>
