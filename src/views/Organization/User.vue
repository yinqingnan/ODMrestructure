<template>
  <div>
    <!-- 用户管理 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div
          class="contaninerheader"
          style="padding:12px 25px 0 25px;display:flex;    justify-content: space-between;"
        >
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
                  @submit="handle"
                >
                  <el-scrollbar class="screen">
                    <a-form-item label="所属部门">
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
                        title: 'name',
                      }"
                        placeholder="请选择..."
                      />
                    </a-form-item>
                    <a-form-item label="民警姓名">
                      <a-input
                        v-decorator="['username', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入民警姓名"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="民警警号">
                      <a-input
                        v-decorator="['usercode', { initialValue: '', rules: [] }]"
                        :max-length="LimitInputlength"
                        placeholder="请输入民警警号"
                      >/></a-input>
                    </a-form-item>
                    <a-form-item label="4G账号">
                      <a-select
                        v-decorator="[
                        '4GAccount',
                        {
                          initialValue: '-1',
                          rules: []
                        }
                      ]"
                        :allow-clear="true"
                        style="width: 100%"
                        placeholder="请选择..."
                      >
                        <a-select-option v-for="d in Account" :key="d.value">{{ d.label }}</a-select-option>
                      </a-select>
                    </a-form-item>
                  </el-scrollbar>
                  <div class="modulebot">
                    <a-button type="Default" @click="reset">重置</a-button>
                    <a-button type="primary" @click="handle">查询</a-button>
                  </div>
                </a-form>
              </a-menu>
            </a-dropdown>
          </template>
          <div class="btns">
            <a-button @click="add" type="primary">添加</a-button>
            <a-button @click="distributionzfy" type="primary">分配4G执法仪账号</a-button>
            <a-button @click="distributionddt" type="primary">分配4G调度台账号</a-button>
            <a-button @click="Resetpwd" type="primary">重置密码</a-button>
            <a-button @click="imports" type="primary">导入</a-button>
            <a-button @click="exports" type="primary">导出</a-button>
            <a-button @click="dlt" type="primary">删除</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            border
            height="auto"
            ref="logAdministration"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column
              field="type"
              title="日志类型"
              show-overflow
              align="center"
              minWidth="160"
            />
            <vxe-table-column
              field="module"
              title="功能模块"
              show-overflow
              align="center"
              minWidth="160"
            />
            <vxe-table-column
              field="department"
              title="所属部门（部门编号）"
              show-overflow
              align="center"
              minWidth="240"
            />
            <vxe-table-column
              field="operator"
              title="操作人员（警号）"
              show-overflow
              align="center"
              minWidth="240"
            />
            <vxe-table-column
              field="createTime"
              title="操作时间"
              show-overflow
              align="center"
              minWidth="130"
            />
          </vxe-table>
          <p>
            <vxe-pager
              align="right"
              size="mini"
              :layouts="layouts"
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
import { Component, Prop, Vue } from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,
} from "../../InterfaceVariable/variable"
@Component({
  components: {},
})
export default class User extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  private Account = [
    { id: "0", value: "全部", title: "请选择" },
    { id: "1", value: "2", title: "无" },
    { id: "2", value: "3", title: "调度台账号" },
    { id: "3", value: "1", title: "执法仪账号" },
  ]
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private tableData = []
  private departmentData = []
  private layouts = [
    "PrevJump",
    "PrevPage",
    "Jump",
    "PageCount",
    "NextPage",
    "NextJump",
    "Sizes",
    "Total",
  ]
  private Height = ""
  private popup() {
    return
  }

  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    // this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    // this.getdata()
    // let obj = {
    //   page: 1,
    //   size: 15,
    //   type_equal: this.type_equal,
    //   module_equal: this.module_equal,
    //   createTime: this.defaultdate,
    // }
    // this.gettabledata(obj)
  }
  // todo事件
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }

  private pagerchange({ currentPage, pageSize }) {
    let obj = {
      page: currentPage,
      size: pageSize,
      type_equal: this.type_equal,
      module_equal: this.module_equal,
      createTime: this.defaultdate,
    }
    console.log(obj)
    this.Luckmanagement.getlogtable(obj).then((res) => {
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private handle() {
    return
  }
  private reset() {
    return
  }

  // 添加
  private add() {
    return
  }
  // 分配调度台账号
  private distributionddt() {
    return
  }
  // 分配执法仪账号
  private distributionzfy() {
    return
  }
  // 重置密码
  private Resetpwd() {
    return
  }
  // 导入
  private imports() {
    return
  }
  // 导出
  private exports() {
    return
  }
  // 删除
  private dlt() {
    return
  }
}
</script>

<style lang="less" scope>
.el-scrollbar__wrap {
  width: 100%;
}
.screen {
  width: 347px;
  height: 260px;
}
.ant-calendar-picker {
  width: 200px !important;
}
.btns{
  line-height: 1;
}
.btns button {
  height: 30px;
  line-height: 1;
  color: #fff;
  background: #207ebd;
  outline: none;
  cursor: pointer;
  border: 0;
  margin-left: 10px;
}
</style>
