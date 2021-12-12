import { createRouter, createWebHistory } from "vue-router";
import { getUserState } from "../firebase";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {requiresUnAuth: true},
  },
  {
    path: "/about",
    name: "About",
    meta: {requiresUnAuth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    meta: {requiresUnAuth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cart.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    meta: {requiresUnAuth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Favorite.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    meta: {requiresUnAuth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Menu.vue"),
  },
  {
    path: "/products",
    name: "Products",
    meta: {requiresUnAuth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    meta: {requiresUnAuth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth.vue"),
  },
  {
    path: "/admin-dashboard",
    name: "Admin-dashboard",
    meta: {requiresAuth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin-dashboard.vue"),
  },
];

// все наоборот requiresAuth - не требуется аутентификация, requiresUnAuth - требуется


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuth = await getUserState()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnAuth = to.matched.some(record => record.meta.requiresUnAuth)

  if (requiresAuth && !isAuth) next('/auth')
  else if (requiresUnAuth && isAuth) next('/')
  else next()
})

export default router;
