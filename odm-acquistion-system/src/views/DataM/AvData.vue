<template>
  <div>
    <div id="AvData" class="layoutcontainer">
      <div class="container">
        <div class="contaninerheader" style="padding:13px 26px 0 26px">
          <template>
            <a-dropdown :trigger="['click']" class="dropdown" v-model="searchForm">
              <a class="ant-dropdown-link" @click="popup">
                筛选
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay" class="box">
                <a-form
                  :selfUpdate="true"
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
                        placeholder="请选择视频、音频或图片..."
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
                        :allowClear="true"
                        v-decorator="[
                        'date',
                        {
                          initialValue: null||defaultdate ,
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
            row-id="id"
            :checkbox-config="{trigger: 'cell', reserve: true}"
            @cell-click="onRowClick"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            @checkbox-all="selectAllEvent"
            @checkbox-change="selectChangeEvent"
            :sort-config="{trigger: 'cell', defaultSort: {field: 'id', order: 'desc'}, remote:true,orders: ['desc', 'asc']}"
            @sort-change="sortChangeEvent"
          >
            <vxe-table-column type="checkbox" width="60" align="center" />
            <vxe-table-column
              header-align="center"
              field="fileName"
              title="文件名"
              align="left"
              show-overflow
              width="30%"
              sortable
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
              field="userName"
              title="姓名/警号"
              align="center"
              show-overflow
              width="10%"
              sortable
            />
            <vxe-table-column
              field="fileSizeName"
              title="文件大小"
              show-overflow
              align="center"
              width="10%"
              sortable
            />
            <vxe-table-column
              field="recordDate"
              title="摄录时间"
              show-overflow
              align="center"
              width="10%"
              sortable
            />
            <vxe-table-column
              field="fileDurationName"
              title="摄录时长"
              show-overflow
              align="center"
              width="10%"
              sortable
            />
            <vxe-table-column
              field="uploadDate"
              title="导入时间"
              show-overflow
              align="center"
              width="10%"
              sortable
            />
            <vxe-table-column
              field="uploadStateName"
              title="上传状态"
              show-overflow
              align="center"
              width="10%"
              sortable
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
          <div v-if="filedetails.fileType === 'PHOTO'" class="Popup_left_img">
            <div class="images" v-viewer="{}">
              <img v-for="src in [filedetails.previewUrl]" :src="src" :key="src" />
            </div>
            <!-- <img :src="filedetails.previewUrl" alt /> -->
          </div>
          <div v-else-if="filedetails.fileType === 'VIDEO'" class="Popup_left_video">
            <XgVideo
              v-if="videoshow"
              :videopath="videopath"
              @Videochange="Videochange"
              ref="XgVideo"
            />
          </div>
          <div v-else-if="filedetails.fileType === 'AUDIO'" class="Popup_left_audio">
            <CustomAudio :audiocode="filedetails.code" ref="CustomAudio" />
          </div>
        </div>
        <div class="Popup_right">
          <div class="fileclass">
            <a-tooltip>
              <template slot="title">{{ filedetails.fileName }}</template>
              <p class="fileName">文件名称：{{ filedetails.fileName }}</p>
            </a-tooltip>
            <p
              style="font-size:14px;font-weight:bold"
            >{{ filedetails.userName }}({{filedetails.userCode}})</p>
            <ul>
              <li>摄录时间：{{ filedetails.recordDate }}</li>
              <li>导入时间：{{ filedetails.uploadDate }}</li>
              <li>文件大小：{{ filedetails.fileSizeName }}</li>
              <li>上传状态：{{ filedetails.uploadStateName }}</li>
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
            >保存</a-button>
          </div>
        </div>
      </div>
      <template slot="footer">
        <a-button type="default" @click="previous" :disabled="PreviousDisabled">上一个</a-button>
        <a-button type="default" @click="next" :disabled="NextDisabled">下一个</a-button>
        <a-button type="default" @click="filedownload" v-isshow="'core:file:download'">下载</a-button>
        <a-button type="default" @click="moduleDlt" v-isshow="'core:file:delete'">删除</a-button>
      </template>
    </a-modal>
    <a-modal v-model="logshow" title="日志" @cancel="logclear" :keyboard="false">
      <el-scrollbar style="height: 200px;width: 476px;">
        <a-divider orientation="left" style="color:#919AA6;font-size:12px">警员名称</a-divider>
        <p
          style="padding-left: 27px;white-space: nowrap;text-overflow: ellipsis; overflow: hidden; width: 476px;"
        >{{policeName}}</p>
        <a-divider orientation="left" style="color:#919AA6;font-size:12px">文件名称</a-divider>
        <p
          style="padding-left: 22px;white-space: nowrap;text-overflow: ellipsis; overflow: hidden; width: 476px;"
        >{{logFileName}}</p>
        <a-divider orientation="left" style="color:#919AA6;font-size:12px">日志内容</a-divider>
        <pre style="padding-left: 27px;">{{logmsg}}</pre>
      </el-scrollbar>
      <template slot="footer">
        <a-button type="default" @click="logprve" :disabled="logPreviousDisabled">上一个</a-button>
        <a-button type="default" @click="lognext" :disabled="logNextDisabled">下一个</a-button>
      </template>
    </a-modal>
    <a-modal v-model="filedownloadshow" title="格式转换" :footer="null" @cancel="fileconversion">
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
              :disabled="i.disabled"
            >{{ i.name}}</a-select-option>
          </a-select>
          <a-button type="primary" @click="FormatTransformation" :disabled="startswitch">开始转换</a-button>
        </div>
      </div>
      <div v-else>
        <a-progress :percent="progressVal" status="active" />
        <a-button
          type="primary"
          style="margin-top: 37px;margin-left: 207px"
          :disabled="progressbtn"
          @click="confirmfiledown"
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
import CustomAudio from "@/components/Audio/Audio.vue"
import moment from "moment"
@Component({
  components: { XgVideo, CustomAudio }
})
export default class AvData extends Vue {
  [x: string]: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  public form!: any
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
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
    { id: 0, value: "all", title: "全部" },
    { id: 1, value: "3", title: "高" },
    { id: 2, value: "2", title: "中" },
    { id: 3, value: "1", title: "低" }
  ]
  private defaultdate: any[] | null = null
  private selectdata = []
  /*table选中keys*/
  private selectedRowKeys = []
  /*table选中records*/
  private selectionRows = []
  private Height = ""
  private tabledata = []
  private formdata: Videoobj = {
    page: 1,
    size: 15,
    order: "desc",
    sidx: "id",
    upload_date_ge:
      moment().locale("zh-cn").subtract(1, "months").format("YYYY-MM-DD") +
      " 00:00:00",
    upload_date_le: moment().locale("zh-cn").format("YYYY-MM-DD") + " 23:59:59",
    record_date_ge: "",
    record_date_le: ""
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
    uploadStateName: "",
    recorderCode: "",
    fileType: "",
    code: "",
    fileSuffix: "",
    previewUrl: "",
    downloadUrl: ""
  }
  private namejurisdiction = false
  private defalutname = ""
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
        allowClear: true,
        placeholder: "请填写标记描述（200字符以内）",
        maxLength: 200
      }
    }
  ]
  private videopath = ""
  private filedownloadshow = false
  private audiolist = [
    { value: "WAV", name: "WAV", disabled: false },
    { value: "MP3", name: "MP3", disabled: false },
    { value: "WMA", name: "WMA", disabled: false }
  ]
  private picturelist = [
    { value: "PNG", name: "PNG", disabled: false },
    { value: "JPG", name: "JPG", disabled: false }
  ]
  private videolist = [
    { value: "AVI", name: "AVI", disabled: false },
    { value: "MP4", name: "MP4", disabled: false },
    { value: "WMV", name: "WMV", disabled: false },
    { value: "MOV", name: "MOV", disabled: false }
  ]
  private progress = true
  private filetypelist = []
  public progressVal = 0
  public startswitch = true
  private order = "desc"
  private sidx = "id"
  private logPreviousDisabled = false
  private logNextDisabled = false
  private created() {
    //获取当前自然月和上一个月
    this.defaultdate = [
      moment().locale("zh-cn").subtract(1, "months"),
      moment().locale("zh-cn")
    ]
    this.form = this.$form.createForm(this)
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    let user = JSON.parse(localStorage.getItem("user"))
    if (user.dataPermission) {
      this.namejurisdiction = true
      this.defalutname = user.name
      this.gettabledata({
        page: this.page.currentPage,
        size: this.page.pageSize,
        keyword: this.defalutname,
        order: this.order,
        sidx: this.sidx,
        upload_date_ge: this.defaultdate[0].format("YYYY-MM-DD") + " 00:00:00",
        upload_date_le: this.defaultdate[1].format("YYYY-MM-DD") + " 23:59:59"
      })
    } else {
      this.gettabledata({
        page: this.page.currentPage,
        size: this.page.pageSize,
        order: this.order,
        sidx: this.sidx,
        upload_date_ge: this.defaultdate[0].format("YYYY-MM-DD") + " 00:00:00",
        upload_date_le: this.defaultdate[1].format("YYYY-MM-DD") + " 23:59:59"
      })
    }
  }
  private handleSubmit(e?: any): void {
    this.searchForm = false
    e.preventDefault()
    this.form.validateFields((err, val) => {
      if (!err) {
        let obj: Videoobj = {
          page: 1,
          size: 15,
          keyword: val.keyword,
          file_type_equal:
            val.file_type_equal === "all" ? null : val.file_type_equal,
          file_level_equal:
            val.file_level_equal === "all" ? null : val.file_level_equal,
          order: this.order,
          sidx: this.sidx
        }
        if (val.TimeData === "uploadDate") {
          if (val.date.length > 0) {
            obj.upload_date_ge = moment(val.date[0]).format(
              "YYYY-MM-DD" + " 00:00:00"
            )
            obj.upload_date_le = moment(val.date[1]).format(
              "YYYY-MM-DD" + " 23:59:59"
            )
          }
        } else if (val.TimeData === "recordDate") {
          if (val.date) {
            obj.record_date_ge = moment(val.date[0]).format(
              "YYYY-MM-DD" + " 00:00:00"
            )
            obj.record_date_le = moment(val.date[1]).format(
              "YYYY-MM-DD" + " 23:59:59"
            )
          }
        }
        this.page.currentPage = 1
        this.formdata = obj
        this.gettabledata(this.formdata)
      }
    })
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private gettabledata(obj): void {
    this.DataM.gettabledata(obj, true).then((res: any) => {
      this.page.currentPage =Number(res.page) 
      this.page.pageSize = Number(res.size)
      this.page.totalResult = parseInt(res.count)
      if(parseInt(res.count) > 0){
        this.tabledata = res.data
        this.Tablesubscript = []
        // 保存当前表格的所有code
        res.data.map((item) => {
          this.Tablesubscript.push(item.id)
        })
      }else{
        this.page.currentPage = 1
        this.tabledata = []
      }
    })
  }
  private reset() {
    this.form.resetFields()
    this.searchForm = false
  }

  private searchForm = false
  private popup(e) {
    e.preventDefault()
    this.searchForm = true
  }
  private onRowClick({ row, rowIndex, column }) {
    if (column.title === "文件名") {
      this.tablebtn(row, rowIndex)
    }
  }
  private downloadUrl = ""
  private previewUrl = ""
  private policeName = ""
  private logFileName = ""
  private tablebtn(row, rowIndex) {
    if (
      (document.getElementsByClassName("filenames")[rowIndex] as HTMLElement)
        .style.cursor !== "not-allowed"
    ) {
      if (row.fileType === "LOG") {
        this.logFileName = row.fileName
        this.policeName = row.userName
        this.DataM.LogPreview(row.code).then((re) => {
          this.logshow = true
          this.logmsg = re
          this.fileId = row.id
          this.fileCode = row.code
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
  private lognext() {
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == this.Tablesubscript.length - 1) {
      this.$message.info("已经是当前页面最后一个")
      // this.logNextDisabled = true
    } else {
      this.fileId = this.Tablesubscript[index + 1]
      this.DataM.getfiledetails(this.fileId).then((res) => {
        this.fileId = res.data.id
        this.fileCode = res.data.code
        this.DataM.LogPreview(res.data.code).then((re) => {
          this.logshow = true
          this.logmsg = re
          // this.logPreviousDisabled = false
        })
      })
    }
  }
  private logprve() {
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == 0) {
      this.$message.info("已经是当前页面第一个")
      // this.logPreviousDisabled = true
    } else {
      this.fileId = this.Tablesubscript[index - 1]
      this.DataM.getfiledetails(this.fileId).then((res) => {
        this.fileId = res.data.id
        this.fileCode = res.data.code
        this.DataM.LogPreview(res.data.code).then((re) => {
          this.logshow = true
          this.logmsg = re
          // this.logNextDisabled = false
        })
      })
    }
  }
  public videoshow = false
  private getfiledetails(id) {
    this.videoshow = false
    this.DataM.getfiledetails(id).then((res) => {
      this.previewUrl = res.data.previewUrl
      this.downloadUrl = res.data.downloadUrl
      this.filedetails = res.data
      this.fileCode = res.data.code
      if (res.data.fileType === "VIDEO") {
        if (this.$refs.XgVideo as XgVideo) {
          (this.$refs?.XgVideo as any).playframe()
        }
        this.videopath = this.previewUrl
        this.videoshow = true
      }
      let form = this.filesign as any
      form.setValue({
        level: res.data.fileLevel + "",
        remarks: res.data.remark
      })

      if (this.filedetails.fileType === "PHOTO") {
        this.picturelist.map((item) => {
          item.disabled = false
          if (item.name === this.filedetails.fileSuffix) {
            item.disabled = true
          }
        })
        this.filetypelist = this.picturelist
      } else if (this.filedetails.fileType === "VIDEO") {
        this.videolist.map((item) => {
          item.disabled = false
          if (item.name === this.filedetails.fileSuffix) {
            item.disabled = true
          }
        })
        this.filetypelist = this.videolist
      } else if (this.filedetails.fileType === "AUDIO") {
        this.audiolist.map((item) => {
          item.disabled = false
          if (item.name === this.filedetails.fileSuffix) {
            item.disabled = true
          }
        })
        let CustomAudio = this.$refs.CustomAudio as any
        CustomAudio?.resetstate()
        this.filetypelist = this.audiolist
      }
    })
  }
  private signsave() {
    const form = this.filesign as any
    form.submit((data) => {
      console.log(data)
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
    this.fileId = ""
    this.fileCode = ""
  }
  private tccancel() {
    console.log(this.formdata)

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
    let arr = []
    if (this.selectedRowKeys.length > 0) {
      this.selectedRowKeys.map((item) => {
        arr.push(item)
      })
      this.$confirm({
        title: "提示",
        content: `数据删除后无法恢复，确定要删除吗？`,
        onOk() {
          
          _that.DataM.bumendlt(arr).then((res) => {
            if (res.code == 0) {
              _that.$message.success(res.msg)
              _that.gettabledata(_that.formdata)
              _that.selectedRowKeys = []
            } else {
              _that.$message.error(res.msg)
            }
          })
          let xTable1= (_that.$refs.xTable1 as any)
          xTable1.clearCheckboxRow()
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
  public selectAllEvent({ checked, records, reserves }) {
    if (checked) {
      //第一次选数据，还未进行翻页时
      if (reserves.length == 0) {
        this.selectedRowKeys = records.map((v) => v.id)
        this.selectionRows = records
      } else {
        //id集合，翻页存在已选中的数据时,拼接新选中的数据
        this.selectedRowKeys = [
          ...reserves.map((v) => v.id),
          ...records.map((v) => v.id)
        ]
        //数据集合，翻页存在已选中的数据时,拼接新选中的数据
        this.selectionRows = [...reserves, ...records]
      }
      // setCheckboxRow(this.selectionRows, true)
    } else {
      //取消全选时,直接将翻页数据赋值，当前页数据不用加上
      this.selectionRows = reserves
      this.selectedRowKeys = reserves.map((v) => v.id)
      // clearCheckboxRow()
    }
  }

  public selectChangeEvent({ checked, records, reserves, row }) {
    if (checked) {
      // this.selectedRowKeys.push(...records)
      if (reserves.length == 0) {
        this.selectedRowKeys = records.map((v) => v.id)
        this.selectionRows = records
      } else {
        //id集合，翻页存在已选中的数据时,拼接新选中的数据
        this.selectedRowKeys = [
          ...reserves.map((v) => v.id),
          ...records.map((v) => v.id)
        ]
        //数据集合，翻页存在已选中的数据时,拼接新选中的数据
        this.selectionRows = [...reserves, ...records]
      }
    } else {
      //取消选中时
      let idIndex = this.selectedRowKeys.indexOf(row.id)
      if (idIndex > -1) {
        //删除取消选中删除指定元素id
        this.$delete(this.selectedRowKeys, idIndex)
      }
      let dataIndex = null
      for (let i = 0; i < this.selectionRows.length; i++) {
        if (this.selectionRows[i].id == row.id) {
          dataIndex = i
          break
        }
      }
      //删除取消选中的元素整个对象
      this.$delete(this.selectionRows, dataIndex)
    }
  }

  private tableRowClassName(record: any, index: number) {
    record.rowIndex = index
    return record.rowIndex % 2 === 1 ? "bgF5" : ""
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
            _that.DataM.getfiledetails(item).then((res) => {
              window.open(res.data.downloadUrl)
            })
          })
          _that.selectedRowKeys = []

          const xTable1 = _that.$refs.xTable1 as any
          xTable1.clearCheckboxRow()
        }
      })
    } else {
      this.$message.error("请选择需要下载的文件")
    }
  }
  // 音视频上一个
  private previous() {
    this.NextDisabled = false
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == 0) {
      this.$message.info("已经是当前页面第一个")
      // this.PreviousDisabled = true
    } else {
      this.fileId = this.Tablesubscript[index - 1]
      this.getfiledetails(this.fileId)
    }
  }
  //  音视频下一个
  private next() {
    this.PreviousDisabled = false
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == this.Tablesubscript.length - 1) {
      this.$message.info("已经是当前页面最后一个")
      // this.NextDisabled = true
    } else {
      this.fileId = this.Tablesubscript[index + 1]
      this.getfiledetails(this.fileId)
    }
  }
  // 下载
  private filedownload() {
    this.filedownloadshow = true
    this.startswitch = true
    this.getfiledetails(this.fileId)
  }
  private OriginalFileDowbload() {
    window.open(this.downloadUrl)
    setTimeout(() => {
      this.filedownloadshow = false
    }, 600)
  }
  // 删除
  private moduleDlt() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    this.$confirm({
      title: "提示",
      content: `数据删除后无法恢复，确定要删除吗？`,
      onOk() {
        _that.DataM.bumendlt([_that.fileId]).then((res) => {
          if (res.code == 0) {
            _that.$message.success(res.msg)
            _that.visible = false
            _that.gettabledata(_that.formdata)
            _that.selectedRowKeys = []
          } else {
            _that.$message.error(res.msg)
          }
        })
      }
    })
  }
  private Videochange(type, val: any) {
    if (type === "add") {
      this.DataM.videoSnapshot(this.fileCode, val).then((res) => {
        window.open(res.data)
      })
    } else if (type === "toreplay") {
      if (this.$refs.XgVideo as XgVideo) {
        (this.$refs?.XgVideo as any).reload()
      }
    }
  }
  private CurrentFileformat = ""
  private fileChange(val) {
    this.CurrentFileformat = val
    this.startswitch = false
  }
  private FormatTransformation() {
    this.progress = false
    this.progressVal = 0
    this.DataM.convertFormat(this.fileCode, this.CurrentFileformat).then(
      (res) => {
        if (res.code === 0) {
          this.getprogressVal(this.fileCode, this.CurrentFileformat)
          this.progressbtn = true
        }else{
          this.$message.error(res.msg)
          clearInterval(this.time)
        }
      }
    )
  }
  private time = null
  private progressbtn = true
  private filepath = ""
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
    clearInterval(this.time)
    this.progressbtn = false
    this.progressVal = 0
  }
  private confirmfiledown() {
    // 下载
    window.open(this.filepath)
    setTimeout(() => {
      this.filedownloadshow = false
    }, 600)
    this.filepath = ""
    this.progress = true
  }

  private sortChangeEvent({ column, property, order }) {
    if (property === "fileName") property = "file_name"
    if (property === "fileSizeName") property = "file_size"
    if (property === "userName") property = "user_code"
    if (property === "recordDate") property = "record_date"
    if (property === "fileDurationName") property = "file_duration"
    if (property === "uploadDate") property = "upload_date"
    if (property === "uploadStateName") property = "upload_state"
    this.order = order
    this.sidx = property
    this.formdata.order = order
    this.formdata.sidx = property
    this.gettabledata(this.formdata)
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

#AvData {
  .box {
    width: 347px;
    height: 337px;
    background: #ffffff !important;
    border: 1px solid #f1f1f1;
    position: absolute;
    z-index: 100;
  }
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
  .images {
    width: 100%;
    height: 100%;
  }
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
.viewer-next,
.viewer-play,
.viewer-prev,
.viewer-navbar,
.viewer-title {
  display: none;
}
.fileName {
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 340px;
}
</style>
