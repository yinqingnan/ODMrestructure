<template>
  <div>
    <!-- 采集站 -->
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
                        placeholder="请选择所属部门"
                      />
                    </a-form-item>
                    <a-form-item label="采集站名称">
                      <a-input
                        v-decorator="['name', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入采集站名称"
                      >/></a-input>
                    </a-form-item>

                    <a-form-item label="采集站状态">
                      <a-select
                        v-decorator="[
                        'deviceStatus',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in list" :key="d.value">{{ d.title }}</a-select-option>
                      </a-select>
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
            <a-button type="primary" @click="Enable" v-isshow="'device:stations:active'">启用</a-button>
            <a-button type="primary" @click="restarts" v-isshow="'device:stations:restart'">重启</a-button>
            <a-button type="primary" @click="datasync" v-isshow="'device:stations:sync'">数据同步</a-button>
            <a-button type="primary" @click="upgrade" v-isshow="'device:stations:upgrade'">升级</a-button>
            <a-button type="primary" @click="Shutdown" v-isshow="'device:stations:shutdown'">关机</a-button>
            <a-button type="primary" @click="Disable" v-isshow="'device:stations:disable'">禁用</a-button>
            <a-button type="primary" @click="dlt" v-isshow="'device:stations:delete'">删除</a-button>
            <a-button type="primary" @click="daochu" v-isshow="'device:stations:export'">导出</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            resizable
            height="auto"
            ref="caijizhan"
            class="mytable-scrollbar"
            highlight-hover-row
            :row-class-name="tableRowClassName"
            :data="tableData"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            :checkbox-config="{ checkMethod: checCheckboxkMethod2}"
          >
            <vxe-table-column type="checkbox" width="60" align="center" />
            <vxe-table-column field="code" title="采集站编号" show-overflow align="center" />
            <vxe-table-column field="name" title="采集站名称" show-overflow align="center" />
            <vxe-table-column field="deptName" title="所属部门" show-overflow align="center" />
            <vxe-table-column field="ip" title="IP地址" show-overflow align="center" />
            <vxe-table-column field="clientVersionStatus" title="前端版本" align="center">
              <template v-slot="{ row }">
                <span
                  v-if="row.clientVersionStatus == '需要升级'"
                  style="color:red"
                >{{row.clientVersionStatus}}</span>
                <span v-else>{{row.clientVersionStatus}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="serverVersionStatus" title="后端版本" align="center">
              <template v-slot="{ row }">
                <span
                  v-if="row.serverVersionStatus == '需要升级'"
                  style="color:red"
                >{{row.serverVersionStatus}}</span>
                <span v-else>{{row.serverVersionStatus}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="storageShow" title="磁盘容量" show-overflow align="center">
              <template v-slot="{ row }">
                <span
                  v-if="row.storageRest/(1024*1024*1024) < 500"
                  style="color:red"
                >{{row.storageShow}}</span>
                <span v-else>{{row.storageShow}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="statusName" title="启用状态" width="100" align="center">
              <template v-slot="{ row }">
                <span v-if="row.statusName =='禁用'" style="color:red">{{row.statusName}}</span>
                <span v-else>{{row.statusName}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="isOline" title="在线状态" align="center">
              <template v-slot="{ row }">
                <span v-if="row.isOline =='离线'" style="color:red">{{row.isOline}}</span>
                <span v-else>{{row.isOline}}</span>
              </template>
            </vxe-table-column>
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
import {
  LimitInputlength,
  textarealength,
  page,
  layouts,
} from "@/InterfaceVariable/variable"
import axios from 'axios'
@Component({
  components: {},
})
export default class Stations extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  public DeviceM = new this.$api.configInterface.DeviceM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private list = [
    { id: "0", value: "all", title: "全部" },
    { id: "1", value: "1", title: "在线" },
    { id: "2", value: "0", title: "离线" },
  ]
  private tableData = []
    private page= {
      currentPage: 1, //当前页数
      pageSize: 15, //每页多少条
      totalResult: 200, //总数
    }
  private deptCode_equal = ''
  private name_like = ''
  private stationStatus = ''


  private departmentData = []
  private layouts = layouts
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
      type_notequal: '3',
    }
    this.gettabledata(obj)
    this.getdata()
  }
  // todo事件.
  private popup() {
    return
  }
  private reset() {
    this.form.resetFields()
    this.deptCode_equal = ''
    this.name_like = ''
    this.stationStatus = ''
    let obj = {
      page: this.page.currentPage,
      limit: this.page.pageSize,
      type_notequal: 3,
    }
    this.gettabledata(obj)
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        this.deptCode_equal = val.department
        this.name_like = val.name
        this.stationStatus =  val.deviceStatus
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          type_notequal: 3,
          deptCode_equal: val.department,
          name_like: val.name,
          stationStatus: val.deviceStatus,
        }
        this.gettabledata(obj)
      }
    })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
  }
  private gettabledata(obj) {
    this.DeviceM.stationstable(obj, true).then((res: any) => {
      if (res.code == 0) {
        this.page.totalResult = parseInt(res.count)
        this.tableData = res.data
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  private checCheckboxkMethod2({ row }) {
    return row.source < 3
  }
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let obj = {
      page: currentPage,
      limit: pageSize,
      type_notequal: 3,
    }
    this.gettabledata(obj)
  }
  private getSelectEvent1() {
    return (this.$refs.Acquisitionstation as any).getCheckboxRecords()
  }
  // 禁用
  public Enable() {
    let arr = this.getSelectEvent1()
    let selectarr = []
    if (arr.length > 0) {
      arr.map((item) => {
        selectarr.push(item.id)
      })
      this.DeviceM.collectionEnable(selectarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          let obj = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            type_notequal: 3,
          }
          this.gettabledata(obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择参数后操作")
    }
  }
  // 重启
  public restarts() {
    let arr = this.getSelectEvent1()
    let selectarr = []
    if (arr.length > 0) {
      arr.map((item) => {
        selectarr.push(item.id)
      })
      this.DeviceM.collectionrestart(selectarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          let obj = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            type_notequal: 3,
          }
          this.gettabledata(obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择参数后操作")
    }
  }
  // 数据同步
  public datasync() {
    let arr = this.getSelectEvent1()
    let selectarr = []
    if (arr.length > 0) {
      arr.map((item) => {
        selectarr.push(item.id)
      })
      this.DeviceM.collectiondatasync(selectarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          let obj = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            type_notequal: 3,
          }
          this.gettabledata(obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择参数后操作")
    }
  }
  // 升级
  public upgrade() {
    let arr = this.getSelectEvent1()
    let selectarr = []
    if (arr.length > 0) {
      arr.map((item) => {
        selectarr.push(item.id)
      })
      this.DeviceM.collectionupgrade(selectarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          let obj = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            type_notequal: 3,
          }
          this.gettabledata(obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择参数后操作")
    }
  }
  // 关机
  public Shutdown() {
    let arr = this.getSelectEvent1()
    let selectarr = []
    if (arr.length > 0) {
      arr.map((item) => {
        selectarr.push(item.id)
      })
      this.DeviceM.collectionShutdown(selectarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          let obj = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            type_notequal: 3,
          }
          this.gettabledata(obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择参数后操作")
    }
  }
  // 禁用
  public Disable() {
    let arr = this.getSelectEvent1()
    let selectarr = []
    if (arr.length > 0) {
      arr.map((item) => {
        selectarr.push(item.id)
      })
      this.DeviceM.collectionDisable(selectarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          let obj = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            type_notequal: 3,
          }
          this.gettabledata(obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择参数后操作")
    }
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  // 删除
  public dlt() {
    let arr = this.getSelectEvent1()
    let selectarr = []
    if (arr.length > 0) {
      arr.map((item) => {
        selectarr.push(item.id)
      })
      this.DeviceM.collectionDlt(selectarr).then((res) => {
        if (res.code == 0) {
          this.$message.success(res.msg)
          let obj = {
            page: this.page.currentPage,
            limit: this.page.pageSize,
            type_notequal: 3,
          }
          this.gettabledata(obj)
        } else {
          this.$message.error(res.msg)
        }
      })
    } else {
      this.$message.error("选择参数后操作")
    }
  }
  public daochu() {
    let url = window.gurl.SERVICE_CONTEXT_PATH
    const obj = {
      // name_like:  this.nameLike,
      // code_like: this.codeLike,
      type_notequal: 3,
      deptCode_equal: this.deptCode_equal,
      name_like: this.name_like,
      stationStatus: this.stationStatus,
    }
    axios.get(`${url}api/mdm/device/stations/export`,{
      params: obj,
      headers: {
        Token: localStorage.getItem("token"),
      },
      'responseType': 'blob'
    }).then(res => {
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
      if (navigator.msSaveBlob) { // IE10+ 
        window.navigator.msSaveOrOpenBlob(blob,`采集站.xls`);
      }
      else {
        const aLink = document.createElement("a");
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download', '采集站' + '.xls')
        aLink.click()
      }
    })
    // (this.$refs.caijizhan as any).exportData({
    //   filename: "采集站",
    //   sheetName: "Sheet1",
    //   type: "xlsx",
    //   message:false,
    // })
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
