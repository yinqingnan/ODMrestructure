import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button, Layout, Menu } from "ant-design-vue";
import { Scrollbar } from 'element-ui'
import { HttpService } from './api/http';
// import api from "./http/index"; //引入封装的axios
Vue.use(Scrollbar)
Vue.use(Button).use(Layout).use(Menu);
Vue.config.productionTip = false;
Vue.prototype.$api = new HttpService();  // 挂载服务
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
