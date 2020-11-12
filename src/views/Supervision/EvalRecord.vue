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
                          initialValue: '',
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
                    <a-form-item label="违法时间">
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
          <vxe-table border height="auto" :data="tableData" class="mytable-scrollbar">
            <vxe-table-column
              v-for="(config, index) in tableColumn"
              show-overflow
              :key="index"
              v-bind="config"
            />
            <vxe-table-column field="relateCase" title="关联信息" show-overflow align="center">
              <template v-slot="{ row }">{{relateCase(row)}}</template>
            </vxe-table-column>
            <vxe-table-column field="score" title="考评结果" align="center" show-overflow>
              <template v-slot="{ row }">
                <span :style="{'color': (textcolor==true ? 'green':'#ff0000')}">{{score(row)}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="evaluateItems" title="扣分项" show-overflow align="center">
              <template v-slot="{ row }">{{evaluateItems(row)}}</template>
            </vxe-table-column>
            <vxe-table-column field="evaluateName" title="考评人" show-overflow align="center">
              <template v-slot="{ row }">{{evaluateName(row)}}</template>
            </vxe-table-column>
            <vxe-table-column field="actions" title="操作" align="center">
              <template v-slot="{ row }">
                <span type="text" @click="tablebtn(row)" style="color:#0db8df;cursor: pointer;">查看</span>
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
              @page-change="pagerchange"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { LimitInputlength } from "../../InterfaceVariable/variable"
import moment from "moment"
@Component({
  components: {},
})
export default class EvalRecord extends Vue {
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  public Supervision = new this.$api.configInterface.Supervision()
  private LimitInputlength = LimitInputlength
  private departmentData = []
  private defaultdate = []
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private textcolor = false
  private tableColumn = [
    { type: "seq", width: 60, fixed: null, title: "序号", align: "center" },
    { field: "fileName", width: 200, title: "文件名" },
    { field: "deptCode", title: "执勤部门", width: 80 },
    { field: "userName", title: "民警姓名" },
    { field: "userCode", title: "民警警号" },
    { field: "fileType_Name", title: "文件类型" },
    { field: "recordDate", title: "摄录时间" },
  ]
  private layouts = [
    "PrevJump",
    "PrevPage",
    "Jump",
    "PageCount",
    "NextPage",
    "NextJump",
    "Sizes",
    "Total",
  ]
  private tableData = []
  private formdata = {}
  private Evaluationlist = [
    { id: "1", value: "-1", title: "全部" },
    { id: "1", value: "1", title: "正常" },
    { id: "1", value: "0", title: "异常" },
  ]
  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.getdata()

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  private mounted() {
    // this.gettabledata({
    //   page: 1,
    //   limit: 15,
    //   deptCode: "",
    //   user: "",
    //   isNormal: -1,
    //   dateRange: "2020-11-01 ~ 2020-11-10",
    //   isDown: 0,
    // })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
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
        page: 1,
        limit: 15,
        deptCode: "",
        user: "",
        isNormal: -1,
        dateRange: res.data.myDate,
        isDown: 0,
      })
    })
  }
  private reset() {
    this.form.resetFields()
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private handleSubmit(e) {
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
          page: 1,
          limit: 15,
          deptCode: val.department,
          user: val.user,
          isNormal: val.Evaluation,
          dateRange: date,
          isDown: str,
        })
      }
    })
  }

  // api/file/filedata/file/list
  private gettabledata(obj) {
    this.Supervision.gettabledata(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private popup() {
    // console.log(1)
  }
  private tablebtn(row) {
    console.log(row)
  }
  private evaluateName(row) {
    return `${row.evaluateName}(${row.deptCode})`
  }
  private evaluateItems(row) {
    let str = ""
    row.evaluateItems.map((item) => {
      str += item.name
    })
    return str
  }
  private score(row) {
    let str = 0
    row.evaluateItems.map((item) => {
      str += item.score
    })
    if (str > 0) {
      return `异常（扣${str}分）`
    } else {
      this.textcolor = true
      return "正常"
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
</style>
