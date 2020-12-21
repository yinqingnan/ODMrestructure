<template>
  <div id="Setting">
    <el-scrollbar :style="{height:Height}">
    <div class="box">

      <a-row>
        <a-col :span="24">
          <h3 class="fwB">配置信息</h3>
        </a-col>
        <a-col :span="16">
          <a-form
            autocomplete="off"
            :form="form"
            layout="inline"
            :label-col="{ span: 12 }"
            :wrapper-col="{ span: 12 }"
            @submit="handleSubmit"
          >
            <a-row :gutter="24">
              <a-col :span="24">
                <a-form-item label="平台编号" style="width:100%">
                  <a-input
                    v-decorator="[
                      'code',
                      {
                        rules: [{ required: true, message: '请输入平台编号' }]
                      }
                    ]"
                    disabled
                    placeholder="请输入平台编号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="平台名称" style="width:100%">
                  <a-input
                    style="width:100%"
                    v-decorator="[
                      'name',
                      {
                        rules: [{ required: true, message: '请输入平台名称' }]
                      }
                    ]"
                    placeholder="请输入平台名称"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="平台地址" style="width:100%">
                  <a-input
                    v-decorator="[
                      'address',
                      {
                        rules: [{ required: true, message: '请输入平台地址' }]
                      }
                    ]"
                    placeholder="请输入平台地址"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="管理员" style="width:100%">
                  <a-input
                    v-decorator="[
                      'manager',
                      {
                        rules: [{ required: true, message: '请输入管理员' }]
                      }
                    ]"
                    placeholder="请输入管理员"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="联系电话" style="width:100%">
                  <a-input
                    v-decorator="[
                      'phone',
                      {
                        rules: [{ required: true, message: '请输入联系电话' }]
                      }
                    ]"
                    placeholder="请输入联系电话"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24" class="aNone">
                <a-form-item label=" " style="width:100%">
                  <a-checkbox-group
                    v-decorator="['openCloud', { initialValue: ['1'] }]"
                    @change="ckChange($event, 'openC')"
                  >
                    <a-checkbox value="1">
                      连接上级平台
                    </a-checkbox>
                  </a-checkbox-group>
                </a-form-item>
              </a-col>
              <a-col :span="24" v-if="openC">
                <a-form-item label="部门编号" style="width:100%">
                  <a-input
                    v-decorator="[
                      'accesDpetCode',
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
                      'accessCloudIp',
                      {
                        rules: [{ required: true, message: '请输入上级平台IP' }]
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
                      'accessCloudProt',
                      {
                        rules: [{ required: true, message: '请输入上级平台端口号' }]
                      }
                    ]"
                    placeholder="请输入上级平台端口号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24" class="aNone" v-if="openC">
                <a-form-item label=" " style="width:100%">
                  <a-checkbox-group
                    v-decorator="['openFtp', { initialValue: showN }]"
                    @change="ckChange($event, 'openF')"
                  >
                    <a-checkbox value="1">
                      上传实体文件
                    </a-checkbox>
                  </a-checkbox-group>
                </a-form-item>
              </a-col>
              <a-col :span="24" v-if="openF">
                <a-form-item label="FTP服务器IP" style="width:100%">
                  <a-input
                    v-decorator="[
                      'ftpIp',
                      {
                        rules: [{ required: true, message: '请输入FTP服务器IP' }]
                      }
                    ]"
                    placeholder="请输入FTP服务器IP"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24" v-if="openF">
                <a-form-item label="FTP服务器端口号" style="width:100%">
                  <a-input
                    v-decorator="[
                      'ftpPort',
                      {
                        rules: [{ required: true, message: '请输入FTP服务器端口号' }]
                      }
                    ]"
                    placeholder="请输入FTP服务器端口号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24" v-if="openF">
                <a-form-item label="FTP账号" style="width:100%">
                  <a-input
                    v-decorator="[
                      'ftpUser',
                      {
                        rules: [{ required: true, message: '请输入FTP账号' }]
                      }
                    ]"
                    placeholder="请输入FTP账号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24" v-if="openF">
                <a-form-item label="FTP密码" style="width:100%">
                  <a-input
                    v-decorator="[
                      'ftpPasswd',
                      {
                        rules: [{ required: true, message: '请输入FTP密码' }]
                      }
                    ]"
                    type="password"
                    placeholder="请输入FTP密码"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="24" :style="{ textAlign: 'center' }" class="aNone">
                <a-form-item label=" " style="width:100%">
                  <a-button html-type="submit" class="upData" v-isshow="'system:setting:save'">
                    提交
                  </a-button>
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
// import { PropType } from "vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class RightContent extends Vue {
  [x: string]: any;
  public getData = new this.$api.configInterface.Setting();
  public form: any;
  public openC = true;
  public openF = true;
  public flag = true;
  public showN: string[];
  public saveData: any;
  public saveID: string;
  public Height= ''
  beforeCreate() {
    this.form = this.$form.createForm(this);
    this.showN = ["1"];
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  created() {
    this.getSet();
    this.Height = `${document.documentElement.clientHeight - 160}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 160}px`
    })
  }
  private ckChange(e: any, val: string): void {
    const len: number = e.length;
    console.log(len);
    if (len <= 0) {
      this.flag = false;
    } else {
      this.flag = true;
    }
    if (val == "openC") {
      if (this.flag == false) {
        this.showN = [];
        this.openC = this.flag;
        this.openF = this.flag;
      } else {
        this.openC = this.flag;
      }
    }
    if (val == "openF") {
      this.openF = this.flag;
    }
  }
  private getSet(): void {
    this.getData.getSetting({}, true).then((res: any) => {
      res.data.openCloud = res.data.openCloud.toString();
      res.data.openFtp = res.data.openFtp.toString();
      this.saveID = res.data.id;
      this.form.setFieldsValue({
        code: res.data.code,
        name: res.data.name,
        address: res.data.address,
        manager: res.data.manager,
        phone: res.data.phone,
        openCloud: [res.data.openCloud],
        accesDpetCode: res.data.accesDpetCode,
        accessKey: res.data.accessKey,
        accessCloudIp: res.data.accessCloudIp,
        accessCloudProt: res.data.accessCloudProt,
        openFtp: [res.data.openFtp],
        ftpIp: res.data.ftpIp,
        ftpPort: res.data.ftpPort,
        ftpUser: res.data.ftpUser,
        ftpPasswd: res.data.ftpUser
      });
    });
  }
  private handleSubmit(e: any): void {
    e.preventDefault();
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        if (
          val.openCloud != "" &&
          val.openCloud != undefined &&
          val.openCloud.length > 0
        ) {
          val.openCloud = val.openCloud[0];
        } else {
          val.openCloud = "";
        }
        if (
          val.openFtp != "" &&
          val.openFtp != undefined &&
          val.openFtp.length > 0
        ) {
          val.openFtp = val.openFtp[0];
        } else {
          val.openFtp = "";
        }
        this.saveData = {
          code: val.code,
          name: val.name,
          address: val.address,
          manager: val.manager,
          phone: val.phone,
          openCloud: val.openCloud || "",
          accesDpetCode: val.accesDpetCode || "",
          accessKey: val.accessKey || "",
          accessCloudIp: val.accessCloudIp || "",
          accessCloudProt: val.accessCloudProt || "",
          openFtp: val.openFtp || "",
          ftpIp: val.ftpIp || "",
          ftpPort: val.ftpPort || "",
          ftpUser: val.ftpUser || "",
          ftpPasswd: val.ftpPasswd || "",
          id: this.saveID
        };
        this.saveD(this.saveData);
      }
    });
  }
  private saveD(val: any): void {
    this.getData.upData(val, true).then((res: any) => {
      if (res.code == 0) {
        this.$message.success(res.msg)
      } else {
        this.$message.error(res.msg)
      }
    });
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
#Setting .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
#Setting .ant-dropdown-link {
  display: block;
  text-align: center;
  line-height: 30px;
  width: 58px;
  height: 30px;
  border: 1px solid #ccc;
  color: #9EA7B3;
}
#Setting .ant-form-inline .ant-form-item-with-help {
  margin-bottom: 0;
}
.fwB {
  text-align: center;
  font-weight: bold;
  margin: 20px 0;
}
.aNone .ant-form-item-label > label::after{
  content: "";
}
.upData,
.upData:hover {
  background: #0DB8DF;
  color: #ffffff;
}
</style>
