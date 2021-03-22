<template>
  <div>
    <!-- 执法仪报修 -->
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
                    <a-form-item label="报修人">
                      <a-input
                        v-decorator="['user', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入姓名/警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="报修时间">
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
                          initialValue: [],
                          rules: []
                        }
                      ]"
                        @change="dateChange"
                      />
                    </a-form-item>

                    <a-form-item label="产品序号">
                      <a-input
                        v-decorator="['code', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入产品序号"
                      >/></a-input>
                    </a-form-item>
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handle">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <!-- <vxe-table
            border
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            highlight-hover-row
            highlight-current-row
            show-header-overflow
            height="auto"
            :data="tableData"
            >
            <vxe-table-column v-for=" (config, index) in tableColumn" :key="index" v-bind="config" />
          </vxe-table> -->
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
            <template v-slot:nameslot="{ row }">
              <span v-if="row.activeTime">{{row.activeTime}}</span>
              <span v-else style="cursor: pointer;color:#0dc6eb" @click="qybtn(row)" v-isshow="'device:matcherepairs:acive'">
                启用
              </span>
            </template>
          </vxe-grid>
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
    
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import {
  layouts,
  LimitInputlength,
  textarealength,
  page,
} from "@/InterfaceVariable/variable"
import moment from "moment"
@Component({
  components: {},
})
export default class Repairrecord extends Vue {
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  public DeviceM = new this.$api.configInterface.DeviceM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private page= {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private departmentData = []
  private tableData = []
  private Date = []
  private layouts = layouts

  private tableColumn = [
    { width: 60, fixed: null, title: "序号", align: "center", type: "seq" },
    { field: "reportUserCode", title: "报修人" , width:'10%', align: "center",showOverflow:true },
    { field: "matcheCode", title: "产品序号", width:'10%' , align: "center",showOverflow:true},
    { field: "deviceType", title: "设备类型" , width:'10%', align: "center",showOverflow:true},
    { field: "deptName", title: "所属部门", width:'10%', align: "center" ,showOverflow:true},
    { field: "affectUserNames",type:'html', title: "影响民警(警号)" , width:'10%', align: "center", showOverflow:true, formatter:this.formatRole},
    { field: "createTime", title: "保修时间" , width:'10%', align: "center",showOverflow:true},
    { field: "reportTime", title: "故障开始时间", width:'10%' , align: "center",showOverflow:true},
    { field: "activeTime", title: "启用时间" ,type:'html', width:'10%', align: "center",showOverflow:true,slots: { default: "nameslot" },},
    { field: "repairsDesc", title: "故障描述" , width:'10%', align: "center",showOverflow:true},
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
  }
  private mounted() {
    let obj = {
      page: this.page.currentPage,
      limit: this.page.pageSize,
      deptCode: "",
      reportUserName: "",
      reportTimes: "",
      matcheCode: "",
    }
    this.gettabledata(obj)
    this.getdata()

  }

  // todo 事件

  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let obj = {
      page: currentPage,
      limit: pageSize,
      deptCode: "",
      reportUserName: "",
      reportTimes: "",
      matcheCode: "",
    }
    this.gettabledata(obj)
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val.date.length)
        if (val.date.length > 0) {
          this.gettabledata({
            page: this.page.currentPage,
            limit: this.page.pageSize,
            deptCode: val.department,
            reportUserName: val.user,
            reportTimes: `${moment(val.date[0]).format("YYYY-MM-DD")}~${moment(
              val.date[1]
            ).format("YYYY-MM-DD")}`,
            matcheCode: val.code,
          })
        } else {
          this.gettabledata({
            page: this.page.currentPage,
            limit: this.page.pageSize,
            deptCode: val.department,
            reportUserName: val.user,
            reportTimes: "",
            matcheCode: val.code,
          })
        }
      }
    })
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private reset() {
    this.form.resetFields()
  }
  private popup() {
    return
  }
  private dateChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  //  todo 数据请求
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
  }
  private gettabledata(obj) {
    this.DeviceM.Repairrecord(obj).then((res) => {
      if (res.code == 0) {
        this.page.totalResult = parseInt(res.count)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  private formatRole({ cellValue }){
    return cellValue
  }

  private qybtn(row){
    console.log(row)
    this.DeviceM.Enable({
      matcheCode: row.matcheCode,
    }).then((res) => {
      if (res.code == 0) {
        this.$message.success(`设备${row.matcheCode}启动成功`)
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          deptCode: "",
          reportUserName: "",
          reportTimes: "",
          matcheCode: "",
        }
        this.gettabledata(obj)
      } else {
        this.$message.error(res.msg)
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
</style>