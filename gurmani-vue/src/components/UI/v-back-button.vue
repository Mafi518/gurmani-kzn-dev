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
  min-width: 38px;
  height: 38px;
  background-color: $white;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
</style>
