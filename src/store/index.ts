import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { Test ,Tabs} from "./modules/index";

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Test,
    Tabs
  }
});
