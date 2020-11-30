<template>
  <div>
    <!-- 权限管理 -->
    <div id="EvalRecord" class="layoutcontainer rights">
      <div class="rightsleft">
        <div class="menuleft_header">
          <h2>权限项</h2>
        </div>
        <div>
          <div style="width:380px;">
            <div>
              <el-scrollbar
                class="boxscrollbar"
                :style="{height:Height+'px'}"
                style="background:#fff;border-right: 0.5px solid #ececec;"
              >
                <ul>
                  <li
                    v-for="(item,index) in tableData"
                    :key="index"
                    class="liststyle"
                    @click="listbtn(item)"
                  >
                    <div>
                      <h2 v-if="item.isEnabled">{{item.name}}</h2>
                      <a-input v-else v-model="item.name" placeholder="请输入权限名，并在右侧设置菜单和按钮权限" />
                    </div>
                    <div>
                      <template v-if="item.isEnabled">
                        <a-button style="margin-right:8px" @click="edit(item)" v-isshow="'right:update,right:refmenu'">编辑</a-button>
                        <a-button @click="dlt(item)" type="primary" v-isshow="'right:delete'">删除</a-button>
                      </template>
                      <template v-else>
                        <a-button
                          @click="saveRowEvent(item)"
                          style="margin-right:8px"
                          type="primary"
                        >保存</a-button>
                        <a-button @click="cancelRowEvent(item)">取消</a-button>
                      </template>
                    </div>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
            <div class="rightfooter">
              <a-button type="primary" @click="addbtn" v-isshow="'right:save'">添加</a-button>
            </div>
          </div>
        </div>
      </div>
      <div class="rightsright">
        <div class="Simpleprogrambody" :style="{height:(parseInt(Height)+31)+'px'}">
          <div class="menuleft_header">
            <h2>菜单按钮</h2>
          </div>
          <div>
            <a-tree
              v-model="checkedKeys"
              checkable
              multiple
              default-expand-all
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :tree-data="treeData"
              :replaceFields="{
                  children: 'children',
                  key: 'code',
                  title: 'name'
                }"
              @expand="onExpand"
            />
          </div>
        </div>
        <div class="rightfooter">
          <a-button type="primary" @click="treesave">保存</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
@Component({
  components: {},
})
export default class Right extends Vue {
  // todo变量
  [x: string]: any
  public OrganizationM = new this.$api.configInterface.OrganizationM()
  public tableData = []
  public Height = ""
  private status = ""
  private isClick = true
  private treeData = []
  private id = ""
  public expandedKeys = [] //默认展开
  public autoExpandParent = true
  public checkedKeys = [] //默认选中的
  public selectKeys = []
  public onExpand(expandedKeys) {
    // console.log("onExpand", expandedKeys)
    this.expandedKeys = expandedKeys
    this.autoExpandParent = false
  }
  public onCheck(checkedKeys) {
    // console.log("onCheck", checkedKeys)
    this.checkedKeys = checkedKeys
  }
  @Watch("checkedKeys")
  getcheckedKeys(val) {
    this.selectKeys = val
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
    this.gettreedata({ rightId: "" })
  }
  // todo事件
  private addbtn() {
    // document.getElementsByClassName('el-scrollbar__wrap')[1].scrollTop= document.getElementsByClassName('el-scrollbar__wrap')[1].scrollHeight
    if (this.isClick) {
      this.isClick = false
      this.status = "新增"
      let newobj = {
        isEnabled: 0,
      }
      this.tableData.push(newobj)
    } else {
      this.$message.info("单次只能添加一条数据")
    }
  }
  private treesave() {
    if (this.selectKeys.length != 0) {
      console.log()
      console.log()
      this.OrganizationM.rightsTreesave({
        menuIds: this.selectKeys,
        rightId: this.id,
      }).then(res=>{
        if(res.code == 0){
          this.$message.success(res.msg)
          this.gettreedata({ rightId: this.id })
        }else{
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.info("没有任何进行操作")
    }
  }
  private edit(row) {
    this.tableData.map((item) => {
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
          _that.OrganizationM.rightsDlt({ id: row.id }).then((res) => {
            if (res.code == 0) {
              row.isEnabled = 1
              _that.$message.success(res.msg)
              _that.getdata()
            } else {
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log("Oops errors!"))
      },
    })
  }
  private saveRowEvent(row) {
    if (this.status == "新增") {
      let obj = {
        id: "",
        name: row.name,
        remark: "",
        sort: "",
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
        name: row.name,
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
      this.tableData.pop()
      this.status = ""
      this.isClick = true
    } else {
      row.isEnabled = 1
    }
  }
  private listbtn(row) {
    this.id = row.id
    this.gettreedata({ rightId: row.id })
  }

  // todo 数据请求
  private getdata() {
    this.OrganizationM.rightslistdata().then((res) => {
      this.tableData = res.data
    })
  }
  private gettreedata(obj) {
    this.OrganizationM.rightsTree(obj).then((res) => {
      this.treeData = res.data
      // 筛选需要选中的值
      if (res.data) {
        let arr = []
        let obj = res.data.filter((item) => {
          return item.checkArr.checked == 1
        })
        obj.map((el) => {
          arr.push(el.code)
        })
        this.checkedKeys = arr
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
  }
}
.menuleft_header {
  background: #fff;
  h2 {
    text-align: center;
  }
}
.liststyle {
  display: flex;
  justify-content: space-between;
  height: 48px;
  line-height: 48px;
  background: #fff;
  padding: 0 16px;
  border-bottom: 0.5px solid #ececec;
  h2 {
    font-size: 14px;
    text-indent: 12px;
  }
}
</style>
