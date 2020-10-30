import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Button ,Layout ,Menu} from "ant-design-vue";
import { Scrollbar } from 'element-ui'
import Mock from 'mockjs'
Vue.use(Mock).use(Scrollbar)
Vue.use(Button).use(Layout).use(Menu);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
