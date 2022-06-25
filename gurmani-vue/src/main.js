import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import phoneDerictive from "@/directives/Vphone";
import VueYandexMetrika from "vue-yandex-metrika";
VueYandexMetrika;

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.directive("phone", phoneDerictive);

import "@/assets/styles/style.scss";
import "@/assets/styles/_media.scss";

app
  .use(store)
  // .use(VueYandexMetrika, {
  //   id: 79488682,
  //   router: router,
  //   env: "production",
  //   scriptSrc: "https://mc.yandex.ru/metrika/tag.js",
  // })
  .use(router)
  .mount("#app");
