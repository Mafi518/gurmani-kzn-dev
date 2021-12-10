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
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
