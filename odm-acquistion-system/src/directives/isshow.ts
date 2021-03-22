/*
 * @Author: your name
 * @Date: 2020-11-25 18:54:01
 * @LastEditTime: 2020-11-25 19:04:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \xdf-fabudget-ui\src\directives\Buttonpermissions.ts
 */

import Vue from "vue";
export const isshow = Vue.directive('isshow',{
  inserted: function(el, binding, vnode) {
    console.log(el,binding,vnode)
    let btn = "";
    //获取单个按钮权限
    let btnAdmin = binding.value;
    if (btnAdmin) {
      btn = btnAdmin;
    } else {
      //无权限直接返回
      return;
    }

    if (JSON.stringify(vnode.context.$route.meta) == "{}") {
      return;
    }
    //从传入的实例中获取按钮权限
    let list = vnode.context.$route.meta.permission;

    if (list.indexOf(btn) == -1) {
      el.style.display = "none"; //隐藏元素
    }
  }
})
 