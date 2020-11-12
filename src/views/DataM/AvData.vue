<template>
  <div>
    <div id="AvData" class="layoutcontainer">
      <div class="container">
        <div class="contaninerheader" style="padding-left:26px">
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
                  <a-form-item label="部门">
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
                  <a-form-item label="姓名/警号">
                    <a-input
                      v-decorator="['user', { initialValue: '', rules: [] }]"
                      :max-length="LimitInputlength"
                      placeholder="请输入姓名/警号"
                    >/></a-input>
                  </a-form-item>
                  <a-form-item label="时间类型">
                    <a-select
                      v-decorator="[
                        'TimeData',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                      :allow-clear="true"
                      style="width: 100%"
                      placeholder="请选择..."
                    >
                      <a-select-option v-for="d in Timetype" :key="d.value">{{ d.title }}</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="时间">
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
                  <a-form-item label="文件类型">
                    <a-select
                      v-decorator="[
                        'Filetype',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                      :allow-clear="true"
                      style="width: 100%"
                      placeholder="请选择..."
                    >
                      <a-select-option v-for="d in filetype" :key="d.value">{{ d.title }}</a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="重要级别">
                    <a-select
                      v-decorator="[
                        'levelData',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                      :allow-clear="true"
                      style="width: 100%"
                      placeholder="请选择..."
                    >
                      <a-select-option v-for="d in levelData" :key="d.value">{{ d.title }}</a-select-option>
                    </a-select>
                  </a-form-item>
                  <div class="modulebottom">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handleSubmit">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div style="line-height:1">
            <button @click="download" style="line-height:1">批量删除</button>
            <button @click="dlt" style="line-height:1">批量下载</button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            height="auto"
            :data="tabledata"
            class="mytable-scrollbar"
            :loading="loading"
            highlight-hover-row
            ref="xTable1"
            @checkbox-all="selectAllEvent"
            @checkbox-change="selectChangeEvent"
          >
            >
            <vxe-table-column type="checkbox" width="60" />
            <vxe-table-column
              field="fileName"
              title="文件名称"
              align="center"
              show-overflow
              width="240"
            />
            <vxe-table-column field="deptCode" title="执勤部门" align="center" />
            <vxe-table-column field="userName" title="民警姓名" align="center" show-overflow />
            <vxe-table-column field="userCode" title="民警警号" align="center" />
            <vxe-table-column field="fileType_Name" title="文件类型" align="center" />
            <vxe-table-column field="fileLevel_Name" title="重要级别" align="center" />
            <vxe-table-column field="recordDate" title="摄录时间" show-overflow align="center" />
            <vxe-table-column field="uploadDate" title="导入时间" show-overflow align="center" />
            <vxe-table-column field="relateCase" title="关联信息" show-overflow align="center">
              <template v-slot="{ row }">
                <span>{{modify(row)}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="action" title="操作" align="center" fixed="right">
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
import { LimitInputlength } from "../../InterfaceVariable/variable"
import { Component, Vue } from "vue-property-decorator"
import moment from "moment"
@Component({})
export default class AvData extends Vue {
  [x: string]: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  public form!: any
  private departmentData = []
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
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
  private Timetype = [
    { id: 1, value: "uploadDate", title: "导入时间" },
    { id: 2, value: "recordDate", title: "拍摄时间" },
  ]
  private filetype = [
    { id: 1, value: "video", title: "视频" },
    { id: 2, value: "audio", title: "音频" },
    { id: 3, value: "photo", title: "图片" },
    { id: 4, value: "log", title: "日志" },
  ]
  private levelData = [
    { id: 1, value: "3", title: "高" },
    { id: 2, value: "2", title: "中" },
    { id: 3, value: "1", title: "低" },
  ]
  private defaultdate = [
    moment("2015-06-06", "YYYY-MM-DD"),
    moment("2015-06-06", "YYYY-MM-DD"),
  ]
  private myDate = []
  private selectdata = []
  private selectedRowKeys = []
  private loading = false
  private Height = ""
  private tabledata = []
  private formdata = {}
  private created() {
    this.form = this.$form.createForm(this)
    this.getdata()
    this.Height = `${document.documentElement.clientHeight - 230}px`
  }

  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        this.formdata = val
        let uploadDate_gt = val.date[0].format("YYYY-MM-DD HH:mm:ss")
        let uploadDate_lt = val.date[1].format("YYYY-MM-DD HH:mm:ss")
        let obj = {
          page: 1,
          limit: 15,
          deptCode_equal: val.department, //部门id
          userName: val.user, //警员
          timeType: val.TimeData, //时间类型
          timeRange: this.myDate,
          fileType_equal: val.Filetype,
          fileLevel_equal: val.levelData,
          uploadDate_gt: uploadDate_gt, //必填  时间起
          uploadDate_lt: uploadDate_lt, //必填  时间止
          recordDate_gt: "",
        }
        this.gettabledata(obj)
      }
    })
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    this.DataM.gettimeframe({ type: "LATELY_MONTH" }, true).then((res: any) => {
      this.myDate = res.data.myDate
      this.defaultdate = [
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD"),
      ]
    })
    let obj = {
      page: 1,
      limit: 15,
      deptCode_equal: "", //部门id
      userName: "", //警员
      timeType: "", //时间类型
      timeRange: "2020-10-06 ~ 2020-11-06",
      fileType_equal: "",
      fileLevel_equal: "",
      uploadDate_gt: "2020-10-06 00:00:00", //必填  时间起
      uploadDate_lt: "2020-11-06 23:59:59", //必填  时间止
      recordDate_gt: "",
    }
    this.gettabledata(obj)
  }
  private gettabledata(obj: any) {
    this.loading = true
    this.DataM.gettabledata(obj, true).then((res: any) => {
      this.page.totalResult = parseInt(res.count)
      this.tabledata = res.data
      this.loading = false
    })
  }

  private reset() {
    this.form.resetFields()
    this.defaultdate = []
  }
  private popup(e: { preventDefault: () => void }) {
    this.getdata()
    e.preventDefault()
  }
  private tablebtn(row: any, text: any) {
    console.log(row, text)
  }
  public rowClassName(record: any, index: number) {
    let className = "light-row"
    if (index % 2 === 1) className = "dark-row"
    return className
  }
  public download() {
    console.log(this.selectedRowKeys)
  }
  public dlt() {
    console.log(this.selectedRowKeys)
  }
  public pagerchange({ currentPage, pageSize }) {
    console.log(currentPage)
    console.log(pageSize)
    let obj = {
      page: currentPage,
      limit: pageSize,
      deptCode_equal: this.formdata.department, //部门id
      userName: this.formdata.user, //警员
      timeType: this.formdata.TimeData, //时间类型
      timeRange: this.myDate,
      fileType_equal: this.formdata.Filetype,
      fileLevel_equal: this.formdata.levelData,
      uploadDate_gt: this.formdata.date[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
      uploadDate_lt: this.formdata.date[1].format("YYYY-MM-DD HH:mm:ss"), //必填  时间止
      recordDate_gt: "",
    }
    this.gettabledata(obj)
  }
  public selectAllEvent({ checked, records }) {
    this.selectedRowKeys = records
    console.log(checked ? "所有勾选事件" : "所有取消事件", records)
  }
  public selectChangeEvent({ checked, records }) {
    this.selectedRowKeys = records
    console.log(checked ? "勾选事件" : "取消事件", records)
  }
  public modify(row) {
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
}
</script>

<style lang="less" scope>
.ant-form-item {
  margin-bottom: 7px;
}
.modulebottom {
  display: flex;
  justify-content: flex-end;
  > button:nth-of-type(1) {
    margin-right: 10px;
  }
  > button:nth-of-type(2) {
    margin-right: 28px;
  }
}
.contaninerheader {
  display: flex;
  justify-content: space-between;
  padding-top: 13px;
}
.contaninerheader {
  > div > button {
    background: #0db8df;
    border: 0;
    cursor: pointer;
    outline: none;
    color: #fff;
    width: 58px;
    height: 30px;
  }
  > div > button:nth-of-type(1) {
    margin-right: 9px;
  }
}
.box {
  width: 347px;
  height: 337px;
  background: #ffffff;
  border: 1px solid #f1f1f1;
}
.dropdown {
  width: 58px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #f1f1f1;
  display: block;
  text-align: center;
  color: #a1a9b5;
}
.ant-row .ant-form-item {
  width: 100%;
}
.ant-form-item-label > label {
  color: #808994;
}
#AvData .ant-table-tbody > tr > td {
  padding: 0px;
  height: 36px;
  line-height: 36px;
}
#AvData .ant-table-thead {
  height: 36px;
  line-height: 36px;
}
// #AvData .ant-table-thead > tr > th,
// .ant-table-tbody > tr > td {
//   padding: 0px;
// }
// #AvData .ant-table-placeholder{
//   min-height: 600px !important;
// }
// #AvData .ant-table-wrapper{
//   border: 1px solid #f1f1f1;
// }
.light-row {
  background-color: #f5f5f5;
}
.dark-row {
  background-color: #ffffff;
}
.ant-calendar-picker {
  width: 200px !important;
}

/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>
