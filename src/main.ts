/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2020-11-26 13:51:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\main.ts
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// todo 按需引入antdesign组件
import { Button, Layout, Menu, Icon, Badge, Dropdown, Form, Checkbox, Input, Tabs, Select, Table, Modal, Col, Row, Radio, DatePicker, TreeSelect, Popconfirm, ConfigProvider, Calendar, Switch, Pagination, InputNumber ,Upload,Tree,Card,Empty,Divider } from "ant-design-vue";
// import { Scrollbar } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// todo 引入自定义指令
// import {isshow} from "@/directives/isshow"
 Vue.directive('isshow',{
  inserted: function(el, binding, vnode) {
    const {value} = binding
    const roles = vnode.context.$route
    let btn = "";
    //获取单个按钮权限
    if (value) {
      btn = value;
    } else {
      //无权限直接返回
      return;
    }
    if (JSON.stringify(vnode.context.$route.meta) == "{}") {
      return;
    }
    //查找到当前路由下存在的权限
    let list = vnode.context.$route.meta.permission;
    if (list.indexOf(btn) == -1) {
      el.style.display = "none"; //隐藏元素
    }
  }
})

 import '../public/localiconfont/iconfont.css'// 引入图标
// todo 引入视频播放插件
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

import 'xe-utils';
import VXETable from 'vxe-table';
import XEAjax from 'xe-ajax';
import 'vxe-table/lib/style.css';
import { HttpService } from './api/http';
import 'element-ui/lib/theme-chalk/display.css';
import confirm from "ant-design-vue/es/modal/confirm";
import { message } from "ant-design-vue";
import "./style/index.less"
XEAjax.setup({
  headers: {
    "token": localStorage.getItem("token")
  },
})
import NProgress from "nprogress"; // 引入进度条组件及css
import "nprogress/css/nprogress.css";
NProgress.inc(0.2);
NProgress.configure({
  easing: "ease",
  speed: 200,
  showSpinner: false
});
Vue.use(NProgress);
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
VXETable.use(VXETablePluginExportXLSX)
Vue.use(VXETable)
//antdesign组件
Vue.use(Button).use(Layout).use(Menu).use(Icon).use(Badge).use(Dropdown).use(Form).use(Checkbox).use(Input).use(Tabs).use(Select).use(Table).use(Modal).use(Col).use(Row).use(Radio).use(DatePicker).use(TreeSelect).use(Popconfirm).use(ConfigProvider).use(Calendar).use(Switch).use(Pagination).use(InputNumber).use(Upload).use(Tree).use(Card).use(Empty).use(Divider)
Vue.config.productionTip = false;
Vue.prototype.$api = new HttpService();  // 挂载服务
Vue.prototype.$confirm = confirm;  // 挂载服务
Vue.prototype.$message = message;  // 挂载服务
console.log(store)
import { resetRouter } from "@/router/index" //重置路由信息
import { concatrouter } from "@/router/concatrouter" //生成路由表方法
router.beforeEach((to, from, next) => {
  NProgress.start();
  // console.log(localStorage.getItem("lockpsd"));
  if (!localStorage.getItem("token")) {
    if (to.path !== "/login") {
      return next("/login");
    }
  } else if (localStorage.getItem("lockpsd")) {
    if (to.path !== "/lockscreen") {
      return next("/lockscreen");
    }
  } else {
    if (to.path !== "/login") {
      if ((store.state as any).Menu.menulist.length == 0) {
        (store.state as any).Menu.menulist = concatrouter(); //添加到store中
        resetRouter(); //重置路由
        router.addRoutes(concatrouter()); //添加新的路由表
        next({
          ...to,
          replace: true
        });
        NProgress.done();
      } else {
        next();
        NProgress.done();
      }
    }
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
