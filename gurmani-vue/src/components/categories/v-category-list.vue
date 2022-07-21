<template>
  <section class="category">
    <h2 class="category__title"><slot></slot></h2>
    <div class="category__list">
      <button class="category__item-add" v-show="IS_AUTH" @click="openPopup">
        Добавить новую категорию
      </button>
      <!-- <v-category-item
        :category_data="admin_settings.template"
        v-show="admin_settings.popup_data.options.visible"
      ></v-category-item> -->
      <transition
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        v-show="IS_AUTH"
      >
        <v-category-item
          :category_data="category_form"
          :settings="{ admin_emit: IS_AUTH ? true : false }"
        >
        </v-category-item>
      </transition>
      <transition-group appear @before-enter="beforeEnter" @enter="enter">
        <v-category-item
          v-for="(category, index) in CATEGORIES.categories"
          :key="category.category_id"
          :category_data="category"
          :settings="{ admin_emit: IS_AUTH ? true : false }"
          @getCategoryProducts="getCategoryProducts"
          @editCategory="editCategory"
          :data-index="index"
        ></v-category-item>
      </transition-group>
      <!-- <transition-group
        appear
        @before-enter="beforeEnter"
        @enter="enter"
        v-if="!IS_AUTH"
      >
        <v-category-item
          v-for="(category, index) in CATEGORIES.categories"
          :key="category.category_id"
          :category_data="category"
          @getCategoryProducts="getCategoryProducts"
          :data-index="index"
        ></v-category-item>
      </transition-group> -->
    </div>
    <v-popup v-show="IS_AUTH" @adminSave="addNewCategory" :data="popup_data">
      <div class="popup__container">
        <input
          type="file"
          @change="onFileChange($event)"
          placeholder="Картинка"
          class="popup__input-file"
        />
        <input
          type="text"
          placeholder="Название категории"
          v-model.trim="category_form.category_name"
          class="popup__input-text"
        />
        <input
          type="text"
          placeholder="ID категории"
          :data="1"
          v-model.trim="category_form.category_id"
          class="popup__input-text"
        />
        <input
          type="color"
          @input="onColorChange"
          placeholder=""
          class="popup__input-colorpicker"
        />
        <label for="hidden" class="popup__input-label">
          Скрыть категорию
          <input
            type="checkbox"
            name="hidden"
            id="hidden"
            @input="$emit('update:category_form.hidden', $event.target.value)"
            v-model="category_form.hidden"
            class="popup__input-checkbox"
          />
        </label>
      </div>
    </v-popup>

    <button @click="DELETE_IMAGE('aaaaaaa')">DELETE_IMAGE</button>
  </section>
</template>
<script>
import vCategoryItem from "@/components/categories/v-category-item";
import { mapActions, mapGetters } from "vuex";
import { gsap } from "gsap";
import img from "./push_category";
// Попробуй поработать с name файла, а не грузить картинки в base64, схема такая -> загрузка файла на сервак со всеми ключами -> нэйм присваиваем товару || категории, крч опционально, при редактировании удаляем файл с тем нэймом и загружаем новый

export default {
  name: "v-category-list",
  data() {
    return {
      editable_image: img,
      popup_data: {
        options: {
          visible: true,
          controll: "",
          require_auth: true,
        },
        title: "Добавить категорию",
      },
      category_form: {
        category_id: 0,
        category_name: "",
        category_color: "",
        category_show_image: "",
        category_image: "",
        hidden: false,
      },
    };
  },
  props: {},
  computed: {
    ...mapGetters(["CATEGORIES", "CATEGORY_PRODUCTS", "IS_AUTH"]),
  },
  methods: {
    ...mapActions([
      "GET_CATEGORIES",
      "GET_CATEGORY_PRODUCTS_FROM_API",
      "DELETE_IMAGE",
      "PUSH_NEW_CATEGORY",
    ]),
    setNewCategory() {},
    editCategory() {
      console.log("emited");
    },
    addNewCategory(action) {
      if (action == "save") this.PUSH_NEW_CATEGORY(this.category_form);
      else
        this.category_form = {
          category_id: 9999,
          category_name: "Добавить категорию",
          category_color: "",
          category_image: "",
          category_show_image: "",
          hidden: false,
        };
    },
    onColorChange(e) {
      this.category_form.category_color = e.target.value;
    },
    async onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = e.target.files[0];
      // let file_size = file.size;
      // let file_name = file.name;
      // let file_type = file.type;
      // this.category_form.category_image = file;
      this.category_form.category_show_image = file;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        var imgcode = e.target.result;
        this.category_form.category_image = imgcode;
      };
    },
    async getCategoryProducts(ID) {
      console.log(ID);
      await this.GET_CATEGORY_PRODUCTS_FROM_API(ID);

      if (this.CATEGORY_PRODUCTS.length !== 0) {
        localStorage.setItem("categoryID", ID);
        this.$router.push("/products");
      }
    },
    async openPopup() {
      if (this.popup_data.options.visible)
        this.popup_data.options.visible = false;
      else this.popup_data.options.visible = true;
    },
  },
  mounted() {
    this.GET_CATEGORIES();
    // this.category_form.category_id =
    //   this.CATEGORIES.categories.slice(-1)[0].category_id + 1;
  },
  components: {
    vCategoryItem,
  },
  setup() {
    const beforeEnter = (el) => {
      el;
    };
    const enter = (el) => {
      gsap.fromTo(
        el,
        0.3,
        {
          opacity: 0,
          transform: "translateX(20px)",
          delay: el.dataset.index * 0.2,
        },
        {
          opacity: 1,
          transform: "translateX(0px)",
          delay: el.dataset.index * 0.2,
        }
      );
    };

    return { beforeEnter, enter };
  },
};
</script>
<style lang="scss" scoped>
.category {
  padding-bottom: 10px;
  &__title {
    @include h2;
  }
  &__list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: auto;
  }

  // .category__item-add

  &__item-add {
    min-width: 160px;
    max-width: 160px;
    width: 100%;
    min-height: 138px;
    height: 100%;
    display: flex;
    border-radius: 10px;
    font-size: 16px;
    margin-right: 14px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    background-color: $white;
  }
}
.popup {
  // .popup__container

  &__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  // .popup__input-file

  &__input-file {
  }

  // .popup__input-text

  &__input-text {
    padding: 8px;
    margin: 10px 0;
    border-radius: 10px;
    border: 1px solid $black;
    font-size: 16px;

    &:hover {
      cursor: pointer;
    }
    &:focus {
      cursor: text;
    }
    &::placeholder {
      font-size: calc(100% - 2px);
    }
  }

  // .popup__input-colorpicker

  &__input-colorpicker {
    &:hover {
      cursor: pointer;
    }
  }

  // .popup__input-label

  &__input-label {
    display: flex;
    align-items: center;

    &:active,
    &:focus,
    &:hover {
      cursor: pointer;
    }
  }

  // .popup__input-checkbox

  &__input-checkbox {
    margin: 10px 0px 10px 10px;
  }
}

@media (max-width: 1920px) and (min-width: 1025px) {
  .category {
    &__list {
      padding-bottom: 10px;
    }
  }
}
@media (max-width: 1024px) and (min-width: 1px) {
  .category {
    &__title {
      margin-left: 20px;
    }
    &__list {
      padding-right: 20px;
    }
  }
}
</style>
