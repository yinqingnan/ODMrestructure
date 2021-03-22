/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-02-25 16:30:19
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
  activeKey: "",
  tagList: [],
  list: [],
  result: false,
  tabsstate: false,
};
const getters = {};
const mutations = {
  [ADDTBS](state: any, val: any): void {
    state.tagList.push(val);
    state.activeKey = val.id;
    localStorage.setItem("Tabslist", JSON.stringify([val]));
  },
  [MENUADD](state: any, val: any): void {
    if (state.tagList.length != 0) {
      state.result = state.tagList.some(function (item: any) {
        if (item.id == val.id) {
          return true;
        }
      });
      if (!state.result) {
        // console.log(val.id);
        //如果不存在就添加
        state.activeKey = val.id;
        state.tagList.push(val);
        localStorage.setItem("activeKey", val.id); //保存当前
        localStorage.setItem("Tabslist", JSON.stringify(state.tagList)); //保存选中项
      } else {
        //如果存在就进行跳转
        state.activeKey = val.id;
        if (val.pathAlias === "home") {
          router.push({ path: `${val.path}` });
        } else {
          // router.push({ name: val.pathAlias });
        }
      }
    }
  },

  [DLTTBS](state: any, val: any): void {
    console.log(val);
    if (val.flag == 0) {
      console.log(state.tagList[val.flag + 1].id);
      state.activeKey = state.tagList[val.flag + 1].id; //向后加一
      router.push({ path: "/index/" + state.tagList[val.flag + 1].pathAlias });
      localStorage.setItem(
        "activeKey",
        JSON.stringify(state.tagList[val.flag + 1].id)
      ); //保存当前高亮的key
    } else {
      state.activeKey = state.tagList[val.flag - 1].id;
      router.push({ path: "/index/" + state.tagList[val.flag - 1].pathAlias });
      localStorage.setItem(
        "activeKey",
        JSON.stringify(state.tagList[val.flag - 1].id)
      ); //保存当前
    }
    state.tagList = state.tagList.filter((item: any) => {
      return item.id != val.e;
    });
    localStorage.setItem("Tabslist", JSON.stringify(state.tagList)); //保存
  },
  [INITTABS](state: any): void {
    state.tagList = JSON.parse(localStorage.getItem("Tabslist"));
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
