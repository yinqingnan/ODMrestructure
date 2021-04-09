<template>
  <div>
    <div class="bg">
      <div class="loginbox">
        <div class="loginbox_header">
          <img src="../assets/image/logo.png" alt />
          <h2>{{ Title }}</h2>
        </div>
        <div class="loginbox_body">
          <a-form :form="form" @submit="handleSubmit" autocomplete="off">
            <a-form-item style="margin-bottom: 20px;">
              <a-input
                class="logininput"
                v-decorator="[
                  'username',
                  {
                    initialValue: username,
                    rules: [
                    {
                      validator:namecheck
                    }
                   
                    ],
                      validateTrigger:'blur'
                  }
                ]"
                placeholder="请输入账号信息"
              >
                <span
                  class="iconfont iconyonghuming"
                  slot="prefix"
                  style="color:#ccc;font-size:20px"
                ></span>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input-password
                class="logininput"
                v-decorator="[
                  'password',
                  {initialValue: password,
                    rules: [
                      {
                        validator: psdcheck
                      }
                    ],
                    validateTrigger:'blur'
                  }
                ]"
                placeholder="请输入密码"
              >
                <span class="iconfont iconmima" slot="prefix" style="color:#ccc;font-size:20px"></span>
              </a-input-password>
            </a-form-item>
            <a-form-item style="margin-top: 14px;margin-bottom:0;">
              <a-checkbox :checked="checkNick" @change="handleChange">记住用户名</a-checkbox>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" :disabled='loginstate'>登录</a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { message } from "ant-design-vue"
import { Component, Vue } from "vue-property-decorator"
import { LimitInputlength } from "../InterfaceVariable/variable"
import { resetRouter } from "@/router/index" //重置路由信息
import { concatrouter } from "@/router/concatrouter" //生成路由表方法
import router from "@/router"
import {setCookie} from '@/utils/setCookie'
// import {claerTime} from '@/utils/isOperate'
import { namespace } from "vuex-class"

const Menu = namespace("Menu")
const Tabs = namespace("Tabs")
@Component
export default class Login extends Vue {
  [x: string]: any
  @Menu.Mutation("addmenu")
  addmenu!: (val: any) => {}
  @Tabs.Mutation("cleartablist")
  cleartablist!: (val: any) => {}
  public form!: any
  private checkNick = false
  public Login = new this.$api.configInterface.Login()
  private Title = ""
  private password = ""
  private username = ""
  private loginstate = false
  private created() {
    this.form = this.$form.createForm(this)
  }
  private LimitInputlength = LimitInputlength
  private mounted() {
    this.gettitle()
    this.getCookie()
    this.cleartablist([])
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handleSubmit(e: any): void {
    e.preventDefault()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.checkNick) {
          setCookie(values.username, values.password, 7)
          this.login(values)
        } else {
          this.login(values)
          this.clearCookie()
        }
      }
    })
  }
  private handleChange(e: { target: { checked: boolean } }) {
    this.checkNick = e.target.checked
  }
  private login(data: object) {
    this.loginstate = true
   
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    this.Login.login(data, false).then((res) => {
      this.loginstate = false
      if (res.code == 0) {
        localStorage.setItem("token", res.data.accessToken)
        localStorage.setItem("user", JSON.stringify(res.data.user))
        let arr = res.data.user.menus //菜单数据
        localStorage.setItem("navlist", JSON.stringify(arr))
        this.addmenu(concatrouter())
        resetRouter() //重置路由
        router.options.routes = concatrouter()
        router.addRoutes(concatrouter())
        let path = ''
        if(arr[0].children){
          path = arr[0].children[0].path
        }else{
          path = arr[0].path
        }
        this.$router.push({ path: `/index${path}` }) //成功后跳转
      } else {
        this.$message.error(res.msg)
        this.clearCookie()
        this.checkNick = false
      }
    },(err) =>{
      this.loginstate = false
      this.checkNick = false
    })
  }
  private gettitle() {
    this.Login.gettitle({}, false).then((res) => {
      localStorage.clear()
      localStorage.setItem("routertitle", res.data)
      this.Title = res.data
    })
  }
  // 获取cookie
  private getCookie() {
    if (document.cookie.length > 0) {
      const arr = document.cookie.split(";")
      arr.map((item) => {
        item = item.trim()
        const arr2 = item.split("=")
        if (arr2[0] == "userName") {
          this.username = arr2[1]
          this.checkNick = true
        }
        if (arr2[0] == "userPwd") {
          this.password = arr2[1]
          this.checkNick = true
        }
      })
    }
  }
  //清除cookie
  private clearCookie = () => {
    setCookie("", "", -1)
  }
  private namecheck (rule, value, callback){
    let reg = /^[A-Za-z0-9]{6,12}$/
    if(value.length === 0){
      callback(new Error("请输入账号"))
    }else if(!reg.test(value)){
      callback(new Error("帐号格式错误，请重新输入"))
    }else{
      callback()
    }
  }

  private psdcheck (rule, value, callback){
    let reg = /^[A-Za-z0-9]{6,12}$/
    if(value.length === 0){
      callback(new Error("请输入密码"))
    }else if(!reg.test(value)){
      callback(new Error("密码格式错误，请重新输入"))
    }else{
      callback()
    }
  }
}
</script>

<style lang="less" scope>
.bg {
  height: 100vh;
  background: url("../assets/image/bj.png");
  background-size: 100% 100%;
  position: relative;
}

.loginbox {
  width: 410px;
  border-radius: 3px;
  height: 340px;
  background: rgba(255, 255, 255, 0.2);
  position: absolute;
  top: ~"calc(50% - 226px)";
  left: ~"calc(50% - 215px)";

  .ant-form-item-with-help {
    margin-bottom: 24px;
    .ant-form-explain {
      position: absolute;
    }
  }
}

.loginbox_header {
  display: flex;
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  margin: 24px 0 24px 0;
  margin-left: 28px;

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
  padding: 0 35px;

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
    height: 45px;
  }
}

.logininput {
  line-height: 1;
  input {
    padding-left: 40px !important;
    line-height: 1;
  }
}
</style>
