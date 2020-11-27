/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div>
    <!-- 菜单管理 -->
    <div id="EvalRecord" class="layoutcontainer menuguanli">
      <div class="menuleft">
        <div class="menuleft_header">
          <a-button type="primary" @click="addmenu" v-isshow="'menu:save'">新增菜单</a-button>
        </div>
        <div>
          <div class="page-header-index-wide" id="Tree">
            <a-card :bordered="false" @click.stop>
              <el-scrollbar :style="{ height: boxHeight }">
                <a-tree
                  class="cScroll"
                  :treeData="treedata"
                  showLine
                  defaultExpandAll
                  :replaceFields="{
                  children: 'children',
                  key: 'code',
                  title: 'name'
                }"
                  @rightClick="rightClick"
                  @select="Onselect"
                />
                <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{ ...rightMenu }">
                  <ul>
                    <li>
                      <a-button type @click="add">
                        <a-icon type="plus-circle" />新增菜单
                      </a-button>
                    </li>
                    <li>
                      <a-button type @click="edit">
                        <a-icon type="edit" />编辑菜单
                      </a-button>
                    </li>
                    <li>
                      <a-button type @click="dlt">
                        <a-icon type="close-circle" />删除菜单
                      </a-button>
                    </li>
                  </ul>
                </div>
              </el-scrollbar>
            </a-card>
          </div>
        </div>
      </div>
      <div class="menuright">
        <div class="Simpleprogrambody" :style="{height:Height}">
          <div style="height:40px;padding-top:5px;display: flex;
    justify-content: flex-end;"
>
            <a-button type="primary" @click="addbtn" v-isshow="'menu:save'">添加按钮</a-button>
          </div>
          <vxe-table
            stripe
            border
            height="auto"
            ref="usertable"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
          >
            <vxe-table-column
              field="name"
              title="按钮名称"
              show-overflow
              align="center"
              minWidth="100"
            />
            <vxe-table-column
              field="permission"
              title="按钮关键字"
              show-overflow
              align="center"
              minWidth="140"
            />
            <vxe-table-column
              field="createUser"
              title="创建人"
              show-overflow
              align="center"
              minWidth="100"
            />
            <vxe-table-column
              field="createTime"
              title="创建时间"
              show-overflow
              align="center"
              minWidth="180"
            />
            <vxe-table-column title="操作" show-overflow align="center" fixed="right" minWidth="100">
              <template v-slot="{ row }">
                <span
                  type="text"
                  @click="tableedit(row)"
                  style="color:#0db8df;cursor: pointer;margin-right:10px"
                >编辑</span>
                <span type="text" @click="tableDlt(row)" style="color:#0db8df;cursor: pointer;" v-isshow="'menu:delete'">删除</span>
              </template>
            </vxe-table-column>
          </vxe-table>
          <p>
            <vxe-pager
              align="right"
              size="mini"
              :layouts="layouts"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              @page-change="pagerchange"
            />
          </p>
        </div>
      </div>
    </div>
    <a-modal
      v-model="addshow"
      :title="str"
      @ok="configshowok"
      @cancel="cancel"
      :width="680"
      okText="提交"
    >
      <a-form
        autocomplete="off"
        :form="form1"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        @submit="configshowok"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="上级菜单">
              <a-input
                :disabled="true"
                v-decorator="['SuperiorMenu', { initialValue: '',  rules: [] }]"
                :max-length="LimitInputlength"
                placeholder="默认顶级菜单"
              >/></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="菜单名称">
              <a-input
                v-decorator="['MenuName', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="LimitInputlength"
                placeholder="请输入菜单名称"
              >/></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="图标Class">
              <a-input
                v-decorator="['IconClass', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="LimitInputlength"
                placeholder="请输入民警姓名"
              >/></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="排序">
              <a-input
                v-decorator="['sort', { initialValue: '',  rules: [{ validator: (rule, val, callback) => {
                var pattern = new RegExp( /^\d+$|^\d+[.]?\d+$/)
                if (!pattern.test(val)){
                callback('只能输入数字');
                }else {
                  callback();
                }
                  callback();
                },
                }] }]"
                :max-length="LimitInputlength"
                placeholder="请输入数字，不接受英文字母及汉字"
              >/></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="菜单地址">
              <a-input
                v-decorator="['path', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="50"
                placeholder="请输入菜单地址"
              >/></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="路由地址名称">
              <a-input
                v-decorator="['pathalias', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="50"
                placeholder="请输入路由地址名称"
              >/></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="组件地址">
              <a-input
                v-decorator="['component', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="100"
                placeholder="请输入组件地址"
              >/></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="权限">
              <a-input
                v-decorator="['permission', { initialValue: '',  rules: [] }]"
                :max-length="100"
                placeholder="请输入重定向地址"
              >/></a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="24" class="menucenter">
          <a-col :span="12">
            <a-form-item label="是否启用">
              <a-radio-group v-decorator="['isDisable', { initialValue: '',  rules: [] }]">
                <a-radio value="1">是</a-radio>
                <a-radio value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否路由菜单">
              <a-radio-group
                v-decorator="['route', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="LimitInputlength"
              >
                <a-radio value="1">是</a-radio>
                <a-radio value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="menucenter">
          <a-col :span="12">
            <a-form-item label="是否隐藏">
              <a-radio-group v-decorator="['isHide', { initialValue: '',  rules: [] }]">
                <a-radio value="1">是</a-radio>
                <a-radio value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="是否缓存">
              <a-radio-group v-decorator="['isKeepAlive', { initialValue: '',  rules: [] }]">
                <a-radio value="1">是</a-radio>
                <a-radio value="0">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class="gzms">
          <a-col :span="24">
            <a-form-item label="备注" class="textareatext" :span="4">
              <a-textarea
                :maxLength="textarealength"
                allowClear
                rows="3"
                style="resize: none;"
                placeholder="最大支持输入字数200..."
                v-decorator="[
                        'remark',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <a-modal v-model="addbtnshow" :title="btnstr" @ok="btnmodule" @cancel="cancel" okText="提交">
      <a-form
        autocomplete="off"
        :form="form"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
        @submit="btnmodule"
      >
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="按钮名称">
              <a-input
                v-decorator="['name', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="LimitInputlength"
                placeholder="请输入按钮名称"
              >/></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="按钮关键字">
              <a-input
                v-decorator="['keyword', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                :max-length="LimitInputlength"
                placeholder="请输入按钮关键字"
              >/></a-input>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row class>
          <a-col :span="24">
            <a-form-item label="按钮说明" class="textareatext" :span="4">
              <a-textarea
                :maxLength="textarealength"
                allowClear
                rows="3"
                style="resize: none;"
                placeholder="最大支持输入字数200..."
                v-decorator="[
                        'remark',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,
  page,
  layouts,
} from "@/InterfaceVariable/variable"
@Component({
  components: {},
})
export default class Menu extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  public form1!: any
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private page = page
  private layouts = layouts
  private Height = ""
  public str = ""
  public visible = false
  public OrganizationM = new this.$api.configInterface.OrganizationM()
  public treedata = []
  public boxHeight = {}
  public rightMenu = {}
  private tableData = []
  public tmDisplay = false
  public id = ""
  private Currentmenuname = {}
  private parentName = ""
  public parentid = ""
  public addshow = false
  private status = ""
  private addbtnshow = false
  private btnstr = ""
  private btnid = ""

  // todo 事件和生命周期
  private created() {
    this.boxHeight = document.body.clientHeight - 234 + "px"
    this.Height = `${document.documentElement.clientHeight - 220}px`
    this.form = this.$form.createForm(this)
    this.form1 = this.$form.createForm(this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 220}px`
      _that.boxHeight = document.body.clientHeight - 234 + "px"
    })
    this.getdata()
    this.gettabledata({ id: 0, page: 1, limit: 10 })
  }
  // todo事件

  private rightClick(e) {
    
    this.tmDisplay = true
    this.id = e.node.dataRef.code
    this.parentid = e.node.dataRef.parentCode
    this.Currentmenuname = e.node.dataRef.name
    if (e.event.clientY > 850) {
      this.rightMenu = {
        top: e.event.pageY - 80 + "px",
        left: e.event.pageX + 20 + "px",
      }
    } else {
      this.rightMenu = {
        top: e.event.pageY + "px",
        left: e.event.pageX + 20 + "px",
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    document.onclick = function (e) {
      if (e.target != document.getElementById("perTreeMenu")) {
        _that.tmDisplay = false
      }
    }
  }
  private btnmodule(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        if (this.btnstr == "添加按钮") {
          let obj = {
            icon: "",
            id: "",
            name: val.name,
            parentId: this.id,
            permission: val.keyword,
            remark: val.remark,
            sort: "",
            type: "BUTTON",
          }
          this.OrganizationM.Menubtnadd(obj).then((res) => {
            if (res.code == 0) {
              this.addbtnshow = false
              this.$message.success(res.msg)
              this.gettabledata({ id: this.id, page: 1, limit: 10 })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else if (this.btnstr == "按钮编辑") {
          let obj = {
            icon: "",
            id: this.btnid,
            name: val.name,
            parentId: this.id,
            permission: val.keyword,
            remark: val.remark,
            sort: "",
            type: "BUTTON",
          }
          this.OrganizationM.Menubtnedit(obj).then((res) => {
            if (res.code == 0) {
              this.addbtnshow = false
              this.$message.success(res.msg)
              this.gettabledata({ id: this.id, page: 1, limit: 10 })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    })
  }
  private configshowok(e) {
    e.preventDefault()
    this.form1.validateFields((err: any, val: any) => {
      if (!err) {
        let obj = {}
        if (this.status == "顶级菜单") {
          console.log("顶级菜单")
          obj = {
            icon: val.IconClass,
            id: "", //自身id
            isRoot: val.isDisable, //禁用或启用
            name: val.MenuName,
            // pId: "",  //父级id
            parentId: "", //父级id
            remark: val.remark, //备注
            sort: val.sort, //排序
            path: val.path, //菜单地址
            pathAlias: val.pathalias, //菜单name
            component: val.component, //组件地址
            permission: val.permission, //重定向地址
            hidden: val.isHide, //是否隐藏
            keepAlive: val.isKeepAlive, //是否缓存
            route: val.route,
            type: "MENU",
          }
          this.OrganizationM.MenuAdd(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.getdata()
              this.addshow = false
            } else {
              this.$message.error(res.msg)
            }
          })
        } else if (this.status == "子菜单新增") {
          console.log("子菜单新增")
          obj = {
            icon: val.IconClass,
            id: "", //自身id
            isRoot: val.isDisable, //禁用或启用
            name: val.MenuName,
            // pId: "",  //父级id
            parentId: this.id, //父级id
            remark: val.remark, //备注
            sort: val.sort, //排序
            path: val.path, //菜单地址
            pathAlias: val.pathalias, //菜单name
            component: val.component, //组件地址
            permission: val.permission, //重定向地址
            hidden: val.isHide, //是否隐藏
            keepAlive: val.isKeepAlive, //是否缓存
            route: val.route,
            type: "MENU",
          }
          this.OrganizationM.MenuAdd(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.getdata()
              this.addshow = false
            } else {
              this.$message.error(res.msg)
            }
          })
        } else if (this.status == "编辑菜单") {
          console.log("编辑菜单")
          console.log(val)
          obj = {
            icon: val.IconClass,
            id: this.id, //自身id
            isEnabled: val.isDisable, //禁用或启用
            name: val.MenuName,
            parentId: this.parentid, //父级id
            remark: val.remark, //备注
            sort: val.sort, //排序
            path: val.path, //菜单地址
            pathAlias: val.pathalias, //菜单name
            component: val.component, //组件地址
            permission: val.permission, //重定向地址
            hidden: val.isHide, //是否隐藏
            keepAlive: val.isKeepAlive, //是否缓存
            route: val.route,
            type: "MENU",
          }
          this.OrganizationM.MenuEdit(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.getdata()
              this.addshow = false
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    })
  }
  private cancel() {
    this.form1.resetFields()
    this.form.resetFields()
  }
  private Onselect(selectedKeys, e) {
    // console.log(this.id)
    this.id = e.node.dataRef.code
    this.gettabledata({ id: e.node.dataRef.code, page: 1, limit: 10 })
  }
  private addmenu() {
    this.str = "新增菜单"
    this.addshow = true
    this.status = "顶级菜单"
    this.tmDisplay = true
  }
  private add() {
    this.str = "新增菜单"
    this.status = "子菜单新增"
    this.tmDisplay = false
    this.addshow = true
    this.$nextTick(() => {
      this.form1.setFieldsValue({
        SuperiorMenu: this.Currentmenuname,
      })
    })
    console.log(this.id)
    console.log(this.parentid)
  }
  private edit() {
    this.tmDisplay = false
    this.status = "编辑菜单"
    this.addshow = true
    this.str = "编辑"
    console.log(this.id)
    console.log(this.parentid)
    this.OrganizationM.menuquery(this.id).then((res) => {
      console.log(res)
      let val = res.data
      this.parentid = res.data.parentId
      this.parentName = res.data.parentName
      this.$nextTick(() => {
        this.form1.setFieldsValue({
          SuperiorMenu: val.parentName,
          MenuName: val.name,
          IconClass: val.icon,
          sort: val.sort,
          path: val.path,
          pathalias: val.pathAlias,
          component: val.component,
          permission: val.permission,
          remark: res.data.remark,
          isDisable: val.isEnabled +"" ,
          route: val.route + "",
          isHide: val.hidden + "",
          isKeepAlive: val.keepAlive + "",
        })
      })
    })
  }
  private dlt() {
    this.tmDisplay = false
    this.OrganizationM.menuDlt({ id: this.id }).then((res) => {
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.getdata()
      }
    })
  }
  private tableRowClassName(record: any) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private tableedit(row) {
    console.log(row)
    this.btnid = row.id
    this.id = row.parentId
    this.btnstr = "按钮编辑"
    this.addbtnshow = true
    this.$nextTick(() => {
      this.form.setFieldsValue({
        name: row.name,
        keyword: row.permission,
        remark: row.remark,
      })
    })
  }
  private tableDlt(row) {
    console.log(row)
    // this.id = row.parentId

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: `按钮删除后无法恢复，确定要删除按钮${row.name}吗？`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          _that.OrganizationM.menubtnDlt({ id: row.id }).then((res) => {
            console.log(res)
            if (res.code == 0) {
              _that.$message.success(res.msg)
              _that.gettabledata({ id: row.parentId, page: 1, limit: 10 })
            } else {
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log("Oops errors!"))
      },
    })
  }
  private pagerchange({ currentPage, pageSize }) {
    // let obj = {
    //   page: currentPage,
    //   limit: pageSize,
    //   deptCode: this.deptCode,
    //   name: this.name,
    //   code: this.code,
    //   type: this.type,
    // }
    // this.OrganizationM.getusertable(obj).then((res) => {
    //   this.tableData = res.data
    //   this.page.totalResult = parseInt(res.count)
    // })
  }
  private addbtn() {
    if (this.id) {
      this.btnstr = "添加按钮"
      this.addbtnshow = true
    } else {
      this.$message.warning("请先选择需要添加的菜单")
    }
  }
  // todo 数据获取
  private gettabledata(obj) {
    this.OrganizationM.menubtntable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = res.data.length
    })
  }
  private getdata() {
    this.OrganizationM.menutreedata().then((res) => {
      this.treedata = res.data
    })
  }
}
</script>


<style lang="less" scope>
.menuguanli {
  display: flex;
  .menuleft {
    width: 280px;
    // background: pink;
    .menuleft_header {
      height: 43px;
      line-height: 1;
      background: #fff;
      border-bottom: 1px solid #999;
      button {
        margin-top: 5px;
        margin-left: 20px;
        line-height: 1;
      }
    }
  }
  .menuright {
    height: 100%;
    width: 83%;
    // background: skyblue;
    div:nth-of-type(1) {
      padding: 0;
    }
  }
}
#Tree .tree_menu {
  position: fixed;
  display: block;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  height: 98px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // height 90px
}
#Tree .tree_menu button {
  // border 0;
  // height 30px;
}
#Tree .tree_menu ul {
  // margin: 0;
  // padding 0;
}
.gzms /deep/ .ant-form-item-label {
  width: 100px;
}
.gzms /deep/ .ant-form-item-control-wrapper {
  width: 530px;
}
.menucenter /deep/ .ant-form-item-control {
  text-align: center;
}
</style>