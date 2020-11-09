<template>
  <div id="Dictionary">
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">
          岗位字典项
        </div>
        <div class="btnList">
          <a-button class="upData" @click="add">添加字典项</a-button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <a-table
          :columns="columns"
          :data-source="tabData"
          bordered
          :scroll="{ x: 1300 }"
          :rowClassName="rowClassName"
          :pagination="pagination"
          @change="healthyTableChange"
          rowKey="id"
        >
          <template slot="index" slot-scope="text, record, index">
            {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
          </template>
          <template slot="operation" slot-scope="text, record">
            <div class="linkBox">
              <a-button type="link" block @click="edit(record)">编辑</a-button>
              <a-popconfirm
                title="确定删除？"
                ok-text="是"
                cancel-text="否"
                @confirm="remove(record.id)"
              >
                <a-button type="link" block>删除</a-button>
              </a-popconfirm>
            </div>
          </template>
        </a-table>
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
      >
        <a-form
          :form="form2"
          layout="inline"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="字典类型" style="width:100%">
                <a-input
                  v-decorator="[
                    'parentKey',
                    {
                      rules: [{ required: true, message: '请输入字典类型' }],
                      initialValue: 'position'
                    }
                  ]"
                  disabled
                  placeholder="请输入公告标题"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="字典值" style="width:100%">
                <a-input
                  style="width:288px"
                  v-decorator="[
                    'dictKey',
                    {
                      rules: [{ required: true, message: '请输入字典值' }]
                    }
                  ]"
                  placeholder="点击右方按钮生成"
                />
                <a-button type="primary" style="margin-left:10px;" @click="getK">自动生成
                </a-button>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="字典名称" style="width:100%">
                <a-input
                  v-decorator="[
                    'name',
                    {
                      rules: [{ required: true, message: '请输入字典值' }]
                    }
                  ]"
                  placeholder="请输入字典名称，用于实际显示"
                />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="公告内容" style="width:100%">
                <a-textarea
                  v-decorator="[
                    'remark',
                    {
                      rules: [{ required: true, message: '公告内容不能为空' }]
                    }
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
import { Component, Vue } from "vue-property-decorator";
interface MyD {
  page: number
  limit: number
  parentKey_equal: string
}
@Component({
      components: {}
})
export default class RightContent extends Vue {
  [x: string]: any;
  public getData = new this.$api.configInterface.Dictionary();
  private form: any;
  public tabData = [];
  public isShow = true;
  public seachKey = "all";
  private form2: any;
  public visible = false;
  public myTitle = "添加公告";
  public saveData = {};
  public pagination = {
        pageSize: 10, // 默认每页显示数量
        current: 1, //显示当前页数
        total: 0,
        showSizeChanger: false, // 显示可改变每页数量
        showQuickJumper: false, //显示跳转到输入的那一页
        showTotal: (total: number) =>
              `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
                    total / this.pagination.pageSize
              )} 页` // 显示总数
  };
  public columns = [
        {
              title: "序号",
              className: "pd10",
              width: 70,
              dataIndex: "index",
              fixed: "left",
              scopedSlots: { customRender: "index" }
        },
        {
              title: "字典名",
              dataIndex: "value",
              className: "pd10",
              width: 380
        },
        {
              title: "字典值",
              dataIndex: "dictKey",
              className: "pd10",
              width: 380
        },
        {
              title: "字典描述",
              dataIndex: "remark",
              className: "pd10",
              width: 380
        },
        {
              title: "创建时间",
              dataIndex: "createTime",
              className: "pd10",
              width: 210
        },
        {
              title: "创建人",
              dataIndex: "createUserName",
              className: "pd10",
              width: 175
        },
        {
              title: "操作",
              key: "operation",
              scopedSlots: { customRender: "operation" },
              className: "pd10",
              width: 180,
              fixed: "right"
        }
  ];
  beforeCreate() {
        this.form = this.$form.createForm(this);
        this.form2 = this.$form.createForm(this);
  }
  created() {
        const val = {
              page: this.pagination.current,
              limit: this.pagination.pageSize,
              // eslint-disable-next-line @typescript-eslint/camelcase
              parentKey_equal: "position"
        };
        this.getList(val);
  }
  private getList(val: MyD): void {
        this.getData.getList(val, true).then((res: any) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              this.tabData = res.data;
              this.pagination.total = res.pages * 1;
        });
  }
  private getK() {
        const val = {
              parentKey: "position"
        };
        this.getData.getKey(val, true).then((res: any) => {
              this.form2.setFieldsValue({
                    dictKey: res.data
              });
        });
  }
  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
        this.pagination.pageSize = pagination.pageSize;
        this.pagination.current = pagination.current;
        const obj = {
              page: this.pagination.current,
              limit: this.pagination.pageSize,
              status: this.seachKey
        };
        this.getList(obj);
  }
  private add(): void {
        this.visible = true;
        this.myTitle = "添加公告";
  }
  private remove(val: string): void {
        const DT = [val];
        this.getData.removeItem(DT, true).then((res: any) => {
              if (res.code == 0) {
                    const val = {
                          page: this.pagination.current,
                          limit: this.pagination.pageSize,
                          // eslint-disable-next-line @typescript-eslint/camelcase
                          parentKey_equal: "position"
                    };
                    this.getList(val);
              }
        });
        console.log(val);
  }
  private edit(val: any): void {
        this.visible = true;
        this.myTitle = "编辑";
        // const that = this;
        this.$nextTick(() => {
              this.form2.setFieldsValue({
                    dictKey: val.dictKey,
                    parentKey: val.parentKey,
                    remark: val.remark,
                    name: val.value
              });
        });
  }
  private rowClassName(record: any, index: number): string {
        return index % 2 === 0 ? "bgF5" : "";
  }
  private back(): void {
        this.form2.resetFields();
  }
  private handleOk(e: any): void {
        e.preventDefault();
        this.form2.validateFields((err: any, values: any) => {
              if (!err) {
                    const val = {
                          dictKey: values.dictKey,
                          id: "",
                          parentKey: values.parentKey,
                          remark: values.remark,
                          value: values.name
                    };
                    this.getData.saveVal(val, true).then((res: any) => {
                          // eslint-disable-next-line @typescript-eslint/no-unused-vars
                          if (res.code == 0){
                                this.visible = !this.visible;
                                this.form2.resetFields();
                                const val = {
                                      page: this.pagination.current,
                                      limit: this.pagination.pageSize,
                                      // eslint-disable-next-line @typescript-eslint/camelcase
                                      parentKey_equal: "position"
                                };
                                this.getList(val);
                          }
                    });
                    console.log(values);
              }
        });
  }
}
</script>

<style lang="less" scope>
#Dictionary {
  width: calc(100% - 250px);
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
  color: #9EA7B3;
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
  background: #0DB8DF;
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
