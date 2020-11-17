/* eslint-disable @typescript-eslint/no-unused-vars */
<template>
  <div>
    <!-- 接入管理 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div
          class="contaninerheader"
          style="padding:12px 25px 0 25px;display:flex;justify-content: flex-end;"
        >
          <div class="accessbtn">
            <a-button type="primary" @click="Childrenbtn">子平台接入</a-button>
            <a-button type="primary" @click="Parentbtn">采集站接入</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            border
            height="auto"
            ref="Acquisitionstation"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column field="secretKey" title="接入秘钥" show-overflow align="center" />
            <vxe-table-column field="isEnabled" title="状态" show-overflow align="center" >
              <template  v-slot="{ row }">
                {{isEnabled(row.isEnabled)}}
              </template>
            </vxe-table-column>
            <vxe-table-column field="isUse" title="使用状态" show-overflow align="center">
                <template  v-slot="{ row }">
                {{isEnabled(isuse(row.isUse))}}
              </template>
            </vxe-table-column>
            <vxe-table-column field="deptName" title="所属部门" show-overflow align="center" />
            <vxe-table-column field="type" title="接入类型" show-overflow align="center" >
               <template  v-slot="{ row }">
                {{istype(row.type)}}
              </template>
            </vxe-table-column>
            <vxe-table-column field="merchant" title="厂商" align="center" />
            <vxe-table-column field="phone" title="联系方式" show-overflow align="center" />
            <vxe-table-column field="createTime" title="创建时间" show-overflow align="center" />
            <vxe-table-column title="操作" align="center">
              <template v-slot="{ row }">
                <span @click="edit(row)" style="color:#4d96ca;cursor:pointer;margin-right:8px">编辑</span>
                <span @click="dlt(row.id)" style="color:#4d96ca;cursor:pointer;">删除</span>
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
      <a-modal v-model="visible" :title="str" @ok="zipingtai" class="quxiao" okText="提交">
        <a-form
          autocomplete="off"
          :form="form"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          @submit="zipingtai"
        >
          <a-row :gutter="24" class="Access">
            <a-col :span="24">
              <a-form-item label="接入秘钥">
                <a-button class="createKey" @click="createKey">自动生成</a-button>
                <a-input
                  :disabled="true"
                  v-decorator="['Sendrepair', { initialValue: '',  rules:  [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="点击生成秘钥"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="秘钥状态">
                <a-select
                  v-decorator="[
                        'deviceStatus',
                        {
                          initialValue: '1',
                          rules: []
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in statuslist" :key="d.value">{{ d.title }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="所属部门">
                <a-tree-select
                  show-search
                  treeNodeFilterProp="title"
                  v-decorator="[
                        'department',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
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
                  placeholder="请选择所属部门..."
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
      <a-modal v-model="collection" :title="str2" @ok="caijizhan" class="quxiao" okText="提交">
        <a-form
          autocomplete="off"
          :form="form2"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          @submit="caijizhan"
        >
          <a-row :gutter="24" class="Access">
            <a-col :span="24">
              <a-form-item label="接入秘钥">
                <a-button class="createKey" @click="createKey">自动生成</a-button>
                <a-input
                  :disabled="true"
                  v-decorator="['Sendrepair', { initialValue: '',  rules:  [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="点击生成秘钥"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="秘钥状态">
                <a-select
                  v-decorator="[
                        'deviceStatus',
                        {
                          initialValue: '1',
                          rules: []
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in statuslist" :key="d.value">{{ d.title }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="所属部门">
                <a-tree-select
                  show-search
                  treeNodeFilterProp="title"
                  v-decorator="[
                        'department',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
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
                  placeholder="请选择所属部门..."
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="采集站类型">
                <a-select
                  v-decorator="[
                        'Acquisition',
                        {
                          initialValue: '1',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in Acquisitionlist" :key="d.value">{{ d.title }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
                   <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="厂商">
                <a-input
                  v-decorator="[
                        'manufacturer',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请输入厂商"
                />
              </a-form-item>
            </a-col>
          </a-row>
                         <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="联系方式">
                <a-input
                  v-decorator="[
                        'iphone',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请输入管理员联系方式"
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
import { Component, Prop, Vue } from "vue-property-decorator"
import { LimitInputlength } from "../../InterfaceVariable/variable"
@Component({
  components: {},
})
export default class AccessAuth extends Vue {
  // todo 变量
  [x: string]: any
  public form!: any
  public form2!: any
  public DataM = new this.$api.configInterface.DataM()
  public Luckmanagement = new this.$api.configInterface.Luckmanagement()
  private LimitInputlength = LimitInputlength
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
  private statuslist = [
    { id: "0", value: "1", title: "启用" },
    { id: "1", value: "0", title: "禁用" },
  ]
  private Acquisitionlist= [
    { id: "0", value: "1", title: "柜式采集站" },
    { id: "0", value: "2", title: "便携式采集站" },
  ]
  private departmentData = []
  private Height = ""
  private str = "子平台接入"
  private str2 = "采集站接入"
  private tableData = []
  private visible = false //子平台接入框
  private collection = false //采集站接入框
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private caijizhanid = ""
  private zipingtaiid = ""
  // todo 生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
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
    }
    this.gettabledata(obj)
    this.getdata()
  }
 
  // todo事件
  private pagerchange({ currentPage, pageSize }) {
    let obj = {
      page: currentPage,
      limit: pageSize,
    }
    this.gettabledata(obj)
  }
  private reset() {
    this.form.resetFields()
  }
  private Childrenbtn() {
    this.visible = true
  }
  private Parentbtn() {
    this.collection = true
  }
  private zipingtai(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let obj = {
          deptCode: val.department,
          id: this.zipingtaiid,
          isEnabled: val.deviceStatus,
          secretKey: val.Sendrepair,
          type: "3", //固定为子平台3    采集站2
        }
        this.Luckmanagement.accessauthsave(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.visible = false
            this.form.resetFields()
            this.gettabledata({
              page: 1,
              limit: 15,
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  private caijizhan(e) {
    e.preventDefault()
    this.form2.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        let obj = {
          deptCode: val.department,
          id: this.caijizhanid,
          merchant:val.manufacturer,
          phone:val.iphone,
          isEnabled: val.deviceStatus,
          secretKey: val.Sendrepair,
          type: "1", //固定为子平台3    采集站1
        }
        this.Luckmanagement.accessauthsave(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.collection = false
            this.form2.resetFields()
            this.gettabledata({
              page: 1,
              limit: 15,
            })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  private createKey() {
    if(this.collection){
      this.$nextTick(() => {
        this.form2.setFieldsValue({
          Sendrepair: this.guid(),
        })
      })
    }
    if(this.visible){
      this.$nextTick(() => {
        this.form.setFieldsValue({
          Sendrepair: this.guid(),
        })
      })
    }
  }

  private guid() {
    return "xxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  }
  private isEnabled(status){
    if(status==1){
      return "启用"
    }else{
      return "未启用"
    }
  }
  private isuse(status){
    if(status==1){
      return "已使用"
    }else{
      return "未使用"
    }
  }
  private istype(status){
    if(status==3){
      return "子平台"
    }else if(status == 1){
      return "柜式采集站"
    }else if(status == 2){
      return "便携式采集站"

    }
  }
  private edit(row) {
    console.log(row)
    if(row.type == 1 || row.type == 2){
      this.caijizhanid = row.id
      this.collection = true
      this.$nextTick(() => {
        this.form2.setFieldsValue({
          Sendrepair:row.secretKey,
          department:row.deptCode,
          deviceStatus:row.isEnabled+"",
          Acquisition:row.type+"",
          manufacturer: row.merchant,
          iphone:row.phone
        })
      })
      
    }else if(row.type == 3){
      this.zipingtaiid = row.id
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue({
          Sendrepair:row.secretKey,
          department:row.deptCode,
          deviceStatus:row.isEnabled+"",
        })
      })
    }
  }
  private dlt(row) {
    console.log(row)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: '提示',
      content: '确定要删除该秘钥吗？',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          _that.Luckmanagement.accessauthdlt([row]).then(res=>{
            if(res.code == 0){
              _that.gettabledata({
                page: 1,
                limit: 15,
              })
              _that.$message.success(res.msg)
            }else{
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log('Oops errors!'));
      },
    });
  }
  // todo 数据请求
  private gettabledata(obj) {
    this.Luckmanagement.getIncomingtabledata(obj).then((res) => {
      this.tableData = res
      this.page.totalResult = res.length
    })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
  }
  private tableRowClassName(record: any, index: number) {
     
    return record.rowIndex % 2 === 0 ? "bgF5" : "";
  }
}
</script>

<style lang="less" scope>
.accessbtn {
  float: right;
  line-height: 1;
  button:nth-of-type(1) {
    margin-right: 8px;
  }
}
.quxiao .ant-modal-footer {
  button:nth-of-type(1) {
    display: none;
  }
}
.Access .ant-form-item-control {
  width: 250px;
}
.Access {
  position: relative;
}
.createKey {
  position: absolute;
  top: -6px;
  right: -104px;
}
</style>
