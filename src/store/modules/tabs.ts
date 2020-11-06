// 引入types
import { ADDTBS, MENUADD ,DLTTBS} from "../types";
import router from "../../router/index";
const state = {
  activeKey: "1",
  tagList: [],
  list:[],
  result: false,
  tabsstate:false
};
const getters = {};
const mutations = {
  [ADDTBS](state: any, val: any): void {
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
        state.activeKey = val.key
        state.tagList.push(val)
      }else{
        state.activeKey = val.key
        if(val.name == "home"){
          router.push({path:`${val.path}`})
        }else{
          router.push({name:val.name})
        }
      }
    }
  },
  [DLTTBS](state:any,val:any):void{
    if(val.flag == 0){
      state.activeKey = state.tagList[val.flag+1].key
      router.push({path:"/index/"+state.tagList[val.flag+1].name})
    }else{
      state.activeKey = state.tagList[val.flag-1].key
      router.push({path:"/index/"+state.tagList[val.flag-1].name})
    }
    state.tagList = state.tagList.filter((item:any)=>{
      return item.key != val.e
    })
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