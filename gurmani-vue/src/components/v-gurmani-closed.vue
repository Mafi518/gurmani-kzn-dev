<template>
  <div
    class="closed-popup"
    v-if="show_popup_from_vuex == true && close_popup == false"
  >
    <div class="closed-popup__info">
      <img src="@/assets/media/img/logo.png" alt="" />
      <p class="closed-popup__description">
        К сожалению мы уже закрыты Работаем ежедневно с 10.00 до 22.00 Вы можете
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
import { mapGetters } from "vuex";
export default {
  name: "v-gurmani-closed",
  data() {
    return {
      close_popup: false,
      show_popup_from_vuex: JSON.parse(
        localStorage.getItem("warning_was_displayed")
      ),
    };
  },
  computed: {
    ...mapGetters(["TIME_WARNING"]),
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
    transform: translate(-50%, -50%);
    @include container;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 11;
  }
  &__btn {
    border-radius: 10px;
    background-color: #ff6800;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    width: 100%;
    font-family: roboto, sans-serif;
  }
  &__description {
    margin: 12px 0;
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