<template>
  <div class="pickup-popup">
    <v-back-menu class="pickup-popup__back">
      <button
        class="cart-back-btn pickup-popup__close"
        @click="togglePickupPopup"
      >
        <v-icon name="back-icon"></v-icon>
      </button>
    </v-back-menu>
    <h2 class="pickup-popup__title">Выберите адрес самовывоза</h2>
    <div class="pickup-popup__container">
      <button
        class="pickup-popup__btn"
        @click="
          SET_PICKUP_ADDRESS('ул. Оренбургский тракт, 8В'), sendFrontpadOrder()
        "
      >
        ул. Оренбургский тракт, 8В
      </button>
      <button
        class="pickup-popup__btn"
        @click="SET_PICKUP_ADDRESS('ул. Главная, 47'), sendFrontpadOrder()"
      >
        ул. Главная, 47
      </button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "v-pickup-popup",
  methods: {
    ...mapActions(["SET_PICKUP_ADDRESS"]),
    togglePickupPopup() {
      this.$emit("togglePickupPopup");
    },
    sendFrontpadOrder() {
      console.log("ddddddddddd");
      this.$emit("sendFrontpadOrder");
    },
  },
};
</script>
<style lang="scss" scoped>
.pickup-popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: $white;
  z-index: 2;
  // .pickup-popup__back

  &__back {
  }
  // .pickup-popup__close

  &__close {
    cursor: pointer;
  }
  // .pickup-popup__title

  &__title {
    @include h2;
    margin: 40px 0;
  }

  // .pickup-popup__container

  &__container {
    display: flex;
    max-width: 600px;
    width: 100%;
  }

  // .pickup-popup__btn

  &__btn {
    padding: 14px;
    font-size: 18px;
    background-color: $accent;
    color: $white;
    cursor: pointer;
    border-radius: 10px;
    margin: 0 10px;
    text-align: center;
    width: 50%;
  }
}

@media (max-width: 600px) {
  .pickup-popup {
    &__container {
      flex-direction: column;
      padding: 0 15px;
    }

    &__btn {
      margin: 10px 0;
      width: initial;
    }
  }
}
</style>
