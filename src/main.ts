import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Menu, Icon, Badge, Dropdown, Form, Checkbox, Input, Tabs, Select, Table, Modal, Col, Row, Radio, DatePicker, TreeSelect, Popconfirm, ConfigProvider, Calendar, Switch, Pagination} from "ant-design-vue";
// import { Scrollbar } from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
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
// 异步table插件
Vue.prototype.$ajax = XEAjax
//elementUI组件
// Vue.use(Scrollbar);
// table表格组件
Vue.use(VXETable)
//antdesign组件
Vue.use(Button).use(Layout).use(Menu).use(Icon).use(Badge).use(Dropdown).use(Form).use(Checkbox).use(Input).use(Tabs).use(Select).use(Table).use(Modal).use(Col).use(Row).use(Radio).use(DatePicker).use(TreeSelect).use(Popconfirm).use(ConfigProvider).use(Calendar).use(Switch).use(Pagination);
Vue.config.productionTip = false;
Vue.prototype.$api = new HttpService();  // 挂载服务
Vue.prototype.$confirm = confirm;  // 挂载服务
Vue.prototype.$message = message;  // 挂载服务
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     //这里判断用户是否登录，验证本地存储是否有token
//     if (!localStorage.token) { // 判断当前的token是否存在
//       next({
//         path: '/login',
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // 确保一定要调用 next()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
