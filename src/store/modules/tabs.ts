/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-02-02 10:40:40
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\store\modules\tabs.ts
 */
// 引入types
import {
  ADDTBS,
  MENUADD,
  DLTTBS,
  INITTABS,
  CLEARTABLIST,
  SETACTIVE,
} from "../types";
import router from "../../router/index";
const state = {
  activeKey: "1",
  tagList: [],
  list: [],
  result: false,
  tabsstate: false,
};
const getters = {};
const mutations = {
  [ADDTBS](state: any, val: any): void {
    // console.log(state.tagList)
    state.tagList.push(val);
    state.activeKey = val.key;
    // localStorage.setItem("Tabslist", JSON.stringify(val));
    // localStorage.setItem("activeKey", JSON.stringify(val.key));
  },
  [MENUADD](state: any, val: any): void {
    if (state.tagList.length != 0) {
      state.result = state.tagList.some(function (item: any) {
        if (item.key == val.key) {
          return true;
        }
      });
      if (!state.result) {
        //如果不存在就添加
        state.activeKey = val.key;
        state.tagList.push(val);
        localStorage.setItem("activeKey", val.key); //保存当前
        localStorage.setItem("Tabslist", JSON.stringify(state.tagList)); //保存选中项
        // localStorage.setItem("activeKey", val.key)   //保存当前选中项
      } else {
        //如果存在就进行跳转
        state.activeKey = val.key;
        if (val.name == "home") {
          router.push({ path: `${val.path}` });
        } else {
          router.push({ name: val.name });
        }
      }
    }
  },

  [DLTTBS](state: any, val: any): void {
    console.log(val);
    if (val.flag == 0) {
      console.log(state.tagList[val.flag + 1].key);
      state.activeKey = state.tagList[val.flag + 1].key; //向后加一
      router.push({ path: "/index/" + state.tagList[val.flag + 1].name });
      localStorage.setItem(
        "activeKey",
        JSON.stringify(state.tagList[val.flag + 1].key)
      ); //保存当前高亮的key
    } else {
      state.activeKey = state.tagList[val.flag - 1].key;
      router.push({ path: "/index/" + state.tagList[val.flag - 1].name });
      localStorage.setItem(
        "activeKey",
        JSON.stringify(state.tagList[val.flag - 1].key)
      ); //保存当前
    }
    state.tagList = state.tagList.filter((item: any) => {
      return item.key != val.e;
    });
    localStorage.setItem("Tabslist", JSON.stringify(state.tagList)); //保存
  },
  [INITTABS](state: any): void {
    // console.log(JSON.parse(localStorage.getItem("Tabslist")));
    state.tagList = JSON.parse(localStorage.getItem("Tabslist"));
    // console.log(state.tagList);
  },
  [CLEARTABLIST](state: any, val): void {
    state.tagList = val;
  },
  [SETACTIVE](state: any, val: string) {
    state.activeKey = val;
    localStorage.setItem("activeKey", val);
  },
};
const actions = {};
export default {
  namespaced: true, //命名空间
  state,
  getters,
  mutations,
  actions,
};
