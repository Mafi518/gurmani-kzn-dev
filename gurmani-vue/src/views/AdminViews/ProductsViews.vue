<template>
  <section class="admin__products">
    <div class="admin__products-categories">
      <v-category-list
        @setNewCategory="setNewCategory"
        :admin_settings="this.admin_settings.categories"
        >Меню</v-category-list
      >
    </div>

    <v-popup
      class="admin__popup-categories"
      :data="admin_settings.categories.popup_data"
      @adminSave="formSave"
    >
      <div class="admin__popup-body--categories">
        <label class="admin__popup-input-file" for="categories-preview-image">
          <input
            type="file"
            id="categories-preview-image"
            class="admin__popup-input--categories"
            @change="onFileChange($event, 'categories')"
          />
          Загрузить фото
        </label>
        <input
          type="text"
          class="admin__popup-input--categories"
          v-model.trim="admin_settings.categories.template.category_name"
          placeholder="Имя категории"
        />
        <input
          type="text"
          class="admin__popup-input--categories"
          v-model.trim="admin_settings.categories.template.category_alt"
          placeholder="Сео* alt тэг"
        />
      </div>
    </v-popup>
  </section>
</template>
<script>
import vCategoryList from "@/components/categories/v-category-list";
import { mapActions } from "vuex";
export default {
  name: "ProductsViews",
  components: {
    vCategoryList,
  },
  data() {
    return {
      admin_settings: {
        categories: {
          edit: true,
          visible: true,
          template: {
            category_image: "",
            category_name: "",
            category_alt: "",
          },
          popup_data: {
            options: {
              visible: false,
              controll: "categories",
            },
            title: "Добавить новую категорию",
          },
        },
      },
    };
  },
  methods: {
    ...mapActions(["PUSH_NEW_CATEGORY"]),

    async onFileChange(e, type) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = e.target.files[0];
      // let file_size = file.size;
      // let file_name = file.name;
      let file_type = file.type;
      if (file_type == "image/png" || file_type == "image/jpeg") {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          // var imgcode = e.target.result;
          var imgcode = e.target.result;
          console.log(type);
          if (type == "categories") {
            // this.selfie = file;
            this.admin_settings.categories.template.category_image = imgcode;
          } else if (type == "Паспорт: регистрация") {
            // this.registration_page = file;
          } else if (type == "Паспорт: лицевая сторона") {
            // this.front_side = file;
          }
        };
      }
    },
    async BASE64_TO_FILE(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    async formSave(
      controller,
      option,
      payload = { categories: this.admin_settings.categories }
    ) {
      if (controller == "save" && option == "categories") {
        console.log("qweqeqweqw1");
        await this.PUSH_NEW_CATEGORY(payload.categories.template);
      }

      if (controller == "cancel" && option == "categories") {
        console.log("qweqeqweqw2");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.admin {
  // .admin__products

  &__products {
  }

  // .admin__products-categories

  &__products-categories {
  }

  // .admin__popup-categories

  &__popup-categories {
  }

  // .admin__popup-preview--categories

  &__popup-preview--categories {
  }

  // .admin__popup-preview-image--categories

  &__popup-preview-image--categories {
    max-width: 80px;
    max-height: 80px;
    width: 100%;
  }

  // .admin__popup-preview-text--categories

  &__popup-preview-text--categories {
  }

  // .admin__popup-body--categories

  &__popup-body--categories {
    display: flex;
    flex-direction: column;
    label,
    input {
      margin-bottom: 24px;
    }
    label {
      &:first-child {
        input {
          display: none;
        }
      }
    }
  }

  // .admin__popup-input--categories

  &__popup-input--categories {
    @include admin-input;
  }

  // .admin__popup-input-file

  &__popup-input-file {
    @include admin-input;
  }
}
</style>
