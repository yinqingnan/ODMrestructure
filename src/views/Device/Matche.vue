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
                    <a-form-item label="姓名/警号">
                      <a-input
                        v-decorator="['user', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入姓名/警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="绑定状态">
                      <a-select
                        v-decorator="[
                        'deviceStatus',
                        {
                          initialValue: 'all',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in bindingstatus" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="设备类型">
                      <a-input
                        v-decorator="['deviceType', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入设备类型"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="设备状态">
                      <a-select
                        v-decorator="[
                        'deviceStatusName',
                        {
                          initialValue: 'all',
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
                    <a-form-item label="产品序号">
                      <a-input
                        v-decorator="['code', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入产品序号"
                      >/></a-input>
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
            <a-button @click="add" type="primary" v-isshow="'device:matche:save'">添加</a-button>
            <a-button @click="dlt" type="primary" v-isshow="'device:matche:delete'">删除</a-button>
            <a-button @click="imports" type="primary" v-isshow="'device:matche:import'">导入</a-button>
            <a-button @click="exports" type="primary" v-isshow="'device:matche:export'">导出</a-button>
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
            class="mytable-scrollbar"
          >
            <vxe-table-column type="checkbox" width="60" align="center" />
            
            <vxe-table-column field="code" title="产品序号" show-overflow width="10%" align="center" />
             <vxe-table-column field="deviceType" title="设备类型" show-overflow width="11%" align="center" />
            
            <vxe-table-column field="deptName" title="所属部门" show-overflow width="10%" align="center" />
            <vxe-table-column field="userName" title="姓名/警号" show-overflow width="10%" align="center">
              <template v-slot="{ row }">
                <span v-if="row.userCode">{{row.userName}}({{row.userCode}})</span>
                <span v-else>{{row.userName}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="deviceStatusName" title="设备状态" show-overflow width="10%" align="center" />
            <vxe-table-column field="lastUploadTime" title="最后上传时间" show-overflow width="10%" align="center" />
            <vxe-table-column field="purchasingDate" title="购买日期" show-overflow width="10%" align="center" />
            <vxe-table-column field="warrantyDate" title="保修日期" show-overflow width="10%" align="center" />
            <vxe-table-column field="actions" title="操作" align="center" flexd="right" width="10%">
              <template v-slot="{ row }">
                <span
                  v-isshow="'device:matche:update'"
                  type="text"
                  @click="edit(row)"
                  style="color:#0db8df;cursor: pointer;margin-right:10px"
                >编辑</span>
                <span
                  v-isshow="'device:matche:active'"
                  type="text"
                  @click="Enable(row)"
                  v-if="row.deviceStatusName == '维修'"
                  style="color:#0db8df;cursor: pointer"
                >启用</span>
                <span
                  v-isshow="'device:matche:repair'"
                  type="text"
                  @click="Report(row)"
                  style="color:#0db8df;cursor: pointer;"
                  v-if="row.deviceStatusName != '报废' "
                  v-show="row.deviceStatusName != '维修'"
                >报修</span>
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
      >
        <a-form
          autocomplete="off"
          :form="form2"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          @submit="handleSubmit"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="产品序号">
                <a-input
                  :disabled="Disabled"
                  v-decorator="['code', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }, { validator: codevalidator}] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入产品序号"
                >/></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="设备类型">
                <a-input
                  v-decorator="['deviceType', { initialValue: '', rules: [{ required: true, message: '必填项不能为空' }]}]"
                  :max-length="LimitInputlength"
                  placeholder="请输入设备类型"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="设备状态">
                <a-select
                  v-decorator="[
                        'deviceStatusName',
                        {
                          initialValue: '1',
                           rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择设备状态..."
                >
                  <a-select-option v-for="d in equipmenystate" :key="d.value">{{ d.title }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="所属部门">
                <a-tree-select
                  show-search
                  @change="departmentchange"
                  treeNodeFilterProp="title"
                  v-decorator="[
                        'department',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
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
                  placeholder="请选择所属部门..."
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="姓名/警号">
                <a-select
                  show-search
                  :filterOption="filterOption"
                  v-decorator="[
                        'username',
                        {
                          initialValue: 'no',
                           rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in namelist" :key="d.code">{{ d.nameCode }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="购买日期">
                <a-date-picker
                  allowClear
                  v-decorator="[
                        'purchasedate',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="保修日期">
                <a-date-picker
                  allowClear
                  v-decorator="[
                        'Warrantydate',
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

      <a-modal
        class="addmodal"
        :visible="repairshow"
        title="报修"
        cancelText
        :width="674"
        okText="提交"
        @ok="repairSubmit"
        @cancel="repairCancel"
      >
        <a-form
          autocomplete="off"
          :form="form3"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 16 }"
          @submit="handleSubmit"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="产品序号">
                <a-input
                  :disabled="true"
                  v-decorator="['code', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入产品序号"
                >/></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="所属部门">
                <a-tree-select
                  :disabled="true"
                  show-search
                  @change="departmentchange"
                  treeNodeFilterProp="title"
                  v-decorator="[
                        'department',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
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
                  placeholder="请选择所属部门..."
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="报修人">
                <a-input
                  v-decorator="['Sendrepair', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入报修人"
                >/></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="开始时间">
                <a-date-picker
                  allowClear
                  placeholder="请选择故障开始时间"
                  v-decorator="[
                        'startdate',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="影响民警1">
                <a-input
                  v-decorator="['Influencer1', { initialValue: '',  rules: [{validator:uservalidator}]}]"
                  :max-length="LimitInputlength"
                  placeholder="请输入受影响的民警警号"
                >/></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="影响民警2">
                <a-input
                  v-decorator="['Influencer2', { initialValue: '',  rules: [{validator:uservalidator}] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入受影响的民警警号"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="影响民警3">
                <a-input
                  v-decorator="['Influencer3', { initialValue: '',  rules: [{validator:uservalidator}] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入受影响的民警警号"
                >/></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="影响民警4">
                <a-input
                  v-decorator="['Influencer4', { initialValue: '',  rules: [{validator:uservalidator}] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入受影响的民警警号"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24" />
          </a-row>
          <a-row class="gzms">
            <a-form-item label="故障描述" class="textareatext" :span="4">
              <a-textarea
                :maxLength="textarealength"
                allowClear
                rows="3"
                style="resize: none;"
                placeholder="请输入故障描述（200字符以内）"
                v-decorator="[
                        'describe',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
              />
            </a-form-item>
          </a-row>
        </a-form>
      </a-modal>

      <a-modal v-model="importshow" title="执法仪导入" :width="675"  class="importmodule" @cancel = "importclear">
        <div class="importheader">
          <p>提示：第一次导入的时候请先下载模板，编辑内容后再进行导入操作。</p>
            <div style="display:flex">
              <a-upload :file-list="fileList" :before-upload="beforeUpload" accept=".xls,.xlsx">
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
              <a-divider orientation="left" style="color:#919AA6;font-size:12px">
                失败原因
              </a-divider>
              <p style="padding:0 36px 0 30px" v-html="errormsg">
              </p>
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
import { Component, Vue } from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,
  page,
  layouts,
  pagesize
} from "@/InterfaceVariable/variable"
import moment from "moment"
import axios from "axios"
import { http } from "../../api/interceptors"
@Component({
  components: {},
})
export default class Matche extends Vue {
  [x: string]: any
  public form!: any
  public form2!: any
  public form3!: any
  public pagesize = pagesize
  public DataM = new this.$api.configInterface.DataM()
  public DeviceM = new this.$api.configInterface.DeviceM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private state = ""
  private Title = ""
  private page = page
  private repairshow = false
  private namelist = []
  private departmentData = []
  private importshow = false
  private fileList = []
  private iserror = false
  private errormsg = ""
  private filename = ""
  private errormsg = ""
  private tableColumn = [
    { type: "checkbox", width: 60, fixed: null,align:'center' },
    { field: "code", title: "产品序号" },
    { field: "deviceType", title: "设备类型", width: 80 },
    { field: "deptName", title: "所属部门" },
    { field: "userName", title: "民警姓名" },
    { field: "userCode", title: "民警警号" },
    { field: "deviceStatusName", title: "设备状态" },
    { field: "lastUploadTime", title: "最后上传时间" },
    { field: "purchasingDate", title: "购买日期" },
    { field: "warrantyDate", title: "保修日期" },
  ]
  private layouts = layouts
  private bindingstatus = [
    { id: "0", value: "all", title: "全部" },
    { id: "1", value: "1", title: "已绑定" },
    { id: "2", value: "0", title: "未绑定" },
  ]
  private equipmentstatus = [
    { id: "0", value: "all", title: "全部" },
    { id: "1", value: "1", title: "启用" },
    { id: "2", value: "2", title: "禁用" },
    { id: "3", value: "3", title: "报废" },
    { id: "4", value: "4", title: "维修" },
  ]
  private equipmenystate = [
    { id: "1", value: "1", title: "启用" },
    { id: "2", value: "2", title: "禁用" },
    { id: "3", value: "3", title: "报废" },
  ]
  private editId = "" //编辑时获取的ID
  private Disabled = false
  private visible = false
  private formdata = {}
  private tableData = []

  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
    this.form3 = this.$form.createForm(this)
    this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    let obj = {
      page: 1,
      limit: 15,
    }
    this.gettable(obj)
  }
  public gettable(obj) {
    this.DeviceM.gettabledata(obj).then((res) => {
      this.page.totalResult = parseInt(res.count)
      this.tableData = res.data
    }).catch(err => {
      console.log(err)
    })
  }
  private popup() {
    return
  }
  private getPolicepersonneldata(obj) {
    //获取警员姓名信息
    this.DeviceM.getPolicepersonneldata(obj).then((res) => {
      let obj = {
        code: "no",
        nameCode: "不绑定民警",
      }
      this.namelist = res.data
      this.namelist.unshift(obj)
    })
  }
  private reset() {
    this.form.resetFields()
    this.form2.resetFields()
  }
  private Sval = {
    code:"",
    department:"",
    user:"",
    deviceStatus:"",
    deviceType:"",
    deviceStatusName:"",
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        this.Sval = val
        this.gettable({
          page: 1,
          limit: 15,
          code:val.code,
          deptCode: val.department,
          userCode: val.user,
          isBinding: val.deviceStatus,
          deviceType: val.deviceType,
          deviceStatus: val.deviceStatusName,
        })
      }
    })
  }
  // 添加和编辑事件
  private handleSubmit(e) {
    e.preventDefault()
    this.form2.validateFields((err: any, val: any) => {
      this.formdata = val
      console.log(val)
      if (!err) {
        if (this.state == "添加") {
          console.log(val.deviceStatusName)
          this.Policepersonnelsave({
            code: val.code,
            deptCode: val.department,
            deviceStatus: val.deviceStatusName,
            deviceType: val.deviceType,
            id: "",
            purchasingDate: moment(val.purchasedate, "YYYY-MM-DD"),
            userCode: val.username,
            warrantyDate: moment(val.Warrantydate, "YYYY-MM-DD"),
          })
        } else if (this.state === "编辑") {
          console.log(val.deviceStatusName)
          let str = ''
          if(val.deviceStatusName == '启用'){
            str = '1'
          }else if(val.deviceStatusName == '禁用'){
            str = '2'
          }else if(val.deviceStatusName == '报废'){
            str = '3'
          }else{
            str = val.deviceStatusName
          }
          // console.log(str)
          this.Policepersonnelsave({
            code: val.code,
            deptCode: val.department,
            deviceStatus: str,
            deviceType: val.deviceType,
            id: this.editId,
            purchasingDate: moment(val.purchasedate, "YYYY-MM-DD"),
            userCode: val.username,
            warrantyDate: moment(val.Warrantydate, "YYYY-MM-DD"),
          })
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
    this.getPolicepersonneldata({
      deptCode_equal: row.deptCode,
      source_notequal: 3,
    })
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        code: row.code,
        department: row.deptCode,
        username: row.userCode,
        deviceType: row.deviceType,
        purchasedate: row.purchasingDate,
        Warrantydate: row.warrantyDate,
        deviceStatusName: row.deviceStatusName,
      })
    })
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private Report(row) {
    this.repairshow = true
    this.Disabled = true
    this.$nextTick(() => {
      this.form3.setFieldsValue({
        code: row.code,
        department: row.deptCode,
      })
    })
  }
  private pagerchange({ currentPage, pageSize }) {
    console.log(currentPage, pageSize)
    this.gettable({ 
      page: currentPage, 
      limit: pageSize ,
      code:this.Sval.code,
      deptCode: this.Sval.department,
      userCode: this.Sval.user,
      isBinding: this.Sval.deviceStatus,
      deviceType: this.Sval.deviceType,
      deviceStatus: this.Sval.deviceStatusName,
    })
  }
  private departmentchange(value) {
    console.log(value)
    this.namelist = []
    this.form2.setFieldsValue({
      username: "",
    })
    this.getPolicepersonneldata({ deptCode_equal: value, source_notequal: 3 })
  }
  private add() {
    this.visible = true
    this.Disabled = false
    this.state = "添加"

    this.getPolicepersonneldata({ deptCode_equal: "", source_notequal: 3 })
  }
  private Enable(row) {
    console.log(row)
    this.DeviceM.Enable({
      matcheCode: row.code,
    }).then((res) => {
      if (res.code == 0) {
        this.$message.success(`设备${row.code}启动成功`)
        this.gettable({
          page: 1,
          limit: 15,
        })
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  private dlt() {
    let arr = this.getSelectEvent1()
    if(arr.length > 0 ){
       let dltarr = []
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _that = this
      arr.map((item) => {
        dltarr.push(item.id)
      })
      console.log(dltarr);
      this.$confirm({
        title: "提示",
        content: `确定要删除选中的执法仪吗？`,
          onOk() {
            _that.instrumentdlt(dltarr)
          }
        })
    }else{
      this.$message.error("请选择需要删除的执法仪")
    }
   
   

  }
  private importben() {
    if(this.fileList.length>0){
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
              let str,str1 = ''
              str = res.data.replace(/%n1/g,"&nbsp;")
              str1 = str.replace(/%n2/g,"<br/>")
              if(res.data == 'ok'){
                this.importshow = false
                this.iserror = false
                this.fileList = []
                this.filename =""
                this.$message.success('导入成功')
              }else{
                this.iserror = true
                this.errormsg = str1
              }
            })
    }else{
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
  private importclear(){
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
    if(file.type === "application/vnd.ms-excel"){
        this.filename = file.name
        this.fileList = [file]
        return false
    }else{
      this.$message.error("文件类型错误，仅支持.xls 和 .xlsx 类型的文件")
    }
  }
  private exports() {
    (this.$refs.zhifayi as any).exportData({
      filename: "执法仪",
      sheetName: "Sheet1",
      type: "xlsx",
      message:false,
      columnFilterMethod ({ column }) {
        return ['code','deviceType','deviceType','deptName','userName','deviceStatusName','lastUploadTime','purchasingDate','warrantyDate'].includes(column.property)
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
          page: 1,
          limit: 15,
          code:this.Sval.code,
          deptCode: this.Sval.department,
          userCode: this.Sval.user,
          isBinding: this.Sval.deviceStatus,
          deviceType: this.Sval.deviceType,
          deviceStatus: this.Sval.deviceStatusName,
        })
      }
    })
  }
  private Policepersonnelsave(obj) {
    this.DeviceM.Policepersonnelsave(obj).then((res) => {
      console.log(res)
      if (res.code == 0) {
          this.visible = false
        this.gettable({
          page: 1,
          limit: 15,
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
  private repairSubmit(e) {
    console.log("tijiao")
    e.preventDefault()
    this.form3.validateFields((err: any, val: any) => {
      if (!err) {
        this.DeviceM.Sendforrepair({
          Id: "",
          affectUser1Code: val.Influencer1,
          affectUser2Code: val.Influencer2,
          affectUser3Code: val.Influencer3,
          affectUser4Code: val.Influencer4,
          deptCode: val.department,
          matcheCode: val.code,
          repairsDesc: val.describe,
          reportTime: moment(val.startdate).format("YYYY-MM-DD HH:mm:ss"),
          reportUserCode: val.Sendrepair,
        }).then((res) => {
          console.log(res)
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.repairCancel()
            this.form3.resetFields()
            this.gettable({
              page: 1,
              limit: 15,
              code:this.Sval.code,
              deptCode: this.Sval.department,
              userCode: this.Sval.user,
              isBinding: this.Sval.deviceStatus,
              deviceType: this.Sval.deviceType,
              deviceStatus: this.Sval.deviceStatusName,
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  private repairCancel() {
    this.repairshow = false
    this.form3.resetFields()
  }
  private codevalidator(rule, value, callback) {
  let reg = new RegExp('[\u4E00-\u9FA5]+')
  if(!reg.test(value)){
    callback()
  }else{
    callback('格式不正确，必须是数字或字母')
  }
  }
  private uservalidator(rule , value, callback){
    console.log(value)
    let obj = this.form3.getFieldsValue(['Influencer1','Influencer2','Influencer3','Influencer4'])
    let ary = [obj.Influencer1,obj.Influencer2,obj.Influencer3,obj.Influencer4]
    let nary=ary.sort();
    let state = true
    for(var i=0;i<ary.length;i++){
        if (nary[i] && nary[i+1] && nary[i]==nary[i+1]){
          state= false
        }
    }
    if(!state){
      callback('警员信息重复')
    }else{
      callback()
    }
    state = true

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
.addmodal /deep/ .ant-col-12 {
  height: 60px;
}
.addmodal /deep/ .ant-calendar-picker-input {
  width: 200px;
}
.gzms /deep/ .ant-form-item-label {
  width: 100px;
}
.gzms /deep/ .ant-form-item-control-wrapper {
  width: 524px;
}
.textareatext{
  display: flex;
}
</style>
