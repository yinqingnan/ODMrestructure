<template>
  <div>
    <div class="Recordingheader">
      <a-button
        type="primary"
        v-isshow="'lawarchives:storageCategory:save'"
        @click="Recordingadd"
      >添加</a-button>
    </div>
    <div :style="{height:Height}" class="Recording">
      <vxe-table
        border
        resizable
        show-header-overflow
        height="auto"
        :data="tableData"
        highlight-hover-row
        :row-class-name="tableRowClassName"
        class="mytable-scrollbar"
      >
        <vxe-table-column type="seq" width="60" title="序号" align="center" />
        <vxe-table-column field="name" title="类别名称" align="center" min-width="180px" />
        <vxe-table-column field="storageTime" title="已上传文件存储时间(天)" min-width="120px" align="center">
          <template v-slot="{ row }">{{filetime(row.storageTime)}}</template>
        </vxe-table-column>
        <vxe-table-column
          field="stationStorageTime"
          title="采集站文件存储时间(天)"
          min-width="120px"
          align="center"
        >
          <template v-slot="{ row }">{{caijizhantime(row.stationStorageTime)}}</template>
        </vxe-table-column>
        <vxe-table-column field="remark" title="备注" align="center" min-width="200px" />
        <vxe-table-column
          field="isDefault"
          title="操作"
          align="center"
          min-width="120px"
          fixed="right"
        >
          <template v-slot="{ row }" class="anniu">
            <span
              v-isshow="'lawarchives:storageCategory:update'"
              @click="tablebtn(row)"
              v-if="!row.isDefault"
              style="color:#0db8df;margin-rgiht:8px"
            >编辑</span>
            <span
              @click="tabledlt(row)"
              v-if="!row.isDefault"
              v-isshow="'lawarchives:storageCategory:delete'"
              style="color:#0db8df"
            >删除</span>
          </template>
        </vxe-table-column>
      </vxe-table>
      <!-- <p>
        <vxe-pager
          align="right"
          size="mini"
          :page-sizes="[15, 50, 100, 200]"
          :current-page.sync="page.currentPage"
          :page-size.sync="page.pageSize"
          :total="page.totalResult"
          @page-change="pagerchange"
        />
      </p> -->
    </div>
    <a-modal
      v-model="visible"
      :title="title"
      ok-text="提交"
      cancel-text="取消"
      @ok="hideModal"
      @cancel="reset"
    >
      <a-form
        autocomplete="off"
        :form="form"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 14 }"
        @submit="handleSubmit"
      >
        <a-form-item label="类别名称">
          <a-input
            v-decorator="['user', { initialValue: '', rules: [{
                      required: true,
                      message: '必填项不能为空！',
                    }] }]"
            :max-length="LimitInputlength"
            placeholder="请输入类别名称"
          >/></a-input>
        </a-form-item>
        <a-form-item label="已上传文件存储时间">
          <a-select
            mode="combobox"
            v-decorator="[
                        'storageTime',
                        {
                          initialValue: '',
                          rules: [{
                      required: true,
                      message: '必填项不能为空！',
                    },{validator:timeselect}]
                        }
                      ]"
            :allow-clear="true"
            style="width: 100%"
            placeholder="请选择..."
          >
            <a-select-option v-for="d in storageTime" :key="d.value">{{ d.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <!-- 添加 mode="combobox"   ，即可对下拉框进行搜索  -->
        <a-form-item label="采集站文件存储时间">
          <a-select
            mode="combobox"
            v-decorator="[
                        'stationStorageTime',
                        {
                          initialValue: '',
                          rules: [{
                      required: true,
                      message: '必填项不能为空！',
                    },{validator:timeselect}]
                        }
                      ]"
            :allow-clear="true"
            style="width: 100%"
            placeholder="请选择..."
          >
            <a-select-option v-for="d in storageTime" :key="d.value">{{ d.title }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="备注" class="textareatext">
          <a-textarea
            :maxLength="textarealength"
            allowClear
            rows="4"
            style="resize: none;"
            placeholder="请输入备注（200字符以内）"
            v-decorator="[
                        'remarks',
                        {
                          initialValue: '',
                          rules: []
                        }
                      ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import {
  LimitInputlength,
  textarealength,
  page,
  pagesize,
} from "@/InterfaceVariable/variable"
import { Component, Vue } from "vue-property-decorator"
@Component({})
export default class Recording extends Vue {
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  private Height = ""
  private pagesize = pagesize
  private tableData = []
  public form!: any
  public title = ""
  private visible = false
  private page= {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private storageTime = [
    { id: '0', value: "0", title: "永久保存" },
    { id: '30', value: "30", title: "30" },
    { id: '90', value: "90", title: "90" },
    { id: '180', value: "180", title: "180" },
    { id: '365', value: "365", title: "365" },
  ]
  private created() {
    this.form = this.$form.createForm(this)
  }
  private mounted() {
    this.Height = `${document.documentElement.clientHeight - 200}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 200}px`
    })
    this.getdata()
  }
  public getdata() {
    this.DataM.getStoragetable({
      page: this.page.currentPage,
      limit: this.page.pageSize,
    }).then((res) => {
      console.log(res)
      this.tableData = res.data
      this.page.totalResult = res.data.length
    })
  }
  private reset() {
    this.form.resetFields()
  }
  private tablebtn(row) {
    console.log(row)
    this.id = row.id
    this.visible = true
    this.title = "编辑"
    this.$nextTick(() => {
      this.form.setFieldsValue({
        user: row.name,
        storageTime: row.storageTime_Name,
        stationStorageTime: row.stationStorageTime_Name,
        remarks: row.remark,
      })
    })
  }
  private tabledlt(row) {
    console.log(row.id)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: "删除类别后，标记为该类别的所有文件将恢复默认设置。",
      onOk() {
        console.log(123)
        _that.DataM.storetypedlt([row.id]).then((res) => {
          console.log(res)
          if (res.code == 1) {
            _that.$message.error(res.msg)
          } else {
            _that.$message.success(res.msg)
            _that.getdata()
          }
        })
      },
    })
  }
  private hideModal(e) {
    e.preventDefault()
    this.handleSubmit()
  }
  private Recordingadd() {
    this.visible = true
    this.title = "添加"
    this.id = ''
  }
  public id = ''
  private handleSubmit() {
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        let obj = {
            id: this.id,
            name: val.user,
            stationStorageTime: val.stationStorageTime,
            storageTime: val.storageTime,
            remark: val.remarks,
        }
        if (this.title == "添加") {
          this.DataM.storetypesave(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.visible = false
              this.reset()
              this.getdata()
            }else{
              this.$message.error(res.msg)
            }
          })
        }else{
          this.DataM.storetypedeit(obj).then(res=>{
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.visible = false
              this.reset()
              this.getdata()
            }else{
              this.$message.error(res.msg)
            }
          })
        }
      }
    })
  }
  private timeselect(rule , value, callback){
    let reg = new RegExp((/(^[0-9]\d*$)/))
    console.log(value)
    console.log(reg.test(value))
    if(!reg.test(value)){
      callback("只能输入（0-9999之间）整数")
    }else if(parseInt(value) > 9999){
      callback("只能输入（0-9999之间）整数")
    }else{
      callback()
    }
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private filetime(val) {
    if (val == 0) {
      return "永久保存"
    } else {
      return val
    }
  }
  private caijizhantime(val) {
    if (val == 0) {
      return "永久保存"
    } else {
      return val
    }
  }
  //   private pagerchange({ currentPage, pageSize }) {
  //   this.page.currentPage = currentPage
  //   this.page.pageSize = pageSize
  //   this.getdata()
  // }
}
</script>

<style lang="less" scope>
.Recording {
  padding: 0 26px;
  margin-top: 8px;
  textarea {
    resize: none;
  }
  // background: pink;
}
.anniu {
  button {
    color: #61bfee;
  }
}
.Recordingheader {
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: flex-end;
  button {
    margin-top: 14px;
    margin-right: 26px;
  }
}
.vxe-cell {
  display: inline-block;
  span {
    margin-right: 8px;
    cursor: pointer;
  }
}
.textareatext {
  textarea {
    resize: none;
  }
}
</style>
