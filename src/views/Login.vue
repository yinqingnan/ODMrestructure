<template>
  <div>
    <div class="bg">
      <div class="loginbox">
        <div class="loginbox_header">
          <img src="../assets/image/logon_logo.png" alt="" />
          <h2>{{ Title }}</h2>
        </div>
        <div class="loginbox_body">
          <h2>账号密码登陆</h2>
          <a-form :form="form" @submit="handleSubmit">
            <a-form-item>
              <a-input
                autocomplete="off"
                :maxLength="LimitInputlength"
                v-decorator="[
                  'username',
                  {
                    rules: [{ required: true, message: '必填项请输入' }]
                  }
                ]"
                placeholder="请输入账号信息"
                ><a-icon slot="prefix" type="user"/></a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                :maxLength="LimitInputlength"
                autocomplete="off"
                v-decorator="[
                  'password',
                  {
                    rules: [
                      {
                        required: true,
                        message: '密码为必填项'
                      }
                    ]
                  }
                ]"
                placeholder="请输入密码"
                ><a-icon slot="prefix" type="unlock"/></a-input-password>
            </a-form-item>
            <a-form-item>
              <a-checkbox :checked="checkNick" @change="handleChange">
                记住密码
              </a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import { LimitInputlength } from "../InterfaceVariable/variable";

@Component
export default class Login extends Vue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  public form!: any;
  private checkNick = false;
  public Login = new this.$api.configInterface.Login();
  private Title = "";

  private created() {
    this.form = this.$form.createForm(this);
  }
  private LimitInputlength = LimitInputlength;
  private mounted() {
    this.gettitle();
    this.jurisdiction();
    this.getCookie();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleSubmit(e: any): void {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.checkNick) {
          this.setCookie(values.username, values.password, 7);
          this.login(values);
        } else {
          this.login(values);
          this.clearCookie();
          this.login(values);
        }
      }
    });
  }
  private handleChange(e: { target: { checked: boolean } }) {
    this.checkNick = e.target.checked;
  }
  private login = (data: object) => {
    this.Login.login(data, false).then((res: any) => {
      if (res.code == 0) {
        localStorage.setItem("token", res.data.accessToken);
        this.$router.push({ name: "home" });
      } else {
        message.error(res.msg);
        this.clearCookie();
        this.form.setFieldsValue({
          password: "",
          username: ""
        });
      }
    });
  };
  private jurisdiction = () => {
    this.Login.getjurisdiction({}, false).then((res: any) => {
      if (res.code == 1003) {
        this.$router.push({ name: "pAuthorize" });
      }
    });
  };
  private gettitle() {
    this.Login.gettitle({}, false).then((res: any) => {
      this.Title = res.data;
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
  // 获取cookie
  private getCookie() {
    if (document.cookie.length > 0) {
      this.checkNick = true;
      const arr = document.cookie.split(";");
      for (let i = 0; i < arr.length; i++) {
        const arr2 = arr[i].split("=");
        if (arr2[0] === "userName") {
          this.form.setFieldsValue({
            username: arr2[1]
          });
        }
        if (arr2[0] === " userPwd") {
          this.form.setFieldsValue({
            password: arr2[1]
          });
        }
      }
    }
  }
  //清除cookie
  private clearCookie = () => {
    this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
  };
}
</script>

<style lang="less" scope>
.bg {
  height: 100vh;
  background: url("../assets/image/logon_bj.png");
  background-size: 100% 100%;
  position: relative;
}
.loginbox {
  width: 452px;
  height: 430px;
  background: url("../assets/image/logon_bj1.png");
  background-size: 100% 100%;
  position: absolute;
  top: ~"calc(50% - 226px)";
  left: ~"calc(50% - 215px)";
}
.loginbox_header {
  display: flex;
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  margin: 25px 0 35px 0;
  margin-left: 54px;
  > img {
    vertical-align: top;
  }
  > h2 {
    color: #fff;
    display: inline-block;
    font-weight: 600;
    letter-spacing: 3px;
    font-size: 16px;
  }
}
.loginbox_body {
  padding: 0 55px;
  > h2 {
    color: #fff;
    display: inline-block;
    width: 95px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    font-weight: 100;
    cursor: pointer;
    line-height: 28px;
    background: url("../assets/image/logon_hover.png") no-repeat 0 25px;
    margin-bottom: 18px;
  }
  input {
    height: 45px;
    line-height: 45px;
  }
  span {
    color: #fff;
  }
  button {
    width: 100%;
  }
}
</style>
