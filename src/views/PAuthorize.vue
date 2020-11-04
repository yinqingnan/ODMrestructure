<template>
  <div>
    <div>
      <div class="boxheader">
        <img src="../assets/image/logo1.png" alt="" />
      </div>
      <div class="boxbody">
        <div class="text">
          <p>Licenses授权不合法，请联系TCL官方获取授权。</p>
          <p>客服热线：<span>400-812-3456</span></p>
        </div>
      </div>
      <p class="bBox">
        © 2019-2020 TCL CORPORATION All Rights Reserved.
        TCL集团股份有限公司版权所有
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class PAuthorize extends Vue {}
</script>

<style lang="less" scope>
.boxheader {
  width: 100%;
  height: 60px;
  background: #153c76;
  > img {
    margin-left: 16px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 6px;
  }
}
.boxbody {
  height: 757px;
  background: url("../assets/image/limits_bj.png");
  background-size: 100% 100%;
  .text {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -175px;
    margin-top: -15px;
  }
  p {
    width: 350px;
    text-align: center;
    font-size: 16px;
    span {
      color: red;
    }
  }
}
.bBox {
  width: 100%;
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #666;
}
</style>
