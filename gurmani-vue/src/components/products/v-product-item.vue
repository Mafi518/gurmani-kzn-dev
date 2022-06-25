<template>
  <article class="card" @click="getProductInfo">
    <slot>
      <div class="card__head">
        <picture class="card__image">
          <img
            :src="`https://gurmanikzn.ru:3000/products/${product_data.name}.jpg`"
            alt=""
          />
        </picture>
        <v-favorite-btn v-if="!product_data.favorites"></v-favorite-btn>
        <v-favorite-btn-active
          v-if="product_data.favorites == true"
        ></v-favorite-btn-active>
      </div>
      <div class="card__body">
        <h3 class="card__title">{{ product_data.name }}</h3>
        <p class="card__description">
          {{ product_data.description }}
        </p>
      </div>
      <div class="card__footer">
        <p class="card__price">{{ product_data.total_price }} ₽</p>
        <button class="card__button buy-btn">
          <v-icon name="plus-icon" class="plus-icon"></v-icon>
          <img
            class="buy-support buy-animate-icon"
            src="@/assets/media/icons/success-icon.svg"
            alt=""
          />
        </button>
      </div>
    </slot>
  </article>
</template>

<script>
import { mapActions } from "vuex";
import { TimelineMax } from "gsap";

export default {
  name: "v-product-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    ...mapActions(["GET_PRODUCT_INFO", "ADD_TO_CART", "ADD_TO_FAVORITES"]),
    async getProductInfo(e, data) {
      data = this.product_data;
      if (e.target.classList.contains("buy-btn")) {
        await this.GET_PRODUCT_INFO(this.product_data);
        await this.ADD_TO_CART(this.product_data);

        let icon = e.target.childNodes[0];
        let hiddenIcon = e.target.childNodes[1];

        let tl = new TimelineMax({});

        tl.to(icon, 0.5, {
          rotate: "120deg",
          opacity: 0,
          transform: "scale(0)",
        });

        tl.to(hiddenIcon, 0.5, {
          rotate: "0deg",
          opacity: 1,
          transform: "scale(1)",
          display: "initial",
        });

        tl.play().then(() => {
          setTimeout(() => {
            tl.reverse();
          }, 1000);
        });
        this.$store.state.product = { product: "empty" };
      } else if (
        e.target.parentNode.classList.contains("favorite-btn") ||
        e.target.classList.contains("favorite-icon-path") ||
        e.target.classList.contains("favorite-icon-active") ||
        e.target.classList.contains("favorite-icon")
      ) {
        this.ADD_TO_FAVORITES(data);
      } else {
        this.GET_PRODUCT_INFO(data);
      }
    },
  },
  computed: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.product {
  margin-left: 20px;
}

.card {
  @include container;
  min-width: 176px;
  max-width: 176px;
  width: 100%;
  padding: 12px 9px;
  min-height: 208px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-right: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  &__head {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  &__image * {
    max-width: 120px;
    max-height: 100%;
    min-height: 78px;
  }
  &__body {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
  }
  &__title {
    @include h3;
    margin-bottom: 10px;
  }
  &__description {
    color: $second-black;
    font-size: 12px;
  }
  &__footer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  &__price {
    font-weight: 500;
  }
  &__button {
    cursor: pointer;
    display: flex;
    align-items: center;
    svg {
      pointer-events: none;
    }
  }
}
.buy-animate-icon {
  transform: scale(0);
  display: none;
  min-width: 26px;
  min-height: 26px;
}
@media (max-width: 416px) {
  .card {
    min-width: initial;
    max-width: 47%;
    margin-right: 0;
    position: relative;
    &__image * {
      max-height: 100%;
    }
    .favorite-btn {
      position: absolute;
      top: 12px;
      right: 9px;
    }
  }
}
</style>
