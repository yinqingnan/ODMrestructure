<template>
  <!-- 数据字典 -->
  <div id="Dictionary">
    <div class="box">
      <!-- 头部 -->
      <div class="header">
        <div class="select">数据字典项</div>
      </div>
      <!-- 内容 -->
      <div class="content" :style="{height:Height}">
        <vxe-table
          stripe
          border
          resizable
          height="auto"
          ref="logAdministration"
          highlight-hover-row
          show-header-overflow
          class="mytable-scrollbar"
          :row-class-name="tableRowClassName"
          :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
          :data="tabData"
        >
          <vxe-table-column type="seq" width="60" align="center" title="序号" />
          <vxe-table-column
            field="dictKey"
            title="字典值"
            show-overflow
            align="center"
            minWidth="110"
          />
          <vxe-table-column field="value" title="字典名称" show-overflow align="center" minWidth="150" />

          <vxe-table-column
            field="dictItems"
            title="字典项"
            show-overflow
            align="center"
            minWidth="150"
          />
          <vxe-table-column title="操作" show-overflow align="center" minWidth="130">
            <template v-slot="{ row }">
              <span @click="edit(row)" style="color:#4d96ca;cursor:pointer;margin-right:10px">编辑字典子项</span>
            </template>
          </vxe-table-column>
        </vxe-table>
        <p>
          <vxe-pager
            align="right"
            size="mini"
            :layouts="layouts"
            :current-page.sync="page.currentPage"
            :page-size.sync="page.pageSize"
            :total="page.totalResult"
            :page-sizes="[15, 50, 100, 200]"
            @page-change="pagerchange"
          />
        </p>
      </div>
      <!-- 弹窗 -->
      <a-modal
        v-model="visible"
        :title="myTitle"
        width="635px"
        wrapClassName="myAM"
        cancelText="取消"
        okText="提交"
        :keyboard="false"
        @cancel="cancelevent"
      >
        <div class="editmodal_header">
          <h2>基础信息</h2>
          <div>
            <h3>字典值： {{dictKey}}</h3>
            <h3>名称： {{value}}</h3>
          </div>
        </div>
        <div class="editmodal_content">
          <div>
            <h2>字典项</h2>
            <a-button type="primary" @click="addtable">添加</a-button>
          </div>
          <div>
            <vxe-table
              border
              show-overflow
              keep-source
              height="270"
              class="mytable-scrollbar"
              ref="editTable"
              :data="edittableData"
              :edit-config="{trigger: 'manual', mode: 'row',showStatus: true}"
              :edit-rules="validRules"
            >
              <vxe-table-column
                field="dictKey"
                title="字典项值"
                show-overflow
                width="155"
                align="center"
                :edit-render="{name: 'input', attrs: {type: 'text'}}"
              />
              <vxe-table-column
                field="value"
                title="字典名称"
                width="155"
                show-overflow
                align="center"
                :edit-render="{name: 'input', attrs: {type: 'text'}}"
              />
              <vxe-table-column
                field="sort"
                title="序号"
                show-overflow
                align="center"
                width="93"
                :edit-render="{name: 'input', attrs: {type: 'text'}}"
              />
              <vxe-table-column title="操作" align="center" width="185">
                <template v-slot="{row}">
                  <template v-if="row.isedit">
                    <span
                      class="btnspan"
                      @click="saveRowEvent(row)"
                      v-isshow="'base:dict:save'"
                      style="margin-right:10px"
                    >保存</span>
                    <span class="btnspan" @click="cancelRowEvent(row)">取消</span>
                  </template>
                  <template v-else>
                    <span
                      class="btnspan"
                      @click="editRowEvent(row)"
                      v-isshow="'base:dict:save'"
                      style="margin-right:10px"
                    >编辑</span>
                    <span class="btnspan" @click="dltRowEvent(row)" v-isshow="'base:dict:delete'">删除</span>
                  </template>
                </template>
              </vxe-table-column>
            </vxe-table>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
// import { PropType } from "vue";
import { Component, Vue } from "vue-property-decorator"
import {
  layouts,
  sizeInputlength,
  textarealength
} from "@/InterfaceVariable/variable"
@Component({
  components: {}
})
export default class RightContent extends Vue {
  [x: string]: any
  public getData = new this.$api.configInterface.Dictionary()
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200 //总数
  }
  private sizeInputlength = sizeInputlength
  private textarealength = textarealength
  private layouts = layouts
  private form: any
  private Height = ""
  public tabData = []
  public isShow = true
  public seachKey = "all"
  public visible = false
  public myTitle = "添加字典项"
  public saveData = {}
  private edittableData = []
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
  }
  private id = ""
  private dictKey = ""
  private value = ""

  private refsel: any = null
  beforeCreate() {
    this.form = this.$form.createForm(this)
  }
  created() {
    const val = {
      page: this.page.currentPage,
      size: this.page.pageSize
    }
    this.getList(val)
  }
  mounted() {
    this.Height = `${document.documentElement.clientHeight - 240}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 240}px`
    })
  }
  private pagerchange({ currentPage, pageSize }) {
    this.page.currentPage = currentPage
    this.page.pageSize = pageSize
    const val = {
      page: currentPage,
      size: pageSize
    }
    this.getList(val)
  }
  private getList(val: any): void {
    this.getData.getList(val, true).then((res: any) => {
      this.tabData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
  private tableRowClassName(record: any) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private editRowEvent(row) {
    this.refsel = this.$refs.editTable as any
    row.isedit = true
    const edittable = this.$refs.editTable as any
    edittable.setActiveRow(row)
  }

  private async saveRowEvent(row) {
    const edittable = this.$refs.editTable as any
    edittable.validate(row).then((err) => {
      if (!err) {
        edittable.clearActived()
        row.isedit = false
        let obj = this.edittableData.filter((item) => item.id === row.id)
        delete obj[0]["isedit"]
        delete obj[0]["dictItems"]
        this.getData.saveedittable(...obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.getData.getdetails(this.dictKey).then((res) => {
              this.edittableData = res.data
              this.addstate = true
            })
          } else {
            this.$message.error(res.msg)
            this.editRowEvent(row)
          }
        })
      }
    })
  }
  private cancelRowEvent(row) {
    if (row.id == "") {
      this.edittableData.shift()
    }
    row.isedit = false
    const edittable = this.$refs.editTable as any
    edittable.clearActived().then(() => {
      // 还原行数据
      edittable.revertData(row)
      this.addstate = true
    })
  }
  private dltRowEvent(row) {
    console.log(row)
    this.getData.dltdelete(row.id).then((res) => {
      console.log(res)
      if (res.code === 0) {
        this.$message.success(res.msg)
        this.getData.getdetails(this.dictKey).then((res) => {
          res.data.map((item) => {
            item.isedit = false
          })
          this.edittableData = res.data
        })
      }
    })
  }
  private edit(val: any): void {
    this.dictKey = val.dictKey
    this.value = val.value
    this.visible = true
    this.myTitle = "编辑"
    this.id = val.id
    this.getData.getdetails(val.dictKey).then((res) => {
      res.data.map((item) => {
        item.isedit = false
      })
      this.edittableData = res.data
    })
  }
  private addstate = true
  private addtable() {
    let obj = {
      dictKey: "",
      id: "",
      parentKey: this.dictKey,
      sort: "",
      value: "",
      isedit: true
    }
    if (this.addstate) {
      this.editRowEvent(obj)
      this.edittableData.unshift(obj)
      this.addstate = false
    } else {
      this.cancelRowEvent(obj)
      this.$message.warning("仅支持单次添加")
    }
  }

  private validRules = {
    dictKey: [
      { required: true, message: "必填项不能为空" },
      { validator: this.dictKeyValid }
    ],
    value: [
      { required: true, message: "必填项不能为空" },
      { validator: this.dictKeyValid }
    ],
    sort: [{ validator: this.sortValid }]
  }
  private dictKeyValid({ cellValue }) {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (cellValue && cellValue.length > 30) {
          reject(new Error("长度在30个字符之内"))
        } else {
          resolve()
        }
      }, 100)
    })
  }
  private sortValid({ cellValue }) {
    return new Promise<void>((resolve, reject) => {
      const reg = /^\d+$|^\d+[.]?\d+$/
      setTimeout(() => {
        if (cellValue && cellValue.length > 3) {
          reject(new Error("长度在3字符之内"))
        } else if (cellValue.length === 0) {
          resolve()
        } else if (!reg.test(cellValue)) {
          reject(new Error("只能输入正整数"))
        } else {
          resolve()
        }
      }, 100)
    })
  }
  public cancelevent() {
    const val = {
      page: 1,
      size: 15
    }
    this.getList(val)
    console.log( this.edittableData);
    this.cancelRowEvent(this.edittableData[0])
    // this.edittableData.shift()
  }
}
</script>

<style lang="less" scope>
#Dictionary {
  width: 100%;
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
#Dictionary .ant-table-tbody > tr > td {
  padding: 8px 16px;
}
#Dictionary{
   .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
}
#Dictionary .ant-dropdown-link {
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
.myAM {
  .ant-modal-footer {
    display: none;
  }
}
.upData,
.upData:hover {
  background: #0db8df;
  color: #ffffff;
}
.content {
  margin: 15px 25px 0;
}
#Dictionary .ant-table-thead .pd10 {
  padding: 8px 16px;
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
.mr10 {
  margin-right: 10px;
}
.editmodal_header {
  > h2 {
    font-size: 16px;
    color: #333;
    font-weight: 600;
    margin: 0;
    line-height: 32px;
  }
  > div {
    display: flex;
    // justify-content:
    > h3 {
      width: 50%;
      font-size: 14px;
      color: #333;
      margin: 0;
      text-indent: 60px;
    }
  }
}
.editmodal_content {
  margin-top: 10px;
  h2 {
    font-size: 16px;
    color: #333;
    margin: 0;
    font-weight: 600;
    line-height: 32px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  // .vxe-table{
  //   width: 100%;
  // }
  .vxe-table--body,
  .vxe-table--header-wrapper .body--wrapper {
    width: 100%;
  }
  .vxe-button + .vxe-button,
  .vxe-button + .vxe-button--dropdown,
  .vxe-input + .vxe-button,
  .vxe-input + .vxe-button--dropdown {
    margin-left: 5px;
  }
}
.btnspan {
  color: #4d96ca;
  cursor: pointer;
  display: inline-block;
}
</style>
