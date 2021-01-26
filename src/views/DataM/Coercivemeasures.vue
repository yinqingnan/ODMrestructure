<template>
  <div>
    <!-- 强制措施 -->
    <div id="Simpleprogram" class="layoutcontainer">
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
                    <a-form-item label="姓名/警号">
                      <a-input
                        v-decorator="['user', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入姓名/警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="当事人">
                      <a-input
                        v-decorator="['party', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入当事人姓名"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="违法时间">
                      <a-range-picker
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
                    <a-form-item label="凭证编号">
                      <a-input
                        v-decorator="['DecisionNo', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入凭证编号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="驾驶证号">
                      <a-input
                        v-decorator="['Drivercode', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入驾驶证号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="号牌号码">
                      <a-input
                        v-decorator="['numcode', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入号牌号码"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="违法地址">
                      <a-input
                        v-decorator="['Illegaladdress', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入违法地址"
                      >/></a-input>
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
            resizable
            height="auto"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            :data="tableData"
            highlight-hover-row
            :row-class-name="tableRowClassName"
            class="mytable-scrollbar"
          >
            <vxe-table-column type="seq" width="60" title="序号" align="center" />
            <vxe-table-column
              field="code"
              title="凭证编号"
              align="center"
              min-width="130"
              show-overflow
            >
              <template v-slot="{ row }">
                <span
                  type="text"
                  @click="tablebtn(row)"
                  ref="qzcsright"
                  style="color:#0db8df"
                  v-right="'lawarchives:lllegalData:look'"
                >{{row.code}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column
              field="deptName"
              title="部门"
              align="center"
              show-overflow
              min-width="70"
            />

            <vxe-table-column
              field="userName"
              title="姓名/警号"
              width="90"
              align="center"
              show-overflow
            >
              <template v-slot="{ row }">{{row.userName}}({{row.userCode}})</template>
            </vxe-table-column>
            <vxe-table-column
              field="litigant"
              title="当事人"
              align="center"
              min-width="80"
              show-overflow
            />
            <vxe-table-column
              field="driverNum"
              title="驾驶证号"
              align="center"
              min-width="80"
              show-overflow
            />
            <vxe-table-column
              field="numberPlate"
              title="号牌号码"
              min-width="80"
              show-overflow
              align="center"
            />
            <vxe-table-column field="hpzlText" title="号牌种类" align="center" min-width="80" />
            <vxe-table-column
              field="illegalTime"
              title="违法时间"
              show-overflow
              align="center"
              min-width="80"
            />
            <vxe-table-column
              field="illegalAddress"
              title="违法地址"
              align="center"
              width="100"
              show-overflow
            />
            <vxe-table-column
              field="illegalDeed"
              title="违法行为"
              show-overflow
              align="center"
              min-width="80"
            />
            <vxe-table-column field="relatedInfo" title="关联信息" align="center" min-width="80" />
          </vxe-table>
          <p>
            <vxe-pager
              align="right"
              size="mini"
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
        title="档案详情"
        :width="810"
        @cancel="Filedetails"
        class="Filedetails"
        :keyboard='false'
      >
        <div class="FileDetails_header">
          <p>{{CaseDetails.typeName}}({{CaseDetails.code}})</p>
          <p>{{CaseDetails.deptName}} ({{CaseDetails.deptCode}}) - {{CaseDetails.userName}} ({{CaseDetails.userCode}})</p>
          <ul>
            <li>当事人：{{CaseDetails.litigant}}</li>
            <li>驾驶证号：{{CaseDetails.driverNum}}</li>
            <li>号牌种类：{{CaseDetails.hpzlText}}</li>
            <li>违法时间：{{CaseDetails.illegalTime}}</li>
            <li>号牌号码：{{CaseDetails.numberPlate}}</li>
          </ul>
          <p>违法地址：{{CaseDetails.illegalAddress}}</p>
          <p>违法行为：{{CaseDetails.illegalDeed}}</p>
        </div>
        <div class="FileDetails_footer">
          <div class="FileDetails_footer_left">
            <div v-if="defaultone.fileType == 'photo'">
              <img :src="defaultone.httpPath" alt />
            </div>
            <div v-if="defaultone.fileType == 'video' " class="AvData fileAvData">
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @ended="onPlayerEnded($event)"
              />
            </div>
            <div v-if="defaultone.fileType == 'audio'" class="audioconfig">
              <audio controls="controls" controlslist="nodownload" :src="defaultone.httpPath"></audio>
            </div>
          </div>
          <div class="FileDetails_footer_right">
            <el-scrollbar style="height:272px;width:100%">
              <ul>
                <li
                  v-for="(item,index) in MatchFiles"
                  :key="item.id"
                  @click="filebtn(item,index,$event)"
                  :class="{'active': num == index}"
                >
                  <div v-if="item.fileName">
                    <p :title="item.fileName">{{item.fileName}}</p>
                    <div style="margin-right:10px">
                      <a-icon
                        type="download"
                        @click.stop="Relatedownload(item)"
                        v-isshow="'lawarchives:lllegalData:download'"
                      />
                      <a-icon
                        type="rest"
                        @click.stop="deleteRelate(item)"
                        v-isshow="'lawarchives:lllegalData:delRelated'"
                      />
                    </div>
                  </div>
                  <div style="margin-top:8px">
                    <h5>摄录时间：{{item.recordDate}}</h5>
                    <h5 style="margin-right:56px">文件大小：{{item.fileDuration_Name}}</h5>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </div>
        <template slot="footer">
          <a-button
            type="primary"
            @click="AssociatedFile"
            v-isshow="'lawarchives:lllegalData:addRelated'"
          >关联平台文件</a-button>
        </template>
      </a-modal>

      <a-modal
        v-model="visible2"
        title="关联平台文件"
        @cancel="Filedetails2"
        @ok="Filedetailsok"
        class="guanlian"
        :width="1000"
        :keyboard='false'
      >
        <div style="height:50px;line-height:1;padding-top: 10px;">
          <template>
            <a-dropdown :trigger="['click']" class="dropdown">
              <a class="ant-dropdown-link" @click="popup">
                筛选
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay" class="box">
                <a-form
                  autocomplete="off"
                  :form="form1"
                  :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 14 }"
                  @submit="FileSubmit"
                >
                  <el-scrollbar class="screen">
                    <a-form-item label="部门">
                      <a-tree-select
                        :disabled="Departmentdisabled"
                        show-search
                        treeNodeFilterProp="title"
                        v-decorator="[
                        'department',
                        {
                          initialValue: deptCode,
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
                    <a-form-item label="拍摄时间">
                      <a-range-picker
                        :show-time="{
                        hideDisabledOptions: true,
                        defaultValue: [],
                      }"
                        :allowClear="false"
                        v-decorator="[
                        'date',
                        {
                          initialValue:calculationdate || null,
                          rules: []
                        }
                      ]"
                        @change="onChange"
                      />
                    </a-form-item>
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="FileSubmit">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
        </div>
        <div class style="height:370px">
          <vxe-table
            border
            resizable
            ref="glwj"
            height="auto"
            :data="Associatedfilestabledata"
            highlight-hover-row
            :row-class-name="tableRowClassName"
            class="mytable-scrollbar"
            @checkbox-all="selectAllEvent"
            @checkbox-change="selectChangeEvent"
          >
            <vxe-table-column type="checkbox" width="60" align="center" />
            <vxe-table-column
              field="fileName"
              title="文件名称"
              align="center"
              min-width="150"
              show-overflow
            >
              <template v-slot="{ row }">
                <vxe-button
                  type="text"
                  @click="Playvideo(row)"
                  style="color:#0db8df"
                >{{row.fileName}}</vxe-button>
              </template>
            </vxe-table-column>
            <vxe-table-column field="deptName" title="部门" align="center" />
            <vxe-table-column field="userName" title="姓名/警号" align="center" show-overflow>
              <template v-slot="{ row }">{{row.userName}}({{row.userCode}})</template>
            </vxe-table-column>
            <vxe-table-column field="fileType_Name" title="文件类型" align="center" />
            <vxe-table-column field="recordDate" title="拍摄时间" align="center" show-overflow />
            <vxe-table-column field="fileDuration_Name" title="摄录时长" align="center" />
            <!-- <vxe-table-column field="active" title="操作" align="center">
              <template v-slot="{ row }">
                <vxe-button type="text" @click="Playvideo(row)" style="color:#0db8df">查看</vxe-button>
              </template>
            </vxe-table-column>-->
          </vxe-table>
          <!-- <p>
            <vxe-pager
              align="right"
              size="mini"
              :layouts="layouts"
              :page-size="[10, 20, 100, 200]"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              @page-change="Associatedfilestablechange"
            />
          </p>-->
        </div>
      </a-modal>

      <a-modal v-model="visible3" title="文件查看" :footer="null" :keyboard='false'>
        <div class="Filelist">
          <div v-if="Fileview.fileType == 'photo'">
            <img :src="Fileview.httpPath" />
          </div>
          <div v-if="Fileview.fileType == 'video' " class="AvData Fileview">
            <video-player
              class="video-player vjs-custom-skin"
              ref="filevideo"
              :playsinline="true"
              :options="playerOptions"
              @ended="filevideoEnded($event)"
            />
          </div>
          <div v-if="Fileview.fileType == 'audio'" class="audioconfig">
            <audio
              ref="audio"
              controls="controls"
              controlslist="nodownload"
              style="margin-left:20%"
              :src="Fileview.httpPath"
            ></audio>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>


<script lang="ts">
import { LimitInputlength, page, pagesize } from "@/InterfaceVariable/variable"
import { Selecttype } from "../../InterfaceVariable/interface"
import { Component, Vue } from "vue-property-decorator"
import moment from "moment"

@Component({})
export default class Coercivemeasures extends Vue {
  [x: string]: any
  public form!: any
  public form1!: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private departmentData = []
  private Height = ""
  private pagesize = pagesize
  private tableData = []
  private formdata = {
    department: "",
    user: "",
    party: "",
    DecisionNo: "",
    Drivercode: "",
    numcode: "",
    Illegaladdress: "",
    date: []
  }
  private Departmentdisabled = false
  public visible = false
  public visible1 = false
  public visible2 = false
  private defaultone = {
    fileName: "",
    fileType: "",
    httpPath: ""
  }
  private CaseDetails = {
    daptName: "",
    deptCode: "",
    litigant: "",
    hpzlText: "",
    numberPlate: "",
    illegalAddress: "",
    illegalDeed: "",
    illegalTime: [],
    userName: "",
    driverNum: "",
    deptName: "",
    userCode: "",
    typeName: "",
    code: ""
  }
  private deptCode = localStorage.getItem("deptCode")
  private MatchFiles = []
  private WithID = []
  private filetype: Selecttype[] = [
    { id: 0, value: "请选择", title: "请选择" },
    { id: 1, value: "video", title: "视频" },
    { id: 2, value: "audio", title: "音频" },
    { id: 3, value: "photo", title: "图片" }
  ]
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private defaultdate = [
    moment("2010-06-06", "YYYY-MM-DD"),
    moment("2020-06-06", "YYYY-MM-DD")
  ]
  private Associatedfilestabledata = []
  private calculationdate = [
    moment().format("YYYY-MM-DD HH:mm:ss"),
    moment().format("YYYY-MM-DD HH:mm:ss")
  ]
  private casecode = ""
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
        src: "http://vjs.zencdn.net/v/oceans.mp4" //url地址
        // src: "" //url地址
      }
    ],
    poster: "", //你的封面地址
    // width: document.documentElement.clientWidth,
    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true //全屏按钮
    }
  }
  // todo 声明周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form1 = this.$form.createForm(this)
    this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    // this.gettabledata({})
  }
  // todo 事件
  private selectedRowKeys = []
  public selectAllEvent({ checked, records }) {
    this.selectedRowKeys = records
    console.log(checked ? "所有勾选事件" : "所有取消事件", records)
  }
  public selectChangeEvent({ checked, records }) {
    this.selectedRowKeys = records
    console.log(checked ? "勾选事件" : "取消事件", records)
  }
  private popup() {
    return
  }
  private reset() {
    this.form.resetFields()
    this.form1.resetFields()
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        this.formdata = val
        console.log(val)
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          zqbm_equal: val.department, //部门id
          mjxm: val.user, //警员
          dsr_like: val.party, //当事人
          wfsj: this.myDate,
          pzbh_like: val.DecisionNo,
          jszh_like: val.Drivercode,
          hphm_like: val.numcode,
          wfdz_like: val.Illegaladdress,
          type: 2,
          wfsj_gt: val.date[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
          wfsj_lt: val.date[1].format("YYYY-MM-DD HH:mm:ss") //必填  时间止
        }
        this.gettabledata(obj)
      }
    })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    this.DataM.gettimeframe({ type: "LATELY_MONTH" }, true).then((res: any) => {
      this.myDate = res.data.myDate
      this.defaultdate = [
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD")
      ]
      let obj = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        zqbm_equal: "", //部门id
        mjxm: "", //警员
        dsr_like: "", //当事人
        wfsj: this.myDate,
        jdsbh_like: "",
        jszh_like: "",
        hphm_like: "",
        wfdz_like: "",
        type: 2,
        wfsj_gt: this.defaultdate[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
        wfsj_lt: this.defaultdate[1].format("YYYY-MM-DD HH:mm:ss") //必填  时间止
      }
      this.gettabledata(obj)
    })
  }
  private gettabledata(obj: any) {
    this.DataM.getCoercivemeasuresTable(obj, true).then((res: any) => {
      console.log(res)
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private tablebtn(row) {
    if ((this.$refs.qzcsright as HTMLElement).style.cursor !== "not-allowed") {
      this.casecode = row.code
      this.visible = true
      this.DataM.CaseDetails({ code: row.code, type: 2 }).then((res) => {
        console.log(res)
        if (res.data) {
          this.CaseDetails = res.data
        }
      })
      this.DataM.MatchFiles(row.code).then((res) => {
        console.log(res.data)
        if (res.data.length > 0) {
          this.MatchFiles = res.data
          this.defaultone = res.data[0]
          this.playerOptions["sources"][0]["src"] = res.data[0].httpPath //修改视频方法
        } else {
          this.MatchFiles = []
          this.defaultone.fileName = ""
          this.defaultone.fileType = ""
        }
      })
    }
  }
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let obj = {
      page: currentPage,
      limit: pageSize,
      zqbm_equal: this.formdata.department, //部门id
      mjxm: this.formdata.user, //警员
      dsr_like: this.formdata.party, //当事人
      wfsj: this.myDate,
      pzbh_like: this.formdata.DecisionNo,
      jszh_like: this.formdata.Drivercode,
      hphm_like: this.formdata.numcode,
      wfdz_like: this.formdata.Illegaladdress,
      type: 2,
      wfsj_gt: this.formdata.date[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
      wfsj_lt: this.formdata.date[1].format("YYYY-MM-DD HH:mm:ss") //必填  时间止
    }
    this.gettabledata(obj)
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }

  private num = 0
  private filebtn(item, index, e) {
    e.stopPropagation()
    console.log(item)
    this.num = index
    this.defaultone = item
    if (item.fileType == "video") {
      // 在这里做切换视频的操作
    } else if (item.fileType == "audio") {
      // this.$refs.audio.play() //播放方式
    }
  }
  private Filedetails() {
    this.num = 0
    this.reset()
  }
  private AssociatedFile() {
    this.visible = false
    this.visible2 = true
    this.deptCode = localStorage.getItem("deptCode")
    this.WithID = []
    this.MatchFiles.map((item) => {
      this.WithID.push(item.id) //保存当前已有的id
    })
    console.log(this.WithID)
    this.DataM.roledataright().then((res) => {
      if (res.data == 1) {
        this.Departmentdisabled = false
        //点击按钮设置时间
        this.calculationdate = [
          moment(moment(this.CaseDetails.illegalTime))
            .subtract(3, "days")
            .format("YYYY-MM-DD HH:mm:ss"),
          moment(moment(this.CaseDetails.illegalTime).add(3, "d")).format(
            "YYYY-MM-DD HH:mm:ss"
          )
        ]
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          deptCode_equal: localStorage.getItem("deptCode"),
          userName: "",
          fileType_equal: "",
          recordDate: `${moment(this.calculationdate[0]).format(
            "YYYY-MM-DD"
          )} ~ ${moment(this.calculationdate[1]).format("YYYY-MM-DD")}`,
          notIds: JSON.stringify(this.WithID),
          recordDate_gt: this.calculationdate[0],
          recordDate_lt: this.calculationdate[1]
        }
        this.DataM.Associatedfiles(obj).then((res) => {
          console.log(res)
          this.Associatedfilestabledata = res.data
          this.page.totalResult = parseInt(res.count)
        })
        console.log("有权限可以修改部门")
      } else {
        console.log("没有权限，设置不能修改部门")
        this.Departmentdisabled = true
      }
    })
  }
  private Relatedownload(item) {
    window.open(item.downloadPath)
  }
  private deleteRelate(item) {
    let obj = {
      caseNumber: this.casecode,
      fileCode: item.code,
      logType: 2
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示?",
      content: "确认解除该文件的关联吗？",
      onOk() {
        _that.DataM.deleteRelate(obj).then((res) => {
          console.log(res)
          if (res.code == 0) {
            _that.$message.success(res.msg)
            _that.DataM.MatchFiles(_that.casecode).then((res) => {
              if (res.data.length > 0) {
                _that.MatchFiles = res.data
                _that.num = 0
                _that.defaultone = res.data[0]
              } else {
                _that.MatchFiles = []
                _that.defaultone.fileName = ""
                _that.defaultone.fileType = ""
              }
            })
          }
        })
      }
    })
  }
  private visible3 = false
  private Fileview = {
    fileType: "",
    httpPath: ""
  }
  private Playvideo(row) {
    console.log(row)
    this.visible3 = true
    this.Fileview = row
    if (row.fileType == "audio") {
      this.Fileview.httpPath = row.httpPath
    } else if (row.fileType == "video") {
      this.playerOptions["sources"][0]["src"] = row.httpPath //修改视频方法
    }
  }
  private FileSubmit(e: any): void {
    e.preventDefault()
    this.form1.validateFields((err: any, val: any) => {
      if (!err) {
        if (val.Filetype == undefined) {
          val.Filetype = ""
        }
        if (val.Filetype == "请选择") {
          val.Filetype = ""
        }
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          deptCode_equal: val.department,
          userName: val.user,
          fileType_equal: val.Filetype,
          recordDate: `${moment(val.date[0]).format("YYYY-MM-DD")} ~ ${moment(
            val.date[1]
          ).format("YYYY-MM-DD")}`,
          notIds: JSON.stringify(this.WithID),
          recordDate_gt: moment(val.date[0]).format("YYYY-MM-DD HH:mm:ss"),
          recordDate_lt: moment(val.date[1]).format("YYYY-MM-DD HH:mm:ss")
        }
        console.log(obj)
        this.DataM.Associatedfiles(obj).then((res) => {
          console.log(res)
          this.Associatedfilestabledata = res.data
          this.page.totalResult = parseInt(res.count)
        })
      }
    })
  }
  private Filedetailsok() {
    console.log(this.selectedRowKeys)
    if (this.selectedRowKeys.length > 0) {
      let arr = []
      this.selectedRowKeys.map((item) => {
        arr.push(item.code)
      })
      let obj = {
        caseNumbers: [this.casecode],
        fileCodes: arr,
        logType: 2, //1、视音频数据页面；2、违法数据页面
        type: 1 //1.简易程序 2.强制执法
      }
      this.DataM.saveRelate(obj).then((res) => {
        console.log(res)
        if (res.code == 0) {
          this.$message.success(res.msg)
          this.visible2 = false
          this.visible = true
          this.DataM.MatchFiles(this.casecode).then((res) => {
            this.MatchFiles = res.data
            this.defaultone = res.data[0]
          })
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择按键后再尝试提交")
    }
  }
  private Filedetails2() {
    this.visible = true
  }
  private ready() {
    console.log("play click")
  }
  private pause() {
    console.log("pause click")
  }
  private onPlayerEnded(e) {
    (this.$refs.videoPlayer as any).player.src(e.options_.sources[0].src)
  }
  private filevideoEnded(e) {
    (this.$refs.filevideo as any).player.src(e.options_.sources[0].src)
  }
}
</script>


<style lang="less" scope>
.containers {
  width: 100%;
}
.active {
  background: #dde8f5;
}
.screen {
  width: 347px;
  height: 260px;
}
.el-scrollbar__wrap {
  width: 100% !important;
  overflow-x: hidden;
}
.el-scrollbar__bar {
  display: none;
}
.ant-calendar-picker {
  width: 100% !important;
}
.Simpleprogrambody {
  padding: 0 26px;
  background: #fff;
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

.Filedetails {
  .ant-modal-body {
    padding: 0;
    height: 450px;
  }
}
.guanlian {
  .ant-modal-body {
    padding: 0 16px;
    height: 462px;
  }
}
.FileDetails_header {
  height: 165px;
  padding-top: 16px;
  padding-left: 15px;
  border-bottom: 1px solid #c7cbcd;
  p {
    font-size: 13px;
    line-height: 22px;
    color: #7f8893;
  }
  ul {
    margin: 0;
    margin-top: 6px;
    display: flex;
    justify-content: right;
    flex-wrap: wrap;
    li {
      width: 33%;
      margin-top: 10;
      font-size: 12px;
      line-height: 22px;
      color: #7f8893;
    }
  }
}
.FileDetails_footer {
  height: 286px;
  padding-top: 13px;
  display: flex;
}
.FileDetails_footer_left {
  width: 361px;
  height: 264px;
  padding-left: 10px;
  div {
    width: 100%;
    height: 100%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.FileDetails_footer_right {
  .el-scrollbar__bar {
    display: block;
  }
  height: 272px;
  width: calc(100% - 361px);
  ul {
    li {
      cursor: pointer;
      height: 72px;
      padding: 10px 0 12px 16px;
      font-size: 14px;
      font-weight: 600;
      div {
        display: flex;
        justify-content: space-between;
        div {
          text-align: left;
        }
        p {
          width: 82%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        i {
          cursor: pointer;
          font-size: 18px;
          color: #808994;
        }
        i:nth-of-type(1) {
          margin-right: 15px;
        }
      }
    }
  }
}
.fileAvData {
  div:nth-of-type(1) {
    .video-js {
      height: 100% !important;
    }
  }
}
.audioconfig {
  padding-top: 30%;
  audio {
    outline: none;
  }
}
.Filelist {
  height: 350px;
  div {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.Fileview {
  div:nth-of-type(1) {
    .video-js {
      height: 100% !important;
    }
  }
}
</style>