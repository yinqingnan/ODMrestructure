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
                        format="YYYY-MM-DD"
                        v-decorator="[
                        'type_equel',
                        {
                          initialValue: '-1',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                        @change="value => typechang(value)"
                      >
                        <a-select-option v-for="d in logtype" :key="d.value">{{ d.name }}</a-select-option>
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
                        <a-select-option v-for="d in funmodule" :key="d.value">{{ d.name }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="平台类型">
                      <a-select
                        v-decorator="[
                        'is_web',
                        {
                          initialValue: is_web,
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option value="1">WEB</a-select-option>
                        <a-select-option value="0">PC</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="操作时段">
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
                          initialValue: null,
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
          <div style="line-height: 1;">
            <a-button @click="exports" type="primary" v-isshow="'base:log:export'">导出</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            border
            resizable
            height="auto"
            show-header-overflow
            ref="logAdministration"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            :data="tableData"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column field="type" title="日志类型" show-overflow align="center" width="10%" />
            <vxe-table-column field="isWeb" title="平台类型" show-overflow align="center" width="10%" />

            <vxe-table-column field="module" title="功能模块" show-overflow align="center" width="10%" />
            <vxe-table-column
              field="operator"
              title="操作人员（警号）"
              show-overflow
              align="center"
              width="15%"
            />
            <vxe-table-column
              field="content"
              title="日志内容"
              show-overflow
              align="center"
              width="25%"
            />
            <vxe-table-column
              field="createTime"
              title="操作时间"
              show-overflow
              align="center"
              width="15%"
            />
          </vxe-table>
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
import moment from "moment"
import {
  layouts,
  LimitInputlength,
  page,
  textarealength
} from "@/InterfaceVariable/variable"
import axios from "axios"

interface Search {
  page: number
  size: number
  module_equal: string
  type_equal: string
  createTime_ge?: string
  createTime_le?: string
  is_web_equal: string
  sidx: string
  order: string
}
@Component({
  components: {}
})
export default class OperationLog extends Vue {
  [x: string]: any
  public form!: any
  public Luckmanagement = new this.$api.configInterface.Luckmanagement()
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private tableData = []
  private layouts = layouts
  private Height = ""
  private logtype = []
  private funmodule = []
  private defaultdate = ""
  private type_equal = "-1" //功能模块
  private module_equal = "-1" //日志类型
  private is_web = "1"
  // todo 事件和生命周期
  private created() {
    this.form = this.$form.createForm(this)
    // this.getdata()
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    this.getdata()
    let obj = {
      page: this.page.currentPage,
      size: this.page.pageSize,
      type_equel: "",
      module_equal: "",
      is_web_equal:'1',
      createTime_ge: "", //开始日期
      createTime_le: "", //结束日期
      sidx: "id",
      order: "asc"
    }
    this.gettabledata(obj)
  }
  // todo事件
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let obj = {
      page: currentPage,
      size: pageSize,
      module_equal: this.search.module_equal,
      type_equal: this.searchtype_equel,
      is_web_equal: this.search.is_web_equal,
      createTime_ge: this.search.createTime_ge,
      createTime_le: this.search.createTime_le,
      sidx: "id",
      order: "asc"
    }
    this.gettabledata(obj)
  }
  private popup() {
    return
  }
  private reset() {
    this.type_equal = "-1"
    this.module_equal = "-1"
    this.form.resetFields()
  }

  private search: Search = {
    page: 1,
    size: 15,
    is_web_equal: "1",
    module_equal: "",
    type_equal: "",
    createTime_ge: "",
    createTime_le: "",
    sidx: "id",
    order: "asc"
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)

        this.page.currentPage = 1
        this.type_equal = val.type_equal
        this.module_equal = val.module_equal
        if (val.date?.length > 0) {
          let obj = {
            page: this.page.currentPage,
            size: this.page.pageSize,
            module_equal: val.module_equal === "-1" ? "" : val.module_equal,
            type_equal: val.type_equel === "-1" ? "" : val.type_equel,
            is_web_equal: val.is_web,
            createTime_ge:
              val.date?.length > 0
                ? val.date[0].format("YYYY-MM-DD HH:mm:ss")
                : "",
            createTime_le:
              val.date?.length > 0
                ? val.date[1].format("YYYY-MM-DD HH:mm:ss")
                : "",
            sidx: "id",
            order: "asc"
          }
          this.search = obj
          this.gettabledata(obj)
          this.createTime_ge = val.date[0].format("YYYY-MM-DD HH:mm:ss")
          this.createTime_le = val.date[1].format("YYYY-MM-DD HH:mm:ss")
        } else {
          let obj = {
            page: this.page.currentPage,
            size: this.page.pageSize,
            is_web_equal: val.is_web,
            module_equal: val.module_equal === "-1" ? "" : val.module_equal,
            type_equal: val.type_equel === "-1" ? "" : val.type_equel,
            sidx: "id",
            order: "asc"
          }
          this.search = obj
          this.gettabledata(obj)
        }
      }
    })
  }
  private typechang(val) {
    this.$nextTick(() => {
      this.form.setFieldsValue({
        module_equal: "-1"
      })
    })
  }
  private exports() {
    let url = window.gurl.SERVICE_CONTEXT_PATH
    let obj = {
      module_equal: this.module_equal ? "" : this.module_equal,
      type_equal: this.type_equal ? "" : this.type_equal,
      is_web: this.is_web,
      createTime_ge: "",
      createTime_le: ""
    }
    axios
      .get(`${url}log/export`, {
        params: obj,
        headers: {
          Token: localStorage.getItem("token")
        },
        responseType: "arraybuffer"
      })
      .then((res) => {
        let blob = new Blob([res.data], { type: "application/vnd.ms-excel" })
        if (navigator.msSaveBlob) {
          // IE10+
          window.navigator.msSaveOrOpenBlob(blob, `日志管理.xls`)
        } else {
          const aLink = document.createElement("a")
          aLink.href = URL.createObjectURL(blob)
          aLink.setAttribute("download", "日志管理" + ".xls") // 设置下载文件名称
          aLink.click()
        }
      })
  }
  private getdata() {
    this.Luckmanagement.getlogtype({}).then((res) => {
      this.logtype = res.data === null ? [] : res.data
      let obj = { value: "-1", name: "全部" }
      this.logtype.unshift(obj)
    })
    this.Luckmanagement.getlogfunmodule("0").then((res) => {
      this.funmodule = res.data === null ? [] : res.data
      let obj = { value: "-1", name: "全部" }
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
