<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2020-11-26 14:23:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\views\BodyContent.vue
-->
<template>
  <div style="height: 100%">
    <div class="layout">
      <LeftMenu  class="hidden-sm-and-down" />
      <RightContent class="right" :myWH="myWH" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import LeftMenu from "@/Layout/LeftMenu.vue";
import RightContent from "@/Layout/RightContent.vue";
// const Tabs = namespace("Tabs");
@Component({
  components: {
    LeftMenu,
    RightContent,
  },
})
export default class BodyContent extends Vue {
  [x: string]: any;
  public Login = new this.$api.configInterface.Login();
  private num = 10;
  public myWH = {
    width: 1,
    height: 1,
  };
}
</script>
<style lang="less" scope>
.layout {
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.right {
  width: 100%;
  background: #fbfafc;
}
</style>
