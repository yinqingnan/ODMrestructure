<template>
  <div>
    <div class="headers">
      <div class="header_left">
        <img src="../assets/image/headerlogo.png" alt />
      </div>
      <div class="header_rigth hidden-sm-and-down">
        <!-- <div class="logo">
          <div id="components-badge-demo-title" @click="getNotice">
            <a-badge :dot="isshow" title="Custom hover text" >
              <a-icon type="alert" style="color:#fff;font-size:22px" />
            </a-badge>
          </div>
        </div> -->
   
        <div class="Menuss">
          <h2>
              {{ username }}
          </h2>
          <div class="division"></div>
          <div>
              <span class="iconmima iconfont" @click="modify"></span>
          </div>
          <div>
              <span class="icontuichu iconfont" @click="outuser"></span>
          </div>
          <!-- <a-dropdown :trigger="['click']">
           
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="modify">修改密码</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="outuser">安全退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown> -->
        </div>
      </div>
    </div>
    <a-modal v-model="visible" title="修改密码" ok-text="确认" cancel-text="取消" @ok="hideModal" :keyboard='false'>
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
                rules: [{ required: true, message: '请输入原密码！' },{ validator: codevalidator}]
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
                rules: [{ required: true, message: '请输入新密码！' },{ validator: codevalidator}]
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
                rules: [{ required: true, message: '请再次输入新密码！' },{ validator: codevalidator}]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model="Noticeshow" title="公告" :footer="null" :keyboard='false'>
      <div style="text-align: center;height:130px;line-height:130px" v-if="!blank">公告示例</div>
      <a-empty v-else />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { LimitInputlength } from "../InterfaceVariable/variable"
import { namespace } from "vuex-class"
const Tabs = namespace("Tabs")
@Component
export default class Header extends Vue {
  @Tabs.Mutation("cleartablist")
  cleartablist!: (val: any) => {};
  [x: string]: any
  public Login = new this.$api.configInterface.Login()
  private Noticeshow = false
  private visible = false
  private username = ""
  private blank = false
  public form!: any
  private isshow = false
  private LimitInputlength = LimitInputlength
  private created() {
    this.form = this.$form.createForm(this)
  }
  private mounted() {
    this.getusermsg()
  }
  private modify() {
    this.visible = true
    this.Login.usermsg({}, true).then((res: any) => {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          username: this.username,
        })
      })
    })
  }
  private outuser() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this
    this.$confirm({
      title: "确认是否退出?",
      okText: "确认",
      cancelText: "取消",
      onOk() {
        that.Login.outuser({}, false).then((res: any) => {
          localStorage.clear()
          that.$router.push({ name: "Login" })
          that.cleartablist([])
        })
      },
    })
  }
  private handleSubmit() {
    // e.preventDefault();
    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (
          values.oldPassword === values.newPassword ||
          values.oldPassword === values.newRePassword
        ) {
          this.$message.error("旧密码与新密码相同")
        } else if (values.newPassword != values.newRePassword) {
          this.$message.error("两次输入密码不一致")
        } else if (values.newPassword === values.newRePassword) {
          // this.$message.success("修改成功");
          this.Login.editpsd(values, true).then((res: any) => {
            if (res.code == 1) {
              this.$message.error(res.msg)
            } else {
              this.$message.success(res.msg)
              this.visible = false
              this.$router.push({ name: "Login" })
              localStorage.removeItem("token")
              //清除cookie
              this.setCookie("", "", -1) //修改2值都为空，天数为负1天就好了
            }
          })
        }
      }
    })
  }
  //设置cookie
  private setCookie(cName: string, cPwd: string, exdays: number) {
    const exdate = new Date() //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) //保存的天数
    //字符串拼接cookie
    window.document.cookie =
      "userName" + "=" + cName + ";path=/;expires=" + exdate.toUTCString()
    window.document.cookie =
      "userPwd" + "=" + cPwd + ";path=/;expires=" + exdate.toUTCString()
  }
  private hideModal() {
    this.handleSubmit()
    // this.visible = false;
  }
  private getusermsg() {
    this.Login.usermsg({}, true).then((res: any) => {
      this.username = res.data.name
      // console.log(res.data);
      localStorage.setItem("username", res.data.name)
      localStorage.setItem("department", res.data.deptName)
      localStorage.setItem("deptCode", res.data.deptCode)
    })
    this.Login.getNotice().then((res) => {
      if(res.data.length>0){
        this.isshow = true
      }else{
        this.isshow = false
      }
    })
  }
  private getNotice() {
    this.Noticeshow = true
    this.Login.getNotice().then((res) => {
      console.log(res)
      if (res.data) {
        this.blank = true
      } else {
        this.blank = false
      }
    })
  }
  private codevalidator(rule, value, callback) {
    let reg = new RegExp('[\u4E00-\u9FA5]+')
    if(!reg.test(value)){
      callback()
    }else{
      callback('密码格式不正确，必须是数字或字母')
    }
  }
  private zhdator(rule, value, callback) {
    let reg = new RegExp('[\u4E00-\u9FA5]+')
    if(!reg.test(value)){
      callback()
    }else{
      callback('密码格式不正确，必须是数字或字母')
    }
  }
}
</script>

<style lang="less" scope>
.headers {
  height: 74px;
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
  display: flex;
  margin-left: 16px;
  margin-right: 11px;
  h2{
    font-size: 16px;
    color: #fff;
    font-weight: 500;
  }
  div{
    width: 35px;
    height: 35px;
    text-align: center;
    margin-top: 15px;
    line-height: 1;
    span {
      
      color: #fff;
      cursor: pointer;
      font-size: 20px;
  }
  }
  
}
.iconmima:hover{
  color:#7eb5e8 ;
}
.icontuichu:hover{
  color:#7eb5e8 ;
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
.division{
  height: 35px;
  margin-left: 19px;
  margin-top: 10px !important ;
  width: 2px !important;
  border-left:1px solid #384c6c ;
  border-right:1px solid #1e3153 ;
}
</style>
