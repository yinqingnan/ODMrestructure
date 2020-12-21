
<template>
  <div>
    <!-- <h2>标注考评</h2> -->
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
                    <a-form-item label="时间范围">
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
                      />
                    </a-form-item>
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handle">统计</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div class="btns">
            <a-button type="primary" @click="daochu" v-isshow="'label:export'">导出</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-grid
            border
            stripe
            resizable
            height="auto"
            show-header-overflow
            :columns="tableColumn"
            :data="tableData"
            class="mytable-scrollbar"
            ref="kptj"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            :row-class-name="tableRowClassName"
          >
            <template v-slot:nameslot="{ row }">{{row.policeName}}({{row.policeNum}})</template>
          </vxe-grid>
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
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,
  page,
  layouts,
} from "@/InterfaceVariable/variable"
import axios from 'axios'
import moment from "moment"
@Component({
  components: {},
})
export default class VideoStatistics extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  private Statistics = new this.$api.configInterface.Statistics()
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private list = [
    { id: "0", value: "-1", title: "请选择" },
    { id: "1", value: "3", title: "高" },
    { id: "2", value: "2", title: "中" },
    { id: "3", value: "1", title: "低" },
  ]
  private tableData = []
  private page= {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private departmentData = []
  private layouts = layouts
  private deptCode: null | string = null
  private defaultdate = []
  private tableColumn = [
    { type: "seq", width: 60, title: "序号", align: "center", fixed: "left" },
    {
      field: "deptName",
      title: "部门",
      showOverflow: true,
      width: 150,
      align: "center",
    },
    {
      title: "姓名/警号",
      align: "center",
      showOverflow: true,
      field: "policeName",
      slots: { default: "nameslot" },
    },
    {
      title: "视频数",
      showOverflow: true,
      align: "center",
      field: "countInforVideo",
    },
    {
      title: "音频数",
      showOverflow: true,
      align: "center",
      field: "countInfoAudio",
    },
    {
      title: "图片数",
      showOverflow: true,
      align: "center",
      field: "countInfoPhoto",
    },
    {
      title: "标注数",
      showOverflow: true,
      align: "center",
      field: "countLink",
    },
    {
      title: "标注率（%）",
      showOverflow: true,
      align: "center",
      width: "120",
      field: "linkRate",
    },
    {
      title: "考评个数",
      align: "center",
      showOverflow: true,
      field: "countEval",
    },
    {
      title: "考评率（%)",
      align: "center",
      showOverflow: true,
      field: "evalRate",
    },
  ]
  private deptCode = ""
  private policeName = ""
  private dateRange = ""
  // todo 生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    // this.deptCode = localStorage.getItem("deptCode")
  }
  private mounted() {
    this.getdata()
  }
  // todo 事件
  public gettabledata(obj) {
    this.Statistics.getlabeltable(obj).then((res) => {
      console.log(res)
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  public getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    this.Statistics.getdate({ type: "THIS_MONTH" }).then((res) => {
      this.dateRange = res.data.myDate
      let obj = {
        page: this.page.currentPage,
        limit: this.page.pageSize,
        deptCode: "",
        policeName: "",
        dateRange: res.data.myDate,
      }
      this.gettabledata(obj)
      let date = res.data.myDate
      this.defaultdate = [
        moment(date.split("~")[0].trim(), "YYYY-MM-DD"),
        moment(date.split("~")[1].trim(), "YYYY-MM-DD"),
      ]
    })
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  public popup() {
    return
  }
  public reset() {
    this.form.resetFields()
    this.deptCode = ""
    this.policeName = ""
    this.dateRange = ""
    this.Statistics.getdate({ type: "THIS_MONTH" }).then((res) => {
      this.dateRange = res.data.myDate
      let date = res.data.myDate
      this.defaultdate = [
        moment(date.split("~")[0].trim(), "YYYY-MM-DD"),
        moment(date.split("~")[1].trim(), "YYYY-MM-DD"),
      ]
    })
  }
  public handle(e: MouseEvent) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let date =
          val.date[0].format("YYYY-MM-DD") +
          "~" +
          val.date[1].format("YYYY-MM-DD")
        this.deptCode = val.department
        this.policeName = val.user
        this.dateRange = date
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          policeName: val.user,
          deptCode: val.department,
          dateRange: date,
        }
        this.gettabledata(obj)
      }
    })
  }

   private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let obj = {
      page: currentPage,
      limit: pageSize,
      deptCode: this.deptCode,
      policeName: this.policeName,
      dateRange: this.dateRange,
    }
    this.gettabledata(obj)
   }
  public daochu() {
    // (this.$refs.kptj as any).exportData({
    //   filename: "考评统计",
    //   sheetName: "Sheet1",
    //   type: "xlsx",
    //   message: false,
    // })
    let url = window.gurl.SERVICE_CONTEXT_PATH
    let obj = {
      deptCode: this.deptCode,
      policeName: this.policeName,
      dateRange: this.dateRange,
    }
    axios.get(`${url}api/tpb/report/label/user/export`,{
        params: obj,
        headers: {
          Token: localStorage.getItem("token"),
        },
        'responseType': 'blob'
      }).then(res => {
        console.log(res)
        const aLink = document.createElement("a");
        let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download', '考评统计' + '.xls')
        aLink.click()
      })
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
.btns {
  line-height: 1;
  button {
    margin-right: 8px;
  }
}
</style>
