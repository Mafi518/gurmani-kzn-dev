<template>
  <button class="favorite-btn">
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
.favorite-btn {
  border-radius: 10px;
  background-color: $unactive-accent;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  svg {
    width: 18px;
  }
}
</style>
