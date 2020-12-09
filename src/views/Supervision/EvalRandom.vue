<template>
  <div>
    <!-- 随机抽查 -->
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
                    <a-form-item label="执勤部门">
                      <a-tree-select
                        show-search
                        treeNodeFilterProp="title"
                        v-decorator="[
                        'department',
                        {
                          initialValue: '',
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
                    <a-form-item class="boxradio" label="是否包含子部门">
                      <a-checkbox
                        v-decorator="['contain', {  valuePropName: 'checked',
            initialValue: false, }]"
                      >包含子部门</a-checkbox>
                    </a-form-item>

                    <a-form-item label="拍摄时间">
                      <a-range-picker
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
                    <a-form-item label="生成条数">
                      <a-input
                        v-decorator="['count', {
                          initialValue: '',
                          rules: []
                        }]"
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
          <div>
            <!-- <button @click="download">批量删除</button>
            <button @click="dlt">批量下载</button>-->
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            height="auto"
            :data="tableData"
            highlight-hover-row
            :row-class-name="tableRowClassName"
            class="mytable-scrollbar"
          >
            <vxe-table-column type="seq" width="50" align="center" title="序号" />
            <vxe-table-column
              field="fileName"
              title="文件名称"
              align="left"
              header-align="center"
              show-overflow
              width="350"
            >
              <template v-slot="{ row }">
                <span
                  class="iconfont iconblock"
                  :class="{'iconpicture': row.fileType_Name === '图片', 'iconshiping': row.fileType_Name=='视频', 'iconmusic': row.fileType_Name=='音频'}"
                ></span>
                <span style="color:#0db8df;cursor: pointer;" @click="tablebtn(row)">{{row.fileName}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="deptCode" title="执勤部门" align="center" />
            <vxe-table-column
              field="userName"
              title="民警姓名"
              align="center"
              width="100"
              show-overflow
            />
            <vxe-table-column field="userCode" title="民警警号" align="center" />
            <!-- <vxe-table-column field="relateCase" title="关联信息" show-overflow align="center">
              <template v-slot="{ row }">{{relateCase(row)}}</template>
            </vxe-table-column>-->
            <vxe-table-column field="fileType" title="文件类型" show-overflow align="center">
              <template v-slot="{ row }">{{fileType(row)}}</template>
            </vxe-table-column>
            <!-- <vxe-table-column field="actions" title="操作" align="center">
              <template v-slot="{ row }">
                <span
                  type="text"
                  @click="tablebtn(row)"
                  style="color:#0db8df;cursor: pointer;"
                  v-isshow="'fileEvaluate:evaluationRandom:look'"
                >评分</span>
              </template>
            </vxe-table-column>-->
          </vxe-table>
        </div>
      </div>

      <a-modal
        v-model="visible"
        title="视频查看"
        :width="1000"
        @cancel="tccancel"
        :maskClosable="false"
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
                @playing="onPlayerPlaying($event)"
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
                  :wrapper-col="{ span: 18 }"
                  v-if="!Emptystate"
                >
                  <el-scrollbar style="height:300px;width: 397px;">
                    <a-form-item label="标注类型">
                      <a-select
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
                        :max-length="LimitInputlength"
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
                    <a-form-item label="标记描述">
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
                <a-empty v-else style="margin-top:94px">
                  <span slot="description">没有标注信息</span>
                </a-empty>
                <!-- <a-button
                  type="primary"
                  @click="biaozhuSubmit"
                  style="margin-top: 14px;margin-left: 44%;"
                >保存</a-button>-->
              </a-tab-pane>
              <a-tab-pane key="4" tab="评价">
                <a-form
                  :form="form3"
                  :label-col="{ span:4 }"
                  :wrapper-col="{ span: 20 }"
                  @submit="pingjiaSubmit"
                >
                  <a-form-item label="评价总分">
                    <a-input
                      :disabled="disabled"
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
                      v-decorator="['Scoring', { initialValue: []}]"
                      style="width: 100%;"
                    >
                      <el-scrollbar style="height:120px;">
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
                    </a-checkbox-group>
                  </a-form-item>
                  <a-form-item label="实际评分">
                    <a-input
                      :disabled="disabled"
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
                      style="display: flex;overflow-y:auto;resize: none;"
                      allowClear
                      v-decorator="[
                      'remarks',
                      {
                        initialValue: '',
                        rules: [],
                      },
                    ]"
                      :autoSize="{ minRows: 3, maxRows: 3 }"
                    />
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 12, offset: 5 }" style="text-align:center">
                    <a-button
                      type="primary"
                      html-type="submit"
                      v-isshow="'fileEvaluate:evaluationRandom:saveEva'"
                    >保存</a-button>
                  </a-form-item>
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
            v-isshow="'fileEvaluate:evaluationRandom:download'"
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
export default class EvalRandom extends Vue {
  [x: string]: any
  public form!: any
  public form1!: any
  public form2!: any
  public form3!: any
  public DataM = new this.$api.configInterface.DataM()
  public Supervision = new this.$api.configInterface.Supervision()
  private LimitInputlength = LimitInputlength
  private departmentData = []
  private defaultdate = []
  private page = page
  private layouts = layouts
  private Height = ""
  private textcolor = false
  private tableColumn = [
    { type: "seq", width: 60, fixed: null, title: "序号", align: "center" },
    { field: "fileName", width: 200, title: "文件名" },
    { field: "deptCode", title: "执勤部门", width: 120, align: "center" },
    { field: "userName", title: "民警姓名", align: "center" },
    { field: "userCode", title: "民警警号", align: "center" },
    { field: "recordDate", title: "摄录时间", align: "center" },
  ]
  private tableData = []
  private formdata = { contain: "", date: [], department: "", user: "" }

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
  private Actualscore = 100
  private options = []
  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 210}px`
    this.form = this.$form.createForm(this)
    this.form1 = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
    this.form3 = this.$form.createForm(this)
    this.getdata()

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 210}px`
    })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    this.DataM.gettimeframe({ type: "LATELY_MONTH" }, true).then((res: any) => {
      // console.log(res.data.myDate)
      this.myDate = res.data.myDate
      this.defaultdate = [
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD"),
      ]
      this.getDailytabledata({
        page: 1,
        limit: 10,
        deptCode: "",
        dateRange: res.data.myDate,
        isDown: 0,
        length: "",
      })
    })
  }
  private reset() {
    this.form.resetFields()
    this.getdata()
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private handleSubmit(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      console.log(val)
      if (val.count == "") {
        this.$message.warning("请输入需要随机抽查的条数。")
      } else if (val.department == "") {
        this.$message.warning("请选择需要抽查的部门")
      } else {
        console.log(val)
      }
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
        this.getDailytabledata({
          page: 1,
          limit: 10,
          deptCode: val.department,
          dateRange: date,
          length: val.count,
          isDown: str,
        })
      }
    })
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private getDailytabledata(obj) {
    this.Supervision.getrandomtabledata(obj).then((res) => {
      console.log(res)
      this.tableData = res.data
      // this.page.totalResult = parseInt(res.count)
    })
  }
  private popup() {
    // console.log(1)
  }
  private tablebtn(row) {
    console.log(row)
    this.visible = true
    this.fileId = row.id
    this.fileCode = row.code
    this.DataM.getfiledetails(this.fileId).then((res) => {
      console.log(res)
      this.filedetails = res.data
      this.playerOptions["sources"][0]["src"] = res.data.httpPath //修改视频方法
    })
    this.DataM.lawarchives().then((res) => {
      console.log(res)
      this.$nextTick(() => {
        this.form3.setFieldsValue({
          Total: res.data.total,
          Scoring: [],
        })
      })
      this.Total = res.data.total
      this.options = res.data.list
    })
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
  private fileType(x) {
    if (x.fileType == "photo") {
      return "图片"
    } else if (x.fileType == "log") {
      return "日志"
    } else if (x.fileType == "video") {
      return "视频"
    } else if (x.fileType == "audio") {
      return "音频"
    } else {
      return ""
    }
  }
  private pagerchange({ currentPage, pageSize }) {
    console.log(currentPage, pageSize)
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
    this.getDailytabledata({
      page: currentPage,
      limit: pageSize,
      deptCode: this.formdata.department,
      user: this.formdata.user,
      dateRange: date,
      isDown: str,
    })
  }

  private tccancel() {
    this.Actualscore = 100
    this.activeKey = "4"
    //取消重置所有用到的表单
  }
  private filedownload() {
    // alert("当前下载" + )
    window.open(this.filedetails.downloadPath)
    console.log(this.filedetails.downloadPath)
  }

  private tabchange(activeKey) {
    if (activeKey == 3) {
      this.DataM.getfiletagging().then((res) => {
        if (res.data) {
          console.log("有值")
          this.labelType = res.data.labelType
          this.taggingmsg = res.data
          this.Emptystate = true
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
        } else {
          this.Emptystate = true
        }
      })
    }
  }
  public sum = 0
  private checkboxChange(e, val) {
    // console.log(e.target.checked)
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
        // console.log(this.fileCode)
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
          remark: val.remarks,
        }
        this.DataM.pfsave(obj).then((res) => {
          console.log(res)
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.sum = 0
            this.visible = false
            this.getdata()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  // 播放回调
  onPlayerPlay(player) {
    console.log("player play!", player)
  }
  // 视频播完回调
  private onPlayerEnded(e) {
    (this.$refs.videoPlayer as any).player.src(e.options_.sources[0].src) // 重置视频进度条
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
</style>
