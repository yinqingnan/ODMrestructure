<template>
  <div style="height:100%" id="myRight">
    <!-- <button @click="add">添加</button> -->
    <div class="Multitab" :style="{width:Width}">
      <div class="tag">
        <a-tabs
          v-model="activeKeys"
          hide-add
          type="editable-card"
          @edit="onEdit"
          @change="tabChange"
        >
          <a-tab-pane v-for="item in tagList" :key="item.meta.key" :tab="item.meta.title" />
        </a-tabs>
      </div>
    </div>
    <router-view class="view" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { namespace } from "vuex-class"
const Tabs = namespace("Tabs")
@Component({
  components: {},
})
export default class RightContent extends Vue {
  @Tabs.State((state) => state.activeKey)
  activeKey!: string
  @Tabs.State((state) => state.tagList)
  tagList: any
  @Tabs.Mutation("dlttbs")
  dlttbs!: (val: any) => {}
  private activeKeys = ""
  private Width = ""
  created() {
    // console.log(localStorage);
  }
  private onEdit(e: string): void {
    console.log(e)
    const len: number = this.tagList.length
    let flag = 0
    if (len == 1) {
      this.$message.warning("保留最后一个标签")
      return
    }
    this.tagList.forEach((e2, i) => {
      if (e2.key == e) {
        flag = i
      }
    })
    const obj = {
      e,
      flag,
    }
    this.dlttbs(obj)
    // this.tagList.splice(flag, 1);
  }
  private tabChange(e: string): void {
    localStorage.setItem("activeKey", JSON.stringify(e)) //保存当前
    const len: number = this.tagList.length
    let flag = 0
    if (len == 1) {
      return
    }
    this.tagList.forEach((e2, i) => {
      if (e2.key == e) {
        flag = i
      }
    })
    if (this.tagList[flag].name == "home") {
      this.$router.push({ path: "/index/home" })
    } else {
      this.$router.push({ name: this.tagList[flag].name })
    }
  }

  private mounted() {
    this.activeKeys = this.activeKey
    this.Width = document.body.clientWidth - 250 + "px"
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Width = `${document.documentElement.clientWidth - 250}px`
    })
  }
  @Watch("activeKey")
  getPiedata(newval: string) {
    this.activeKeys = newval
  }
}
</script>
<style lang="less" scope>
#myRight {
  width: calc(100% - 250px);
}
.el-row {
  margin-left: 0px !important;
  margin-right: 0px !important;
}
.Multitab {
  height: 34px;
  background: #f6f5f8;
  margin-bottom: 7px;
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
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x {
  margin-top: -13px;
  border-radius: 50%;
  display: inline-block;
}
.ant-tabs.ant-tabs-card
  .ant-tabs-card-bar
  .ant-tabs-tab
  .ant-tabs-close-x:hover {
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
}
.Multitab{
  .ant-tabs-nav-container{
    // border-bottom: 1px solid #e0e0e0;
  }
  .ant-tabs{
    border-bottom: 2px solid #dedede;
    height: 40px;
  }
  .ant-tabs-nav-wrap{
    overflow: hidden;
    background:#f5f5f5;
  }
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x{
  line-height: 19px;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab .ant-tabs-close-x{
  height: 16px;
}
.ant-tabs-nav-scroll{
  // border-bottom: 1px solid #ddd;
}
</style>
