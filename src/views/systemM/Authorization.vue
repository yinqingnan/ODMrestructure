<template>
  <div id="Authorization">
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">
          <b>授权信息</b>
          <div class="txtBox" style="margin:15px 0 15px 15px;">
            <div class="item" v-for="(item, index) in txtList" :key="index">
              <p style="color:#000;margin-bottom:5px;font-size:14px;">
                {{ item }}
                <span style="font-size:12px;color:#666;">
                  {{ valList[index] }}
                </span>
              </p>
            </div>
          </div>
          <b>授权业务</b>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <a-table
          :columns="columns"
          :data-source="tabData"
          bordered
          :rowClassName="rowClassName"
          :pagination="pagination"
          rowKey="id"
        >
          <template slot="index" slot-scope="text, record, index">
            {{ (pagination.current - 1) * pagination.pageSize + index + 1 }}
          </template>
        </a-table>
      </div>
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
  public getData = new this.$api.configInterface.Authorization();
  public tabData = [];
  public txtList = [
    "机器特征：",
    "产品名称：",
    "过期时间：",
    "授权状态：",
    "授权时间："
  ];
  public valList: string[] = [];
  public pagination = {
    pageSize: 100, // 默认每页显示数量
    current: 1, //显示当前页数
    total: 0,
    hideOnSinglePage: true,
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
      width: 65,
      dataIndex: "index",
      scopedSlots: { customRender: "index" }
    },
    {
      title: "业务编码",
      dataIndex: "code",
      className: "pd10",
      width: 354
    },
    {
      title: "授权业务",
      dataIndex: "name",
      className: "pd10",
      width: 354
    },
    {
      title: "业务描述",
      dataIndex: "remark",
      className: "pd10"
    }
  ];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  created() {
    this.getData.software({}, true).then((res: any) => {
      this.valList.push(res.data.machineFeature);
      this.valList.push(res.data.prodName);
      this.valList.push(res.data.expiryTime);
      this.valList.push(res.data.authStatus);
      this.valList.push(res.data.authTime);
    });
    const val = {
      page: this.pagination.current,
      limit: this.pagination.pageSize
    };
    this.getData.getBiz(val, true).then((res: any) => {
      this.tabData = res.data;
      this.pagination.total = res.pages * 1;
    });
  }
  private rowClassName(record: any, index: number): string {
    return index % 2 === 0 ? "bgF5" : "";
  }
}
</script>

<style lang="less" scope>
#Authorization {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
#Authorization .ant-table-tbody > tr > td {
  padding: 8px 16px;
}
#Authorization .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
#Authorization .ant-dropdown-link {
  display: block;
  text-align: center;
  line-height: 30px;
  width: 58px;
  height: 30px;
  border: 1px solid #ccc;
  color: #9EA7B3;
}
#Authorization .ant-table-tbody > tr > th {
  padding: 8px 16px;
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
#Authorization .ant-table-thead .pd10 {
  padding: 8px 16px;
}
</style>
