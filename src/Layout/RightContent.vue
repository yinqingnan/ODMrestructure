<template>
  <div>
    <h2>右侧</h2>
    <a-button @click="btn(12)">asdasd</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class RightContent extends Vue {
  private name = "张三";
  private age = "20";
  private mounted() {
    // console.log(this.name + this.age);
  }
  private btn(id: string): void {
    console.log(typeof id);
  }
}
</script>

<style lang="less" scope></style>
