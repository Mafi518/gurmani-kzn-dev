<template>
  <button class="btn favorite">
    <v-icon
      style="fill: #fff"
      class="favorite-icon"
      name="favorite-icon"
    ></v-icon>
  </button>
</template>

<script>
export default {
  name: "v-favorite-btn",
};
</script>

<style lang="scss" scoped>
.btn {
  border-radius: 10px;
  background-color: $unactive-accent;
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
