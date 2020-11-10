<template>
  <div>
    <div :style="{height:Height}" class="lawarchives">
      <div>
        <ul>
          <li>
            <span>*</span>
            <h2>自动关联违法时间偏移上限：</h2>
            <a-input placeholder v-model="time1" />
            <h3>（视音频数据相较于案件违法时间向前偏移分钟数）</h3>
          </li>
          <li>
            <span>*</span>
            <h2>自动关联违法时间偏移下限：</h2>
            <a-input placeholder v-model="time2" />
            <h3>（视音频数据相较于案件违法时间向后偏移分钟数）</h3>
          </li>
          <li>
            <button @click="btn">提交</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import { LimitInputlength } from "../../InterfaceVariable/variable"
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
  private btn(){
    console.log(this.time1)
    console.log(this.time2)
    this.DataM.relationsave({
      match_floor: this.time2,
      match_limit:this.time1
    }).then((res)=>{
      console.log(res)
      if(res.code == 0){
        this.$message.success(res.msg)
        this.getdata()
      }
    })
  }
}
</script>

<style lang="less" scope>
.lawarchives {
  margin-top: 8px;
  padding: 0 26px;
  ul {
    margin-top: 30px;
  }
  li {
    list-style: none;
    display: flex;
    margin-bottom: 14px;
    span {
      color: red;
      margin-right: 4px;
    }
    h2 {
      font-size: 14px;
      color: #333;
      width: 200px;
      line-height: 32px;
    }
    h3 {
      width: 325px;
      font-size: 14px;
      line-height: 32px;
      color: #333;
    }
    input {
      width: 180px;
    }
    button{
      width: 64px;
      height: 32px;
      line-height: 32px;
      color:#fff;
      background: #207ebd;
      outline: none;
      cursor: pointer;
      border:0;
      margin-left: 210px;
    }
  }
}
</style>
