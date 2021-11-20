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
            console.log("dataExists");
            if (
              item.group_modifications[0].checked !==
              data.group_modifications[0].checked
            ) {
              state.cart.push(data);
            } else {
              item.count = data.count;
              item.group_modifications = data.group_modifications;
            }

            console.log(item.group_modifications[0].checked);
            console.log(data.group_modifications[0].checked);

            // console.log(state.cart.indexOf(item));
            // state.cart.splice(item, 1)
            // state.cart.push(data)
            // console.log(item);
            // Нужно тут получить именно тот индекс объекта, который нужно запушить с новыми значениями
            // Можно вообще проще ценник прятать в другой ключ объекта и по нему проверку проводить
            // Стоит попробовать это! Если совпадение по айди происходит, то мы берем state продукта и обновляем state item в SET_CART
            // Тут внутри ещё сделать проверку на размер пиццы, чтобы пушились разные продукты 25 см и 30 см пиццы по checked
          }
        });
        if (!dataExists) {
          state.cart.push(data);
        }
      } else {
        state.cart.push(data);
      }
      // localStorage.setItem('cart', JSON.stringify(state.cart.map(item => item)))
      // console.log(localStorage.getItem('cart'));
    },
    TOGGLE_SIZE: (state, index) => {
      // console.log(index);
      if (state.product.product !== "empty") {
        state.product.group_modifications.map((mode) => (mode.checked = false));
        state.product.group_modifications[index].checked = true;
      }

      if (state.cart.length) {
        setTimeout(() => {
          let switchArray = new Array(
            state.cart[localStorage.getItem("cartItem")].group_modifications
          );
          switchArray[0].map((mode) => (mode.checked = false));
          state.cart[localStorage.getItem("cartItem")].group_modifications[
            index
          ].checked = true;
        }, 1);
      }
      // console.log(state.cart[index].group_modifications[0]);
      // let switchArray = state.cart[index].group_modifications
      // let test = switchArray.filter(mode => mode.checked !== true)

      // else if (state.cart[index].group_modifications[0].checked == true) {
      //   state.cart[index].group_modifications[1].checked = true;
      //   state.cart[index].group_modifications[0].checked = false;
      // } else if (state.cart[index].group_modifications[1].checked == true) {
      //   state.cart[index].group_modifications[0].checked = true;
      //   state.cart[index].group_modifications[1].checked = false
      // }
      // state.cart[index].group_modifications.map((mode) => (mode.checked = false));
      // state.cart[index].group_modifications[index].checked = true;
      // console.log(state.cart[index])
      // console.log(state.cart[index].group_modifications.name);
      // let refreshCart = new Array(state.cart[index].group_modifications)
      // refreshCart.filter(mode => mode.checked == true)
      // console.log(refreshCart[0].filter(mode => !mode.checked));
      // console.log(state.cart[index].group_modifications);
    },
    RESET_PRODUCT: (state) => {
      state.product = { product: "empty" };
      console.log(state.product);
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
    // TOGGLE_SIZE_OF_PIZZA_CART({ commit }, index) {

    // },
    RESET_PRODUCT({ commit }) {
      commit("RESET_PRODUCT");
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
