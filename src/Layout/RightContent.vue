<template>
  <div>
    <div class="Multitab"></div>
    <h2>右侧</h2>
    <a-button @click="btn(12)">asdasd</a-button>
  </div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import { Component, Prop, Vue } from "vue-property-decorator";

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

<style lang="less" scope></style>
