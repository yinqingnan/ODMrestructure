<template>
  <!-- 执法仪 -->
  <div>
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
                <a-icon type="down"/>
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
                    <a-form-item label="产品序号">
                      <a-input
                          v-decorator="['code', { initialValue: '', rules: [] }]"
                          :max-length="LimitInputlength"
                          placeholder="请输入产品序号"
                      >/>
                      </a-input>
                    </a-form-item>
                    <a-form-item label="厂商">
                      <a-select
                          v-decorator="[
                        'brand',
                        {
                          initialValue: undefined,
                          rules: []
                        }
                      ]"
                          :allow-clear="true"
                          style="width: 100%"
                          placeholder="请选择..."
                      >
                        <a-select-option v-for="d in brandstatus" :key="d.value">{{ d.name }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="执法仪型号">
                      <a-select
                          v-decorator="[
                        'model',
                        {
                          initialValue: undefined,
                          rules: []
                        }
                      ]"
                          :allow-clear="true"
                          style="width: 100%"
                          placeholder="请选择..."
                      >
                        <a-select-option v-for="d in Equipmentmodel" :key="d.value">{{ d.name }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="设备状态">
                      <a-select
                          v-decorator="[
                        'is_enabled',
                        {
                          initialValue: undefined,
                          rules: []
                        }
                      ]"
                          :allow-clear="true"
                          style="width: 100%"
                          placeholder="请选择..."
                      >
                        <a-select-option v-for="d in equipmentstatus" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="绑定状态">
                      <a-select
                          v-decorator="[
                        'is_binding',
                        {
                          initialValue:undefined,
                          rules: []
                        }
                      ]"
                          :allow-clear="true"
                          style="width: 100%"
                          placeholder="请选择..."
                      >
                        <a-select-option v-for="d in is_bindingstatus" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="姓名/警号">
                      <a-input
                          v-decorator="['user', { initialValue: '', rules: [] }]"
                          :max-length="LimitInputlength"
                          placeholder="请输入姓名/警号"
                      >/>
                      </a-input>
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
                v-isshow="'core:recorder:save'"
                :disabled="StandaloneMode"
            >添加
            </a-button>
            <a-button
                @click="dlt"
                type="primary"
                v-isshow="'core:recorder:delete'"
                :disabled="StandaloneMode"
            >删除
            </a-button>
            <a-button
                @click="imports"
                type="primary"
                v-isshow="'core:recorder:import'"
                :disabled="StandaloneMode"
            >导入
            </a-button>
            <a-button @click="exports" type="primary" v-isshow="'core:recorder:export'">导出</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
              border
              resizable
              height="auto"
              :data="tableData"
              header-align="center"
              ref="zhifayi"
              show-header-overflow
              highlight-hover-row
              :row-class-name="tableRowClassName"
              :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
              class="mytable-scrollbar"
              :sort-config="{trigger: 'cell', defaultSort: {field: '', order: 'desc'}, orders: ['desc', 'asc']}"
              @sort-change="sortChangeEvent"
          >
            <vxe-table-column type="checkbox" width="60" align="center"/>
            <vxe-table-column
                field="code"
                title="产品序号"
                show-overflow
                width="10%"
                align="center"
                sortable
            />
            <vxe-table-column
                field="brand"
                title="厂商"
                show-overflow
                width="11%"
                align="center"
                sortable
            />

            <vxe-table-column
                field="modelName"
                title="执法仪型号"
                show-overflow
                width="10%"
                align="center"
                sortable
            />
            <vxe-table-column
                field="userName"
                title="姓名/警号"
                show-overflow
                width="10%"
                align="center"
                sortable
            >
              <template v-slot="{ row }">
                <span v-if="row.userCode">{{ row.userName }}({{ row.userCode }})</span>
                <span v-else>{{ row.userName }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
                field="deviceStatusName"
                title="设备状态"
                show-overflow
                width="10%"
                align="center"
                sortable
            />
            <vxe-table-column
                field="lastUploadTime"
                title="最后上传时间"
                show-overflow
                width="10%"
                align="center"
                sortable
            />
            <vxe-table-column
                field="purchaseDate"
                title="购买日期"
                show-overflow
                width="10%"
                align="center"
                sortable
            />
            <vxe-table-column
                field="warrantyDate"
                title="保修日期"
                show-overflow
                width="10%"
                align="center"
                sortable
            />
            <vxe-table-column field="actions" title="操作" align="center" flexd="right" width="10%">
              <template v-slot="{ row }">
                <span
                    v-isshow="'core:recorder:save'"
                    @click="edit(row)"
                    style="color:#0db8df;cursor: pointer;margin-right:10px"
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
                :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
                :current-page.sync="page.currentPage"
                :page-size.sync="page.pageSize"
                :total="page.totalResult"
                :page-sizes="[15, 50, 100, 200]"
                @page-change="pagerchange"
            />
          </p>
        </div>
      </div>

      <a-modal
          class="addmodal"
          :title="state"
          :visible="visible"
          cancelText
          okText="保存"
          :width="674"
          @ok="handleSubmit"
          @cancel="handleCancel"
          :keyboard="false"
      >
        <a-form
            autocomplete="off"
            :form="form2"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
            @submit="handleSubmit"
            class="matchadd"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="产品序号" class="serialnum">
                <a-input
                    :disabled="Disabled"
                    v-decorator="['code', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }, { validator: codevalidator}],validateTrigger: 'blur'  }]"
                    :max-length="LimitInputlength"
                    placeholder="请输入产品序号"
                >/>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="厂商">
                <a-select
                    v-decorator="[
                        'brand',
                        {
                          initialValue: brandstatus[0].value ,
                          rules: [{ required: true, message: '请选择厂商' }]
                        }
                      ]"
                    :allow-clear="true"
                    style="width: 100%"
                    placeholder="请选择..."
                >
                  <a-select-option v-for="d in brandstatus" :key="d.value">{{ d.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="执法仪型号">
                <a-select
                    v-decorator="[
                        'model',
                        {
                          initialValue: Equipmentmodel[0].value ,
                           rules: [{ required: true, message: '请选择执法仪型号' }]
                        }
                      ]"
                    :allow-clear="true"
                    style="width: 100%"
                    placeholder="请选择..."
                >
                  <a-select-option v-for="d in Equipmentmodel" :key="d.value">{{ d.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="设备状态">
                <a-select
                    v-decorator="[
                        'is_enabled',
                        {
                          initialValue: EIPstatus[0].value || '',
                           rules: [{ required: true, message: '请选择执法仪型号' }]
                        }
                      ]"
                    :allow-clear="true"
                    style="width: 100%"
                    placeholder="请选择..."
                >
                  <a-select-option v-for="d in EIPstatus" :key="d.value">{{ d.title }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="姓名/警号">
                <a-select
                    v-decorator="[
                        'usercode',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                    :allow-clear="true"
                    style="width: 100%"
                    placeholder="请选择..."
                >
                  <a-select-option v-for="d in usercodelist" :key="d.value">{{ d.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="购买日期" class="defaultpicker">
                <a-date-picker
                    allowClear
                    v-decorator="[
                        'purchasedate',
                        {
                          initialValue: '',
                         // rules: [{ validator: purchasedator}]
                        }
                      ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="保修日期" class="defaultpicker">
                <a-date-picker
                    allowClear
                    v-decorator="[
                        'warrantydate',
                        {
                          initialValue: '',
                        }
                      ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
      <a-modal
          v-model="importshow"
          title="执法仪导入"
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
                <a-icon type="upload"/>
                选择文件上传
              </a-button>
            </a-upload>
            <a-button @click="downloadtemplate" style="margin-left:9px">下载模板</a-button>
          </div>
          <h2>{{ filename || "" }}</h2>
        </div>
        <div class="importfooter">
          <div v-if="iserror">
            <a-divider orientation="left" style="color:#919AA6;font-size:12px">失败原因</a-divider>
            <el-scrollbar style="height:214px">
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
import {Component, Vue} from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,
  layouts,
  pagesize
} from "@/InterfaceVariable/variable"
import moment, {Moment} from "moment"
import axios from "axios"
import {http} from "@/api/interceptors"
import {namespace} from "vuex-class"

const Test = namespace("Test")
@Component({
  components: {}
})
export default class Matche extends Vue {
  [x: string]: any

  // @Test.State((state) => state.StandaloneMode)
  // StandaloneMode!: boolean
  public StandaloneMode = false
  public form!: any
  public form2!: any
  public form3!: any
  public pagesize = pagesize
  public DataM = new this.$api.configInterface.DataM()
  public DeviceM = new this.$api.configInterface.DeviceM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private state = ""
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private namelist = []
  private importshow = false
  private fileList = []
  private iserror = false
  private filename = ""
  private errormsg = ""
  private layouts = layouts
  private brandstatus = [{value: "", name: ""}]
  private Equipmentmodel = [{value: "", name: ""}]
  private equipmentstatus = [
    {id: "0", value: "all", title: "全部"},
    {id: "2", value: "1", title: "启用"},
    {id: "1", value: "2", title: "禁用"},
  ]
  private EIPstatus = [
    {id: "2", value: "1", title: "启用"},
    {id: "1", value: "2", title: "禁用"},
  ]
  private is_bindingstatus = [
    {id: "0", value: "all", title: "全部"},
    {id: "1", value: "true", title: "已绑定"},
    {id: "2", value: "false", title: "未绑定"}
  ]
  private usercodelist = []
  private editId = "" //编辑时获取的ID
  private Disabled = false
  private visible = false
  private tableData = []

  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
    this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    this.StandaloneMode = JSON.parse(localStorage.getItem("user"))!.openCloud
  }

  private getdata() {
    let obj = {
      page: this.page.currentPage,
      limit: this.page.pageSize,
      order: "desc",
      sidx: "id"
    }
    this.gettable(obj)
    this.DeviceM.Equipmentmodel().then((res) => {
      if (res.data.length > 0) {
        this.Equipmentmodel = res.data
      }
    })
    this.DeviceM.deviceBrandSelect().then((res) => {
      if (res.data.length > 0) {
        this.brandstatus = res.data
      }
    })
    this.DeviceM.RoleSelect().then((res) => {
      let obj = {
        name: "不绑定警员",
        value: ""
      }
      this.usercodelist = res.data
      this.usercodelist.unshift(obj)
    })
  }

  public gettable(obj) {
    this.DeviceM.gettabledata(obj)
      .then((res) => {
        this.page.totalResult = parseInt(res.count)
        this.tableData = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  }

  private popup() {
    return
  }

  private reset() {
    this.form.resetFields()
    this.form2.resetFields()
  }

  private Sval = {
    code: "",
    model: "",
    is_enabled: "",
    is_binding: "",
    user: "",
    brand: ""
  }

  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          code_equal: val.code,
          model_equal: val.model,
          deviceStatus_equal: val.is_enabled,
          is_binding: val.is_binding,
          user: val.user,
          brand_equal: val.brand
        }
        if (val.is_enabled === "all") {
          delete obj["deviceStatus_equal"]
        }
        if (val.is_binding === "all") {
          delete obj["is_binding"]
        }
        console.log(obj)
        this.gettable(obj)
      }
    })
  }

  // 添加和编辑事件
  private handleSubmit(e) {
    e.preventDefault()
    this.form2.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(this.state == "添加" ? "" : this.editId)
        if (val.purchasedate == "" && val.warrantydate == "") {
          this.Policepersonnelsave({
            brand: val.brand,
            code: val.code,
            model: val.model,
            deviceStatus: val.is_enabled,
            id: this.state == "添加" ? "" : this.editId,
            userCode: val.usercode,
            purchaseDate:
                val.purchasedate == ""
                  ? null
                  : val.purchasedate.format("YYYY-MM-DD"),
            warrantyDate:
                val.warrantydate == ""
                  ? null
                  : val.warrantydate.format("YYYY-MM-DD")
          })
        } else if (val.purchasedate == "" && val.warrantydate != "") {
          this.Policepersonnelsave({
            brand: val.brand,
            code: val.code,
            model: val.model,
            deviceStatus: val.is_enabled,
            id: this.state == "添加" ? "" : this.editId,
            userCode: val.usercode,
            purchaseDate:
                val.purchasedate == ""
                  ? null
                  : val.purchasedate.format("YYYY-MM-DD"),
            warrantyDate:
                val.warrantydate == ""
                  ? null
                  : val.warrantydate.format("YYYY-MM-DD")
          })
        } else if (val.warrantydate == "" && val.purchasedate != "") {
          this.Policepersonnelsave({
            brand: val.brand,
            code: val.code,
            model: val.model,
            deviceStatus: val.is_enabled,
            id: this.state == "添加" ? "" : this.editId,
            userCode: val.usercode,
            purchaseDate:
                val.purchasedate == ""
                  ? null
                  : val.purchasedate.format("YYYY-MM-DD"),
            warrantyDate:
                val.warrantydate == ""
                  ? null
                  : val.warrantydate.format("YYYY-MM-DD")
          })
        } else {
          if (val.purchasedate.isBefore(val.warrantydate)) {
            this.Policepersonnelsave({
              brand: val.brand,
              code: val.code,
              model: val.model,
              deviceStatus: val.is_enabled,
              id: this.state == "添加" ? "" : this.editId,
              userCode: val.usercode,
              purchaseDate:
                  val.purchasedate == ""
                    ? null
                    : val.purchasedate.format("YYYY-MM-DD"),
              warrantyDate:
                  val.warrantydate == ""
                    ? null
                    : val.warrantydate.format("YYYY-MM-DD")
            })
          } else {
            this.$message.error("保修时间应大于购买时间")
          }
        }
      }
    })
  }

  private filterOption(input, option) {
    return (
      option.componentOptions.children[0].text
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    )
  }

  // 编辑
  private edit(row) {
    this.visible = true
    this.state = "编辑"
    this.Disabled = true
    this.editId = row.id
    console.log(row)
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        code: row.code,
        brand: row.brand,
        model: row.model,
        is_enabled: row.deviceStatus + "",
        usercode: row.userCode,
        purchasedate: row.purchaseDate == null ? "" : moment(row.purchaseDate),
        warrantydate: row.warrantyDate == null ? "" : moment(row.warrantyDate)
      })
    })
  }

  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }

  private pagerchange({currentPage, pageSize}) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    this.gettable({
      page: this.page.currentPage,
      limit: this.page.pageSize,
      code_equal: this.Sval.code,
      model_equal: this.Sval.model,
      is_enabled_equal: this.Sval.is_enabled,
      is_binding_equal: this.Sval.is_binding,
      user: this.Sval.user,
      brand_equal: this.Sval.brand
    })
  }

  private add() {
    this.visible = true
    this.Disabled = false
    this.state = "添加"
    this.editId = ""
  }

  private dlt() {
    let arr = this.getSelectEvent1()
    if (arr.length > 0) {
      let dltarr = []
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _that = this
      arr.map((item) => {
        dltarr.push(item.id)
      })
      console.log(dltarr)
      this.$confirm({
        title: "提示",
        content: `确定要删除选中的执法仪吗？`,
        onOk() {
          _that.instrumentdlt(dltarr)
        }
      })
    } else {
      this.$message.error("请选择需要删除的执法仪")
    }
  }

  private importben() {
    if (this.fileList.length > 0) {
      let formData = new FormData() //保存文件后再保存
      formData.append("file", this.fileList[0])
      axios
        .post(http + "recorder/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: localStorage.getItem("token")
          }
        })
        .then((res: any) => {
          let str = ""
          str = res.data.msg.replace(/%n1/g, "&nbsp;")
          if (res.data.code == 0) {
            this.importshow = false
            this.iserror = false
            this.fileList = []
            this.filename = ""
            this.$message.success("导入成功")
            this.gettable({
              page: this.page.currentPage,
              limit: this.page.pageSize,
              code_equal: this.Sval.code,
              model_equal: this.Sval.model,
              is_enabled_equal: this.Sval.is_enabled,
              is_binding_equal: this.Sval.is_binding,
              user: this.Sval.user,
              brand_equal: this.Sval.brand
            })
          } else {
            this.iserror = true
            this.errormsg = str
          }
        })
    } else {
      this.$message.error("未选择文件")
    }
  }

  private imports() {
    this.importshow = true
  }

  private selectfile() {
    this.filename = ""
    this.fileList = []
    this.iserror = false
  }

  private importclear() {
    this.filename = ""
    this.fileList = []
    this.iserror = false
  }

  private downloadtemplate() {
    //下载本地文件
    let downloadUrl = `${process.env.BASE_URL}template/执法仪导入模板.xls`
    window.location.href = downloadUrl
  }

  private beforeUpload(file) {
    if (file.type === "application/vnd.ms-excel") {
      this.filename = file.name
      this.fileList = [file]
      return false
    } else {
      this.$message.error("文件类型错误，仅支持.xls ")
    }
  }

  private exports() {
    let url = window.gurl.SERVICE_CONTEXT_PATH
    let obj = {
      code: this.Sval.code,
      model: this.Sval.model,
      user: this.Sval.user,
      brand: this.Sval.brand,
      is_enabled: this.Sval.is_enabled,
      is_binding: this.Sval.is_binding
    }
    axios
      .get(`${url}recorder/export`, {
        params: obj,
        headers: {
          Token: localStorage.getItem("token")
        },
        responseType: "blob"
      })
      .then((res) => {
        let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
        if (navigator.msSaveBlob) {
          // IE10+
          window.navigator.msSaveOrOpenBlob(blob, `执法仪.xls`)
        } else {
          const aLink = document.createElement("a")
          aLink.href = URL.createObjectURL(blob)
          aLink.setAttribute("download", "执法仪" + ".xls")
          aLink.click()
        }
      })
  }

  private getSelectEvent1() {
    let selectRecords = (this.$refs.zhifayi as any).getCheckboxRecords()
    return selectRecords
  }

  private instrumentdlt(arr) {
    this.DeviceM.instrumentdlt(arr).then((res) => {
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.gettable({
          page: this.page.currentPage,
          limit: this.page.pageSize,
          code: this.Sval.code,
          model: this.Sval.model,
          user: this.Sval.user,
          brand: this.Sval.brand,
          is_enabled: this.Sval.is_enabled,
          is_binding: this.Sval.is_binding
        })
      }
    })
  }

  private Policepersonnelsave(obj) {
    this.DeviceM.Policepersonnelsave(obj).then((res) => {
      if (res.code == 0) {
        this.visible = false
        this.gettable({
          page: this.page.currentPage,
          limit: this.page.pageSize,
          code: this.Sval.code,
          model: this.Sval.model,
          user: this.Sval.user,
          brand: this.Sval.brand,
          is_enabled: this.Sval.is_enabled,
          is_binding: this.Sval.is_binding,
          order: "desc",
          sidx: "id"
        })
        this.$message.success(res.msg)
        this.reset()
      } else {
        this.$message.error(res.msg)
      }
    })
  }

  private handleCancel(e) {
    this.reset()
    this.visible = false
  }

  private codevalidator(rule, value, callback) {
    let reg = /^[A-Za-z0-9]{6,30}$/
    if (reg.test(value)) {
      callback()
    } else {
      callback("格式不正确，必须是数字或字母")
    }
  }

  private sortChangeEvent({column, property, order}) {
    this.tableData = []
    if (property === "modelName") property = "model"
    if (property === "userName") property = "user_code"
    if (property === "deviceStatusName") property = "is_binding"
    this.gettable({
      page: this.page.currentPage,
      limit: this.page.pageSize,
      code: this.Sval.code,
      model: this.Sval.model,
      user: this.Sval.user,
      brand: this.Sval.brand,
      is_enabled: this.Sval.is_enabled,
      is_binding: this.Sval.is_binding,
      order: order,
      sidx: property
    })
  }

  // private purchasedator(rule, value, callback) {
  //   console.log(value)
  //   if (value == "") {
  //     callback()
  //   }
  // }
  // private warrantydator(rule, value, callback) {
  //   console.log(value)
  //   if (value == "") {
  //     callback()
  //   }
  // }
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

.btns {
  display: flex;

  button {
    // width: 58px;
    height: 30px;
    line-height: 1;
    color: #fff;
    background: #207ebd;
    outline: none;
    cursor: pointer;
    border: 0;
    margin-left: 10px;
  }
}

#EvalRecord .ant-modal-body {
  height: 400px;
}

.addmodal {
  .ant-col-12 {
    height: 60px;
  }
}

.addmodal {
  .ant-calendar-picker-input {
    width: 200px;
  }
}

.gzms {
  .ant-form-item-label {
    width: 100px;
  }
}

.gzms {
  .ant-form-item-control-wrapper {
    width: 524px;
  }
}

.textareatext {
  display: flex;
}

.serialnum {
  .ant-form-item-label {
    width: 76px;
  }

  .ant-form-item-control-wrapper {
    width: 524px;
  }
}

.defaultpicker {
  .ant-calendar-picker-clear,
  .ant-calendar-picker-icon {
    right: 40px;
  }
}

.matchadd {
  .ant-form-item-label {
    width: 94px;
  }
}
</style>
