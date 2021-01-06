<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-01-05 17:10:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\views\BodyContent.vue
-->
<template>
  <div style="height: 100%">
    <div class="layout">
      <LeftMenu />
      <RightContent class="right" :myWH="myWH" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { namespace } from "vuex-class"
import LeftMenu from "@/Layout/LeftMenu.vue"
import RightContent from "@/Layout/RightContent.vue"
const Tabs = namespace("Tabs")
@Component({
  components: {
    LeftMenu,
    RightContent,
  },
})
export default class BodyContent extends Vue {
  @Tabs.Mutation("addtbs")
  addtbs!: (val: any) => {}
  @Tabs.Mutation("inittabs")
  inittabs!: () => {};
  [x: string]: any
  public Login = new this.$api.configInterface.Login()
  private num = 10
  public myWH = {
    width: 1,
    height: 1,
  }
  private mounted() {
    if (JSON.parse(localStorage.getItem("Tabslist")) != null) {
      this.inittabs()
    } else {
      let obj = {
        key: "1",
        path: "/home",
        name: "home",
        redirect: null,
        component: "Index/Home.vue",
        hidden: false,
        meta: {
          key: "1",
          title: "系统首页",
          icon: "",
          keepAlive: false,
          permission: null,
        },
        children: null,
      }
      localStorage.setItem('Tabslist',JSON.stringify(obj))
      this.addtbs(obj) //判断为空，即为第一次进入，每次都添加数据的第一条的tabs
     
     
    }
  }
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
