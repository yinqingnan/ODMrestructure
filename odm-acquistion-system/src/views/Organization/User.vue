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
                    <a-form-item label="姓名/警号">
                      <a-input
                        v-decorator="['username', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入民警姓名或警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="角色">
                      <a-select
                        v-decorator="[
                        'role',
                        {
                          initialValue: undefined,
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in Account" :key="d.value">{{ d.name }}</a-select-option>
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
            <a-button
              @click="add"
              type="primary"
              v-isshow="'base:user:save'"
              :disabled="StandaloneMode"
            >添加</a-button>
            <a-button
              @click="dlt"
              type="primary"
              v-isshow="'base:user:delete'"
              :disabled="StandaloneMode"
            >删除</a-button>
            <a-button
              @click="imports"
              type="primary"
              v-isshow="'base:user:import'"
              :disabled="StandaloneMode"
            >导入</a-button>
            <a-button @click="exports" type="primary" v-isshow="'base:user:export'">导出</a-button>
            <a-button
              @click="Resetpwd"
              type="primary"
              v-isshow="'base:user:resetPassword'"
              :disabled="StandaloneMode"
            >重置密码</a-button>
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
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            :sort-config="{trigger: 'cell', defaultSort: {field: 'id', order: 'desc'}, orders: ['desc', 'asc']}"
            @sort-change="sortChangeEvent"
          >
            <vxe-table-column type="checkbox" width="60" align="center" fixed="left" />
            <vxe-table-column
              field="name"
              title="姓名"
              show-overflow
              align="center"
              minWidth="100"
              sortable
            />
            <vxe-table-column
              field="code"
              title="警号"
              show-overflow
              align="center"
              minWidth="100"
              sortable
            />
            <vxe-table-column field="gender" title="性别" show-overflow align="center" minWidth="60" />
            <vxe-table-column
              field="roleNames"
              title="用户角色"
              show-overflow
              align="center"
              minWidth="100"
            />
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
            <vxe-table-column title="操作" show-overflow align="center" minWidth="80" fixed="right">
              <template v-slot="{ row }">
                <span
                  type="text"
                  @click="edit(row)"
                  style="color:#0db8df;cursor: pointer;"
                  v-isshow="'base:user:save'"
                  :style="{display:StandaloneMode? 'none': 'block'}"
                >编辑</span>
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
        :visible="visible"
        :title="str"
        cancelText
        :width="700"
        okText="保存"
        @ok="repairSubmit"
        @cancel="repairCancel"
        :keyboard="false"
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
                  v-decorator="['name', { initialValue: '',  rules: [{ required: true, message: '请输入民警姓名' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入民警姓名"
                >/></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="警号">
                <a-input
                  :disabled="codedisabled"
                  v-decorator="['code', 
                  { initialValue: '',
                    rules: [
                    { required: true, message: '请输入警号' },
                    { validator: codevalidator}
                    ],validateTrigger: 'blur'
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
              <a-form-item label="性别">
                <a-radio-group
                  v-decorator="['gender', { initialValue: '男',  rules: [{ required: true, message: '必填项不能为空' ,}] }]"
                  :max-length="LimitInputlength"
                >
                  <a-radio value="男">男</a-radio>
                  <a-radio value="女">女</a-radio>
                </a-radio-group>
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
                          rules: [{ required: true, message: '请选择用户角色' }]
                        }
                      ]"
                  :allow-clear="true"
                  :filterOption="filterOption"
                  style="width: 100%"
                  placeholder="请选择用户角色..."
                >
                  <a-select-option v-for="d in Account" :key="d.value">{{ d.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="身份证号">
                <a-input
                  v-decorator="['identity', { initialValue: '',  rules: [
                    {validator:validatorID}
                  ],validateTrigger: 'blur'  }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入身份证号"
                >/></a-input>
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
          <a-row class="userm">
            <a-form-item label="备注" class="textareatext" :span="4">
              <a-textarea
                :maxLength="textarealength"
                allowClear
                rows="3"
                style="resize: none;"
                placeholder="请输入备注（200字符以内）"
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
      <a-modal
        v-model="importshow"
        title="用户导入"
        :width="675"
        class="importmodule"
        @cancel="importclear"
        :keyboard="false"
      >
        <div class="importheader">
          <p>提示：第一次导入的时候请先下载模板，编辑内容后再进行导入操作。</p>
          <div style="display:flex">
            <a-upload :file-list="fileList" :before-upload="beforeUpload" accept=".xls">
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
            <el-scrollbar style="height:220px">
              <p style="padding:0 36px 0 30px" v-html="errormsg"></p>
            </el-scrollbar>
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
import {
  layouts,
  LimitInputlength,
  page,
  textarealength
} from "@/InterfaceVariable/variable"
import axios from "axios"
import { http } from "../../api/interceptors"
import { namespace } from "vuex-class"
const Test = namespace("Test")
@Component({
  components: {}
})
export default class User extends Vue {
  // todo变量
  [x: string]: any
  public StandaloneMode = false
  public form!: any
  public form1!: any
  public DataM = new this.$api.configInterface.DataM()
  public OrganizationM = new this.$api.configInterface.OrganizationM()
  private Account = []
  private maxTagCount = 2
  private maxTagTextLength = 2
  private visible = false
  private str = ""
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private tableData = []
  private layouts = layouts
  private QRshow = false
  private deptCode = ""
  private name = ""
  private code = ""
  private role = ""
  private deptCodeData = []
  // private userroleData = []
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
  private formdatalist = {
    page: this.page.currentPage,
    size: this.page.pageSize,
    name: "",
    role: "",
    sidx: "name",
    order: "desc"
  }
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
    this.gettabledata(this.formdatalist)
    this.StandaloneMode = JSON.parse(localStorage.getItem("user"))!.openCloud
  }
  // todo事件
  private tableRowClassName(record) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private gettabledata(obj) {
    this.OrganizationM.getusertable(obj).then((res) => {
      console.log(res)
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }

  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let obj = {
      page: currentPage,
      size: pageSize,
      name: this.name,
      role: this.role
    }
    this.OrganizationM.getusertable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private getdata() {
    this.OrganizationM.roleselect().then((res) => {
      this.Account = res.data
    })
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        this.name = val.username
        this.role = val.role
        let obj = {
          page: this.page.currentPage,
          size: this.page.pageSize,
          user: val.username,
          roleId: val.role,
          sidx: "code",
          order: "desc"
        }
        this.gettabledata(obj)
      }
    })
  }
  private reset() {
    this.name = ""
    this.role = ""
    this.form.resetFields()
  }
  // 获取选中
  private getSelectEvent1() {
    let selectRecords = (this.$refs.usertable as any).getCheckboxRecords()
    return selectRecords
  }
  // 添加
  private add() {
    this.str = "添加用户"
    this.visible = true
    this.status = "新增"
    this.codedisabled = false
    this.form1.resetFields()
  }

  // 重置密码
  private Resetpwd() {
    let arr = this.getSelectEvent1()
    console.log(arr.length)

    let newarr = []
    if (arr.length) {
      arr.map((el) => {
        newarr.push(el.id)
      })
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _that = this
      this.$confirm({
        title: "提示",
        content: "你确定将用户密码重置为警号吗？",
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            _that.OrganizationM.userresetpwd(newarr).then((res) => {
              _that.$message.info(res.msg)
            })
          }).catch(() => console.log("Oops errors!"))
        }
      })
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
    let url = window.gurl.SERVICE_CONTEXT_PATH
    let obj = {
      name: this.name,
      roleId: this.role
    }
    axios
      .get(`${url}user/export`, {
        params: obj,
        headers: {
          Token: localStorage.getItem("token")
        },
        responseType: "blob"
      })
      .then((res) => {
        console.log(res)

        const aLink = document.createElement("a")
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" })
        if (navigator.msSaveBlob) {
          // IE10+
          window.navigator.msSaveOrOpenBlob(blob, `用户管理.xls`)
        } else {
          aLink.href = URL.createObjectURL(blob)
          aLink.setAttribute("download", "用户管理" + ".xls")
          aLink.click()
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
                    page: _that.page.currentPage,
                    size: _that.page.pageSize,
                    name: _that.name,
                    role: _that.role,
                    sidx: "code",
                    order: "desc"
                  })
                } else {
                  _that.$message.error(res.msg)
                }
              })
            }).catch(() => console.log("Oops errors!"))
          }
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
                    page: _that.page.currentPage,
                    size: _that.page.pageSize,
                    name: _that.name,
                    role: _that.role,
                    sidx: "code",
                    order: "desc"
                  })
                } else {
                  _that.$message.error(res.msg)
                }
              })
            }).catch(() => console.log("Oops errors!"))
          }
        })
      }
    } else {
      this.$message.error("请选择需要操作的用户")
    }
  }
  private repairSubmit(e) {
    e.preventDefault()
    this.form1.validateFields((err: any, val: any) => {
      console.log(val)

      if (!err) {
        let obj = {
          id: this.status === "新增" ? "" : this.id,
          code: val.code,
          name: val.name,
          gender: val.gender,
          phone: val.phone,
          identity: val.identity,
          remark: val.remarks,
          roleIds: val.rolename
        }
        this.OrganizationM.usersave(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.visible = false
            this.gettabledata({
              page: this.page.currentPage,
              size: this.page.pageSize,
              name: this.name,
              role: this.role,
              sidx: "id",
              order: "desc"
            })
          } else {
            this.$message.error(res.msg)
          }
        })
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
    this.$nextTick(() => {
      this.form1.setFieldsValue({
        roleName: null,
        gender: row.gender,
        phone: row.phone,
        identity: row.identity,
        rolename: row.roleIds,
        remarks: row.remark,
        name: row.name,
        code: row.code
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
  private repairCancel() {
    this.visible = false
  }
  private importclear() {
    this.filename = ""
    this.fileList = []
    this.iserror = false
  }
  private beforeUpload(file) {
    if (file.type === "application/vnd.ms-excel") {
      this.filename = file.name
      this.fileList = [file]
      return false
    } else {
      this.$message.error("文件类型错误，仅支持.xls")
    }
  }
  private downloadtemplate() {
    //下载本地文件
    let downloadUrl = `${process.env.BASE_URL}template/用户导入模板.xls`
    window.location.href = downloadUrl
  }
  private importben() {
    if (this.fileList.length > 0) {
      let formData = new FormData() //保存文件后再保存
      formData.append("file", this.fileList[0])
      axios
        .post(http + "user/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: localStorage.getItem("token")
          }
        })
        .then((res) => {
          console.log(res)
          let str,
            str1 = ""
          str = res.data.msg.replace(/%n1/g, "&nbsp;")
          str1 = str.replace(/%n2/g, "<br/>")
          if (res.data.code == 0) {
            this.importshow = false
            this.iserror = false
            this.fileList = []
            this.filename = ""
            this.$message.success("导入成功")
            this.gettabledata({
              page: this.page.currentPage,
              size: this.page.pageSize,
              name: this.name,
              role: this.role,
              sidx: "id",
              order: "disc"
            })
          } else {
            this.iserror = true
            this.errormsg = str1
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
  private phonevalidator(rule, value, callback) {
    let reg = new RegExp("^[0-9]*$")
    if (!value) {
      callback()
    } else if (reg.test(value)) {
      callback()
    } else {
      callback("必须为数字")
    }
  }

  private validatorID(rule, value, callback) {
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if(value.length == 0){
      callback()
    }else{
      if (reg.test(value)) {
        callback()
      } else {
        callback("身份证格式不对")
      }
    }
   
  }
  private codevalidator(rule, value, callback) {
    let reg = /^[A-Za-z0-9]{6,30}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback("警号格式不对，必须是数字或字母")
    }
  }
  private sortChangeEvent({ column, property, order }) {
    this.tableData = []
    let obj = {
      page: this.page.currentPage,
      size: this.page.pageSize,
      user: this.username,
      roleId: this.role,
      sidx: property,
      order: order
    }
    this.gettabledata(obj)
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
.userm{
.ant-form-item-label {
  width: 74px;
}
}  
.userm {
  .ant-form-item-control-wrapper {
  width: 578px;
}
}
.col--checkbox {
  margin: 0 atuo;
}
</style>