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
          <template slot="operation" slot-scope="text">
            <div class="linkBox">
              <a-button type="link" block>编辑</a-button>
              <a-button type="link" block>删除</a-button>
            </div>
          </template>
        </a-table>
      </div>
      <!-- 弹出层 -->
      <a-modal v-model="visible" title="添加公告" @ok="handleOk" width="635px">
        <a-form :form="form2" @submit="handleSubmit">
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
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="公告类型">
                <a-input
                  v-decorator="[
                    'type',
                    {
                      rules: [{ required: true, message: '公告类型不能为空' }]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="发送时间">
                <a-input
                  v-decorator="[
                    'sendTime',
                    {
                      rules: [{ required: true, message: '发送时间不能为空' }]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="截止时间">
                <a-input
                  v-decorator="[
                    'endTime',
                    {
                      rules: [{ required: true, message: '截止时间不能为空' }]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="接收部门">
                <a-input
                  v-decorator="[
                    'acceptDeptCode',
                    {
                      rules: [{ required: true, message: '接收部门不能为空' }]
                    }
                  ]"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="">
                <a-radio-group v-decorator="['organization']">
                  <a-radio value="a">
                    全部部门
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="公告内容">
                <a-input
                  v-decorator="[
                    'remark',
                    {
                      rules: [{ required: true, message: '接收部门不能为空' }]
                    }
                  ]"
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
  components: {}
})
export default class RightContent extends Vue {
  [x: string]: any;
  public getData = new this.$api.configInterface.Announcement();
  public visible = false;
  private form: any;
  private form2: any;
  public tabData = [];
  public seachKey = "all";
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
  }
  private getList(val: any) {
    this.getData.getNotices(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.tabData = res.data;
      this.pagination.total = res.pages * 1;
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
    console.log(obj);
    this.getList(obj);
  }
  private add(): void {
    this.visible = true;
  }
  private handleOk(e: any): void {
    console.log(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private rowClassName(record: any, index: number): string {
    return index % 2 === 0 ? "bgF5" : "";
  }
}
</script>

<style lang="less" scope>
#Announcement {
  width: 100%;
  height: 100vh;
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
</style>
