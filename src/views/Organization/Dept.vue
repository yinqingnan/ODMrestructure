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
                  <a-button class="reset">重置</a-button>
                  <a-button html-type="submit" class="upData">查询</a-button>
                </a-form-item>
              </a-form>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="btnList">
          <a-button class="upData mr10" @click="imports" v-isshow="'base:dept:import'">导入</a-button>
          <a-button class="upData mr10" @click="Export" v-isshow="'base:dept:export'">导出</a-button>
          <a-button class="upData" @click="add" v-isshow="'base:dept:save'">添加</a-button>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content">
        <el-table
          v-if="isNew"
          :data="tabData"
          style="width: 100%"
          row-key="deptId"
          max-height="700"
          border
          lazy
          class="bumen"
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'haveChild'}"
        >
          <el-table-column fixed="left" type="index" width="50" label="序号" />
          <el-table-column prop="name" label="部门名称" width="240" />
          <el-table-column prop="code" label="部门编号" width="240" />
          <el-table-column prop="contact" label="联系人" width="100" />
          <el-table-column prop="phone" label="联系电话" width="240" />
          <el-table-column prop="remark" label="部门描述" width="300" />
          <el-table-column fixed="right" label="操作" width="300">
            <template slot-scope="scope">
              <el-button @click="addS(scope.row)" type="text" v-isshow="'base:dept:savelow'">添加子部门</el-button>
              <el-button @click="edit(scope.row)" type="text" v-isshow="'base:dept:update'">编辑</el-button>
              <el-button type="text" @click="remove(scope.row.deptId)" v-isshow="'base:dept:delete'">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      >
        <a-form :form="form2" @submit="handleSubmit" layout="inline">
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
            <a-col :span="12">
              <a-form-item label="部门名称">
                <a-input
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
            <a-col :span="12">
              <a-form-item label="部门编号">
                <a-input
                  v-decorator="[
                    'code',
                    {
                      rules: [{ required: true, message: '请输入部门编号' }],
                    },
                  ]"
                  placeholder="请输入部门编号"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item
                label="联系人"
                style="margin-left:4px;"
                :label-col="myTab.labelCol"
                :wrapper-col="myTab.wrapperCol"
              >
                <a-input
                  style="width:175px;"
                  v-decorator="[
                    'contact',
                    {
                      rules: [{ required: false, message: '请输入联系人' }],
                    },
                  ]"
                  placeholder="请输入联系人"
                />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="联系电话" style="margin-left:11px;">
                <a-input
                  v-decorator="[
                    'phone',
                    {
                      rules: [{ required: false, message: '请输入联系电话' }],
                    },
                  ]"
                  placeholder="请输入联系电话"
                />
              </a-form-item>
            </a-col>

            <a-col :span="24">
              <a-form-item label="公告内容" style="width: 100%;margin-left:11px;">
                <a-textarea
                  style="width: 479px"
                  v-decorator="[
                    'remark',
                    {
                      rules: [{ required: false, message: '公告内容不能为空' }],
                    },
                  ]"
                  placeholder="请输入公告内容"
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
            <p style="padding:0 36px 0 30px">{{errormsg}}</p>
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
  public tableProxy = {}
  public myTitle = "添加"
  public visible = false
  public isNew = true
  public treeData = []
  public myTab = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
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
  public columns = [
    {
      title: "序号",
      className: "pd10",
      width: 65,
      field: "index",
      fixed: "left",
      scopedSlots: { customRender: "index" },
    },
    {
      title: "部门名称",
      field: "name",
      className: "pd10",
      treeNode: true,
    },
    {
      title: "部门编号",
      field: "code",
      className: "pd10",
    },
    {
      title: "联系人",
      field: "contact",
      className: "pd10",
    },
    {
      title: "联系电话",
      field: "phone",
      className: "pd10",
    },
    {
      title: "部门描述",
      field: "remark",
      className: "pd10",
    },
    {
      title: "操作",
      key: "operation",
      scopedSlots: { customRender: "operation" },
      className: "pd10",
      width: 200,
      fixed: "right",
    },
  ]
  public saveID = ""
  private form: any
  private form2: any
  private importshow = false
  private fileList = []
  private iserror = false
  private errormsg = ""
  private filename = ""
  private errormsg = ""
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
    const obj = {
      isTop: true,
      notPlatform: true,
    }
    this.getList(val)
    this.getSelect(obj)
  }
  private fillterFUN(searchVal: string, treeNode: any) {
    return treeNode.data.props.name.includes(searchVal)
  }
  private load(tree, treeNode, resolve) {
    // console.log(tree, treeNode, resolve)
    const val = {
      parentCode: tree.code,
    }
    this.getData.getList(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve(res.data)
    })
  }
  private getList(val: any): void {
    this.getData.getList(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.isNew = false
      setTimeout(() => {
        this.isNew = true
        this.tabData = res.data
        this.pagination.total = res.pages * 1
      })
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
        const obj = {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          name_like: val.name_like,
          code_like: val.code_like,
        }
        this.getList(obj)
      }
    })
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
    let wb = XLSX.utils.table_to_book(document.querySelector(".bumen"))
    let wbout = XLSX.write(wb, {
      bookType: "xlsx",
      bookSST: true,
      type: "array",
    })
    try {
      FileSaver.saveAs(
        new Blob([wbout], { type: "application/octet-stream" }),
        "部门" + ".xlsx"
      )
    } catch (e) {
      if (typeof console !== "undefined") console.log(e, wbout)
    }
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
        .post(http + "api/mdm/device/matche/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Token: localStorage.getItem("token"),
          },
        })
        .then((res: any) => {
          if (res == "ok") {
            this.importshow = false
            this.iserror = false
            this.fileList = []
            this.filename = ""
          } else {
            this.iserror = true
            this.errormsg = res.data
          }
        })
    } else {
      this.$message.error("未选择文件")
    }
  }
  private remove(id: string): void {
    this.getData.removeID({id:id}).then(res=>{
      if(res.code == 0){
        this.$message.success(res.msg)
        const val = {
              parentCode: "parent_top",
              name_like: "",
              code_like: "",
            }
        this.getList(val)
      }
    })
    
  }
  private add(e: any): void {
    this.visible = true
    this.myTitle = "添加公告"
  }
  private handleOk(e: any) {
    e.preventDefault()
    this.form2.validateFields((err: any, val: any) => {
      if (!err) {
        const obj = {
          code: val.code,
          contact: val.contact,
          name: val.name,
          parentCode: val.parentCode,
          phone: val.phone,
          remark: val.remark,
          id: this.saveID,
        }
        this.getData.saveVal(obj, true).then((res: any) => {
          if (res.code == 0) {
            this.visible = false
            const val = {
              parentCode: "parent_top",
              name_like: "",
              code_like: "",
            }
            const obj = {
              isTop: true,
              notPlatform: true,
            }
            this.getList(val)
            this.getSelect(obj)
            this.saveID = ""
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
  // padding: 15px 0;
  width: 100%;
  height: calc(100% - 30px);
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}
#Dept .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #fff;
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
.upData,
.upData:hover,
.ant-btn:focus {
  background: #0db8df;
  color: #ffffff;
}
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
</style>
