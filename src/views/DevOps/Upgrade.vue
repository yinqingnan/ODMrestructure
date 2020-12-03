<template>
  <div>
    <!-- 升级管理 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div
          class="contaninerheader"
          style="padding:12px 25px 0 25px;display:flex;justify-content: flex-end;"
        >
          <div class="accessbtn">
            <a-button type="primary" @click="Uploadpackage" v-isshow="'system:upgrade:save'">上传升级包</a-button>
          </div>
        </div>
        <div class="Simpleprogrambody" :style="{height:Height}">
          <vxe-table
            stripe
            border
            height="auto"
            ref="Acquisitionstation"
            highlight-hover-row
            class="mytable-scrollbar"
            :row-class-name="tableRowClassName"
            :data="tableData"
          >
            <vxe-table-column type="seq" width="60" align="center" title="序号" />
            <vxe-table-column
              field="upgradeType"
              title="升级类型"
              show-overflow
              align="center"
              minWidth="160"
            >
              <template v-slot="{ row }">{{upgradeType(row)}}</template>
            </vxe-table-column>
            <vxe-table-column
              field="softwareType"
              title="软件类型"
              show-overflow
              align="center"
              minWidth="160"
            >
              <template v-slot="{ row }">{{softwareType(row)}}</template>
            </vxe-table-column>
            <vxe-table-column
              field="version"
              title="版本号"
              show-overflow
              align="center"
              minWidth="290"
            />
            <vxe-table-column
              field="updateContent"
              title="更新内容"
              show-overflow
              align="center"
              minWidth="350"
            />
            <vxe-table-column
              field="updateFile"
              title="更新文件名"
              show-overflow
              align="center"
              minWidth="130"
            />
            <vxe-table-column
              field="updatePath"
              title="更新文件路径"
              show-overflow
              align="center"
              minWidth="290"
            />
            <vxe-table-column field="modifyTime" title="上传时间" align="center" width="180" />
            <vxe-table-column title="操作" align="center" fixed="right" width="180">
              <template v-slot="{ row }">
                <span @click="edit(row)" style="color:#4d96ca;cursor:pointer;margin-right:8px" v-isshow="'system:upgrade:update'">编辑</span>
                <span @click="dlt(row.id)" style="color:#4d96ca;cursor:pointer;" v-isshow="'system:upgrade:delete'">删除</span>
              </template>
            </vxe-table-column>
          </vxe-table>
          <p>
            <vxe-pager
              align="right"
              size="mini"
              :layouts="layouts"
              :page-sizes="[15, 50, 100, 200]"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              @page-change="pagerchange"
            />
          </p>
        </div>
      </div>
      <a-modal
        v-model="visible"
        :title="str"
        @ok="Upgrade"
        class="quxiao"
        @cancel="handleCancel"
        okText="提交"
        :width="640"
      >
        <a-form
          autocomplete="off"
          :form="form"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 14 }"
          @submit="Upgrade"
        >
          <a-row :gutter="24">
            <a-col :span="12">
              <a-form-item label="升级类型">
                <a-select
                  v-decorator="[
                        'upgradeType',
                        {
                          initialValue: '1',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in Acquisitionlist" :key="d.value">{{ d.title }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item label="软件类型">
                <a-select
                  v-decorator="[
                        'softwareType',
                        {
                          initialValue: '1',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请选择..."
                >
                  <a-select-option v-for="d in typelist" :key="d.value">{{ d.title }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="rowstyle">
            <a-col :span="24">
              <a-form-item label="版本号">
                <a-input
                  v-decorator="[
                'version',
                {
                initialValue: '',
                rules: [{ required: true, message: '必填项不能为空' },
                { validator: (rule, val, callback) => {
                var pattern = new RegExp(/\d/)
                if (!pattern.test(val)){
                callback('必须包含数字');
                }else {
                  callback();
                }
                  callback();
                },
                }]
                }
                ]"
                  :allow-clear="true"
                  style="width: 100%"
                  placeholder="请输入版本号"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="rowstyle">
            <a-col :span="24">
              <a-form-item label="更新内容">
                <a-textarea
                  style="resize:none;"
                  v-decorator="[
                        'updateContent',
                        {
                          initialValue: '',
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                  :allow-clear="true"
                  placeholder="请输入更新内容"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="24" class="rowstyle flie">
            <a-col :span="24">
              <a-form-item label="选择文件">
                <a-upload
                  accept=".zip"
                  @change="handleChange"
                  :before-upload="beforeUpload"
                  v-decorator="[
                        'file',
                        {
                          initialValue: this.fileList,
                          rules: [{ required: true, message: '必填项不能为空' }]
                        }
                      ]"
                >
                  <a-button @click="filebtn">
                    <a-icon type="upload" />选择文件上传
                  </a-button>
                </a-upload>
                <h2 class="filename">{{filename}}</h2>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { layouts, LimitInputlength, page } from "@/InterfaceVariable/variable"
import axios from "axios"
import { http } from "../../api/interceptors"

@Component({
  components: {},
})
export default class Upgrade extends Vue {
  // todo 变量
  [x: string]: any
  public form!: any
  public Luckmanagement = new this.$api.configInterface.Luckmanagement()
  private LimitInputlength = LimitInputlength
  private Height = ""
  private str = "上传升级包"
  private http = http
  private path = ""
  private Acquisitionlist = [
    { id: "0", value: "1", title: "柜式采集站" },
    { id: "0", value: "2", title: "便携式采集站" },
  ]
  private status = true
  private typelist = [
    { id: "0", value: "1", title: "前端软件" },
    { id: "0", value: "2", title: "后端软件" },
  ]
  private headers = {
    authorization: "authorization-text",
  }

  private layouts = layouts
  private visible = false
  private page = page
  private filename = ""
  private fileList = []
  private id = ""
  private tableData = []
  // todo 生命周期
  private created() {
    this.Height = `${document.documentElement.clientHeight - 230}px`
    this.form = this.$form.createForm(this)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  private mounted() {
    let obj = {
      page: 1,
      limit: 15,
    }
    this.gettabledata(obj)
    // this.getdata()
  }
  // todo 事件
  private Uploadpackage() {
    this.visible = true
  }
  private tableRowClassName(record: any) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private pagerchange({ currentPage, pageSize }) {
    console.log(currentPage, pageSize)

    let obj = {
      page: currentPage,
      limit: pageSize,
    }
    this.gettabledata(obj)
  }
  private upgradeType(d): string {
    if (d.upgradeType == "1") {
      return "柜式采集站"
    }
    if (d.upgradeType == "2") {
      return "便携式工作站"
    }
    if (d.upgradeType == "3") {
      return "子平台"
    }
  }
  private softwareType(d): string {
    if (d.softwareType == "1") {
      return "前端软件"
    }
    if (d.softwareType == "2") {
      return "后端软件"
    }
  }
  private edit(row) {
    console.log(row)
    this.visible = true
    this.id = row.id
    this.status = false
    this.path = row.updatePath
    this.filename = row.updateFile
    this.$nextTick(() => {
      this.form.setFieldsValue({
        version: row.version,
        upgradeType: row.upgradeType + "",
        softwareType: row.softwareType + "",
        updateContent: row.updateContent,
        file: [
          {
            uid: "-1",
            name: "xxx.png",
            status: "done",
          },
        ],
      })
    })
  }
  private dlt(row) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    this.$confirm({
      title: "提示",
      content: "确定要删除该升级包吗？",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
          _that.Luckmanagement.Uploaddlt({ id: row }).then((res) => {
            console.log(res)
            if (res.code == 0) {
              _that.$message.success(res.msg)
              let obj = {
                page: 1,
                limit: 15,
              }
              _that.gettabledata(obj)
            } else {
              _that.$message.error(res.msg)
            }
          })
        }).catch(() => console.log("Oops errors!"))
      },
    })
  }
  private beforeUpload(file) {
    console.log(file)
    this.fileList = []
    if (file.type == "application/zip") {
      this.fileList = [file]
      this.filename = file.name
    } else {
      this.$message.error("文件类型错误")
      this.fileList = []
    }
    return false
  }
  private handleChange(info) {
    // this.form.resetFields()
    // this.$nextTick(() => {
    //   this.form.setFieldsValue({
    //     file: info,
    //   })
    // })
  }

  private Upgrade(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val.file)
        if (this.status) {
          // eslint-disable-next-line no-irregular-whitespace
          let formData = new FormData() //保存文件后再保存
          formData.append("file", val.file.file)
          axios
            .post(this.http + "api/mdm/system/upgrade/uploadFile", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Token: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              let path = res.data
              let obj = {
                id: this.id,
                path: path,
                softwareType: val.softwareType,
                updateContent: val.updateContent,
                upgradeType: val.upgradeType,
                version: val.version,
              }
              this.Luckmanagement.Uploadsave(obj).then((res) => {
                if (res.code == 0) {
                  this.$message.success(res.msg)
                  this.filename = ""
                  this.form.resetFields()
                  this.visible = false
                  let obj = {
                    page: 1,
                    limit: 15,
                  }
                  this.gettabledata(obj)
                } else {
                  this.$message.error(res.msg)
                }
              })
            })
        } else {
          console.log("编辑保存")
          let obj = {
            id: this.id,
            path: this.path,
            softwareType: val.softwareType,
            updateContent: val.updateContent,
            upgradeType: val.upgradeType,
            version: val.version,
          }
          console.log(obj)

          this.Luckmanagement.Uploadsave(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success(res.msg)
              this.filename = ""
              this.form.resetFields()
              this.visible = false
              let obj = {
                page: 1,
                limit: 15,
              }
              this.gettabledata(obj)
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      }
    })
  }
  private handleCancel() {
    this.filename = ""
  }
  private filebtn() {
    this.status = true
  }

  // todo 数据请求

  private gettabledata(obj) {
    this.Luckmanagement.getUpgradeMtable(obj).then((res) => {
      console.log(res)
      this.tableData = res.data
      this.page.totalResult = parseInt(res.count)
    })
  }
}
</script>

<style lang="less" scope>
.accessbtn {
  float: right;
  line-height: 1;
  button:nth-of-type(1) {
    margin-right: 8px;
  }
}
.rowstyle .ant-form-item-label {
  width: 90px;
}
.rowstyle .ant-form-item-control-wrapper {
  width: 480px;
}
.ant-upload-list {
  display: none !important;
}
.filr {
  position: relative;
}
.filename {
  position: absolute;
  top: -12px;
  right: -220px;
  font-size: 14px;
}
</style>
