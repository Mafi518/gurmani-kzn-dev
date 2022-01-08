<template>
  <div class="back">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "v-back-menu",
};
</script>

<style lang="scss" scoped>
.back {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
</style>
