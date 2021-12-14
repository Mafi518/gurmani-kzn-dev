<template>
  <div class="cart__item">
    <div class="cart__item-img">
      <img
        :src="`https://gurmanikzndev.joinposter.com${cart_item_data.photo_origin}`"
        alt=""
        class="cart__item-image"
      />
    </div>

    <div class="cart__item-info">
      <div class="cart__item-container">
        <h3 class="cart__item-title">{{ cart_item_data.product_name }}</h3>
        <div
          class="cart__item-controls"
          v-if="cart_item_data.product_name.includes('Пицца')"
        >
          <v-icon name="controls-minus-icon" @click="decrementItem"></v-icon>
          <p class="cart__item-count">{{ cart_item_data.count }}</p>
          <v-icon name="controls-plus-icon" @click="incrementItem"></v-icon>
        </div>
      </div>

      <div class="cart__item-container">
        <p class="cart__item-price">
          {{ cart_item_data.price[1].slice(0, -2) }}
          ₽
        </p>
        <div
          class="cart__item-controls"
          v-if="!cart_item_data.product_name.includes('Пицца')"
        >
          <v-icon name="controls-minus-icon" @click="decrementItem"></v-icon>
          <p class="cart__item-count">{{ cart_item_data.count }}</p>
          <v-icon name="controls-plus-icon" @click="incrementItem"></v-icon>
        </div>
      </div>

      <div class="cart__item-container">
        <p class="cart__item-weight">{{ cart_item_data.out }} г</p>
        <div
          class="cart__item-size"
          v-if="cart_item_data.product_name.includes('Пицца')"
        >
          <label
            class="cart__item-label"
            v-for="(modification, index) in cart_item_data.group_modifications"
            :key="modification.dish_modification_group_id"
            @click="toggleSize(index)"
          >
            <input
              type="radio"
              ref="radio"
              :checked="
                cart_item_data.group_modifications[index].checked == true
              "
              :name="cart_item_data.photo_origin"
              class="cart__item-input"
            />
            {{ modification.name }}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "v-cart-item",
  computed: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(["TOGGLE_SIZE_OF_PIZZA"]),
    incrementItem() {
      this.$emit("increment");
    },
    decrementItem() {
      this.$emit("decrement");
    },
    toggleSize(index) {
      this.TOGGLE_SIZE_OF_PIZZA(index, this.cart_item_data);
      localStorage.setItem("pizzaSize", index);
    },
  },
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    let inputs = document.querySelectorAll(".popup__input:checked");
    setTimeout(() => {
      inputs.forEach((element) => {
        element.click();
      });
    }, 100);
  },
};
</script>
<style lang="scss" scoped>
.cart {
  &__item {
    @include container;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 10px;
    margin-top: 30px;
    &-img {
      max-width: 109px;
      max-height: 72px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &-image {
      max-width: 109px;
      max-height: 72px;
    }
    &-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      min-height: 80px;
      margin-left: 13px;
    }
    &-title {
      @include h3;
    }
    &-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &-price {
      @include h3;
    }
    &-controls {
      display: flex;
      align-items: center;
      svg {
        width: 28px;
      }
    }
    &-count {
      margin: 0 10px;
      font-size: 18px;
    }
    &-weight {
      color: $second-black;
      font-size: 10px;
    }
    &-size {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 136px;
      width: 100%;
    }
    &-label {
      position: relative;
      display: flex;
      align-items: center;
    }
    &-input {
      appearance: none;
      margin-right: 6px;
      &:checked::after {
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: $accent;
        position: absolute;
        top: 4px;
        left: 4px;
      }
      &::before {
        content: "";
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid $accent;
        display: flex;
      }
    }
  }
}
</style>
