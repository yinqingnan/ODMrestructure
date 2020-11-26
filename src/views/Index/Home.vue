<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2020-11-26 12:06:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\views\Index\Home.vue
-->
<template>
  <div>
    <h2>Home系统首页</h2>
    <!-- {{}} -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Home extends Vue {
  public mounted(){
    console.log(this.$router)
  }
}
</script>

<style lang="less" scope></style>
