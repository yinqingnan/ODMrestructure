<template>
  <div>
    <!-- 用户管理 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div
          class="contaninerheader"
          style="padding:12px 25px 0 25px;display:flex;    justify-content: space-between;"
        >
          <template>
            <a-dropdown :trigger="['click']" class="dropdown">
              <a class="ant-dropdown-link" @click="popup">
                筛选
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay" class="box">
                <a-form
                  autocomplete="off"
                  :form="form"
                  :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 14 }"
                  @submit="handle"
                >
                  <el-scrollbar class="screen">
                    <a-form-item label="所属部门">
                      <a-tree-select
                        show-search
                        treeNodeFilterProp="title"
                        v-decorator="[
                        'department',
                        {
                          initialValue: null,
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        :dropdown-match-select-width="true"
                        :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                        :tree-data="departmentData"
                        :replace-fields="{
                        id: 'code',
                        pId: 'parentCode',
                        value: 'value',
                        title: 'name',
                      }"
                        placeholder="请选择..."
                      />
                    </a-form-item>
                    <a-form-item label="民警姓名">
                      <a-input
                        v-decorator="['username', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入民警姓名"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="民警警号">
                      <a-input
                        v-decorator="['usercode', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入民警警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="4G账号">
                      <a-select
                        v-decorator="[
                        'Account',
                        {
                          initialValue: '全部',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in Account" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handle">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div class="btns">
            <a-button @click="add" type="primary" v-isshow="'base:user:save'">添加</a-button>
            <a-button
              @click="distributionzfy"
              type="primary"
              v-isshow="'base:user:access'"
            >分配4G执法仪账号</a-button>
            <a-button
              @click="distributionddt"
              type="primary"
              v-isshow="'base:user:accessdd'"
            >分配4G调度台账号</a-button>
            <a-button @click="Resetpwd" type="primary" v-isshow="'base:user:reset'">重置密码</a-button>
            <a-button @click="imports" type="primary" v-isshow="'base:user:import'">导入</a-button>
            <a-button @click="exports" type="primary" v-isshow="'base:user:export'">导出</a-button>
            <a-button @click="dlt" type="primary" v-isshow="'base:user:delete'">删除</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            border
            resizable
            height="auto"
            ref="usertable"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
          >
            <vxe-table-column type="checkbox" width="60" align="center" fixed="left" />
            <vxe-table-column
              field="name"
              title="民警姓名"
              show-overflow
              align="center"
              minWidth="100"
            />
            <vxe-table-column
              field="code"
              title="民警警号"
              show-overflow
              align="center"
              minWidth="100"
            />
            <vxe-table-column
              field="deptName"
              title="所属部门"
              show-overflow
              align="center"
              minWidth="100"
            />
            <vxe-table-column field="gender" title="性别" show-overflow align="center" minWidth="60" />
            <vxe-table-column
              field="roleName"
              title="用户角色"
              show-overflow
              align="center"
              minWidth="100"
            />
            <vxe-table-column
              field="positionName"
              title="岗位"
              show-overflow
              align="center"
              minWidth="80"
            />
            <vxe-table-column
              field="commonName"
              title="4G账号"
              show-overflow
              align="center"
              minWidth="100"
            >
              <template v-slot="{ row }">
                <div v-if="row.commDeviceCode" style="display:flex;" v-isshow="'base:user:4glist'">
                  <span
                    style="border-bottom: 0.5px solid #0cb9de;cursor:pointer;color:#0cb9de"
                    @click="zfy(row)"
                  >执法仪（{{row.commDeviceCode}}）</span>
                  <img
                    src="../../assets/image/prcode.png"
                    style="width: 18px;height: 18px;margin-top: 5px;"
                  />
                </div>
                <div v-if="row.commScheduleCode" style="display:flex;">
                  <span>调度台({{row.commScheduleCode}})</span>
                </div>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="identity"
              title="身份证号"
              show-overflow
              align="center"
              minWidth="100"
            />
            <vxe-table-column
              field="phone"
              title="联系电话"
              show-overflow
              align="center"
              minWidth="120"
            />
            <vxe-table-column
              field="remark"
              title="备注"
              show-overflow
              align="center"
              minWidth="120"
            />
            <vxe-table-column title="操作" show-overflow align="center"  minWidth="80" fixed="right">
              <template v-slot="{ row }">
                <span type="text" @click="edit(row)" style="color:#0db8df;cursor: pointer;" v-isshow="'base:user:update'">编辑</span>
              </template>
            </vxe-table-column>
          </vxe-table>
          <p>
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
          </p>
        </div>
      </div>
      <a-modal
        class="addmodal"
        :visible="visible"
        :title="str"
        cancelText
        :width="700"
        okText="提交"
        @ok="repairSubmit"
        @cancel="repairCancel"
      >
        <a-form
          autocomplete="off"
          :form="form1"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          @submit="repairSubmit"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="姓名">
                <a-input
                  v-decorator="['name', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入民警姓名"
                >/></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="警号">
                <a-input
                  :disabled = "codedisabled"
                  v-decorator="['code', 
                  { initialValue: '',
                    rules: [
                    { required: true, message: '请输入部门编号' },
                    { validator: codevalidator}
                    ]
                  }
                  ]"
                  :max-length="LimitInputlength"
                  placeholder="请输入民警警号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="所属部门">
                <a-tree-select
                  show-search
                  treeNodeFilterProp="title"
                  v-decorator="[
                        'department',
                        {
                          initialValue: null,
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  :dropdown-match-select-width="true"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="deptCodeData"
                  :replace-fields="{
                        id: 'code',
                        pId: 'parentCode',
                        value: 'value',
                        title: 'name',
                      }"
                  placeholder="请选择所属部门..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="用户角色">
                <a-select
                  show-search
                  mode="multiple"
                  :maxTagCount="maxTagCount"
                  :maxTagTextLength="maxTagTextLength"
                  v-decorator="[
                        'rolename',
                        {
                          initialValue: [],
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  :filterOption="filterOption"
                  style="width: 100%"
                  placeholder="请选择用户角色..."
                >
                  <a-select-option v-for="d in userroleData" :key="d.value">{{ d.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="岗位">
                <a-select
                  v-decorator="[
                        'positionName',
                        {
                          initialValue: '请选择岗位',
                          rules: []
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择岗位..."
                >
                  <a-select-option v-for="d in postlist" :key="d.dictKey">{{ d.remark }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="身份证号">
                <a-input
                  v-decorator="['identity', { initialValue: '',  rules: [
                    {validator:validatorID}
                  ] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入身份证号"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="性别">
                <a-radio-group
                  v-decorator="['gender', { initialValue: '男',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                >
                  <a-radio value="男">男</a-radio>
                  <a-radio value="女">女</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话">
                <a-input
                  v-decorator="['phone', { initialValue: '',  rules: [ {validator: phonevalidator}] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入联系电话"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24" />
          </a-row>
          <a-row class="userm">
            <a-form-item label="备注" class="textareatext" :span="4">
              <a-textarea
                :maxLength="textarealength"
                allowClear
                rows="3"
                style="resize: none;"
                placeholder="最大支持输入字数200..."
                v-decorator="[
                        'remarks',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
              />
            </a-form-item>
          </a-row>
        </a-form>
      </a-modal>
      <!-- 二维码弹窗 -->
      <a-modal v-model="QRshow" title="二维码登录" :width="325" :footer="null" class="qrcodemodule">
        <div style="text-alin">
          <div class="qrcode" ref="qrCodeUrl"></div>
        </div>
      </a-modal>
      <a-modal
        v-model="importshow"
        title="用户导入"
        :width="675"
        class="importmodule"
        @cancel="importclear"
      >
        <div class="importheader">
          <p>提示：第一次导入的时候请先下载模板，编辑内容后再进行导入操作。</p>
          <div style="display:flex">
            <a-upload :file-list="fileList" :before-upload="beforeUpload" accept=".xls, .xlsx">
              <a-button @click="selectfile">
                <a-icon type="upload" />选择文件上传
              </a-button>
            </a-upload>
            <a-button type @click="downloadtemplate" style="margin-left:9px">下载模板</a-button>
          </div>
          <h2>{{filename||""}}</h2>
        </div>
        <div class="importfooter">
          <div v-if="iserror">
            <a-divider orientation="left" style="color:#919AA6;font-size:12px">失败原因</a-divider>
            <p style="padding:0 36px 0 30px">{{errormsg}}</p>
          </div>
        </div>
        <template slot="footer">
          <a-button type="primary" @click="importben">开始导入</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import QRCode from "qrcodejs2"
import {
  layouts,
  LimitInputlength,
  page,
  textarealength,
} from "@/InterfaceVariable/variable"
import axios from "axios"
import { http } from "../../api/interceptors"
@Component({
  components: {},
})
export default class User extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  public form1!: any
  public DataM = new this.$api.configInterface.DataM()
  public OrganizationM = new this.$api.configInterface.OrganizationM()
  private Account = [
    { id: "0", value: "全部", title: "请选择" },
    { id: "1", value: "2", title: "无" },
    { id: "2", value: "3", title: "调度台账号" },
    { id: "3", value: "1", title: "执法仪账号" },
  ]
  private maxTagCount = 2
  private maxTagTextLength = 2
  private visible = false
  private str = ""
  private page = page
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private tableData = []
  private departmentData = []
  private layouts = layouts
  private QRshow = false
  private deptCode = ""
  private name = ""
  private code = ""
  private type = ""
  private deptCodeData = []
  private userroleData = []
  private postlist = []
  private Height = ""
  private popup() {
    return
  }
  private codedisabled = false
  private status = ""
  private id = ""
  private importshow = false
  private fileList = []
  private iserror = false
  private errormsg = ""
  private filename = ""
  private errormsg = ""
  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form1 = this.$form.createForm(this)
    // this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    this.getdata()
    let obj = {
      page: 1,
      limit: 15,
      deptCode: "",
      name: "",
      code: "",
      type: "全部",
    }
    this.gettabledata(obj)
  }
  // todo事件
  private tableRowClassName(record: any) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private gettabledata(obj) {
    this.OrganizationM.getusertable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }

  private pagerchange({ currentPage, pageSize }) {
    let obj = {
      page: currentPage,
      limit: pageSize,
      deptCode: this.deptCode,
      name: this.name,
      code: this.code,
      type: this.type,
    }
    this.OrganizationM.getusertable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private getdata() {
    this.DataM.getMenulist({}).then((res) => {
      this.departmentData = res.data
    })
    this.OrganizationM.userroleselect().then((res) => {
      console.log(res)
      this.userroleData = res.data
    })
    this.OrganizationM.userdeptCodeselect({ notPlatform: true }).then((res) => {
      this.deptCodeData = res.data
    })
    //
    this.OrganizationM.userpostlistselect({ parentKey: "position" }).then(
      (res) => {
        let obj = {
          dictKey: "请选择岗位",
          remark: "请选择岗位",
        }
        this.postlist = res.data
        this.postlist.unshift(obj)
      }
    )
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        this.deptCode = val.department
        this.name = val.username
        this.code = val.usercode
        this.type = val.Account
        let obj = {
          page: 1,
          limit: 15,
          deptCode: val.department,
          name: val.username,
          code: val.usercode,
          type: val.Account,
        }
        this.gettabledata(obj)
      }
    })
  }
  private reset() {
    this.deptCode = ""
    this.name = ""
    this.code = ""
    this.type = ""
    this.form.resetFields()
  }
  // 获取选中
  private getSelectEvent1() {
    let selectRecords = (this.$refs.usertable as any).getCheckboxRecords()
    return selectRecords
  }

  // 添加
  private add() {
    console.log(123)
    this.str = "添加用户"
    this.visible = true
    this.status = "新增"
    this.codedisabled = false
    this.form1.resetFields()
  }
  // 分配调度台账号
  private distributionddt() {
    let arr = this.getSelectEvent1()
    let newarr = []
    if (arr.length) {
      arr.map((el) => {
        newarr.push(el.id)
      })
      this.OrganizationM.userddtzh(newarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.gettabledata({
            page: 1,
            limit: 15,
            deptCode: "",
            name: "",
            code: "",
            type: "全部",
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("请选择需要操作的用户")
    }
  }
  // 分配执法仪账号
  private distributionzfy() {
    let arr = this.getSelectEvent1()
    let newarr = []
    if (arr.length) {
      arr.map((el) => {
        newarr.push(el.id)
      })
      this.OrganizationM.userzfyzh(newarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.gettabledata({
            page: 1,
            limit: 15,
            deptCode: "",
            name: "",
            code: "",
            type: "全部",
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("请选择需要操作的用户")
    }
  }
  // 重置密码
  private Resetpwd() {
    let arr = this.getSelectEvent1()
    console.log(arr)
    let newarr = []
    if (arr.length) {
      arr.map((el) => {
        newarr.push(el.id)
      })
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _that = this
      if (newarr.length > 1) {
        this.$confirm({
          title: "提示",
          content: "您确定要重置用户的密码为111111吗？",
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              _that.OrganizationM.userresetpwd(newarr).then((res) => {
                _that.$message.info(res.msg)
              })
            }).catch(() => console.log("Oops errors!"))
          },
        })
      } else {
        this.$confirm({
          title: "提示",
          content: `您确定要重置用户${arr[0].name}(警号${arr[0].code})的密码为111111吗？`,
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              _that.OrganizationM.userresetpwd(newarr).then((res) => {
                _that.$message.info(res.msg)
              })
            }).catch(() => console.log("Oops errors!"))
          },
        })
      }
    } else {
      this.$message.error("请选择需要操作的用户")
    }
  }
  // 导入
  private imports() {
    this.importshow = true
  }
  // 导出
  private exports() {
    (this.$refs.usertable as any).exportData({
      filename: "用户管理",
      sheetName: "Sheet1",
      type: "xlsx",
      message:false,
      columnFilterMethod ({ column }) {
        return ['name','code','deptName','gender','roleName','positionName','commonName','identity','phone','remark'].includes(column.property)
      }
    })
  }
  // 删除
  private dlt() {
    let arr = this.getSelectEvent1()
    let newarr = []
    if (arr.length) {
      arr.map((el) => {
        newarr.push(el.id)
      })
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _that = this
      if (newarr.length > 1) {
        this.$confirm({
          title: "提示",
          content: "用户删除后无法恢复，您确定要删除用户吗？",
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              _that.OrganizationM.userdlt(newarr).then((res) => {
                if (res.code == 0) {
                  _that.$message.success(res.msg)

                  _that.gettabledata({
                    page: 1,
                    limit: 15,
                    deptCode: "",
                    name: "",
                    code: "",
                    type: "全部",
                  })
                } else {
                  _that.$message.error(res.msg)
                }
              })
            }).catch(() => console.log("Oops errors!"))
          },
        })
      } else {
        this.$confirm({
          title: "提示",
          content: `用户删除后无法恢复，确定要删除${arr[0].name}(警号${arr[0].code})的用户吗？`,
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              _that.OrganizationM.userdlt(newarr).then((res) => {
                if (res.code == 0) {
                  _that.$message.success(res.msg)

                  _that.gettabledata({
                    page: 1,
                    limit: 15,
                    deptCode: "",
                    name: "",
                    code: "",
                    type: "全部",
                  })
                } else {
                  _that.$message.error(res.msg)
                }
              })
            }).catch(() => console.log("Oops errors!"))
          },
        })
      }
    } else {
      this.$message.error("请选择需要操作的用户")
    }
  }
  private repairSubmit(e) {
    e.preventDefault()
    this.form1.validateFields((err: any, val: any) => {
      if (!err) {
        if (this.status == "新增") {
          let arr = []
          val.rolename.map((item) => {
            let obj = this.userroleData.filter((el) => {
              return el.value == item
            })
            arr.push(obj)
          })
          let roleName = []
          let roleIds = []
          arr.map((item) => {
            roleIds.push(item[0].value)
            roleName.push(item[0].name)
          })
          let obj = {
            code: val.code,
            commDeviceCode: "",
            commScheduleCode: "",
            deptCode: val.department,
            gender: val.gender,
            id: "",
            identity: val.identity,
            name: val.name,
            phone: val.phone,
            position: val.positionName,
            remark: val.remarks,
            roleName: roleName.toString(),
            roleIds: roleIds.toString(),
          }
          this.OrganizationM.usersave(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.visible = false
              this.gettabledata({
                page: 1,
                limit: 15,
                deptCode: "",
                name: "",
                code: "",
                type: "全部",
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        } else if (this.status == "编辑") {
          let arr = []
          val.rolename.map((item) => {
            let obj = this.userroleData.filter((el) => {
              return el.value == item
            })
            arr.push(obj)
          })
          let roleName = []
          let roleIds = []
          arr.map((item) => {
            roleIds.push(item[0].value)
            roleName.push(item[0].name)
          })
          let obj = {
            code: val.code,
            commDeviceCode: "",
            commScheduleCode: "",
            deptCode: val.department,
            gender: val.gender,
            id: this.id,
            identity: val.identity,
            name: val.name,
            phone: val.phone,
            position: val.positionName,
            remark: val.remarks,
            roleName: roleName.toString(),
            roleIds: roleIds.toString(),
          }
          this.OrganizationM.userupdate(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.visible = false
              this.form.resetFields()
              this.gettabledata({
                page: 1,
                limit: 15,
                deptCode: "",
                name: "",
                code: "",
                type: "全部",
              })
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    })
  }
  private edit(row) {
    console.log(row)
    this.id = row.id
    this.codedisabled = true
    this.visible = true
    this.str = "编辑"
    this.status = "编辑"
    let array = row.roleIds.split(",")
    this.$nextTick(() => {
      this.form1.setFieldsValue({
        roleName: null,
        gender: row.gender,
        phone: row.phone,
        department: row.deptCode,
        rolename: array,
        positionName: row.position,
        remarks: row.remark,
        name: row.name,
        code: row.code,
      })
    })
  }
  private filterOption(input, option) {
    return (
      option.componentOptions.children[0].text
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    )
  }
  private zfy(row) {
    this.QRshow = true
    this.OrganizationM.getQRcode({ userId: row.id }).then((res) => {
      if (res.code == 0) {
        let text = res.data
        this.$message.success(res.msg)
        ;(this.$refs.qrCodeUrl as any).innerHTML = "" //清空当前
        this.qrCode(text)
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  private qrCode(data: any): void {
    // console.log(this.$refs.qrCodeUrl)
    let qrcode = new QRCode(this.$refs.qrCodeUrl, {
      width: 230, //图像宽度
      height: 230, //图像高度
      colorDark: "#000000", //前景色
      colorLight: "#ffffff", //背景色
      typeNumber: 4,
      correctLevel: QRCode.CorrectLevel.L,
    })
    // 容错登记———从低到高
    // QRCode.CorrectLevel.L
    // QRCode.CorrectLevel.M
    // QRCode.CorrectLevel.Q
    // QRCode.CorrectLevel.H
    qrcode.clear() //清除二维码
    qrcode.makeCode(data) //生成另一个新的二维码
  }
  private repairCancel() {
    this.visible = false
  }
  private importclear() {
    this.filename = ""
    this.fileList = []
    this.iserror = false
  }
  private downloadtemplate() {
    //下载本地文件
    let downloadUrl = `${process.env.BASE_URL}template/用户导入模板.xls`
    window.location.href = downloadUrl
  }
  private beforeUpload(file) {
    if (file.type === "application/vnd.ms-excel") {
      this.filename = file.name
      this.fileList = [file]
      return false
    } else {
      this.$message.error("文件类型错误，仅支持.xls 和 .xlsx 类型的文件")
    }
  }
  private importben() {
    if (this.fileList.length > 0) {
      let formData = new FormData() //保存文件后再保存
      formData.append("file", this.fileList[0])
      axios
        .post(http + "api/mdm/device/matche/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: localStorage.getItem("token"),
          },
        })
        .then((res: any) => {
          if (res == "ok") {
            this.importshow = false
            this.iserror = false
            this.fileList = []
            this.filename = ""
          } else {
            this.iserror = true
            this.errormsg = res.data
          }
        })
    } else {
      this.$message.error("未选择文件")
    }
  }
  private selectfile() {
    this.filename = ""
    this.fileList = []
    this.iserror = false
  }
  private phonevalidator (rule,value,callback){
    let reg = new RegExp('^[0-9]*$')
    if(!value){
      callback()
    }else if(reg.test(value)){
      callback()
    }else{
      callback('必须为数字')
    }
  }
  private validatorID(rule,value,callback) {
    let reg= new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/)
    if(!value){
      callback()
    }else if(value.length==18 && reg.test(value)){
      callback()
    }else{
      callback('身份证格式不对')
    }
  }
  private codevalidator(rule, value, callback) {
    let reg = new RegExp('[\u4E00-\u9FA5]+')
    if(!reg.test(value)){
      callback()
    }else{
      callback('警号格式不对，必须是数字或字母')
    }
  }
}
</script>
<style lang="less" scope>
.el-scrollbar__wrap {
  width: 100%;
}
.screen {
  width: 347px;
  height: 260px;
}
.ant-calendar-picker {
  width: 200px !important;
}
.btns {
  line-height: 1;
}
.btns button {
  height: 30px;
  line-height: 1;
  color: #fff;
  outline: none;
  cursor: pointer;
  border: 0;
  margin-left: 10px;
}
.userm /deep/ .ant-form-item-label {
  width: 73px;
}
.userm /deep/ .ant-form-item-control-wrapper {
  width: 578px;
}
.qrcodemodule /deep/ .ant-modal-body {
  height: 280px;
}
.qrcode {
  img {
    margin: 0 auto;
  }
}
.col--checkbox{
  margin: 0 atuo;
}
</style>