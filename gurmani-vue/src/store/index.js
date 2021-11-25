import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    categories: [],
    categoryProducts: [],
    popular: [],
    product: {},
    cart: [],
    promocodes: [],
    discount: {},
    discountProduct: {},
    discountCurrentProduct: "0 ₽"
  },
  mutations: {
    SET_CATEGORIES_TO_STATE: (state, categories) => {
      state.categories = categories;
    },
    SET_CATEGORY_PRODUCTS_TO_STATE: (state, products) => {
      state.categoryProducts = products;
    },
    SET_POPULAR_TO_STATE: (state, populars) => {
      state.popular = populars;
    },
    SET_PRODUCT_TO_STATE: (state, product) => {
      state.product = product;
    },
    INCREMENT: (state, index) => {
      if (window.location.href == "http://localhost:8080/cart") {
        state.cart[index].count++;
        console.log(state.cart[index]);
        if (state.cart[index].product_name.includes("Пицца")) {
          state.cart[index].price[1] =
            state.cart[index].spots[0].actualPrice * state.cart[index].count +
            "";
        } else {
          let array = state.cart[index].group_modifications.map(
            (mode) =>
              mode.count * mode.modifications.map((modif) => modif.price)
          );
          let reducer = (previousValue, currentValue) =>
            previousValue + currentValue;
          let result = array.reduce(reducer) + "";
          state.cart[index].price[1] =
            state.cart[index].spots[0].price * state.cart[index].count +
            +result +
            "";
        }
      } else {
        state.product.count++;
      }
    },
    DECREMENT: (state, index) => {
      if (
        state.product.count > 1 &&
        window.location.href !== "http://localhost:8080/cart"
      ) {
        state.product.count--;
      } else if (state.cart[index].count <= 1) {
        state.cart.splice(index, 1);
      } else if (state.cart[index].product_name.includes("Пицца")) {
        state.cart[index].count--;
        state.cart[index].price[1] =
          state.cart[index].spots[0].actualPrice * state.cart[index].count + "";
      } else {
        state.cart[index].count--;
        let array = state.cart[index].group_modifications.map(
          (mode) => mode.count * mode.modifications.map((modif) => modif.price)
        );
        let reducer = (previousValue, currentValue) =>
          previousValue + currentValue;
        let result = array.reduce(reducer) + "";
        // state.cart[index].modificationsPrice = result
        state.cart[index].price[1] =
          state.cart[index].spots[0].price * state.cart[index].count +
          +result +
          "";
      }
    },
    SET_CART: (state, data) => {
      console.log("set cart");
      if (state.cart.length) {
        let dataExists = false;
        state.cart.map((item) => {
          if (item.product_id === data.product_id) {
            dataExists = true;
            console.log("dataExists");
            if (
              item.group_modifications[0].checked !==
              data.group_modifications[0].checked
            ) {
              console.log("pizza clone");
              state.cart.push(data);
            } else {
              item.count = data.count;
              item.group_modifications = data.group_modifications;
              item.price[1] = data.price[1];
              // item.price = data.price[1] + data.count + ""
            }
          }
        });
        if (!dataExists) {
          state.cart.push(data);
        }
      } else {
        state.cart.push(data);
      }
      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart.map((item) => item))
      );
    },
    TOGGLE_SIZE: (state, index) => {
      if (state.product.product !== "empty") {
        state.product.group_modifications.map((mode) => (mode.checked = false));
        state.product.group_modifications[index].checked = true;
      }
      if (state.cart.length) {
        setTimeout(() => {
          let cartItem = localStorage.getItem("cartItem");
          let switchArray = new Array(state.cart[cartItem].group_modifications);
          switchArray[0].map((mode) => (mode.checked = false));
          state.cart[cartItem].group_modifications[index].checked = true;
          let checkedPrice = state.cart[cartItem].group_modifications.filter(
            (mode) => mode.checked == true
          )[0].modifications[0].price;
          state.cart[cartItem].spots[0].actualPrice = checkedPrice.toString();
          state.cart[cartItem].price[1] =
            state.cart[cartItem].spots[0].actualPrice *
              state.cart[cartItem].count +
            "";
        }, 1);
      }
    },
    RESET_PRODUCT: (state) => {
      state.product = { product: "empty" };
    },
    FULL_PRICE: (state, data) => {
      console.log(data);
      if (state.product.product_name.includes("Пицца")) {
        let checked = data.group_modifications.filter(
          (mode) => mode.checked == true
        );
        console.log(checked[0].modifications[0].price);
        data.price[1] =
          checked[0].modifications[0].price.toString() * data.count + "";
      } else {
        let array = data.group_modifications.map(
          (mode) => mode.count * mode.modifications.map((modif) => modif.price)
        );
        let reducer = (previousValue, currentValue) =>
          previousValue + currentValue;
        let result = array.reduce(reducer) + "";
        state.product.modificationsPrice = result + "";
        state.product.price[1] = data.price[1] =
          data.modified_price * data.count + +result + "";
      }
    },
    SET_OLD_CART: (state, data) => {
      JSON.parse(data).map((item) => state.cart.push(item));
    },
    SET_PROMOCODES: (state, promocode) => {
      state.promocodes = promocode;
    },
    APPLY_PROMOCODE: (state, promocode) => {
      let validPromo = state.promocodes.filter(
        (item) => item.name == promocode
      )[0];
      // Находим промокод
      console.log(validPromo);
      if (validPromo) {
        state.discount.promocode_name = validPromo.name;
        state.discount.promocode_discount = validPromo.params.discount_value;
        state.discount.promocode_type = validPromo.params.result_type;
        state.discount.condition = validPromo.params.conditions[0].pcs;
        state.discount.error = ''
        if(state.discount.promocode_type == 1) {
          state.discount.product_id = validPromo.params.bonus_products[0].id;
        }
        // state.discount.product_id = validPromo.params
      } else {
        state.discount = {};
      }
    },
    DISCOUNT_PRODUCT: (state, product) => {
      state.discountProduct = product;
      state.discountCurrentProduct = state.discountProduct.product_name
      console.log(state.discountProduct);
    }
  },
  actions: {
    GET_CATEGORIES_FROM_API({ commit }) {
      return axios({
        method: "GET",
        url: "http://localhost:3000/categories",
      }).then((categories) => {
        commit(
          "SET_CATEGORIES_TO_STATE",
          categories.data.filter(
            (category) => category.category_name !== "Популярное"
          )
        );
        return categories;
      });
    },
    GET_CATEGORY_PRODUCTS_FROM_API({ commit }, categoryID) {
      return axios({
        method: "GET",
        url: `http://localhost:3000/getProductsFromCategory${categoryID}`,
        body: categoryID,
      }).then((products) => {
        commit("SET_CATEGORY_PRODUCTS_TO_STATE", products.data);
      });
    },
    GET_POPULAR_FROM_API({ commit }) {
      return axios({
        method: "GET",
        url: `http://localhost:3000/populars`,
      }).then((populars) => {
        commit(
          "SET_POPULAR_TO_STATE",
          populars.data.filter(
            (popular) => popular.category_name == "Популярное"
          )
        );
        return populars;
      });
    },
    GET_PROMOCODES({ commit }) {
      return axios({
        method: "GET",
        url: `http://localhost:3000/promocodes`,
      }).then((promocodes) => {
        commit("SET_PROMOCODES", promocodes.data);
      });
    },
    GET_PRODUCT_INFO({ commit }, data) {
      data.count = 1;
      data.modified_price = data.spots[0].price;
      data.spots[0].actualPrice = data.spots[0].price;
      data.modificationsPrice = "";
      if (data.group_modifications) {
        data.group_modifications.map((mode) => {
          mode.checked = false;
          mode.count = 0;
        });
        data.group_modifications[0].checked = true;
      }
      data.ingredients.map((ingredient) => {
        switch (ingredient.ingredient_name) {
          case "Лосось":
            ingredient.ingredient_color = "#FFD1B9";
            ingredient.ingredient_icon = "salmon-icon";
            break;
          case "Cremette":
            ingredient.ingredient_color = "#FFF8C1";
            ingredient.ingredient_icon = "cheese-icon";
            break;
          default:
            break;
        }
      });
      commit("SET_PRODUCT_TO_STATE", data);
    },
    INCREMENT_POPUP_ITEM({ commit }, index) {
      commit("INCREMENT", index);
    },
    DECREMENT_POPUP_ITEM({ commit }, index) {
      commit("DECREMENT", index);
    },
    ADD_TO_CART({ commit }, data) {
      commit("SET_CART", data);
    },
    TOGGLE_SIZE_OF_PIZZA({ commit }, index) {
      commit("TOGGLE_SIZE", index);
    },
    RESET_PRODUCT({ commit }) {
      console.log("reset");
      commit("RESET_PRODUCT");
    },
    FULL_PRICE({ commit }, data) {
      commit("FULL_PRICE", data);
    },
    SET_OLD_CART({ commit }, data) {
      commit("SET_OLD_CART", data);
    },
    VALIDATE_PROMOCODE({ commit }, promocode) {
      commit("APPLY_PROMOCODE", promocode);
    },
    GET_DISCOUNT_PRODUCT({ commit }, product) {
      console.log(product);
      return axios({
        method: "GET",
        url: `http://localhost:3000/getDiscountProduct${product}`,
        body: product,
      }).then((discount_product) => {
        commit("DISCOUNT_PRODUCT", discount_product.data);
      });
    },
  },
  getters: {
    CATEGORIES(state) {
      return state.categories;
    },
    CATEGORY_PRODUCTS(state) {
      return state.categoryProducts;
    },
    POPULAR(state) {
      return state.popular;
    },
    PRODUCT(state) {
      return state.product;
    },
    CART(state) {
      return state.cart;
    },
    OLD_CART(state) {
      return state.oldCart;
    },
    PROMOCODES(state) {
      return state.promocodes;
    },
    TOTAL_PRICE(state) {
      let cart = state.cart.map((item) => item.price[1]);

      let reducer = (previousValue, currentValue) =>
        +previousValue + +currentValue;
      let result = cart.reduce(reducer);
      state.discount.total_discount = 0;
      state.discountProduct = state.discount.product_id
      state.discount.error = ''
      console.log(state.discount.condition);
      if(result >= state.discount.condition) {
        if (
          state.discount.promocode_type == 2
        ) {
            state.discount.total_discount = state.discount.promocode_discount;
            return (state.totalPrice = result - state.discount.promocode_discount);
  
        } else if (
          state.discount.promocode_type == 3
        ) {
          state.discount.total_discount =
            (result * state.discount.promocode_discount) / 100;
          return (state.totalPrice =
            result - (result * state.discount.promocode_discount) / 100);
        } else if (
          state.discount.promocode_type == 1
        ) {
          state.discount.total_discount = state.discountCurrentProduct;
  
          return (state.totalPrice = result);
        }
      } else if(result < state.discount.condition) {
        state.discount.error = `Для применения промокода закажите ещё на ${state.discount.condition - result} ₽`
      }
        return (state.totalPrice = result);
    },
    DISCOUNT(state) {
      return state.discount;
    },
    DISCOUNT_PRODUCT(state) {
      return state.discountProduct
    },
    DISCOUNT_CURRENT_PRODUCT(state) {
      return state.discountCurrentProduct
    }
  },
  modules: {},
});
