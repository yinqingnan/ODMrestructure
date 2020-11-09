import { Login } from "@/api/module/login";
import Vue from "vue";
import VueRouter, { RawLocation, RouteConfig } from "vue-router";
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
    name: "Homes",
    redirect: "/index/home",
    meta: { requiresAuth: true },
    component: () =>
      import("@/views/Home.vue"),
    children: [
      {
        path: "/index",
        name: "Index",
        component: () =>
          import("@/views/BodyContent.vue"),
        children: [
          {
            path: "home",
            name: "home",
            component: () => import('@/views/Index/Home.vue')
          },
          {
            path: "lawcase",
            name: "lawcase",
            component: () => import('@/views/StatisticalAnalysis/Lawcase.vue')
          },
          {
            path: "label",
            name: "label",
            component: () => import('@/views/StatisticalAnalysis/Label.vue')
          },
          {
            path: "assets",
            name: "assets",
            component: () => import('@/views/StatisticalAnalysis/Assets.vue')
          },
          {
            path: "avData",
            name: "avData",
            component: () => import('@/views/DataM/AvData.vue')
          },
          // {
          //   path: "lllegalData",
          //   name: "lllegalData",
          //   component: () => import('@/views/DataM/LllegalData.vue')
          // },
          {
            path: "lawarchives",
            name: "config",
            component: () => import('@/views/DataM/Lawarchives.vue')
          },
          {
            path: "recording",
            name: "recording",
            component: () => import('@/views/DataM/Recording.vue')
          },
          {
            path: "Simpleprogram",
            name: "Simpleprogram",
            component: () => import('@/views/DataM/Simpleprogram.vue')
          },
          {
            path: "Coercivemeasures",
            name: "Coercivemeasures",
            component: () => import('@/views/DataM/Coercivemeasures.vue')
          },
          {
            path: "evalRecord",
            name: "evalRecord",
            component: () => import('@/views/Supervision/EvalRecord.vue')
          },
          {
            path: "evalDaily",
            name: "evalDaily",
            component: () => import('@/views/Supervision/EvalDaily.vue')
          },
          {
            path: "evalRandom",
            name: "evalRandom",
            component: () => import('@/views/Supervision/EvalRandom.vue')
          },
          {
            path: "evalSet",
            name: "evalSet",
            component: () => import('@/views/Supervision/EvalSet.vue')
          },

          {
            path: "matche",
            name: "matche",
            component: () => import('@/views/Device/Matche.vue')
          },
          {
            path: "stations",
            name: "stations",
            component: () => import('@/views/Device/Stations.vue')
          },
          {
            path: "storage",
            name: "storage",
            component: () => import('@/views/Device/Storage.vue')
          },
          {
            path: "platform",
            name: "platform",
            component: () => import('@/views/Device/Platform.vue')
          },

          {
            path: "oMonitor",
            name: "oMonitor",
            component: () => import('@/views/DevOps/OMonitor.vue')
          },
          {
            path: "accessAuth",
            name: "accessAuth",
            component: () => import('@/views/DevOps/AccessAuth.vue')
          },
          {
            path: "upgrade",
            name: "upgrade",
            component: () => import('@/views/DevOps/Upgrade.vue')
          },
          {
            path: "operationLog",
            name: "operationLog",
            component: () => import('@/views/DevOps/OperationLog.vue')
          },

          {
            path: "dept",
            name: "dept",
            component: () => import('@/views/Organization/Dept.vue')
          },
          {
            path: "user",
            name: "user",
            component: () => import('@/views/Organization/User.vue')
          },
          {
            path: "role",
            name: "role",
            component: () => import('@/views/Organization/Role.vue')
          },
          {
            path: "right",
            name: "right",
            component: () => import('@/views/Organization/Right.vue')
          },
          {
            path: "Announcement",
            name: "Announcement",
            component: () => import('@/views/systemM/Announcement.vue')
          },
          {
            path: "Authorization",
            name: "Authorization",
            component: () => import('@/views/systemM/Authorization.vue')
          },
          {
            path: "Dictionary",
            name: "Dictionary",
            component: () => import('@/views/systemM/Dictionary.vue')
          },
          {
            path: "HighConfig",
            name: "HighConfig",
            component: () => import('@/views/systemM/HighConfig.vue')
          },
          {
            path: "Setting",
            name: "Setting",
            component: () => import('@/views/systemM/Setting.vue')
          }
        ]
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
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: RawLocation) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
