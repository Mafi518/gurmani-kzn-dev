import { createRouter, createWebHistory } from "vue-router";
import { getUserState } from "../firebase";
import store from "../store/index";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresUnAuth: false },
  },
  {
    path: "/about",
    name: "About",
    meta: { requiresUnAuth: false },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/conditions",
    name: "Conditions",
    meta: { requiresUnAuth: false },
    component: () =>
      import(/* webpackChunkName: "conditions" */ "../views/Conditions.vue"),
  },
  {
    path: "/privacy",
    name: "Privacy",
    meta: { requiresUnAuth: false },
    component: () =>
      import(/* webpackChunkName: "conditions" */ "../views/Privacy.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { requiresUnAuth: false },
    component: () => import(/* webpackChunkName: "cart" */ "../views/Cart.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    meta: { requiresUnAuth: false },
    component: () =>
      import(/* webpackChunkName: "favorite" */ "../views/Favorite.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    meta: { requiresUnAuth: false },
    component: () => import(/* webpackChunkName: "menu" */ "../views/Menu.vue"),
  },
  {
    path: "/products",
    name: "Products",
    meta: { requiresUnAuth: false },
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/Products.vue"),
  },
  {
    path: "/thx",
    name: "Thx",
    meta: { requiresUnAuth: false },
    component: () => import(/* webpackChunkName: "thx" */ "../views/Thx.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: { requiresUnAuth: false },
    component: () => import(/* webpackChunkName: "auth" */ "../views/Auth.vue"),
  },
  {
    path: "/admin-dashboard",
    name: "Admin-dashboard",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "admin-dashboard" */ "../views/Admin-dashboard.vue"
      ),
  },
  {
    path: "/admin-products",
    name: "ProductsViews",
    meta: { requiresAuth: true },
    component: () =>
      import(
        /* webpackChunkName: "admin-dashboard" */ "../views/AdminViews/ProductsViews.vue"
      ),
  },
];

// все наоборот requiresAuth - не требуется аутентификация, requiresUnAuth - требуется

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuth = await getUserState();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const requiresUnAuth = to.matched.some(
    (record) => record.meta.requiresUnAuth
  );
  console.log(store.state.is_auth);
  await store.dispatch("IS_AUTH", isAuth);
  console.log(store.state.is_auth);

  if (requiresAuth && !isAuth) next("/auth");
  else if (!requiresUnAuth) next();
  else next();
});

export default router;
