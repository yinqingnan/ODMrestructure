/* eslint-disable vue/no-parsing-error */
<template>
  <div>
    <div id="AvData" class="layoutcontainer">
      <div class="container">
        <div class="contaninerheader">
          <template>
            <a-dropdown :trigger="['click']" class="dropdown">
              <a class="ant-dropdown-link" @click="popup">
                筛选 <a-icon type="down" />
              </a>
              <a-menu slot="overlay" class="box">
                <a-form
                  autocomplete="off"
                  :form="form"
                  :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 14 }"
                  @submit="handleSubmit"
                >
                  <a-form-item label="部门">
                    <a-tree-select
                      v-decorator="[
                        'department',
                        {
                          initialValue: '',
                          rules: []
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
                        title: 'name'
                      }"
                      placeholder="请选择..."
                    />
                  </a-form-item>
                  <a-form-item label="姓名/警号">
                    <a-input
                      v-decorator="['user', { initialValue: '', rules: [] }]"
                      :max-length="LimitInputlength"
                      placeholder="请输入姓名/警号"
                    >
                      />
                    </a-input>
                  </a-form-item>
                  <a-form-item label="时间类型">
                    <a-select
                      v-decorator="[
                        'TimeData',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                      :allow-clear="true"
                      style="width: 100%"
                      placeholder="Please select"
                    >
                      <a-select-option v-for="d in Timetype" :key="d.value">
                        {{ d.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="时间">
                    <a-range-picker
                      v-decorator="[
                        'date',
                        {
                          initialValue: defaultdate,
                          rules: []
                        }
                      ]"
                      @change="onChange"
                    />
                  </a-form-item>
                  <a-form-item label="文件类型">
                    <a-select
                      v-decorator="[
                        'Filetype',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                      :allow-clear="true"
                      style="width: 100%"
                      placeholder="Please select"
                    >
                      <a-select-option v-for="d in filetype" :key="d.value">
                        {{ d.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="重要级别">
                    <a-select
                      v-decorator="[
                        'levelData',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                      :allow-clear="true"
                      style="width: 100%"
                      placeholder="Please select"
                    >
                      <a-select-option v-for="d in levelData" :key="d.value">
                        {{ d.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <div class="modulebottom">
                    <a-button type="Default" @click="reset">
                      重置
                    </a-button>
                    <a-button type="primary" @click="handleSubmit">
                      查询
                    </a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div>
            <button>批量删除</button>
            <button>批量下载</button>
          </div>
        </div>
        <div>
          <a-table
            :loading="loading"
            row-key="columns"
            :columns="columns"
            :bordered="true"
            :data-source="tabledata"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
          >
            <span slot="action" slot-scope="text, record">
              <span style="color:#0db8df" @click="tablebtn(text, record)"
                >操作</span
              >
            </span>
          </a-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { LimitInputlength } from "../../InterfaceVariable/variable";
import { Component, Prop, Vue } from "vue-property-decorator";
import moment from "moment";
@Component({
  components: {}
})
export default class AvData extends Vue {
  [x: string]: any;
  public DataM = new this.$api.configInterface.DataM();
  public form!: any;
  private LimitInputlength = LimitInputlength;
  private departmentData = [];
  private Timetype = [
    { id: 1, value: "1", title: "导入时间" },
    { id: 2, value: "2", title: "拍摄时间" }
  ];
  private filetype = [
    { id: 1, value: "1", title: "视频" },
    { id: 2, value: "2", title: "音频" },
    { id: 3, value: "3", title: "图片" },
    { id: 4, value: "4", title: "日志" }
  ];
  private levelData = [
    { id: 1, value: "1", title: "高" },
    { id: 2, value: "2", title: "中" },
    { id: 3, value: "3", title: "低" }
  ];
  private defaultdate = [
    moment("2015-06-06", "YYYY-MM-DD"),
    moment("2015-06-06", "YYYY-MM-DD")
  ];
  private selectdata = [];
  private selectedRowKeys = [];
  private loading = false;
  private columns = [
    {
      title: "文件名称",
      dataIndex: "fileName",
      align: "center",
      key: "fileName"
    },
    {
      title: "执勤部门",
      dataIndex: "deptCode",
      align: "center",
      key: "deptCode"
    },
    {
      title: "民警姓名",
      dataIndex: "userName",
      align: "center",
      key: "userName"
    },
    {
      title: "民警警告",
      dataIndex: "userCode",
      align: "center",
      key: "userCode"
    },
    {
      title: "文件类型",
      dataIndex: "fileType_Name",
      align: "center",
      key: "fileType_Name"
    },
    {
      title: "重要级别",
      dataIndex: "fileLevel_Name",
      align: "center",
      key: "fileLevel_Name"
    },
    {
      title: "摄录时间",
      dataIndex: "recordDate",
      align: "center",
      key: "recordDate"
    },
    {
      title: "摄录时长",
      dataIndex: "fileDuration_Name",
      align: "center",
      key: "fileDuration_Name"
    },
    {
      title: "导入时间",
      dataIndex: "uploadDate",
      align: "center",
      key: "uploadDate"
    },
    {
      title: "关联信息",
      dataIndex: "relateCase",
      align: "center",
      key: "relateCase"
    },
    {
      title: "操作",
      dataIndex: "action",
      align: "center",
      key: "action",
      scopedSlots: { customRender: "action" }
    }
  ];
  private tabledata = [];
  private created() {
    this.form = this.$form.createForm(this);
    this.getdata();
  }

  // private moment: any;
  private handleSubmit(e: any): void {
    e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        console.log(values);
      }
    });
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString;
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data;
    });
    this.DataM.gettimeframe({ type: "LATELY_MONTH" }, true).then((res: any) => {
      this.defaultdate = [
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD HH:mm:ss"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD HH:mm:ss")
      ];
    });
    const obj = {
      page: 1,
      limit: 15,
      // eslint-disable-next-line @typescript-eslint/camelcase
      deptCode_equal: "", //部门id
      userName: "", //警员
      timeType: "uploadDate", //时间类型
      timeRange: "2020-10-06 ~ 2020-11-06",
      // eslint-disable-next-line @typescript-eslint/camelcase
      fileType_equal: "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      fileLevel_equal: "",
      // eslint-disable-next-line @typescript-eslint/camelcase
      uploadDate_gt: "2020-10-06 00:00:00", //必填  时间起
      // eslint-disable-next-line @typescript-eslint/camelcase
      uploadDate_lt: "2020-11-06 23:59:59", //必填  时间止
      // eslint-disable-next-line @typescript-eslint/camelcase
      recordDate_gt: ""
    };
    this.gettabledata(obj);
  }
  private gettabledata(obj: any) {
    this.DataM.gettabledata(obj, true).then((res: any) => {
      this.tabledata = res.data;
    });
  }
  private onSelectChange(selectedRowKeys: any) {
    this.selectedRowKeys = selectedRowKeys;
  }
  private reset() {
    this.form.resetFields();
    this.defaultdate = [];
  }
  private popup(e) {
    this.getdata();
    e.preventDefault();
  }
  private tablebtn(text: any, row: any) {
    console.log(text, row);
  }
}
</script>

<style lang="less" scope>
.ant-form-item {
  margin-bottom: 7px;
}
.modulebottom {
  display: flex;
  justify-content: flex-end;
  > button:nth-of-type(1) {
    margin-right: 10px;
  }
  > button:nth-of-type(2) {
    margin-right: 28px;
  }
}
.contaninerheader {
  display: flex;
  justify-content: space-between;
  padding-top: 13px;
}
.contaninerheader {
  > div > button {
    background: #0db8df;
    border: 0;
    cursor: pointer;
    outline: none;
    color: #fff;
    width: 58px;
    height: 30px;
  }
  > div > button:nth-of-type(1) {
    margin-right: 9px;
  }
}
.box {
  width: 347px;
  height: 337px;
  background: #ffffff;
  border: 1px solid #f1f1f1;
}
.dropdown {
  width: 58px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #f1f1f1;
  display: block;
  text-align: center;
  color: #a1a9b5;
}
.ant-row .ant-form-item {
  width: 100%;
}
.ant-form-item-label > label {
  color: #808994;
}
#AvData .ant-table-tbody > tr > td {
  padding: 0px;
  height: 36px;
  line-height: 36px;
}
#AvData .ant-table-thead {
  height: 36px;
  line-height: 36px;
}
#AvData .ant-table-thead > tr > th,
.ant-table-tbody > tr > td {
  padding: 0px;
}
</style>
