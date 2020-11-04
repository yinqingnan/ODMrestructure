<template>
  <div id="Announcement">
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
          <a-button class="upData">添加</a-button>
        </div>
      </div>
      <div class="content">
        <a-table :columns="columns" :data-source="tabData" bordered>
          <template slot="operation" slot-scope="text">
            {{ text }}
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
  public getData = new this.$api.configInterface.Announcement();
  private form: any;
  public tabData = [];
  private columns = [
    {
      title: "序号",
      dataIndex: "index",
      className: "pd10"
    },
    {
      title: "公告标题",
      dataIndex: "title",
      className: "pd10"
    },
    {
      title: "公告类型",
      dataIndex: "type",
      className: "pd10"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      className: "pd10"
    },
    {
      title: "发送时间",
      dataIndex: "sendTime",
      className: "pd10"
    },
    {
      title: "截止时间",
      dataIndex: "endTime",
      className: "pd10"
    },
    {
      title: "发布民警姓名",
      dataIndex: "sendUserName",
      className: "pd10"
    },
    {
      title: "发布民警警号",
      dataIndex: "sendUserCode",
      className: "pd10"
    },
    {
      title: "接收部门",
      dataIndex: "acceptDeptNames",
      className: "pd10"
    },
    {
      title: "公告内容",
      dataIndex: "content",
      className: "pd10"
    },
    {
      title: "操作",
      key: "operation",
      scopedSlots: { customRender: "operation" },
      className: "pd10"
    }
  ];
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
  created() {
    this.getData.getNotices({}, true).then((res: any) => {
      console.log(res);
    });
  }
  private handleSubmit(e: any): void {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(values);
      }
    });
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
#Announcement .ant-table-thead .pd10 {
  padding: 8px 16px;
}
</style>
