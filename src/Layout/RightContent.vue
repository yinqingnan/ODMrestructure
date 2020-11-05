<template>
  <div>
    <div class="Multitab"></div>
    <!-- <h2>右侧</h2>
    <a-button @click="btn(12)">asdasd</a-button> -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class RightContent extends Vue {
  numadd!: (num: number) => void;
  private name = "张三";
  private age = "20";
  private mounted() {
    // console.log(this.name + this.age);
  }
  private btn(id: string): void {
    // console.log(typeof id);
  }
}
</script>

<style lang="less" scope>
.Multitab {
  height: 45px;
  background: #f5f5f5;
}
</style>
