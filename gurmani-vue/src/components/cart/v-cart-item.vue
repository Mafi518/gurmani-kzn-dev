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
      <h3 class="cart__item-title">{{ cart_item_data.product_name }}</h3>
      <div class="cart__item-container">
        <p class="cart__item-price">
          {{ cart_item_data.price[1].slice(0, -2) }}
          ₽
          <!-- {{
            this.size == "small-size"
              ? cart_item_data.spots[0].price.slice(0, -2) *
                cart_item_data.count
              : ""
              ? this.size == "big-size"
              : cart_item_data.group_modifications[0].modifications[0].price *
                cart_item_data.count
          }}
          ₽ -->
        </p>
        <div class="cart__item-controls">
          <v-icon name="controls-minus-icon" @click="decrementItem"></v-icon>
          <p class="cart__item-count">{{ cart_item_data.count }}</p>
          <v-icon name="controls-plus-icon" @click="incrementItem"></v-icon>
        </div>
      </div>

      <p class="cart__item-weight">{{ cart_item_data.out }} г</p>
    </div>
    <div
      class="popup__size"
      v-if="cart_item_data.product_name.includes('Пицца')"
    >
      <label
        class="popup__label"
        v-for="(modification, index) in cart_item_data.group_modifications"
        :key="modification.dish_modification_group_id"
        @click="toggleSize(index)"
      >
        <input
          type="radio"
          :checked="cart_item_data.group_modifications[index].checked == true"
          :name="cart_item_data.photo_origin"
          class="popup__input"
        />
        {{ modification.name }}
      </label>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "v-cart-item",
  computed: {
    modificationPrice() {
      if (this.cart_item_data.product_name.includes("Пицца")) {
        let checkedModification =
          this.cart_item_data.group_modifications.filter(
            (mode) => mode.checked == true
          );
        return (
          this.cart_item_data.count *
            checkedModification[0].modifications.map((mode) => mode.price) -
          this.cart_item_data.price[1].slice(0, -2) * this.cart_item_data.count
        );
      } else {
        let array = this.cart_item_data.group_modifications.map(
          (mode) => mode.count * mode.modifications.map((modif) => modif.price)
        );
        let reducer = (previousValue, currentValue) =>
          previousValue + currentValue;
        return array.reduce(reducer);
      }
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["TOGGLE_SIZE_OF_PIZZA", "FULL_PRICE"]),
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
  mounted() {},
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
      min-height: 72px;
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
  }
}
</style>
