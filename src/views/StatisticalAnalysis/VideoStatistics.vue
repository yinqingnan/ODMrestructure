<template>
  <div>
    <!-- <h2>VideoStatistics摄录统计</h2> -->
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
                        title: 'name',
                      }"
                        placeholder="请选择所属部门"
                      />
                    </a-form-item>
                    <a-form-item label="姓名/警号">
                      <a-input
                        v-decorator="['name', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入姓名/警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="重要级别">
                      <a-select
                        v-decorator="[
                        'deviceStatus',
                        {
                          initialValue: '-1',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in list" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
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
            <a-button type="primary" @click="daochu" v-isshow="'recording:export'">导出</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-grid
            border
            stripe
            resizable
            height="auto"
            :columns="tableColumn"
            :data="tableData"
            class="mytable-scrollbar"
            ref="shelutj"
            :row-class-name="tableRowClassName"
          >
            <template v-slot:nameslot="{ row }">{{row.policeName}}({{row.policeNum}})</template>
          </vxe-grid>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import axios from 'axios'
import {
  LimitInputlength,
  textarealength,
  page,
  layouts,
} from "@/InterfaceVariable/variable"
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
      minWidth: 100,
      align: "center",
    },
    {
      field: "policeName",
      title: "姓名/警号",
      showOverflow: true,
      minWidth: 100,
      align: "center",
      slots: { default: "nameslot" },
    },
    {
      title: "视频",
      align: "center",
      children: [
        {
          field: "countVideo",
          title: "总个数",
          minWidth: 80,
          align: "center",
          showOverflow: true,
        },
        {
          field: "sumTimeVideoString",
          title: "时长（小时）",
          minWidth: 120,
          showOverflow: true,
          align: "center",
        },
        {
          field: "sumSizeVideoString",
          title: "大小（GB）",
          minWidth: 100,
          showOverflow: true,
          align: "center",
        },
      ],
    },
    {
      title: "音频",
      align: "center",
      children: [
        { field: "countAudio", title: "总个数", minWidth: 80, align: "center" },
        {
          field: "sumTimeAudioString",
          title: "时长（小时）",
          minWidth: 120,
          align: "center",
        },
        {
          field: "sumSizeAudioString",
          title: "大小（GB）",
          minWidth: 100,
          align: "center",
        },
      ],
    },
    {
      title: "图片",
      align: "center",
      children: [
        { field: "countPhoto", title: "总张数", minWidth: 80, align: "center" },
        {
          field: "sumSizePhotoString",
          title: "大小（GB）",
          minWidth: 100,
          align: "center",
        },
      ],
    },
    {
      title: "导入时效",
      align: "center",
      children: [
        {
          field: "countInfor12",
          title: "12小时内",
          minWidth: 100,
          align: "center",
        },
        {
          field: "countInfor12_48",
          title: "12-48小时内",
          minWidth: 100,
          align: "center",
        },
        {
          field: "countInfo48",
          title: "超过48小时",
          minWidth: 100,
          align: "center",
        },
      ],
    },
  ]
  private policeName =''
  private deptCode =''
  private level =''
  private dateRange = ''
  // todo 生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    this.deptCode = localStorage.getItem("deptCode")
  }
  private mounted() {
    this.getdata()
  }
  // todo 事件
  public gettabledata(obj) {
    this.Statistics.gettabledata(obj).then((res) => {
      console.log(res)
      this.tableData = res.data
    })
  }
  public getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    this.Statistics.getdate({ type: "THIS_MONTH" }).then((res) => {
      console.log(res);
      
      let obj = {
        page: 1,
        limit: 15,
        deptCode: localStorage.getItem("deptCode"),
        level: -1,
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
    // this.deptCode = null
    this.form.resetFields()
    this.deptCode = ''
    this.level = ''
    this.dateRange = ''
  }




  public handle(e: MouseEvent) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let date =
          val.date[0].format("YYYY-MM-DD") +
          "~" +
          val.date[1].format("YYYY-MM-DD")
        this.policeName = val.name
        this.deptCode = val.department
        this.level = val.deviceStatus
        this.dateRange = date
        let obj = {
          page: 1,
          limit: 15,
          policeName:val.name,
          deptCode: val.department,
          level: val.deviceStatus,
          dateRange: date,
        }
        this.gettabledata(obj)
      }
    })
  }
  public daochu() {
    // (this.$refs.shelutj as any).exportData({
    //   filename: "摄录统计",
    //   sheetName: "Sheet1",
    //   type: "xlsx",
    //   message:false,
    // })
    let url = window.gurl.SERVICE_CONTEXT_PATH
    const obj = {
      type_notequal: 3,
      deptCode:this.deptCode,
      level:this.level,
      dateRange:this.dateRange
    }
    axios.get(`${url}api/tpb/report/recording/information/export`,{
      params: obj,
      headers: {
        Token: localStorage.getItem("token"),
      },
      'responseType': 'blob'
    }).then(res => {
      console.log(res)
      const aLink = document.createElement("a");
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
      if (navigator.msSaveBlob) { // IE10+ 
        window.navigator.msSaveOrOpenBlob(blob,`摄录统计.xls`);
      }
      else {
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download', '摄录统计' + '.xls')
        aLink.click()
      }
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
