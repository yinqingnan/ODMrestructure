<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-04-12 17:19:51
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\views\Home.vue
-->
<template>
  <div class="home">
    <Header />
    <div class="sHome">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "../Layout/Header";
// import { isOperateFun } from '@/utils/isOperate'

export default {
  name: "Home",
  components: {
    Header
  },
  mounted() {
    // isOperateFun()
  },
};
</script>
<style lang="less">
.home {
  width: 100%;
  height: 100%;
}
.sHome {
  height: calc(100% - 74px);
}
</style>
