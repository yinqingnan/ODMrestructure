/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-02-08 14:59:12
 * @LastEditTime: 2021-03-18 17:55:31
 * @FilePath: \src\store\modules\Test.ts
 * @LastEditors: yqn
 */
// 引入types
interface State {
  StandaloneMode?: boolean
}
const state: State = {
  StandaloneMode: JSON.parse(localStorage.getItem("user"))?.openCloud || false
};
const getters = {};
const mutations = {
  switchstandalonmode(state,val){
    // state.StandaloneMode = !val
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