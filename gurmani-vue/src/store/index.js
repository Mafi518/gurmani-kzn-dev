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
    telegram_order: {},
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
    pickup_time: "",
    cutlery_count: 0,

    favorites: [],
    banner: {},
    banners: [],
    gurmani_closed: false,

    admin_addresses: [],
    set_address: {},
    delete_address: {},

    admin_set_popular: "",
    admin_delete_popular: "",

    disposable_promocodes: {}
  },
  mutations: {
    SET_CATEGORIES_TO_STATE: (state, categories) => {
      state.categories = categories;
    },
    SET_CATEGORY_PRODUCTS_TO_STATE: (state, products) => {
      products.map((item) => {
        item.count = 1;
      });
      state.categoryProducts = products;
    },
    SET_POPULAR_TO_STATE: (state, populars) => {
      populars.map((item) => {
        item.count = 1;
        item.sub_category = "Популярное";
        if (item.category_name.includes("Пиццы") && item.group_modifications) {
          item.group_modifications[0].modifications.map(
            (item) => (item.price = item.price + "00" - 0)
          );
          item.price[1] =
            item.group_modifications[0].modifications[0].price.toString();
        }
      });

      state.popular = populars;
    },
    SET_PRODUCT_TO_STATE: (state, product) => {
      for (const ingredient of product.ingredients) {
        switch (ingredient.ingredient_name) {
          case "Тобико оранжевая":
            ingredient.ingredient_icon = "tobiko_orange";
            break;
          case "Рис отварной":
            ingredient.ingredient_icon = "rice";
            break;
          case "Нори":
            ingredient.ingredient_icon = "nori";
            break;
          case "Авокадо":
            ingredient.ingredient_icon = "avocado";
            break;
          case "Ананасы кусочки":
            ingredient.ingredient_icon = "pineaple";
            break;
          case "Бекон":
            ingredient.ingredient_icon = "bacon";
            break;
          case "Вакаме":
            ingredient.ingredient_icon = "seaweed";
            break;
          case "Ветчина":
            ingredient.ingredient_icon = "ham";
            break;
          case "Водоросли Комбо":
            ingredient.ingredient_icon = "seaweed";
            break;
          case "Кинза":
            ingredient.ingredient_icon = "cilantro";
            break;
          case "Кокосовое молоко":
            ingredient.ingredient_icon = "coconut_milk";
            break;
          case "Краб-микс":
            ingredient.ingredient_icon = "crab";
            break;
          case "Креветки":
            ingredient.ingredient_icon = "shrimp";
            break;
          case "Кунжут Белый":
            ingredient.ingredient_icon = "white_sesame";
            break;
          case "Кунжут Черный":
            ingredient.ingredient_icon = "black_sesame";
            break;
          case "Лайм":
            ingredient.ingredient_icon = "lime";
            break;
          case "Лосось свежий":
            ingredient.ingredient_icon = "salmon";
            break;
          case "Лук красный":
            ingredient.ingredient_icon = "red_onion";
            break;
          case "Лук репчатый":
            ingredient.ingredient_icon = "onion";
            break;
          case "Маслины":
            ingredient.ingredient_icon = "olives";
            break;
          case "Морковь":
            ingredient.ingredient_icon = "carrot";
            break;
          case "Моцарелла":
            ingredient.ingredient_icon = "mozzarella";
            break;
          case "Огурцы":
            ingredient.ingredient_icon = "cucumber";
            break;
          case "Огурчики маринованные":
            ingredient.ingredient_icon = "pickled_cucumbers";
            break;
          case "Орегано":
            ingredient.ingredient_icon = "oregano";
            break;
          case "Пармезан":
            ingredient.ingredient_icon = "parmesan";
            break;
          case "Петрушка":
            ingredient.ingredient_icon = "parsley";
            break;
          case "Помидоры":
            ingredient.ingredient_icon = "tomatoes";
            break;
          case "Рис":
            ingredient.ingredient_icon = "rice";
            break;
          case "Рис Shinaki":
            ingredient.ingredient_icon = "rice";
            break;
          case "Соус Унаги":
            ingredient.ingredient_icon = "unagi_sauce";
            break;
          case "Сливочный сыр":
            ingredient.ingredient_icon = "cheese_creamy";
            break;
          case "Чили перец":
            ingredient.ingredient_icon = "chilli";
            break;
          case "Шампиньоны":
            ingredient.ingredient_icon = "champignon";
            break;
          case "Тесто ":
            ingredient.ingredient_icon = "dough";
            break;
          case "Черная тобико":
            ingredient.ingredient_icon = "black-tobiko";
            break;
          case "Маменори":
            ingredient.ingredient_icon = "mamenori";
            break;
          case "Маринованные огурцы":
            ingredient.ingredient_icon = "marinade-cucumber";
            break;
          case "Сырная шапочка":
            ingredient.ingredient_icon = "cheese_cap";
            break;
          case "Халапеньо":
            ingredient.ingredient_icon = "jalapeno";
            break;
          case "Кунжут жаренный":
            ingredient.ingredient_icon = "fried_sesame";
            break;
          case "Сыр с плесенью":
            ingredient.ingredient_icon = "blue_cheese";
            break;
          case "Чеддер":
            ingredient.ingredient_icon = "cheddar";
            break;
          case "Соус Цезарь":
            ingredient.ingredient_icon = "caesar_sauce";
            break;
          case "Черри":
            ingredient.ingredient_icon = "cherry";
            break;
          case "Укроп":
            ingredient.ingredient_icon = "dill";
            break;
          case "Лимон":
            ingredient.ingredient_icon = "lemon";
            break;
          case "Томатный соус":
            ingredient.ingredient_icon = "tomato_sauce";
            break;
          case "Говяжий фарш":
            ingredient.ingredient_icon = "ground_beef";
            break;
          case "Карамельный Топинг":
            ingredient.ingredient_icon = "caramel_topping";
            break;
          case "Майонез":
            ingredient.ingredient_icon = "mayonnaise";
            break;
          case "Креветки отварные":
            ingredient.ingredient_icon = "boiled_shrimp";
            break;
          case "Соус для запекания":
            ingredient.ingredient_icon = "sauce_for_baking";
            break;
          case "Соус спайс":
            ingredient.ingredient_icon = "spice_sauce";
            break;
          case "тайский соус":
            ingredient.ingredient_icon = "thai-sauce";
            break;
          case "Болгарский перец":
            ingredient.ingredient_icon = "bell_pepper";
            break;
          case "Красный лук":
            ingredient.ingredient_icon = "red_onion";
            break;
          case "Жаренный лосось":
            ingredient.ingredient_icon = "fried_salmon";
            break;
          case "Лук зелёный":
            ingredient.ingredient_icon = "green_onion";
            break;
          case "Копченая курица филе":
            ingredient.ingredient_icon = "smoked_chicken_fillet";
            break;
          case "Тобико красная":
            ingredient.ingredient_icon = "tobiko_red";
            break;
          case "Чука":
            ingredient.ingredient_icon = "chuka";
            break;
          case "Лосось филе":
            ingredient.ingredient_icon = "salmon_fillet";
            break;
          case "Угорь филе":
            ingredient.ingredient_icon = "eel_fillet";
            break;
          case "Тунец филе":
            ingredient.ingredient_icon = "tuna_fillet";
            break;
          case "Курица жаренная":
            ingredient.ingredient_icon = "fried_chicken_fillet";
            break;
          case "Стружка тунца":
            ingredient.ingredient_icon = "tuna_shavings";
            break;
          case "Жаренная курица филе":
            ingredient.ingredient_icon = "fried_chicken_fillet";
            break;
          case "Лосось хк филе":
            ingredient.ingredient_icon = "salmon_hk_fillet";
            break;
          default:
            ingredient.ingredient_icon = "logo";
            break;
        }

        // if (
        //   ingredient.ingredient_name.includes("Соусничка") ||
        //   ingredient.ingredient_name.includes("Боксы фольгированые") ||
        //   ingredient.ingredient_name.includes("Сухари панировачные") ||
        //   ingredient.ingredient_name.includes("Мисо паста") ||
        //   ingredient.ingredient_name.includes("Сухари Панировочные") ||
        //   ingredient.ingredient_name.includes("Вода") ||
        //   ingredient.ingredient_name.includes("Затотовка для Том Яма") ||
        //   ingredient.ingredient_name.includes("Хлеб харис") ||
        //   ingredient.ingredient_name.includes("Нагетсы") ||
        //   ingredient.ingredient_name.includes("Картофель фри") ||
        //   ingredient.ingredient_name.includes("Морс") ||
        //   ingredient.ingredient_name.includes("Картофель по деревенски") ||
        //   ingredient.ingredient_name.includes("Пепперони") ||
        //   ingredient.ingredient_name.includes("Газовый") ||
        //   ingredient.ingredient_name.includes("Мука темпурная") ||
        //   ingredient.ingredient_name.includes("Масло фритюрное") ||
        //   ingredient.ingredient_name.includes("Сухари панировачные") ||
        //   ingredient.ingredient_name.includes("Соевый соус в ассортименте") ||
        //   ingredient.ingredient_name.includes("Соевый соус порционный") ||
        //   ingredient.ingredient_name.includes("Имбирь") ||
        //   ingredient.ingredient_name.includes("Васаби") ||
        //   ingredient.ingredient_name.includes("Бокс") ||
        //   ingredient.ingredient_name.includes("Пакет") ||
        //   ingredient.ingredient_name.includes("Короб") ||
        //   ingredient.ingredient_name.includes("палочки") ||
        //   ingredient.ingredient_name.includes("Наклейка") ||
        //   ingredient.ingredient_name.includes("Упаковка") ||
        //   ingredient.ingredient_name.includes("СП") ||
        //   ingredient.ingredient_name.includes("Наклейки") ||
        //   ingredient.ingredient_name.includes("СП") ||
        //   ingredient.ingredient_name.includes("Наклейк") ||
        //   ingredient.ingredient_name.includes("Бумага") ||
        //   ingredient.ingredient_name.includes("Супница") ||
        //   ingredient.ingredient_name.includes("Крышка") ||
        //   ingredient.ingredient_name.includes("Картонные") ||
        //   ingredient.ingredient_name.includes("Мука") ||
        //   ingredient.ingredient_name.includes("Масло") ||
        //   ingredient.ingredient_name.includes("Вилка") ||
        //   ingredient.ingredient_name.includes("Тарелка") ||
        //   ingredient.ingredient_name.includes("Ложка")
        // ) {
        //   data.ingredients.splice(data.ingredients.indexOf(ingredient), 1);
        // }
      }
      product.ingredients = product.ingredients.filter(item => item.ingredient_icon !== 'logo')
      state.product = product;
    },
    INCREMENT: (state, index) => {
      if (
        window.location.href == "http://localhost:8080/cart" ||
        window.location.href == "https://gurmanikzn.ru/cart"
      ) {
        state.cart[index].count++;
        if (state.cart[index].product_name.includes("Пицца")) {
          let checked = state.cart[
            index
          ].group_modifications[0].modifications.filter(
            (mode) => mode.checked == true
          );
          checked[0].count = state.cart[index].count;
          state.cart[index].price[1] =
            checked[0].price * state.cart[index].count + "";
        } else if (state.cart[index].group_modifications) {
          let array = state.cart[index].group_modifications.map(
            (group_modifications) =>
            group_modifications.modifications.map(
              (modification) => modification.price * modification.count
            )
          );

          let reducer = (previousValue, currentValue) =>
            +previousValue + +currentValue;
          let result = array.reduce(reducer) + "";
          state.cart[index].price[1] =
            state.cart[index].spots[0].price * state.cart[index].count +
            +result +
            "";
        } else {
          state.cart[index].price[1] =
            state.cart[index].spots[0].price * state.cart[index].count + "";
        }
      } else {
        state.product.count++;

        if (state.product.category_name.includes("Пиццы")) {
          let checked =
            state.product.group_modifications[0].modifications.filter(
              (mode) => mode.checked == true
            );
          checked[0].count = state.product.count;
        }
      }
    },
    DECREMENT: (state, index) => {
      if (
        state.product.count > 1 &&
        window.location.href !== "http://localhost:8080/cart" &&
        window.location.href !== "https://gurmanikzn.ru/cart"
      ) {
        state.product.count--;

        if (state.product.category_name.includes("Пиццы")) {
          let checked =
            state.product.group_modifications[0].modifications.filter(
              (mode) => mode.checked == true
            );
          checked[0].count = state.product.count;
        }
      } else if (state.cart[index].count <= 1) {
        state.cart.splice(index, 1);
      } else if (state.cart[index].product_name.includes("Пицца")) {
        state.cart[index].count--;
        let checked = state.cart[
          index
        ].group_modifications[0].modifications.filter(
          (mode) => mode.checked == true
        );
        checked[0].count = state.cart[index].count;
        state.cart[index].price[1] =
          checked[0].price * state.cart[index].count + "";
      } else if (state.cart[index].group_modifications) {
        state.cart[index].count--;

        let array = state.cart[index].group_modifications.map(
          (group_modifications) =>
          group_modifications.modifications.map(
            (modification) => modification.price * modification.count
          )
        );

        let reducer = (previousValue, currentValue) =>
          +previousValue + +currentValue;
        let result = array.reduce(reducer) + "";
        state.cart[index].price[1] =
          state.cart[index].spots[0].price * state.cart[index].count +
          +result +
          "";
      } else {
        state.cart[index].count--;
        state.cart[index].price[1] =
          state.cart[index].spots[0].price * state.cart[index].count + "";
      }
    },
    SET_CART: (state, data) => {
      if (state.cart.length) {
        let dataExists = false;
        state.cart.map((item) => {
          if (item.product_id === data.product_id) {
            dataExists = true;
            if (item.group_modifications) {
              if (
                item.group_modifications[0].modifications[0].checked !==
                data.group_modifications[0].modifications[0].checked
              ) {
                state.cart.push(data);
              } else {
                item.count = data.count;
                item.group_modifications = data.group_modifications;
                item.price[1] = data.price[1];
              }
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
        state.product.group_modifications[0].modifications.map((mode) => {
          mode.checked = false;
          mode.count = 0;
        });
        state.product.group_modifications[0].modifications[
          index
        ].checked = true;
        state.product.group_modifications[0].modifications[index].count =
          state.product.count;
      }
      if (
        (state.cart.length && location.href == "http://localhost:8080/cart") ||
        window.location.href == "https://gurmanikzn.ru/cart"
      ) {
        setTimeout(() => {
          let cartItem = localStorage.getItem("cartItem");
          let switchArray =
            state.cart[cartItem].group_modifications[0].modifications;
          switchArray.map((mode) => {
            mode.checked = false;
            mode.count = 0;
          });
          state.cart[cartItem].group_modifications[0].modifications[
            index
          ].checked = true;
          state.cart[cartItem].group_modifications[0].modifications[
            index
          ].count = state.cart[cartItem].count;
          let checkedPrice = state.cart[
            cartItem
          ].group_modifications[0].modifications.filter(
            (mode) => mode.checked == true
          )[0].price;
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
      if (state.product.product_name.includes("Пицца")) {
        let checked = data.group_modifications[0].modifications.filter(
          (mode) => mode.checked == true
        );
        data.price[1] = checked[0].price.toString() * data.count + "";
      } else if (!state.product.group_modifications) {
        state.product.price[1] = data.price[1] =
          data.modified_price * data.count + "";
      } else {
        let array = data.group_modifications.map((group_modifications) =>
          group_modifications.modifications.map(
            (modification) => modification.price * modification.count
          )
        );
        let reducer = (previousValue, currentValue) =>
          +previousValue + +currentValue;

        let sum = function () {
          let result = array.reduce(reducer);
          if (result.length > 1) {
            return result.reduce(reducer);
          } else {
            return result;
          }
        };

        state.product.modificationsPrice = sum() + "";
        // state.product.price[1] = data.price[1] =
        //   data.modified_price * data.count + +sum() + "";
        state.product.price[1] = data.modified_price * data.count + sum() + "";
      }
    },
    SET_OLD_CART: (state, data) => {
      if (data) {
        JSON.parse(data).map((item) => state.cart.push(item));
      }
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
        state.discount.period_start = validPromo.params.periods[0].start.slice(
          0,
          -3
        );
        state.discount.period_end = validPromo.params.periods[0].end.slice(
          0,
          -3
        );
        state.discount.usage = validPromo.usage
        state.discount.error = "";
        if (state.discount.promocode_type == 1) {
          state.discount.product_id = validPromo.params.bonus_products[0].id;
        }

      } else {
        state.discount = {};
      }
    },
    DISCOUNT_PRODUCT: (state, product) => {
      state.discountProduct = product;
      state.discountCurrentProduct = state.discountProduct.product_name;
    },
    DELIVERY_TYPE: (state, type) => {
      state.selectAddress = {};
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
    TELEGRAM_ORDER: (state, order_data) => {
      state.telegram_order = order_data;
    },
    FORM_ERROR: (state, error) => {
      state.form_validation_error = error;
    },
    ADD_TO_FAVORITES: (state, product) => {
      if (state.favorites.length) {
        let dataExists = false;
        let favoriteArr = JSON.parse(localStorage.getItem("saved favorites"));

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
                  product.favorites = false;
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
    GET_BANNER: (state, banner) => {
      state.banner = banner;
    },
    PICKUP_TIME: (state, time) => {
      state.pickup_time = time;
    },
    SET_BANNERS: (state, banner) => {
      state.banners = banner;
    },
    CUTLERY_COUNT: (state, cutlery) => {
      state.cutlery_count = cutlery;
    },
    CURRENT_TIME: (state) => {
      let dateWithoutSecond = new Date();
      state.current_time = dateWithoutSecond.getHours().toString();
    },
    RENDER_ADMIN_ADRESSES: (state) => {
      state.admin_addresses = state.selectAdresses;
    },
    SET_ADDRESSES: (state, address) => {
      state.set_address = {
        address: address.address,
        delivery_zone: address.delivery_zone,
        street_index: address.street_index,
      };
    },
    DELETE_ADDRESS: (state, id) => {
      state.delete_address = id;
    },
    SET_POPULARS: (state, popular) => {
      state.admin_set_popular = {
        name: popular,
      };
    },
    DELETE_POPULARS: (state, popular) => {
      console.log(popular);
      state.admin_delete_popular = {
        name: popular,
      };
    },
    CHANGE_PRODUCTS_POSITION: (state, settings) => {
      let prevNextProduct = state.categoryProducts.filter((el) => {
        if (settings.action == "prev") {
          return el.sort_id == settings.product.sort_id - 1;
        } else {
          return el.sort_id == settings.product.sort_id + 1;
        }
      });
      if (settings.action == "prev" && settings.product.sort_id !== 0) {
        settings.product.sort_id = prevNextProduct[0].sort_id;
        prevNextProduct[0].sort_id = settings.product.sort_id + 1;
      } else if (
        settings.action == "next" &&
        settings.product.sort_id !== state.categoryProducts.length - 1
      ) {
        prevNextProduct[0].sort_id = settings.product.sort_id;
        settings.product.sort_id = prevNextProduct[0].sort_id + 1;
      }

      state.categoryProducts.sort((item1, item2) => {
        return item1.sort_id - item2.sort_id;
      });
    },
    SAVE_PRODUCT_POSITIONS: (state, config) => {
      state;
      config;
    },
    SET_ADMIN_PROMOCODES_USAGE: (state, promocode) => {
      state
      if (promocode.usage == 'reusable') {
        promocode.usage = 'disposable'
      } else {
        promocode.usage = 'reusable'
      }
    },
    SET_DISPOSABLE_PROMOCODES: (state) => {
      state.disposable_promocodes = state.promocodes.filter(item => item.usage == 'disposable')
    },
  },
  actions: {
    GET_CATEGORIES_FROM_API({
      commit
    }) {
      return axios({
        method: "GET",
        url: "https://gurmanikzn.ru:3000/categories",
      }).then((categories) => {
        commit(
          "SET_CATEGORIES_TO_STATE",
          categories.data.filter((category) => {
            return (
              category.category_name !== "Популярное" &&
              !category.category_name.includes("КУХНЯ")
            );
          })
        );
        return categories;
      });
    },
    GET_CATEGORY_PRODUCTS_FROM_API({
      commit
    }, categoryID) {
      return axios({
        method: "GET",
        url: `https://gurmanikzn.ru:3000/getProductsFromCategory${categoryID}`,
        params: categoryID,
      }).then((products) => {
        if (products.data.map((item) => item.group_modifications)) {
          products.data.map((product) => {
            if (product.group_modifications) {
              product.group_modifications.map((modification_group) => {
                modification_group.modifications.map((modification) => {
                  modification.price = modification.price + "00" - 0;
                });
              });
            }
          });
        }
        if (products.data[0].category_name.includes("Пицц")) {
          products.data.map((product) => {
            product.price[1] =
              product.group_modifications[0].modifications[0].price.toString();
          });
        }
        commit("SET_CATEGORY_PRODUCTS_TO_STATE", products.data);
      });
    },
    GET_POPULAR_FROM_API({
      commit
    }) {
      return axios({
        method: "GET",
        url: `https://gurmanikzn.ru:3000/populars`,
      }).then((populars) => {
        commit("SET_POPULAR_TO_STATE", populars.data);
      });
    },
    GET_PROMOCODES({
      commit
    }) {
      return axios({
        method: "GET",
        url: `https://gurmanikzn.ru:3000/promocodes`,
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
          mode.modifications.map((modification) => {
            modification.checked = false;
            modification.count = 0;
          });
        });

        if (data.group_modifications[0].modifications[0]) {
          data.group_modifications[0].modifications[0].checked = true;
        }

        if (data.category_name.includes("Пиццы")) {
          data.group_modifications[0].modifications[0].count = 1;
        }
      }

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
      return axios({
        method: "GET",
        url: `https://gurmanikzn.ru:3000/getDiscountProduct${product}`,
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
        url: `https://gurmanikzn.ru:3000/getAddresses`,
      }).then((addresses) => {
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
        url: `https://gurmanikzn.ru:3000/order`,
        params: order_data,
      }).then((order_data) => {
        commit("SEND_ORDER_DATA", order_data);
      });
    },
    SEND_ORDER_TO_TELEGRAM({
      commit
    }, order_data) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/telegram`,
        params: order_data,
      }).then((order_data) => {
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
    ADD_BANNER({
      commit
    }, data) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/promoD`,
        params: data,
      }).then((data) => {
        commit("GET_BANNER", data);
      });
    },
    GET_BANNERS({
      commit
    }) {
      return axios({
        method: "GET",
        url: `https://gurmanikzn.ru:3000/banners`,
      }).then((banners) => {
        commit("SET_BANNERS", banners.data);
      });
    },
    GET_PICKUP_TIME({
      commit
    }, time) {
      commit("PICKUP_TIME", time);
    },
    GET_CUTLERY_COUNT({
      commit
    }, cutlery) {
      commit("CUTLERY_COUNT", cutlery);
    },
    GET_TIME({
      commit
    }) {
      commit("CURRENT_TIME");
    },
    GET_ADMIN_ADDRESSES({
      commit
    }) {
      commit("RENDER_ADMIN_ADRESSES");
    },
    SET_ADMIN_ADDRESSES({
      commit
    }, address) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/setNewAddress`,
        params: address,
      }).then((address) => {
        commit("SET_ADDRESSES", address);
      });
    },
    DELETE_ADMIN_ADDRESS({
      commit
    }, id) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/deleteAddress`,
        params: {
          id: id,
        },
      }).then((id) => {
        commit("DELETE_ADDRESS", id);
      });
    },
    SET_ADMIN_POPULARS({
      commit
    }, popular) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/setNewPopular`,
        params: popular,
      }).then((popular) => {
        commit("SET_POPULARS", popular);
      });
    },
    DELETE_ADMIN_POPULARS({
      commit
    }, popular) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/deletePopular`,
        params: popular,
      }).then((popular) => {
        commit("DELETE_POPULARS", popular);
      })
    },
    SET_ADMIN_PRODUCTS_POSITION({
      commit
    }, settings) {
      commit("CHANGE_PRODUCTS_POSITION", settings);
    },
    SAVE_ADMIN_PRODUCTS_POSITION({
      commit
    }, config) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/saveProductPositions`,
        data: config,
      }).then((config) => {
        commit("SAVE_PRODUCT_POSITIONS", config);
      });
    },
    SET_ADMIN_PROMOCODES_USAGE({
      commit
    }, promocode) {
      commit("SET_ADMIN_PROMOCODES_USAGE", promocode);
      axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/changePromocodeType`,
        data: promocode,
      })
    },
    DISPOSABLE_PROMOCODES({
      commit
    }) {
      commit('SET_DISPOSABLE_PROMOCODES')
    }
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
      } else if (state.totalPrice < 60000) {
        state.warning = 'Доставка осуществляется при сумме заказа от 600 ₽'
        return (state.delivery_pay = 0)
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
        state.current_time > state.discount.period_start &&
        // state.discount.promocode_name.toUpperCase() !== localStorage.getItem(state.discount.promocode_name.toUpperCase())
        state.error == ''
      ) {
        // if (state.discount.promocode_name) {
        // if (state.discount.promocode_name.toUpperCase() == localStorage.getItem(state.discount.promocode_name.toUpperCase())) {
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
        // }
        // }

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
          let filteredModifications = function () {
            // if (item.group_modifications && item.category_name.includes('Пиццы')) {

            // }

            if (item.group_modifications) {
              if (item.category_name.includes("Пиццы")) {
                let test = item.group_modifications ?
                  item.group_modifications.map((modification_group) => {
                    return modification_group.modifications
                      .filter((mode) => {
                        return mode.count > 0;
                      })
                      .map((modif) => {
                        return {
                          m: modif.dish_modification_id,
                          a: 1,
                        };
                      });
                  }) :
                  null;

                let q = test
                  .filter((mode_arr) => mode_arr.length)
                  .map((el) => el[0]);

                return q;
              } else {
                let test = item.group_modifications ?
                  item.group_modifications.map((modification_group) => {
                    return modification_group.modifications
                      .filter((mode) => {
                        return mode.count > 0;
                      })
                      .map((modif) => {
                        return {
                          m: modif.dish_modification_id,
                          a: modif.count,
                        };
                      });
                  }) :
                  null;

                let q = test
                  .filter((mode_arr) => mode_arr.length)
                  .map((el) => el[0]);

                return q;
              }
            } else {
              return null;
            }
          };

          arr.push({
            product_id: item.product_id,
            count: item.count,
            // price: item.category_name.includes('Пиццы') ? "000" : (item.price[1] / item.count).toString(),
            price: item.category_name.includes("Пиццы") ?
              null : (item.price[1] / item.count).toString(),
            modification: filteredModifications(),
          });
        }
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
        comment: state.cutlery_count +
          " | " +
          (state.discount.promocode_name !== undefined && state.error == "" ?
            state.discount.promocode_name + " | " :
            "") +
          state.payment_type +
          (state.deliveryType == 2 ? " | " + state.pickup_time : "") +
          (state.order_comment !== "" ?
            " | " + state.order_comment + " | " :
            ""),
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
          state.discount.period_start + ":00"
        }  до ${state.discount.period_end + ":00"}`);
      } else if (state.discount.promocode_name) {
        if (state.discount.promocode_name.toUpperCase() == localStorage.getItem(state.discount.promocode_name.toUpperCase()) && state.discount.usage == 'disposable') {
          return state.error = `Этот купон можно было применить только 1 раз`
        } else {
          return (state.error = ``);
        }
      } else {
        return (state.error = ``);
      }
    },
    FORM_ERROR(state) {
      return state.form_validation_error;
    },
    CURRENT_TIME(state) {
      let dateWithoutSecond = new Date();
      // let currentHour = dateWithoutSecond
      //   .toLocaleTimeString(navigator.language, {
      //     hour: "2-digit"
      //   })
      // .replace(":", "");
      return (state.current_time = dateWithoutSecond.getHours().toString());
    },
    WARNING(state) {
      return state.warning;
    },
    FAVORITES(state) {
      return state.favorites;
    },
    SET_SAVED_FAVORITES(state) {
      let arra1 = state.categoryProducts.map((item) => item.product_id);
      let arra2 = state.popular.map((item) => item.product_id);
      let arra3 = state.favorites.map((item) => item.product_id);

      let intersect = function (arr1, arr2) {
        return arr1.filter(function (id) {
          return arr2.indexOf(id) !== -1;
        });
      };

      for (const item of intersect(arra1, arra3).map((item) => item)) {
        state.categoryProducts.filter(
          (it) => it.product_id == item
        )[0].favorites = true;
      }
      for (const item of intersect(arra2, arra3)) {
        state.popular.filter((it) => it.product_id == item)[0].favorites = true;
      }
    },
    GET_BANNER(state) {
      return state.banner;
    },
    PICKUP_TIME(state) {
      return state.pickup_time;
    },
    SET_BANNERS(state) {
      return state.banners;
    },
    CUTLERY_COUNT(state) {
      return state.cutlery_count;
    },
    TELEGRAM_ORDER(state) {
      function getOrderProducts() {
        let arr = [];

        for (let item of state.cart) {
          let filteredModifications = function () {
            if (item.group_modifications) {
              let test = item.group_modifications ?
                item.group_modifications.map((modification_group) => {
                  return modification_group.modifications
                    .filter((mode) => {
                      return mode.count > 0;
                    })
                    .map((modif) => {
                      return {
                        m: modif.name,
                        a: ` (${modif.count})`,
                      };
                    });
                }) :
                null;

              let q = test
                .filter((mode_arr) => mode_arr.length)
                .map((el) => el[0]);

              return q;
            } else {
              return null;
            }
          };

          arr.push({
            product_name: item.product_name,
            count: item.count,
            price: (item.price[1].slice(0, -2) / item.count).toString(),
            modification: filteredModifications(),
          });
        }
        // (Не сработало попробуй ещё как-нибудь) С МОДИФИКАТОРАМИ ТОЖЕ НУЖНО FILTER.LENGTH СДЕЛАТЬ ЧТОБЫ ОН ПРОВЕРКУ ПРОХОДИЛ И ТОГДА ВСЁ ТОПЧИК БУДЕТ
        return arr;
      }

      return (state.telegram_order = {
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
        total_order_price: state.totalPrice.toString().slice(0, -2),
        products: getOrderProducts(),
        comment: state.cutlery_count +
          " | " +
          (state.discount.promocode_name !== undefined && state.error == "" ?
            state.discount.promocode_name + " | " :
            "") +
          state.payment_type +
          (" | " + state.pickup_time == "Сам-з undefined" ?
            "Тип заказа предзаказ (стоит уточнить у клиента)" :
            state.deliveryType == 2 ?
            " | " + state.pickup_time :
            "") +
          (state.order_comment !== "" ?
            " | " + state.order_comment + " | " :
            ""),
      });
    },
    RENDER_ADMIN_ADRESSES(state) {
      return state.admin_addresses;
    },
    DELETE_ADDRESS(state) {
      return state.delete_address;
    },
    DISPOSABLE_PROMOCODES(state) {
      return state.disposable_promocodes
    }
  },
  modules: {},
});