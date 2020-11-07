<template>
  <div>
    <div id="AvData" class="layoutcontainer">
      <div class="container">
        <!-- <div class="contaninerheader">
        </div>-->
        <Popup
          :wrapCol="wrapCol"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          :Datalist="Datalist"
        />
        <div>
          <a-table
            :rowClassName="rowClassName"
            :loading="loading"
            row-key="columns"
            :columns="columns"
            :bordered="true"
            :scroll="{ x: 1300 }"
            :data-source="tabledata"
            :pagination="pagination"
            rowKey="id"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
          >
            <span slot="action" slot-scope="text, record">
              <span style="color:#0db8df" @click="tablebtn(text, record)">操作</span>
            </span>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { LimitInputlength } from "../../InterfaceVariable/variable"
import { Component, Vue } from "vue-property-decorator"
import Popup from "../../components/modules/Popup.vue"
import moment from "moment"
@Component({
      components: { Popup },
})
export default class AvData extends Vue {
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private departmentData = []
  private defaultdate = [
        moment("2015-06-06", "YYYY-MM-DD"),
        moment("2015-06-06", "YYYY-MM-DD"),
  ]
  public wrapCol = {
        xs: 24,
        xl: 24,
  }
  public labelCol = {
        span: 6,
  }
  public wrapperCol = {
        span: 16,
  }
  public Datalist = [
        {
              type: "select",
              title: "部门",
              code: "title",
              placeholder: "请选择...",
              rule: [],
              iVal: "",
              display: true,
              disabled: false,
        },
        {
              type: "input",
              title: "姓名/警号",
              code: "author",
              placeholder: "请输警员姓名或警号",
              rule: [],
              iVal: "",
              display: true,
              disabled: false,
        },
        {
              type: "select",
              title: "时间类型",
              code: "date",
              placeholder: "请选择...",
              //   class:"riqi",
              rule: [],
              data: [
                    { id: 1, value: "1", title: "导入时间" },
                    { id: 2, value: "2", title: "拍摄时间" }
              ],
              iVal: "",
              display: true,
              disabled: false,
        },
        {
              type: "time",
              title: "时间",
              placeholder: "请选择时间",
              rule: [],
              iVal: "",
              class:"riqi",
              data: this.defaultdate,
              display: true,
              disabled: false,
        },
        {
              type: "select",
              title: "文件类型",
              code: "date",
              placeholder: "请选择...",
              class:"riqi",
              rule: [],
              data: [
                    { id: 1, value: "1", title: "视频" },
                    { id: 2, value: "2", title: "音频" },
                    { id: 3, value: "3", title: "图片" },
                    { id: 4, value: "4", title: "日志" }
              ],
              iVal: "",
              display: true,
              disabled: false,
        },
        {
              type: "select",
              title: "重要级别",
              code: "date",
              placeholder: "请选择...",
              class:"riqi",
              rule: [],
              data: [
                    { id: 1, value: "1", title: "高" },
                    { id: 2, value: "2", title: "中" },
                    { id: 3, value: "3", title: "低" }
              ],
              iVal: "",
              display: true,
              disabled: false,
        },
        {
              type: "BootmBtn",
              long: "long",
              title1:"重置",
              title2:"查询",
              class:"bottombtn",
              display: true,
              disabled: false,
        },
  ]
  private myDate = []
  private selectdata = []
  private selectedRowKeys = []
  private loading = false
  public pagination = {
        pageSize: 15, // 默认每页显示数量
        current: 1, //显示当前页数
        total: 0,
        showSizeChanger: false, // 显示可改变每页数量
        showQuickJumper: false, //显示跳转到输入的那一页
        showTotal: (total: number) =>
              `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
                    total / this.pagination.pageSize
              )} 页`, // 显示总数
  }
  private columns = [
        {
              title: "文件名称",
              dataIndex: "fileName",
              align: "left",
              key: "fileName",
              width: 400,
              fixed: "left",
        },
        {
              title: "执勤部门",
              dataIndex: "deptCode",
              align: "center",
              key: "deptCode",
              width: 200,
        },
        {
              title: "民警姓名",
              dataIndex: "userName",
              align: "center",
              width: 200,
              key: "userName",
        },
        {
              title: "民警警号",
              dataIndex: "userCode",
              align: "center",
              key: "userCode",
              width: 200,
        },
        {
              title: "文件类型",
              dataIndex: "fileType_Name",
              align: "center",
              key: "fileType_Name",
              width: 80,
        },
        {
              title: "重要级别",
              dataIndex: "fileLevel_Name",
              align: "center",
              key: "fileLevel_Name",
              width: 80,
        },
        {
              title: "摄录时间",
              dataIndex: "recordDate",
              align: "center",
              key: "recordDate",
              width: 200,
        },
        {
              title: "摄录时长",
              dataIndex: "fileDuration_Name",
              align: "center",
              key: "fileDuration_Name",
              width: 80,
        },
        {
              title: "导入时间",
              dataIndex: "uploadDate",
              align: "center",
              key: "uploadDate",
              width: 200,
        },
        {
              title: "关联信息",
              dataIndex: "relateCase",
              align: "center",
              key: "relateCase",
              width: 80,
        },
        {
              title: "操作",
              dataIndex: "action",
              align: "center",
              key: "action",
              width: 120,
              fixed: "right",
              scopedSlots: { customRender: "action" },
        },
  ]
  private tabledata = []
  private created() {
        this.form = this.$form.createForm(this)
        // this.getdata()
  }

  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
        this.pagination.pageSize = pagination.pageSize
        this.pagination.current = pagination.current
        let obj = {
              page: this.pagination.current,
              limit: this.pagination.pageSize,
        }
        // this.getList(obj);
  }
  private handleSubmit(e: any): void {
        e.preventDefault()
        this.form.validateFields((err: any, val: any) => {
              if (!err) {
                    let uploadDate_gt = val.date[0].format("YYYY-MM-DD HH:mm:ss")
                    let uploadDate_lt = val.date[1].format("YYYY-MM-DD HH:mm:ss")
                    let obj = {
                          page: 1,
                          limit: 15,
                          deptCode_equal: val.department, //部门id
                          userName: val.user, //警员
                          timeType: val.TimeData, //时间类型
                          timeRange: this.myDate,
                          fileType_equal: "",
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
        this.DataM.gettabledata(obj, true).then((res: any) => {
              console.log(res)
              this.tabledata = res.data
        })
  }
  private onSelectChange(selectedRowKeys: any) {
        console.log(selectedRowKeys)
        this.selectedRowKeys = selectedRowKeys
  }
  private reset() {
        this.form.resetFields()
        this.defaultdate = []
  }
  private popup(e: { preventDefault: () => void }) {
        this.getdata()
        e.preventDefault()
  }
  private tablebtn(text: any, row: any) {
        console.log(text, row)
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
#AvData .ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 0px;
}
#AvData .ant-table-placeholder {
  min-height: 600px !important;
}
#AvData .ant-table-wrapper {
  border: 1px solid #f1f1f1;
}
.light-row {
  background-color: #f5f5f5;
}
.dark-row {
  background-color: #ffffff;
}

</style>
