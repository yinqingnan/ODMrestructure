// 引入types
import { ADDNUM } from "../types";
interface State {
  num: number;
}
const state: State = {
  num: 1
};
const getters = {};
const mutations = {
  [ADDNUM](state: any, num: number): void {
    state.num += num
  }
};
const actions = {};
export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations,
  actions
};