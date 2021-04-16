/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-04-14 09:36:33
 * @LastEditTime: 2021-04-15 16:29:59
 * @FilePath: \src\components\loading\index.js
 * @LastEditors: yqn
 */
import LoadingComponent from "./loading.vue";
import Vue from "vue";

const LoadingConstructor = Vue.extend(LoadingComponent);

const instance = new LoadingConstructor({
  el: document.createElement("div"),
});
instance.show = false; // 默认隐藏
const loading = {
  show(text, style, Background) {
    //自定义文字，文字样式{字体大小、颜色}， 背景色
    // 显示方法
    instance.show = true;
    instance.text = text;
    instance.textStyle = style;
    instance.backgroundstyle = Background;
    document.body.appendChild(instance.$el);
  },
  hide() {
    // 隐藏方法
    instance.show = false;
  },
};

export default {
  install() {
    if (!Vue.$loading) {
      Vue.$Loading = loading;
    }
    Vue.mixin({
      created() {
        this.$Loading = Vue.$Loading;
      },
    });
  },
};
// 使用方法 显示于隐藏
//     (this.$Loading as any).show("正在上传中，请稍后",{},{background:'#fbfbfb'})   //todo( 自定义文字内容，文字样式{字体大小、颜色}， 背景色)
// (this.$Loading as any).hide()
