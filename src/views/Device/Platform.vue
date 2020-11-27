<template>
  <div>
    <!-- 子平台 -->
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
                    <a-form-item label="子平台名称">
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
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            height="auto"
            ref="Acquisitionstation"
            class="mytable-scrollbar"
            :data="tableData"
            highlight-hover-row
            :row-class-name="tableRowClassName"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column field="name" title="子平台名称" show-overflow width="140" align="center" />
            <vxe-table-column field="code" title="子平台编号" show-overflow width="140" align="center" />
            <vxe-table-column field="deptName" title="所属部门" show-overflow  width="140" align="center" />
            <vxe-table-column field="ip" title="IP地址" show-overflow  width="140" align="center" />
            <vxe-table-column field="storageShow" title="剩余容量（GB）" width="140" show-overflow align="center">
              <template v-slot="{ row }">
                <span
                  v-if="row.storageRest/(1024*1024*1024) < 500"
                  style="color:red"
                >{{row.storageShow}}</span>
                <span v-else>{{row.storageShow}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="storageShow2" title="总容量（GB）" width="140" align="center">
              <template v-slot="{ row }">
                <span>{{row.storageShow.replace(/GB/g,"").split('/')[1]}}</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="isOline" title="在线状态" show-overflow align="center">
              <template v-slot="{ row }">
                <span style="color:red" v-if="row.isOline == '离线'">{{row.isOline}}</span>
                <span style="color:red" v-else>{{row.isOline}}</span>
              </template>
            </vxe-table-column>

            <vxe-table-column title="操作" align="center">
              <template v-slot="{ row }">
                <span @click="dlt(row)" style="color:#4d96ca;cursor:pointer;" v-isshow="'device:platform:delete'">删除</span>
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
import { Component, Prop, Vue } from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,layouts,page
} from "@/InterfaceVariable/variable"
@Component({
  components: {},
})
export default class Platform extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  public DeviceM = new this.$api.configInterface.DeviceM()
  public LimitInputlength = LimitInputlength
  public textarealength = textarealength
  private page = page
  private tableData = []
  private departmentData = []
  private layouts = layouts
  private list = [
    { id: "0", value: "all", title: "全部" },
    { id: "1", value: "1", title: "在线" },
    { id: "2", value: "0", title: "离线" },
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
      page: 1,
      limit: 15,
      type_equal: 3,
    }
    this.gettabledata(obj)
    this.getdata()
  }
  // todo事件.
  private popup() {
    return
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
  }
  private gettabledata(obj) {
    this.DeviceM.platformtable(obj, true).then((res) => {
      console.log(res)
      if (res.code == 0) {
        this.tableData = res.data
        this.page.totalResult = parseInt(res.count)
      }
    })
  }
  private pagerchange({ currentPage, pageSize }) {
    let obj = {
      page: currentPage,
      limit: pageSize,
      type_equal: 3,
    }
    this.gettabledata(obj)
  }
  private reset() {
    this.form.resetFields()
    let obj = {
      page: 1,
      limit: 15,
      type_equal: 3,
    }
    this.gettabledata(obj)
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        let obj = {
          page: 1,
          limit: 15,
          type_equal: 3,
          deptCode_equal: val.department,
          name_like: val.name,
          stationStatus: val.deviceStatus,
        }
        this.gettabledata(obj)
      }
    })
  }
  private dlt(row) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    this.$confirm({
      title: "提示",
      content: "确定要删除子平台TCL视音频数据管理平台(上级平台)吗？",
      onOk() {
        // alert(`删除id为：${row.id}的这项`)
        that.DeviceM.platformdlt([row.id]).then((res) => {
          if (res.code == 0) {
            that.$message.success(res.msg)
            that.gettabledata({
              page: 1,
              limit: 15,
              type_equal: 3,
            })
          } else {
            that.$message.error(res.msg)
          }
        })
      },
    })
  }
  private tableRowClassName(record: any, index: number) {
     
    return record.rowIndex % 2 === 0 ? "bgF5" : "";
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
