<template>
  <router-link :to="`/`" class="btn">
    <v-icon name="back-icon"></v-icon>
  </router-link>
</template>
<script>
export default {
  name: "v-back-btn",
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
</style>
