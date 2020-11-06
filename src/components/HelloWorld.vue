<template>
  <div class="hello">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <el-row :gutter="80">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple">1111</div></el-col
      >
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light">2222222222</div></el-col
      >
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple">3333333</div></el-col
      >
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple-light">444444444</div></el-col
      >
    </el-row> -->
    <a-button @click="btn">调试store模块化</a-button>
    <h2>变化的值： {{ num }}</h2>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
// import { State, Getter, Action, Mutation, namespace } from "vuex-class";
const test = namespace("Test"); //导出对应的Test模块 ，改模块的namespaced必须为true

@Component
export default class HelloWorld extends Vue {
  // @Prop() private msg!: string;
  @test.State(state => state.num) num!: number;
  @test.Mutation("add") //使用types内定义的变量进行解构
  numadd!: (num: number) => void;
  private btn = (): void => {
    // console.log(typeof id);
    this.numadd(20);
  };
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.Multitab {
  height: 34px;
  width: 100%;
  background: #f6f5f8;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
