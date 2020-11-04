import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Menu ,Icon ,Badge,Dropdown,Form,Checkbox,Input, Tabs, Select} from "ant-design-vue";
import { Scrollbar,Row,Col } from 'element-ui'
import { HttpService } from './api/http';
import 'element-ui/lib/theme-chalk/display.css';
Vue.use(Scrollbar).use(Row).use(Col)   //elementUI
Vue.use(Button).use(Layout).use(Menu).use(Icon).use(Badge).use(Dropdown).use(Form).use(Checkbox).use(Input).use(Tabs).use(Select); //antdesign
Vue.config.productionTip = false;
Vue.prototype.$api = new HttpService();  // 挂载服务

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//       //这里判断用户是否登录，验证本地存储是否有token
//       if (!localStorage.token) { // 判断当前的token是否存在
//           next({
//               path: '/login',
//           })
//       } else {
//           next()
//       }
//   } else {
//       next() // 确保一定要调用 next()
//   }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
