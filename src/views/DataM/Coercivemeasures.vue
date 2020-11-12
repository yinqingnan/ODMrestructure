<template>
  <div>
    <div id="Simpleprogram" class="layoutcontainer">
      <div class="containers">
        <div class="contaninerheader" style="padding-left:25px">
          <template>
            <a-dropdown :trigger="['click']" class="dropdown">
              <a class="ant-dropdown-link" @click="popup">
                筛选
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay" class="box">
                <a-form
                  autocomplete="off"
                  :form="form"
                  :label-col="{ span: 8 }"
                  :wrapper-col="{ span: 14 }"
                  @submit="handleSubmit"
                >
                  <el-scrollbar class="screen">
                    <a-form-item label="执勤部门">
                      <a-tree-select
                        show-search
                        treeNodeFilterProp="title"
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
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="当事人">
                      <a-input
                        v-decorator="['party', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入当事人"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="违法时间">
                      <a-range-picker
                        :show-time="{
                            hideDisabledOptions: true,
                          }"
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
                    <a-form-item label="凭证编号">
                      <a-input
                        v-decorator="['DecisionNo', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入凭证编号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="驾驶证号">
                      <a-input
                        v-decorator="['Drivercode', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入驾驶证号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="号码号牌">
                      <a-input
                        v-decorator="['numcode', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入号码号牌"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="违法地址">
                      <a-input
                        v-decorator="['Illegaladdress', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入违法地址"
                      >/></a-input>
                    </a-form-item>
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handleSubmit">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div>
            <!-- <button @click="download">批量删除</button>
            <button @click="dlt">批量下载</button>-->
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table border height="auto" :data="tableData" class="mytable-scrollbar">
            <vxe-table-column type="seq" width="60" title="序号" align="center" />
            <vxe-table-column field="deptName" title="执勤部门" align="center" show-overflow />
            <vxe-table-column field="userName" title="民警姓名" align="center" />
            <vxe-table-column field="code" title="凭证编号" align="center" show-overflow />
            <vxe-table-column field="litigant" title="当事人" align="center" />
            <vxe-table-column field="driverNum" title="驾驶证号" align="center" show-overflow />
            <vxe-table-column field="numberPlate" title="号码号牌" show-overflow align="center" />
            <vxe-table-column field="hpzlText" title="号牌种类" align="center" />
            <vxe-table-column field="illegalTime" title="违法时间" show-overflow align="center" />
            <vxe-table-column
              field="illegalAddress"
              title="违法地址"
              align="center"
              width="100"
              show-overflow
            />
            <vxe-table-column field="illegalDeed" title="违法行为" show-overflow align="center" />
            <vxe-table-column field="relatedInfo" title="关联信息" align="center" />
            <vxe-table-column field="active" title="操作" align="center">
              <template v-slot="{ row }">
                <vxe-button type="text" @click="tablebtn(row)">查看</vxe-button>
              </template>
            </vxe-table-column>
          </vxe-table>
          <p>
            <vxe-pager
              align="right"
              size="mini"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              @page-change="pagerchange"
            />
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { LimitInputlength } from "../../InterfaceVariable/variable"
import { Component, Vue } from "vue-property-decorator"
import moment from "moment"

@Component({})
export default class Coercivemeasures extends Vue {
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private departmentData = []
  private Height = ""
  private tableData = [{ active: "roe" }]
  private formdata = {}
  private page = {
    currentPage: 1,
    pageSize: 10,
    totalResult: 200,
  }
  private defaultdate = [
    moment("2015-06-06", "YYYY-MM-DD"),
    moment("2015-06-06", "YYYY-MM-DD"),
  ]
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    this.gettabledata({})
  }
  private popup() {
    console.log(1)
  }
  private reset() {
    this.form.resetFields()
  }
  private onChange(date: any, dateString: any): void {
    this.selectdata = dateString
  }
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        this.formdata = val
        console.log(val)
        let obj = {
          page: 1,
          limit: 15,
          zqbm_equal: val.department, //部门id
          mjxm: val.user, //警员
          dsr_like: val.party, //当事人
          wfsj: this.myDate,
          pzbh_like: val.DecisionNo,
          jszh_like: val.Drivercode,
          hphm_like: val.numcode,
          wfdz_like: val.Illegaladdress,
          type: 1,
          wfsj_gt: val.date[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
          wfsj_lt: val.date[1].format("YYYY-MM-DD HH:mm:ss"), //必填  时间止
        }
        this.gettabledata(obj)
      }
    })
  }
  private getdata() {
    this.DataM.getMenulist({}, true).then((res: any) => {
      this.departmentData = res.data
    })
    this.DataM.gettimeframe({ type: "LATELY_MONTH" }, true).then((res: any) => {
      this.myDate = res.data.myDate
      this.defaultdate = [
        moment(res.data.myDate.split("~")[0], "YYYY-MM-DD"),
        moment(res.data.myDate.split("~")[1], "YYYY-MM-DD"),
      ]
    })
  }
  private gettabledata(obj: any) {
    this.DataM.getCoercivemeasuresTable(obj, true).then((res: any) => {
      console.log(res)
      this.tableData = res.data
    })
  }
  private tablebtn(row) {
    console.log(row)
  }
  private pagerchange({ currentPage, pageSize }) {
    let obj = {
      page: currentPage,
      limit: pageSize,
      zqbm_equal: this.formdata.department, //部门id
      mjxm: this.formdata.user, //警员
      dsr_like: this.formdata.party, //当事人
      wfsj: this.myDate,
      pzbh_like: this.formdata.DecisionNo,
      jszh_like: this.formdata.Drivercode,
      hphm_like: this.formdata.numcode,
      wfdz_like: this.formdata.Illegaladdress,
      type: 1,
      wfsj_gt: this.formdata.date[0].format("YYYY-MM-DD HH:mm:ss"), //必填  时间起
      wfsj_lt: this.formdata.date[1].format("YYYY-MM-DD HH:mm:ss"), //必填  时间止
    }
    this.gettabledata(obj)
  }
}
</script>


<style lang="less" scope>
.containers {
  width: 100%;
}
.screen {
  width: 347px;
  height: 260px;
}
.el-scrollbar__wrap {
  width: 100% !important;
  overflow-x: hidden;
}
.el-scrollbar__bar {
  display: none;
}
.ant-calendar-picker {
  width: 100% !important;
}
// .modulebot {
//   display: flex;
//   justify-content: flex-end;
//   padding-right: 44px;
//   button:nth-of-type(1) {
//     margin-right: 10px;
//   }
//   height: 34px;
  
// }
.Simpleprogrambody {
  // height: 100%;
  padding: 0 26px;
  background: #fff;
}
/*滚动条整体部分*/
.mytable-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
/*滚动条的轨道*/
.mytable-scrollbar ::-webkit-scrollbar-track {
  background-color: #ffffff;
}
/*滚动条里面的小方块，能向上向下移动*/
.mytable-scrollbar ::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 5px;
  border: 1px solid #f1f1f1;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:hover {
  background-color: #a8a8a8;
}
.mytable-scrollbar ::-webkit-scrollbar-thumb:active {
  background-color: #787878;
}
/*边角，即两个滚动条的交汇处*/
.mytable-scrollbar ::-webkit-scrollbar-corner {
  background-color: #ffffff;
}
</style>