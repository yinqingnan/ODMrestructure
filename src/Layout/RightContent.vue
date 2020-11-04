<template>
  <div>
    <button @click="add">添加</button>
    <div class="Multitab">
      <div class="tag">
        <a-tabs
          v-model="activeKey"
          hide-add
          type="editable-card"
          @edit="onEdit"
          @change="tabChange"
        >
          <a-tab-pane
            v-for="item in tagList"
            :key="item.key"
            :tab="item.title"
          ></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <!-- <h2>右侧</h2>
    <a-button @click="btn(12)">asdasd</a-button> -->
    <!-- <el-row :gutter="80">
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"
        ><div class="grid-content bg-purple"></div
      ></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
    </el-row> -->
    <router-view />
  </div>
</template>

<script lang="ts">
// import { PropType } from "vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
// interface MyD {
//   key: string;
//   title: string;
//   path: string;
//   name: string;
// }
export default class RightContent extends Vue {
  private name = "张三";
  private age = "20";
  private activeKey = "1";
  public tagList = [
    {
      key: "1",
      title: "简易程序",
      path: "/index/jycx",
      name: "jycx"
    }
  ];

  private mounted() {
    // console.log(this.name + this.age);
  }
  private btn(id: string): void {
    console.log(typeof id);
  }
  private add(): void {
    const obj = {
      key: "2",
      title: "简易程序2",
      path: "/index/jycx2",
      name: "jycx2"
    };
    this.tagList.push(obj);
  }
  private onEdit(e: unknown): void {
    const len: number = this.tagList.length;
    let flag = 0;
    if (len == 1) {
      return;
    }
    this.tagList.forEach((e2, i) => {
      if (e2.key == e) {
        flag = i;
      }
    });
    this.tagList.splice(flag, 1);
  }
  private tabChange(e: unknown): void {
    console.log(e);
  }
}
</script>

<style lang="less" scope>
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
