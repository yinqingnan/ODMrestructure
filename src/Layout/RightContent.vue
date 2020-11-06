<template>
  <div>
    <!-- <button @click="add">添加</button> -->
    <div class="Multitab" ref="Multitab">
      <div class="tag">
        <a-tabs
          v-model="activeKeys"
          hide-add
          type="editable-card"
          @edit="onEdit"
          @change="tabChange"
        >
          <a-tab-pane
            v-for="item in tagList"
            :key="item.meta.key"
            :tab="item.meta.title"
          ></a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <router-view class="view" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Tabs = namespace("Tabs");
@Component({
  components: {}
})
export default class RightContent extends Vue {
  @Prop({
    type: Object
  })
  public myWH!: {};
  public obj = this.myWH;
  @Tabs.State(state => state.activeKey)
  activeKey!: string;
  @Tabs.State(state => state.tagList)
  tagList: any;
  @Tabs.Mutation("dlttbs")
  dlttbs!: (val: any) => {};
  private activeKeys = "";
  created(){
    console.log(this.obj);
  }
  private onEdit(e: string): void {
    const len: number = this.tagList.length;
    let flag = 0;
    if (len == 1) {
      this.$message.warning("保留最后一个标签");
      return;
    }
    this.tagList.forEach((e2, i) => {
      if (e2.key == e) {
        flag = i;
      }
    });
    const obj = {
      e,
      flag
    };
    this.dlttbs(obj);
    // this.tagList.splice(flag, 1);
  }
  private tabChange(e: string): void {
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
    console.log(this.tagList[flag].name == "home");
    if (this.tagList[flag].name == "home") {
      this.$router.push({ path: "/index/home" });
    } else {
      this.$router.push({ name: this.tagList[flag].name });
    }
  }
  $refs!: { quickEntry: HTMLFormElement };
  private mounted() {
    this.activeKeys = this.activeKey;
    this.$refs.Multitab.style.width = document.body.clientWidth - 250 + "px";
    
  }
  @Watch("activeKey")
  getPiedata(newval: string) {
    this.activeKeys = newval;
  }
  // @Watch("tagList")
  // getdata(newval: string) {
  //   this.tagList = newval;
  // }
}
</script>

<style lang="less" scope>
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.Multitab {
  height: 34px;
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
.tag {
  width: 100%;
}
.view {
  height: ~"calc(100vh - 115px)";
  margin-top: 7px;
}
</style>
