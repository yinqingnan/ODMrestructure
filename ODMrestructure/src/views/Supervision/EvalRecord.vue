<template>
  <!-- 考评记录 -->
  <div>
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div class="contaninerheader" style="padding-left:25px">
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
                        title: 'name'
                      }"
                        placeholder="请选择..."
                      />
                    </a-form-item>
                    <a-form-item class="boxradio" label="是否包含子部门">
                      <a-checkbox
                        v-decorator="['contain', {  valuePropName: 'checked',
            initialValue: false, }]"
                      >包含子部门</a-checkbox>
                    </a-form-item>

                    <a-form-item label="姓名/警号">
                      <a-input
                        v-decorator="['user', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入姓名/警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="考评结果">
                      <a-select
                        v-decorator="[
                        'Evaluation',
                        {
                          initialValue: [],
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in Evaluationlist" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="摄录时间">
                      <a-range-picker
                        format="YYYY-MM-DD"
                        :allowClear="false"
                        :show-time="{
                        hideDisabledOptions: true,
                        defaultValue: [],
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
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handleSubmit">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div></div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            resizable
            height="auto"
            :data="tableData"
            highlight-hover-row
            :row-class-name="tableRowClassName"
            class="mytable-scrollbar"
            show-header-overflow
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column
              field="fileName"
              title="文件名称"
              align="left"
              header-align="center"
              show-overflow
              width="300"
            >
              <template v-slot="{ row }">
                <span
                  class="iconfont iconblock"
                  :class="{'iconpicture': row.fileType_Name === '图片', 'iconshiping': row.fileType_Name=='视频', 'iconmusic': row.fileType_Name=='音频'}"
                ></span>
                <span
                  style="cursor: pointer;text-align:center"
                  class="textblock"
                  :class="{'gao': row.fileLevel == '3', 'zhong': row.fileLevel=='2', 'di': row.fileLevel=='1'}"
                >{{fileLevel(row.fileLevel)}}</span>
                <span style="color:#0db8df;cursor: pointer;" @click="tablebtn(row)" v-right="'fileEvaluate:evaluationRecord:look'" ref="kpjgright">{{row.fileName}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="deptName" title="部门" align="center" width="100" />
            <vxe-table-column
              field="userName"
              title="姓名/警号"
              align="center"
              min-width="110"
              show-overflow
            >
               <template v-slot="{ row }">{{row.userName}}({{row.userCode}})</template>
            </vxe-table-column>
            <vxe-table-column
              field="recordDate"
              title="摄录时间"
              show-overflow
              align="center"
              min-width="140"
            />
            <vxe-table-column
              field="fileDuration_Name"
              title="摄录时长"
              show-overflow
              align="center"
              min-width="140"
            />
            <vxe-table-column
              field="uploadDate"
              title="导入时间"
              show-overflow
              align="center"
              min-width="140"
            />
            <vxe-table-column
              field="score"
              title="考评结果"
              align="center"
              show-overflow
              min-width="130"
            >
              <template v-slot="{ row }">
                <span :style="{'color': (score(row)=='通过' ? 'green':'#ff0000')}">{{score(row)}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="evaluateItems"
              title="扣分项"
              show-overflow
              align="center"
              min-width="120"
            >
              <template v-slot="{ row }">{{evaluateItems(row)}}</template>
            </vxe-table-column>
            <vxe-table-column
              field="evaluateName"
              title="考评人"
              show-overflow
              align="center"
              width="100"
            >
              <template v-slot="{ row }">{{evaluateName(row)}}</template>
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
        v-model="visible"
        title="媒体文件查看"
        @ok="handleOk"
        :width="1000"
        @cancel="tccancel"
        :maskClosable="false"
        :keyboard='false'
      >
        <div class="filesee">
          <div class="filesee_left">
            <div v-if="filedetails.fileType_Name == '图片'" style="height:100%">
              <img :src="filedetails.httpPath" alt />
              <!-- <img
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3868564487,3858491216&fm=26&gp=0.jpg"
                alt
              />-->
            </div>
            <div v-if="filedetails.fileType_Name == '视频'" class="AvData">
              <video-player
                style="height:423px"
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @ended="onPlayerEnded($event)"
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
                <a-form :form="form1" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
                  <a-form-item label="重要级别">
                    <a-select
                      :disabled="disabled"
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
                      :disabled="disabled"
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
                      :disabled="disabled"
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
                  <!-- <a-form-item :wrapper-col="{ span: 12, offset: 5 }" style="text-align:center">
                    <a-button type="primary" html-type="submit">保存</a-button>
                  </a-form-item>-->
                </a-form>
              </a-tab-pane>
              <a-tab-pane key="3" tab="标注">
                <a-form
                  :form="form2"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 16 }"
                  v-if="!Emptystate"
                >
                  <el-scrollbar style="height:300px;width: 397px;">
                    <a-form-item label="标注类型">
                      <a-select
                        disabled
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
                        disabled  
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
                        disabled
                        placeholder="没有车牌号，请填写无"
                        :max-length="LimitInputlength"
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
                        disabled
                        style="width：200px"
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
                        disabled
                        placeholder="请输入采集地址（30字以内）"
                        :max-length="LimitInputlength"
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
                        disabled
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
                <a-empty v-else style="margin-top:94px">
                  <span slot="description">没有标注信息</span>
                </a-empty>
              </a-tab-pane>
              <a-tab-pane key="4" tab="评价">
                <a-form :form="form3" :label-col="{ span:4 }" :wrapper-col="{ span: 20 }">
                  <a-form-item label="评价总分">
                    <a-input
                      :disabled="true"
                      v-decorator="[
                        'Total',
                        {
                          initialValue: '',
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
                      <el-scrollbar style="height:130px;">
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
                          initialValue:'',
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
                        initialValue: '',
                        rules: [],
                      },
                    ]"
                      :autoSize="{ minRows: 3, maxRows: 3 }"
                    />
                  </a-form-item>
                  <!-- <a-form-item
                    :wrapper-col="{ span: 12, offset: 5 }"
                    v-if="!disabled"
                    style="text-align:center"
                  >
                    <a-button type="primary" html-type="submit">保存</a-button>
                  </a-form-item>-->
                </a-form>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>

        <template slot="footer">
          <!-- <a-button type @click="previous">上一个</a-button>
          <a-button type @click="next">下一个</a-button>-->
          <a-button
            type
            @click="filedownload"
            v-isshow="'fileEvaluate:evaluationRecord:download'"
          >下载</a-button>
          <!-- <a-button type @click="moduleDlt">删除</a-button> -->
        </template>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { LimitInputlength, page, layouts } from "@/InterfaceVariable/variable"

import moment from "moment"
@Component({
  components: {},
})
export default class EvalRecord extends Vue {
  [x: string]: any
  public form!: any
  public form1!: any
  public form2!: any
  public form3!: any
  public DataM = new this.$api.configInterface.DataM()
  public Supervision = new this.$api.configInterface.Supervision()
  private LimitInputlength = LimitInputlength
  private departmentData = []
  private defaultdate = [moment("2010-10-20"), moment("2020-10-20")]
  private page= {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private textcolor = false
  private tableColumn = [
    { type: "seq", width: 60, fixed: null, title: "序号", align: "center" },
    { field: "fileName", width: 200, title: "文件名" },
    { field: "deptCode", title: "部门", width: 120 },
    { field: "userName", title: "民警姓名" },
    { field: "userCode", title: "民警警号" },
    { field: "fileType_Name", title: "文件类型" },
    { field: "recordDate", title: "摄录时间" },
  ]
  private layouts = layouts
  private tableData = []
  private formdata = {
    contain: "",
    date: [],
    department: "",
    user: "",
    Evaluation: "",
  }
  private Evaluationlist = [
    { id: "1", value: "-1", title: "全部" },
    { id: "1", value: "1", title: "正常" },
    { id: "1", value: "0", title: "异常" },
  ]
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
  private visible = false
  private filedetails = {
    downloadPath: "",
    fileName: "",
    deptName: "",
    deptCode: "",
    userName: "",
    userCode: "",
    recordDate: "",
    uploadDate: "",
    fileSize_Name: "",
    storageLocation_Name: "",
    storageDays: "",
    fileLevel: "",
    categoryId: "",
    marker: "",
    fileType_Name: "",
    httpPath: "",
  }
  private activeKey = "4"
  private fileId = ""
  private fileCode = ""
  private tcselect = []
  private disabled = true
  private taggingselect1 = []
  private taggingselect2 = []
  private Emptystate = false
  private labelType = ""
  private taggingmsg = []
  private options = []
  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form1 = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
    this.form3 = this.$form.createForm(this)
    this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  // private mounted() {

  // }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      console.log(res)
      this.departmentData = res.data
    })
    this.DataM.gettimeframe({ type: "LATELY_MONTH" }, true).then((res: any) => {
      console.log(res.data.myDate)
      this.myDate = res.data.myDate
      this.defaultdate = [
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD"),
      ]
      this.gettabledata({
        page: this.page.currentPage,
        limit: this.page.pageSize,
        deptCode: "",
        user: "",
        isNormal: -1,
        dateRange: res.data.myDate,
        isDown: 0,
      })
      // 标记下拉数据
      this.DataM.getfileselect().then((res) => {
        this.tcselect = res.data
      })
    })
  }
  private reset() {
    this.form.resetFields()
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private handleSubmit(e: MouseEvent) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      this.formdata = val
      if (!err) {
        let str = 0
        if (val.contain) {
          str = 1
        } else {
          str = 0
        }
        let date = `${moment(val.date[0]).format("YYYY-MM-DD")} ~ ${moment(
          val.date[1]
        ).format("YYYY-MM-DD")}`
        this.gettabledata({
          page: this.page.currentPage,
          limit: this.page.pageSize,
          deptCode: val.department,
          user: val.user,
          isNormal: val.Evaluation,
          dateRange: date,
          isDown: str,
        })
      }
    })
  }
  private gettabledata(obj) {
    this.Supervision.gettabledata(obj).then((res) => {
      console.log(res)
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private popup() {
    return
  }
  private handleOk() {
    return
  }
  private evaluateName(row) {
    if(row.evaluateName){
      return `${row.evaluateName}(${row.deptCode})`
    }else{
      return `${row.deptCode}`
    }
    
  }
  private evaluateItems(row) {
    let str = ""
    // console.log(row)
    if (row.evaluateItems != null) {
      row.evaluateItems.map((item) => {
        str += item.name
      })
      return str
    } else {
      str
    }
  }
  private score(row) {
    let str = 0
    if (row.evaluateItems != null) {
      row.evaluateItems.map((item) => {
        str += item.score
      })
      if (str > 0) {
        this.textcolor = false
        return `异常（扣${str}分）`
      } 
    }else {
      return "通过"
    }
  }
  private relateCase(row) {
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
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let str = 0
    if (this.formdata.contain) {
      str = 1
    } else {
      str = 0
    }
    let date = `${moment(this.formdata.date[0]).format(
      "YYYY-MM-DD"
    )} ~ ${moment(this.formdata.date[1]).format("YYYY-MM-DD")}`
    console.log(str, date)
    this.gettabledata({
      page: currentPage,
      limit: pageSize,
      deptCode: this.formdata.department,
      user: this.formdata.user,
      isNormal: this.formdata.Evaluation,
      dateRange: date,
      isDown: str,
    })
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }

  private tablebtn(row) {
    console.log(row)
    if((this.$refs.kpjgright as HTMLElement).style.cursor !== 'not-allowed'){
      this.visible = true
      this.fileId = row.id
      this.fileCode = row.code
      this.DataM.getfiledetails(this.fileId).then((res) => {
        console.log(res)
        this.filedetails = res.data
        this.playerOptions["sources"][0]["src"] = res.data.httpPath //修改视频方法
      })
      this.DataM.evaluate(this.fileCode).then((res) => {
        console.log(res)
        let arr = []
        res.data.items.map((item) => {
          arr.push(item.code)
        })
        this.options = res.data.items
        this.$nextTick(() => {
          this.form3.setFieldsValue({
            Scoring: arr,
            Total: res.data.total,
            Actualscore: res.data.score,
            remark: res.data.remark,
          })
        })
      })
    }
  }

  private tabchange(activeKey) {
    if (activeKey == 3) {
      this.DataM.getfiletagging(this.fileCode).then((res) => {
        if (res.data) {
          console.log("有值")
          this.Emptystate = false
          this.labelType = res.data.labelType
          this.taggingmsg = res.data
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
        }else{
          this.Emptystate = true
        }
      })
    }
  }
  private tccancel() {
    this.activeKey = "4"
    //取消重置所有用到的表单
  }
  private filedownload() {
    console.log(this.filedetails.downloadPath)
    window.open(this.filedetails.downloadPath)
  }
  // 视频播完回调
  private onPlayerEnded(e) {
    (this.$refs.videoPlayer as any).player.src(e.options_.sources[0].src) // 重置视频进度条
  }
  private fileLevel(val) {
    let str = ''
    switch (val) {
    case 1:
      str='低'
      break;
    case 2:
      str= '中'
      break;
    case 3:
      str= '高'
      break;
    default:
      break;
    }
    return str
  }
}
</script>

<style lang="less" scope>
.screen {
  width: 347px;
  height: 260px;
}
.ant-calendar-picker {
  width: 100% !important;
}
// .boxradio{
//   margin-left: 20px;
// }
.filesee {
  display: flex;
  height: 410px;
  .filesee_left {
    width: 560px;
    margin-right: 12px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
    div {
      height: auto;
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
     width: 100% !important;
    // width: 276px !important;
  }
}
</style>
