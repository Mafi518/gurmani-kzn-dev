import {
  createStore
} from "vuex";
import axios from "axios";

export default createStore({
  state: {
    categories: [],
    categoryProducts: [],
    popular: [],
    product: {},
    cart: [],
    oldCart: [],
    promocodes: [],
    discount: {},
    discountProduct: {},
    discountCurrentProduct: "0 ₽",
    deliveryType: "2",
    payment_type: "Безнал",
    order: {},
    selectAdresses: [],
    selectAddress: {
      delivery_pay: 0,
    },
    address2: {},
    delivery_pay: "",
    error: "",
    warning: "",
    current_time: "",
    promocode_total: 0,
    form_validation_error: "",

    favorites: [],
    banner: {},
  },
  mutations: {
    SET_CATEGORIES_TO_STATE: (state, categories) => {
      state.categories = categories;
    },
    SET_CATEGORY_PRODUCTS_TO_STATE: (state, products) => {
      products.map((item) => (item.count = 1));
      state.categoryProducts = products;
    },
    SET_POPULAR_TO_STATE: (state, populars) => {
      populars.map((item) => (item.count = 1));
      state.popular = populars;
    },
    SET_PRODUCT_TO_STATE: (state, product) => {
      state.product = product;
    },
    INCREMENT: (state, index) => {
      if (window.location.href == "http://localhost:8080/cart") {
        state.cart[index].count++;
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
      if (state.cart.length && location.href == "http://localhost:8080/cart") {
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
      state.product = {
        product: "empty",
      };
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
        (item) => item.name.toUpperCase() == promocode.toUpperCase()
      )[0];

      // Находим промокод
      if (validPromo) {
        state.discount.promocode_name = validPromo.name;
        state.discount.promocode_discount = validPromo.params.discount_value;
        state.discount.promocode_type = validPromo.params.result_type;
        state.discount.condition = validPromo.params.conditions[0].pcs;
        state.discount.period_start =
          validPromo.params.periods[0].start
        state.discount.period_end = validPromo.params.periods[0].end
        state.discount.error = "";
        // state.discount.time = validPromo.params.
        if (state.discount.promocode_type == 1) {
          state.discount.product_id = validPromo.params.bonus_products[0].id;
        }
        // if (state.discount.promocode_type == 3 && state.discount.promocode_name == '16' && state.deliveryType == '2') {
        //   console.log(state.discount.promocode_discount);
        //   state.discount.promocode_discount = (+state.discount.promocode_discount / 2)
        // }
        // state.discount.product_id = validPromo.params
      } else {
        state.discount = {};
      }
    },
    DISCOUNT_PRODUCT: (state, product) => {
      state.discountProduct = product;
      state.discountCurrentProduct = state.discountProduct.product_name;
    },
    DELIVERY_TYPE: (state, type) => {
      state.deliveryType = type;
    },
    PAYMENT_TYPE: (state, type) => {
      return (state.payment_type = type);
    },
    ORDER_DATA: (state, data) => {
      state.order = data;
    },
    ADDRESSES: (state, addresses) => {
      addresses.map((item) => {
        switch (item.delivery_zone) {
          case "1":
            item.delivery_pay = 1;
            item.delivery_free = 60000;
            break;
          case "2":
            item.delivery_pay = 10000;
            item.delivery_free = 80000;
            break;
          case "3":
            item.delivery_pay = 15000;
            item.delivery_free = 100000;
            break;
          case "4":
            item.delivery_pay = 15000;
            item.delivery_free = 120000;
            break;
          case "5":
            item.delivery_pay = 20000;
            item.delivery_free = 140000;
            break;
          case "6":
            item.delivery_pay = 25000;
            item.delivery_free = 180000;
            break;
          case "7":
            item.delivery_pay = 30000;
            item.delivery_free = 200000;
            break;
          default:
            break;
        }
      });
      state.selectAdresses = addresses;
    },
    ADDRESS: (state, address) => {
      state.selectAddress = address;
    },
    ADDRESS2: (state, address) => {
      switch (address.key) {
        case "house":
          state.address2.house = address.value.toString();
          break;
        case "apartment":
          state.address2.apartment = address.value.toString();
          break;
        case "entrance":
          state.address2.entrance = address.value.toString();
          break;
        case "floor":
          state.address2.floor = address.value.toString();
          break;

        default:
          break;
      }
    },
    SEND_ORDER_DATA: (state, order_data) => {
      state.order = order_data;
    },
    FORM_ERROR: (state, error) => {
      state.form_validation_error = error;
    },
    ADD_TO_FAVORITES: (state, product) => {
      if (state.favorites.length) {
        let dataExists = false;
        let favoriteArr = JSON.parse(
          localStorage.getItem("saved favorites")
        );

        state.favorites.map((item) => {
          if (item.product_id === product.product_id) {
            dataExists = true;

            if (
              favoriteArr.filter(
                (item) => item.product_id == product.product_id
              )
            ) {
              for (const key in favoriteArr) {
                if (favoriteArr[key].product_id == product.product_id) {
                  state.favorites.splice(key, 1);
                  product.favorites = false
                  localStorage.setItem(
                    "saved favorites",
                    JSON.stringify(state.favorites.map((item) => item))
                  );
                }
              }
            }
          }
        });

        if (!dataExists) {
          product.favorites = true;
          state.favorites.push(product);
          localStorage.setItem(
            "saved favorites",
            JSON.stringify(state.favorites.map((item) => item))
          );
        }
      } else {
        product.favorites = true;
        state.favorites.push(product);
        localStorage.setItem(
          "saved favorites",
          JSON.stringify(state.favorites.map((item) => item))
        );
      }

    },
    SET_SAVED_FAVORITES: (state, data) => {
      if (data) {
        JSON.parse(data).map((item) => state.favorites.push(item));
      }
    },
    SET_BANNER: (state, banner) => {
      state.banner = banner;
    }
  },
  actions: {
    GET_CATEGORIES_FROM_API({
      commit
    }) {
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
    GET_CATEGORY_PRODUCTS_FROM_API({
      commit
    }, categoryID) {
      return axios({
        method: "GET",
        url: `http://localhost:3000/getProductsFromCategory${categoryID}`,
        body: categoryID,
      }).then((products) => {
        // products.data.count = 1
        // products.data.map(item => item.count = 1)
        commit("SET_CATEGORY_PRODUCTS_TO_STATE", products.data);
      });
    },
    GET_POPULAR_FROM_API({
      commit
    }) {
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
    GET_PROMOCODES({
      commit
    }) {
      return axios({
        method: "GET",
        url: `http://localhost:3000/promocodes`,
      }).then((promocodes) => {
        commit("SET_PROMOCODES", promocodes.data);
      });
    },
    GET_PRODUCT_INFO({
      commit
    }, data) {
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
    INCREMENT_POPUP_ITEM({
      commit
    }, index) {
      commit("INCREMENT", index);
    },
    DECREMENT_POPUP_ITEM({
      commit
    }, index) {
      commit("DECREMENT", index);
    },
    ADD_TO_CART({
      commit
    }, data) {
      commit("SET_CART", data);
    },
    TOGGLE_SIZE_OF_PIZZA({
      commit
    }, index) {
      commit("TOGGLE_SIZE", index);
    },
    RESET_PRODUCT({
      commit
    }) {
      console.log("reset");
      commit("RESET_PRODUCT");
    },
    FULL_PRICE({
      commit
    }, data) {
      commit("FULL_PRICE", data);
    },
    SET_OLD_CART({
      commit
    }, data) {
      commit("SET_OLD_CART", data);
    },
    VALIDATE_PROMOCODE({
      commit
    }, promocode) {
      commit("APPLY_PROMOCODE", promocode);
    },
    GET_DISCOUNT_PRODUCT({
      commit
    }, product) {
      console.log(product);
      return axios({
        method: "GET",
        url: `http://localhost:3000/getDiscountProduct${product}`,
        body: product,
      }).then((discount_product) => {
        commit("DISCOUNT_PRODUCT", discount_product.data);
      });
    },
    GET_DELIVERY_TYPE({
      commit
    }, delivery_type) {
      commit("DELIVERY_TYPE", delivery_type);
    },
    GET_PAYMENT_TYPE({
      commit
    }, type) {
      commit("PAYMENT_TYPE", type);
    },
    CONFIRM_ORDER_DATA({
      commit
    }, order) {
      commit("ORDER_DATA", order);
    },
    GET_ADDRESSES({
      commit
    }) {
      return axios({
        method: "GET",
        url: `http://localhost:3000/getAddresses`,
      }).then((addresses) => {
        // if(addresses.delivery_zone == 2) {
        //   addresses.map(item => {
        //     item.delivery_pay = 10000
        //     item.delivery_free = 80000
        //   })
        // }
        // console.log(addresses.data);
        // console.log(addresses.data.filter(address => address.delivery_zone == 2));

        commit("ADDRESSES", addresses.data);
      });
    },
    GET_ADDRESS({
      commit
    }, address) {
      commit("ADDRESS", address);
    },
    GET_ADDRESS2({
      commit
    }, address) {
      commit("ADDRESS2", address);
    },
    SEND_ORDER({
      commit
    }, order_data) {
      return axios({
        method: "POST",
        url: `http://localhost:3000/order`,
        params: order_data,
      }).then((order_data) => {
        console.log(order_data);
        commit("SEND_ORDER_DATA", order_data);
      });
    },
    FORM_VALIDATION_ERROR({
      commit
    }, error) {
      commit("FORM_ERROR", error);
    },
    ADD_TO_FAVORITES({
      commit
    }, product) {
      commit("ADD_TO_FAVORITES", product);
    },
    SET_SAVED_FAVORITES_TO_STATE({
      commit
    }, data) {
      commit("SET_SAVED_FAVORITES", data);
    },
    ADD_BANNER({commit}, data) {
      return axios({
        method: "POST",
        url: `http://localhost:3000/promoD`,
        params: data,
      }).then((data) => {
        commit("SET_BANNER", data);
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
    SUBTOTAL_PRICE(state) {
      let cart = state.cart.map((item) => item.price[1]);

      let reducer = (previousValue, currentValue) =>
        +previousValue + +currentValue;
      let result = cart.reduce(reducer);

      return (state.subtotalPrice = result);
    },
    DELIVERY_PAY(state) {
      state.warning = "";
      if (state.subtotalPrice >= state.selectAddress.delivery_free) {
        return (state.delivery_pay = 0);
      } else if (state.deliveryType == 2) {
        return (state.delivery_pay = -(+state.subtotalPrice * 10) / 100);
      } else {
        if (state.selectAddress.delivery_zone) {
          state.warning = `Закажите ещё на ${(
            state.selectAddress.delivery_free - state.subtotalPrice
          )
            .toString()
            .slice(0, -2)} ₽ для бесплатной доставки`;
        }
        return (state.delivery_pay = state.selectAddress.delivery_pay);
      }
    },
    TOTAL_PRICE(state) {
      if (typeof state.promocode_total == typeof 1) {
        return (state.totalPrice = +state.subtotalPrice + +state.delivery_pay - +state.promocode_total);
      } else {
        return (state.totalPrice = +state.subtotalPrice + +state.delivery_pay);
      }
    },
    PROMOCODE_TOTAL(state) {
      state.discount.total_discount = "0 ₽";
      state.promocode_total = 0;

      if (
        state.subtotalPrice >= state.discount.condition &&
        state.current_time < state.discount.period_end &&
        state.current_time > state.discount.period_start
      ) {
        if (state.discount.promocode_type == 2) {
          state.discount.total_discount = state.discount.promocode_discount;
          return (state.promocode_total = state.discount.promocode_discount);
        } else if (state.discount.promocode_type == 3) {
          state.discount.total_discount =
            (state.subtotalPrice * state.discount.promocode_discount) / 100;
          return (state.promocode_total = +state.discount.total_discount);
        } else if (state.discount.promocode_type == 1) {
          state.discountProduct = state.discount.product_id;
          state.discount.total_discount = state.discountCurrentProduct;
          return (state.promocode_total = state.discountCurrentProduct);
        }
      } else {
        return (state.promocode_total = 0);
      }
    },
    DISCOUNT(state) {
      return state.discount;
    },
    DISCOUNT_PRODUCT(state) {
      return state.discountProduct;
    },
    DISCOUNT_CURRENT_PRODUCT(state) {
      return state.discountCurrentProduct;
    },
    DELIVERY_TYPE(state) {
      return state.deliveryType;
    },
    PAYMENT_TYPE(state) {
      return state.payment_type;
    },
    ORDER_DATA(state) {
      function getOrderProducts() {
        let arr = [];
        for (let item of state.cart) {
          arr.push({
            product_id: item.product_id,
            count: item.count,
            price: (item.price[1] / item.count).toString(),
            modification: item.group_modifications.map((mode) => {
              return {
                m: mode.modifications[0].dish_modification_id,
                a: mode.count,
              };
            }),
          });
        }
        // С МОДИФИКАТОРАМИ ТОЖЕ НУЖНО FILTER.LENGTH СДЕЛАТЬ ЧТОБЫ ОН ПРОВЕРКУ ПРОХОДИЛ И ТОГДА ВСЁ ТОПЧИК БУДЕТ
        
        return arr;
      }

      return (state.order = {
        spot_id: 1,
        first_name: state.order_name ?
          state.order_name : "Баг! Обратиться к разработчику",
        phone: state.order_phone ?
          "+" +
          state.order_phone.charAt(0).replace("8", "7") +
          state.order_phone.slice(1, 11) : "Баг! Обратиться к разработчику",
        client_address: {
          street: state.selectAddress.address,
        },
        client_address2: state.address2,
        delivery_price: state.delivery_pay,
        service_mode: state.deliveryType,
        products: getOrderProducts(),
        comment: state.order_comment +
          (state.discount.promocode_name !== undefined ?
            "промо: " + state.discount.promocode_name :
            "") +
          state.payment_type,
      });
    },
    ADDRESSES(state) {
      return state.selectAdresses;
    },
    ADDRESS(state) {
      return state.selectAddress;
    },
    ADDRESS2(state) {
      return state;
    },
    ERROR(state) {
      if (state.subtotalPrice < state.discount.condition) {
        return (state.error = `Для применения промокода закажите ещё на ${(
          state.discount.condition - state.subtotalPrice
        )
          .toString()
          .slice(0, -2)} ₽`);
      } else if (
        state.current_time > state.discount.period_end ||
        state.current_time < state.discount.period_start
      ) {
        return (state.error = `Промокод работает с ${
          state.discount.period_start
        }  до ${
          state.discount.period_end
        }`);
      } else {
        return (state.error = ``);
      }
    },
    FORM_ERROR(state) {
      return state.form_validation_error;
    },
    CURRENT_TIME(state) {
      var dateWithoutSecond = new Date();
      let currentHour = dateWithoutSecond
        .toLocaleTimeString(navigator.language, {
          hour: "2-digit",
          minute: "2-digit",
        })
        // .replace(":", "");
      return (state.current_time = currentHour);
    },
    WARNING(state) {
      return state.warning;
    },
    FAVORITES(state) {
      return state.favorites;
    },
    SET_SAVED_FAVORITES(state) {

      let arra1 = state.categoryProducts.map(item => item.product_id)
      let arra2 = state.popular.map(item => item.product_id)
      let arra3 = state.favorites.map(item => item.product_id)

      let intersect = function(arr1, arr2) {
        return arr1.filter(function(id) {
          return arr2.indexOf(id) !== -1
        })
      }

      for (const item of intersect(arra1, arra3).map(item => item)) {
        state.categoryProducts.filter(it => it.product_id == item)[0].favorites = true
      }
      for (const item of intersect(arra2, arra3)) {
        state.popular.filter(it => it.product_id == item)[0].favorites = true
      }
    },
    SET_BANNER(state) {
      return state.banner
    }
  },
  modules: {
  },
});