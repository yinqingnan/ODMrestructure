<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2020-11-26 14:13:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\views\Home.vue
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
export default {
  name: "Home",
  components: {
    Header
  }
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
