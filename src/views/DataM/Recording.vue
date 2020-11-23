<template>
  <div>
    <div class="Recordingheader">
      <a-button @click="Recordingadd">添加</a-button>
    </div>
    <div :style="{height:Height}" class="Recording">
      <vxe-table border height="auto" :data="tableData" 
       highlight-hover-row :row-class-name="tableRowClassName" class="mytable-scrollbar"
>
        <vxe-table-column type="seq" width="60" title="序号" align="center" />
        <vxe-table-column field="name" title="类别名称" align="center" min-width="180px" />
        <vxe-table-column
          field="storageTime"
          title="已上传文件存储时间(天)"
          min-width="120px"
          align="center"
        />
        <vxe-table-column
          field="stationStorageTime"
          title="采集站文件存储时间(天)"
          min-width="120px"
          align="center"
        />
        <vxe-table-column field="remark" title="备注" align="center" min-width="200px" />
        <vxe-table-column field="isDefault" title="操作" align="center" min-width="120px" fixed="right">
          <template v-slot="{ row }" class="anniu">
            <span
              @click="tablebtn(row)"
              v-if="!row.isDefault"
              style="color:#0db8df;margin-rgiht:8px"
            >编辑</span>
            <span @click="tabledlt(row)" v-if="!row.isDefault" style="color:#0db8df">删除</span>
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
        />
      </p>
    </div>
    <a-modal
      v-model="visible"
      title="添加"
      ok-text="确认"
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
                    }]
                        }
                      ]"
            :allow-clear="true"
            style="width: 100%"
            placeholder="请选择..."
          >
            <a-select-option v-for="d in storageTime" :key="d.value">{{ d.title }}</a-select-option>
          </a-select>
        </a-form-item>

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
                    }]
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
            placeholder="最大支持输入字数200..."
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
  page
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
  private tableData = []
  public form!: any
  private visible = false
  private page = page
  private storageTime = [
    { id: 1, value: "0", title: "永久保存" },
    { id: 1, value: "30", title: "30" },
    { id: 1, value: "90", title: "90" },
    { id: 1, value: "180", title: "180" },
    { id: 1, value: "365", title: "365" },
  ]
  private created() {
    this.form = this.$form.createForm(this)
  }
  private mounted() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
    this.getdata()
  }
  public getdata() {
    this.DataM.getStoragetable({
      page: 1,
      limit: 15,
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
    this.visible = true
    this.$nextTick(() => {
      this.form.setFieldsValue({
        user: row.name,
        storageTime:row.storageTime_Name,
        stationStorageTime:row.stationStorageTime_Name,
        remarks:row.remark
      });
    });
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
        _that.DataM.storetypedlt([row.id]).then(res=>{
          console.log(res)
          if(res.code == 1){
            _that.$message.error(res.msg)
          }else{
            _that.$message.success(res.msg)
            _that.getdata()
          }
        })
      },
    })
  }
  private hideModal(e) {
    e.preventDefault()
    // console.log("tijiao")
    // this.form.validateFields((err: any, val: any) => {
    //   if (!err) {
    //     console.log(val)
    //   }
    // })
    this.handleSubmit()
  }
  private Recordingadd() {
    this.visible = true
  }
  private handleSubmit() {
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        this.DataM.storetypesave({
          id:"",
          name:val.user,
          stationStorageTime:val.stationStorageTime,
          storageTime:val.storageTime,
          remark:val.remarks
        }).then(res=>{
          console.log(res)
          if(res.code == 1){
            this.$message.error(res.msg)
          }else if(res.code == 0){
            this.$message.success(res.msg)
            this.visible = false
            this.reset()
            this.getdata()
          }
        })
      }
    })
  }
  private tableRowClassName(record: any, index: number) {
     
    return record.rowIndex % 2 === 0 ? "bgF5" : "";
  }
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
.textareatext{
  textarea{
    resize: none;
  }
}
</style>
