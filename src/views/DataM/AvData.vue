/* eslint-disable vue/no-parsing-error */
<template>
  <div>
    <div class="layoutcontainer">
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
                  @submit="handleSubmit"
                  :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 14 }"
                >
                  <a-form-item label="部门">
                    <a-tree-select
                      :allowClear="true"
                      style="width: 100%"
                      :dropdownMatchSelectWidth="true"
                      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                      :tree-data="departmentData"
                      :replaceFields="{
                        id: 'code',
                        pId: 'parentCode',
                        value: 'value',
                        title: 'name'
                      }"
                      placeholder="请选择..."
                      v-decorator="[
                        'department',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                    />
                  </a-form-item>
                  <a-form-item label="姓名/警号">
                    <a-input
                      :maxLength="LimitInputlength"
                      v-decorator="['user', { initialValue: '', rules: [] }]"
                      placeholder="请输入姓名/警号"
                    >
                      /></a-input
                    >
                  </a-form-item>
                  <a-form-item label="时间类型">
                    <a-select
                      :allowClear="true"
                      style="width: 100%"
                      placeholder="Please select"
                      v-decorator="[
                        'TimeData',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                    >
                      <a-select-option v-for="d in Timetype" :key="d.value">
                        {{ d.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="时间">
                    <a-range-picker
                      @change="onChange"
                      v-decorator="[
                        'date',
                        {
                          initialValue: defaultdate,
                          rules: []
                        }
                      ]"
                    />
                  </a-form-item>
                  <a-form-item label="文件类型">
                    <a-select
                      :allowClear="true"
                      style="width: 100%"
                      placeholder="Please select"
                      v-decorator="[
                        'Filetype',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                    >
                      <a-select-option v-for="d in filetype" :key="d.value">
                        {{ d.title }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                  <a-form-item label="重要级别">
                    <a-select
                      :allowClear="true"
                      style="width: 100%"
                      placeholder="Please select"
                      v-decorator="[
                        'levelData',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
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
            :columns="columns"
            :bordered="true"
            :data-source="tabledata"
            :row-selection="{
              selectedRowKeys: selectedRowKeys,
              onChange: onSelectChange
            }"
          />
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
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: "12%"
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
      key: "address"
    }
  ];
  private tabledata = [
    {
      key: 1,
      name: "John Brown sr.",
      age: 60,
      address: "New York No. 1 Lake Park"
    },
    {
      key: 2,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    }
  ];
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
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD")
      ];
    });
    this.gettabledata();
  }
  private gettabledata() {
    this.DataM.gettabledata().then((res: any) => {
      console.log(res);
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
.ant-table-tbody > tr > td {
  padding: 0px;
  height: 36px;
  line-height: 36px;
}
</style>
