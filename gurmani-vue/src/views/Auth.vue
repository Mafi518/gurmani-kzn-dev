<template>
  <section class="auth">
    <form action="" @submit.prevent="handleSubmit" class="auth__form">
      <input
        type="email"
        v-model.trim="email"
        name="email"
        id="email"
        class="auth__input"
        placeholder="login"
      />
      <input
        type="password"
        v-model.trim="password"
        name="password"
        id="password"
        class="auth__input"
        placeholder="password"
      />
      <button type="submit" class="auth__button">Войти</button>
    </form>

    <!-- <button @click.prevent="logout">Выйти</button> -->
  </section>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  name: "Auth",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  setup() {
    const auth = getAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
      const { email, password } = e.target.elements;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push("/admin-dashboard");
      } catch (error) {
        console.log(error);
      }
    };

    return { handleSubmit };
  },
  methods: {
    logout() {},
    // async logout() {
    //   await this.$store.dispatch('logout')
    // }
  },
};
</script>
<style lang="scss" scoped>
.auth {
  height: 100vh;
  width: 100vw;
  padding: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  &__form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    width: 100%;
  }
  &__input {
    @include container;
    padding: 20px;
    border: none;
    margin-bottom: 20px;
  }
  &__button {
    padding: 20px;
    background-color: $accent;
    border-radius: 10px;
    color: $white;
  }
}
</style>
