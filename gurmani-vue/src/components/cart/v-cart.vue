<template>
  <div>
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.product_id"
      :cart_item_data="item"
      @increment="increment(index)"
      @decrement="decrement(index)"
      @togglesize="togglesize(index)"
    >
    </v-cart-item>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import vCartItem from "@/components/cart/v-cart-item";
export default {
  name: "v-cart",
  components: {
    vCartItem,
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    ...mapActions(["INCREMENT_POPUP_ITEM", "DECREMENT_POPUP_ITEM", "TOGGLE_SIZE_OF_PIZZA"]),
    increment(index) {
      this.INCREMENT_POPUP_ITEM(index);
    },
    decrement(index) {
      this.DECREMENT_POPUP_ITEM(index);
    },
    togglesize(index) {
      this.TOGGLE_SIZE_OF_PIZZA(index)
    }
  },
};
</script>
<style lang="scss"></style>
