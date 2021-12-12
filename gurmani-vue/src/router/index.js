import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { getAuth } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Cart.vue"),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Favorite.vue"),
  },
  {
    path: "/menu",
    name: "Menu",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Menu.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Products.vue"),
  },
  {
    path: "/auth",
    name: "Auth",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auth.vue"),
  },
  {
    path: "/admin-dashboard",
    name: "Admin-dashboard",
    meta: {auth: true},
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Admin-dashboard.vue"),
  },
];



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth && !user) {
    console.log('Войдите в систему');
    next('/auth')
  } else {
    next()
  }
  to, from
})

export default router;
