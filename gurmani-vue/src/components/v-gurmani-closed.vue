<template>
  <div class="closed-popup">
    <div class="closed-popup__info">
      <img src="@/assets/media/img/logo.svg" alt="" />
      <p class="closed-popup__description">
        К сожалению мы уже закрыты Работаем ежедневно с
        {{ day == 5 || day == 6 ? "10:00 - 23:00" : "10:00 - 22:00" }} Вы можете
        сделать предзаказ на завтра
      </p>
      <button class="closed-popup__btn" @click="close_popup = true">
        Сделать предзаказ
      </button>
    </div>
    <div class="bg" @click="close_popup = true"></div>
  </div>
</template>
<script>
export default {
  name: "v-gurmani-closed",
  data() {
    return {
      day: new Date().getDay(),
    };
  },
};
</script>
<style lang="scss" scoped>
.closed-popup {
  img {
    max-width: 150px;
  }
  &__info {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 250px;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    @include container;
    padding: 20px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    z-index: 11;
  }
  &__btn {
    border-radius: 10px;
    background-color: #ff6800;
    color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 15px;
    width: 100%;
    font-family: roboto, sans-serif;
    text-align: center;
  }
  &__description {
    margin: 12px 0;
    text-align: center;
  }
}
.bg {
  background-color: $second-black;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  opacity: 0.7;
}
</style>
