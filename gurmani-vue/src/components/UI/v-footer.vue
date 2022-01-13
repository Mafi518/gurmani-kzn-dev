<template>
  <footer class="footer">
    <div class="footer__contacts">
      <div class="footer__social">
        <a
          href="https://www.instagram.com/gurmani.kzn/"
          target="_blank"
          class="footer__social-link"
        >
          <v-icon name="instagram-icon"></v-icon>
        </a>
        <a
          href="https://vk.com/gurmanikzn"
          target="_blank"
          class="footer__social-link"
        >
          <v-icon name="vk-icon"></v-icon>
        </a>
      </div>
      <div class="footer__info">
        <a href="tel:+78432390012" class="footer__phone">+7 (843) 239-00-12</a>
        <h3 class="footer__info-title">10:00 – 22:00</h3>
        <h3 class="footer__info-title">г. Казань</h3>
      </div>
    </div>

    <div class="footer__metrics">
      <slot></slot>
      <div class="footer__yandex"></div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "v-footer",
  data() {
    return {
      location: this.$store.state.location,
    };
  },
};
</script>
<style lang="scss">
.footer {
  padding: 0px 20px 20px 20px;
  padding-bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-top: 30px !important;
  &__title {
    @include h2;
    width: 100%;
    text-align: center;
    margin-bottom: 0;
  }
  &__list {
    margin-bottom: 18px;
  }
  &__contacts {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  &__social {
    width: 84px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  &__info {
    &-title {
      @include h3;
      margin-top: 5px;
    }
  }
  &__phone {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0;
  }
  &__metrics {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
  }
  &__business {
    width: 100%;
    text-align: center;
    color: $accent;
    margin-bottom: 10px;
  }
  &__payments {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;
    img {
      max-height: 30px;
      margin-bottom: 10px;
    }
  }
}
</style>
