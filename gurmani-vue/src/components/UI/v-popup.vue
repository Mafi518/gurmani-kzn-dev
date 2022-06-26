<template>
  <div class="popup" v-show="data.options.visible && data.options.require_auth">
    <h1 class="popup__title">{{ data.title }}</h1>
    <slot></slot>
    <button
      class="popup__save"
      @click="$emit('adminSave', 'save', data.options.controll)"
    >
      Сохранить
    </button>
    <button
      class="popup__save"
      @click="$emit('adminSave', 'cancel', data.options.controll)"
    >
      Отменить
    </button>
  </div>
</template>
<script>
export default {
  name: "v-popup",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.popup {
  // .popup__title

  &__title {
    margin-bottom: 36px;
  }

  // .popup__save

  &__save {
    margin-right: 10px;
    padding: 14px;
    border: 1px solid $accent;
    background-color: $white;
    border-radius: 10px;
    cursor: pointer;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
