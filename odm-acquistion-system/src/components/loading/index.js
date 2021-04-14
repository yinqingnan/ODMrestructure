/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-04-14 09:36:33
 * @LastEditTime: 2021-04-14 14:27:22
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
  show(text, style, Background,imageSrc) {   //自定义文字，文字样式{字体大小、颜色}， 背景色
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
      Vue.$loading = loading;
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading;
      },
    });
  },
};

// 使用方法 显示于隐藏
//todo     (this.$loading as any).show("正在上传中，请稍后",{},{background:'#fbfbfb'})   //自定义文字，文字样式{字体大小、颜色}， 背景色
// (this.$loading as any).hide()
