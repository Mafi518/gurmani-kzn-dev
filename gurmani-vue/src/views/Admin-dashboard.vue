<template>
  <section class="panel">
    <v-back-menu>
      <v-back-btn @click="signOutUser"></v-back-btn>
      <h2>Gurmani dashboard</h2>
    </v-back-menu>

    <form action="" class="promotion form">
      <h2 class="form__title">Добавить баннер</h2>
      <input
        type="text"
        placeholder="Название акции (промокод)"
        class="form__input form__input-block"
      />
      <input
        type="text"
        placeholder="Название картинки (banner1.jpg)"
        class="form__input form__input-block"
      />
      <button class="form__button form__add">Добавить</button>
      <button class="form__button form__delete">Удалить</button>
    </form>
  </section>
</template>
<script>
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "@/firebase";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      image: "",
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
  methods: {},
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