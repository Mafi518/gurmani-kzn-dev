<template>
  <section class="panel">
    <v-back-menu>
      <v-back-btn @click="signOutUser"></v-back-btn>
      <h2>Gurmani dashboard</h2>
    </v-back-menu>

    <form action="" class="promotion form">
      <h2 class="form__title">Добавить баннер</h2>
      <!-- <input type="file" name="promotion_file" @change="uploadFile"> -->
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
    {{ this.response }}
  </section>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "@/firebase";
import { useRouter } from "vue-router";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      image: "",
      promo_name: "",
      promo_picture: "",
      response: "",
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
    ...mapActions(["ADD_BANNER", "ADD_BANNER_PHOTO"]),
    async changeBanners(e) {
      const data = await {
        action: e.target.getAttribute("title"),
        promo_name: this.promo_name,
        promo_picture: this.promo_picture,
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
    uploadFile(e) {
      let target = e.target || e.srcElement || e.currentTarget;
      let file = target.files[0];
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/" + file.name, true);
      xhr.setRequestHeader("Content-Type", "application/octate-stream");
      xhr.onreadystatechange = function () {
        e = null;
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // this.callBackFunction(this.responseText)
            console.log("success");
            console.log(xhr.responseText);
          } else {
            console.log("errrrrror");
          }
        }
      };
      xhr.send(file);
      e.target.value = "";
    },
    callBackFunction(data) {
      console.log(data);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.panel {
  padding: 20px;
  padding-top: 0;
}
.promotion {
  margin-top: 20px;
}
.form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  &__input {
    @include container;
    position: relative;
    width: 45%;
    display: flex;
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
}
</style>