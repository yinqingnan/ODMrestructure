<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2020-12-29 15:24:39
 * @LastEditTime: 2020-12-30 17:22:04
 * @FilePath: \src\components\Echarts\Uploadmap.vue
-->
<template>
  <div>
    <!-- <h2>Uploadmap</h2> -->
    <div id="chart" style="100%;height:330px"></div>
  </div>
</template>
<script lang="ts">
import echarts from "echarts"
import { Component, Prop, Vue } from "vue-property-decorator"

@Component({
  components: {},
})
export default class Uploadmap extends Vue {
  public chartDom: any = null
  public color = [
    "#0090FF",
    "#36CE9E",
    "#FFC005",
    "#FF515A",
    "#8B5CFF",
    "#00CA69",
  ]
  public echartData = [
    {
      name: "1",
      value1: 100,
      value2: 233,
    },
    {
      name: "2",
      value1: 138,
    },
    {
      name: "3",
      value1: 350,
    },
    {
      name: "4",
      value1: 173,
    },
    {
      name: "5",
      value1: 180,
    },
    {
      name: "6",
      value1: 150,
    },
    {
      name: "7",
      value1: 180,
    },
    {
      name: "8",
      value1: 230,
    },
    {
      name: "9",
      value1: 240,
    },
    {
      name: "10",
      value1: 230,
    },
    {
      name: "11",
      value1: 230,
    },
    {
      name: "12",
      value1: 230,
    },
  ]
  public xAxisData = this.echartData.map((v) => v.name)
  public yAxisData1 = this.echartData.map((v) => v.value1)
  public hexToRgba = (hex, opacity) => {
    let rgbaColor = ""
    let reg = /^#[\da-f]{6}$/i
    if (reg.test(hex)) {
      rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
        "0x" + hex.slice(3, 5)
      )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`
    }
    return rgbaColor
  }
  public option = {
    title: {
      text: '视音频上传趋势图',
      left:'center',
      top:'20',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bolder',
        color: '#7F8893'                            
      },
    },
    backgroundColor: "#fff",
    color: this.color,
    legend: {
      right: 10,
      top: 10,
    },
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        let html = ""
        params.forEach((v) => {
          html += `
          <div class="formattercontent">
            <div>
              时间：${v.name}
            </div>
            <div class="formattertext">
            数量：${v.value}个
            </div>
          </div>
          `
        })
        return html
      },
      extraCssText:
        "background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
      axisPointer: {
        type: "shadow",
        shadowStyle: {
          color: "#ffffff",
          shadowColor: "rgba(225,225,225,1)",
          shadowBlur: 5,
        },
      },
    },
    grid: {
      y: 100,
      x:60,
      x2: 10,
      y2: 30,
      containLabel: false,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        axisLabel: {
          formatter: "{value}月",
          textStyle: {
            color: "#333",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#D9D9D9",
          },
        },
        data: this.xAxisData,
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "单位：个",
        axisLabel: {
          textStyle: {
            color: "#666",
          },
        },
        nameTextStyle: {
          color: "#666",
          fontSize: 12,
          lineHeight: 40,
        },
        splitLine: {
          lineStyle: {
            type: "dashed",
            color: "#E9E9E9",
          },
        },
        axisLine: {
          lineStyle: {
            color: "#D9D9D9",
          },
        },
        axisTick: {
          show: false,
        },
      },
    ],
    series: [
      {
        type: "line",
        smooth: true,
        // showSymbol: false,/
        symbolSize: 0,
        zlevel: 3,
        areaStyle: {
          normal: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#9ee7fe'// 0% 处的颜色
                }, {
                    offset: 1, color:'#ffffff'  // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            },
       
            shadowColor: this.hexToRgba(this.color[0], 0.1),
            shadowBlur: 0,
          },
        },
        itemStyle: {
						normal: {
							color: "#54c3f3", //折线点的颜色
							lineStyle: {
								color: "#54c3f3" //折线的颜色
							}
						}
					},
        data: this.yAxisData1,
      },
    ],
  }
  public init() {
    // 执行图表对象的初始化
    this.chartDom = echarts.init(document.getElementById("chart") as HTMLCanvasElement)
    // 为图标表对象赋值
    this.chartDom.setOption(this.option)
  }
  public mounted() {
    this.init()
    this.chartDom = echarts.init(document.getElementById("chart") as HTMLCanvasElement)
    window.addEventListener("resize", () => {
      this.chartDom.resize()
    })
  }
}
</script>

<style lang="less" scope>
.formattercontent{
  width: 140px;
  height: 40px;
  border-radius: 10px;
  background: #fff;
}
.formattertext {
  color: #666;
  font-size: 14px;
  line-height: 24px;
}
</style>