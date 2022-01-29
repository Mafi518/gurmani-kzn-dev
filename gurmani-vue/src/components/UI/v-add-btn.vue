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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  height: 76px;
  padding: 15px;
  font-family: roboto, sans-serif;
  width: 90%;
  bottom: 20px;
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
