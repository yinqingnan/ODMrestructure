
<template>
  <div class="layoutcontainer">
    <div class="containers" :style="{height:Height}" style="background:#fff">
      <div class="Lawarchivesheader">
        <h2>请设置自动关联时间范围</h2>
      </div>
      <div  class="lawarchives" >
        <div class="lawarchivescontent">
          视频关联档案：前
          <a-input placeholder v-model="time1" @blur="inputchange"/>
          分钟，后
          <a-input placeholder v-model="time2" @blur="inputchange"/>
          分钟。
        </div>
        <p>示例：假设案件违法时间为10:00,自动关联的视频排石时间范围为9:15 - 10:30</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { LimitInputlength, page, layouts } from "@/InterfaceVariable/variable"
@Component({})
export default class Lawarchives extends Vue {
  //
  [x: string]: any
  public DataM = new this.$api.configInterface.DataM()
  private LimitInputlength = LimitInputlength
  private Height = ""
  private time1 = ""
  private time2 = ""
  public mounted() {
    this.getdata()
    this.Height = `${document.documentElement.clientHeight - 140}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 230}px`
    })
  }
  private getdata() {
    this.DataM.getrelationdata({}).then((res: any) => {
      console.log(res)
      this.time1 = res.data[0].value
      this.time2 = res.data[1].value
    })
  }
  private inputchange(){
    this.DataM.relationsave({
      match_floor: this.time2,
      match_limit: this.time1,
    }).then((res) => {
      console.log(res)
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.getdata()
      }
    })
  }
}
</script>

<style lang="less" scope>
.Lawarchivesheader{
  height:49px;
  border-bottom: 1px solid #DDDDDD;
  line-height: 49px;
  h2{
    font-size: 12px;
    line-height: 49px;
    text-indent: 17px;
  }
}
.lawarchivescontent{
  padding-top: 25px;
  padding-left: 21px;
  display: flex;
  line-height: 32px;
  font-size: 12px;
  input{
    width: 80px;
    margin: 0 6px;
  }

}
.lawarchives{
  p{
    line-height: 20px;
    font-size: 12px;
    color:#E0731A;
    text-indent: 21px;
    margin-top: 6px;
  }
}  
</style>
