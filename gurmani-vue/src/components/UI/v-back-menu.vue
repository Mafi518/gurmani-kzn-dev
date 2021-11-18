<template>
  <div class="back">
    <router-link :to="`/`" @click="clearPopupState" class="btn">
      <v-icon name="back-icon"></v-icon>
    </router-link>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "v-back-menu",
  methods: {
    clearPopupState() {
      this.$store.state.product = {};
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  @include shadow;
  width: 38px;
  height: 38px;
  background-color: $white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.back {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
