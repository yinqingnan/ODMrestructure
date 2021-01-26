<template>
  <div id="Dictionary">
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">岗位字典项</div>
        <div class="btnList">
          <a-button type="primary" class="upData" @click="add" v-isshow="'base:dict:save'">添加字典项</a-button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content" :style="{height:Height}">
        <vxe-table
          stripe
          border
          resizable
          height="auto"
          ref="logAdministration"
          highlight-hover-row
          show-header-overflow
          class="mytable-scrollbar"
          :row-class-name="tableRowClassName"
          :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
          :data="tabData"
        >
          <vxe-table-column type="seq" width="60" align="center" title="序号" />
          <vxe-table-column field="value" title="字典名" show-overflow align="center" minWidth="150" />
          <vxe-table-column
            field="dictKey"
            title="字典值"
            show-overflow
            align="center"
            minWidth="110"
          />
          <vxe-table-column
            field="remark"
            title="字典描述"
            show-overflow
            align="center"
            minWidth="150"
          />
          <vxe-table-column
            field="createTime"
            title="创建时间"
            show-overflow
            align="center"
            minWidth="150"
          />
          <vxe-table-column
            field="createUserName"
            title="创建人"
            show-overflow
            align="center"
            minWidth="110"
          />
          <vxe-table-column title="操作" show-overflow align="center" minWidth="130">
            <template v-slot="{ row }">
              <span @click="edit(row)" v-isshow="'base:dict:update'" style="color:#4d96ca;cursor:pointer;margin-right:10px">编辑</span>
               <span @click="remove(row)" style="color:#4d96ca;cursor:pointer;" v-isshow="'base:dict:delete'" >删除</span>
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
      <!-- 弹窗 -->
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
        <a-form :form="form2" layout="inline" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }" autocomplete="off">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="字典类型" style="width: 100%">
                <a-input
                  v-decorator="[
                    'parentKey',
                    {
                      rules: [{ required: true, message: '请输入字典类型' }],
                      initialValue: 'position',
                    },
                  ]"
                  disabled
                  placeholder="请输入公告标题"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="字典值" style="width: 100%">
                <a-input
                  disabled
                  style="width: 288px"
                  v-decorator="[
                    'dictKey',
                    {
                      rules: [{ required: true, message: '请输入字典值' }],
                    },
                  ]"
                  placeholder="点击右侧按钮生成"
                />
                <a-button type="primary" style="margin-left: 10px" :disabled="btnDisable" @click="getK">自动生成</a-button>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="字典名称" style="width: 100%">
                <a-input
                  :maxLength="LimitInputlength"
                  v-decorator="[
                    'name',
                    {
                      rules: [{ required: true, message: '请输入字典值' }],
                    },
                  ]"
                  placeholder="请输入字典名称，用于实际显示"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="备注" style="width: 100%">
                <a-textarea
                  :maxLength="textarealength"
                  v-decorator="[
                    'remark',
                    {
                      rules: [],
                    },
                  ]"
                  placeholder="请输入备注（200字符以内）"
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
  public getData = new this.$api.configInterface.Dictionary()
  private page= {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private layouts = layouts
  private form: any
  private Height = ""
  public tabData = []
  public isShow = true
  public seachKey = "all"
  private form2: any
  public visible = false
  public myTitle = "添加字典项"
  public saveData = {}
  public pagination = {
    pageSize: 10, // 默认每页显示数量
    current: 1, //显示当前页数
    total: 0,
    showSizeChanger: false, // 显示可改变每页数量
    showQuickJumper: false, //显示跳转到输入的那一页
    showTotal: (total: number) =>
      `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
        total / this.pagination.pageSize
      )} 页`, // 显示总数
  }
  
  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
  }
  created() {
    const val = {
      page: this.page.currentPage,
      limit: this.page.pageSize,
      parentKey_equal: "position",
    }
    this.getList(val)
  }
  mounted() {
    this.Height = `${document.documentElement.clientHeight - 240}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 240}px`
    })
  }
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    const val = {
      page: currentPage,
      limit: pageSize,
      parentKey_equal: "position",
    }
    this.getList(val)
  }
  private getList(val: any): void {
    this.getData.getList(val, true).then((res: any) => {
      this.tabData = res.data
      this.page.totalResult =parseInt(res.count)
    })
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private getK() {
    const val = {
      parentKey: "position",
    }
    this.getData.getKey(val, true).then((res: any) => {
      this.form2.setFieldsValue({
        dictKey: res.data,
      })
    })
  }
  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
    this.pagination.pageSize = pagination.pageSize
    this.pagination.current = pagination.current
    const obj = {
      page: this.pagination.current,
      limit: this.pagination.pageSize,
      status: this.seachKey,
    }
    this.getList(obj)
  }
  private add(): void {
    this.visible = true
    this.btnDisable = false
    this.myTitle = "添加字典项"
  }
  private remove(val): void {
    //eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    this.$confirm({
      title: '提示',
      content: `字典项删除后无法恢复，确认要删除字典项${val.value}吗？`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          const DT = [val.id]
          _that.getData.removeItem(DT, true).then((res: any) => {
            if (res.code == 0) {
              let val = {
                page: this.page.currentPage,
                limit: this.page.pageSize,
                parentKey_equal: "position",
              }
              _that.getList(val)
            }
          })
        }).catch(() => console.log('Oops errors!'));
      },
    });
  }
  private btnDisable = false
  private edit(val: any): void {
    console.log(val)
    this.visible = true
    this.btnDisable = true
    this.myTitle = "编辑"
    this.id = val.id
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        dictKey: val.dictKey,
        parentKey: val.parentKey,
        remark: val.remark,
        name: val.value,
      })
    })
  }
  private rowClassName(record: any, index: number): string {
    return index % 2 === 0 ? "bgF5" : ""
  }
  private back(): void {
    this.form2.resetFields()
  }
  private id = ''
  private handleOk(e: any): void {
    e.preventDefault()
    this.form2.validateFields((err: any, values: any) => {
      if (!err) {
        const val = {
          dictKey: values.dictKey,
          id: this.id,
          parentKey: values.parentKey,
          remark: values.remark,
          value: values.name,
        }
        console.log(this.myTitle)
        if(this.myTitle == '编辑'){
          this.getData.EditVal(val, true).then((res: any) => {
            if (res.code == 0) {
              this.visible = !this.visible
              this.form2.resetFields()
              const val = {
                page: this.pagination.current,
                limit: this.pagination.pageSize,
                parentKey_equal: "position",
              }
              this.getList(val)
              this.id = ''
            }
          })
        }else{
          this.getData.saveVal(val, true).then((res: any) => {
            if (res.code == 0) {
              this.visible = !this.visible
              this.form2.resetFields()
              const val = {
                page: this.pagination.current,
                limit: this.pagination.pageSize,
                parentKey_equal: "position",
              }
              this.getList(val)
              this.id = ''
            }
          })
        }
      }
    })
  }
}
</script>

<style lang="less" scope>
#Dictionary {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
#Dictionary .ant-table-tbody > tr > td {
  padding: 8px 16px;
}
#Dictionary .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
#Dictionary .ant-dropdown-link {
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
#Dictionary .ant-table-thead .pd10 {
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
</style>
