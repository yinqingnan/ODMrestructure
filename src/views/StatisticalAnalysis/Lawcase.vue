
<template>
  <div>
    <!-- <h2>关联</h2> -->
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
                    <a-form-item label="所属部门">
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
            <a-button type="primary" @click="daochu" v-isshow="'lawcase:export'">导出</a-button>
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
  private page = page
  private departmentData = []
  private layouts = layouts
  private deptCode: null | string = null
  private defaultdate = []
  private tableColumn = [
    { type: "seq", width: 50, title: "序号", align: "center", fixed: "left" },
    {
      field: "deptName",
      title: "执勤部门",
      showOverflow: true,
      width: 150,
      align: "center",
    },
    {
      title: "总体情况",
      align: "center",
      children: [
        { field: "lawCaseTotal", title: "执法总数",  align: "center" },
        {
          field: "lawCaseRef",
          title: "关联数",
          align: "center",
        },
        {
          field: "lawCaseRefRate",
          title: "关联率（%）",
          align: "center",
        },
      ],
    },
    {
      title: "简易流程",
      align: "center",
      children: [
        { field: "summaryTotal", title: "执法总数",  align: "center" },
        {
          field: "summaryRef",
          title: "关联数",
          align: "center",
        },
        {
          field: "summaryRefRate",
          title: "关联率（%）",
          align: "center",
        },
      ],
    },
    {
      title: "强制措施",
      align: "center",
      children: [
        { field: "forceTotal", title: "执法总数",  align: "center" },
        {
          field: "forceRef",
          title: "关联数",
          align: "center",
        },
        {
          field: "forceRefRate",
          title: "关联率（%）",
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
    console.log(this.deptCode)
  }
  private mounted() {
    this.getdata()
  }
  // todo 事件
  public gettabledata(obj) {
    this.Statistics.getlawcasetable(obj).then((res) => {
      console.log(res)
      this.tableData = res.data
    })
  }
  public getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    this.Statistics.getdate({ type: "THIS_MONTH" }).then((res) => {
      let obj = {
        page: 1,
        limit: 15,
        deptCode: localStorage.getItem("deptCode"),
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
    this.deptCode = null
    this.form.resetFields()
    this.getdata()
  }
  public handle(e: MouseEvent) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let date =
          val.date[0].format("YYYY-MM-DD") +
          "~" +
          val.date[1].format("YYYY-MM-DD")
        let obj = {
          page: 1,
          limit: 15,
          deptCode: val.department,
          level: val.deviceStatus,
          dateRange: date,
        }
        this.gettabledata(obj)
      }
    })
  }
  public daochu() {
    (this.$refs.gltj as any).exportData({
      filename: "关联统计",
      sheetName: "Sheet1",
      type: "xlsx",
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
