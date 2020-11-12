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

            <vxe-table-column field="fileType" title="文件类型" show-overflow align="center">
              <template v-slot="{ row }">{{fileType(row)}}</template>
            </vxe-table-column>
            <vxe-table-column field="actions" title="操作" align="center">
              <template v-slot="{ row }">
                <span type="text" @click="tablebtn(row)" style="color:#0db8df;cursor: pointer;">评分</span>
              </template>
            </vxe-table-column>
          </vxe-table>
          <!-- <p>
            <vxe-pager
              align="right"
              size="mini"
              :layouts="layouts"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              @page-change="pagerchange"
            />
          </p> -->
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
export default class EvalRandom extends Vue {
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
    totalResult: 0, //总数
  }
  private Height = ""
  private textcolor = false
  private tableColumn = [
    { type: "seq", width: 60, fixed: null, title: "序号", align: "center" },
    { field: "fileName", width: 200, title: "文件名" },
    { field: "deptCode", title: "执勤部门", width: 80 },
    { field: "userName", title: "民警姓名" },
    { field: "userCode", title: "民警警号" },
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

  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 210}px`
    this.form = this.$form.createForm(this)
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
      console.log(res.data.myDate)
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
          length:val.count,
          isDown: str,
        })
      }
    })
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
