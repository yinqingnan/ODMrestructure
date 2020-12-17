
<template>
  <div>
    <!-- <h2>Asset资产统计</h2> -->
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
            <a-button type="primary" @click="daochu" v-isshow="'assets:export'">导出</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-grid
            border
            stripe
            resizable
            show-header-overflow
            height="auto"
            :columns="tableColumn"
            :data="tableData"
            class="mytable-scrollbar"
            ref="gltj"
            :row-class-name="tableRowClassName"
          />
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
      title: "人员",
      align: "center",
      children: [
        { field: "countUser", title: "人数",  align: "center" },
        {
          field: "countUserNum",
          width:150,
          title: "上传过数据的警员",
          align: "center",
        },
      ],
    },
    {
      title: "执法仪",
      align: "center",
      children: [
        { field: "countMatche", title: "总数",  align: "center" },
        {
          field: "countMatcheUsed",
          title: "正常",
          align: "center",
        },
        {
          field: "countMatcheRepair",
          title: "维修",
          align: "center",
        },
         {
          field: "countMatcheScrapped",
          title: "报废",
          align: "center",
        },
         {
          field: "countMatcheStop",
          title: "停用",
          align: "center",
        },
      ],
    },
    {
      title: "采集站",
      align: "center",
      children: [
        { field: "countStations", title: "总台数",  align: "center" },
        {
          field: "stationsSizeStringUsed",
          title: "已使用容量（GB）",
          width:150,
          align: "center",
        },
        {
          field: "stationsSizeStringTotal",
          title: "总容量（GB）",
          width:150,
          align: "center",
        },
      ],
    },
    
  ]
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
    this.Statistics.getassetstable(obj).then((res) => {
      this.tableData = res.data
    })
  }
  public getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
      let obj = {
        page: 1,
        limit: 15,
        deptCode: localStorage.getItem("deptCode"),
      }
      this.gettabledata(obj)
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  public popup() {
    return
  }
  public reset() {
    this.deptCode = null
    this.form.resetFields()
     let obj = {
        page: 1,
        limit: 15,
        deptCode: localStorage.getItem("deptCode"),
      }
      this.gettabledata(obj)
  }
  public handle(e: MouseEvent) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        
        let obj = {
          page: 1,
          limit: 15,
          deptCode: val.department,
        }
        this.gettabledata(obj)
      }
    })
  }
  public daochu() {
    (this.$refs.gltj as any).exportData({
      filename: "资产统计",
      sheetName: "Sheet1",
      type: "xlsx",
      message:false,
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
