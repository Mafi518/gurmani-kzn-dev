import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import phoneDerictive from "@/directives/Vphone";
import VueYandexMetrika from "vue-yandex-metrika";

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.directive("phone", phoneDerictive);

app.use(VueYandexMetrika, {
  id: 75206455,
  router: router,
  env: "production",
  scriptSrc: "https://mc.yandex.ru/metrika/tag.js",
});

import "@/assets/styles/style.scss";
import "@/assets/styles/_media.scss";

app.use(store).use(router).mount("#app");
