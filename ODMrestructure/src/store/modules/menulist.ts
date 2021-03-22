/*
 * @Author: your name
 * @Date: 2020-11-26 12:51:44
 * @LastEditTime: 2020-12-29 16:52:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\store\modules\menulist.ts
 */
// 引入types
import { ADDMENU } from "../types";
const state = {
  menulist: []
};
const getters = {};
const mutations = {
  [ADDMENU](state: any, val): void {
    state.menulist = val
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