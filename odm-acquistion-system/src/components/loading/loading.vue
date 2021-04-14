<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-04-14 09:36:12
 * @LastEditTime: 2021-04-14 14:28:37
 * @FilePath: \src\components\loading\loading.vue
 * @LastEditors: yqn
-->
<template>
  <div class="loading-box" v-show="show">
    <div class="loading-mask" :style="backgroundstyle"></div>
    <div class="loading-content">
      <div class="animate">
        <img :src="imgsrc" alt />
      </div>
      <div class="text" :style="textStyle">{{text}}</div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component({
  components: {}
})
export default class LoadingComponent extends Vue {
  @Prop({ type: Boolean, required: false }) readonly show!: boolean
  @Prop({ default: "正在加载中" }) readonly text!: string
  readonly imageSrc!: string
  @Prop({
    default() {
      return {
        fontSize: "20px",
        color: "red"
      }
    }
  })
  readonly textStyle: {}
  @Prop({
    default() {
      return {
        backgroundColor: "#fbfbfb"
      }
    }
  })
  readonly backgroundstyle: {}
  private imgsrc = require("../../assets/image/loading.gif")

  // public mounted(){
  //   console.log(this.imgsrc);
  // }
  
}
</script>


<style lang="less" scope>
.loading-box {
  z-index: 10000 !important;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
}
.loading-mask {
  width: 100%;
  height: 100%;
  // background:rgba(0,0,0,.4)
  // background:#fbfbfb
}
.loading-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>