<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-03-03 10:36:27
 * @LastEditTime: 2021-04-15 10:39:05
 * @FilePath: \src\components\Echarts\Bingtu.vue
 * @LastEditors: yqn
-->
<template>
  <div>
    <div id="piechart" style="100%;height:222px"></div>
  </div>
</template>


<script lang="ts">
import echarts from "echarts"
import { Component, Prop, Vue, Watch } from "vue-property-decorator"
@Component({
  components: {}
})
export default class Piechart extends Vue {
  @Prop({}) public UploadRatio
  @Watch("UploadRatio", { immediate: true, deep: true })
  change(val) {
    this.option = {
      title: [
        {
          text: val + "%",
          x: "center",
          y: 118,
          textStyle: {
            fontWeight: "normal",
            color: "#29EEF3",
            fontSize: "20"
          }
        },
        {
          text: "上传情况",
          x: 13,
          y: 23,
          textStyle: {
            fontWeight: "normal",
            color: "#666",
            fontSize: 14
          }
        }
      ],
      tooltip: {
        enterable: false,
        formatter: function (params) {
          return params.name + "：" + params.percent + " %"
        }
      },
      legend: {
        show: false,
        itemGap: 50,
        data: ["使用", "剩余"],
        top: 20
      },
      series: [
        {
          name: "circle",
          type: "pie",
          clockWise: true,
          radius: ["50%", "66%"],
          top: 40,
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          //  hoverAnimation: false,
          data: [
            {
              value: val,
              name: "使用",
              itemStyle: {
                normal: {
                  color: {
                    // 颜色渐变
                    colorStops: [
                      {
                        offset: 0,
                        color: "#4FADFD" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#28E8FA" // 100% 处的颜色1
                      }
                    ]
                  },
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            },
            {
              name: "剩余",
              value: this.handred - val,
              itemStyle: {
                normal: {
                  color: "#e1e2e6",
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                },
                emphasis: {
                  color: "#e1e2e6" //移入后的颜色
                }
              }
            }
          ]
        }
      ]
    }
    this.init()
  }
  public chartDom: any = null
  public handred = 100
  public option = {}
  public init() {
    this.$nextTick(() => {
      // 执行图表对象的初始化
      this.chartDom = echarts.init(
        document.getElementById("piechart") as HTMLCanvasElement
      )
      // 为图标表对象赋值
      this.chartDom.setOption(this.option, true)
    })
  }
  public mounted() {
    this.init()
    this.chartDom = echarts.init(
      document.getElementById("piechart") as HTMLCanvasElement
    )
    window.addEventListener("resize", () => {
      this.chartDom.resize()
    })
  }
}
</script>


<style lang="less" scope>
</style>