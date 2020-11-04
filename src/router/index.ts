import { Login } from "@/api/module/login";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
Vue.use(VueRouter);
const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import("@/views/Login.vue")
  },

  {
    path: "/home",
    name: "Home",
    redirect: "/index",
    meta: { requiresAuth: true },
    component: () =>
      import("@/views/Home.vue"),
    children: [
      {
        path: "/index",
        name: "Index",
        component: () =>
          import("@/views/BodyContent.vue")
      },
    ]
  },
  {
    path: "/test",
    name: "TEST",
    component: () => import("@/components/HelloWorld.vue")
  },
  {
    path: "/pAuthorize",
    name: "pAuthorize",
    component: () => import("@/views/PAuthorize.vue")
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
