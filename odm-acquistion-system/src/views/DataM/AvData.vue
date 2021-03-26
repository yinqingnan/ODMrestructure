<template>
  <div>
    <div id="AvData" class="layoutcontainer">
      <div class="container">
        <div class="contaninerheader" style="padding:13px 26px 0 26px">
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
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 16 }"
                  @submit="handleSubmit"
                >
                  <el-scrollbar class="screen">
                    <a-form-item label="姓名/警号">
                      <a-input
                        :disabled="namejurisdiction"
                        v-decorator="['keyword', { initialValue: defalutname, rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入姓名/警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="文件类型">
                      <a-select
                        v-decorator="[
                        'file_type_equal',
                        {
                          initialValue: undefined,
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in filetype" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="重要级别">
                      <a-select
                        v-decorator="[
                        'file_level_equal',
                        {
                          initialValue: undefined,
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in levelData" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="时间类型">
                      <a-select
                        v-decorator="[
                        'TimeData',
                        {
                          initialValue: 'uploadDate',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in Timetype" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="时间范围">
                      <a-range-picker
                        format="YYYY-MM-DD"
                        :show-time="{
                        hideDisabledOptions: true,
                        defaultValue: [],
                      }"
                        :allowClear="false"
                        v-decorator="[
                        'date',
                        {
                          initialValue: defaultdate,
                          rules: []
                        }
                      ]"
                        @change="onChange"
                      />
                    </a-form-item>
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handleSubmit">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div style="line-height:1">
            <a-button
              type="primary"
              @click="dlt"
              style="line-height:1"
              v-isshow="'core:file:delete'"
            >批量删除</a-button>
            <a-button
              v-isshow="'core:file:download'"
              type="primary"
              @click="download"
              style="line-height:1"
            >批量下载</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            resizable
            show-header-overflow
            :row-class-name="tableRowClassName"
            height="auto"
            :data="tabledata"
            class="mytable-scrollbar"
            highlight-hover-row
            ref="xTable1"
            @cell-click="onRowClick"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            @checkbox-all="selectAllEvent"
            @checkbox-change="selectChangeEvent"
          >
            >
            <vxe-table-column type="checkbox" width="60" align="center" />
            <vxe-table-column
              header-align="center"
              field="fileName"
              title="文件名称"
              align="left"
              show-overflow
              width="30%"
            >
              <template v-slot="{ row }">
                <span
                  class="iconfont iconblock"
                  :class="{'iconpicture': row.fileType === 'PHOTO', 'iconshiping-copy': row.fileType === 'VIDEO', 'iconmusic-copy': row.fileType === 'AUDIO','icontex': row.fileType === 'LOG'}"
                ></span>
                <span
                  style="cursor: pointer;text-align:center"
                  class="textblock"
                  :class="{'gao': row.fileLevel == 3, 'zhong': row.fileLevel==2, 'di': row.fileLevel == 1}"
                >{{ fileLevel(row.fileLevel) }}</span>
                <span
                  style="cursor: pointer;color:#0db8df"
                  v-right="'core:file:info'"
                  ref="avdataright"
                  class="filenames"
                >{{ row.fileName }}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="fileSizeName"
              title="文件大小"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="userName"
              title="姓名/警号"
              align="center"
              show-overflow
              width="10%"
            />
            <vxe-table-column
              field="recordDate"
              title="摄录时间"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="fileDurationName"
              title="摄录时长"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="uploadDate"
              title="导入时间"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="updateStateName"
              title="上传状态"
              show-overflow
              align="center"
              width="10%"
            />
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
    </div>
    <a-modal
      v-model="visible"
      title="媒体文件查看"
      :width="1000"
      :keyboard="false"
      @cancel="tccancel"
      :destroyOnClose="true"
    >
      <div class="videoPopup">
        <div class="Popup_left">
          <!-- fileType -->
          <div v-if="filedetails.fileType === 'PHOTO'" class="Popup_left_img">
            <img :src="previewhttp+ filedetails.code" alt />
          </div>
          <div v-else-if="filedetails.fileType === 'VIDEO'" class="Popup_left_video">
            <XgVideo :videopath="videopath" @Videochange="Videochange" ref="XgVideo" />
          </div>
          <div v-else-if="filedetails.fileType === 'AUDIO'" class="Popup_left_audio">
            <CustomAudio :audiocode="filedetails.code" />
          </div>
        </div>
        <div class="Popup_right">
          <div class="fileclass">
            <p style="font-size:14px;font-weight:bold">{{ filedetails.fileName }}</p>
            <p
              style="font-size:14px;font-weight:bold"
            >{{ filedetails.userName }}</p>
            <ul>
              <li>摄录时间：{{ filedetails.recordDate }}</li>
              <li>导入时间：{{ filedetails.uploadDate }}</li>
              <li>文件大小：{{ filedetails.fileSizeName }}</li>
              <li>上传状态：{{ filedetails.updateStateName }}</li>
              <li>执法仪序号：{{ filedetails.recorderCode }}</li>
            </ul>
          </div>
          <div class="Popup_right_footer">
            <h2>文件标记</h2>
            <form-create :option="option" v-model="filesign" :rule="FileForm" />
            <a-button
              type="primary"
              style="margin-left: 92px;"
              @click="signsave"
              v-isshow="'core:file:mark'"
              :disabled="StandaloneMode"
            >保存</a-button>
          </div>
        </div>
      </div>
      <template slot="footer">
        <a-button type="default" @click="previous" :disabled="PreviousDisabled">上一个</a-button>
        <a-button type="default" @click="next" :disabled="NextDisabled">下一个</a-button>
        <a-button type="default" @click="filedownload" v-isshow="'core:file:download'">下载</a-button>
        <a-button
          type="default"
          @click="moduleDlt"
          v-isshow="'core:file:delete'"
          :disabled="StandaloneMode"
        >删除</a-button>
      </template>
    </a-modal>
    <a-modal v-model="logshow" title="日志" :footer="null" @cancel="logclear" :keyboard="false">
      <el-scrollbar style="height: 200px;width: 476px;">
        <p>{{logmsg}}</p>
      </el-scrollbar>
    </a-modal>
    <a-modal v-model="filedownloadshow" title="下载" :footer="null" @cancel="fileconversion">
      <div class="fileconversion" v-if="progress">
        <div>
          <h2>原文件:</h2>
          <a-button type="primary" style="margin-left:18px" @click="OriginalFileDowbload">下载</a-button>
        </div>
        <div style="margin-top:20px">
          <h2>文件格式转换:</h2>
          <a-select v-model="filedetails.fileSuffix" style="width: 140px" @change="fileChange">
            <a-select-option
              v-for="(i) in filetypelist"
              :key="i.value"
            >{{ i.name}}</a-select-option>
          </a-select>
          <a-button type="primary" @click="FormatTransformation" :disabled='startswitch'>开始转换</a-button>
        </div>
      </div>
      <div v-else>
        <a-progress :percent="progressVal" status="active" />
        <a-button
          type="primary"
          style="margin-top: 37px;margin-left: 207px"
          :disabled="progressbtn"
          @click='confirmfiledown'
        >下载</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import {
  LimitInputlength,
  layouts,
  textarealength
} from "@/InterfaceVariable/variable"
import { Component, Vue } from "vue-property-decorator"
import { Selecttype, Videoobj } from "@/InterfaceVariable/interface"
import XgVideo from "@/components/Video/Video.vue"
import CustomAudio from "@/views/Testviews/Audio.vue"
import { http } from "@/api/interceptors"
import { namespace } from "vuex-class"
const Test = namespace("Test")
@Component({
  components: { XgVideo, CustomAudio }
})
export default class AvData extends Vue {
  [x: string]: any
  // @Test.State((state) => state.StandaloneMode)
  // StandaloneMode!: boolean
  public StandaloneMode = false
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  public form!: any
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private previewhttp = http + "file/preview/"
  private layouts = layouts  
  private fileId = ""
  private logshow = false
  private PreviousDisabled = false
  private NextDisabled = false

  private Timetype: Selecttype[] = [
    { id: 1, value: "uploadDate", title: "导入时间" },
    { id: 2, value: "recordDate", title: "摄录时间" }
  ]
  private filetype: Selecttype[] = [
    { id: 1, value: "VIDEO", title: "视频" },
    { id: 2, value: "AUDIO", title: "音频" },
    { id: 3, value: "PHOTO", title: "图片" },
    { id: 4, value: "LOG", title: "日志" }
  ]
  private levelData: Selecttype[] = [
    { id: 1, value: "3", title: "高" },
    { id: 2, value: "2", title: "中" },
    { id: 3, value: "1", title: "低" }
  ]
  private defaultdate = []
  private selectdata = []
  private selectedRowKeys = []
  private Height = ""
  private tabledata = []
  private formdata: Videoobj = {
    page: 1,
    size: 15
  }
  private logmsg = ""
  private fileCode = ""
  private disabled = false
  private Tablesubscript = []
  private filedetails = {
    fileName: "",
    userName: "",
    userCode: "",
    recordDate: "",
    uploadDate: "",
    fileSizeName: "",
    updateStateName: "",
    recorderCode: "",
    fileType: "",
    code: "",
    fileSuffix: ""
  }
  private namejurisdiction = false
  private defalutname = ""
  // private StandaloneMode = false
  private visible = false
  private option = {
    // 显示重置表单按扭
    resetBtn: false,
    submitBtn: false
  }
  private filesign = {}
  private FileForm = [
    {
      type: "radio",
      title: "重要级别",
      field: "level",
      value: "0",
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      options: [
        { value: "1", label: "低", disabled: false },
        { value: "2", label: "中", disabled: false },
        { value: "3", label: "高", disabled: false }
      ],
      className: "popuplevel"
    },
    {
      type: "input",
      title: "标记描述",
      field: "remarks",
      value: "",
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      props: {
        type: "textarea",
        allowClear: true
      }
    }
  ]
  private videopath = ""
  private filedownloadshow = false
  private audiolist = [
    { value: "wav", name: "wav", disabled: false },
    { value: "mp3", name: "mp3", disabled: false },
    { value: "wma", name: "wma", disabled: false }
  ]
  private picturelist = [
    { value: "png", name: "png", disabled: false },
    { value: "jpg", name: "jpg", disabled: false }
  ]
  private videolist = [
    { value: "avi", name: "avi", disabled: false },
    { value: "mp4", name: "mp4", disabled: false },
    { value: "wmv", name: "wmv", disabled: false },
    { value: "mov", name: "mov", disabled: false }
  ]
  private progress = true
  private filetypelist = []
  public progressVal = 0
  public startswitch = true
  private created() {
    this.form = this.$form.createForm(this)
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    let user = JSON.parse(localStorage.getItem("user"))
    if (user.right) {
      this.namejurisdiction = true
      this.defalutname = user.name
      this.gettabledata({
        page: this.page.currentPage,
        size: this.page.pageSize,
        keyword: this.defalutname
      })
    } else {
      this.gettabledata({
        page: this.page.currentPage,
        size: this.page.pageSize
      })
    }
    this.StandaloneMode = JSON.parse(localStorage.getItem("user"))!.openCloud

    // console.log(this.StandaloneMode);
  }
  private handleSubmit(e?: any): void {
    e.preventDefault()
    this.form.validateFields((err, val) => {
      if (!err) {
        let obj: Videoobj = {
          page: 1,
          size: 15,
          keyword: val.keyword,
          file_type_equal: val.file_type_equal,
          file_level_equal: val.file_level_equal
        }
        if (val.TimeData === "uploadDate") {
          // console.log("导入时间")
          if (val.date.length > 0) {
            obj.upload_date_ge = val.date[0].format("YYYY-MM-DD HH:mm:ss")
            obj.upload_date_le = val.date[0].format("YYYY-MM-DD HH:mm:ss")
          }
        } else if (val.TimeData === "recordDate") {
          // console.log("摄录时间")
          if (val.date) {
            obj.record_date_le = val.date[0].format("YYYY-MM-DD HH:mm:ss")
            obj.record_date_ge = val.date[0].format("YYYY-MM-DD HH:mm:ss")
          }
        }
        this.formdata = obj
        this.gettabledata(obj)
      }
    })
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private gettabledata(obj): void {
    this.DataM.gettabledata(obj, true).then((res: any) => {
      this.page.totalResult = parseInt(res.count)
      this.tabledata = res.data
      // console.log(res.data)
      this.Tablesubscript = []
      // 保存当前表格的所有code
      res.data.map((item) => {
        this.Tablesubscript.push(item.id)
      })
    })
  }

  private reset() {
    this.form.resetFields()
  }

  private popup(e: { preventDefault: () => void }) {
    e.preventDefault()
  }
  private onRowClick({ row, rowIndex, column }) {
    // console.log(column)
    if (column.title === "文件名称") {
      this.tablebtn(row, rowIndex)
    }
  }
  private tablebtn(row, rowIndex) {
    if (
      (document.getElementsByClassName("filenames")[rowIndex] as HTMLElement)
        .style.cursor !== "not-allowed"
    ) {
      if (row.fileType === "LOG") {
        this.DataM.getfiledetails(row.id).then((res) => {
          this.DataM.yulanwenjian(res.data.code).then((re) => {
            this.logshow = true
            this.logmsg = re
          })
          // let splits = res.data.split(/\r\n/g)
          // let dataList = []
          // for (let i = 0; i < splits.length; i++) {
          //   dataList.push({
          //     id: i,
          //     text: splits[i]
          //   })
          // }
          // this.logshow = true
          // this.logmsg = dataList
        })
      } else {
        // 弹窗文件信息
        this.visible = true
        this.fileCode = row.code
        this.fileId = row.id
        this.getfiledetails(row.id)
      }
    }
  }
  private getfiledetails(id) {
    this.DataM.getfiledetails(id).then((res) => {
      this.filedetails = res.data
      this.fileCode = res.data.code
      if (res.data.fileType === "VIDEO") {
        if (this.$refs?.XgVideo) {
          (this.$refs?.XgVideo as any).reload()
        }
        this.videopath = this.previewhttp + res.data.code
      }
      let form = this.filesign as any
      form.setValue({
        level: res.data.fileLevel + "",
        remarks: res.data.remarks
      })
    })
  }
  private signsave() {
    const form = this.filesign as any
    form.submit((data) => {
      let obj = {
        id: this.fileId,
        fileLevel: data.level,
        remark: data.remarks
      }
      this.DataM.filemark(obj).then((res) => {
        res.code === 0
          ? this.$message.success(res.msg)
          : this.$message.error(res.msg)
      })
    })
  }
  private logclear() {
    this.logshow = false
    this.logmsg = ""
  }
  private tccancel() {
    this.fileId = ""
    this.fileCode = ""
    this.gettabledata(this.formdata)
    this.PreviousDisabled = false
    this.NextDisabled = false
  }
  public rowClassName(record: any, index: number) {
    let className = "light-row"
    if (index % 2 === 1) className = "dark-row"
    return className
  }
  public dlt() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    if (this.selectedRowKeys.length > 0) {
      let arr = []
      this.selectedRowKeys.map((item) => {
        arr.push(item.id)
      })
      this.$confirm({
        title: "提示",
        content: `确认批量删除${this.selectedRowKeys.length}个文件？`,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            _that.DataM.bumendlt(arr)
              .then((res) => {
                if (res.code == 0) {
                  _that.$message.success(res.msg)
                  _that.gettabledata(_that.formdata)
                  _that.selectedRowKeys = []
                } else {
                  _that.$message.error(res.msg)
                }
              })(_that.$refs.xTable1 as any)
              .clearCheckboxRow()
          }).catch(() => console.log("操作失败"))
        }
      })
    } else {
      this.$message.error("请选择需要删除的文件")
    }
  }
  public pagerchange({ currentPage, pageSize }) {
    this.formdata.page = currentPage
    this.formdata.size = pageSize
    this.gettabledata(this.formdata)
  }

  public selectAllEvent({ checked, records }) {
    // console.log(records)
    this.selectedRowKeys = records
  }

  public selectChangeEvent({ checked, records }) {
    this.selectedRowKeys = records
  }

  private tableRowClassName(record: any, index: number) {
    record.rowIndex = index
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }

  private arrSelect(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val + "") return i
    }
    return -1
  }
  private fileLevel(val) {
    let str = ""
    switch (val) {
    case 1:
      str = "低"
      break
    case 2:
      str = "中"
      break
    case 3:
      str = "高"
      break
    default:
      break
    }
    return str
  }
  public download() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    if (this.selectedRowKeys.length != 0) {
      this.$confirm({
        title: "提示",
        content: `确认批量下载${this.selectedRowKeys.length}个文件？同时下载文件过多可能造成浏览器卡顿,如果浏览器未出现下载提示,请您在浏览器地址栏右侧,点击“已拦截的弹窗”,选择"始终允许显示本站点的弹出式窗口"。`,
        onOk() {
          _that.selectedRowKeys.forEach((item) => {
            window.open(`${http}/file/download/${item.code}`)
          })
          _that.selectedRowKeys = []
          ;(_that.$refs.xTable1 as any).clearCheckboxRow()
        }
      })
    } else {
      this.$message.error("请选择需要下载的文件")
    }
  }
  // 上一个
  private previous() {
    this.NextDisabled = false
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == 0) {
      this.PreviousDisabled = true
    } else {
      this.fileId = this.Tablesubscript[index - 1]
      this.getfiledetails(this.fileId)
      if (this.$refs?.XgVideo) {
        (this.$refs?.XgVideo as any).reload()
      }
    }
  }
  // 下一个
  private next() {
    this.PreviousDisabled = false
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == this.Tablesubscript.length - 1) {
      this.$message.info("已经是当前页面最后一个")
      this.NextDisabled = true
    } else {
      this.fileId = this.Tablesubscript[index + 1]
      this.getfiledetails(this.fileId)
      if (this.$refs?.XgVideo) {
        (this.$refs?.XgVideo as any).reload()
      }
    }
  }
  // 下载
  private filedownload() {
    console.log(this.fileCode)
    console.log(this.filedetails.fileSuffix)
    console.log(this.filedetails.fileSuffix)
    this.filedownloadshow = true
    this.startswitch = true
    if (this.filedetails.fileType === "PHOTO") {
      this.picturelist.map((item) => {
        if (item.name === this.filedetails.fileSuffix) {
          item.disabled = true
        }
      })
      this.filetypelist = this.picturelist
    } else if (this.filedetails.fileType === "VIDEO") {
      this.videolist.map((item) => {
        if (item.name === this.filedetails.fileSuffix) {
          item.disabled = true
        }
      })
      this.filetypelist = this.videolist
    } else if (this.filedetails.fileType === "AUDIO") {
      this.audiolist.map((item) => {
        if (item.name === this.filedetails.fileSuffix) {
          item.disabled = true
        }
      })
      this.filetypelist = this.audiolist
    }
    // window.open(`${http}/file/download/${this.fileCode}`)
  }
  private OriginalFileDowbload() {
    window.open(`${http}/file/download/${this.fileCode}`)
    setTimeout(() => {
      this.filedownloadshow = false
    }, 600)
  }
  // 删除
  private moduleDlt() {
    this.DataM.bumendlt([this.fileId]).then((res) => {
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.visible = false
        this.gettabledata(this.formdata)
        this.selectedRowKeys = []
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  private Videochange(type, val) {
    this.DataM.videoSnapshot(this.fileCode, val).then((res) => {
      window.open(res.data)
    })
  }
  private CurrentFileformat = ""

  private fileChange(val) {
    this.CurrentFileformat = val
    this.startswitch = false
  }
  private FormatTransformation() {
    this.progress = false
    this.DataM.convertFormat(this.fileCode, this.CurrentFileformat).then(
      (res) => {
        console.log(res)
        if (res.code === 0) {
          this.getprogressVal(this.fileCode, this.CurrentFileformat)
          this.progressbtn = true
        }
      }
    )
  }
  private time = null
  private progressbtn = true
  private filepath = ''
  public getprogressVal(code, type) {
    this.time = setInterval(() => {
      this.DataM.getprogressVal(code, type).then((res) => {
        if (Number(res.data.progressVal) === 100) {
          clearInterval(this.time)
          this.progressbtn = false
          this.progressVal = 0
        }
        this.progressVal = Number(res.data.progressVal)
        this.filepath = res.data.httpUrl
      })
    }, 1000)
  }
  private fileconversion() {
    this.progress = true
  }
  private confirmfiledown () {
    // 下载
    window.open(this.filepath)
    setTimeout(()=>{
      this.filedownloadshow = false;
    },600)
    this.filepath = ''
    this.progress = true
  }
}
</script>

<style lang="less" scope>
.ant-form-item {
  margin-bottom: 7px;
}

.contaninerheader {
  display: flex;
  justify-content: space-between;
  padding-top: 13px;
}

.contaninerheader {
  > div > button {
    background: #0db8df;
    border: 0;
    cursor: pointer;
    outline: none;
    color: #fff;
    // width: 58px;
    height: 30px;
  }

  > div > button:nth-of-type(1) {
    margin-right: 9px;
  }
}

.box {
  width: 347px;
  height: 337px;
  background: #ffffff;
  border: 1px solid #f1f1f1;
}

.dropdown {
  width: 58px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #f1f1f1;
  display: block;
  text-align: center;
  color: #a1a9b5;
}

.ant-row .ant-form-item {
  width: 100%;
}

.ant-form-item-label > label {
  color: #808994;
}

#AvData .ant-table-tbody > tr > td {
  padding: 0px;
  height: 36px;
  line-height: 36px;
}

#AvData .ant-table-thead {
  height: 36px;
  line-height: 36px;
}

.light-row {
  background-color: #f5f5f5;
}

.dark-row {
  background-color: #ffffff;
}
.ant-calendar-picker {
  width: 230px !important;
}

/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}

/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}

.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}

/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}

.screen {
  width: 347px;
  height: 260px;
}

.filesee {
  display: flex;
  height: 410px;

  .filesee_left {
    width: 560px;
    margin-right: 12px;
    overflow: hidden;

    div {
      // height: 100%;
      height: auto;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .filesee_right {
    width: 40%;
  }
}

.AvData {
  .vjs-custom-skin > .video-js {
    height: 423px;
  }
}
.videoPopup {
  height: 461px;
  display: flex;
  .Popup_left {
    width: 560px;
    height: 100%;
    margin-right: 18px;
  }
  .Popup_right {
    width: 365px;
    height: 100%;
  }
}
.popuplevel {
  .ant-form-item-children {
    width: 100%;
    display: inline-block;
  }
  .ant-radio-group {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .ant-form-item-children {
    width: 100%;
  }
}
.fileclass {
  padding-left: 22px;
  p {
    color: #7f8893;
  }

  ul {
    li {
      line-height: 36px;
      font-size: 14px;
      color: #7f8893;
    }
  }

  h2 {
    font-size: 14px;
    line-height: 1;
    margin-bottom: 16px;
    color: #7f8893;
  }
}
.Popup_right_footer {
  h2 {
    height: 36px;
    line-height: 36px;
    padding-left: 22px;
    font-size: 16px;
    color: #333;
    background: #e5e9ec;
  }
}
.Popup_left_img {
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
.Popup_left_video {
  width: 100%;
  height: 100%;
  > div {
    padding-top: 70px;
  }
}
.Popup_left_audio {
  padding-top: 45px;
  background: #000;
}
.fileconversion {
  > div {
    display: flex;
    height: 32px;
    > h2 {
      font-size: 14px;
      width: 100px;
      text-align: right;
      margin: 0;
      line-height: 32px;
    }
    .ant-select {
      margin: 0 18px;
    }
  }
}
</style>
