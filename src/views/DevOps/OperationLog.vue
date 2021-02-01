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
                        <a-select-option v-for="d in logtype" :key="d.value">{{ d.label }}</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item label="功能模块">
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
                        <a-select-option v-for="d in funmodule" :key="d.value">{{ d.label }}</a-select-option>
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
            <vxe-table-column
              field="type"
              title="日志类型"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="module"
              title="功能模块"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="department"
              title="所属部门（部门编号）"
              show-overflow
              align="center"
              width="15%"
            />
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
  textarealength,
} from "@/InterfaceVariable/variable"
import axios from 'axios'
@Component({
  components: {},
})
export default class OperationLog extends Vue {
  [x: string]: any
  public form!: any
  public Luckmanagement = new this.$api.configInterface.Luckmanagement()
    private page= {
      currentPage: 1, //当前页数
      pageSize: 15, //每页多少条
      totalResult: 200, //总数
    }
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private tableData = []
  private layouts = layouts
  private Height = ""
  private logtype = []
  private funmodule = []
  private date = []
  private defaultdate = ""
  private type_equal = "-1"    //功能模块
  private module_equal = "-1"   //日志类型
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
      module_equal: this.type_equal,
      type_equal: this.module_equal,
      createTime: this.defaultdate,
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
      type_equal: this.type_equal,
      module_equal: this.module_equal,
      createTime: this.defaultdate,
    }
    this.Luckmanagement.getlogtable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private popup() {
    return
  }
  private reset() {
    this.Luckmanagement.getlogdate({}).then((res) => {
      this.defaultdate = res.data
      this.date = [
        moment(res.data.split("~")[0].replace(/\s*/g, ""), "YYYY-MM-DD"),
        moment(res.data.split("~")[1].replace(/\s*/g, ""), "YYYY-MM-DD"),
      ]
    })
    this.type_equal = "-1"
    this.module_equal = "-1"
    this.form.resetFields()
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        this.page.currentPage = 1
        this.type_equal = val.module_equal
        this.module_equal = val.type_equal
        this.defaultdate = `${val.date[0].format(
          "YYYY-MM-DD"
        )} ~ ${val.date[1].format("YYYY-MM-DD")}`
        console.log(val)
        this.gettabledata({
          page: this.page.currentPage,
          size: this.page.pageSize,
          module_equal: val.type_equal,
          type_equal: val.module_equal,
          createTime: `${val.date[0].format(
            "YYYY-MM-DD"
          )} ~ ${val.date[1].format("YYYY-MM-DD")}`,
        })
      }
    })
  }
  private exports() {
    let url = window.gurl.SERVICE_CONTEXT_PATH
    let obj = {
      module_equal: this.module_equal ,
      type_equal: this.type_equal,
      createTime: this.defaultdate,
    }
    axios.get(`${url}api/pconfig/base/log/export`,{
      params: obj,
      headers: {
        Token: localStorage.getItem("token"),
      },
      responseType: 'arraybuffer'
    }).then(res => {
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
      if (navigator.msSaveBlob) { // IE10+ 
        window.navigator.msSaveOrOpenBlob(blob,`日志管理.xls`);
      }
      else {
        const aLink = document.createElement("a");
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download', '日志管理' + '.xls') // 设置下载文件名称
        aLink.click()
      }
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
    console.log(obj)
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
