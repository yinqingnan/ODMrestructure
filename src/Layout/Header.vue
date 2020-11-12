<template>
  <div>
    <div class="headers">
      <div class="header_left">
        <img src="../assets/image/logo.png" alt="" />
      </div>
      <div class="header_rigth hidden-sm-and-down">
        <div class="logo">
          <div id="components-badge-demo-title">
            <a-badge :dot="true" title="Custom hover text">
              <a-icon type="alert" style="color:#fff;font-size:22px" />
            </a-badge>
          </div>
          <!-- <div id="components-badge-demo-title">
          <a-icon type="alert" style="color:#fff;font-size:22px" />
        </div> -->
        </div>
        <div class="headportrait hidden-sm-and-down">
          <img src="../assets/image/user/123123.png" alt="" />
        </div>
        <div class="Menuss ">
          <a-dropdown :trigger="['click']">
            <!-- <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              Admin <a-icon type="down" />
            </a> -->
            <span>{{ username }} <a-icon type="down"/></span>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="modify">修改密码</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="outuser">安全退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
    <a-modal
      v-model="visible"
      title="修改密码"
      ok-text="确认"
      cancel-text="取消"
      @ok="hideModal"
    >
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        @submit="handleSubmit"
      >
        <a-form-item label="用户名">
          <a-input :disabled="true" v-decorator="['username']" />
        </a-form-item>
        <a-form-item label="原密码">
          <a-input-password
            :maxLength="LimitInputlength"
            v-decorator="[
              'oldPassword',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="新密码">
          <a-input-password
            :maxLength="LimitInputlength"
            v-decorator="[
              'newPassword',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item label="重复新密码">
          <a-input-password
            :maxLength="LimitInputlength"
            v-decorator="[
              'newRePassword',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LimitInputlength } from "../InterfaceVariable/variable";

@Component
export default class Header extends Vue {
  [x: string]: any;
  public Login = new this.$api.configInterface.Login();
  private visible = false;
  private username = "";
  public form!: any;
  private LimitInputlength = LimitInputlength;
  private created() {
    this.form = this.$form.createForm(this);
  }
  private mounted() {
    this.getusermsg();
  }
  private modify() {
    this.visible = true;

    this.Login.usermsg({}, true).then((res: any) => {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          username: this.username
        });
      });
    });
  }
  private outuser() {
    this.Login.outuser({}, false).then((res: any) => {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      this.$confirm({
        title: "确认是否退出?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          localStorage.removeItem("activeKey")
          localStorage.removeItem("Tabslist")
          that.$router.push({ name: "Login" });
          localStorage.removeItem("token");
        },
        class: "test"
      });
    });
  }
  private handleSubmit() {
    // e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (
          values.oldPassword === values.newPassword ||
          values.oldPassword === values.newRePassword
        ) {
          this.$message.error("旧密码与新密码相同");
        } else if (values.newPassword != values.newRePassword) {
          this.$message.error("两次输入密码不一致");
        } else if (values.newPassword === values.newRePassword) {
          // this.$message.success("修改成功");
          this.Login.editpsd(values, true).then((res: any) => {
            if (res.code == 1) {
              this.$message.error(res.msg);
            } else {
              this.$message.success(res.msg);
              this.visible = false;
              this.$router.push({ name: "Login" });
              localStorage.removeItem("token");
              //清除cookie
              this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            }
          });
        }
      }
    });
  }
  //设置cookie
  private setCookie(cName: string, cPwd: string, exdays: number) {
    const exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie =
      "userName" + "=" + cName + ";path=/;expires=" + exdate.toUTCString();
    window.document.cookie =
      "userPwd" + "=" + cPwd + ";path=/;expires=" + exdate.toUTCString();
  }
  private hideModal() {
    this.handleSubmit();
    // this.visible = false;
  }
  private getusermsg() {
    this.Login.usermsg({}, true).then((res: any) => {
      this.username = res.data.name;
      // console.log(res.data);
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("department", res.data.deptName);
    });
  }
}
</script>

<style lang="less" scope>
.headers {
  height: 74px;
  // background: #2c4369;
  background-image: url("../assets/image/header.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
}

img {
  display: block;
}

.head-example {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background: #eee;
  display: inline-block;
}
.header_rigth {
  display: flex;
  line-height: 50px;
  height: 50px;
  margin-top: 14px;
}
.headportrait {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #fff;
  margin-left: 46px;
  margin-right: 26px;
  cursor: pointer;
  > img {
    width: 100%;
  }
}
.logo {
  text-align: center;
  cursor: pointer;
}
.Menuss {
  cursor: pointer;
  margin-right: 16px;

  span {
    color: #fff;
  }
}
.ant-dropdown-menu-item {
  width: 134px;
  height: 34px;
  line-height: 20px;
  text-align: center;
}
.ant-badge-dot {
  width: 8px;
  height: 8px;
}
.ant-form-item {
  margin-bottom: 12px;
}
</style>
