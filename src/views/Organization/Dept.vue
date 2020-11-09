<template>
  <div id="Dept">
    <div class="box">
      <div class="header">
        <div class="select">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              筛选<a-icon type="down" />
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
                  <a-button class="reset">
                    重置
                  </a-button>
                  <a-button html-type="submit" class="upData">
                    查询
                  </a-button>
                </a-form-item>
              </a-form>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="btnList">
          <a-button class="upData mr10" @click="Export">导入</a-button>
          <a-button class="upData mr10" @click="Export">导出</a-button>
          <a-button class="upData" @click="add">添加</a-button>
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
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'haveChild'}"
        >
          <el-table-column
            fixed="left"
            type="index"
            width="50"
            label="序号"
          />
          <el-table-column
            prop="name"
            label="部门名称"
            width="240"
          />
          <el-table-column
            prop="code"
            label="部门编号"
            width="240" 
          />
          <el-table-column
            prop="contact"
            label="联系人"
            width="100"
          />
          <el-table-column
            prop="phone"
            label="联系电话" 
            width="240"
          />
          <el-table-column
            prop="remark"
            label="部门描述" 
            width="300"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="300"
          >
            <template slot-scope="scope">
              <el-button @click="addS(scope.row)" type="text">添加子部门</el-button>
              <el-button @click="edit(scope.row)" type="text">编辑</el-button>
              <el-button type="text" @click="remove(scope.row.deptId)">删除</el-button>
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
              <a-form-item label="联系人" style="margin-left:4px;" :label-col="myTab.labelCol" :wrapper-col="myTab.wrapperCol">
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios'
@Component({
      components: {}
})
export default class Dept extends Vue {
  [x: string]: any;
  public getData = new this.$api.configInterface.Dept();
  public tableProxy = {}
  public myTitle = '添加';
  public visible = false;
  public isNew = true;
  public treeData = [];
  public myTab = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  public pagination = {
        pageSize: 1000, // 默认每页显示数量
        current: 1, //显示当前页数
        total: 0,
        showSizeChanger: false, // 显示可改变每页数量
        showQuickJumper: false, //显示跳转到输入的那一页
        showTotal: (total: number) =>
              `共 ${total} 条记录 第 ${this.pagination.current} / ${Math.ceil(
                    total / this.pagination.pageSize
              )} 页` // 显示总数
  };
  public tabData = [];
  public columns = [
    {
      title: "序号",
      className: "pd10",
      width: 65,
      field: "index",
      fixed: "left",
      scopedSlots: { customRender: "index" }
    },
    {
      title: "部门名称",
      field: "name",
      className: "pd10",
      treeNode: true
    },
    {
      title: "部门编号",
      field: "code",
      className: "pd10"
    },
    {
      title: "联系人",
      field: "contact",
      className: "pd10"
    },
    {
      title: "联系电话",
      field: "phone",
      className: "pd10"
    },
    {
      title: "部门描述",
      field: "remark",
      className: "pd10"
    },
    {
      title: "操作",
      key: "operation",
      scopedSlots: { customRender: "operation" },
      className: "pd10",
      width: 200,
      fixed: "right"
    }
  ];
  public saveID = '';
  private form: any;
  private form2: any;
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form2 = this.$form.createForm(this);
  }
  created() { 
    const val = {
      parentCode: "parent_top",
      name_like: '',
      code_like: ''
    };
    const obj = {
      isTop: true,
      notPlatform: true
    };
    this.getList(val);
    this.getSelect(obj)
  }
  private fillterFUN(searchVal: string, treeNode: any){
    return treeNode.data.props.name.includes(searchVal)
  }
  private load(tree, treeNode, resolve) {
    // console.log(tree, treeNode, resolve)
    const val = {
      parentCode: tree.code
    }
    this.getData.getList(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      resolve(res.data)
    });
    
  }
  private getList(val: any): void {
    this.getData.getList(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.isNew = false;
      setTimeout(()=>{
        this.isNew = true;
        this.tabData = res.data;
        this.pagination.total = res.pages * 1;
      })
    });
  }
  private getSelect(val: any) {
    this.getData.getSelect(val, true).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.treeData = res.data;
    });
  }
  private handleSubmit(e: any): void {
    e.preventDefault();
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        const obj = {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          name_like: val.name_like,
          code_like: val.code_like
        };
        this.getList(obj);
      }
    });
  }
  private addS(val: any) {
    this.visible = true;
    this.myTitle = "添加子部门";
    this.$nextTick(()=> {
      this.form2.setFieldsValue({
        parentCode: val.code,
      });
    })
  }
  private Export(e: any): void {
        console.log(e)
  }
  private remove(id: string): void {
    const data = id;
    axios.post('http://192.168.10.75:8100/api/uauth/base/dept/delete', id ,{headers: { token: localStorage.getItem("token") },}).then((res) => {
      console.log(res)
    })
    // this.getData.removeID(data, true).then((res: any) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   const val = {
    //     parentCode: "parent_top",
    //     name_like: '',
    //     code_like: ''
    //   };
    //   const obj = {
    //     isTop: true,
    //     notPlatform: true
    //   };
    //   this.getList(val);
    //   this.getSelect(obj)
    // });
  }
  private add(e: any): void {
    this.visible = true;
    this.myTitle = "添加公告";
  }
  private handleOk(e: any) {
    e.preventDefault();
    this.form2.validateFields((err: any, val: any) => {
      if (!err) {
        const obj = {
          code: val.code,
          contact: val.contact,
          name: val.name,
          parentCode: val.parentCode,
          phone: val.phone,
          remark: val.remark,
          id: this.saveID
        }
        this.getData.saveVal(obj, true).then((res: any) => {
          if(res.code == 0) {
            this.visible = false;
            const val = {
              parentCode: "parent_top",
              name_like: '',
              code_like: ''
            };
            const obj = {
              isTop: true,
              notPlatform: true
            };
            this.getList(val);
            this.getSelect(obj);
            this.saveID = '';
          }
        });
      }
    });
  }
  private back() {
    this.form2.resetFields();
  }
  private healthyTableChange(pagination: {
    pageSize: number
    current: number
  }) {
    this.pagination.pageSize = pagination.pageSize;
    this.pagination.current = pagination.current;
    // const obj = {
    //   page: this.pagination.current,
    //   limit: this.pagination.pageSize
    // };
    // this.getList(obj);
  }
  private rowClassName(record: any, index: number): string {
        return index % 2 === 0 ? "bgF5" : "";
  }
  private edit(val: any): void{
    this.saveID = val.deptId;
    this.visible = true;
    this.myTitle = "编辑";
    if(val.parentCode == '0000-0000-0000-0000') {
      val.parentCode = '顶级部门'
    }
    this.$nextTick(()=> {
      this.form2.setFieldsValue({
        code: val.code,
        contact: val.contact,
        name: val.name,
        parentCode: val.parentCode,
        phone: val.phone,
        remark: val.remark,
      });
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
.el-table th>.cell {
  color: rgba(0,0,0, 0.85);
  font-weight: normal;
}
</style>
