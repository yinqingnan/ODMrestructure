<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN.js";
@Component
export default class App extends Vue {
  public locale!: any;
  created() {
    this.locale = zhCN;
  }
}
</script>
<style lang="less">
#app {
  width: 100%;
  height: 100%;
  font-family: "Microsoft YaHei";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #333;
}
* {
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
</style>
