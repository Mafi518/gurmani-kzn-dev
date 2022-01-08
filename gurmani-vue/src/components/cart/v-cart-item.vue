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
      </div>

      <div class="cart__item-container">
        <p class="cart__item-price">
          {{ cart_item_data.price[1].slice(0, -2) }}
          ₽
        </p>
        <div
          class="cart__item-controls"
          v-if="cart_item_data.product_name.includes('Пицца')"
        >
          <v-icon name="controls-minus-icon" @click="decrementItem"></v-icon>
          <p class="cart__item-count">{{ cart_item_data.count }}</p>
          <v-icon name="controls-plus-icon" @click="incrementItem"></v-icon>
        </div>
        <div
          class="cart__item-controls"
          v-if="!cart_item_data.product_name.includes('Пицца')"
        >
          <v-icon
            name="controls-minus-icon"
            class="cart__item-control"
            @click="decrementItem"
          ></v-icon>
          <p class="cart__item-count">{{ cart_item_data.count }}</p>
          <v-icon
            name="controls-plus-icon"
            class="cart__item-control"
            @click="incrementItem"
          ></v-icon>
        </div>
      </div>

      <div class="cart__item-container">
        <div
          class="cart__item-size"
          v-if="cart_item_data.product_name.includes('Пицца')"
        >
          <div
            class="cart__item-radio"
            v-for="(modification, index) in cart_item_data
              .group_modifications[0].modifications"
            :key="modification.dish_modification_group_id"
          >
            <input
              type="radio"
              ref="radio"
              :checked="
                cart_item_data.group_modifications[0].modifications[index]
                  .checked == true
              "
              :name="cart_item_data.photo_origin"
              class="cart__item-input"
            />
            <label class="cart__item-label" @click="toggleSize(index)">
              {{ modification.name }}
            </label>
          </div>
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
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 14px 10px;
    margin-top: 30px;
    &-img {
      max-width: 109px;
      width: 100%;
    }
    &-image {
      width: calc(100% - 10%);
      height: calc(100% - 10%);
    }
    &-info {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      margin-left: 13px;
    }
    &-title {
      @include h3;
    }
    &-container {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    &-price {
      @include h3;
    }
    &-controls {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
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
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      max-width: 150px;
      width: 100%;
    }
    &-radio {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    &-label {
      white-space: nowrap;
    }
    &-input {
      position: absolute;
      z-index: -1;
      opacity: 0;
      appearance: none;
      -webkit-appearance: none;
    }
    &-input + label {
      display: inline-flex;
      align-items: center;
      user-select: none;
    }
    &-input + label::before {
      content: "";
      display: inline-block;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      flex-grow: 0;
      border: 1px solid $accent;
      border-radius: 50%;
      margin-right: 10px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 60% 60%;
    }
    &-input:checked + label::before {
      background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' rx='9' fill='%23FF6800'/%3E%3C/svg%3E%0A");
    }
  }
}
</style>
