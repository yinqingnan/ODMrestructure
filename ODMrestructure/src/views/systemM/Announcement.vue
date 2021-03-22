<template>
  <div id="Announcement">
    <!-- 公告管理 -->
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              筛选
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay" class="myW">
              <a-form
                :form="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                @submit="handleSubmit"
                class="myP"
              >
                <a-form-item label="公告状态">
                  <a-select
                    v-decorator="[
                      'select',
                      {
                        initialValue: 'all',
                        rules: [],
                      },
                    ]"
                    placeholder="请选择"
                  >
                    <a-select-option value="all">全部</a-select-option>
                    <a-select-option value="0">未截止</a-select-option>
                    <a-select-option value="1">已截止</a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item class="btnBox">
                  <a-button class="reset" @click="reset">重置</a-button>
                  <a-button html-type="submit" class="upData">查询</a-button>
                </a-form-item>
              </a-form>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="btnList">
          <a-button class="upData mr10" @click="Export"  type="primary" v-isshow="'system:notice:export'">导出</a-button>
            <a-button  type="primary" class="upData" @click="add" v-isshow="'system:notice:save'">添加</a-button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <div class :style="{height:Height}">
          <vxe-table
            stripe
            border
            height="auto"
            ref="logAdministration"
            highlight-hover-row
            class="mytable-scrollbar"
            show-header-overflow
            :row-class-name="tableRowClassName"
            :data="tabData"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column
              field="title"
              title="公告标题"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column field="type" title="公告类型" show-overflow align="center"  width="10%" />
            <vxe-table-column
              field="createTime"
              title="创建时间"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="sendTime"
              title="发送时间"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="endTime"
              title="截止时间"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              field="sendUserName"
              title="发布民警姓名"
              show-overflow
              align="center"
               width="8%"
            />
            <vxe-table-column
              field="sendUserCode"
              title="发布民警警号"
              show-overflow
              align="center"
              width="6%"
            />
            <vxe-table-column
              field="acceptDeptNames"
              title="接收部门"
              show-overflow
              align="center"
              width="8%"
            />
            <vxe-table-column
              field="content"
              title="公告内容"
              show-overflow
              align="center"
              width="10%"
            />
            <vxe-table-column
              title="操作"
              align="center"
              width="10%"
              fixed="right"
            >
              <template v-slot="{ row }" style="display:flex">
                  <span
                    style="color: rgb(13, 184, 223);cursor: pointer;margin-right: 10px;"
                    @click="edit(row)"
                    v-isshow="'system:notice:update'"
                  >编辑</span>
                  <span  style="color: rgb(13, 184, 223);cursor: pointer;"  v-isshow="'system:notice:delete'" @click="remove(row)">删除</span>
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
              :page-sizes="[15, 50, 100, 200]"
              @page-change="pagerchange"
            />
          </p>
        </div>
      </div>
      <!-- 弹出层 -->
      <a-modal
        v-model="visible"
        :title="myTitle"
        @ok="handleOk"
        width="635px"
        wrapClassName="myAM"
        cancelText="取消"
        okText="提交"
        @cancel="back"
        :keyboard='false'
      >
        <a-form :form="form2" @submit="handleSubmit" layout="inline"  autocomplete="off">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="公告标题" style="display:flex">
                <a-input
                  v-decorator="[
                    'title',
                    {
                      rules: [{ required: true, message: '请输入公告标题' }],
                    },
                  ]"
                  placeholder="请输入公告标题"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                style="width: 99%"
                label="公告类型"
                :label-col="myTab.labelCol"
                :wrapper-col="myTab.wrapperCol"
              >
                <a-select
                  v-decorator="[
                    'type',
                    {
                      rules: [{ required: true, message: '公告类型不能为空' }],
                      initialValue: 1,
                    },
                  ]"
                  placeholder="请选择"
                >
                  <a-select-option :key="1">通知</a-select-option>
                  <a-select-option :key="2">系统升级</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="发送时间" style="display:flex">
                <a-date-picker
                  style="min-width: 175px"
                  v-decorator="[
                    'sendTime',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择发送时间！',
                        },
                      ],
                    },
                  ]"
                  placeholder="请选择"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="截止时间" style="display:flex" class="announcement">
                <a-date-picker
                  v-decorator="[
                    'endTime',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择截止时间！',
                        },
                      ],
                    },
                  ]"
                  placeholder="请选择"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" >
              <a-form-item label="接收部门" class="jsbm">
                <a-tree-select
                  :disabled = '!isShow'
                  style="min-width: 175px"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="treeData"
                  placeholder="请选择"
                  tree-default-expand-all
                  :replaceFields="{
                    children: 'children',
                    title: 'name',
                    key: 'code',
                    value: 'value',
                  }"
                  v-decorator="[
                    'acceptDeptCode',
                    {
                      rules: [
                        { required: isShow, message: '接收部门不能为空' },
                      ],
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label>
                <a-checkbox-group  v-decorator="['organization']" @change="ckChange">
                  <a-checkbox value="isALL">全部部门</a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="公告内容" style="width: 100%">
                <a-textarea
                  style="width: 482px"
                  v-decorator="[
                    'remark',
                    {
                      rules: [{ required: true, message: '公告内容不能为空' }],
                    },
                  ]"
                  placeholder="请输入公告内容"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
// import { PropType } from "vue";
import { Component, Vue } from "vue-property-decorator"
import moment from "moment"
import axios from 'axios'
import {
  layouts,
  LimitInputlength,
  page,
  textarealength,
} from "@/InterfaceVariable/variable"
import { http } from "../../api/interceptors"
@Component({
  components: {},
})
export default class RightContent extends Vue {
  [x: string]: any
  public getData = new this.$api.configInterface.Announcement()
  public visible = false
  public myTab = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
  }
  private page= {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private layouts = layouts
  public Height = ""
  public myTitle = "添加公告"
  private form: any
  public treeData = []
  private form2: any
  public tabData = []
  public isShow = true
  public seachKey = "all"
  public saveData = {}
  public pagination = {
    pageSize: 15, // 默认每页显示数量
    current: 1, //显示当前页数
    total: 0,
    // showSizeChanger: false, // 显示可改变每页数量
    // showQuickJumper: false, //显示跳转到输入的那一页
    // showTotal: (total: number) =>
    //   `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
    //     total / this.pagination.pageSize
    //   )} 页`, // 显示总数
  }
  
  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
  }
  created() {
    const val = {
      page: this.page.currentPage,
      limit: this.page.pageSize,
      status: this.seachKey,
    }
    this.getList(val)
    this.getSL()
  }
  mounted() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    }) 
  }
  private getList(val: any) {
    this.getData.getNotices(val, true).then((res: any) => {
      if(res.data){
        res.data.map(item => {
          if(item.type == "1") item.type= '通知'
          else if(item.type == '2') item.type=  '系统升级'
        })
        this.tabData = res.data
        this.page.totalResult =parseInt(res.count) 
      }
    })
  }

  private getSL(): void {
    const val = {
      notPlatform: true,
    }
    this.getData.getSelect(val, true).then((res: any) => {
      this.treeData = res.data
    })
  }

  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(values)
        this.seachKey = values.select
        const val = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          status: this.seachKey,
        }
        this.getList(val)
      }
    })
  }
  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
    this.pagination.pageSize = pagination.pageSize
    this.pagination.current = pagination.current
    const obj = {
      page: this.page.currentPage,
      limit: this.page.pageSize,
      status: this.seachKey,
    }
    this.getList(obj)
  }
  private add(): void {
    this.isShow = true
    this.visible = true
    this.myTitle = "添加公告"
  }
  private remove(val): void {
    console.log(val)
    const DT = [val.id]
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: `公告删除后无法恢复，确认要删除公告${val.title}吗？`,
      onOk() {
        _that.getData.removeItem(DT, true).then((res: any) => {
          if (res.code == 0) {
            const val = {
              page: _that.page.currentPage,
              limit: _that.page.pageSize,
              status: _that.seachKey,
            }
            _that.getList(val)
          }
        })
      },
    })
    
  }
  private edit(val: any): void {
    this.visible = true
    this.myTitle = "编辑"
    this.id = val.id
    if (val.acceptDeptCode == "ALL") {
      val.acceptDeptCode = undefined
      val.isALL = ["isALL"]
      this.isShow = false
    } else {
      val.isALL = undefined
      this.isShow = true
    }
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        title: val.title,
        type: val.type + '',
        sendTime: val.sendTime,
        endTime: val.endTime,
        acceptDeptCode: val.acceptDeptCode,
        organization: val.isALL,
        remark: val.content,
      })
    })
  }
  private id = ''
  private handleOk(e: any): void {
    e.preventDefault()
    this.form2.validateFields((err: any, values: any) => {
      console.log(values)
      if (!err) {
        let str = ''
        if(values.type == '通知'){
          str = '1' 
        }else if(values.type == '系统升级'){
          str = '2'
        }else{
          str = values.type
        }
        if (this.isShow == false) {
          this.saveData = {
            acceptDeptCode: "ALL",
            content: values.remark,
            endTime: moment(values.endTime).format("YYYY-MM-DD HH:mm:ss"),
            sendTime: moment(values.sendTime).format("YYYY-MM-DD HH:mm:ss"),
            title: values.title,
            type: str,
            id: this.id,
            isALL: "on",
          }
        } else {
          this.saveData = {
            acceptDeptCode: values.acceptDeptCode,
            content: values.remark,
            endTime: moment(values.endTime).format("YYYY-MM-DD HH:mm:ss"),
            sendTime: moment(values.sendTime).format("YYYY-MM-DD HH:mm:ss"),
            title: values.title,
            type: str,
            id: this.id,
          }
        }
        if(this.myTitle == '添加公告'){
          this.saveVal(this.saveData)
        }else{
          this.editVal(this.saveData)
        }
      }
    })
  }
  private back(): void {
    this.form2.resetFields()
  }
  private reset(){
    this.form.resetFields()
  }
  private ckChange(e: any): void {
    if (e.length > 0) {
      this.isShow = false
    } else {
      this.isShow = true
    }
  }
  private editVal(val: any) {
    this.getData.editVal(val, true).then((res: any) => {
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.visible = !this.visible
        this.form2.resetFields()
        const val = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          status: this.seachKey,
        }
        this.getList(val)
      }else{
        this.$message.error(res.msg)
      }
    })
  }
  private saveVal(val: any) {
    this.getData.saveVal(val, true).then((res: any) => {
      if (res.code == 0) {
        this.visible = !this.visible
        this.form2.resetFields()
        const val = {
          page: this.page.currentPage,
          limit: this.page.pageSize,
          status: this.seachKey,
        }
        this.getList(val)
      }else{
        this.$message.error(res.msg)
      }
    })
  }
  private Export(e: any): void {
    let url = window.gurl.SERVICE_CONTEXT_PATH
    let obj = {
      status: this.seachKey, 
    }
    axios.get(`${url}api/pconfig/system/notice/export`,{
      params: obj,
      headers: {
        Token: localStorage.getItem("token"),
      },
      'responseType': 'blob'
    }).then(res => {
      const aLink = document.createElement("a");
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
      if (navigator.msSaveBlob) { // IE10+ 
        window.navigator.msSaveOrOpenBlob(blob,`公告管理.xls`);
      }
      else {
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download', '公告管理' + '.xls')
        aLink.click()
      }
    })
    // (this.$refs.logAdministration as any).exportData({
    //   filename: "公告管理",
    //   sheetName: "Sheet1",
    //   type: "xlsx",
    //   message:false,
    // })
  }
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    let val = {
      page: currentPage,
      limit: pageSize,
    }
    this.getList(val)
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  // private ggtype(val){
  //   if(val == "1") return '通知'
  //   else if(val == '2') return '系统升级'
  // } 
}
</script>

<style lang="less" scope>
#Announcement {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
#Announcement .ant-table-tbody > tr > td {
  padding: 8px 16px;
}
#Announcement .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
#Announcement .ant-dropdown-link {
  display: block;
  text-align: center;
  line-height: 30px;
  width: 58px;
  height: 30px;
  border: 1px solid #ccc;
  color: #9ea7b3;
}
.header {
  width: calc(100% - 50px);
  margin: 13px auto 0;
  display: flex;
  justify-content: space-between;
}
.myW {
  width: 347px;
}
.myP {
  padding: 10px 0;
}
.reset {
  margin-right: 10px;
  margin-left: 65px;
}
.btnBox {
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
}
.myW .ant-row.ant-form-item {
  margin-bottom: 0;
}
.upData,
.upData:hover {
  background: #0db8df;
  color: #ffffff;
}
.content {
  margin: 15px 25px 0;
}
#Announcement .ant-table-thead .pd10 {
  padding: 8px 16px;
}
.bgF5 {
  background: #f5f5f5;
}
.linkBox {
  display: flex;
}
.myAM .ant-form-inline.ant-form-item {
  display: flex;
}
.myAM .ant-form-inline .ant-form-item {
  margin-bottom: 0;
  height: 60px;
}
.myAM .ant-modal-body {
  margin-bottom: 24px;
}
.mr10 {
  margin-right: 10px;
}
.announcement {
  .ant-calendar-picker {
    min-width: 0 !important;
    width: 175px;
  }
}
.jsbm {
  .ant-form-item-label{
    width: 80px;
  }
}
</style>
