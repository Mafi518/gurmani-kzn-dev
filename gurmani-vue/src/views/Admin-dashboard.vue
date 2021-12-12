<template>
  <div>
    <h1>WELCOME</h1>

    <form action="">
      <input type="file" v-on:change="onFileChange" name="" id="discount-image" />
      <button type="submit" @click.prevent="sendPhoto">Загрузить фото</button>
    </form>

    <button @click.prevent="logout">
        logout
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      image: "",
    };
  },
  methods: {
    sendPhoto() {
      console.log("sended photo");
    },
    onFileChange(e) {
        // let files = e.target.files || e.dataTransfer.files;
        // let reader = new FileReader()
        // reader.onload = function() {
        //     document.getElementById("discount-image").src = reader.result
        // }
        // reader.readAsDataURL(files[0])

        console.log(e);

        // Досмотри видос https://www.youtube.com/watch?v=ZH-PnY-JGBU
    },
    logout() {
        this.$store.dispatch('logout')
    }
  },
};
</script>
<style lang="scss" scoped>
</style>