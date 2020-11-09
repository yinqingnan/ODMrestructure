// 引入types
import { ADDTBS, MENUADD, DLTTBS, INITTABS } from "../types";
import router from "../../router/index";
const state = {
  activeKey: "1",
  tagList: [],
  list: [],
  result: false,
  tabsstate: false
};
const getters = {};
const mutations = {

  [ADDTBS](state: any, val: any): void {
    // console.log(val)
    // console.log(state.tagList)
    state.tagList.push(val)
    // localStorage.setItem("Tabslist", JSON.stringify(val));
  },
  [MENUADD](state: any, val: any): void {
    console.log(val)
    if (state.tagList.length != 0) {
      state.result = state.tagList.some(function (item: any) {
        if (item.key == val.key) {
          return true;
        }
      })
      if (!state.result) {
        //如果不存在就添加
        state.activeKey = val.key
        console.log(val.key)
        localStorage.setItem("activeKey", JSON.stringify(val.key))   //保存当前
        localStorage.setItem("Tabslist", JSON.stringify(state.tagList))  //保存选中项
        state.tagList.push(val)
        localStorage.setItem("activeKey", JSON.stringify(val.key))   //保存当前选中项
        // 当前所选择的tabs
      } else {
        //如果存在就进行跳转
        state.activeKey = val.key
        if (val.name == "home") {
          router.push({ path: `${val.path}` })
        } else {
          router.push({ name: val.name })
        }
      }
    }
  },
  [DLTTBS](state: any, val: any): void {
    console.log(val.e)
   
    if (val.flag == 0) {
      state.activeKey = state.tagList[val.flag + 1].key
      router.push({ path: "/index/" + state.tagList[val.flag + 1].name })
      // localStorage.setItem("activeKey", JSON.stringify(state.tagList[val.flag + 1].key))   //保存当前
    } else {
      state.activeKey = 
      router.push({ path: "/index/" + state.tagList[val.flag - 1].name })
      // localStorage.setItem("activeKey", JSON.stringify(state.tagList[val.flag - 1].key))   //保存当前
    }
    state.tagList = state.tagList.filter((item: any) => {
      return item.key != val.e
    })
    localStorage.setItem("Tabslist", JSON.stringify(state.tagList))  //保存
  },
  [INITTABS](state: any, val1: any, val2: string) {
    console.log(val1, val2)
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