<template>
  <div id="HighConfig">
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">岗位字典项</div>
        <div class="btnList"></div>
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
              <a-button type="link" block @click="edit(record)" v-isshow="'system:highConfig:update'">编辑</a-button>
            </div>
          </template>
        </a-table>
      </div>
      <!-- 弹窗 -->
      <a-modal
        v-model="visible"
        title="编辑"
        @ok="handleOk"
        width="635px"
        wrapClassName="myAM"
        cancelText="取消"
        okText="提交"
        @cancel="back"
      >
        <a-form
          :form="form"
          layout="inline"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 20 }"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="配置值" style="width: 100%">
                <a-input
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
                      rules: [{ required: true, message: '请输入配置内容' }],
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
                      rules: [{ required: true, message: '请输入配置说明' }],
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
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {},
})
export default class RightContent extends Vue {
  [x: string]: any;
  public getData = new this.$api.configInterface.HighConfig();
  private form: any;
  public tabData = [];
  public visible = false;
  public saveData = {};
  public savaID: string;
  public pagination = {
    pageSize: 1000, // 默认每页显示数量
    current: 1, //显示当前页数
    total: 0,
    showSizeChanger: false, // 显示可改变每页数量
    showQuickJumper: false, //显示跳转到输入的那一页
    showTotal: (total: number) =>
      `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
        total / this.pagination.pageSize
      )} 页`, // 显示总数
  };
  public columns = [
    {
      title: "序号",
      className: "pd10",
      width: 65,
      dataIndex: "index",
      fixed: "left",
      scopedSlots: { customRender: "index" },
    },
    {
      title: "配置值",
      dataIndex: "code",
      className: "pd10",
      width: 350,
    },
    {
      title: "配置内容",
      dataIndex: "value",
      className: "pd10",
      width: 350,
    },
    {
      title: "配置说明",
      dataIndex: "remark",
      className: "pd10",
      width: 820,
    },
    {
      title: "操作",
      key: "operation",
      scopedSlots: { customRender: "operation" },
      className: "pd10",
      width: 200,
      fixed: "right",
    },
  ];
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
  created() {
    const val = {
      page: this.pagination.current,
      limit: this.pagination.pageSize,
    };
    this.getList(val);
  }
  private getList(val: any): void {
    this.getData.getList(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.tabData = res.data;
      this.pagination.total = res.pages * 1;
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
    };
    this.getList(obj);
  }
  private edit(val: any): void {
    this.visible = true;
    this.savaID = val.id;
    // const that = this;
    this.$nextTick(() => {
      this.form.setFieldsValue({
        code: val.code,
        value: val.value,
        remark: val.remark,
      });
    });
  }
  private rowClassName(record: any, index: number): string {
    return index % 2 === 0 ? "bgF5" : "";
  }
  private back(): void {
    this.form.resetFields();
  }
  private handleOk(e: any): void {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        const val = {
          code: values.code,
          value: values.value,
          remark: values.remark,
          id: this.savaID,
        };
        this.getData.upData(val, true).then((res: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          if (res.code == 0) {
            this.visible = !this.visible;
            this.form.resetFields();
            const val = {
              page: this.pagination.current,
              limit: this.pagination.pageSize,
            };
            this.getList(val);
          }
        });
      }
    });
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
