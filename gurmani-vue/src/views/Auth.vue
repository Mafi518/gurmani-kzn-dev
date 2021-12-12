<template>
  <section class="auth">
    <form action="" class="auth__form">
      <input
        type="email"
        v-model.trim="email"
        name=""
        id="email"
        class="auth__input"
        placeholder="login"
      />
      <input
        type="password"
        v-model.trim="password"
        name=""
        id="password"
        class="auth__input"
        placeholder="password"
      />
      <button type="submit" @click.prevent="login" class="auth__button">Войти</button>
    </form>


    <!-- <button @click.prevent="logout">Выйти</button> -->
  </section>
</template>
<script>
export default {
  name: "Auth",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const formData = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('login', formData)
      
      this.$router.push('/admin-dashboard')
    },
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
  display: flex;
  align-items: center;
  justify-content: center;
  &__form {
    display: flex;
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