import { createStore } from "vuex";
import axios from "axios";
import adminActions from "./modules/admin/actions";
import adminMutations from "./modules/admin/mutations";
import adminGetters from "./modules/admin/getters";
import apiRequest from "./api-request";

export default createStore({
  state: {
    categories: {
      categories: [],
      fake_categories: [],
    },
    test: "",
    is_auth: false,
    pickup_address: {
      affilate_address: "",
      affilate_number: "",
    },
    cart: [],
    warning: "",
    product: {
      empty: true,
    },
    cart_data: {
      total: 0,
      subtotal: 0,
      delivery: {
        pay: 0,
        type: "delivery",
        pay_per_delivery: false,
      },
      discount: {
        name: "",
        total: 0,
        type: "",
        success: false,
      },
    },
    error: "",
    tooltip: "",
    addresses: [],
    banners: [],
    category_products: [],
    promocodes: [],
    populars: [],
    order: {
      address: {
        empty: true,
      },
    },
    sended_order: {},
    favorites: [],
    frontpad_order: {},
  },
  mutations: {
    ...adminMutations,
    SET_CATEGORIES_TO_STATE: (state, payload) => {
      state.categories.categories = payload.categories;
      state.categories.fake_categories = payload.fake_categories;
    },
    SET_CATEGORY_PRODUCTS_TO_STATE: (state, data) => {
      if (data[0].category_name == "Пиццы") {
        data.map((item) => {
          let price = item.modifications.filter(
            (item) => item.selected == true
          )[0];
          item.price = price.price;
          item.total_price = price.price;
          item.fixed_price = price.price;
        });
      }

      state.category_products = data;
    },
    SET_BANNERS: (state, banner) => {
      state.banners = banner;
    },
    SET_PRODUCT_INFO: (state, data) => {
      for (const ingredient of data.ingredients) {
        switch (ingredient.name) {
          case "Тобико оранжевая":
            ingredient.icon = "tobiko_orange";
            break;
          case "Рис отварной":
            ingredient.icon = "rice";
            break;
          case "Нори":
            ingredient.icon = "nori";
            break;
          case "Авокадо":
            ingredient.icon = "avocado";
            break;
          case "Ананас":
            ingredient.icon = "pineaple";
            break;
          case "Бекон":
            ingredient.icon = "bacon";
            break;
          case "Вакаме":
            ingredient.icon = "seaweed";
            break;
          case "Ветчина":
            ingredient.icon = "ham";
            break;
          case "Водоросли Комбо":
            ingredient.icon = "seaweed";
            break;
          case "Кинза":
            ingredient.icon = "cilantro";
            break;
          case "Кокосовое молоко":
            ingredient.icon = "coconut_milk";
            break;
          case "Краб-микс":
            ingredient.icon = "crab";
            break;
          case "Креветки":
            ingredient.icon = "shrimp";
            break;
          case "Кунжут Белый":
            ingredient.icon = "white_sesame";
            break;
          case "Кунжут Черный":
            ingredient.icon = "black_sesame";
            break;
          case "Лайм":
            ingredient.icon = "lime";
            break;
          case "Лосось":
            ingredient.icon = "salmon";
            break;
          case "Лук красный":
            ingredient.icon = "red_onion";
            break;
          case "Лук репчатый":
            ingredient.icon = "onion";
            break;
          case "Маслины":
            ingredient.icon = "olives";
            break;
          case "Морковь":
            ingredient.icon = "carrot";
            break;
          case "Моцарелла":
            ingredient.icon = "mozzarella";
            break;
          case "Огурцы":
            ingredient.icon = "cucumber";
            break;
          case "Огурчики маринованные":
            ingredient.icon = "pickled_cucumbers";
            break;
          case "Орегано":
            ingredient.icon = "oregano";
            break;
          case "Пармезан":
            ingredient.icon = "parmesan";
            break;
          case "Петрушка":
            ingredient.icon = "parsley";
            break;
          case "Помидоры":
            ingredient.icon = "tomatoes";
            break;
          case "Рис":
            ingredient.icon = "rice";
            break;
          case "Рис Shinaki":
            ingredient.icon = "rice";
            break;
          case "Соус Унаги":
            ingredient.icon = "unagi_sauce";
            break;
          case "Сливочный сыр":
            ingredient.icon = "cheese_creamy";
            break;
          case "Чили перец":
            ingredient.icon = "chilli";
            break;
          case "Шампиньоны":
            ingredient.icon = "champignon";
            break;
          case "Тесто ":
            ingredient.icon = "dough";
            break;
          case "Черная тобико":
            ingredient.icon = "black-tobiko";
            break;
          case "Маменори":
            ingredient.icon = "mamenori";
            break;
          case "Маринованные огурцы":
            ingredient.icon = "marinade-cucumber";
            break;
          case "Сырная шапочка":
            ingredient.icon = "cheese_cap";
            break;
          case "Халапеньо":
            ingredient.icon = "jalapeno";
            break;
          case "Кунжут жаренный":
            ingredient.icon = "fried_sesame";
            break;
          case "Сыр с плесенью":
            ingredient.icon = "blue_cheese";
            break;
          case "Чеддер":
            ingredient.icon = "cheddar";
            break;
          case "Соус Цезарь":
            ingredient.icon = "caesar_sauce";
            break;
          case "Черри":
            ingredient.icon = "cherry";
            break;
          case "Укроп":
            ingredient.icon = "dill";
            break;
          case "Лимон":
            ingredient.icon = "lemon";
            break;
          case "Томатный соус":
            ingredient.icon = "tomato_sauce";
            break;
          case "Говяжий фарш":
            ingredient.icon = "ground_beef";
            break;
          case "Карамельный Топинг":
            ingredient.icon = "caramel_topping";
            break;
          case "Майонез":
            ingredient.icon = "mayonnaise";
            break;
          case "Креветки отварные":
            ingredient.icon = "boiled_shrimp";
            break;
          case "Соус для запекания":
            ingredient.icon = "sauce_for_baking";
            break;
          case "Соус спайс":
            ingredient.icon = "spice_sauce";
            break;
          case "тайский соус":
            ingredient.icon = "thai-sauce";
            break;
          case "Болгарский перец":
            ingredient.icon = "bell_pepper";
            break;
          case "Красный лук":
            ingredient.icon = "red_onion";
            break;
          case "Жаренный лосось":
            ingredient.icon = "fried_salmon";
            break;
          case "Лук зелёный":
            ingredient.icon = "green_onion";
            break;
          case "Копченая курица филе":
            ingredient.icon = "smoked_chicken_fillet";
            break;
          case "Тобико красная":
            ingredient.icon = "tobiko_red";
            break;
          case "Чука":
            ingredient.icon = "chuka";
            break;
          case "Лосось филе":
            ingredient.icon = "salmon_fillet";
            break;
          case "Угорь филе":
            ingredient.icon = "eel_fillet";
            break;
          case "Тунец филе":
            ingredient.icon = "tuna_fillet";
            break;
          case "Курица жаренная":
            ingredient.icon = "fried_chicken_fillet";
            break;
          case "Стружка тунца":
            ingredient.icon = "tuna_shavings";
            break;
          case "Жаренная курица филе":
            ingredient.icon = "fried_chicken_fillet";
            break;
          case "Лосось хк филе":
            ingredient.icon = "salmon_hk_fillet";
            break;
          default:
            ingredient.icon = "logo";
            break;
        }
      }
      data.ingredients = data.ingredients.filter(
        (item) => item.icon !== "logo"
      );
      state.product = data;
    },
    RESET_PRODUCT: (state) => {
      state.product = {
        empty: true,
      };
    },
    ADD_TO_CART: (state, data) => {
      data.cart_item = true;
      let prod = Object.assign({}, data);

      if (state.cart.length) {
        let dataExist = false;

        state.cart.map((item) => {
          if (item.id === data.id) {
            dataExist = true;
          }
        });

        if (!dataExist) {
          state.cart.push(prod);
        }
      } else {
        state.cart.push(prod);
      }

      // if (data.modifications.length) {
      //   if (data.name.includes('Wok') && data.modifications.filter(item => item.count > 0).length <= 0) {
      //     state.tooltip = 'Добавьте обязательный модификатор'
      //     setTimeout(() => {
      //       state.tooltip = ''
      //     }, 2000);
      //   } else {
      //     if (state.cart.length) {
      //       let dataExist = false

      //       state.cart.map(item => {
      //         if (item.name === data.name) {
      //           dataExist = true
      //         }
      //       })

      //       if (!dataExist) {
      //         state.cart.push(data)
      //       }
      //     } else {
      //       state.cart.push(data)
      //     }
      //   }

      // } else {
      //   if (state.cart.length) {
      //     let dataExist = false

      //     state.cart.map(item => {
      //       if (item.name === data.name) {
      //         dataExist = true
      //       }
      //     })

      //     if (!dataExist) {
      //       state.cart.push(data)
      //     }
      //   } else {
      //     state.cart.push(data)
      //   }
      // }
    },
    INCREMENT: (state, data) => {
      state;
      data.count++;
    },
    DECREMENT: (state, data) => {
      state;
      if (data.count > 1) {
        data.count--;
      } else if (data.modification == true) {
        if (data.count > 0) {
          data.count--;
        }
      } else if (data.cart_item == true) {
        data.count--;
      }
    },
    FULL_PRICE: (state, data) => {
      state;
      data.price = data.fixed_price * data.count;
    },
    TOTAL_PRICE: (state, data) => {
      state;

      let array = data.modifications.length
        ? data.modifications.map((item) => item.fixed_price * item.count)
        : [0, 0];

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

      data.total_price = data.fixed_price * data.count + sum();
    },
    TOGGLE_SIZE_OF_PIZZA: (state, data) => {
      state;
      data.PRODUCT_INFO.modifications.map((item) => {
        item.selected = false;
      });
      data.modification.selected = true;
      data.PRODUCT_INFO.id = data.modification.id;
      data.PRODUCT_INFO.fixed_price = data.modification.price;
    },
    SET_POPULARS_FROM_API: (state, data) => {
      state.populars = data;
    },
    SAVE_CART: (state, data) => {
      state;
      data;

      localStorage.setItem(
        "SAVED_CART",
        JSON.stringify(state.cart.map((item) => item))
      );
    },
    SET_SAVED_CART: (state, data) => {
      if (data) {
        let without_promo_positions = JSON.parse(data).filter(
          (item) =>
            item.name !== "Сяке Хот за 230р" &&
            item.name !== "Чизбургер за 299р" &&
            item.name !== "Маки с лососем в подарок"
        );
        state.cart = without_promo_positions;
      }
    },
    SET_CART_DATA: (state, data) => {
      state;
      data;
    },
    SET_DELIVERY_TYPE: (state, type) => {
      if (type !== "pickup") {
        state.cart_data.delivery.pay = 0;
        state.pickup_address = {
          affilate_address: "",
          affilate_number: "",
        };
      }
      if (type == "pickup") {
        if (
          state.cart.filter((item) => item.name == "Чизбургер за 299р").length
        ) {
          state.cart = state.cart.filter(
            (item) => item.name !== "Чизбургер за 299р"
          );
          state.cart.push({
            id: 234,
            name: "Чизбургер",
            price: 335,
            fixed_price: 335,
            total_price: 335,
            weight: "330/550",
            calory: 215,
            cart_item: true,
            ingredients: [
              {
                name: "Говяжий фарш",
              },
              {
                name: "Огурчики маринованные",
              },
              {
                name: "Бекон",
              },
              {
                name: "Красный лук",
              },
              {
                name: "Помидоры",
              },
              {
                name: "Моцарелла",
              },
            ],
            category_id: 1,
            count: 1,
            favorites: "false",
            description:
              "Сырный соус, говяжий фарш, маринованные огурчики, томаты, бекон, красный лук, моцарелла",
            category_name: "Пиццы",
            modifications: [
              {
                id: 234,
                name: "25 см",
                modification: true,
                price: 335,
                fixed_price: 335,
                count: 0,
                image: "",
                selected: true,
                required: false,
              },
              {
                id: 246,
                name: "30 см",
                modification: true,
                price: 515,
                fixed_price: 515,
                count: 0,
                image: "",
                selected: false,
                required: false,
              },
            ],
            image: "",
          });
        } else if (
          state.cart.filter((item) => item.name == "Сяке Хот за 230р").length
        ) {
          state.cart = state.cart.filter(
            (item) => item.name !== "Сяке Хот за 230р"
          );
          state.cart.push({
            id: 140,
            name: "Сяке Хот",
            price: 290,
            fixed_price: 290,
            total_price: 290,
            weight: 180,
            calory: 320,
            cart_item: true,
            ingredients: [
              {
                name: "Лосось",
              },
              {
                name: "Огурцы",
              },
              {
                name: "Сливочный сыр",
              },
              {
                name: "Рис",
              },
              {
                name: "Кунжут Белый",
              },
            ],
            category_id: 4,
            count: 1,
            favorites: "false",
            description: "Лосось, сливочный сыр, рис, унаги, кунжут",
            category_name: "Жаренные роллы",
            modifications: [
              {
                name: "Соевый соус",
                modification: true,
                price: 25,
                fixed_price: 25,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Васаби",
                modification: true,
                price: 10,
                fixed_price: 10,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Имбирь",
                modification: true,
                price: 20,
                fixed_price: 20,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Соус Унаги",
                modification: true,
                price: 40,
                fixed_price: 40,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Огурец",
                modification: true,
                price: 15,
                fixed_price: 15,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Авокадо",
                modification: true,
                price: 20,
                fixed_price: 20,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Халапеньо",
                modification: true,
                price: 30,
                fixed_price: 30,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Соус Спайс",
                modification: true,
                price: 20,
                fixed_price: 20,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
              {
                name: "Соус Цезарь",
                modification: true,
                price: 30,
                fixed_price: 30,
                count: 0,
                image: "soi-sauce",
                selected: false,
                required: false,
              },
            ],
            image: "",
          });
        }
      } else if (
        type == "delivery" &&
        state.cart_data.discount.name == "сяке" &&
        state.cart_data.discount.success == true
      ) {
        state.cart = state.cart.filter((item) => item.name !== "Сяке Хот");
        state.cart.push({
          id: 141,
          name: "Сяке Хот за 230р",
          price: 230,
          fixed_price: 230,
          total_price: 230,
          weight: 180,
          calory: 320,
          cart_item: true,
          ingredients: [
            {
              name: "Лосось",
            },
            {
              name: "Огурцы",
            },
            {
              name: "Сливочный сыр",
            },
            {
              name: "Рис",
            },
            {
              name: "Кунжут Белый",
            },
          ],
          category_id: 4,
          count: 1,
          favorites: "false",
          description: "Лосось, сливочный сыр, рис, унаги, кунжут",
          category_name: "Жаренные роллы",
          modifications: [
            {
              name: "Соевый соус",
              modification: true,
              price: 25,
              fixed_price: 25,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Васаби",
              modification: true,
              price: 10,
              fixed_price: 10,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Имбирь",
              modification: true,
              price: 20,
              fixed_price: 20,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Соус Унаги",
              modification: true,
              price: 40,
              fixed_price: 40,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Огурец",
              modification: true,
              price: 15,
              fixed_price: 15,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Авокадо",
              modification: true,
              price: 20,
              fixed_price: 20,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Халапеньо",
              modification: true,
              price: 30,
              fixed_price: 30,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Соус Спайс",
              modification: true,
              price: 20,
              fixed_price: 20,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
            {
              name: "Соус Цезарь",
              modification: true,
              price: 30,
              fixed_price: 30,
              count: 0,
              image: "soi-sauce",
              selected: false,
              required: false,
            },
          ],
          image: "",
        });
      } else if (
        type == "delivery" &&
        state.cart_data.discount.name == "piiza25" &&
        state.cart_data.discount.success == true
      ) {
        state.cart = state.cart.filter((item) => item.name !== "Чизбургер");
        state.cart.push({
          id: 225,
          name: "Чизбургер за 299р",
          price: 299,
          fixed_price: 299,
          total_price: 299,
          weight: "330/550",
          calory: 215,
          cart_item: true,
          ingredients: [
            {
              name: "Говяжий фарш",
            },
            {
              name: "Огурчики маринованные",
            },
            {
              name: "Бекон",
            },
            {
              name: "Красный лук",
            },
            {
              name: "Помидоры",
            },
            {
              name: "Моцарелла",
            },
          ],
          category_id: 1,
          count: 1,
          favorites: "false",
          description:
            "Сырный соус, говяжий фарш, маринованные огурчики, томаты, бекон, красный лук, моцарелла",
          category_name: "Пиццы",
          modifications: [
            {
              id: 225,
              name: "25 см",
              modification: true,
              price: 299,
              fixed_price: 299,
              count: 0,
              image: "",
              selected: true,
              required: false,
            },
            {
              id: 225,
              name: "25 см",
              modification: true,
              price: 299,
              fixed_price: 299,
              count: 0,
              image: "",
              selected: false,
              required: false,
            },
          ],
          image: "",
        });
      }
      state.cart_data.delivery.type = type;
    },
    SET_ADDRESSES: (state, data) => {
      data.map((item) => {
        switch (item.delivery_zone) {
          case 1:
            item.delivery_pay = 1;
            item.delivery_free = 600;
            break;
          case 2:
            item.delivery_pay = 100;
            item.delivery_free = 800;
            break;
          case 3:
            item.delivery_pay = 150;
            item.delivery_free = 1000;
            break;
          case 4:
            item.delivery_pay = 150;
            item.delivery_free = 1200;
            break;
          case 5:
            item.delivery_pay = 200;
            item.delivery_free = 1400;
            break;
          case 6:
            item.delivery_pay = 250;
            item.delivery_free = 1800;
            break;
          case 7:
            item.delivery_pay = 300;
            item.delivery_free = 2000;
            break;
          default:
            break;
        }
      });
      state.addresses = data;
    },
    SET_SELECTED_ADDRESS: (state, data) => {
      state.order.address = data;
    },
    SET_PROMOCODES: (state, data) => {
      state.promocodes = data;
    },
    APPLY_PROMOCODE: (state, data) => {
      state;
      data;
      let validPromo = state.promocodes.filter(
        (item) => item.name.toUpperCase() == data.toUpperCase()
      )[0];

      if (validPromo == undefined) {
        state.cart_data.discount = {
          name: "",
          total: 0,
          type: "",
          success: false,
        };
      } else {
        state.cart_data.discount = validPromo;
      }
    },
    SET_ORDER_DATA: (state, data) => {
      data.address = state.order.address;
      state.order = data;
    },
    SEND_ORDER_DATA: (state, data) => {
      state.sended_order.telegram = data;
    },
    SET_FAVORITES: (state, data) => {
      console.log(data.favorites);
      if (data.favorites == false) {
        data.favorites = true;
        state.favorites.push(data);
      } else {
        data.favorites = false;
        let index = state.favorites.indexOf(data);
        state.favorites.splice(index, 1);
      }
      console.log(data.favorites);
    },
    SAVE_FAVORITES: (state, data) => {
      state;
      data;

      localStorage.setItem(
        "SAVED_FAVORITES",
        JSON.stringify(state.favorites.map((item) => item))
      );
    },
    SET_SAVED_FAVORITES: (state, data) => {
      if (data) {
        JSON.parse(data).map((item) => state.favorites.push(item));

        for (const elem of state.favorites) {
          let sortedArr = state.populars.filter(
            (item) => item.name == elem.name
          );
          if (sortedArr.length) {
            sortedArr.map((item) => (item.favorites = true));
          }
        }

        for (const elem of state.favorites) {
          let sortedArr = state.category_products.filter(
            (item) => item.name == elem.name
          );
          if (sortedArr.length) {
            sortedArr.map((item) => (item.favorites = true));
          }
        }
      }
    },
    SEND_ORDER_DATA_TO_FRONTPAD: (state) => {
      state;
    },
    SET_PICKUP_ADDRESS: (state, data) => {
      if (state.cart_data.delivery.type == "pickup") {
        state.pickup_address.affilate_address = data;
        state.pickup_address.affilate_number =
          data == "ул. Главная, 47" ? "32" : "";
      } else {
        state.pickup_address = {
          affilate_address: "",
          affilate_number: "",
        };
      }
    },
    testMutate1: (state, data = 3) => {
      console.log(data);
      state;
    },
    testMutate2: (state, data = 2) => {
      console.log(data);
      state;
    },
    testMutate3: (state, data = 3) => {
      console.log(data);
      state;
    },
  },
  actions: {
    ...adminActions,
    DELIVERY_TYPE({ commit }, type) {
      commit("SET_DELIVERY_TYPE", type);
    },
    async GET_CATEGORIES() {
      await apiRequest.function("GET", "/categories", [
        "SET_CATEGORIES_TO_STATE",
      ]);
    },
    async GET_CATEGORY_PRODUCTS_FROM_API({ commit }, ID) {
      commit;
      await apiRequest.function(
        "GET",
        "/getProductsFromCategory",
        ["SET_CATEGORY_PRODUCTS_TO_STATE"],
        ID
      );
    },
    GET_BANNERS({ commit }) {
      return axios({
        method: "GET",
        url: `https://gurmanikzn.ru:3000/banners`,
      }).then((banners) => {
        commit("SET_BANNERS", banners.data);
      });
    },
    GET_POPULARS_FROM_API({ commit }) {
      return axios({
        method: "GET",
        url: "https://gurmanikzn.ru:3000/getPopulars",
      }).then((populars) => {
        commit("SET_POPULARS_FROM_API", populars.data);
      });
    },
    GET_PRODUCT_INFO({ commit }, data) {
      commit("SET_PRODUCT_INFO", data);
    },
    RESET_PRODUCT({ commit }) {
      commit("RESET_PRODUCT");
    },
    ADD_TO_CART({ commit }, data) {
      commit("ADD_TO_CART", data);
      commit("SAVE_CART", data);
    },
    INCREMENT({ commit }, data) {
      commit("INCREMENT", data);
      commit("FULL_PRICE", data);
    },
    DECREMENT({ commit }, data) {
      commit("DECREMENT", data);
      commit("FULL_PRICE", data);
    },
    FULL_PRICE({ commit }, data) {
      commit("FULL_PRICE", data);
    },
    TOTAL_PRICE({ commit }, data) {
      commit("TOTAL_PRICE", data);
    },
    TOGGLE_SIZE_OF_PIZZA({ commit }, data) {
      commit("TOGGLE_SIZE_OF_PIZZA", data);
    },
    SAVE_CART({ commit }, data) {
      commit("SAVE_CART", data);
    },
    SET_SAVED_CART({ commit }, data) {
      commit("SET_SAVED_CART", data);
    },
    GET_CART_DATA({ commit }, data) {
      commit("SET_CART_DATA", data);
    },
    GET_ADDRESSES({ commit }) {
      return axios({
        method: "GET",
        url: "https://gurmanikzn.ru:3000/getAddresses",
        // url: "https://localhost:3000/getAddresses",
      }).then((data) => {
        commit("SET_ADDRESSES", data.data);
      });
    },
    GET_ADDRESS({ commit }, data) {
      commit("SET_SELECTED_ADDRESS", data);
    },
    GET_PROMOCODES({ commit }) {
      return axios({
        method: "GET",
        url: "https://gurmanikzn.ru:3000/promocodes",
      }).then((data) => {
        commit("SET_PROMOCODES", data.data);
      });
    },
    APPLY_PROMOCODE({ commit }, data) {
      commit("APPLY_PROMOCODE", data);
    },
    GET_ORDER_DATA({ commit }, data) {
      commit("SET_ORDER_DATA", data);
    },
    SEND_ORDER_DATA({ commit }, data) {
      return axios({
        method: "POST",
        url: `https://gurmanikzn.ru:3000/telegram`,
        data: data,
      }).then((order_data) => {
        commit("SEND_ORDER_DATA", order_data);
      });
    },
    SEND_ORDER_DATA_TO_FRONTPAD({ commit }, data) {
      return axios({
        method: "POST",
        url: "https://gurmanikzn.ru:3000/fronthook",
        // url: "http://localhost:3000/fronthook",
        data: data,
      }).then((data) => {
        commit("SEND_ORDER_DATA_TO_FRONTPAD", data.data);
      });
    },
    ADD_TO_FAVORITES({ commit }, data) {
      commit("SET_FAVORITES", data);
      commit("SAVE_FAVORITES", data);
    },
    SET_SAVED_FAVORITES({ commit }, data) {
      commit("SET_SAVED_FAVORITES", data);
    },
    SET_PICKUP_ADDRESS({ commit }, data) {
      commit("SET_PICKUP_ADDRESS", data);
    },
  },
  getters: {
    ...adminGetters,
    CATEGORIES(state) {
      return state.categories;
    },
    SET_BANNERS(state) {
      return state.banners;
    },
    CATEGORY_PRODUCTS(state) {
      return state.category_products;
    },
    PRODUCT_INFO(state) {
      return state.product;
    },
    CART(state) {
      if (state.cart.filter((item) => item.count <= 0)) {
        if (state.cart.length) {
          localStorage.setItem(
            "SAVED_CART",
            JSON.stringify(state.cart.filter((item) => item.count >= 1))
          );
        }
        return (state.cart = state.cart.filter((item) => item.count >= 1));
      }
      return state.cart;
    },
    POPULARS(state) {
      return state.populars;
    },
    CART_DATA(state) {
      if (state.cart.length > 0) {
        let array = state.cart.map((item) => item.total_price);

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

        state.cart_data.subtotal = sum();

        state.cart_data.total =
          state.cart_data.subtotal -
          state.cart_data.discount.total -
          state.cart_data.delivery.pay;
      }

      if (state.cart_data.delivery.type == "pickup") {
        state.cart_data.delivery.pay = (state.cart_data.subtotal * 10) / 100;
        state.cart_data.delivery.pay_per_delivery = false;
        state.error = ``;
        state.warning = ``;
      } else if (state.cart_data.delivery.type == "delivery") {
        if (state.order.address && state.cart_data.subtotal < 600) {
          state.error = `Доставка осуществляется при сумме заказа от 600 ₽`;
          state.cart_data.delivery.pay = 0;
          state.warning = ``;
        } else if (
          state.cart_data.subtotal < state.order.address.delivery_free &&
          state.cart_data.subtotal > 600
        ) {
          state.warning = `Закажите ещё на ${
            state.order.address.delivery_free - state.cart_data.subtotal
          } ₽ для бесплатной доставки`;
          state.cart_data.delivery.pay = state.order.address.delivery_pay;
          state.cart_data.delivery.pay_per_delivery = true;
          state.error = ``;
          state.cart_data.total =
            state.cart_data.subtotal -
            state.cart_data.discount.total +
            state.cart_data.delivery.pay;
        } else {
          state.error = ``;
          state.warning = ``;
          state.cart_data.delivery.pay = 0;
          state.cart_data.delivery.pay_per_delivery = false;
        }
      }

      let now = new Date().getHours();

      if (state.cart_data.subtotal < state.cart_data.discount.condition) {
        state.warning = `Промокод действует при сумме заказа от ${state.cart_data.discount.condition} ₽`;
        state.cart_data.discount.success = false;
        state.cart_data.discount.total = 0;
      } else if (state.cart_data.discount.condition_time == false) {
        if (state.cart_data.discount.type == "percent") {
          if (
            state.cart_data.discount.name == "16pm" &&
            state.cart_data.delivery.type == "delivery"
          ) {
            state.cart_data.discount.success = true;
            state.cart_data.discount.total =
              (state.cart_data.subtotal *
                (state.cart_data.discount.discount / 2)) /
              100;
          } else {
            state.cart_data.discount.success = true;
            state.cart_data.delivery.pay = 0;
            state.cart_data.discount.total =
              (state.cart_data.subtotal * state.cart_data.discount.discount) /
              100;
          }
        } else if (state.cart_data.discount.type == "integer") {
          state.cart_data.discount.success = true;
          state.cart_data.discount.total = state.cart_data.discount.discount;
        } else if (state.cart_data.discount.type == "product") {
          state.cart_data.discount.success = true;
          // state.cart_data.discount.total = state.cart_data.discount.total
        }
      } else if (state.cart_data.discount.condition_time) {
        if (
          now < state.cart_data.discount.condition_time.start ||
          now > state.cart_data.discount.condition_time.end
        ) {
          state.warning = `Промокод действует с ${state.cart_data.discount.condition_time.start}:00 до ${state.cart_data.discount.condition_time.end}:00 `;
          state.cart_data.discount.success = false;
          state.cart_data.discount.total = 0;
        } else {
          if (state.cart_data.discount.type == "percent") {
            if (
              state.cart_data.discount.name == "16pm" &&
              state.cart_data.delivery.type == "delivery"
            ) {
              state.cart_data.discount.success = true;
              state.cart_data.discount.total =
                (state.cart_data.subtotal *
                  (state.cart_data.discount.discount / 2)) /
                100;
            } else {
              state.cart_data.delivery.pay = 0;
              state.cart_data.discount.success = true;
              state.cart_data.discount.total =
                (state.cart_data.subtotal * state.cart_data.discount.discount) /
                100;
            }
          } else if (state.cart_data.discount.type == "integer") {
            state.cart_data.discount.success = true;
            state.cart_data.discount.total = state.cart_data.discount.discount;
          } else if (state.cart_data.discount.type == "product") {
            state.cart_data.discount.success = true;
            // state.cart_data.discount.total = state.cart_data.discount.total
          }
          state.warning = ``;
        }
      } else {
        state.warning = ``;
      }

      return state.cart_data;
    },
    WARNING(state) {
      return state.warning;
    },
    ERROR(state) {
      return state.error;
    },
    ADDRESSES(state) {
      return state.addresses;
    },
    ADDRESS(state) {
      if (state.cart_data.delivery.type == "pickup") {
        return (state.order.address = {
          empty: true,
        });
      } else {
        return state.order.address;
      }
    },
    PROMOCODES(state) {
      return state.promocodes;
    },
    ORDER(state) {
      state.order.products = state.cart.map((item) => {
        return {
          name: item.name,
          price: item.total_price,
          count: item.count,
          modifications: item.modifications
            ? item.modifications.filter((item) => {
                return item.selected == true || item.count > 0;
              })
            : [],
        };
      });
      state.order.pickup_address = state.pickup_address;
      state.order.order_total = state.cart_data.total;
      state.order.order_delivery_pay =
        state.cart_data.delivery.pay !== 0 &&
        state.cart_data.delivery.type == "delivery"
          ? state.cart_data.delivery.pay
          : 0;
      state.order.order_description =
        state.order.order_comment +
        " | " +
        state.order.order_payment_type +
        (state.cart_data.discount.success == true
          ? " | " + state.cart_data.discount.name
          : "") +
        " | " +
        state.order.order_cutlery +
        (state.order.order_pickup !== "" && state.order.address.empty == true
          ? " | " + state.order.order_pickup
          : "");
      if (state.cart_data.delivery.type == "pickup") {
        state.order.order_address = {
          search_value: "",
          house: "",
          apartment: "",
          entrance: "",
          floor: "",
        };
        state.order.address = {
          empty: true,
        };
        // state.order
      } else {
        state.order.order_pickup = "";
      }

      if (state.order.order_cutlery == 0) {
        state.order.order_cutlery =
          "Приборы " +
          state.cart.filter((item) => item.category_name.includes("роллы"))
            .length;
      }
      return state.order;
    },
    SENDED_ORDER(state) {
      return state.sended_order;
    },
    FAVORITES(state) {
      return state.favorites;
    },
    TOOLTIP(state) {
      return state.tooltip;
    },
    FRONTPAD_ORDER(state) {
      state.frontpad_order.name = state.order.order_name;
      state.frontpad_order.phone = state.order.order_phone;
      state.frontpad_order.address = state.order.order_address;
      state.frontpad_order.descr = state.order.order_description;
      state.frontpad_order.delivery = state.order.order_delivery_pay;
      state.frontpad_order.pickup_address = state.pickup_address;
      state.frontpad_order.delivery_affilate = state.order.address.affilate;
      state.frontpad_order.products = state.cart.map((item) => {
        return {
          id: item.id,
        };
      });
      state.frontpad_order.count = state.cart.map((item) => {
        return {
          count: item.count,
        };
      });

      return state.frontpad_order;
    },
    PICKUP_ADDRESS(state) {
      return state.pickup_address;
    },
  },
  modules: {},
});
