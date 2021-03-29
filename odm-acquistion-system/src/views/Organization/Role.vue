<template>
  <div>
    <!-- 角色管理 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div
          class="contaninerheader"
          style="padding:12px 25px 0 25px;display:flex;    justify-content: space-between;"
        >
          <div class="btns">
            <a-button @click="add" type="primary" style="margin:0" v-isshow="'base:role:save'">添加</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            resizable
            border
            height="auto"
            ref="usertable"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
            :sort-config="{trigger: 'cell', defaultSort: {field: 'id', order: 'desc'}, orders: ['desc', 'asc']}"
            @sort-change="sortChangeEvent"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column
              field="name"
              title="角色名称"
              show-overflow
              align="center"
              minWidth="140"
              sortable
            />
            <vxe-table-column
              field="remark"
              title="角色描述"
              show-overflow
              align="center"
              minWidth="140"
            />
            <vxe-table-column
              field="dataPermission"
              title="视音频数据权限"
              show-overflow
              align="center"
              minWidth="140"
            />
            <vxe-table-column
              field="rightNames"
              title="权限项"
              show-overflow
              align="center"
              minWidth="280"
            />
            <vxe-table-column title="操作" show-overflow align="center" fixed="right" minWidth="180">
              <template v-slot="{ row }">
                <span
                  v-isshow="'base:role:save'"
                  type="text"
                  @click="edit(row)"
                  style="color:#0db8df;margin-right:8px;cursor: pointer;"
                >编辑</span>
                <span
                  v-if="!row.isDefault"
                  v-isshow="'base:role:delete'"
                  type="text"
                  @click="dlt(row)"
                  style="color:#0db8df;margin-right:8px;cursor: pointer;"
                >删除</span>
                <span
                  v-isshow="'base:role:right,base:role:saveRight'"
                  type="text"
                  @click="configure(row)"
                  style="color:#0db8df;cursor: pointer;margin-right:8px;"
                >权限配置</span>
              </template>
            </vxe-table-column>
          </vxe-table>
        </div>
      </div>
      <a-modal v-model="visible" :title="str" @ok="handleOk" :keyboard="false">
        <a-form
          autocomplete="off"
          :form="form"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          @submit="handleOk"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="角色名称">
                <a-input
                  v-decorator="['name', { initialValue: '',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                  placeholder="请输入角色名称"
                >/></a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24" class="rolesort">
              <a-form-item label="角色排序">
                <a-input-number
                  v-decorator="['sort', { initialValue: '',  rules: [] }]"
                  :max-length="5"
                  :min="0"
                  :max="99999"
                  placeholder="请输入数字,数字越大排序越靠后"
                >/></a-input-number>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row class="roles">
            <a-col :span="24">
              <a-form-item label="角色描述" class="textareatext" :span="4">
                <a-textarea
                  :maxLength="textarealength"
                  allowClear
                  rows="3"
                  style="resize: none;"
                  placeholder="请输入角色描述（200字符以内）"
                  v-decorator="[
                        'remark',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
      <a-modal v-model="configshow" title="权限配置" @ok="configshowok" :keyboard="false">
        <a-form
          autocomplete="off"
          :form="form1"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          @submit="configshowok"
        >
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="视音频数据权限:">
                <a-radio-group
                  v-decorator="['see', { initialValue: '1',  rules: [{ required: true, message: '必填项不能为空' }] }]"
                  :max-length="LimitInputlength"
                >
                  <a-radio value="0">看所有</a-radio>
                  <a-radio value="1">只看自己</a-radio>
                </a-radio-group>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="角色描述" class="textareatext" :span="4">
                <a-checkbox-group
                  v-decorator="['rights', { initialValue: selectarr,rules: [{ required: true, message: '必填项不能为空' }]},]"
                  style="width: 100%;"
                >
                  <a-row>
                    <a-col
                      :span="12"
                      v-for="(d) in options"
                      :key="d.id"
                      style="line-height: 30px;height: 30px;text-overflow: ellipsis;white-space: nowrap;width: 150px;overflow: hidden;"
                      class="rightlist"
                    >
                      <a-tooltip>
                        <template slot="title" v-if="d.name.length > 5">{{d.name}}</template>
                        <a-checkbox
                          :value="d.id"
                          style="width:110px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                        >{{d.name}}</a-checkbox>
                      </a-tooltip>
                    </a-col>
                  </a-row>
                </a-checkbox-group>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {
  layouts,
  LimitInputlength,
  page,
  textarealength
} from "@/InterfaceVariable/variable"
@Component({
  components: {}
})
export default class Role extends Vue {
  // todo变量
  [x: string]: any
  public form!: any
  public form1!: any
  public str = ""
  public visible = false
  public OrganizationM = new this.$api.configInterface.OrganizationM()
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private options = []
  private selectarr = []
  private configshow = false
  private status = ""
  private id = ""
  private Height = ""
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private tableData = []
  private departmentData = []
  private layouts = layouts
  // todo 事件和生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    this.form1 = this.$form.createForm(this)
    // this.getdata()
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    let obj = {
      page: 1,
      size: 10,
      sidx: "sort",
      order: "asc"
    }
    this.gettabledata(obj)
  }
  // todo事件
  private tableRowClassName(record: any) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private add() {
    this.str = "添加角色"
    this.visible = true
    this.status = "新增"
    this.form.resetFields()
  }
  private gettabledata(obj?) {
    this.OrganizationM.getroletable(obj).then((res) => {
      console.log(res)

      this.tableData = res.data
      this.page.totalResult = res.count
    })
  }
  private configure(row) {
    this.configshow = true
    this.id = row.id
    this.OrganizationM.roleright(row.id).then((res) => {
      if (res.code == 0) {
        this.options = res.data.rights
        let newarr = res.data.rights.filter((el) => el.checked === true)
        this.selectarr = []
        // 筛选出所有选中
        newarr.map((el) => {
          this.selectarr.push(el.id)
        })
        this.$nextTick(() => {
          this.form1.setFieldsValue({
            see: res.data.dataPermission + "",
            rights: this.selectarr
          })
        })
      } else {
        this.$message.error(res.msg)
      }
    })
  }
  private edit(row) {
    console.log(row)

    this.status = "编辑"
    this.str = "编辑"
    this.id = row.id
    this.visible = true
    this.$nextTick(() => {
      this.form.setFieldsValue({
        name: row.name,
        remark: row.remark,
        sort: Number(row.sort)
      })
    })
  }

  private dlt(row) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: `角色删除后无法恢复，确定要删除角色${row.name}吗？`,
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          _that.OrganizationM.roledlt(row.id).then((res) => {
            if (res.code == 0) {
              _that.$message.success(res.msg)

              _that.gettabledata({
                page: 1,
                size: 10,
                sidx: "sort",
                order: "asc"
              })
            } else {
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log("Oops errors!"))
      }
    })
  }
  private handleOk(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let obj = {
          id: this.status === "新增" ? "" : this.id,
          name: val.name,
          remark: val.remark,
          sort: val.sort
        }
        this.OrganizationM.roleupdate(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.gettabledata({ page: 1, size: 10, sidx: "sort", order: "asc" })
            this.visible = false
            this.form.resetFields()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  private configshowok(e) {
    e.preventDefault()
    this.form1.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        let obj = {
          dataPermission: val.see,
          rightIds: val.rights,
          roleId: this.id
        }
        this.OrganizationM.roleSetright(obj).then((res) => {
          if (res.code == 0) {
            this.configshow = false
            this.$message.success(res.msg)
            this.gettabledata({ page: 1, size: 10, sidx: "sort", order: "asc" })
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    })
  }
  private sortChangeEvent({ column, property, order }) {
    this.tableData = []
    let obj = {
      page: 1,
      size: 10,
      sidx: property,
      order: order
    }
    this.gettabledata(obj)
  }
}
</script>

<style lang="less" scope>
.btns {
  line-height: 1;
}
.btns button {
  height: 30px;
  line-height: 1;
  color: #fff;
  outline: none;
  cursor: pointer;
  border: 0;
  margin-left: 10px;
}
.rolesort {
  .ant-input-number {
    width: 354px;
  }
  .ant-input-number-handler-wrap {
    span {
      display: none;
    }
  }
}
// .roles /deep/ .ant-form-item-label {
//   width: 73px;
// }
// .roles /deep/ .ant-form-item-control-wrapper {
//   width: 578px;
// }
</style>
