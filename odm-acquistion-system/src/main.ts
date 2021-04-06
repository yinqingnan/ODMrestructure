/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-04-06 11:17:53
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\main.ts
 */
// 使用命令行打开浏览器
// C:\Users\Administrator\AppData\Local\Google\Chrome\Application\chrome.exe
//语法兼容IE
import "@babel/polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import formCreate from "@form-create/ant-design-vue";

Vue.use(formCreate);
// todo 引入自定义指令
Vue.directive("isshow", {
  inserted: function (el, binding, vnode) {
    const { value } = binding;
    let roles = [];
    if (vnode.context.$route.meta.permission) {
      roles = vnode.context.$route.meta.permission;
    } else {
      roles = [];
    }
    let btn = "";
    //获取单个按钮权限
    if (value) {
      btn = value;
    } else {
      return; //无权限直接返回
    }
    if (JSON.stringify(vnode.context.$route.meta) == "{}") {
      return;
    }
    //查找到当前路由下存在的权限
    if (roles.indexOf(btn) == -1) {
      el.style.display = "none"; //隐藏元素
    }
  },
});
Vue.directive("right", {
  inserted: function (el, binding, vnode) {
    const { value } = binding;
    let roles = [];
    if (vnode.context.$route.meta.permission) {
      roles = vnode.context.$route.meta.permission;
    } else {
      roles = [];
    }
    let btn = "";
    //获取单个按钮权限
    if (value) {
      btn = value;
    } else {
      return; //无权限直接返回
    }
    if (JSON.stringify(vnode.context.$route.meta) == "{}") {
      return;
    }
    if (roles.indexOf(btn) == -1) {
      el.style.color = "#333";
      el.style.cursor = "not-allowed";
    }
  },
});

import "../public/localiconfont/iconfont.css"; // 引入图标

import VideoPlayer from "vue-video-player";
require("video.js/dist/video-js.css");
require("vue-video-player/src/custom-theme.css");
Vue.use(VideoPlayer);

// todo 引入视频播放插件
import VueXgplayer from "vue-xgplayer";
Vue.use(VueXgplayer);
import Echart from "echarts";
// todo 引入图片预览插件
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
Vue.use(Viewer);

Vue.prototype.$echarts = Echart;

import "xe-utils";
import VXETable from "vxe-table";
import XEAjax from "xe-ajax";
import "vxe-table/lib/style.css";
import { HttpService } from "@/api/http";
import "element-ui/lib/theme-chalk/display.css";
import confirm from "ant-design-vue/es/modal/confirm";
import { message } from "ant-design-vue";
import "./style/index.less";
import "./style/iecss.css";
XEAjax.setup({
  headers: {
    token: localStorage.getItem("token"),
  },
});
import NProgress from "nprogress"; // 引入进度条组件及css
import "nprogress/css/nprogress.css";
NProgress.inc(0.1);
NProgress.configure({
  easing: "ease",
  speed: 100,
  showSpinner: false,
});

Vue.use(NProgress);
import VXETablePluginExportXLSX from "vxe-table-plugin-export-xlsx";
VXETable.use(VXETablePluginExportXLSX);
Vue.use(VXETable);
Vue.config.productionTip = false;
Vue.prototype.$api = new HttpService(); // 挂载服务
Vue.prototype.$confirm = confirm; // 挂载确认弹窗服务
Vue.prototype.$message = message; // 挂载全局提示服务
import { resetRouter } from "@/router"; //重置路由信息
import { concatrouter } from "@/router/concatrouter"; //生成路由表方法

//路由拦截
router.beforeEach((to, from, next) => {
  NProgress.start();
  if (!localStorage.getItem("token")) {
    if (to.path !== "/login") {
      NProgress.done();
      return next("/login");
    }
  } else {
    if (to.path !== "/login") {
      if ((store.state as any).Menu.menulist.length == 0) {
        (store.state as any).Menu.menulist = concatrouter(); //添加到store中
        resetRouter(); //重置路由
        router.addRoutes(concatrouter()); //添加新的路由表
        next({
          ...to,
          replace: true,
        });
      } else {
        next();
      }
      NProgress.done();
    }
  }
  NProgress.done();
  if (to.path === "/login") {
    document.title = "登录";
  } else {
    document.title = to.name;
  }

  next();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
