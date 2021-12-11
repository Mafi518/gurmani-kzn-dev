<template>
  <button class="favorite-btn">
    <v-icon
      style="fill: #fff"
      class="favorite-icon"
      name="favorite-icon-active"
    ></v-icon>
  </button>
</template>

<script>
export default {
  name: "v-favorite-btn-active",
};
</script>

<style lang="scss" scoped>
.favorite-btn {
  border-radius: 10px;
  background-color: $accent;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  svg {
    width: 18px;
  }
}
</style>
