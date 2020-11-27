<template>
  <div>
    <!-- 日志管理 -->
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
                    <a-form-item label="日志类型">
                      <a-select
                        v-decorator="[
                        'type_equal',
                        {
                          initialValue: '-1',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in logtype" :key="d.value">{{ d.label }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="功能模块">
                      <a-select
                        v-decorator="[
                        'module_equal',
                        {
                          initialValue: '-1',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in funmodule" :key="d.value">{{ d.label }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="操作时段">
                      <a-range-picker
                        :show-time="{
                            hideDisabledOptions: true,
                          }"
                        v-decorator="[
                        'date',
                        {
                          initialValue: date,
                          rules: []
                        }
                      ]"
                        @change="onChange"
                      />
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
          <div class="btns">
            <a-button @click="exports" type="primary" v-isshow="'base:log:export'">导出</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            border
            height="auto"
            ref="logAdministration"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column
              field="type"
              title="日志类型"
              show-overflow
              align="center"
              minWidth="160"
            />
            <vxe-table-column
              field="module"
              title="功能模块"
              show-overflow
              align="center"
              minWidth="160"
            />
            <vxe-table-column
              field="department"
              title="所属部门（部门编号）"
              show-overflow
              align="center"
              minWidth="240"
            />
            <vxe-table-column
              field="operator"
              title="操作人员（警号）"
              show-overflow
              align="center"
              minWidth="240"
            />
            <vxe-table-column
              field="createTime"
              title="操作时间"
              show-overflow
              align="center"
              minWidth="130"
            />
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
import { Component, Prop, Vue } from "vue-property-decorator"
import moment from "moment"
import {
  layouts,
  LimitInputlength,
  page,
  textarealength,
} from "@/InterfaceVariable/variable"
@Component({
  components: {},
})
export default class OperationLog extends Vue {
  [x: string]: any
  public form!: any
  public Luckmanagement = new this.$api.configInterface.Luckmanagement()
  private page = page
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private tableData = []
  private layouts = layouts
  private Height = ""
  private logtype = []
  private funmodule = []
  private date = []
  private defaultdate = ""
  private type_equal = "-1"
  private module_equal = "-1"
  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    // this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    this.getdata()
    let obj = {
      page: 1,
      size: 15,
      type_equal: this.type_equal,
      module_equal: this.module_equal,
      createTime: this.defaultdate,
    }
    this.gettabledata(obj)
  }
  // todo事件
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private pagerchange({ currentPage, pageSize }) {
    let obj = {
      page: currentPage,
      size: pageSize,
      type_equal: this.type_equal,
      module_equal: this.module_equal,
      createTime: this.defaultdate,
    }
    console.log(obj)
    this.Luckmanagement.getlogtable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private popup() {
    return
  }
  private reset() {
    this.type_equal = "-1"
    this.module_equal = "-1"
    this.form.resetFields()
    let obj = {
      page: 1,
      size: 15,
      type_equal: this.type_equal,
      module_equal: this.module_equal,
      createTime: this.defaultdate,
    }
    this.gettabledata(obj)
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        this.module_equal = val.module_equal
        this.type_equal = val.type_equal
        this.defaultdate = `${val.date[0].format(
          "YYYY-MM-DD"
        )} ~ ${val.date[1].format("YYYY-MM-DD")}`
        console.log(this.module_equal)
        console.log(this.type_equal)
        console.log(this.defaultdate)

        this.gettabledata({
          page: 1,
          limit: 15,
          type_equal: this.type_equal,
          module_equal: this.module_equal,
          createTime: `${val.date[0].format(
            "YYYY-MM-DD"
          )} ~ ${val.date[1].format("YYYY-MM-DD")}`,
        })
      }
    })
  }
  private exports() {
    (this.$refs.logAdministration as any).exportData({
      filename: "日志管理",
      sheetName: "Sheet1",
      type: "xlsx",
    })
  }
  private getdata() {
    this.Luckmanagement.getlogdate({}).then((res) => {
      this.defaultdate = res.data
      this.date = [
        moment(res.data.split("~")[0].replace(/\s*/g, ""), "YYYY-MM-DD"),
        moment(res.data.split("~")[1].replace(/\s*/g, ""), "YYYY-MM-DD"),
      ]
    })
    this.Luckmanagement.getlogtype({}).then((res) => {
      this.logtype = res.data
      let obj = { value: "-1", label: "全部" }
      this.logtype.unshift(obj)
    })
    this.Luckmanagement.getlogfunmodule({ type: "" }).then((res) => {
      this.funmodule = res.data
      let obj = { value: "-1", label: "全部" }
      this.funmodule.unshift(obj)
    })
  }
  private gettabledata(obj) {
    this.Luckmanagement.getlogtable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private onChange(date: any, dateString: any): void {
    this.date = dateString
  }
}
</script>

<style lang="less" scope>
.el-scrollbar__wrap {
  width: 100%;
}
.screen {
  width: 347px;
  height: 260px;
}
.ant-calendar-picker {
  width: 200px !important;
}
.btns button {
    height: 30px;
    line-height: 1;
    color: #fff;
    outline: none;
    cursor: pointer;
    border: 0;
    margin-left: 10px;
}
</style>
