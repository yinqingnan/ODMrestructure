<template>
  <div>
    <!-- 升级管理 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div
          class="contaninerheader"
          style="padding:12px 25px 0 25px;display:flex;justify-content: flex-end;"
        >
          <div class="accessbtn">
            <a-button
              type="primary"
              @click="Uploadpackage"
              v-isshow="'core:upgrade:recorderPackage'"
            >上传升级包</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            border
            resizable
            height="auto"
            ref="Acquisitionstation"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column
              field="brandName"
              title="厂商"
              show-overflow
              align="center"
              minWidth="160"
            >
              <!-- <template v-slot="{ row }">{{upgradeType(row)}}</template> -->
            </vxe-table-column>
            <vxe-table-column
              field="model"
              title="执法仪型号"
              show-overflow
              align="center"
              minWidth="160"
            >
              <!-- <template v-slot="{ row }">{{softwareType(row)}}</template> -->
            </vxe-table-column>
            <vxe-table-column field="ver" title="版本号" show-overflow align="center" minWidth="80" />
            <vxe-table-column
              field="content"
              title="更新内容"
              show-overflow
              align="center"
              minWidth="280"
            />
            <vxe-table-column
              field="path"
              title="更新文件路径"
              show-overflow
              align="center"
              minWidth="290"
            />
            <vxe-table-column field="createTime" title="上传时间" align="center" width="180" />
            <vxe-table-column title="操作" align="center" fixed="right" width="180">
              <template v-slot="{ row }">
                <span
                  @click="dlt(row.id)"
                  style="color:#4d96ca;cursor:pointer;"
                  v-isshow="'core:upgrade:deleteRecorder'"
                >删除</span>
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
        v-model="visible"
        :title="str"
        @ok="Upgrade"
        class="quxiao upgrade1"
        @cancel="handleCancel"
        okText="提交"
        :width="640"
        :keyboard="false"
      >
        <a-form
          autocomplete="off"
          :form="form"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 14 }"
          @submit="Upgrade"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="厂商" class="sjlx">
                <a-select
                  v-decorator="[
                        'brand',
                        {
                          initialValue: Acquisitionlist[0].value,
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in Acquisitionlist" :key="d.value">{{ d.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="执法仪型号">
                <a-select
                  v-decorator="[
                        'model',
                        {
                          initialValue: typelist[0].value,
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in typelist" :key="d.value">{{ d.name }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="rowstyle">
            <a-col :span="24">
              <a-form-item label="版本号">
                <a-input
                  v-decorator="[
                'ver',
                {
                initialValue: '',
                rules: [{ required: true, message: '必填项不能为空' },
                { validator: versionvalidator }]
                }
                ]"
                  :allow-clear="true"
                  :max-length="LimitInputlength"
                  style="width: 100%"
                  placeholder="请输入版本号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="rowstyle">
            <a-col :span="24">
              <a-form-item label="更新内容">
                <a-textarea
                  style="resize:none;"
                  v-decorator="[
                        'content',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :max-length="textarealength"
                  :allow-clear="true"
                  placeholder="请输入更新内容（200字符以内）"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="rowstyle flie upgradefile">
            <a-col :span="24">
              <a-form-item label="上传文件">
                <a-upload
                  accept=".zip"
                  @change="handleChange"
                  :before-upload="beforeUpload"
                  v-decorator="[
                        'file',
                        {
                          initialValue: fileList,
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                >
                  <a-button @click="filebtn">
                    <a-icon type="upload" />选择文件上传
                  </a-button>
                </a-upload>
                <h2 class="filename" :title="filename">{{filename}}</h2>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { layouts } from "@/InterfaceVariable/variable"
import axios from "axios"
import { http } from "../../api/interceptors"
import { textarealength,LimitInputlength } from "@/InterfaceVariable/variable"
@Component({
  components: {}
})
export default class Upgrade extends Vue {
  // todo 变量
  [x: string]: any
  public form!: any
  public Luckmanagement = new this.$api.configInterface.Luckmanagement()
  public DeviceM = new this.$api.configInterface.DeviceM()
  public textarealength = textarealength
  public LimitInputlength = LimitInputlength
  private Height = ""
  private str = "上传"
  private http = http
  private path = ""
  private Acquisitionlist = [{ value: "", name: "" }]
  private status = true
  private typelist = [{ value: "", name: "" }]
  private layouts = layouts
  private visible = false
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private filename = ""
  private fileList = []
  private id = ""
  private tableData = []
  // todo 生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  private mounted() {
    let obj = {
      page: this.page.currentPage,
      size: this.page.pageSize
    }
    this.gettabledata(obj)
    this.getdata()
  }
  // todo 事件
  private Uploadpackage() {
    this.visible = true
    this.form.resetFields()
  }
  private tableRowClassName(record: any) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let obj = {
      page: currentPage,
      size: pageSize
    }
    this.gettabledata(obj)
  }
  private dlt(row) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: "数据删除后无法恢复，确定要删除吗？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          _that.Luckmanagement.Uploaddlt(row).then((res) => {
            if (res.code == 0) {
              _that.$message.success(res.msg)
              let obj = {
                page: _that.page.currentPage,
                size: _that.page.pageSize
              }
              _that.gettabledata(obj)
            } else {
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log("Oops errors!"))
      }
    })
  }
  private filestatus = false
  private beforeUpload(file) {
    this.fileList = []
    if (file.size >= 524288000) {
      this.$message.error("超出文件大小设定值")
      this.fileList = []
      this.filename = ""
      this.filestatus = false
      this.$nextTick(()=>{
        this.form.setFieldsValue({
          "file": []
        })
      })
    } else if (file.type != "application/x-zip-compressed") {
      this.$message.error("文件类型错误!")
      this.fileList = []
      this.filename = ""
      this.filestatus = false
      this.$nextTick(()=>{
        this.form.setFieldsValue({
          "file": []
        })
      })
    } else { 
      this.fileList = [file]
      this.filename = file.name
      this.filestatus = true
    }
    return false
  }
  private handleChange(info) {
    // this.form.resetFields()
    // this.$nextTick(() => {
    //   this.form.setFieldsValue({
    //     file: info,
    //   })
    // })
  }
  private Upgrade(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        if (this.status) {
          if (this.filestatus) {
            (this.$Loading as any).show(
              "正在上传中，请稍后",
              {},
              { background: "#fbfbfb" }
            )
            let formData = new FormData() //保存文件后再保存
            formData.append("file", this.fileList[0])
            formData.append("brand", val.brand)
            formData.append("content", val.content)
            formData.append("model", val.model)
            formData.append("ver", val.ver)
            axios
              .post(this.http + "upgrade/recorder", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Token: localStorage.getItem("token")
                }
              })
              .then((res) => {
                if(res.data.code == 0){
                  this.filename = ""
                  this.form.resetFields()
                  this.visible = false;
                  (this.$Loading as any).hide()
                  this.$message.success(res.data.msg)
                  let obj = {
                    page: this.page.currentPage,
                    size: this.page.pageSize
                  }
                  this.gettabledata(obj)
                }else{
                  this.$message.error(res.data.msg);
                  (this.$Loading as any).hide()
                }
              })
          } else {
            this.$nextTick(() => {
              this.form.setFields({
                'file': { errors: ["必填项不能为空"] }
              })
            })
            // this.$message.error("上传文件格式错误！请重新选择！")
          }
        }
      }
    })
  }
  private handleCancel() {
    this.form.resetFields()
    this.filename = ""
    this.fileList = []
  }
  private filebtn() {
    this.status = true
  }
  private versionvalidator(rule, val, callback) {
    let pattern = new RegExp(/\d/)
    if (!pattern.test(val)) {
      callback("必须包含数字")
    } else {
      callback()
    }
  }
  getdata() {
    this.DeviceM.deviceBrandSelect().then((res) => {
      if(res.data.length > 0){
        this.Acquisitionlist = res.data
      }
    })
    this.DeviceM.Equipmentmodel().then((res) => {
      if(res.data.length > 0){
        this.typelist = res.data
      }
    })
  }
  // todo 数据请求
  private gettabledata(obj) { 
    this.Luckmanagement.getUpgradeMtable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
}
</script>

<style lang="less" scope>
.accessbtn {
  float: right;
  line-height: 1;
  button:nth-of-type(1) {
    margin-right: 8px;
  }
}
.rowstyle .ant-form-item-label {
  width: 90px;
}
.rowstyle .ant-form-item-control-wrapper {
  width: 480px;
}
.layoutcontainer {
  .ant-upload-list {
    display: none !important;
  }
}

.filr {
  position: relative;
}
.filename {
  position: absolute;
  top: -12px;
  right: -220px;
  font-size: 14px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.sjlx {
  .ant-form-item-label {
    width: 90px;
  }
}
.upgrade1 {
  .antd-col-24 {
    height: 56px;
  }
}
.upgradefile {
  .ant-upload-list {
    display: none !important;
  }
}
</style>
