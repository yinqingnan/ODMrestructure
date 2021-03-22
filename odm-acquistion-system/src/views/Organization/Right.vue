<template>
  <div>
    <!-- 权限管理 -->
    <div id="EvalRecord" class="layoutcontainer rights">
      <div class="rightsleft">
        <div class="menuleft_header">
          <h2>权限项</h2>
        </div>
        <div>
          <div style="width:366px;">
            <div>
              <el-scrollbar
                class="boxscrollbar"
                :style="{height:Height+'px'}"
                style="background:#fff;border-right: 0.5px solid #ececec;"
              >
                <div class="test_wrapper" @dragover="dragover($event)">
                  <transition-group class="transition-wrapper" name="sort">
                    <div
                      v-for="(item,index) in dataList"
                      :key="item.id"
                      class="sort-item liststyle"
                      :draggable="true"
                      :class="{'active' : num == index}"
                      @click="listbtn(item,index)"
                      @dragstart="dragstart(item)"
                      @dragenter="dragenter(item,$event)"
                      @dragend="dragend(item,$event)"
                      @dragover="dragover($event)"
                    >
                      <div>
                        <h2 v-if="item.isEnabled">{{item.name}}</h2>
                        <a-input v-else v-model="item.name" placeholder="请输入权限名，并在右侧设置菜单和按钮权限" />
                      </div>
                      <div>
                        <template v-if="item.isEnabled">
                          <a-button
                            style="margin-right:8px"
                            @click="edit(item) "
                            v-isshow="'base:right:save'"
                          >编辑</a-button>
                          <a-button
                            @click="dlt(item)"
                            type="primary"
                            v-isshow="'base:right:delete'"
                          >删除</a-button>
                        </template>
                        <template v-else>
                          <a-button
                            @click="saveRowEvent(item)"
                            style="margin-right:8px"
                            type="primary"
                            v-isshow="'base:right:refMenu'"
                          >保存</a-button>
                          <a-button @click="cancelRowEvent(item)">取消</a-button>
                        </template>
                      </div>
                    </div>
                  </transition-group>
                </div>
              </el-scrollbar>
            </div>
            <div class="rightfooter">
              <a-button type="primary" @click="addbtn" v-isshow="'base:right:save'">添加</a-button>
            </div>
          </div>
        </div>
      </div>
      <div class="rightsright">
        <div
          class="Simpleprogrambody editbody"
          :style="{height:(parseInt(Height)+42)+'px'}"
          style="padding:0"
        >
          <div class="menuleft_header">
            <h2>菜单按钮</h2>
          </div>
          <div style="padding-left:30px;" :style="{height:(parseInt(Height))+'px'}">
            <el-scrollbar style="height:100%">
              <div style="height:40%;margin-bottom:10px">
                <h2>客户端软件</h2>
                <el-scrollbar style="height:calc(100% - 30px)">
                  <a-tree
                    v-model="pccheckedKeys"
                    checkable
                    multiple
                    :checkStrictly="true"
                    default-expand-all
                    :auto-expand-parent="autoExpandParent"
                    :tree-data="pctreeData"
                    :replaceFields="{
                  children: 'children',
                  key: 'id',
                  title: 'name'
                }"
                    @expand="onExpand"
                  />
                </el-scrollbar>
              </div>
              <div style="height:calc(60% - 10px)">
                <h2>网页</h2>
                <el-scrollbar style="height:calc(100% - 30px)">
                  <a-tree
                    v-model="webcheckedKeys"
                    checkable
                    multiple
                    :checkStrictly="true"
                    default-expand-all
                    :auto-expand-parent="autoExpandParent"
                    :tree-data="webtreeData"
                    :replaceFields="{
                  children: 'children',
                  key: 'id',
                  title: 'name'
                }"
                    @expand="onExpand"
                  />
                </el-scrollbar>
              </div>
            </el-scrollbar>
          </div>
        </div>
        <div class="rightfooter">
          <a-button type="primary" @click="treesave" v-isshow="'base:right:refMenu'">保存</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
@Component({
  components: {}
})
export default class Right extends Vue {
  // todo变量
  [x: string]: any
  public OrganizationM = new this.$api.configInterface.OrganizationM()
  public dataList = []
  public Height = ""
  private status = ""
  private isClick = true
  private pctreeData = []
  private webtreeData = []
  private id = ""
  public expandedKeys = [] //默认展开
  public autoExpandParent = false
  public pccheckedKeys = [] //默认选中的
  public webcheckedKeys = [] //默认选中的
  public pcselectKeys = []
  public webselectKeys = []
  public onExpand(expandedKeys) {
    this.expandedKeys = expandedKeys
    this.autoExpandParent = false
  }
  public onCheck(checkedKeys) {
    // console.log(checkedKeys)

    this.checkedKeys = checkedKeys
  }
  private oldData = [] // 开始排序时按住的旧数据
  private newData = [] // 拖拽过程的数据
  @Watch("pccheckedKeys")
  getpccheckedKeys(val) {
    this.pcselectKeys = val.checked === undefined ? [] : val.checked
  }
  @Watch("webcheckedKeys")
  getwebcheckedKeys(val) {
    this.webselectKeys = val.checked === undefined ? [] : val.checked
  }
  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}`
    this.form = this.$form.createForm(this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}`
    })
    this.getdata()
    // this.gettreedata()
  }
  // todo事件
  private addbtn() {
    if (this.isClick) {
      this.isClick = false
      this.status = "新增"
      let newobj = {
        id: "",
        isEnabled: 0,
        name: "",
        sort: 18
      }
      this.dataList.push(newobj)

      // console.log(this.dataList);
    } else {
      this.$message.info("单次只能添加一条数据")
    }
  }
  dragstart(value) {
    this.oldData = value
  }
  // 记录移动过程中信息
  dragenter(value, e) {
    this.newData = value
    e.preventDefault()
  }
  // 拖拽最终操作
  dragend(value, e) {
    if (this.oldData !== this.newData) {
      let oldIndex = this.dataList.indexOf(this.oldData)
      let newIndex = this.dataList.indexOf(this.newData)
      let newItems = [...this.dataList]
      // 删除老的节点

      newItems.splice(oldIndex, 1)
      // 在列表中目标位置增加新的节点
      newItems.splice(newIndex, 0, this.oldData)
      this.dataList = [...newItems]
      let arr = []
      this.dataList.map((item) => {
        arr.push(item.id)
      })
      console.log(arr)
      this.OrganizationM.adjustSort(arr).then((res) => {
        console.log(res)
      })
    }
  }
  // 拖动事件（主要是为了拖动时鼠标光标不变为禁止）
  dragover(e) {
    e.preventDefault()
  }
  private treesave() {
    if (this.pcselectKeys.length !== 0 || this.webselectKeys.length !== 0) {
      this.OrganizationM.rightsTreesave({
        menuIds: [...this.pcselectKeys, ...this.webselectKeys],
        rightId: this.id
      }).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.gettreedata({ rightId: this.id })
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.info("没有任何进行操作")
    }
  }
  private edit(row) {
    this.dataList.map((item) => {
      item.isEnabled = 1
    })
    row.isEnabled = 0
  }
  private dlt(row) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: `权限项删除后无法恢复，确定要删除权限项${row.name}吗？`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          _that.OrganizationM.rightsDlt(row.id).then((res) => {
            if (res.code == 0) {
              row.isEnabled = 1
              _that.$message.success(res.msg)
              _that.getdata()
            } else {
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log("Oops errors!"))
      }
    })
  }
  private saveRowEvent(row) {
    if (this.status == "新增") {
      let obj = {
        id: "",
        name: row.name,
        sort: ""
      }
      this.OrganizationM.rightsadd(obj).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.getdata()
          this.isClick = true
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.OrganizationM.rightssave({
        id: row.id,
        name: row.name
      }).then((res) => {
        if (res.code == 0) {
          row.isEnabled = 1
          this.$message.success(res.msg)
          this.getdata()
          this.status = ""
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
  private cancelRowEvent(row) {
    if (this.status == "新增") {
      this.dataList.pop()
      this.status = ""
      this.isClick = true
    } else {
      row.isEnabled = 1
    }
  }
  private num = null
  private listbtn(row, index) {
    if (row.isEnabled === 1) {
      this.expandedKeys = []
      this.num = index
      this.id = row.id
      this.gettreedata({ rightId: row.id })
    }
  }

  // todo 数据请求
  private getdata() {
    this.OrganizationM.rightslistdata().then((res) => {
      if (res.data != null) {
        res.data.map((item) => {
          item.isEnabled = 1
        })
        this.dataList = res.data
      }
    })
  }
  private gettreedata(obj) {
    this.OrganizationM.rightsTree(obj.rightId).then((res) => {
      this.expandedKeys = []
      this.pctreeData = res.data.pc
      this.webtreeData = res.data.web
      // 筛选需要选中的值
      if (res.data) {
        let pcarr = []
        let webarr = []
        res.data.pc.map((item) => {
          if (item.checked === true) {
            pcarr.push(item.id)
          }
          if (item.children) {
            item.children.map((el) => {
              if (el.checked === true) {
                pcarr.push(el.id)
              }
              if (el.children) {
                el.children.map((st) => {
                  if (st.checked === true) {
                    pcarr.push(st.id)
                  }
                })
              }
            })
          }
        })
        res.data.web.map((item) => {
          if (item.checked === true) {
            webarr.push(item.id)
          }
          if (item.children) {
            item.children.map((el) => {
              if (el.checked === true) {
                webarr.push(el.id)
              }
              if (el.children) {
                el.children.map((st) => {
                  if (st.checked === true) {
                    webarr.push(st.id)
                  }
                })
              }
            })
          }
        })
        this.pccheckedKeys = pcarr
        this.webcheckedKeys = webarr
      }
    })
  }
}
</script>

<style lang="less" scope>
.rightfooter {
  height: 52px;
  line-height: 40px;
  text-align: center;
  background: #fff;
  padding-top: 10px;
  border-top: 0.5px solid #ececec;
}
.rights {
  display: flex;
  justify-content: flex-start;
  // .rightsleft {
  // }
  .rightsright {
    // background: pink;
    width: 100%;
    .el-scrollbar__view {
      height: 100%;
    }
    h2 {
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      margin: 0;
    }
  }
}
.menuleft_header {
  background: #fff;
  padding-bottom: 10px;
  border-bottom: 0.5px solid #ececec;
  h2 {
    text-align: center;
    margin: 0;
  }
}
.liststyle {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  height: 48px;
  line-height: 48px;
  background: #fff;
  padding: 0 16px;
  border-bottom: 0.5px solid #ececec;
  h2 {
    font-size: 14px;
    text-indent: 12px;
    width: 190px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.rightsright {
  padding-left: 20px;
}
.editbody {
  border: 1px solid #ececec;
}
.active {
  background: #ececec;
}
.sort-move {
  transition: transform 0.3s;
}
</style>
