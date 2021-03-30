<template>
  <div id="HighConfig">
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">高级配置</div>
        <div class="btnList"></div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <div class :style="{height:Height}">
          <vxe-table
            stripe
            border
            resizable
            height="auto"
            ref="logAdministration"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tabData"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column field="code" title="配置值" show-overflow align="center" minWidth="150" />
            <vxe-table-column
              field="value"
              title="配置内容"
              show-overflow
              align="center"
              minWidth="150"
            />
            <vxe-table-column
              field="remark"
              title="配置说明"
              show-overflow
              align="center"
              minWidth="240"
            />
            <vxe-table-column
              field="createTime"
              title="操作"
              show-overflow
              align="center"
              minWidth="130"
            >
              <template v-slot="{ row }">
              <span @click="edit(row)" style="color:#4d96ca;cursor:pointer;"  v-isshow = "'base:config:save'">编辑</span>
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
      <!-- 弹窗 -->
      <a-modal
        v-model="visible"
        title="编辑"
        @ok="handleOk"
        width="635px"
        wrapClassName="myAMxxxx"
        cancelText="取消"
        okText="提交"
        :keyboard='false'
        @cancel="back"
      >
        <a-form :form="form" layout="inline" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="配置值" style="width: 100%">
                <a-input
                  :disabled='isdisblede'
                  v-decorator="[
                    'code',
                    {
                      rules: [{ required: true, message: '请输入配置值' }],
                    },
                  ]"
                  placeholder="请输入配置值"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="配置内容" style="width: 100%">
                <a-input
                  v-decorator="[
                    'value',
                    {
                      rules: [{ required: true, message: '请输入配置内容' },{validator:contnentvalidator}],
                    },
                  ]"
                  placeholder="请输入配置内容"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="配置说明" style="width: 100%">
                <a-textarea
                  v-decorator="[
                    'remark',
                    {
                      rules: [{ required: true, message: '请输入配置说明' },],
                    },
                  ]"
                  placeholder="请输入配置说明"
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
import {
  layouts,
  LimitInputlength,
  page,
  textarealength,
} from "@/InterfaceVariable/variable"
@Component({
  components: {},
})
export default class RightContent extends Vue {
  [x: string]: any
  public getData = new this.$api.configInterface.HighConfig()
    private page= {
      currentPage: 1, //当前页数
      pageSize: 15, //每页多少条
      totalResult: 200, //总数
    }
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private layouts = layouts
  public Height = ""
  private form: any
  public tabData = []
  public visible = false
  public saveData = {}
  public savaID: string
  beforeCreate() {
    this.form = this.$form.createForm(this)
  }
  mounted() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  created() {
    const val = {
      page: 1,
      size: 10,
    }
    this.getList(val)
    this.Height = `${document.documentElement.clientHeight - 230}`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}`
    })
  }
  private getList(val: any): void {
    this.getData.getList(val, true).then((res) => {
      this.tabData = res.data
      this.page.totalResult = res.data.length
    })
  }
  private pagerchange({ currentPage, pageSize }) {
    let val = {
      page: currentPage,
      size: pageSize,
    }
    this.getList(val)
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
    this.page.pageSize = pagination.pageSize
    this.page.currentPage = pagination.current
    const obj = {
      page: this.page.currentPage,
      size: this.page.pageSize,
    }
    this.getList(obj)
  }
  private isdisblede = false
  private contentcode = ''
  private edit(val: any): void {
    this.contentcode = val.code
    this.isdisblede = true
    this.visible = true
    this.savaID = val.id
    this.$nextTick(() => {
      this.form.setFieldsValue({
        code: val.code,
        value: val.value,
        remark: val.remark,
      })
    })
  }
  private rowClassName(record: any, index: number): string {
    return index % 2 === 0 ? "bgF5" : ""
  }
  private back(): void {
    this.form.resetFields()
  }
  private handleOk(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        const val = {
          code: values.code,
          value: values.value,
          remark: values.remark,
          id: this.savaID,
        }
        this.getData.upData(val, true).then((res: any) => {
          if (res.code == 0) {
            this.visible = !this.visible
            this.isdisblede = false
            this.form.resetFields()
            const val = {
              page: this.page.currentPage,
              size: this.page.pageSize,
            }
            this.getList(val)
          }
        })
      }
    })
  }
  private contnentvalidator(rule , value, callback){
    console.log(this.contentcode);
    if(this.contentcode === 'station_online_time' || this.contentcode === 'station_Port'|| this.contentcode === 'file_upload_level'){
      let pattern = new RegExp( /^\d+$|^\d+[.]?\d+$/)
      if (!pattern.test(value)){
        callback('只能输入数字');
      }else {
        callback();
      }
      callback();
    }else{
      callback();
    }
    
  }
}
</script>

<style lang="less" scope>
#HighConfig {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
#HighConfig .ant-table-tbody > tr > td {
  padding: 8px 16px;
}
#HighConfig .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
#HighConfig .ant-dropdown-link {
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
#HighConfig .ant-table-thead .pd10 {
  padding: 8px 16px;
}

.linkBox {
  display: flex;
}
.myAMxxxx .ant-form-inline.ant-form-item {
  display: flex;
}
.myAMxxxx .ant-form-inline .ant-form-item {
  margin-bottom: 0;
  height: 60px;
}
.myAMxxxx .ant-modal-body {
  margin-bottom: 24px;
}
.mr10 {
  margin-right: 10px;
}
</style>
