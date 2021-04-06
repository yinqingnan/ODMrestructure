<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-03-01 16:07:48
 * @LastEditTime: 2021-04-06 18:00:54
 * @FilePath: \src\components\Video\Video.vue
 * @LastEditors: yqn
-->
<template>
  <div>
    <xgplayer :options="playerOptions" ref="videoPlayer" />
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator"
@Component({
  components: {}
})
export default class Video extends Vue {
  @Prop() private videopath
  @Emit("Videochange") send(type: string, time: number | string) {
    //
  }
  @Watch("videopath", { immediate: true, deep: true })
  change(val) {
    console.log(val)
    // this.switchsrc(val)
    setTimeout(() => {
      // console.log(this.$refs?.videoPlayer as any)
      (this.$refs.videoPlayer as any).player.src = val;
      (this.$refs.videoPlayer as any).player.pause()
      this.path = val
    })
  }
  public path = ""
  private frameLength = 0.02
  private playerOptions = {
    url: "",
    // url: 'http://k6.kekenet.com/Sound/2019/08/m200016581_1484302841_1444410KGM.mp3',
    poster: "", //你的封面地址
    // poster:require('../assets/bj.png'), //你的封面地址
    // fitVideoSize: "100%", //自适应宽度
    fluid: true, //流失布局 宽度自适应
    language: "zh-CN",
    preload: "auto", // 建议浏览器在加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频(如果浏览器支持)
    volume: 0.5, //预设音量0-1之间
    aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字(例如"16:9"或"4:3")
    playbackRate: [0.5, 0.75, 1, 1.5, 2], //倍速播放
    screenShot: false, //截图功能 需要从写
    muted: false, // 默认情况下将会消除任何音频。
    notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
    // controls: false, //关闭所有原生的控制条
    download: false, //设置download控件显示
    loop: false, //循环播放
    autoplay: false, //自动播放
    hasStart: false, //自动播放
    rotate: {
      //视频旋转按钮配置项
      innerRotate: true, //只旋转内部video
      clockwise: false // 旋转方向是否为顺时针
    },
    videoInit: true, //初始化显示视频首帧
    cssFullscreen: true,//样式全屏功能不会隐藏当前浏览器的标签栏，导航栏，只是在当前页面内部全屏显示。
    keyShortcut: 'on'//键盘快捷键

  }
  private mounted() {
    const kzt: HTMLElement | null = document.querySelector(
      ".xgplayer-placeholder"
    )
    const div1 = document.createElement("div")
    div1.className = "kzt"
    //上一帧
    const Lastframe = document.createElement("span")
    const lastimg = document.createElement("img")
    lastimg.src = require("../../assets/video/syz.png")
    Lastframe.appendChild(lastimg)
    Lastframe.className = "Lastframe"
    Lastframe.title = "上一帧"
    Lastframe.addEventListener("click", this.lastframe)
    // 逐帧查看
    const playframe = document.createElement("span")
    const playimg = document.createElement("img")
    playimg.src = require("../../assets/video/zt.png")
    playframe.appendChild(playimg)
    playframe.className = "playframe"
    playframe.title = "逐帧查看"
    playframe.addEventListener("click", this.playframe)
    //下一帧
    const nextframe = document.createElement("span")
    const nextimg = document.createElement("img")
    nextimg.src = require("../../assets/video/xyz.png")
    nextframe.appendChild(nextimg)
    nextframe.className = "nextframe"
    nextframe.title = "下一帧"
    nextframe.addEventListener("click", this.nextframe)
    div1.appendChild(Lastframe)
    div1.appendChild(playframe)
    div1.appendChild(nextframe)

    const screenshotbtn = document.createElement("div")
    const screenimg = document.createElement("img")
    screenshotbtn.className = "screenshotbtn"
    screenimg.src = require("../../assets/video/jt.png")
    screenshotbtn.appendChild(screenimg)
    screenshotbtn.addEventListener("click", this.screenshot)
    kzt!.appendChild(div1)
    kzt!.appendChild(screenshotbtn)

    // 重播
    const cb = document.querySelector(".xgplayer-replay-svg")
    cb.addEventListener("click", this.cb)
  }
  private cb() {
    console.log()
    this.send("toreplay", this.path)
    // (this.$refs.videoPlayer as any).player.replay()
  }
  private lastframe() {
    // console.log("上一帧")
    (this.$refs.videoPlayer as any).player.currentTime -= this.frameLength
  }
  private nextframe() {
    // console.log("下一帧")
    (this.$refs.videoPlayer as any).player.currentTime += this.frameLength
  }
  private playframe() {
    // console.log("暂停")
    (this.$refs.videoPlayer as any).player.pause()
  }
  private screenshot() {
    this.send("add", (this.$refs.videoPlayer as any).player.currentTime)
  }
  private reload() {
    (this.$refs.videoPlayer as any).player.reload()
  }
}
</script>


<style lang='less'>
.xgplayer-enter-logo,
.xgplayer-tips {
  display: none !important;
}
.kzt {
  height: 40px;
  padding-top: 10px !important;
  margin-left: 16px !important;
  width: 100px;
}
.Lastframe {
  cursor: pointer;
  width: 23px;
  height: 23px;
  display: inline-block;
  line-height: 1;
  img {
    width: 100%;
    height: 100%;
  }
}
.playframe {
  cursor: pointer;
  width: 23px;
  height: 23px;
  display: inline-block;
  line-height: 1;
  margin: 0 12px !important;
  img {
    width: 100%;
    height: 100%;
  }
}
.xgplayer-placeholder {
  display: flex;
}
.nextframe {
  cursor: pointer;
  width: 23px;
  height: 23px;
  display: inline-block;
  line-height: 1;
  img {
    width: 100%;
    height: 100%;
  }
}
.screenshotbtn {
  line-height: 40px;
  cursor: pointer;
  padding-top: 5px;
  margin-left: 11px;
}
.xgplayer-progress-played {
  background-image: linear-gradient(269deg, #0cb9de, #0cb9de);
}
.xgplayer-replay-txt {
  display: none !important;
}
</style>