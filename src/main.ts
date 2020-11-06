import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Menu, Icon, Badge, Dropdown, Form, Checkbox, Input, Tabs, Select, Table, Modal, Col, Row, Radio, DatePicker, TreeSelect, Popconfirm} from "ant-design-vue";
import { Scrollbar} from 'element-ui'
import { HttpService } from './api/http';
import 'element-ui/lib/theme-chalk/display.css';
import confirm from "ant-design-vue/es/modal/confirm";
import { message } from "ant-design-vue";


Vue.use(Scrollbar);   //elementUI
Vue.use(Button).use(Layout).use(Menu).use(Icon).use(Badge).use(Dropdown).use(Form).use(Checkbox).use(Input).use(Tabs).use(Select).use(Table).use(Modal).use(Col).use(Row).use(Radio).use(DatePicker).use(TreeSelect).use(Popconfirm); //antdesign
Vue.config.productionTip = false;
Vue.prototype.$api = new HttpService();  // 挂载服务
Vue.prototype.$confirm = confirm;  // 挂载服务
Vue.prototype.$message = message;  // 挂载服务
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      //这里判断用户是否登录，验证本地存储是否有token
      if (!localStorage.token) { // 判断当前的token是否存在
          next({
              path: '/login',
          })
      } else {
          next()
      }
  } else {
      next() // 确保一定要调用 next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
