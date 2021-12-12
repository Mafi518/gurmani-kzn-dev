import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import components from "@/components/UI";
import phoneDerictive from "@/directives/Vphone";
import { initializeApp } from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

const app = createApp(App);

components.forEach((component) => {
  app.component(component.name, component);
});

app.directive("phone", phoneDerictive);

const firebase = initializeApp({
  apiKey: "AIzaSyCAliR0gaLHNEE7ZjW9htJbi5P7yBmwZMQ",
  authDomain: "gurmani-backend.firebaseapp.com",
  databaseURL: "https://gurmani-backend-default-rtdb.firebaseio.com",
  projectId: "gurmani-backend",
  storageBucket: "gurmani-backend.appspot.com",
  messagingSenderId: "873360368398",
  appId: "1:873360368398:web:bc8f4c16193e560d11ad5f"
});
firebase

// firebase.auth().onAuthStateChanged(() => {

// })

import "@/assets/styles/style.scss";
import "@/assets/styles/_media.scss";


app.use(store).use(router).mount("#app");
