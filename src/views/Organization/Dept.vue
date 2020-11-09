<template>
  <div id="Dept">
    <div class="box">
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
                <a-form-item label="部门名称" style="width:100%">
                  <a-input
                    v-decorator="[
                      'name_like',
                      {
                        rules: [{ required: false, message: '请输入配置值' }]
                      }
                    ]"
                    placeholder="请输入部门名称"
                  />
                </a-form-item>
                <a-form-item label="部门编号" style="width:100%">
                  <a-input
                    v-decorator="[
                      'code_like',
                      {
                        rules: [{ required: false, message: '请输入配置值' }]
                      }
                    ]"
                    placeholder="请输入部门编号"
                  />
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
          <a-button class="upData mr10" @click="Export">导入</a-button>
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
            </div>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
      components: {}
})
export default class Dept extends Vue {
  public pagination = {
        pageSize: 1000, // 默认每页显示数量
        current: 1, //显示当前页数
        total: 0,
        showSizeChanger: false, // 显示可改变每页数量
        showQuickJumper: false, //显示跳转到输入的那一页
        showTotal: (total: number) =>
              `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
                    total / this.pagination.pageSize
              )} 页` // 显示总数
  };
  public tabData = [];
  public columns = [
        {
              title: "序号",
              className: "pd10",
              width: 65,
              dataIndex: "index",
              fixed: "left",
              scopedSlots: { customRender: "index" }
        },
        {
              title: "部门名称",
              dataIndex: "name",
              className: "pd10"
        },
        {
              title: "部门编号",
              dataIndex: "code",
              className: "pd10"
        },
        {
              title: "联系人",
              dataIndex: "contact",
              className: "pd10"
        },
        {
              title: "联系电话",
              dataIndex: "phone",
              className: "pd10"
        },
        {
              title: "部门描述",
              dataIndex: "remark",
              className: "pd10"
        },
        {
              title: "操作",
              key: "operation",
              scopedSlots: { customRender: "operation" },
              className: "pd10",
              width: 200,
              fixed: "right"
        }
  ];
  private form: any;
  beforeCreate() {
        this.form = this.$form.createForm(this);
  }
  private handleSubmit(e: any): void {
        console.log(e)
  }
  private Export(e: any): void {
        console.log(e)
  }
  private add(e: any): void {
        console.log(e)
  }
  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
        this.pagination.pageSize = pagination.pageSize;
        this.pagination.current = pagination.current;
        const obj = {
              page: this.pagination.current,
              limit: this.pagination.pageSize
        };
        this.getList(obj);
  }
  private rowClassName(record: any, index: number): string {
        return index % 2 === 0 ? "bgF5" : "";
  }
}
</script>

<style lang="less" scope>
#Dept {
  // padding: 15px 0;
  width: calc(100% - 250px);
  height: calc(100% - 30px);
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
#Dept .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #fff;
}
#Dept .ant-dropdown-link {
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
.content {
  margin: 15px 25px 0;
}
</style>
