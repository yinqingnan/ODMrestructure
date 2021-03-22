<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-03-03 10:59:48
 * @LastEditTime: 2021-03-03 15:24:53
 * @FilePath: \src\components\Echarts\Diskmsg.vue
 * @LastEditors: yqn
-->
<template>
  <div>
    <div id="Diskmsg" style="100%;height:222px"></div>
  </div>
</template>


<script lang="ts">
import echarts from "echarts"
import { Component, Prop, Vue ,Watch} from "vue-property-decorator"
@Component({
  components: {}
})
export default class Diskmsg extends Vue {

  public chartDom: any = null
  public getmydzd = [100]   //总共
  public getmydmc = [""]
  @Prop({
    required: true,
    type: Object
  }) public diskSpace

  @Watch("diskSpace", { immediate: true, deep: true })
  change(val){
    this.option = {
      title: [
        {
          text: "资料盘:",
          x: 59,
          y: 74,
          textStyle: {
            fontWeight: "normal",
            color: "#333",
            fontSize: 14
          }
        },
        {
          text: `${val.usable}可用，共${
            val.total
          }`,
          x: 59,
          y: 124,
          textStyle: {
            fontWeight: "normal",
            color: "#33",
            fontSize: 14
          }
        }
      ],
      grid: {
        left: "60",
        right: "60",
        bottom: "3%",
        top: "3%"
      },
      tooltip: {
        axisPointer: {
          type: "none"
        },
        formatter: function (params) {
          if (params.color === "#26a0da") {
            return "已使用" + "：" + params.value + "%"
          }
        }
      },
      xAxis: {
        show: false,
        type: "value"
      },
      yAxis: [
        {
          type: "category",
          inverse: true,
          axisLabel: {
            textStyle: {
              color: "#666666",
              fontSize: "14",
              lineHeight: 20
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: this.getmydmc
        },
        {
          type: "category",
          inverse: true,
          axisTick: "none",
          axisLine: "none",
          show: false,
          data: [val.ratio]
        }
      ],
      series: [
        {
          name: "值",
          type: "bar",
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: "#26a0da"
            }
          },
          barWidth: 15,
          data:  [val.ratio]
        },
        {
          name: "背景",
          type: "bar",
          barWidth: 15,
          barGap: "-100%",
          data: this.getmydzd,
          itemStyle: {
            normal: {
              color: "#dcdcdc",
              barBorderRadius: 5
            }
          }
        }
      ]
    }
    this.init()
  }

  public option = {}
  public init() {
    this.$nextTick(() => {
      // 执行图表对象的初始化
      this.chartDom = echarts.init(
      document.getElementById("Diskmsg") as HTMLCanvasElement
      )
      // 为图标表对象赋值
      this.chartDom.setOption(this.option,true)
    })

  }
  public mounted() {
    this.init()
    this.chartDom = echarts.init(
      document.getElementById("Diskmsg") as HTMLCanvasElement
    )
    window.addEventListener("resize", () => {
      this.chartDom.resize()
    })
  }
}
</script>


<style lang="less" scope>
</style>