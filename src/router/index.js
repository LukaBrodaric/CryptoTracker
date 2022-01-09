import { createRouter, createWebHistory } from "vue-router";
import Landingpage from "../views/Landingpage.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Landingpage",
    component: Landingpage,
  },
  {
    path: "/Home",
    name: "Home",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  meta:{
    needsUser: true,
    },
  },
  {
    path: "/portfolio",
    name: "Portoflio",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Portfolio.vue"),
      meta:{
        needsUser: true,
        },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
      meta:{
        needsUser: false,
        },
  },
  {
    path: "/news",
    name: "News",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/News.vue"),
  },
  {
    path: "/Settings",
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Settings.vue"),
      meta:{
        needsUser: true,
        },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

setTimeout(() => {router.beforeEach((to, from, next)  => {
  console.log('Stara ruta', from.name, ' -> ', to.name, 'korisnik', store.currentUser);
  const noUser = store.currentUser === null;
  
  if (noUser && to.meta.needsUser ) { // ako korisnik nije logiran, a stranica zahtjeva login
    console.log("Ne dopustam");
    next('Signup');
  } else { next();
    }
    if (!noUser && !to.meta.needsUser) { // ako je korisnik logiran, a stranica ne zahtjeva login
      console.log(store.currentUser);
      next('Home');
    } else console.log('error');
  }
  )}, 2000)


export default router;
