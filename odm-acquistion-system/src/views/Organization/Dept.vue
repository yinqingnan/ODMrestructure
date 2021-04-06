<template>
  <div id="Dept">
    <div class="box">
      <div class="header">
        <div class="select">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              筛选
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay" class="myW">
              <a-form
                autocomplete="off"
                :form="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                @submit="handleSubmit"
                class="myP"
              >
                <a-form-item label="部门名称" style="width:100%">
                  <a-input
                    v-decorator="[
                      'name_like',
                      {
                        rules: [{ required: false, message: '请输入配置值' }]
                      }
                    ]"
                    placeholder="请输入部门名称"
                  />
                </a-form-item>
                <a-form-item label="部门编号" style="width:100%">
                  <a-input
                    v-decorator="[
                      'code_like',
                      {
                        rules: [{ required: false, message: '请输入配置值' }]
                      }
                    ]"
                    placeholder="请输入部门编号"
                  />
                </a-form-item>
                <a-form-item class="btnBox">
                  <a-button class="reset" @click="reset">重置</a-button>
                  <a-button html-type="submit" class="upData">查询</a-button>
                </a-form-item>
              </a-form>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="btnList">
          <a-button
            type="primary"
            class="upData mr10"
            @click="imports"
            v-isshow="'base:dept:import'"
          >导入</a-button>
          <a-button
            type="primary"
            class="upData mr10"
            @click="Export"
            v-isshow="'base:dept:export'"
          >导出</a-button>
          <a-button type="primary" class="upData" @click="add" v-isshow="'base:dept:save'">添加</a-button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content" :style="{height:Height}">
        <vxe-table
          border
          resizable
          class="mytable-scrollbar"
          ref="depttable"
          height="auto"
          row-id="id"
          :tree-config="{lazy: true, children: 'children', hasChild: 'haveChild', loadMethod: loadChildrenMethod}"
          :data="tabData"
        >
          <vxe-table-column type="seq" title="序号" width="60" align="center" />
          <vxe-table-column
            field="name"
            title="部门名称"
            :tree-node="true"
            show-overflow
            align="center"
            min-width="140"
          />
          <vxe-table-column field="code" title="部门编号" align="center" show-overflow min-width="140" />
          <vxe-table-column
            field="contact"
            title="联系人"
            align="center"
            show-overflow
            min-width="140"
          />
          <vxe-table-column
            field="phone"
            title="联系电话"
            align="center"
            show-overflow
            min-width="140"
          />
          <vxe-table-column
            field="remark"
            title="部门描述"
            align="center"
            min-width="140"
            show-overflow
          />
          <vxe-table-column flxed="right" title="操作" align="center" min-width="180">
            <template v-slot="{ row }">
              <span
                type="text"
                @click="addS(row)"
                v-isshow="'base:dept:savelow'"
                style="color:#0db8df;cursor: pointer;margin-right:10px"
              >添加子部门</span>
              <span
                type="text"
                @click="edit(row)"
                v-isshow="'base:dept:update'"
                style="color:#0db8df;cursor: pointer;margin-right:10px"
              >编辑</span>
              <span
                type="text"
                @click="remove(row)"
                style="color:#0db8df;cursor: pointer;"
                v-isshow="'base:dept:delete'"
              >删除</span>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <!-- 弹出层 -->
      <a-modal
        v-model="visible"
        :title="myTitle"
        @ok="handleOk"
        width="635px"
        wrapClassName="myAM"
        cancelText="取消"
        okText="提交"
        @cancel="back"
        :keyboard='false'
      >
        <a-form :form="form2" @submit="handleSubmit" layout="inline" autocomplete="off">
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="上级部门">
                <a-tree-select
                  show-search
                  style="min-width: 479px"
                  :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                  :tree-data="treeData"
                  placeholder="请选择"
                  :filterTreeNode="fillterFUN"
                  :replaceFields="{
                    children: 'children',
                    title: 'name',
                    key: 'code',
                    value: 'value',
                  }"
                  v-decorator="[
                    'parentCode',
                    {
                      rules: [
                        { required: true, message: '上级部门不能为空' },
                      ],
                      initialValue:'顶级部门'
                    },
                  ]"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="部门名称">
                <a-input
                  style="width: 479px"
                  :max-length="LimitInputlength"
                  v-decorator="[
                    'name',
                    {
                      rules: [{ required: true, message: '请输入部门名称' }],
                    },
                  ]"
                  placeholder="请输入部门名称"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="部门编号">
                <a-input
                  style="width: 479px"
                  :disabled="Disable"
                  :max-length="LimitInputlength"
                  v-decorator="[
                    'code',
                    {
                      rules: [{ required: true, message: '请输入部门编号' },
                      { validator: (rule, val, callback) => {
                var reg = new RegExp('[\u4E00-\u9FA5]+');
                if (reg.test(val)){
                  callback('部门编号格式不正确,必须数字或字母');
                }else {
                  callback();
                }
                  callback();
                }
                }],
                    },
                  ]"
                  placeholder="请输入部门编号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="联系人" style="margin-left:26px;display:flex">
                <a-input
                  :max-length="LimitInputlength"
                  v-decorator="[
                    'contact',
                    {
                      rules: [],
                    },
                  ]"
                  placeholder="请输入联系人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话" style="margin-left:11px;display:flex">
                <a-input
                  :max-length="LimitInputlength"
                  v-decorator="[
                    'phone',
                     {
                      rules: [
                        {validator: phonevalidator}
                      ],
                    },
                  ]"
                  placeholder="请输入联系电话"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item label="部门描述" style="width: 100%;margin-left:11px;">
                <a-textarea
                  style="width: 479px"
                  :max-length="textarealength"
                  v-decorator="[
                    'remark',
                    {
                      rules: [],
                    },
                  ]"
                  placeholder="请输入部门描述（200字符以内）"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>

      <a-modal
        v-model="importshow"
        title="部门导入"
        :width="675"
        class="importmodule"
        @cancel="importclear"
        :keyboard='false'
      >
        <div class="importheader">
          <p>提示：第一次导入的时候请先下载模板，编辑内容后再进行导入操作。</p>
          <div style="display:flex">
            <a-upload :file-list="fileList" :before-upload="beforeUpload" accept=".xls, .xlsx">
              <a-button @click="selectfile">
                <a-icon type="upload" />选择文件上传
              </a-button>
            </a-upload>
            <a-button type @click="downloadtemplate" style="margin-left:9px">下载模板</a-button>
          </div>
          <h2>{{filename||""}}</h2>
        </div>
        <div class="importfooter">
          <div v-if="iserror">
            <a-divider orientation="left" style="color:#919AA6;font-size:12px">失败原因</a-divider>
            <p style="padding:0 36px 0 30px" v-html="errormsg">
            </p>
          </div>
        </div>
        <template slot="footer">
          <a-button type="primary" @click="importben">开始导入</a-button>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import {
  LimitInputlength,
  textarealength,
} from "../../InterfaceVariable/variable"
import axios from "axios"
import { http } from "../../api/interceptors"
import FileSaver from "file-saver"
import XLSX from "xlsx"
@Component({
  components: {},
})
export default class Dept extends Vue {
  [x: string]: any
  public getData = new this.$api.configInterface.Dept()
  private LimitInputlength = LimitInputlength
  private textarealength = textarealength
  public tableProxy = {}
  public myTitle = "添加"
  public visible = false
  public isNew = true
  public treeData = []
  public myTab = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  public Height = ""
  public pagination = {
    pageSize: 1000, // 默认每页显示数量
    current: 1, //显示当前页数
    total: 0,
    showSizeChanger: false, // 显示可改变每页数量
    showQuickJumper: false, //显示跳转到输入的那一页
    showTotal: (total: number) =>
      `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
        total / this.pagination.pageSize
      )} 页`, // 显示总数
  }
  public tabData = []
  public saveID = ""
  private form: any
  private form2: any
  private importshow = false
  private fileList = []
  private iserror = false
  private errormsg = ""
  private filename = ""
  private Disable = false
  private nameLike = ''
  private codeLike = ''
  //todo 生命周期
  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.form2 = this.$form.createForm(this)
  }
  created() {
    const val = {
      parentCode: "parent_top",
      name_like: "",
      code_like: "",
    }
    // const obj = {
    //   isTop: true,
    //   notPlatform: true,
    // }
    this.getList(val)
    // this.getSelect(obj)
    this.Height = `${document.documentElement.clientHeight - 230}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  private loadChildrenMethod({ row }) {
    console.log(row)
    return new Promise((resolve, reject) => {
      const val = {
        parentCode: row.code,
      }
      this.getData.getList(val, true).then((res: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        resolve(res.data)
      })
    })
  }
  private fillterFUN(searchVal: string, treeNode: any) {
    return treeNode.data.props.name.includes(searchVal)
  }
  private getList(val: any): void {
    this.getData.getList(val, true).then((res: any) => {
      this.tabData = res.data
    })
  }
  private getSelect(val: any) {
    this.getData.getSelect(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.treeData = res.data
    })
  }
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
        this.nameLike = val.name_like
        this.codeLike = val.code_like
        const obj = {
          name_like: val.name_like,
          code_like: val.code_like,
        }
        this.getList(obj)
      }
    })
  }
  private reset(){
    this.form.resetFields()
    this.nameLike = ''
    this.codeLike = ''
  }
  private addS(val: any) {
    this.visible = true
    this.myTitle = "添加子部门"
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        parentCode: val.code,
      })
    })
  }
  private Export(e: any): void {
    let url = window.gurl.SERVICE_CONTEXT_PATH
    const obj = {
      name_like:  this.nameLike,
      code_like: this.codeLike,
    }
    
    axios.get(`${url}api/uauth/base/dept/export`,{
      params: obj,
      headers: {
        Token: localStorage.getItem("token"),
      },
      'responseType': 'blob'
    }).then(res => {
      const aLink = document.createElement("a");
      let blob = new Blob([res.data], {type: "application/vnd.ms-excel"})
      if (navigator.msSaveBlob) { // IE10+ 
        window.navigator.msSaveOrOpenBlob(blob,`部门管理.xls`);
      }
      else {
        aLink.href = URL.createObjectURL(blob)
        aLink.setAttribute('download', '部门管理' + '.xls')
        aLink.click()
      }
    })
    // (this.$refs.depttable as any).exportData({
    //   filename: "部门管理",
    //   sheetName: "Sheet1",
    //   type: "xlsx",
    //   message:false,
    // })
  }
  private imports() {
    this.importshow = true
  }
  private selectfile() {
    this.filename = ""
    this.fileList = []
    this.iserror = false
  }
  private importclear() {
    this.filename = ""
    this.fileList = []
    this.iserror = false
  }
  private downloadtemplate() {
    //下载本地文件
    let downloadUrl = `${process.env.BASE_URL}template/部门导入模板.xls`
    window.location.href = downloadUrl
  }
  private beforeUpload(file) {
    if (file.type === "application/vnd.ms-excel") {
      this.filename = file.name
      this.fileList = [file]
      return false
    } else {
      this.$message.error("文件类型错误，仅支持.xls 和 .xlsx 类型的文件")
    }
  }
  private importben() {
    if (this.fileList.length > 0) {
      let formData = new FormData() //保存文件后再保存
      formData.append("file", this.fileList[0])
      axios
        .post(http + "api/uauth/base/dept/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: localStorage.getItem("token"),
          },
        })
        .then((res: any) => {
          let str,str1 = ''
          str = res.data.replace(/%n1/g,"&nbsp;")
          str1 = str.replace(/%n2/g,"<br/>")
          if (res.data == "ok") {
            this.importshow = false
            this.iserror = false
            this.fileList = []
            this.filename = ""
            this.$message.success('导入成功')
          } else {
            this.iserror = true
            this.errormsg = str1
          }
        })
    } else {
      this.$message.error("未选择文件")
    }
  }
  private remove(row): void {
    console.log(row)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: '提示',
      content: `部门删除后无法恢复，确认要删除部门${row.name}吗？`,
      onOk() {
        _that.getData.removeID({ id: row.deptId }).then((res) => {
          console.log(res)
          if (res.code == 0) {
            setTimeout(() =>{
              const val = {
                parentCode: "parent_top",
                name_like: "",
                code_like: "",
              }
              _that.getList(val)
              _that.$message.success(res.msg)
            },200)
          } else {
            _that.$message.error(res.msg)
          }
        })
      }
    });
   
  }
  private add(e: any): void {
    this.visible = true
    this.Disable = false
    this.myTitle = "添加部门"
  }
  private phonevalidator (rule,value,callback){
    let reg = new RegExp('^[0-9]*$')
    if(!value){
      callback()
    }else if(reg.test(value)){
      callback()
    }else{
      callback('必须为数字')
    }
  }
  private handleOk(e: any) {
    e.preventDefault()
    this.form2.validateFields((err: any, val: any) => {
      if (!err) {
        //   var reg = new RegExp('^[0-9]*$')
        let obj = {
          code: val.code,
          contact: val.contact,
          name: val.name,
          parentCode: val.parentCode,
          phone: val.phone,
          remark: val.remark,
          id: this.saveID,
        }
        this.getData.saveVal(obj).then((res: any) => {
          if (res.code == 0) {
            this.visible = false
            this.form2.resetFields()
            const val = {
              parentCode: "parent_top",
              name_like: "",
              code_like: "",
            }
            // const obj = {
            //   isTop: true,
            //   notPlatform: true,
            // }
            setTimeout(() => {
              this.getList(val)
              // this.getSelect(obj)
              this.saveID = ""
            },200);
          }else{
            this.$message.error(res.msg)
          }
        })
        
      }
    })
  }
  private back() {
    this.form2.resetFields()
  }
  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
    this.pagination.pageSize = pagination.pageSize
    this.pagination.current = pagination.current
    // const obj = {
    //   page: this.pagination.current,
    //   limit: this.pagination.pageSize
    // };
    // this.getList(obj);
  }
  private rowClassName(record: any, index: number): string {
    return index % 2 === 0 ? "bgF5" : ""
  }
  private edit(val: any): void {
    this.saveID = val.deptId
    this.visible = true
    this.Disable = true
    this.myTitle = "编辑"
    if (val.parentCode == "0000-0000-0000-0000") {
      val.parentCode = "顶级部门"
    }
    this.$nextTick(() => {
      this.form2.setFieldsValue({
        code: val.code,
        contact: val.contact,
        name: val.name,
        parentCode: val.parentCode,
        phone: val.phone,
        remark: val.remark,
      })
    })
  }
}
</script>

<style lang="less" scope>
#Dept {
  width: 100%;
  height: calc(100% - 30px);
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
#Dept {
  .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #fff;
}
}
#Dept .ant-dropdown-link {
  display: block;
  text-align: center;
  line-height: 30px;
  width: 58px;
  height: 30px;
  border: 1px solid #ccc;
  color: #9ea7b3;
}
#Dept .ant-table-thead .pd10 {
  padding: 8px 16px;
}
.header {
  width: calc(100% - 50px);
  margin: 13px auto 0;
  display: flex;
  justify-content: space-between;
}
.content {
  margin: 15px 25px 0;
}
.mr10 {
  margin-right: 10px;
}
// .upData,.upData:hover,.ant-btn:focus {
//   background: #0db8df;
//   color: #ffffff;
// }
.myW {
  width: 347px;
}
.myP {
  padding: 10px 0;
}
.btnBox {
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
}
.reset {
  margin-right: 10px;
  margin-left: 65px;
}
.el-button--text {
  font-size: 15px;
}
.el-table th > .cell {
  color: rgba(0, 0, 0, 0.85);
  font-weight: normal;
}
.myAM .ant-form-inline.ant-form-item {
  display: flex;
}
.myAM .ant-form-inline .ant-form-item {
  margin-bottom: 0;
  height: 60px;
}
.myAM .ant-modal-body {
  margin-bottom: 24px;
}
.mr10 {
  margin-right: 10px;
}
</style>