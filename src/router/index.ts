import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [

  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    redirect: "/index",
    component: () =>
      import("@/views/Home.vue"),
    children: [{
      path: '/index',
      name: 'Index',
      component: () =>
        import("@/views/BodyContent.vue")
    }]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
