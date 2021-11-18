import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    categories: [],
    categoryProducts: [],
    popular: [],
    product: {},
    cart: [],
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
      } else {
        state.cart[index].count--;
      }
    },
    SET_CART: (state, data) => {
      if (state.cart.length) {
        let dataExists = false;
        state.cart.map((item) => {
          if (item.product_id === data.product_id) {
            dataExists = true;
            console.log(item);
          }
        });
        if (!dataExists) {
          state.cart.push(data);
        }
      } else {
        state.cart.push(data);
      }
    },
    TOGGLE_SIZE: (state, index) => {
      console.log(index);
      state.product.group_modifications.map((mode) => (mode.checked = false));
      state.product.group_modifications[index].checked = true;
    },
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
    GET_PRODUCT_INFO({ commit }, data) {
      data.count = 1;
      if (data.group_modifications) {
        data.group_modifications.map((mode) => {
          mode.checked = false;
          mode.count = 0;
        });
        data.group_modifications[0].checked = true;
      }
      console.log(data);
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
  },
  modules: {},
});
