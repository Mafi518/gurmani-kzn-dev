<template>
  <article v-if="PRODUCT.photo_origin" class="popup">
    <v-back-menu
      ><v-back-btn @click="clearPopupState"></v-back-btn>
      <v-favorite-btn
        @click="addToFavorites"
        v-if="!PRODUCT.favorites"
      ></v-favorite-btn>
      <v-favorite-btn-active
        @click="addToFavorites"
        v-if="PRODUCT.favorites == true"
      ></v-favorite-btn-active>
    </v-back-menu>
    <article class="popup__item">
      <div class="popup__head">
        <img
          :src="`https://gurmanikzndev.joinposter.com${PRODUCT.photo_origin}`"
        />
        <div class="popup__wrap">
          <div class="popup__info popup__media">
            <h2 class="popup__title" style="margin-bottom: 0px">
              {{ PRODUCT.product_name }}
            </h2>
            <p class="popup__subtitle">
              <span class="popup__price"
                >{{ PRODUCT.price[1].slice(0, -2) }} ₽</span
              >
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
              v-if="PRODUCT.category_name.includes('Пиццы')"
            >
              <div
                class="popup__radio"
                v-for="(modification, index) in PRODUCT.group_modifications[0]
                  .modifications"
                :key="modification.dish_modification_group_id"
              >
                <input
                  type="radio"
                  :checked="
                    PRODUCT.group_modifications[0].modifications[index]
                      .checked == true
                  "
                  name="size"
                  class="popup__input"
                />

                <label class="popup__label" @click="toggleSize(index)">
                  {{ modification.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="popup__body">
        <div class="popup__info" v-if="client_width > 768">
          <div class="about">
            {{ PRODUCT.product_production_description }}
          </div>
        </div>
        <div class="popup__info">
          <h3 class="popup__title popup__title--small">Ингредиенты</h3>
          <section class="ingredients">
            <div
              class="ingredient"
              v-for="ingredient in PRODUCT.ingredients"
              :key="ingredient.ingredient_id"
            >
              <div class="ingredient__head">
                <img
                  :src="
                    require(`@/assets/media/img/ingredients/${ingredient.ingredient_icon}.png`)
                  "
                  alt=""
                />
              </div>
              <p class="ingredient__body">{{ ingredient.ingredient_name }}</p>
            </div>
          </section>
        </div>

        <div class="popup__info" v-if="client_width < 768">
          <h2 class="popup__title">О блюде</h2>
          <div class="about">
            {{ PRODUCT.product_production_description }}
          </div>
        </div>

        <div class="popup__info" v-if="PRODUCT.group_modifications">
          <section class="additional" v-if="PRODUCT.category_name !== 'Пиццы new'">
            <div
              class="additional__container"
              v-for="modification_group in PRODUCT.group_modifications"
              :key="modification_group.dish_modification_group_id"
            >
              <article
                class="additional__card"
                v-for="modification in modification_group.modifications"
                :key="modification.dish_modification_id"
              >
                <div
                  class="additional__delete"
                  @click="deleteModification(modification, modification_group)"
                >
                  <v-icon name="controls-minus-icon"></v-icon>
                </div>
                <div
                  class="additional__add"
                  @click="addModification(modification, modification_group)"
                >
                  <v-icon name="plus-icon"></v-icon>
                </div>
                <div class="additional__head">
                  <picture>
                    <source
                      :srcset="`https://gurmanikzndev.joinposter.com${modification.photo_large}`"
                    />
                    <img
                      :src="`https://gurmanikzndev.joinposter.com${modification.photo_large}`"
                      alt=""
                    />
                  </picture>
                </div>
                <div class="additional__body">
                  {{
                    modification.name +
                    " | " +
                    modification.price.toString().slice(0, -2) *
                      modification.count +
                    " ₽" +
                    " | " +
                    modification.count +
                    " шт"
                  }}
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>

      <div class="popup__info popup__like">
        <h3 class="popup__title popup__title--small">Вам может понравиться</h3>
        <section class="like" v-if="PRODUCT.sub_category == 'Популярное'">
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
      <v-add-btn class="popup-buy-btn" @click="addToCart"
        >{{ PRODUCT.price[1].slice(0, -2) }} ₽</v-add-btn
      >
    </article>
  </article>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "v-product-popup",
  data() {
    return {
      client_width: window.innerWidth,
    };
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
      "ADD_TO_FAVORITES",
    ]),
    getProductInfo(data) {
      this.GET_PRODUCT_INFO(data);
      window.scrollBy(0, -400);
    },
    addToFavorites() {
      this.ADD_TO_FAVORITES(this.PRODUCT);
    },
    async clearPopupState() {
      await this.RESET_PRODUCT();
      if (window.location.href.includes("products")) {
        this.$router.push("/products");
      } else if (window.location.href.includes("favorite")) {
        this.$router.push("/favorite");
      } else {
        this.$router.push("/");
      }
    },
    incrementItem() {
      this.INCREMENT_POPUP_ITEM();
      this.FULL_PRICE(this.PRODUCT);
    },
    decrementItem() {
      this.DECREMENT_POPUP_ITEM();
      this.FULL_PRICE(this.PRODUCT);
    },
    async addToCart(data) {
      data = this.PRODUCT;

      await this.ADD_TO_CART(data);
      this.clearPopupState();
    },
    deleteModification(modification, modification_group) {
      console.log(modification_group);
      if (modification.count > 0) {
        modification.count--;
      }
      this.FULL_PRICE(this.PRODUCT);
    },
    addModification(modification, modification_group) {
      if (modification_group.name == "Лапша на выбор") {
        modification_group.modifications.map((item) => (item.count = 0));
        modification.count++;
      } else {
        modification.count++;
        console.log(modification);
      }
      this.FULL_PRICE(this.PRODUCT);
    },
    toggleSize(index) {
      this.TOGGLE_SIZE_OF_PIZZA(index);
      this.FULL_PRICE(this.PRODUCT);
    },
  },
  computed: {
    ...mapGetters(["PRODUCT", "POPULAR", "CATEGORY_PRODUCTS"]),
  },
  mounted() {
    if (window.innerWidth > 768) {
      document
        .querySelector(".popup__body")
        .insertAdjacentElement(
          "afterbegin",
          document.querySelector(".popup__wrap")
        );
      document
        .querySelector(".popup__body")
        .insertAdjacentElement(
          "beforeend",
          document.querySelector(".popup__like")
        );
      document
        .querySelector(".popup__media")
        .insertAdjacentElement(
          "beforeend",
          document.querySelector(".popup-buy-btn")
        );
    }
  },
};
</script>

<style lang="scss" scoped>
.popup {
  background-color: $white;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: fixed;
  top: 0;
  left: 0;
  padding: 40px 0px 100px 20px;
  z-index: 2;

  &-buy-btn {
    left: 50%;
    transform: translateX(-50%);
  }
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
    max-width: 150px;
    width: 100%;
    margin-top: 8px;
  }
  &__radio {
    display: flex;
    align-items: center;
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  &__label {
    white-space: nowrap;
    cursor: pointer;
  }
  &__input {
    position: absolute;
    z-index: -1;
    opacity: 0;
    appearance: none;
    -webkit-appearance: none;
  }
  &__input + label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  &__input + label::before {
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
  &__input:checked + label::before {
    background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='18' height='18' rx='9' fill='%23FF6800'/%3E%3C/svg%3E%0A");
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
    justify-content: center;
    padding-left: 15px;
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
    img {
      max-width: 100%;
    }
  }

  &__body {
    margin-top: 5px;
    text-align: center;
  }
}
.about {
  line-height: 130%;
  color: $second-black;
}
.additional {
  display: flex;
  overflow: auto;
  &__container {
    display: flex;
  }
  &__card {
    min-width: 115px;
    height: 115px;
    margin-right: 20px;
    padding: 0 8px 12px 8px;
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
    white-space: nowrap;
  }
}
.popup__title--small {
  font-size: 24px;
}
.like {
  display: flex;
  overflow: auto;
  padding-bottom: 5px;
  padding-top: 5px;
}
.to-cart-enter-from,
.to-cart-leave-to {
  opacity: 0;
}

.to-cart-enter-active,
.to-cart-leave-active {
  transition: opacity 0.5s ease-out;
}

@media (max-width: 1920px) and (min-width: 1025px) {
  .popup {
    &::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    .back,
    &__item {
      max-width: 1280px;
      margin: 0 auto;
      padding-right: 20px;
    }
    &__item {
      display: flex;
      justify-content: space-between;
    }
    &__head {
      width: 100%;
      height: 100%;
      position: sticky;
      top: 0;
      img {
        max-width: 70%;
      }
    }
    &__subtitle {
      display: none;
    }
    &__body {
      width: 570px;
    }
    &-buy-btn {
      position: static;
      transform: translate(0);
      left: 0;
      margin: 20px 0;
    }
    &__media {
      width: 100%;
    }
  }
  .ingredients,
  .like {
    padding-bottom: 10px;
  }
}
</style>
