<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-02-25 13:51:04
 * @LastEditTime: 2021-05-06 15:00:38
 * @FilePath: \src\views\Device\Systemupgrade.vue
 * @LastEditors: yqn
-->
<template>
  <div>
    <div class="upgrade">
      <div>
        <h2>
          桌面软件当前版本：
          <span>{{pc_version}}</span>
        </h2>
        <h2>
          站点软件当前版本：
          <span>{{web_version}}</span>
        </h2>
      </div>
      <div style="margin-top:26px">
        <div style="margin-bottom:16px">
          <h3>上传桌面软件</h3>
          <a-upload
            :file-list="pc_fileList"
            :before-upload="pc_beforeUpload"
            accept=".zip"
            class="pcupload"
            :remove="pc_handleRemove"
          >
            <a-button @click="pc_selectfile" type="primary" style="margin-right:50px">
              <a-icon type="upload" />选择文件上传
            </a-button>
          </a-upload>
        </div>
        <div>
          <h3>上传站点软件</h3>
          <a-upload
            :file-list="web_fileList"
            :before-upload="web_beforeUpload"
            accept=".zip"
            class="pcupload"
            :remove="web_handleRemove"
          >
            <a-button @click="web_selectfile" type="primary" style="margin-right:50px">
              <a-icon type="upload" />选择文件上传
            </a-button>
          </a-upload>
        </div>
        <a-button type="primary" style="margin-left:165px;margin-top:20px" @click="btnsubmit">提交</a-button>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import axios from "axios"
import { http } from "@/api/interceptors"
@Component({
  components: {}
})
export default class Systemupgrade extends Vue {
  [x: string]: any
  public DeviceM = new this.$api.configInterface.DeviceM()
  public pc_version = ""
  public web_version = ""
  public pc_filename = ""
  public web_filename = ""
  public pc_fileList = []
  public pc_iserror = false
  private web_fileList = []
  private web_iserror = false
  private mounted() {
    this.getversion()
  }
  private getversion() {
    this.DeviceM.getversion().then((res) => {
      this.pc_version = res.data.pc_ver
      this.web_version = res.data.web_ver
    })
  }
  private pc_beforeUpload(file) {
    if (file.type !== "application/x-zip-compressed") {
      this.$message.error("文件类型错误，仅支持.zip 类型的压缩包文件")
      this.pc_filename = ""
      this.pc_fileList = []
      this.pc_iserror = false
    } else if (file.size >= 524288000) {
      this.$message.error("超出文件大小设定值")
      this.pc_filename = ""

      this.pc_fileList = []
      this.pc_iserror = false
    } else {
      this.pc_filename = file.name
      this.pc_fileList = [file]
      this.pc_iserror = true
    }
    return false
  }
  private web_beforeUpload(file) {
    if (file.type !== "application/x-zip-compressed") {
      this.$message.error("文件类型错误，仅支持.zip 类型的压缩包文件")
      this.web_filename = ""
      this.web_fileList = []
      this.web_iserror = false
    } else if (file.size >= 524288000) {
      this.$message.error("超出文件大小设定值")
      this.web_filename = ""
      this.web_fileList = []
      this.web_iserror = false
    } else {
      this.web_filename = file.name
      this.web_fileList = [file]
      this.web_iserror = true
    }
    return false
  }
  private pc_selectfile() {
    this.pc_filename = ""
    this.pc_fileList = []
    this.pc_iserror = false
  }
  private web_selectfile() {
    this.web_filename = ""
    this.web_fileList = []
    this.web_iserror = false
  }
  private pc_handleRemove(file) {
    this.pc_fileList = []
  }
  private web_handleRemove(file) {
    this.web_fileList = []
  }
  private pcupload() {
    const loading = this.$loading({
      lock: true,
      text: "正在上传中",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.5)"
    })

    let formData = new FormData() //保存文件后再保存
    if (this.pc_fileList?.length) {
      formData.append("pcFile", this.pc_fileList[0])
    }
    if (this.web_fileList?.length) {
      formData.append("webFile", this.web_fileList[0])
    }

    axios
      .post(http + "upgrade/workStation", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Token: localStorage.getItem("token")
        }
      })
      .then((res: any) => {
        if (res.data.code == 0) {
          loading.close();
          this.pc_selectfile();
          this.web_selectfile();
          (this.$Loading as any).show("采集设备即将开始升级，升级将持续一段时间，该时间段内采集设备将无法使用，为您带来的不变深感抱歉",{},{background:'#fbfbfb'})
          setTimeout(() => {
            (this.$Loading as any).hide()
          },300000)
        } else {
          this.$message.error(res.data.msg)
          this.pc_selectfile()
          this.web_selectfile()
        }
      })
  }
  private btnsubmit() {
    this.pcupload()
  }
}
</script>


<style lang="less" scope>
.upgrade {
  padding: 16px 0 0 10px;
  p {
    line-height: 30px;
    font-size: 16px;
  }
  h2 {
    padding-left: 18px;
    margin: 0;
    color: #333;
    line-height: 30px;
    span {
      color: #666;
      line-height: 30px;
    }
  }
  div:nth-of-type(2) {
    div {
      height: 36px;
      line-height: 36px;
      display: flex;
      h3 {
        margin: 0;
        line-height: 36px;
        font-size: 16px;
        color: #666;
        padding-left: 18px;
        margin-right: 50px;
      }
    }
  }

}
  .el-loading-spinner .el-loading-text {
    color: #fff !important;
  }
  .el-loading-spinner i{
    font-size:30px
  }
.pcupload {
  display: flex;
  line-height: 1;
  .ant-upload-list {
    width: 300px;
    div:nth-of-type(1) {
      width: 100%;
      > span {
        width: 100%;
      }
    }
  }
  .ant-upload-list-item-info .anticon-loading,
  .ant-upload-list-item-info .anticon-paper-clip {
    top: 12px;
    left: 10px;
  }
  .ant-upload-list-item {
    margin: 0;
  }
  .ant-upload-list-item-info > span {
    width: 100%;
  }
}
</style>