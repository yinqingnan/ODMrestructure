<template>
  <div>
    <div class="Recordingheader">
      <a-button @click="Recordingadd">添加</a-button>
    </div>
    <div :style="{height:Height}" class="Recording">
      <vxe-table border height="auto" :data="tableData">
        <vxe-table-column type="seq" width="60" title="序号" align="center" />
        <vxe-table-column field="name" title="类别名称" align="center" min-width="180px"/>
        <vxe-table-column field="storageTime" title="已上传文件存储事件(天)" min-width="120px" align="center" />
        <vxe-table-column field="stationStorageTime" title="采集站文件存储时间(天)" min-width="120px" align="center" />
        <vxe-table-column field="remark" title="备注" align="center" min-width="200px"/>
        <vxe-table-column field="isDefault" title="操作" align="center" min-width="120px">
          <template v-slot="{ row }" class="anniu" >
            <vxe-button type="text" @click="tablebtn(row)" v-if="!row.isDefault">编辑</vxe-button>
            <vxe-button type="text" @click="tabledlt(row)" v-if="!row.isDefault">删除</vxe-button>
          </template>
        </vxe-table-column>
      </vxe-table>
      <p>
        <vxe-pager
          align="right"
          size="mini"
          :current-page.sync="page2.currentPage"
          :page-size.sync="page2.pageSize"
          :total="page2.totalResult"
        />
      </p>
    </div>
    <a-modal v-model="visible" title="添加" ok-text="确认" cancel-text="取消" @ok="hideModal">
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
                      placeholder="请选择..."
                    >
                      <a-select-option v-for="d in Timetype" :key="d.value">
                        {{ d.title }}
                      </a-select-option>
                    </a-select>
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
                      placeholder="请选择..."
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
                      placeholder="请选择..."
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
    </a-modal>
  </div>
</template>

<script lang="ts">
import { LimitInputlength } from "../../InterfaceVariable/variable"
import { Component, Vue } from "vue-property-decorator"
@Component({})
export default class Recording extends Vue {
  [x: string]: any
  public form!: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private Height = ""
  private tableData = []
  public form!: any;
  private visible = false
  private page2 = {
    currentPage: 1,
    pageSize: 10,
    totalResult: 200,
  }
  private created() {
    this.form = this.$form.createForm(this); 
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
    })
  }
  private tablebtn(row){
    console.log(row)
  }
  private tabledlt(row){
    console.log(row)
    this.$confirm({
      title: '提示',
      content: '删除类别后，标记为该类别的所有文件将恢复默认设置。',
      onOk() {
        console.log()
                    
      },
    });
  }
  private hideModal (){
    console.log("tijiao")
  }
  private Recordingadd(){
    this.visible = true;
  }
  private handleSubmit(e){
    e.preventDefault();
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
      }
    })
  }
}
</script>

<style lang="less" scope>
.Recording {
  padding: 0 26px;
  margin-top: 8px;
  background: pink;
}
.anniu{
  button{
    color: #61bfee;
  }
}
.Recordingheader{
  height: 45px;
  line-height: 45px;
  display: flex;
  justify-content: flex-end;
  button{
    margin-top: 14px;
    margin-right: 26px;
  }
}
</style>
