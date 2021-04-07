<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-04-06 16:44:12
 * @LastEditTime: 2021-04-07 11:42:00
 * @FilePath: \src\components\Audio\Audio.vue
 * @LastEditors: yqn
-->

<template>
  <div class="Audiomodel">
    <div>
      <div id="waveform" ref="waveform">
        <!-- Here be the waveform -->
      </div>
      <div id="wave-timeline" ref="wave-timeline"></div>
    </div>
    <div class="audiooperation">
      <div style="margin-left:20px">
        <span @click="rew" style="cursor: pointer;">
          <img src="../../assets/audio/ht.png" alt />
        </span>
        <span @click="playMusic" style="cursor: pointer;margin-right:15px;margin-left:15px">
          <img v-if="iconshow" src="../../assets/audio/bf.png" alt />
          <img v-else src="../../assets/audio/zt.png" alt />
        </span>
        <span @click="speek" style="cursor: pointer;">
          <img src="../../assets/audio/qj.png" alt />
        </span>
      </div>
      <div style="margin-right:20px">
        <el-popover placement="top-start" trigger="hover">
          <div class="block" style="width: 42px">
            <el-slider v-model="value" vertical height="100px" @change="setVolume" />
          </div>
          <span slot="reference" style="cursor: pointer;" @click='Volumeset'>
            <img :src="ylurl" alt />
          </span>
        </el-popover>
        <span @click="replay" style="cursor: pointer;margin:0 15px">
          <img src="../../assets/audio/cb.png" alt />
        </span>
        <el-popover placement="top" width="200" trigger="click">
          <el-input-number
            v-model="ds"
            width="90"
            :precision="2"
            :step="0.1"
            :min="0.1"
            :max="2"
            @change="DoubleSpeed"
          />
          <span slot="reference" style="width:32px;cursor: pointer;">{{ ds +' X' }}</span>
        </el-popover>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator"
import WaveSurfer from "wavesurfer.js" //导入wavesurfer.js
import Timeline from "wavesurfer.js/dist/plugin/wavesurfer.timeline.js" //导入时间轴插件
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.js"
import { http } from "@/api/interceptors"
@Component({
  components: {}
})
export default class Audio extends Vue {
  @Prop() private audiocode
  @Watch("audiocode", { immediate: true, deep: true })
  change(val) {
    setTimeout(() => {
      this.wavesurfer.load(this.previewhttp + val)
    })
  }
  private wavesurfer = null
  private previewhttp = http + "file/preview/"
  private value = 10 //初始音量
  private ds = 1.0 // 播放倍速
  private iconshow = true
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  private jy = require("../../assets/audio/sound_no.png")
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  private dyl = require("../../assets/audio/sound_2.png")
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  private xyl = require("../../assets/audio/sound_1.png")
  private ylurl = ""
  private playMusic() {
    //"播放/暂停"按钮的单击触发事件，暂停的话单击则播放，正在播放的话单击则暂停播放
    this.wavesurfer.playPause.bind(this.wavesurfer)()
    this.iconshow = !this.iconshow
  }
  //音量测试
  private setVolume(val) {
    if (val / 100 >= 0.5) {
      this.ylurl = this.dyl
    } else if (val / 100 < 0.5 && val / 100 > 0 ) {
      this.ylurl = this.xyl
    } else if (val / 100 === 0) {
      this.ylurl = this.jy
    }
    this.wavesurfer.setVolume(val / 100)
  }
  private Volumeset() {
    this.wavesurfer.setVolume(0)
    this.ylurl = this.jy
    this.value = 0
  }
  // 重放
  private replay() {
    this.wavesurfer.stop()
  }
  // 后退，
  private rew() {
    this.wavesurfer.skip(-1)
  }
  // 前进，
  private speek() {
    this.wavesurfer.skip(1)
  }
  private DoubleSpeed(val) {
    this.wavesurfer.setPlaybackRate(val)
  }
  private mounted() {
    this.wavesurfer = WaveSurfer.create({
      container: this.$refs.waveform,
      cursorColor: "#f39800", // 光标的填充颜色，指示播放头的位置。
      // backgroundColor: "#6e7184", // 更改波形容器的背景颜色
      waveColor: "#5dc0de", // 更改波形容器的背景颜色。
      progressColor: "#778dad", // 光标后的波形填充颜色。
      backend: "MediaElement",
      mediaControls: false,
      height: 310,
      audioRate: "1", // 播放音频的速度
      primaryLabelInterval: this._primaryLabelInterval,
      formatTimeCallback: this._formatTimeCallback,
      timeInterval: this._timeInterval,
      //使用时间轴插件
      plugins: [
        Timeline.create({
          container: "#wave-timeline",
          primaryColor: "#fff",
          height: 16,
          secondaryFontColor: "#fff"
        }),
        // 光标插件
        CursorPlugin.create({
          showTime: true,
          opacity: 1,
          customShowTimeStyle: {
            "background-color": "rgba(0,0,0,0.3)",
            color: "#fff",
            padding: "2px",
            "font-size": "10px"
          }
        })
      ]
    })
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    this.ylurl = this.xyl
    this.wavesurfer.setVolume(0.1)
    this.wavesurfer.on("finish", function (e) {
      _that.iconshow=true
    })
    this.wavesurfer.load(this.previewhttp + this.audiocode)
   
  }
  private _primaryLabelInterval(pxPerSec) {
    var retval = 1
    if (pxPerSec >= 100) {
      retval = 2
    } else if (pxPerSec >= 80) {
      retval = 1
    } else if (pxPerSec >= 60) {
      retval = 1
    } else if (pxPerSec >= 40) {
      retval = 5
    } else if (pxPerSec >= 20) {
      retval = 2
    } else {
      retval = 1
    }
    return retval
  }
  private _timeInterval(pxPerSec) {
    var retval = 1
    if (pxPerSec >= 100) {
      // 0.5,1,1.5,2,...,9.5,10
      retval = 0.5
    } else if (pxPerSec >= 80) {
      // 1,2,...,9,10
      retval = 1
    } else if (pxPerSec >= 60) {
      // 2,4,6,8,10
      retval = 2
    } else if (pxPerSec >= 40) {
      // 5,10
      retval = 1
    } else if (pxPerSec >= 20) {
      retval = 5
    } else {
      retval = Math.ceil(0.5 / pxPerSec) * 60
    }
    return retval
  }
  private _formatTimeCallback(seconds, pxPerSec) {
    seconds = Number(seconds)
    var minutes = Math.floor(seconds / 60)
    seconds = seconds % 60
    var secondsStr = Math.round(seconds).toString()
    if (pxPerSec >= 25 * 10) {
      secondsStr = seconds.toFixed(2)
    } else if (pxPerSec >= 25 * 1) {
      secondsStr = seconds.toFixed(1)
    }
    if (minutes > 0) {
      if (seconds < 10) {
        secondsStr = "0" + secondsStr
      }
      return `${minutes}:${secondsStr}`
    }
    return secondsStr
  }
  private resetstate () {
    this.iconshow=true
    this.ds = 1
  }
}
</script>
<style lang="less" scope>
#waveform {
  position: relative;
}
.el-popover {
  min-width: 0 !important;
  padding: 12px 6px;
}
.Audiomodel {
  width: 100%;
}
.audiooperation {
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
  background: #3b3b3b;
  div {
    display: flex;
    justify-content: space-between;
    height: 35px;
    span {
      height: 35px;
      line-height: 35px;
      color: #fff;
      font-size: 14px;
      img {
        width: 22px;
        height: auto;
      }
    }
  }
  > div:nth-of-type(2) {
    span:nth-of-type(3) {
      margin: 0;
    }
  }
}
#waveform {
  cursor {
    border-right: 1px solid rgb(243, 152, 0) !important;
  }
  background-image: url("../../assets/audio/bj.png");
  background-size: 100% 100%;
}
</style>