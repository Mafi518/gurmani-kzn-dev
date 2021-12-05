import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import phoneDerictive from "@/directives/Vphone";

const app = createApp(App);



components.forEach((component) => {
  app.component(component.name, component);
});

app.directive("phone", phoneDerictive);

import "@/assets/styles/style.scss";
import "@/assets/styles/_media.scss";

// app.use(store).use(router).mount("#app");

app.use(store).use(router).mount("#app");
