<template>
  <div>
    <div class="header">
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
            <span>Admin <a-icon type="down"/></span>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;">修改密码</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">安全退出</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts"></script>

<style lang="less" scope>
.header {
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
  margin-right: 36px;
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
</style>
