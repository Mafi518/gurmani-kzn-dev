<template>
  <section class="panel">
    <v-back-menu>
      <v-back-btn @click="signOutUser"></v-back-btn>
      <h2 class="panel__title">Gurmani dashboard</h2>
    </v-back-menu>

    <form action="" class="promotion form">
      <h2 class="form__title">Добавить баннер</h2>
      <input
        type="text"
        placeholder="Название акции (промокод)"
        class="form__input form__input-block"
        v-model.trim="promo_name"
      />
      <input
        type="text"
        placeholder="Название картинки (banner1.jpg)"
        class="form__input form__input-block"
        v-model.trim="promo_picture"
      />
      <h3 class="panel__title location__title">Где будет находиться баннер?</h3>
      <label for="location1" class="form__input"
        >В шапке
        <input
          type="radio"
          name="location"
          id="location1"
          value="header"
          v-model="promo_location"
      /></label>
      <label for="location2" class="form__input"
        >Между меню и популярным
        <input
          type="radio"
          name="location"
          id="location2"
          value="body"
          v-model="promo_location"
      /></label>

      <button
        class="form__button form__add"
        title="add"
        @click.prevent="changeBanners"
      >
        Добавить
      </button>
      <button
        class="form__button form__delete"
        title="delete"
        @click.prevent="changeBanners"
      >
        Удалить
      </button>
    </form>
    {{ this.banner_response }}

    <form action="" class="addresses">
      <h2 class="form__title">Добавить/Удалить улицу</h2>

      <input
        type="text"
        placeholder="Найти улицу"
        v-model.trim="search_address"
        class="addresses__search"
      />
      <button
        class="addresses__add"
        @click.prevent="
          add_toggle == false ? (add_toggle = true) : (add_toggle = false)
        "
      >
        Добавить улицу
      </button>

      <article class="addresses__item" v-if="add_toggle == true">
        <input
          type="text"
          class="addresses__input"
          placeholder="Адрес"
          v-model.trim="add_form.address"
        />
        <input
          type="text"
          class="addresses__input"
          placeholder="Зона доставки"
          v-model.trim="add_form.delivery_zone"
        />
        <input
          type="text"
          class="addresses__input"
          placeholder="Индекс улицы"
          v-model.trim="add_form.street_index"
        />
        <button class="addresses__add" @click.prevent="adminAddAddress()">
          Добавить
        </button>
      </article>

      <div class="addresses__list">
        <article
          class="addresses__item"
          v-for="address in FIND_ADDRESS"
          :key="address.id"
        >
          <input
            type="text"
            id="address"
            :value="address.address"
            class="addresses__input"
          />
          <input
            type="text"
            :value="address.delivery_zone"
            class="addresses__input"
          />
          <input
            type="text"
            :value="address.street_index"
            class="addresses__input"
          />
          <button
            class="addresses__delete"
            @click.prevent="adminDeleteAddress(address)"
          >
            Удалить
          </button>
        </article>
      </div>
    </form>

    <form action="" class="admin-popular">
      <h2 class="form__title">Добавить/Удалить популярный продукт</h2>

      <button
        class="admin-popular__add"
        @click.prevent="
          add_popular == false ? (add_popular = true) : (add_popular = false)
        "
      >
        Добавить
      </button>

      <div class="admin-popular__item-container" v-if="add_popular == true">
        <input
          type="text"
          placeholder="Название блюда"
          class="admin-popular__input"
          v-model.trim="add_popular_field"
        />
        <button class="admin-popular__add" @click.prevent="adminAddPopular">
          Добавить
        </button>
      </div>

      <div class="admin-popular__container">
        <article
          class="admin-popular__item"
          v-for="popular in POPULAR"
          :key="popular.product_id"
        >
          <img
            :src="`https://gurmanikzndev.joinposter.com${popular.photo_origin}`"
            class="admin-popular__image"
          />
          <h3 class="admin-popular__title">
            {{ popular.product_name }}
          </h3>
          <button
            class="admin-popular__delete"
            @click.prevent="adminDeletePopular(popular.product_name)"
          >
            Удалить
          </button>
        </article>
      </div>
    </form>

    <section class="config">
      <h2 class="config__title">Редактировать отображение продуктов</h2>
      <div class="config__list">
        <div
          class="config__item"
          v-for="category in CATEGORIES"
          :key="category.category_id"
          @click="adminCategoryProductsList(category.category_id)"
        >
          <img
            :src="`https://gurmanikzndev.joinposter.com${category.category_photo}`"
            alt=""
            class="config__image"
          />
          {{ category.category_name }}
        </div>
      </div>
    </section>

    <div class="change-popup" v-if="this.CATEGORY_PRODUCTS.length">
      <h2 class="change-popup__title">Редактировать позицию продуктов</h2>
      <div class="change-popup__list">
        <div
          class="change-popup__item"
          v-for="product in CATEGORY_PRODUCTS"
          :key="product.product_id"
          @click="support(product)"
        >
          <img
            :src="`https://gurmanikzndev.joinposter.com${product.photo}`"
            alt=""
            class="change-popup__image"
          />
          {{ product.product_name }}
          <div class="change-popup__controls">
            <button
              class="change-popup__control"
              @click.prevent="changeProductPosition(product, 'prev')"
            >
              Влево
            </button>
            <button
              class="change-popup__control"
              @click.prevent="changeProductPosition(product, 'next')"
            >
              Вправо
            </button>
          </div>
          {{ product.sort_id }}
        </div>
      </div>
      <button class="change-popup__save" @click.prevent="saveProductPositions">
        Сохранить
      </button>
    </div>

    <section class="admin-promocodes">
      <h2 class="admin-promocodes__title">
        Редактировать применение промокода
      </h2>
      <div class="admin-promocodes__list">
        <div
          class="admin-promocodes__item"
          v-for="promocode in PROMOCODES"
          :key="promocode.promotion_id"
        >
          {{ promocode.name }}
          <button
            class="admin-promocodes__change"
            @click.prevent="SET_ADMIN_PROMOCODES_USAGE(promocode)"
          >
            {{
              promocode.usage == "reusable"
                ? "Сделать промокод одноразовым"
                : "Сделать промокод многоразовым"
            }}
          </button>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "@/firebase";
import { useRouter } from "vue-router";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      image: "",
      promo_name: "",
      promo_picture: "",
      promo_location: "",
      banner_response: "",

      search_address: "",

      add_toggle: false,
      add_form: {
        address: "",
        delivery_zone: "",
        street_index: "",
      },

      add_popular: false,
      add_popular_field: "",

      change_popup_toggle: false,
    };
  },
  setup() {
    const { user } = useAuthState();
    const auth = getAuth();

    const router = useRouter();
    const signOutUser = async () => {
      try {
        await signOut(auth);
        router.push("/auth");
      } catch (error) {
        console.log(error);
      }
    };

    return { user, signOutUser };
  },
  methods: {
    ...mapActions([
      "ADD_BANNER",
      "ADD_BANNER_PHOTO",
      "GET_ADMIN_ADDRESSES",
      "GET_ADDRESSES",
      "SET_ADMIN_ADDRESSES",
      "DELETE_ADMIN_ADDRESS",
      "GET_POPULAR_FROM_API",
      "SET_ADMIN_POPULARS",
      "DELETE_ADMIN_POPULARS",
      "GET_CATEGORIES_FROM_API",
      "GET_CATEGORY_PRODUCTS_FROM_API",
      "SET_ADMIN_PRODUCTS_POSITION",
      "SAVE_ADMIN_PRODUCTS_POSITION",
      "GET_PROMOCODES",
      "SET_ADMIN_PROMOCODES_USAGE",
    ]),
    async changeBanners(e) {
      const data = await {
        action: e.target.getAttribute("title"),
        promo_name: this.promo_name,
        promo_picture: this.promo_picture,
        location: this.promo_location,
      };
      this.ADD_BANNER(data);
      if (e.target.getAttribute("title") == "add") {
        this.response = "Баннер успешно добавлен";
      } else {
        this.response = "Баннер успешно удалён";
      }

      setTimeout(() => {
        this.response = "";
      }, 1000);
    },
    async adminAdresses() {
      await this.GET_ADDRESSES();
      this.GET_ADMIN_ADDRESSES();
    },
    async adminDeleteAddress(address) {
      await this.DELETE_ADMIN_ADDRESS(address.id);
      this.search_address = "";
      this.adminAdresses();
    },
    async adminAddAddress() {
      await this.SET_ADMIN_ADDRESSES(this.add_form);
      this.add_form.address = "";
      this.add_form.delivery_zone = "";
      this.add_form.street_index = "";
      this.adminAdresses();
    },
    async adminAddPopular() {
      await this.SET_ADMIN_POPULARS(this.add_popular_field);
      this.GET_POPULAR_FROM_API()
    },
    async adminDeletePopular(popular) {
      await this.DELETE_ADMIN_POPULARS(popular);
      this.GET_POPULAR_FROM_API()
    },
    async adminCategoryProductsList(id) {
      await this.GET_CATEGORY_PRODUCTS_FROM_API(id);
      this.change_popup_toggle = true;
    },
    async changeProductPosition(product, action) {
      // Что если сделать функционал кастомной сортировки продуктов полностью через vuex,
      // Сохранить при этом реактивность объектов,
      // а потом при запросе на сервер, подтягивать конфиг и делать вычисления на клиенте, идея неплохая

      let settings = {
        product: product,
        action: action,
      };
      this.SET_ADMIN_PRODUCTS_POSITION(settings);
    },
    async saveProductPositions() {
      this.SAVE_ADMIN_PRODUCTS_POSITION(this.CATEGORY_PRODUCTS);
    },
    support(prod) {
      console.log("support id", prod.sort_id);
      prod;
    },
  },
  computed: {
    ...mapGetters([
      "RENDER_ADMIN_ADRESSES",
      "POPULAR",
      "CATEGORIES",
      "CATEGORY_PRODUCTS",
      "PROMOCODES",
    ]),
    FIND_ADDRESS() {
      console.log(this.RENDER_ADMIN_ADRESSES.length);
      if (
        this.RENDER_ADMIN_ADRESSES.filter((elem) =>
          elem.address.toLowerCase().includes(this.search_address.toLowerCase())
        )
      ) {
        return this.RENDER_ADMIN_ADRESSES.filter((elem) =>
          elem.address.toLowerCase().includes(this.search_address.toLowerCase())
        );
      } else {
        return this.RENDER_ADMIN_ADRESSES;
      }
    },
  },
  mounted() {
    this.adminAdresses();
    this.GET_POPULAR_FROM_API();
    this.GET_CATEGORIES_FROM_API();
    this.GET_PROMOCODES();
  },
};
</script>
<style lang="scss" scoped>
.panel {
  padding: 20px;
  padding-top: 0;
  &__title {
    width: 100%;
    text-align: center;
    margin-bottom: 0;
  }
}
.promotion {
  margin-top: 20px;
}
.form {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-top: 30px;
  &__input {
    @include container;
    position: relative;
    width: 45%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 14px;
    font-size: 13px;
    border: none;
    outline: none;
    margin-bottom: 20px;
    &-block {
      max-width: 100%;
      width: 100%;
    }
    &::-webkit-input-placeholder {
      color: $second-black;
    }
    &::-moz-placeholder {
      color: $second-black;
    }
    &:-ms-input-placeholder {
      color: $second-black;
    }
    &::-ms-input-placeholder {
      color: $second-black;
    }
    &::placeholder {
      color: $second-black;
    }
  }
  &__title {
    margin-bottom: 20px;
  }
  &__button {
    padding: 20px;
    border-radius: 10px;
    max-width: 45%;
    width: 100%;
    color: $white;
  }
  &__add {
    background-color: turquoise;
  }
  &__delete {
    background-color: tomato;
  }
  .location__title {
    margin-bottom: 20px;
  }
  label {
    input {
      margin-left: 10px;
    }
  }
}
.addresses {
  margin-top: 30px;
  &__list {
    max-height: 50vh;
    overflow: auto;
  }
  &__item {
    @include container;
    margin-bottom: 20px;
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  input {
    padding: 10px;
    border-radius: 10px;
    border: none;
  }
  &__input {
    background-color: $background;
    width: 45%;
    margin: 5px;
    &:first-child {
      width: 100%;
    }
  }
  button {
    border: none;
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    color: #fff;
  }

  &__search {
    background-color: #fff;
    width: 100%;
    display: block;
  }
  &__delete {
    margin: 5px;
    background-color: tomato;
  }
  &__add {
    background-color: turquoise;
    margin: 10px 0;
  }
}
.admin-popular {
  margin-top: 20px;

  &__container {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @include container;
    padding: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    &-container {
      @include container;
      padding: 10px;
      margin-bottom: 20px;
    }
  }
  &__image {
    max-width: 125px;
    max-height: 130px;
    height: 100%;
  }
  &__title {
    @include h3;
  }
  &__delete {
    background-color: tomato;
    border: none;
    border-radius: 10px;
    color: #fff;
    margin: 5px;
    padding: 10px;
    width: 100%;
  }
  &__add {
    border: none;
    border-radius: 10px;
    background-color: turquoise;
    padding: 10px;
    width: 100%;
    color: #fff;
    margin: 15px 0;
  }
  &__input {
    padding: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    background-color: $background;
    margin: 5px;
  }
}
.config {
  &__title {
    @include h2;
  }
  &__list {
    display: flex;
    overflow: auto;
    margin-bottom: 20px;
  }
  &__item {
    max-width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @include container;
    padding-bottom: 10px;
    margin-right: 10px;
    cursor: pointer;
    text-align: center;
  }
  &__image {
    max-width: 100px;
  }
}
.change-popup {
  &__title {
    @include h2;
    margin-bottom: 20px;
  }
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__item {
    display: flex;
    margin: 10px;
    flex-direction: column;
    align-items: center;
    @include container;
    padding: 10px;
  }
  &__image {
    max-width: 120px;
    margin-bottom: 5px;
  }
  &__controls {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 10px 0;
  }
  &__control {
    padding: 7px;
    background-color: $accent;
    border-radius: 10px;
    cursor: pointer;
    color: #fff;
  }
  &__save {
    background-color: turquoise;
    padding: 10px;
    margin: 15px 0;
    margin-left: 10px;
    width: 100%;
    color: $white;
    border-radius: 10px;
    cursor: pointer;
  }
}
.admin-promocodes {
  &__title {
    @include h2;
  }
  &__list {
    display: flex;
    overflow: auto;
  }
  &__item {
    @include container;
    margin-right: 20px;
    padding: 7px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
  &__change {
    @include container;
    background-color: $accent;
    padding: 5px;
    color: $white;
  }
}
</style>
