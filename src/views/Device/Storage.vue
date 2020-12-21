<template>
  <div>
    <!-- 存储服务器 -->
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
                    <a-form-item label="服务器名称">
                      <a-input
                        v-decorator="['name', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入服务器名称"
                      >/></a-input>
                    </a-form-item>

                    <a-form-item label="服务器状态">
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
                        placeholder="请选择服务器状态"
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
            <a-button @click="add" type="primary" v-isshow="'device:storage:save'">添加</a-button>
            <a-button @click="dlt" type="primary" v-isshow="'device:storage:delete'">删除</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            border
            resizable
            height="auto"
            ref="Acquisition"
            class="mytable-scrollbar"
            :data="tableData"
            highlight-hover-row
            :row-class-name="tableRowClassName"
            :checkbox-config="{ checkMethod: checCheckboxkMethod2}"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
          >
            <vxe-table-column type="checkbox" width="60" align="center" />
            <vxe-table-column field="name" title="服务器名称" show-overflow align="center" />
            <vxe-table-column field="ip" title="IP地址" show-overflow align="center" />
            <vxe-table-column field="port" title="端口" show-overflow align="center" />
            <vxe-table-column field="isOline" title="在线状态" show-overflow align="center">
              <template v-slot="{ row }">
                <span style="color:red" v-if="row.isOline == '离线'">离线</span>
                <span v-else>在线</span>
              </template>
            </vxe-table-column>
            <vxe-table-column field="onlineDate" title="上次心跳时间" show-overflow align="center" />

            <vxe-table-column field title="操作" align="center">
              <template v-slot="{ row }">
                <div style="color:#4d96ca" v-if="!row.isPlatform">
                  <span
                    style="cursor:pointer"
                    @click="edit(row)"
                    v-isshow="'device:storage:update'"
                  >编辑</span>
                  <span
                    style="margin-left: 8px;cursor:pointer;"
                    @click="FTPconfig(row)"
                    v-isshow="'device:storage:ftp'"
                  >FTP配置</span>
                </div>
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
      <a-modal v-model="visible" :title="text" ok-text="确认" cancel-text="取消" @ok="modalbtn">
        <a-form
          autocomplete="off"
          :form="form2"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          @submit="modalbtn"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="服务器名称">
                <a-input
                  v-decorator="['name', { initialValue: '',  rules: [] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入服务器名称"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="服务器IP">
                <a-input
                  :disabled="isDisable"
                  v-decorator="['ip', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入服务器IP"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="服务器端口">
                <a-input
                  v-decorator="['port', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入服务器端口"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>

      <a-modal
        v-model="FTPvisible"
        title="FTP配置"
        ok-text="确认"
        cancel-text="取消"
        @ok="ftpbtn"
        :width="800"
        class="ftptc"
      >
        <a-button
          class="ftpadd"
          @click="ftpaddconfig"
          type="primary"
          v-isshow="'device:storageFtp:save'"
        >添加</a-button>
        <vxe-table
          style="margin-top:40px"
          border
          resizable
          ref="Acquisition"
          highlight-hover-row
          max-height="200"
          class="mytable-scrollbar"
          :data="ftptable"
        >
          <vxe-table-column type="seq" title="序号" align="center" width="60" />
          <vxe-table-column field="userName" title="FTP账户" show-overflow align="center" />
          <vxe-table-column field="passwd" title="FTP密码" show-overflow align="center" />
          <vxe-table-column field="path" title="FTP存储路径" show-overflow align="center" />
          <vxe-table-column field title="操作" align="center">
            <template v-slot="{ row }">
              <div style="color:#4d96ca">
                <span
                  style="cursor:pointer"
                  @click="ftpedit(row)"
                  v-isshow="'device:storageFtp:update'"
                >编辑</span>
                <span
                  style="margin-left: 8px;cursor:pointer;"
                  @click="ftpdlt(row)"
                  v-isshow="'device:storageFtp:delete'"
                >删除</span>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <div style="margin-top:30px" v-if="addshow">
          <a-form
            autocomplete="off"
            :form="form3"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
            @submit="ftpbtn"
          >
            <a-row :gutter="24">
              <a-col :span="12">
                <a-form-item label="FTP账号">
                  <a-input
                    v-decorator="['name', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                    :max-length="LimitInputlength"
                    placeholder="请输入FTP账号"
                  >/></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item label="FTP密码">
                  <a-input
                    v-decorator="['passwd', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                    :max-length="LimitInputlength"
                    placeholder="请输入服务器IP"
                  >/></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24" class="ftpinput">
              <a-col :span="24">
                <a-form-item label="FTP路径">
                  <a-input
                    v-decorator="['path', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                    :max-length="LimitInputlength"
                    placeholder="请输入FTP路径"
                  >/></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <div style="display: flex;justify-content: center;">
            <a-button style="margin-right:8px" @click="ftpquxiao">取消</a-button>
            <a-button type="primary" @click="ftpbtn">保存</a-button>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>
// 90  630
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,
  page,
  layouts,
} from "@/InterfaceVariable/variable"
import axios from "axios"
@Component({
  components: {},
})
export default class Storage extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  public form2!: any
  public form3!: any
  public id = ""
  public ftpid = ""
  public IP = ""
  public text = "添加"
  public isDisable = false
  public visible = false
  public FTPvisible = false
  public addshow = false
  public ftpdisabled = false
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
  private ftptable = []
  private page= {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private departmentData = []
  private layouts = layouts

  // todo 生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
    this.form3 = this.$form.createForm(this)
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
    }
    this.getdata()
    this.gettabledata(obj)
  }
  // todo事件.
  private popup() {
    return
  }
  private reset() {
    this.form.resetFields()
    let obj = {
      page: this.page.currentPage,
      limit: this.page.pageSize,
    }
    this.gettabledata(obj)
  }
  private handle(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let obj = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          name_like: val.name,
          isOline: val.deviceStatus,
        }
        this.gettabledata(obj)
      }
    })
  }
  private modalbtn(e) {
    e.preventDefault()
    this.form2.validateFields((err: any, val: any) => {
      if (!err) {
        let obj = {
          id: this.id,
          ip: val.ip,
          name: val.name,
          port: val.port,
        }
        this.DeviceM.storeadd(obj).then((res) => {
          // console.log(res)
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.visible = false
            let obj = {
              page: this.page.currentPage,
              limit: this.page.pageSize,
            }
            this.gettabledata(obj)
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
  }
  private gettabledata(obj) {
    this.DeviceM.storetable(obj, true).then((res: any) => {
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
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private add() {
    this.visible = true
    this.text = '添加'
    this.form2.resetFields()
    this.isDisable = false
  }
  private dlt() {
    let arr = this.getSelectEvent1()
    console.log(arr)
    if (arr.length > 0) {
      let dltarr = []
      arr.map((item) => {
        dltarr.push(item.id)
      })
      console.log(dltarr)
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this
      this.$confirm({
        title: "提示",
        content: "是否确定删除？",
        onOk() {
          that.DeviceM.storedlt(dltarr).then((res) => {
            console.log(res)
            if (res.code == 0) {
              that.$message.success(res.msg)
              let obj = {
                page: this.page.currentPage,
                limit: this.page.pageSize,
              }
              that.gettabledata(obj)
              return new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              }).catch(() => console.log("Oops errors!"))
            } else {
              that.$message.error(res.msg)
            }
          })
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          })
        },
      })
    } else {
      this.$message.error("请先选择删除的对象")
    }
  }

  // private async getftptable(obj) {
  //   await this.DeviceM.ftptable(obj).then((res) => {
  //     console.log(res)
  //   })
  // }
  private async FTPconfig(row) {
    this.IP = row.ip
    this.FTPvisible = true
    let obj = { storageIp_equal: row.ip, 
    page: this.page.currentPage,
    limit: this.page.pageSize, }
    axios
      .get(
        `${window.gurl.SERVICE_CONTEXT_PATH}api/mdm/device/storage-ftp/list`,
        {
          params: obj,
          headers: { Token: localStorage.getItem("token") },
        }
      )
      .then((res: any) => {
        this.ftptable = res.data.data
      })
  }
  private edit(row) {
    this.visible = true
    this.isDisable = true
    this.text = '编辑'
    this.id = row.id
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        name: row.name,
        ip: row.ip,
        port: row.port,
      })
    })
  }
  private ftpbtn() {
    this.form3.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        this.DeviceM.ftpconfigadd({
          id: this.ftpid,
          passwd: val.passwd,
          path: val.path,
          storageIp: this.IP,
          userName: val.name,
        }).then((res) => {
          console.log(res)
          if (res.code == 0) {
            this.addshow = false
            this.$message.success(res.msg)
            this.form3.resetFields()
            let obj = { 
              storageIp_equal: this.IP, 
              page: this.page.currentPage,
              limit: this.page.pageSize, 
            }
            axios
              .get(
                `${window.gurl.SERVICE_CONTEXT_PATH}api/mdm/device/storage-ftp/list`,
                {
                  params: obj,
                  headers: { Token: localStorage.getItem("token") },
                }
              )
              .then((res: any) => {
                this.ftptable = res.data.data
              })
          } else {
            this.$message.error(res.msg)
          }
          this.ftpid = ""
        })
      }
    })
  }
  private ftpedit(row) {
    console.log(row.id)
    this.ftpid = row.id
    this.ftpdisabled = true
    this.addshow = true
    this.$nextTick(() => {
      this.form3.setFieldsValue({
        name: row.userName,
        passwd: row.passwd,
        path: row.path,
      })
    })
  }
  private getSelectEvent1() {
    let selectRecords = (this.$refs.Acquisition as any).getCheckboxRecords()
    return selectRecords
  }
  private ftpdlt(row) {
    console.log(row)
    console.log()
    this.DeviceM.ftpconfigdlt({
      ip: this.IP,
      userName: row.userName,
    }).then((res) => {
      console.log(res)
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.DeviceM.ftptable({
          storageIp_equal: row.ip,
          page: this.page.currentPage,
          limit: this.page.pageSize,
        }).then((res) => {
          this.ftptable = res.data
        })
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  private ftpaddconfig() {
    this.addshow = true
    this.ftpdisabled = false
    this.ftpid = ""
    this.form3.resetFields()
  }
  private ftpquxiao() {
    this.addshow = false
    this.form3.resetFields()
  }
}
</script>

<style lang="less" scope>
.btns {
  line-height: 1;
  button {
    margin-right: 8px;
  }
}
.screen {
  width: 347px;
  height: 260px;
}
.ant-calendar-picker {
  width: 100% !important;
}
.ftpadd {
  float: right;
}
.ftptc {
  .ant-modal-body {
    height: 430px;
  }
}
.ftpinput {
  .ant-form-item-label {
    width: 90px;
  }
}
.ftpinput {
  .ant-form-item-control {
    width: 630px;
  }
}
.ftptc .ant-modal-footer {
  display: none;
}
</style>
