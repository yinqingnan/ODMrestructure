<template>
  <div id="Setting">
    <el-scrollbar :style="{height:Height}">
      <div class="Settingbox">
        <a-row>
          <a-col :span="24">
            <h3 class="fwB">配置信息</h3>
          </a-col>
          <a-col :span="16">
            <a-form
              autocomplete="off"
              :form="form"
              layout="inline"
              :label-col="{ span: 6 }"
              :wrapper-col="{ span: 12 }"
              @submit="handleSubmit"
            >
              <a-row :gutter="24">
                <a-col :span="24">
                  <a-form-item label="采集设备编号" style="width:100%">
                    <a-input
                      v-decorator="[
                      'code'
                    ]"
                      disabled
                      placeholder="请输入采集设备编号"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="采集设备名称" style="width:100%">
                    <a-input
                      style="width:100%"
                      v-decorator="[
                      'name',
                      {
                        rules: [{ required: true, message: '请输入采集设备名称' }]
                      }
                    ]"
                      placeholder="请输入采集设备名称"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="采集设备厂商" style="width:100%">
                    <a-input
                      v-decorator="[
                      'brand'
                    ]"
                      placeholder="请输入采集设备厂商"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="采集设备型号" style="width:100%">
                    <a-input
                      v-decorator="[
                      'model'
                    ]"
                      placeholder="请输入采集设备型号"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="管理员" style="width:100%">
                    <a-input
                      v-decorator="[
                      'manager',
                    ]"
                      placeholder="请输入管理员"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="联系电话" style="width:100%">
                    <a-input
                      v-decorator="[
                      'phone'
                    ]"
                      placeholder="请输入联系电话"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="采集设备位置" style="width:100%">
                    <a-input
                      v-decorator="[
                      'address',{
                        rules: [{ required: true, message: '请输入采集设备位置' }]
                      }
                    ]"
                      placeholder="请输入采集设备位置"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24">
                  <a-form-item label="文件存储周期" style="width:100%" class="storageCycle">
                    <a-input-number
                      :min="0"
                      :max="9999"
                      :disabled="checkNick"
                      v-decorator="[
                      'storageCycle'
                    ]"
                    />
                    <div class="storageCycletext">
                      <h2>天</h2>
                      <h3>可以设置0到9999的整数，0为永久保存。连接上级平台后，该项将由上级平台控制。</h3>
                    </div>
                  </a-form-item>
                </a-col>
                <a-col :span="24" class="aNone">
                  <a-form-item label=" " style="width:100%">
                    <a-checkbox :checked="checkNick" @change="ckChange">连接上级平台</a-checkbox>
                  </a-form-item>
                </a-col>
                <a-col :span="24" v-if="openC">
                  <a-form-item label="部门编号" style="width:100%">
                    <a-input
                      v-decorator="[
                      'deptCode',
                      {
                        rules: [{ required: true, message: '请输入部门编号' }]
                      }
                    ]"
                      placeholder="请输入部门编号"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24" v-if="openC">
                  <a-form-item label="接入密钥" style="width:100%">
                    <a-input
                      v-decorator="[
                      'accessKey',
                      {
                        rules: [{ required: true, message: '请输入接入密钥' }]
                      }
                    ]"
                      placeholder="请输入接入密钥"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24" v-if="openC">
                  <a-form-item label="上级平台IP" style="width:100%">
                    <a-input
                      v-decorator="[
                      'cloudIp',
                      {
                        rules: [ { validator: ipvalidator},{required:true,message: '请输入上级平台IP'}],
                        validateTrigger:'blur',
                      }
                    ]"
                      placeholder="请输入上级平台IP"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24" v-if="openC">
                  <a-form-item label="上级平台端口号" style="width:100%">
                    <a-input
                      v-decorator="[
                      'cloudPort',
                      {
                        rules: [{ required: true, message: '请输入上级平台端口号' },{validator:protvalidator}],validateTrigger: 'blur'
                      }
                    ]"
                      placeholder="请输入上级平台端口号"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24" v-if="openC" style="display:flex">
                  <a-form-item label="自动上传时间" style="width:100%;" class="StartEndTime">
                    <el-time-select
                      placeholder="起始时间"
                      v-model="startTime"
                      :picker-options="{
                      start: '00:00',
                      step: '00:10',
                      end: '23:50'
                    }"
                    />一
                    <el-time-select
                      placeholder="结束时间"
                      v-model="endTime"
                      :picker-options="{
                      start: '00:30',
                      step: '00:05',
                      end: '23:50',
                      minTime: startTime
                    }"
                    />
                  </a-form-item>
                </a-col>
                <a-col :span="24" :style="{ textAlign: 'center' }" class="aNone">
                  <a-form-item label=" " style="width:100%">
                    <a-button
                      html-type="submit"
                      class="upData"
                      v-isshow="'core:workStation:save'"
                    >提交</a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-col>
        </a-row>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import moment from "moment"
@Component({
  components: {}
})

export default class RightContent extends Vue {
  [x: string]: any
  public getData = new this.$api.configInterface.Setting()
  public form: any
  public openC = false
  public saveData: any
  public saveID: string
  public Height = ""
  public startTime = ""
  public endTime = ""
  private moment = moment
  private checkNick = false
  private fullscreenLoading = false
  beforeCreate() {
    this.form = this.$form.createForm(this)
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  created() {
    this.getSet()
    this.Height = `${document.documentElement.clientHeight - 160}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 160}px`
    })
  }
  private ckChange(e: { target: { checked: boolean } }): void {
    this.checkNick = e.target.checked
    this.openC = e.target.checked
    if (this.checkNick) {
      this.getSet()
    }
  }
  public currentState = false
  private getSet() {
    this.getData.getSetting({}, true).then((res) => {
      this.saveID = res.data.id
      this.currentState = res.data.openCloud
      if (res.data.openCloud) {
        this.openC = true
        this.checkNick = true
        this.$nextTick(() => {
          this.form.setFieldsValue({
            code: res.data.code,
            name: res.data.name,
            brand: res.data.brand,
            model: res.data.model,
            phone: res.data.phone,
            manager: res.data.manager,
            address: res.data.address,
            storageCycle: res.data.storageCycle,
            accessKey: res.data.accessKey,
            cloudIp: res.data.cloudIp,
            cloudPort: res.data.cloudPort,
            deptCode: res.data.deptCode
          })
          this.endTime = res.data.uploadTime.split("~")[1]
          this.startTime = res.data.uploadTime.split("~")[0]
        })
      } else {
        this.$nextTick(() => {
          this.form.setFieldsValue({
            code: res.data.code,
            name: res.data.name,
            brand: res.data.brand,
            model: res.data.model,
            phone: res.data.phone,
            manager: res.data.manager,
            address: res.data.address,
            storageCycle: res.data.storageCycle
          })
        })
      }
    })
  }
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err, val) => {
      if (!err) {
        if (this.checkNick) {
          this.saveData = {
            code: val.code,
            name: val.name,
            brand: val.brand,
            model: val.model,
            phone: val.phone,
            manager: val.manager,
            address: val.address,
            accessCloudIp: val.accessCloudIp,
            accessCloudProt: val.accessCloudProt,
            openCloud: this.checkNick,
            accessKey: val.accessKey,
            cloudIp: val.cloudIp,
            cloudPort: val.cloudPort,
            deptCode: val.deptCode,
            id: this.saveID,
            storageCycle: val.storageCycle,
            uploadStartTime: this.startTime ? `2020-01-01 ${this.startTime}:00` : "",
            uploadEndTime: this.endTime ? `2020-01-01 ${this.endTime}:00` : ""
          }
          this.saveD(this.saveData)
        } else {
          this.saveData = {
            code: val.code,
            name: val.name,
            brand: val.brand,
            model: val.model,
            phone: val.phone,
            manager: val.manager,
            address: val.address,
            accessCloudIp: val.accessCloudIp,
            accessCloudProt: val.accessCloudProt,
            openCloud: this.checkNick,
            id: this.saveID,
            storageCycle: val.storageCycle
          }
          this.saveD(this.saveData)
        }
      }
    })
  }
  private saveD(val: any): void {
    const loading = this.$loading({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)"
    })
    this.getData.upData(val, true).then((res: any) => {
      loading.close()
      if (res.code == 0) {
        if (val.openCloud !==this.currentState) {
          this.$router.push({ name: "Login" })
        }else{
          this.getSet()
        }
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
      localStorage.setItem("routertitle", val.name)
    })
  }
  private ipvalidator(rule, value, callback){
    let reg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/
    if(value.length=== 0){
      callback()
    }else if(!reg.test(value)){
      callback("上级平台IP格式错误")
    }else{
      callback()
    }
  }
  private protvalidator(rule,value,callback){
    let reg = /^\d+$|^\d+[.]?\d+$/
    if(value.length === 0){
      callback()
    }else{
      if(!reg.test(value)){
        callback('上级平台端口号格式错误')
      }else if(value.length >5){
        callback('上级平台端口号格式错误')
      }else{
        callback()
      }
    }
   
  }
}
</script>

<style lang="less" scope>
#Setting {
  width: calc(100%);
  height: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
#Setting .ant-table-tbody > tr > td {
  padding: 8px 16px;
}
#Setting {
  .Settingbox {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
}
#Setting .ant-dropdown-link {
  display: block;
  text-align: center;
  line-height: 30px;
  width: 58px;
  height: 30px;
  border: 1px solid #ccc;
  color: #9ea7b3;
}
#Setting .ant-form-inline .ant-form-item-with-help {
  margin-bottom: 0;
}
.fwB {
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}
.aNone .ant-form-item-label > label::after {
  content: "";
}
.upData,
.upData:hover {
  background: #0db8df;
  color: #ffffff;
}
.storageCycle {
  position: relative;
  .storageCycletext {
    display: flex;
    position: absolute;
    right: -564px;
    top: 0;
    h2 {
      font-size: 14px;
      line-height: 19px;
    }
    h3 {
      margin-left: 16px;
      font-size: 14px;
      line-height: 19px;
      color: #9ea7b3;
    }
  }
  .ant-form-item-control-wrapper {
    width: 100px;
  }
}
.StartEndTime {
  .ant-form-item-children {
    display: flex;
    margin-left: 4px;
  }
  .el-input--prefix .el-input__inner {
    height: 32px;
    line-height: 32px;
  }
}
</style>
