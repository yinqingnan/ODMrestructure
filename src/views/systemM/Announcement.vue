<template>
  <div id="Announcement">
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              筛选<a-icon type="down" />
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
                        rules: []
                      }
                    ]"
                    placeholder="请选择"
                  >
                    <a-select-option value="all">
                      全部
                    </a-select-option>
                    <a-select-option value="0">
                      未截止
                    </a-select-option>
                    <a-select-option value="1">
                      已截止
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item class="btnBox">
                  <a-button class="reset">
                    重置
                  </a-button>
                  <a-button html-type="submit" class="upData">
                    查询
                  </a-button>
                </a-form-item>
              </a-form>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="btnList">
          <a-button class="upData mr10" @click="Export">导出</a-button>
          <a-button class="upData" @click="add">添加</a-button>
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
      >
        <a-form :form="form2" @submit="handleSubmit" layout="inline">
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="公告标题">
                <a-input
                  v-decorator="[
                    'title',
                    {
                      rules: [{ required: true, message: '请输入公告标题' }]
                    }
                  ]"
                  placeholder="请输入公告标题"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                style="width:99%"
                label="公告类型"
                :label-col="myTab.labelCol"
                :wrapper-col="myTab.wrapperCol"
              >
                <a-select
                  v-decorator="[
                    'type',
                    {
                      rules: [{ required: true, message: '公告类型不能为空' }],
                      initialValue: '1'
                    }
                  ]"
                  placeholder="请选择"
                >
                  <a-select-option value="1">
                    通知
                  </a-select-option>
                  <a-select-option value="2">
                    系统升级
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="发送时间" layout="inline">
                <a-date-picker
                  style="min-width:175px"
                  v-decorator="[
                    'sendTime',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择发送时间！'
                        }
                      ]
                    }
                  ]"
                  placeholder="请选择"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="截止时间" layout="inline">
                <a-date-picker
                  style="min-width:175px"
                  v-decorator="[
                    'endTime',
                    {
                      rules: [
                        {
                          required: true,
                          message: '请选择截止时间！'
                        }
                      ]
                    }
                  ]"
                  placeholder="请选择"
                  show-time
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12" v-show="isShow">
              <a-form-item label="接收部门">
                <a-tree-select
                  v-show="isShow"
                  style="min-width:175px"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="treeData"
                  placeholder="请选择"
                  tree-default-expand-all
                  :replaceFields="{
                    children: 'children',
                    title: 'name',
                    key: 'code',
                    value: 'value'
                  }"
                  v-decorator="[
                    'acceptDeptCode',
                    {
                      rules: [{ required: isShow, message: '接收部门不能为空' }]
                    }
                  ]"
                >
                </a-tree-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="">
                <a-checkbox-group
                  v-decorator="['organization']"
                  @change="ckChange"
                >
                  <a-checkbox value="isALL">
                    全部部门
                  </a-checkbox>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="公告内容" style="width:100%">
                <a-textarea
                  style="width:482px"
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
import moment from "moment";
import { http } from "../../api/interceptors";
@Component({
  components: {}
})
export default class RightContent extends Vue {
  [x: string]: any;
  public getData = new this.$api.configInterface.Announcement();
  public visible = false;
  public myTab = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 }
  };
  public myTitle = "添加公告";
  private form: any;
  public treeData = [];
  private form2: any;
  public tabData = [];
  public isShow = true;
  public seachKey = "all";
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
  private columns = [
    {
      title: "序号",
      className: "pd10",
      width: 70,
      dataIndex: "index",
      fixed: "left",
      scopedSlots: { customRender: "index" }
    },
    {
      title: "公告标题",
      dataIndex: "title",
      className: "pd10",
      width: 170
    },
    {
      title: "公告类型",
      dataIndex: "type",
      className: "pd10",
      width: 95
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      className: "pd10",
      width: 175
    },
    {
      title: "发送时间",
      dataIndex: "sendTime",
      className: "pd10",
      width: 175
    },
    {
      title: "截止时间",
      dataIndex: "endTime",
      className: "pd10",
      width: 175
    },
    {
      title: "发布民警姓名",
      dataIndex: "sendUserName",
      className: "pd10",
      width: 140
    },
    {
      title: "发布民警警号",
      dataIndex: "sendUserCode",
      className: "pd10",
      width: 140
    },
    {
      title: "接收部门",
      dataIndex: "acceptDeptNames",
      className: "pd10",
      width: 140
    },
    {
      title: "公告内容",
      dataIndex: "content",
      className: "pd10",
      width: 360
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
      status: this.seachKey
    };
    this.getList(val);
    this.getSL();
  }
  private getList(val: any) {
    this.getData.getNotices(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.tabData = res.data;
      this.pagination.total = res.pages * 1;
    });
  }

  private getSL(): void {
    const val = {
      notPlatform: true
    };
    this.getData.getSelect(val, true).then((res: any) => {
      this.treeData = res.data;
    });
  }

  private handleSubmit(e: any): void {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.seachKey = values.select;
        const val = {
          page: this.pagination.current,
          limit: this.pagination.pageSize,
          status: this.seachKey
        };
        this.getList(val);
      }
    });
  }
  private healthyTableChange(pagination: {
    pageSize: number;
    current: number;
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
          status: this.seachKey
        };
        this.getList(val);
      }
    });
    console.log(val);
  }
  private edit(val: any): void {
    console.log(val);
    this.visible = true;
    this.myTitle = "编辑";
    if (val.acceptDeptCode == "ALL") {
      val.acceptDeptCode = undefined;
      val.isALL = ["isALL"];
      this.isShow = false;
    } else {
      val.isALL = undefined;
      this.isShow = true;
    }
    // const that = this;
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        title: val.title,
        type: val.type,
        sendTime: val.sendTime,
        endTime: val.endTime,
        acceptDeptCode: val.acceptDeptCode,
        organization: val.isALL,
        remark: val.content
      });
    });
  }
  private handleOk(e: any): void {
    e.preventDefault();
    this.form2.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.isShow == false) {
          this.saveData = {
            acceptDeptCode: "ALL",
            content: values.remark,
            endTime: moment(values.endTime).format("YYYY-MM-DD HH:mm:ss"),
            sendTime: moment(values.sendTime).format("YYYY-MM-DD HH:mm:ss"),
            title: values.title,
            type: values.type,
            id: "",
            isALL: "on"
          };
        } else {
          this.saveData = {
            acceptDeptCode: values.acceptDeptCode,
            content: values.remark,
            endTime: moment(values.endTime).format("YYYY-MM-DD HH:mm:ss"),
            sendTime: moment(values.sendTime).format("YYYY-MM-DD HH:mm:ss"),
            title: values.title,
            type: values.type,
            id: ""
          };
        }
        this.saveVal(this.saveData);
      }
    });
  }
  private back(): void {
    this.form2.resetFields();
  }
  private ckChange(e: any): void {
    if (e.length > 0) {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
  }
  private saveVal(val: any) {
    this.getData.saveVal(val, true).then((res: any) => {
      if (res.code == 0) {
        this.visible = !this.visible;
        this.form2.resetFields();
        const val = {
          page: this.pagination.current,
          limit: this.pagination.pageSize,
          status: this.seachKey
        };
        this.getList(val);
      }
    });
  }
  private Export(): void {
    const data = `status=${this.seachKey}`;
    window.open(http + "api/pconfig/system/notice/export?" + data);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private rowClassName(record: any, index: number): string {
    return index % 2 === 0 ? "bgF5" : "";
  }
}
</script>

<style lang="less" scope>
#Announcement {
  width: calc(100% - 250px);
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
</style>
