/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div>
    <!-- 菜单管理 -->
    <div id="EvalRecord" class="layoutcontainer menuguanli">
      <div class="menuleft" :style="{ height: boxHeight }">
        <div class="menuleft_pc">
          <h2>PC软件</h2>
          <a-button
            type="primary"
            style="margin:0.5em 0"
            @click="addmenupc"
            v-isshow="'base:menu:savePc,base:menu:saveWeb'"
          >新增PC菜单</a-button>
          <div style="height:calc(100% - 82px)">
            <div class="page-header-index-wide" id="Tree" style="height:100%">
              <a-card :bordered="false" @click.stop style="height:100%">
                <el-scrollbar style="height:100%">
                  <Tree :treedata="this.pctreedata" Statetype="PC" @bindSend="Treeprop" />
                </el-scrollbar>
              </a-card>
            </div>
          </div>
        </div>
        <div class="menuleft_header menuleft_web">
          <h2>站点软件</h2>
          <a-button
            type="primary"
            @click="addmenuweb"
            v-isshow="'base:menu:savePc,base:menu:saveWeb'"
            style="margin:0.5em 0"
          >新增站点菜单</a-button>
          <div style="height:calc(100% - 82px)">
            <div class="page-header-index-wide" id="Tree" style="height:100%">
              <a-card :bordered="false" @click.stop style="height:100%">
                <el-scrollbar style="height:100%">
                  <Tree :treedata="this.webtreedata" Statetype="WEB" @bindSend="Treeprop" />
                </el-scrollbar>
              </a-card>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div class="menuright">
        <div class="Simpleprogrambody" :style="{height:Height}">
          <div
            style="height:40px;padding-top:5px;display: flex;    justify-content: flex-end;margin-bottom:10px"
          >
            <a-button
              style="margin-top:5px"
              type="primary"
              @click="addbtn"
              v-isshow="'base:menu:saveMenuBtn'"
            >添加按钮</a-button>
          </div>
          <vxe-table
            stripe
            resizable
            border
            height="auto"
            ref="usertable"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
          >
            <vxe-table-column field="name" title="按钮名称" show-overflow align="center" width="20%" />
            <vxe-table-column
              field="permission"
              title="按钮关键字"
              show-overflow
              align="center"
              width="30%"
            />
            <vxe-table-column
              field="createUser"
              title="创建人"
              show-overflow
              align="center"
              width="20%"
            />
            <vxe-table-column
              field="createTime"
              title="创建时间"
              show-overflow
              align="center"
              width="15%"
            />
            <vxe-table-column title="操作" show-overflow align="center" fixed="right" width="15%">
              <template v-slot="{ row }">
                <span
                  type="text"
                  v-isshow="'base:menu:saveMenuBtn'"
                  @click="tableedit(row)"
                  style="color:#0db8df;cursor: pointer;margin-right:10px"
                >编辑</span>
                <span
                  type="text"
                  @click="tableDlt(row)"
                  style="color:#0db8df;cursor: pointer;"
                  v-isshow="'base:menu:delete'"
                >删除</span>
              </template>
            </vxe-table-column>
          </vxe-table>
          <!-- <p class="pbg">
            <vxe-pager
              align="right"
              size="mini"
              :layouts="layouts"
              :page-sizes="[15, 50, 100, 200]"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              @page-change="pagerchange"
            />
          </p>-->
        </div>
      </div>
    </div>
    <a-modal
      v-model="PCFormshow"
      :title="Pcstr"
      @ok="PCFormSubmit"
      @cancel="PCcancel"
      :width="680"
      okText="提交"
    >
      <form-create v-model="PcFApi" :rule="PcMenuForm" :option="option" />
    </a-modal>
    <a-modal
      v-model="WebFormshow"
      :title="Webstr"
      @ok="WebFormSubmit"
      @cancel="Webcancel"
      :width="680"
      okText="提交"
    >
      <form-create v-model="WebFApi" :rule="WenMenuForm" :option="option" />
    </a-modal>
    <a-modal
      v-model="addbtnshow"
      :title="btnstr"
      @ok="btnmodule"
      @cancel="cancel"
      okText="提交"
      :keyboard="false"
    >
      <form-create v-model="AddBtnformApi" :rule="AddBtnform" :option="option" />
    </a-modal>
  </div>
</template>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import Tree from "@/components/modules/Tree/Tree.vue"

import {
  LimitInputlength,
  textarealength,
  page,
  layouts
} from "@/InterfaceVariable/variable"
import { Treepropobj } from "@/InterfaceVariable/interface"
@Component({
  components: {
    Tree
  }
})
export default class Menu extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  public OrganizationM = new this.$api.configInterface.OrganizationM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private layouts = layouts
  private Height = ""
  public Pcstr = ""
  public Webstr = ""
  public pctreedata = []
  public webtreedata = []
  public boxHeight = {}
  public rightMenu = {}
  private tableData = []
  public tmDisplay = false
  public id = ""
  private Currentmenuname = {}
  private parentName = ""
  public parentid = "0"

  public PcMenuId = ""
  public PCFormshow = false
  public WebFormshow = false
  private status = ""
  private addbtnshow = false
  private btnstr = ""
  private btnid = ""
  private PcFApi = {}
  private WebFApi = {}
  private AddBtnformApi = {}
  private option = {
    // 显示重置表单按扭
    resetBtn: false,
    submitBtn: false
  }
  private WenMenuForm = [
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "parentname",
          title: "上级菜单",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [],
          props: {
            disabled: true, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "默认顶级菜单",
            maxLength: LimitInputlength
          },
          col: {
            span: 12
          }
        },
        {
          type: "input",
          field: "name",
          title: "菜单名称",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入菜单名称",
            maxLength: LimitInputlength
          },
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "icon",
          title: "图标Class",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入图标名称",
            maxLength: LimitInputlength
          },
          col: {
            span: 12
          }
        },
        {
          type: "inputNumber",
          field: "sort",
          title: "排序",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            {
              type: "number",
              min: 0,
              required: true,
              message: "仅支持数字"
            }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入排序，仅限数字",
            maxLength: "30" //
          },
          className: "menusort",
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "path",
          title: "菜单地址",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入菜单地址",
            maxLength: LimitInputlength
          },
          col: {
            span: 12
          }
        },
        {
          type: "input",
          field: "pathAlias",
          title: "路由地址名称",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入路由地址名称",
            maxLength: LimitInputlength
          },
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "component",
          title: "组件地址",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入组件地址",
            maxLength: 100
          },
          col: {
            span: 12
          }
        },
        {
          type: "input",
          field: "permission",
          title: "权限",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入权限相关",
            maxLength: 100
          },
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "radio",
          title: "是否启用",
          field: "isEnabled",
          value: "0",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          options: [
            { value: "0", label: "禁用", disabled: false },
            { value: "1", label: "启用", disabled: false }
          ],
          col: {
            span: 12
          }
        },
        {
          type: "radio",
          title: "是否路由菜单",
          field: "route",
          value: "0",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          options: [
            { value: "0", label: "否", disabled: false },
            { value: "1", label: "是", disabled: false }
          ],
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "radio",
          title: "是否隐藏",
          field: "hidden",
          value: "0",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          options: [
            { value: "0", label: "否", disabled: false },
            { value: "1", label: "是", disabled: false }
          ],
          col: {
            span: 12
          }
        },
        {
          type: "radio",
          title: "是否缓存",
          field: "keepAlive",
          value: "0",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          options: [
            { value: "0", label: "否", disabled: false },
            { value: "1", label: "是", disabled: false }
          ],
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "remark",
          title: "备注",
          value: "",
          labelCol: { span: 4 },
          wrapperCol: { span: 16 },
          props: {
            disabled: false, //是否可禁用
            allowClear: true, //是否可清除
            placeholder: "请输入描述（200字符以内）",
            maxLength: textarealength,
            rows: 4,
            type: "textarea"
          },
          className: "menutextarea"
        }
      ]
    }
  ]
  private PcMenuForm = [
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "code",
          title: "菜单key值",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false,
            allowClear: false,
            placeholder: "请输入菜单Key值",
            maxLength: LimitInputlength
          },
          col: {
            span: 12
          }
        },
        {
          type: "input",
          field: "name",
          title: "菜单名称",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false,
            allowClear: false,
            placeholder: "请输入菜单名称",
            maxLength: LimitInputlength
          },
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "inputNumber",
          field: "sort",
          title: "排序",
          value: "",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            {
              type: "number",
              min: 0,
              required: true,
              message: "仅支持数字，最小值为1,最大值为99999"
            }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入排序，仅限数字",
            maxLength: "30" //
          },
          className: "menusort",
          col: {
            span: 12
          }
        },
        {
          type: "radio",
          title: "是否启用",
          field: "isEnabled",
          value: "0",
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          options: [
            { value: "0", label: "禁用", disabled: false },
            { value: "1", label: "启用", disabled: false }
          ],
          col: {
            span: 12
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "remark",
          title: "描述",
          value: "",
          labelCol: { span: 4 },
          wrapperCol: { span: 16 },
          props: {
            disabled: false, //是否可禁用
            allowClear: true, //是否可清除
            placeholder: "请输入描述（200字符以内）",
            maxLength: textarealength,
            rows: 4,
            type: "textarea"
          },

          className: "menutextarea"
        }
      ]
    }
  ]
  private AddBtnform = [
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "name",
          title: "按钮名称",
          value: "",
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入按钮名称",
            maxLength: LimitInputlength
          },
          col: {
            span: 24
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "permission",
          title: "按钮关键字",
          value: "",
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          validate: [
            { type: "string", required: true, message: "必填项不能为空" }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入按钮关键字",
            maxLength: LimitInputlength
          },
          col: {
            span: 24
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "inputNumber",
          field: "sort",
          title: "排序",
          value: "",
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          validate: [
            {
              type: "number",
              min: 0,
              required: true,
              message: "仅支持数字"
            }
          ],
          props: {
            disabled: false, //是否可禁用
            allowClear: false, //是否可清除
            placeholder: "请输入排序，仅限数字",
            maxLength: "30" //
          },
          className: "btnsort",
          col: {
            span: 24
          }
        }
      ]
    },
    {
      type: "a-row",
      native: true,
      children: [
        {
          type: "input",
          field: "remark",
          title: "备注",
          value: "",
          labelCol: { span: 6 },
          wrapperCol: { span: 18 },
          props: {
            disabled: false, //是否可禁用
            allowClear: true, //是否可清除
            placeholder: "请输入描述（200字符以内）",
            maxLength: textarealength,
            rows: 4,
            type: "textarea"
          },
          className: "addtextarea"
        }
      ]
    }
  ]

  // todo 事件和生命周期
  private created() {
    this.boxHeight = document.body.clientHeight - 160 + "px"
    this.Height = `${document.documentElement.clientHeight - 175}px`
    this.form = this.$form.createForm(this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 180}px`
      _that.boxHeight = document.body.clientHeight - 160 + "px"
    })
    this.getdata()
  }
  // todo事件
  //子组件传递事件
  private Treeprop(state: string, val: Treepropobj, type: string) {
    // console.log(state)
    // console.log(val)
    // console.log(type)
    if (type == "PC") {
      // PC操作
      if (state === "dlt") {
        this.OrganizationM.menuDlt(val.id).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.getdata()
          }
        })
      } else if (state == "edit") {
        this.OrganizationM.GetPCpMenu(val.id).then((res) => {
          if (res.code == 0) {
            this.PCFormshow = true
            this.PcMenuId = val.id
            this.Pcstr = "PC菜单编辑"
            setTimeout(() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              let form = this.PcFApi as any
              form.setValue({
                code: res.data.code,
                isEnabled: res.data.isEnabled ? "1" : "0",
                name: res.data.name,
                sort: res.data.sort,
                remark: res.data.remark
              })
            })
          }
        })
      } else if (state === "add") {
        this.Pcstr = "PC新增菜单"
        this.PCFormshow = true
      }
    } else if (type === "WEB") {
      if (state === "add") {
        this.Webstr = "新增菜单"
        this.WebFormshow = true
        this.id = ""
        this.parentid = val.id
        setTimeout(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          let form = this.WebFApi as any
          form.setValue({
            parentname: val.parentname
          })
        })
      } else if (state === "edit") {
        this.Webstr = "站点菜单编辑"
        this.WebFormshow = true
        this.OrganizationM.GetWEBpMenu(val.id).then((res) => {
          (this.id = res.data.id), (this.parentid = res.data.parentId)
          setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let form = this.WebFApi as any
            form.setValue({
              parentname: val.parentname,
              component: res.data.component,
              hidden: res.data.hidden ? "1" : "0",
              icon: res.data.icon,
              isEnabled: res.data.isEnabled ? "1" : "0",
              keepAlive: res.data.keepAlive ? "1" : "0",
              name: res.data.name,
              path: res.data.path,
              pathAlias: res.data.pathAlias,
              permission: res.data.permission,
              remark: res.data.remark,
              route: res.data.route ? "1" : "0",
              sort: res.data.sort
            })
          })
        })
      } else if (state === "dlt") {
        this.OrganizationM.menuDlt(val.id).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.getdata()
          }
        })
      }
    } else if (type === "LeftClick") {
      this.id = val.id
      this.gettabledata(val.id)
    }
  }
  private btnmodule() {
    let form = this.AddBtnformApi as any
    form.submit((formData) => {
      let obj = {
        id: this.btnid,
        name: formData.name,
        parentId: this.id,
        permission: formData.permission,
        remark: formData.remark,
        sort: formData.sort
      }
      this.saveMenuBtn(obj)
    })
  }
  private saveMenuBtn(obj) {
    this.OrganizationM.saveMenuBtn(obj).then((res) => {
      if (res.code === 0) {
        this.$message.success(res.msg)
        this.addbtnshow = false
        this.gettabledata(obj.parentId)
        this.btnid = ''
      }else{
        this.$message.warning(res.msg)
      }
    })
  }
  private cancel() {
    let form = this.AddBtnformApi as any
    form.resetFields()
  }
  private PCcancel() {
    let form = this.PcFApi as any
    this.PcMenuId = ""
    form.resetFields()
  }
  private Webcancel() {
    this.id = ''
    let form = this.WebFApi as any
    form.resetFields()
  }
  private PCFormSubmit() {
    let form = this.PcFApi as any
    form.submit((formdata) => {
      let obj = {
        code: formdata.code,
        id: this.PcMenuId,
        isEnabled: formdata.isEnabled == "1" ? true : false,
        name: formdata.name,
        remark: formdata.remark,
        sort: formdata.sort
      }
      this.OrganizationM.PCMenuAdd(obj).then((res) => {
        console.log(res)
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.getdata()
          this.PCcancel()
          this.PCFormshow = false
          this.PcMenuId = ""
        } else {
          this.$message.error(res.msg)
        }
      })
    })
  }
  private WebFormSubmit() {
    const form = this.WebFApi as any
    form.submit((formData) => {
      console.log(this.parentid)
      console.log(this.id)
      console.log(this.Webstr);
      
      let obj = {
        component: formData.component,
        hidden: formData.hidden == "1" ? true : false,
        icon: formData.icon,
        id: this.Webstr == '新增菜单' ? '' : this.id,
        isEnabled: formData.isEnabled == "1" ? true : false,
        keepAlive: formData.keepAlive == "1" ? true : false,
        name: formData.name,
        parentId: this.parentid,
        path: formData.path,
        pathAlias: formData.pathAlias,
        permission: formData.permission,
        remark: formData.remark,
        route: formData.route == "1" ? true : false,
        sort: formData.sort
      }
      this.OrganizationM.MenuSaveWeb(obj).then((res) => {
        console.log(res)
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.getdata()
          this.Webcancel()
          this.WebFormshow = false
          this.id = ""
          this.parentid = "0"
        } else {
          this.$message.error(res.msg)
        }
      })
    })
  }
  private addmenuweb() {
    this.Webstr = "新增菜单"
    this.WebFormshow = true
    this.id = "0"
    this.parentid = "0"
  }
  private cancelmenuweb () {
    console.log(12313);
    
    this.id = ''
  }
  private addmenupc() {
    this.Pcstr = "PC新增菜单"
    this.PCFormshow = true
  }
  private tableRowClassName(record) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private tableedit(row) {
    this.btnid = row.id
    this.id = row.parentId
    this.btnstr = "按钮编辑"
    this.addbtnshow = true
    setTimeout(() => {
      let form = this.AddBtnformApi as any
      form.setValue({
        name:row.name,
        permission:row.permission,
        sort:row.sort,
        remark: row.remark,
      })
    })
  }
  private tableDlt(row) {
    console.log(row)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: `按钮删除后无法恢复，确定要删除按钮${row.name}吗？`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 500)
          _that.OrganizationM.menubtnDlt( row.id ).then((res) => {
            console.log(res)
            if (res.code == 0) {
              _that.$message.success(res.msg)
              _that.gettabledata(row.parentId)
           
            } else {
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log("Oops errors!"))
      }
    })
  }
  private addbtn() {
    this.form.resetFields()
    if (this.id) {
      this.btnstr = "添加按钮"
      this.addbtnshow = true
      setTimeout(() => {
        let form = this.AddBtnformApi as any
        form.resetFields()
      });
     
    } else {
      this.$message.warning("请先选择需要添加的菜单")
    }
  }
  // todo 数据获取
  private gettabledata(id) {
    this.OrganizationM.menubtntable(id).then((res) => {
      this.tableData = res.data
      this.page.totalResult = res.data?.length && 0

     
    })
  }
  private getdata() {
    this.OrganizationM.pcmenutreedata().then((res) => {
      this.pctreedata = res.data
    })
    this.OrganizationM.webmenutreedata().then((res) => {
      this.webtreedata = res.data
    })
  }
}
</script>


<style lang="less" scope>
.menuguanli {
  display: flex;
  .ant-form-explain {
    position: absolute;
  }
  .menuleft {
    h2 {
      font-size: 16px;
      background-color: #7da9d4;
      text-align: left;
      text-indent: 10px;
      color: #fff;
      font-weight: 600;
      height: 36px;
      line-height: 36px;
      margin: 0;
    }
    width: 280px;
  }
  .menuright {
    height: 100%;
    width: 83%;
    // background: skyblue;
    div:nth-of-type(1) {
      padding: 0;
      // margin: 0 26px
    }
  }
  .ant-card-body {
    padding-top: 0;
    overflow: hidden;
    height: 100%;
  }
}
.menutextarea {
  .ant-form-item-control-wrapper {
    width: 522px;
  }
}
.addtextarea {
  .ant-form-item-control-wrapper {
    width: 354px;
  }
}
.menusort {
  .ant-input-number {
    width: 209px;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
}
.btnsort {
  .ant-input-number {
    width: 355px;
  }
  .ant-input-number-handler-wrap {
    display: none;
  }
}
.menuleft_pc {
  height: 35%;
  min-height: 200px;
  background: #fff;
}
.menuleft_web {
  height: 65%;
  min-height: 370px;

  background: #fff;
}
.pbg {
  div {
    background: #fff;
  }
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