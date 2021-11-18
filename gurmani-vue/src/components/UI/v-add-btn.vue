<template>
  <button class="buy-btn">
    <div>
      <p>Добавить в корзину</p>
      <p><slot></slot></p>
    </div>
    <img src="@/assets/media/icons/plus-icon.svg" alt="" />
  </button>
</template>

<script>
export default {
  name: "v-add-btn",
};
</script>

<style lang="scss" scoped>
.buy-btn {
  border-radius: 10px;
  background-color: $accent;
  color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 76px;
  padding: 15px;
  font-family: roboto, sans-serif;
  width: 90%;
  bottom: 64px;
  position: fixed;
  p {
    text-align: left;
  }
  p:nth-child(1) {
    font-size: 16px;
    margin-bottom: 6px;
  }
  p:nth-child(2) {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
