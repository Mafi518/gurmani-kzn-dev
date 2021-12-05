<template>
  <article v-if="PRODUCT.photo_origin" class="popup">
    <v-back-menu @click="reset"><v-favorite-btn></v-favorite-btn></v-back-menu>
    <article class="popup__item">
      <div class="popup__head">
        <picture>
          <source
            :srcset="`https://gurmanikzndev.joinposter.com${PRODUCT.photo_origin}`"
          />
          <img
            :src="`https://gurmanikzndev.joinposter.com${PRODUCT.photo_origin}`"
          />
        </picture>
        <div class="popup__wrap">
          <div class="popup__info">
            <h2 class="popup__title" style="margin-bottom: 0px">
              {{ PRODUCT.product_name }}
            </h2>
            <p class="popup__subtitle">
              <span class="popup__price"
                >{{
                  // PRODUCT.price[1].slice(0, -2) * PRODUCT.count + modificationPrice
                  PRODUCT.price[1].slice(0, -2)
                }}
                ₽</span
              >
              – (220 г)
            </p>
          </div>
          <div class="popup__controls">
            <div class="popup__counter">
              <button class="popup__minus-counter">
                <v-icon
                  name="controls-minus-icon"
                  @click="decrementItem"
                ></v-icon>
              </button>
              <span class="popup__count"> {{ PRODUCT.count }} </span>
              <button class="popup__plus-counter">
                <v-icon
                  name="controls-plus-icon"
                  @click="incrementItem"
                ></v-icon>
              </button>
            </div>
            <div
              class="popup__size"
              v-if="PRODUCT.product_name.includes('Пицца')"
            >
              <label
                class="popup__label"
                v-for="(modification, index) in PRODUCT.group_modifications"
                :key="modification.dish_modification_group_id"
                @click="toggleSize(index)"
              >
                <input
                  type="radio"
                  :checked="PRODUCT.group_modifications[index].checked == true"
                  name="size"
                  class="popup__input"
                />
                {{ modification.name }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="popup__body">
        <div class="popup__info">
          <h2 class="popup__title">Ингредиенты</h2>
          <section class="ingredients">
            <div
              class="ingredient"
              v-for="ingredient in PRODUCT.ingredients"
              :key="ingredient.ingredient_id"
            >
              <div
                class="ingredient__head"
                :style="{
                  'background-color': `${ingredient.ingredient_color}`,
                }"
              >
                <v-icon :name="ingredient.ingredient_icon"></v-icon>
              </div>
              <p class="ingredient__body">{{ ingredient.ingredient_name }}</p>
            </div>
          </section>
        </div>

        <div class="popup__info">
          <h2 class="popup__title">О блюде</h2>
          <div class="about">
            {{ PRODUCT.product_production_description }}
          </div>
        </div>

        <div class="popup__info">
          <section
            class="additional"
            v-if="!PRODUCT.product_name.includes('Пицца')"
          >
            <article
              class="additional__card"
              v-for="(modification, index) in PRODUCT.group_modifications"
              :key="modification.dish_modification_group_id"
            >
              <div class="additional__delete">
                <v-icon
                  name="controls-minus-icon"
                  @click="deleteModification(index)"
                ></v-icon>
              </div>
              <div class="additional__add">
                <v-icon
                  name="plus-icon"
                  @click="addModification(index)"
                ></v-icon>
              </div>
              <div class="additional__head">
                {{ modification.count }}
                <picture>
                  <source
                    :srcset="`https://gurmanikzndev.joinposter.com${modification.modifications[0].photo_large}`"
                  />
                  <img
                    :src="`https://gurmanikzndev.joinposter.com${modification.modifications[0].photo_large}`"
                    alt=""
                  />
                </picture>
              </div>
              <div class="additional__body">
                {{
                  modification.name +
                  " | " +
                  modification.modifications[0].price.toString().slice(0, -2) +
                  "₽"
                }}
              </div>
            </article>
          </section>
        </div>
      </div>

      <div class="popup__info">
        <h2 class="popup__title">Вам может понравиться</h2>
        <section class="like" v-if="PRODUCT.category_name == 'Популярное'">
          <v-card-small
            v-for="like in POPULAR"
            :key="like.id"
            :like_data="like"
            @getProductInfo="getProductInfo"
          ></v-card-small>
        </section>
        <section class="like" v-else-if="PRODUCT.category_name == 'Соуса'">
          <v-card-small
            v-for="like in POPULAR"
            :key="like.id"
            :like_data="like"
            @getProductInfo="getProductInfo"
          ></v-card-small>
        </section>
        <section class="like" v-else>
          <v-card-small
            v-for="like in CATEGORY_PRODUCTS"
            :key="like.id"
            :like_data="like"
            @getProductInfo="getProductInfo"
          ></v-card-small>
        </section>
      </div>
      <v-add-btn @click="addToCart"
        >{{
          // PRODUCT.price[1].slice(0, -2) * PRODUCT.count + modificationPrice
          PRODUCT.price[1].slice(0, -2)
        }}
        ₽</v-add-btn
      >
    </article>
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-product-popup",
  data() {
    return {};
  },
  props: {
    popup_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...mapActions([
      "GET_PRODUCT_INFO",
      "INCREMENT_POPUP_ITEM",
      "DECREMENT_POPUP_ITEM",
      "ADD_TO_CART",
      "TOGGLE_SIZE_OF_PIZZA",
      "RESET_PRODUCT",
      "FULL_PRICE",
    ]),
    reset() {
      this.RESET_PRODUCT();
    },
    getProductInfo(data) {
      this.GET_PRODUCT_INFO(data);
      window.scrollBy(0, -400);
    },
    incrementItem() {
      this.INCREMENT_POPUP_ITEM();
      this.FULL_PRICE(this.PRODUCT);
    },
    decrementItem() {
      this.DECREMENT_POPUP_ITEM();
      this.FULL_PRICE(this.PRODUCT);
    },
    addToCart(data) {
      data = this.PRODUCT;

      this.ADD_TO_CART(data);
    },
    deleteModification(index) {
      if (this.PRODUCT.group_modifications[index].count > 0) {
        this.$store.state.product.group_modifications[index].count--;
        this.FULL_PRICE(this.PRODUCT);
      }
    },
    addModification(index) {
      this.$store.state.product.group_modifications[index].count++;
      this.FULL_PRICE(this.PRODUCT);
    },
    toggleSize(index) {
      this.TOGGLE_SIZE_OF_PIZZA(index);
      this.FULL_PRICE(this.PRODUCT);
    },
    // fullPrice() {
    //   this.FULL_PRICE(this.PRODUCT)
    // }
  },
  computed: {
    ...mapGetters(["PRODUCT", "POPULAR", "CATEGORY_PRODUCTS"]),
  },
  mounted() {
    // this.PRODUCT.group_modifications.map(modification => modification.count = 0)
    // if(document.querySelector('.popup__input')) {
    //   document.querySelector('.popup__input').checked = true
    //   console.log(document.querySelector('.popup__input'));
    // }
  },
};
</script>

<style lang="scss" scoped>
.popup {
  background-color: $white;
  width: 100vw;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding: 40px 0px 135px 20px;
  .back {
    margin-right: 20px;
    .btn {
      @include shadow;
      width: 38px;
      height: 38px;
    }
  }
  &__item {
  }
  &__size {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 140px;
    width: 100%;
    margin-top: 8px;
  }
  &__label {
    position: relative;
    display: flex;
    align-items: center;
  }
  &__input {
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

  &__head {
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 32px;
    img {
      max-width: 234px;
      margin-bottom: 40px;
    }
  }
  &__body {
    margin-top: 30px;
  }
  &__wrap {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .popup__info {
      margin-bottom: 0;
    }
  }
  &__info {
    // margin-bottom: 30px;
    margin-bottom: 30px;
  }
  &__title {
    @include h2;
    font-size: 22px;
  }

  &__subtitle {
    font-size: 18px;
    margin-top: 8px;
    font-weight: bold;
  }
  &__price {
    color: $accent;
  }
  &__controls {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-left: 15px;
    max-width: 150px;
    width: 100%;
  }
  &__counter {
    display: flex;
  }
  &__count {
    font-size: 24px;
    font-weight: normal;
    margin: 0 10px;
  }
}
.ingredients {
  display: flex;
  overflow: auto;
}
.ingredient {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: normal;
  margin-right: 20px;
  &__head {
    width: 70px;
    height: 70px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    // background-color: #ffd1b9;
  }

  &__body {
    margin-top: 5px;
  }
}
.about {
  line-height: 130%;
  color: $second-black;
}
.additional {
  display: flex;
  overflow: auto;
  &__card {
    min-width: 115px;
    height: 115px;
    margin-right: 20px;
    padding: 0 4px 12px 4px;
    @include container;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: column;
    font-weight: normal;
    position: relative;
  }
  &__delete {
    background-color: $accent;
    border-radius: 10px 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
  }
  &__add {
    background-color: $accent;
    border-radius: 0 10px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
  }
  &__head * {
    height: 53px;
  }
  &__body {
    font-size: 12px;
    margin-top: 5px;
  }
}
.like {
  display: flex;
  overflow: auto;
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>
