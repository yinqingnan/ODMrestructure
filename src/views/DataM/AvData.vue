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
                  :wrapper-col="{ span: 14 }"
                  @submit="handleSubmit"
                >
                  <el-scrollbar class="screen">
                    <a-form-item label="部门">
                      <a-tree-select
                        show-search
                        treeNodeFilterProp="title"
                        v-decorator="[
                        'department',
                        {
                          initialValue: undefined,
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
                        title: 'name'
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
                        :show-time="{
                            hideDisabledOptions: true,
                          }"
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
                    <a-form-item label="文件类型">
                      <a-select
                        v-decorator="[
                        'Filetype',
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
                        'levelData',
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
              v-isshow="'lawarchives:avDate:deletes'"
            >批量删除</a-button>
            <a-button
              v-isshow="'lawarchives:avDate:downloads'"
              type="primary"
              @click="download"
              style="line-height:1"
            >批量下载</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            :row-class-name="tableRowClassName"
            height="auto"
            :data="tabledata"
            class="mytable-scrollbar"
            highlight-hover-row
            ref="xTable1"
            @checkbox-all="selectAllEvent"
            @checkbox-change="selectChangeEvent"
          >
            >
            <vxe-table-column type="checkbox" width="50" align="center" />
            <vxe-table-column
              field="fileName"
              title="文件名称"
              align="center"
              show-overflow
              width="240"
            >
              <template v-slot="{ row }">
                <span
                  class="iconfont iconblock"
                  :class="{'iconpicture': row.fileType_Name === '图片', 'iconshiping': row.fileType_Name=='视频', 'iconmusic': row.fileType_Name=='音频'}"
                ></span>
                <span
                  class="textblock"
                  :class="{'gao': row.fileLevel_Name === '高', 'zhong': row.fileLevel_Name=='中', 'di': row.fileLevel_Name=='低'}"
                >{{row.fileLevel_Name}}</span>
                <span>{{row.fileName}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="deptCode" title="执勤部门" align="center" width="100" />
            <vxe-table-column field="userName" title="民警姓名" align="center" show-overflow />
            <vxe-table-column field="userCode" title="民警警号" align="center" />
            <vxe-table-column field="fileType_Name" title="文件类型" align="center" />
            <vxe-table-column field="recordDate" title="摄录时间" show-overflow align="center" />
            <vxe-table-column field="uploadDate" title="导入时间" show-overflow align="center" />
            <vxe-table-column field="relateCase" title="关联信息" show-overflow align="center">
              <template v-slot="{ row }">
                <span>{{modify(row)}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="action" title="操作" align="center" fixed="right">
              <template v-slot="{ row }">
                <span
                  type="text"
                  @click="tablebtn(row)"
                  style="color:#0db8df;cursor: pointer;"
                  v-isshow="'lawarchives:avDate:look'"
                >查看</span>
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
        @cancel="tccancel"
        v-model="visible"
        title="视频查看"
        @ok="handleOk"
        :width="1000"
        :destroyOnClose="true"
      >
        <div class="filesee">
          <div class="filesee_left">
            <div v-if="filedetails.fileType_Name == '图片'">
              <img :src="filedetails.httpPath" />
            </div>
            <div v-if="filedetails.fileType_Name == '视频'" class="AvData">
              <video-player
                style="height:423px"
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
              />
            </div>
            <div v-if="filedetails.fileType_Name == '音频'" class="audiofig">
              <audio controls="controls" controlslist="nodownload" :src="filedetails.httpPath"></audio>
            </div>
          </div>
          <div class="filesee_right">
            <a-tabs
              default-active-key="1"
              :tabBarGutter="10"
              v-model="activeKey"
              @change="tabchange"
            >
              <a-tab-pane key="1" tab="文件">
                <div class="fileclass">
                  <p>{{filedetails.fileName}}</p>
                  <p>{{filedetails.deptName}}({{filedetails.deptCode}}) - {{filedetails.userName}}({{filedetails.userCode}})</p>
                  <ul>
                    <li>摄录时间：{{filedetails.recordDate}}</li>
                    <li>导入时间：{{filedetails.uploadDate}}</li>
                    <li>文件大小：{{filedetails.fileSize_Name}}</li>
                  </ul>
                  <h2>文件存储位置：{{filedetails.storageLocation_Name}}</h2>
                  <h2>剩余存储天数：{{filedetails.storageDays}}</h2>
                </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="标记" force-render>
                <a-form
                  :form="form"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  @submit="biaojiSubmit"
                >
                  <a-form-item label="重要级别">
                    <a-select
                      v-decorator="[
                        'lv',
                        {
                          initialValue: filedetails.fileLevel +'',
                          rules: []
                        }
                      ]"
                    >
                      <a-select-option value="1">请选择</a-select-option>
                      <a-select-option value="3">高</a-select-option>
                      <a-select-option value="2">中</a-select-option>
                      <a-select-option value="1">低</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="存储类别">
                    <a-select
                      v-decorator="[
                        'category',
                        {
                          initialValue: filedetails.categoryId+'',
                          rules: []
                        }
                      ]"
                    >
                      <a-select-option v-for="d in tcselect" :key="d.id">{{ d.name }}</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="标记描述">
                    <a-textarea
                      style="display: flex;height:120px !important;overflow-y:auto;resize: none;"
                      allowClear
                      v-decorator="[
                      'remark',
                      {
                        initialValue: filedetails.marker,
                        rules: [],
                      },
                    ]"
                      :autoSize="{ minRows: 3, maxRows: 3 }"
                    />
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 12, offset: 5 }" style="text-align:center">
                    <a-button
                      v-isshow="'lawarchives:avDate:oneBtn'"
                      type="primary"
                      html-type="submit"
                    >保存</a-button>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
              <a-tab-pane key="3" tab="标注">
                <a-form
                  :form="form2"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 18 }"
                  @submit="biaozhuSubmit"
                >
                  <el-scrollbar style="height:300px;width: 379px;">
                    <a-form-item label="标注类型">
                      <a-select
                        @change="labelTypeChange"
                        placeholder="请选择标注类型"
                        v-decorator="[
                        'labelType',
                        {
                          initialValue: undefined,
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                      >
                        <a-select-option v-for="d in taggingselect1" :key="d.key">{{ d.value }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="标注子类">
                      <a-select
                        placeholder="请选择标注子类"
                        v-decorator="[
                        'labelSubclass',
                        {
                          initialValue: undefined,
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                      >
                        <a-select-option v-for="d in taggingselect2" :key="d.key">{{ d.value }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="车牌号码">
                      <a-input
                        placeholder="没有车牌号，请填写无"
                        v-decorator="[
                        'plateNumber',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                      />
                    </a-form-item>
                    <a-form-item label="采集时间" class="biaozhu">
                      <a-date-picker
                        placeholder="请选择采集时间"
                        v-decorator="[
                        'gatheringTime',
                        {
                          initialValue:'',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                      />
                    </a-form-item>
                    <a-form-item label="采集地址">
                      <a-input
                        placeholder="请输入采集地址（30字以内）"
                        v-decorator="[
                        'gatheringPlace',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                      />
                    </a-form-item>
                    <a-form-item label="标注描述">
                      <a-textarea
                        placeholder="请输入标注描述（200字以内）"
                        style="display: flex;overflow-y:auto;resize: none;"
                        allowClear
                        v-decorator="[
                      'remark',
                      {
                        initialValue:'',
                        rules: [{ required: true, message: '必填项不能为空' }],
                      },
                    ]"
                        :autoSize="{ minRows: 3, maxRows: 3 }"
                      />
                    </a-form-item>
                  </el-scrollbar>
                </a-form>
                <a-button
                  v-isshow="'lawarchives:avDate:threeBtn'"
                  type="primary"
                  @click="biaozhuSubmit"
                  style="margin-top: 14px;margin-left: 44%;"
                >保存</a-button>
              </a-tab-pane>
              <a-tab-pane key="4" tab="评价" v-isshow="'lawarchives:avDate:fourTab'">
                <a-form
                  :form="form3"
                  :label-col="{ span:4 }"
                  :wrapper-col="{ span: 20 }"
                  @submit="pingjiaSubmit"
                >
                  <a-form-item label="评价总分">
                    <a-input
                      :disabled="true"
                      v-decorator="[
                        'Total',
                        {
                          initialValue: Total,
                          rules: []
                        }
                      ]"
                    />
                  </a-form-item>
                  <a-form-item label="评分项">
                    <a-checkbox-group
                      :disabled="disabled"
                      v-decorator="['Scoring', { initialValue: []}]"
                      style="width: 100%;"
                    >
                      <el-scrollbar style="height:130px;" v-if="!disabled">
                        <a-row>
                          <a-col
                            :span="24"
                            v-for="(d) in options"
                            :key="d.id"
                            style="line-height: 30px;height: 30px;"
                          >
                            <a-checkbox
                              style="letter-spacing: -0.5px;"
                              @change="checkboxChange($event, d.jffz)"
                              :value="d.jfbh"
                            >{{d.jfmc}}(-{{d.jffz}}分)</a-checkbox>
                          </a-col>
                        </a-row>
                      </el-scrollbar>
                      <el-scrollbar style="height:130px;" v-else>
                        <a-row>
                          <a-col
                            :span="24"
                            v-for="(d) in options"
                            :key="d.id"
                            style="line-height: 30px;height: 30px;"
                          >
                            <a-checkbox
                              style="letter-spacing: -0.5px;"
                              @change="checkboxChange($event, d.jffz)"
                              :value="d.code"
                            >{{d.name}}(-{{d.score}}分)</a-checkbox>
                          </a-col>
                        </a-row>
                      </el-scrollbar>
                    </a-checkbox-group>
                  </a-form-item>
                  <a-form-item label="实际评分">
                    <a-input
                      :disabled="true"
                      v-decorator="[
                        'Actualscore',
                        {
                          initialValue:Actualscore,
                          rules: []
                        }
                      ]"
                    />
                  </a-form-item>
                  <a-form-item label="评分说明">
                    <a-textarea
                      :disabled="disabled"
                      style="display: flex;overflow-y:auto;resize: none;"
                      allowClear
                      v-decorator="[
                      'remark',
                      {
                        initialValue: filedetails.marker,
                        rules: [],
                      },
                    ]"
                      :autoSize="{ minRows: 3, maxRows: 3 }"
                    />
                  </a-form-item>
                  <a-form-item
                    :wrapper-col="{ span: 12, offset: 5 }"
                    v-if="!disabled"
                    style="text-align:center"
                  >
                    <a-button
                      v-isshow="'lawarchives:avDate:foreBtn'"
                      type="primary"
                      html-type="submit"
                    >保存</a-button>
                  </a-form-item>
                </a-form>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>

        <template slot="footer">
          <a-button type @click="previous">上一个</a-button>
          <a-button type @click="next">下一个</a-button>
          <a-button type @click="filedownload" v-isshow="'lawarchives:avDate:download'">下载</a-button>
          <a-button type @click="moduleDlt">删除</a-button>
        </template>
      </a-modal>
      <a-modal v-model="logshow" title="日志" :footer="null" @cancel="logclear">
        <el-scrollbar style="200px">
          <p
            v-for="item in logmsg"
            :key="item.id"
            style="text-align: center;margin-top:8px;font-size:12px"
          >{{item.text}}</p>
        </el-scrollbar>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { LimitInputlength, page, layouts } from "@/InterfaceVariable/variable"

import { Component, Vue } from "vue-property-decorator"
import moment from "moment"
@Component({})
export default class AvData extends Vue {
  [x: string]: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  public form!: any
  public form1!: any
  public form2!: any
  public form3!: any
  private departmentData = []
  private page = page
  private activeKey = "1"
  private tcselect = []
  private visible = false
  private layouts = layouts
  private options = []
  private Total = 0
  private fileId = ""
  private Actualscore = 100
  private logshow = false
  private playerOptions = {
    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
    autoplay: false, //如果true,浏览器准备好时开始回放。
    muted: false, // 默认情况下将会消除任何音频。
    loop: false, // 导致视频一结束就重新开始。
    preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: "zh-CN",
    aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    sources: [
      {
        type: "",
        src: "http://vjs.zencdn.net/v/oceans.mp4", //url地址
        // src: "" //url地址
      },
    ],
    poster: "", //你的封面地址
    // width: document.documentElement.clientWidth,
    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true, //全屏按钮
    },
  }
  private Timetype = [
    { id: 1, value: "uploadDate", title: "导入时间" },
    { id: 2, value: "recordDate", title: "拍摄时间" },
  ]
  private filetype = [
    { id: 1, value: "video", title: "视频" },
    { id: 2, value: "audio", title: "音频" },
    { id: 3, value: "photo", title: "图片" },
    { id: 4, value: "log", title: "日志" },
  ]
  private levelData = [
    { id: 1, value: "3", title: "高" },
    { id: 2, value: "2", title: "中" },
    { id: 3, value: "1", title: "低" },
  ]
  private defaultdate = [
    moment("2012-06-06", "YYYY-MM-DD"),
    moment("2020-06-06", "YYYY-MM-DD"),
  ]
  private filedetails = {
    fileName: "",
    deptName: "",
    deptCode: "",
    userCode: "",
    recordDate: "",
    uploadDate: "",
    fileSize_Name: "",
    storageLocation_Name: "",
    storageDays: "",
    downloadPath: "",
    id: "",
    fileType_Name: "",
    marker: "",
    categoryId: "",
    userName: "",
    fileLevel: "",
    httpPath: "",
  }
  private myDate = []
  private selectdata = []
  private selectedRowKeys = []
  private Height = ""
  private tabledata = []
  private formdata = {
    department: "",
    user: "",
    TimeData: "",
    Filetype: "",
    levelData: "",
    date: [],
  }
  private logmsg = []
  private taggingselect1 = []
  private taggingselect2 = []
  private labelType = ""
  private taggingmsg = []
  private fileCode = ""
  private disabled = false
  private Tablesubscript = []
  private created() {
    this.form = this.$form.createForm(this)
    this.form1 = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
    this.form3 = this.$form.createForm(this)
    this.getdata()
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    //  this.DataM.roledataright().then((res) => {
    //    console.log(res)
    //   // if (res.data == 1) {
    //   //   // 
    //   // }
    //  })
  }

  private handleOk() {
    return
  }

  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        this.formdata = val
        let uploadDate_gt = val.date[0].format("YYYY-MM-DD HH:mm:ss")
        let uploadDate_lt = val.date[1].format("YYYY-MM-DD HH:mm:ss")
        if (val.TimeData == "uploadDate") {
          let obj = {
            page: 1,
            limit: 15,
            deptCode_equal: val.department, //部门id
            userName: val.user, //警员
            timeType: val.TimeData, //时间类型
            timeRange: this.myDate,
            fileType_equal: val.Filetype,
            fileLevel_equal: val.levelData,
            uploadDate_gt: uploadDate_gt, //必填  时间起
            uploadDate_lt: uploadDate_lt, //必填  时间止
          }
          this.gettabledata(obj)
        } else if (val.TimeData == "recordDate") {
          let obj = {
            page: 1,
            limit: 15,
            deptCode_equal: val.department, //部门id
            userName: val.user, //警员
            timeType: val.TimeData, //时间类型
            timeRange: this.myDate,
            fileType_equal: val.Filetype,
            fileLevel_equal: val.levelData,
            recordDate_gt: uploadDate_gt,
            recordDate_lt: uploadDate_lt,
          }
          this.gettabledata(obj)
        }
      }
    })
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    // 标记下拉数据
    this.DataM.getfileselect().then((res) => {
      // console.log(res.data)
      this.tcselect = res.data
    })
    this.DataM.gettimeframe({ type: "LATELY_MONTH" }, true).then((res: any) => {
      this.myDate = res.data.myDate
      // todo 请求默认时间
      this.defaultdate = [
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD"),
      ]
      console.log(
        moment(res.data.myDate.split("~")[0]).format("YYYY-MM-DD HH:mm:ss")
      )
      let obj = {
        page: 1,
        limit: 15,
        deptCode_equal: "", //部门id
        userName: "", //警员
        timeType: "uploadDate", //时间类型
        timeRange: "2020-10-06 ~ 2020-11-06",
        fileType_equal: "",
        fileLevel_equal: "",
        uploadDate_gt: moment(res.data.myDate.split("~")[0]).format(
          "YYYY-MM-DD HH:mm:ss"
        ), //必填  时间起
        uploadDate_lt: moment(res.data.myDate.split("~")[1]).format(
          "YYYY-MM-DD HH:mm:ss"
        ), //必填  时间止
        recordDate_gt: "",
      }
      this.gettabledata(obj)
    })
  }
  private gettabledata(obj): void {
    this.DataM.gettabledata(obj, true).then((res: any) => {
      this.page.totalResult = parseInt(res.count)
      this.tabledata = res.data
      this.Tablesubscript = []
      // 保存当前表格的所有code
      res.data.map((item) => {
        this.Tablesubscript.push(item.id)
      })
    })
  }

  private reset() {
    this.form.resetFields()
    // this.defaultdate = []
  }
  private popup(e: { preventDefault: () => void }) {
    e.preventDefault()
  }
  private logclear() {
    this.logshow = false
    this.logmsg = []
  }
  private tablebtn(row: any) {
    console.log(row)
    if (row.fileType_Name == "日志") {
      this.DataM.getlogmsg(row.id).then((res) => {
        console.log(res.data.split(/\r\n/g))
        let splits = res.data.split(/\r\n/g)
        let dataList = []
        for (let i = 0; i < splits.length; i++) {
          dataList.push({
            id: i,
            text: splits[i],
          })
        }
        console.log(dataList)
        this.logshow = true
        this.logmsg = dataList
      })
    } else {
      // 弹窗文件信息
      this.DataM.getfiledetails(row.id).then((res) => {
        this.visible = true
        this.fileCode = row.code
        this.fileId = row.id
        this.activeKey = "1"
        this.form2.resetFields()
        this.form1.resetFields()
        this.filedetails = res.data
        this.playerOptions["sources"][0]["src"] = res.data.httpPath //修改视频方法
      })
    }
  }
  private tabchange(activeKey) {
    console.log(activeKey)
    if (activeKey == 3) {
      // 标注信息
      this.DataM.getfiletagging(this.fileCode).then((res) => {
        console.log(res.data)
        if (res.data) {
          this.labelType = res.data.labelType
          this.taggingmsg = res.data
          // 标注下拉数据1
          this.DataM.taggingselect1().then((res) => {
            console.log(res.data)
            this.taggingselect1 = res.data
          })
          // 标注下拉数据2
          this.DataM.taggingselect2(this.labelType).then((res) => {
            console.log(res.data)
            this.taggingselect2 = res.data
          })
          setTimeout(() => {
            this.$nextTick(() => {
              this.form2.setFieldsValue({
                labelType: res.data.labelType,
                labelSubclass: res.data.labelSubclass,
                plateNumber: res.data.plateNumber,
                gatheringTime: moment(res.data.gatheringTime),
                gatheringPlace: res.data.gatheringPlace,
                remark: res.data.remark,
              })
            })
          })
        }
      })
    } else if (activeKey == 4) {
      this.DataM.evaluate(this.fileCode).then((res) => {
        console.log(res)
        if (res.data) {
          this.Total = res.data.total
          this.disabled = true
          console.log(res.data)
          this.options = res.data.items
          let arr = res.data.items
          let newarr = []
          arr.map((item) => {
            newarr.push(item.code)
          })
          this.$nextTick(() => {
            this.form3.setFieldsValue({
              Scoring: newarr,
              Actualscore: res.data.score,
              remark: res.data.remark,
              Total: res.data.total,
            })
          })
          console.log("这是已经评价过的")
        } else {
          console.log("尚未评价")
          this.disabled = false
          this.DataM.lawarchives().then((res) => {
            console.log(res)
            this.$nextTick(() => {
              this.form3.setFieldsValue({
                Scoring: [],
                remark: "",
              })
            })
            this.Total = res.data.total
            this.options = res.data.list
          })
        }
      })
    } else if (activeKey == 2) {
      this.DataM.getfiledetails(this.fileId).then((res) => {
        this.filedetails = res.data
        console.log(res.data)
        this.fileCode = res.data.code
        // this.playerOptions['sources'][0]['src'] = res.data.httpPath;   修改视频方法
      })
    }
  }
  public rowClassName(record: any, index: number) {
    let className = "light-row"
    if (index % 2 === 1) className = "dark-row"
    return className
  }
  private biaojiSubmit(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        let obj = {
          categoryId: val.category,
          fileLevel: val.lv,
          id: this.filedetails.id,
          marker: val.marker,
        }
        this.DataM.marksave(obj).then((res) => {
          // console.log(res)
          this.$message.info(res.msg)
        })
      }
    })
  }
  private biaozhuSubmit(e) {
    e.preventDefault()
    this.form2.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(moment(val.gatheringTime).format("YYYY-MM-DD HH:mm:ss"))
        console.log(this.fileCode)
        let obj = {
          fileCode: this.fileCode,
          gatheringPlace: val.gatheringPlace,
          gatheringTime: moment(val.gatheringTime).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
          labelSubclass: val.labelSubclass,
          labelType: val.labelType,
          plateNumber: val.labelType,
          remark: val.remark,
        }
        this.DataM.taggingsave(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
          }
        })
      }
    })
  }
  public sum = 0
  private checkboxChange(e, val) {
    console.log(e.target.checked)
    if (e.target.checked) {
      this.sum += val
    } else {
      this.sum -= val
    }
    this.Actualscore = this.Total - this.sum
  }
  private pingjiaSubmit(e) {
    e.preventDefault()
    this.form3.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(this.fileCode)
        console.log(val)
        let arr = val.Scoring
        let newarr = []
        arr.map((item) => {
          newarr.push(
            this.options.filter((el) => {
              return el.jfbh == item
            })
          )
        })
        let items = []
        newarr.map((item) => {
          let obj = {
            code: item[0].jfbh,
            score: item[0].jffz + "",
            name: item[0].jfmc,
          }
          items.push(obj)
        })
        let obj = {
          fileCode: this.fileCode,
          items: items,
          logType: "1",
          score: val.Actualscore,
          total: val.Total,
          remark: val.remark,
        }
        this.DataM.pfsave(obj).then((res) => {
          console.log(res)
          if (res.code == 0) {
            this.disabled = true
            this.$message.success(res.msg)
            this.sum = 0
            this.DataM.evaluate(this.fileCode).then((res) => {
              if (res.data) {
                this.Total = res.data.total
                console.log(res.data)
                this.options = res.data.items
              }
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  private labelTypeChange(value) {
    this.DataM.taggingselect2(value).then((res) => {
      console.log(res.data)
      this.taggingselect2 = res.data
      this.form2.setFieldsValue({
        labelSubclass: undefined,
      })
    })
  }
  public download() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    if (this.selectedRowKeys.length != 0) {
      this.$confirm({
        title: "提示",
        content: `确认批量下载${this.selectedRowKeys.length}个文件？同时下载文件过多可能造成浏览器卡顿如果浏览器未出现下载提示，请您在浏览器地址栏右侧，点击‘已拦截的弹窗’，选择‘始终允许显示本站点的弹出式窗口`,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            _that.selectedRowKeys.map((item) => {
              window.open(item.httpPath)
            })
            _that.selectedRowKeys = []
            ;(_that.$refs.xTable1 as any).clearCheckboxRow()
          }).catch(() => console.log("下载失败"))
        },
      })
    } else {
      this.$message.error("请选择需要下载的文件")
    }
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
            _that.DataM.bumendlt(arr).then((res) => {
              if (res.code == 0) {
                _that.$message.success(res.msg)
                let obj = {
                  page: 1,
                  limit: 15,
                  deptCode_equal: _that.formdata.department, //部门id
                  userName: _that.formdata.user, //警员
                  timeType: _that.formdata.TimeData, //时间类型
                  timeRange: _that.myDate,
                  fileType_equal: _that.formdata.Filetype,
                  fileLevel_equal: _that.formdata.levelData,
                  uploadDate_gt: _that.formdata.date[0].format(
                    "YYYY-MM-DD HH:mm:ss"
                  ), //必填  时间起
                  uploadDate_lt: _that.formdata.date[1].format(
                    "YYYY-MM-DD HH:mm:ss"
                  ), //必填  时间止
                  recordDate_gt: "",
                }
                _that.gettabledata(obj)
                _that.selectedRowKeys = []
              } else {
                _that.$message.error(res.msg)
              }
            })
            ;(_that.$refs.xTable1 as any).clearCheckboxRow()
          }).catch(() => console.log("删除失败"))
        },
      })
    } else {
      this.$message.error("请选择需要删除的文件")
    }
  }
  public pagerchange({ currentPage, pageSize }) {
    let obj = {
      page: currentPage,
      limit: pageSize,
      deptCode_equal: this.formdata.department, //部门id
      userName: this.formdata.user, //警员
      timeType: this.formdata.TimeData, //时间类型
      timeRange: this.myDate,
      fileType_equal: this.formdata.Filetype,
      fileLevel_equal: this.formdata.levelData,
      uploadDate_gt: this.formdata.date[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
      uploadDate_lt: this.formdata.date[1].format("YYYY-MM-DD HH:mm:ss"), //必填  时间止
      recordDate_gt: "",
    }
    this.gettabledata(obj)
  }
  public selectAllEvent({ checked, records }) {
    this.selectedRowKeys = records
    console.log(checked ? "所有勾选事件" : "所有取消事件", records)
  }
  public selectChangeEvent({ checked, records }) {
    this.selectedRowKeys = records
    console.log(checked ? "勾选事件" : "取消事件", records)
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }

  public modify(row) {
    var cases = row.relateCase
    if (cases) {
      if (JSON.stringify(cases) == "{}") {
        return "关联删除"
      }
      var resStr = ""
      for (var key in cases) {
        resStr += cases[key] + "(" + key + "),"
      }
      resStr = resStr.substring(0, resStr.length - 1)
      return resStr
    } else {
      return "未关联"
    }
  }
  private filedownload() {
    // alert("当前下载" + this.filedetails.downloadPath)
    window.open(this.filedetails.downloadPath)
  }
  private tccancel() {
    this.activeKey = "1"
    this.form.resetFields()
    this.form2.resetFields()
    this.form3.resetFields()
  }
  private previous() {
    console.log(this.Tablesubscript)
    console.log(this.fileId)
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == 0) {
      this.$message.info("已经是第一个了")
    } else {
      this.fileId = this.Tablesubscript[index - 1]
      console.log(this.fileId)
      // 修改弹窗文件信息
      this.DataM.getfiledetails(this.fileId).then((res) => {
        this.filedetails = res.data
        console.log(res.data)
        this.fileCode = res.data.code
        this.activeKey = "1"
        this.playerOptions["sources"][0]["src"] = res.data.httpPath //修改视频方法
      })
    }
  }
  private next() {
    let index = this.arrSelect(this.Tablesubscript, this.fileId)
    if (index == this.Tablesubscript.length - 1) {
      this.$message.info("已经是当前页面最后一个")
    } else {
      this.fileId = this.Tablesubscript[index + 1]
      console.log(this.fileId)
      // 修改弹窗文件信息
      this.DataM.getfiledetails(this.fileId).then((res) => {
        this.filedetails = res.data
        console.log(res.data)
        this.fileCode = res.data.code
        this.activeKey = "1"
        this.playerOptions["sources"][0]["src"] = res.data.httpPath //修改视频方法
      })
    }
  }
  private arrSelect(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val + "") return i
    }
    return -1
  }

  private moduleDlt() {
    console.log(this.fileId)
    this.DataM.bumendlt([this.fileId]).then((res) => {
      if (res.code == 0) {
        this.$message.success(res.msg)
        let obj = {
          page: 1,
          limit: 15,
          deptCode_equal: this.formdata.department, //部门id
          userName: this.formdata.user, //警员
          timeType: this.formdata.TimeData, //时间类型
          timeRange: this.myDate,
          fileType_equal: this.formdata.Filetype,
          fileLevel_equal: this.formdata.levelData,
          uploadDate_gt: this.formdata.date[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
          uploadDate_lt: this.formdata.date[1].format("YYYY-MM-DD HH:mm:ss"), //必填  时间止
          recordDate_gt: "",
        }
        this.gettabledata(obj)
        this.visible = false
      } else {
        this.$message.error(res.msg)
      }
    })
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
  width: 200px !important;
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
      height: 100%;
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
.fileclass {
  padding-left: 22px;
  p {
    color: #7f8893;
  }
  ul {
    padding-left: 24px;
    li {
      line-height: 36px;
      font-size: 12px;
      color: #7f8893;
    }
  }
  h2 {
    font-size: 12px;
    line-height: 1;
    margin-bottom: 16px;
    color: #7f8893;
  }
}
.AvData {
  .vjs-custom-skin > .video-js {
    height: 423px;
  }
}
.biaozhu {
  .ant-calendar-picker {
    width: 284px !important;
  }
}
.audiofig {
  audio {
    margin-top: 36%;
    margin-left: 19%;
  }
}
</style>
