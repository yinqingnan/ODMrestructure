<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-02-08 13:54:21
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\views\Index\Home.vue
-->
<template>
  <div>
    <el-scrollbar class="homecontainer">
      <div class="homeheader">
        <div class="loginmsg">
          <h1>XXX-管理员</h1>
          <h2>上次登录时间：2020-12-01 11:33:10</h2>
          <h2>上次登录IP: XXX:XXX:XXX:XXX</h2>
        </div>
      </div>
      <div class="homeNotice">
        <h2>公告</h2>
        <ul>
          <el-scrollbar style="height:84px ">
            <li v-for="(item,index) in noticedata" :key="index">
              <span></span>
              {{item.text}}
            </li>
          </el-scrollbar>
        </ul>
      </div>
      <div class="hometable">
        <div class="hometable_header">
          <h2
            v-for="(item,index) in tablebtn"
            :key="index"
            class="texthover"
            @click="tbswitch(index)"
            :class="{'active': tbnum == index}"
          >{{item}}</h2>
        </div>
        <div>
          <vxe-grid
            border
            stripe
            resizable
            height="auto"
            show-header-overflow
            :columns="tableColumn"
            :data="tableData"
            class="mytable-scrollbar"
            ref="kptj"
            :seq-config="{startIndex: (page.currentPage - 1) * page.pageSize}"
            :row-class-name="tableRowClassName"
          >
            <template v-slot:nameslot="{ row }">
              <span v-if="row.activeTime">{{row.activeTime}}</span>
            </template>
          </vxe-grid>
          <p>
            <vxe-pager
              align="right"
              size="mini"
              :layouts="layouts"
              :current-page.sync="page.currentPage"
              :page-size.sync="page.pageSize"
              :total="page.totalResult"
              :page-sizes="[15, 50, 100, 200]"
              @page-change="pagerchange"
            />
          </p>
        </div>
        
      </div>
      <div class="home_Chart">
        <div class="home_Chart_header">
          <h2
            v-for="(item,index) in Timebtn"
            :key="index"
            class="texthover"
            :class="{'active': num == index}"
            @click="btn(index)"
          >{{item}}</h2>
        </div>
        <div class="home_Chart_contont">
          <div class="home_Chart_contont_left">
            <h2>我的视音频</h2>
            <ul>
              <li v-for="(item,index) in myvideolist" :key="index">
                <img :src="item.imgsrc" />
                <div>
                  <h2>{{item.text}}</h2>
                  <h3>{{item.content}}</h3>
                </div>
              </li>
            </ul>
          </div>
          <div >
             <div class="home_Chart_contont_center">
              <Uploadmap />
            </div>
            <div class="home_Chart_contont_right">
              <Correlationrate />
            </div>
          </div>
         
        </div>
      </div>
    </el-scrollbar> 
     <Testviews/>
  </div>
</template>

<script lang="ts">
import { Component,  Vue } from "vue-property-decorator"
import {  layouts } from "../../InterfaceVariable/variable"
import Uploadmap from "../../components/Echarts/Uploadmap.vue"
import Correlationrate from "@/components/Echarts/Correlationrate.vue"
import Testviews from '../Testviews/Testviews.vue'
@Component({
  components: {
    Uploadmap,
    Correlationrate,
    Testviews
  },
})
export default class Home extends Vue {
  private page = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private page1 = {
    currentPage: 1, //当前页数
    pageSize: 15, //每页多少条
    totalResult: 200, //总数
  }
  private layouts = layouts
  private tableData = []
  private tableData1 = []
  private noticedata = [
    {
      text:
        '重庆曹家湾站曾被外媒嘲讽为"中国鬼城" 成功逆袭,重庆曹家湾站曾被外媒嘲讽为"中国鬼城" 成功逆袭,重庆曹家湾站曾被外媒嘲讽为"中国鬼城" 成功逆袭',
    },
    { text: "印度中产阶级住小区有车位 贫民家连自来水都没有" },
    { text: "美国制裁华为，这家代工厂火速停止代工！19个月后" },
    { text: "成都1.5亿别墅建在湖上 在院子里就能钓鱼吃火锅" },
    { text: "中非部分地区发生武装交火：中国私营矿企被抢，数百" },
    { text: "台军方晋升将官名单公布，赖清德警卫主任坏规矩引争议" },
    { text: "印媒炒作中联部代表团访问尼泊尔，外交部回应" },
    { text: "周六，六位省级党政一把手都出席了这样的仪式，背后有深意" },
  ]
  private tableColumn = []
  private Evaluationresults = [
    { width: 50, fixed: null, title: "序号", align: "center", type: "seq" },
    {
      field: "fileName",
      title: "文件名称",
      minWidth: "217",
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
    {
      field: "recordDate",
      title: "摄录时间",
      type: "html",
      minWidth: 120,
      align: "center",
      showOverflow: true,
      slots: { default: "nameslot" },
      headerAlign: "left",
    },
    {
      field: "fileDuration_Name",
      title: "摄录时长",
      minWidth: 120,
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
    {
      field: "uploadDate",
      title: "导入时间",
      minWidth: 120,
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
    {
      field: "file_size",
      title: "文件大小",
      minWidth: 120,
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
  ]
  private Unmarkedvideo = [
    { width: 50, fixed: null, title: "序号", align: "center", type: "seq" },
    {
      field: "name",
      title: "文件名称",
      minWidth: "238",
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
    {
      field: "recordDate",
      title: "摄录时间",
      type: "html",
      minWidth: 142,
      align: "center",
      showOverflow: true,
      slots: { default: "nameslot" },
      headerAlign: "left",
    },
    {
      field: "fileDuration_Name",
      title: "摄录时长",
      type: "html",
      minWidth: 70,
      align: "center",
      showOverflow: true,
      slots: { default: "nameslot" },
      headerAlign: "left",
    },
    {
      field: "uploadDate",
      title: "导入时间",
      minWidth: "120",
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
    {
      field: "考评结果",
      title: "考评结果",
      minWidth: "120",
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
    {
      field: "evaluateItems",
      title: "扣分项",
      minWidth: "120",
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
    {
      field: "evaluateName",
      title: "扣分人",
      minWidth: "120",
      align: "center",
      showOverflow: true,
      headerAlign: "left",
    },
  ]
  private Timebtn = ["本周", "本月"]
  private tablebtn = ["未标注视频", "考评结果"]
  private myvideolist = [
    {
      imgsrc: require("../../assets/image/audio_type_whole.png"),
      text: "全部",
      content: "20",
    },
    {
      imgsrc: require("../../assets/image/audio_type_video.png"),
      text: "视频",
      content: "25",
    },
    {
      imgsrc: require("../../assets/image/audio_type_picture.png"),
      text: "录音",
      content: "30",
    },
    {
      imgsrc: require("../../assets/image/audio_type_recording.png"),
      text: "图片",
      content: "40",
    },
  ]
  public mounted() {
    this.tableColumn = this.Evaluationresults
  }
  private tableRowClassName(record: any, index: number) {
    return record.rowIndex % 2 === 0 ? "bgF5" : ""
  }
  private pagerchange({ currentPage, pageSize }) {
    if(this.tbnum ==0){
      return 
    }else{
      return
    }
    
  }

  private num = 0
  private btn(index) {
    this.num = index
  }
  private tbnum = 0
  private tbswitch(index) {
    this.tbnum = index
    this.tableColumn = index ? this.Unmarkedvideo : this.Evaluationresults
  }
}
</script>

<style lang="less" scope>
.homecontainer {
  min-width: 448px;
  background: #f5f5f5;
  padding: 14px 11px 0px 8px;
  height: calc(100vh - 115px);
}

.homeheader {
  height: 32px;
  text-indent: 14px;
  display: flex;
  margin-bottom: 10px;
  .loginmsg {
    width: 100%;
    display: flex;
    border: 1px solid #dddddd;
    h1 {
      font-size: 14px;
      color: #7f8893;
      margin: 0;
      text-align: center;
      line-height: 32px;
    }
    h2 {
      font-size: 12px;
      color: #7f8893;
      margin: 0;
      line-height: 32px;
      text-align: center;
    }
    h2:nth-of-type(1) {
      margin: 0 22px;
    }
  }
}
.homeNotice {
  width: 100%;
  border: 1px solid #dddddd;
  margin-bottom: 10px;
  ul {
    padding-top: 17px;
    height: 97px;
  }
  li {
    padding-left: 20px;
    line-height: 26px;
    color: #7f8893;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      color: #0cb9de;
      text-decoration: underline;
    }
    span {
      display: inline-block;
      width: 5px;
      margin-right: 8px;
      height: 5px;
      background: #7f8893;
      border-radius: 50px;
      vertical-align: middle;
      margin-bottom: 3px;
    }
  }
  h2 {
    font-size: 14px;
    color: #7f8893;
    text-indent: 13px;
    height: 35px;
    margin: 0;
    line-height: 35px;
    background: #e1e2e6;
  }
}
.hometable {
  height: 336px;
  .hometable_header {
    display: flex;
    width: 100%;
    border: 1px solid #e1e2e6;
    margin-right: 10px;
    height: 35px;
    line-height: 35px;
    background: #e1e2e6;
    h2 {
      width: 113px;
      font-size: 14px;
      margin: 0;
      height: 35px;
      line-height: 35px;
      text-align: center;
      cursor: pointer;
    }
    h2:first-child {
      border-right: 1px solid #c7c8cb;
    }
  }
  .vxe-table--body-wrapper {
    height: 212px !important;
  }
  .vxe-pager.size--mini {
    background: #fff;
    height: 43px !important;
  }
  .vxe-table .vxe-body--column.col--ellipsis,
  .vxe-table.vxe-editable .vxe-body--column,
  .vxe-table .vxe-footer--column.col--ellipsis,
  .vxe-table .vxe-header--column.col--ellipsis {
    height: 35px !important;
  }
}
.home_Chart {
  margin-top: 10px;
  height: 368px;
  border: 1px solid #dddddd;
  .home_Chart_header {
    display: flex;
    background: #e1e2e6;
    h2 {
      margin: 0;
      text-align: center;
      width: 56px;
      font-size: 14px;
      color: #7f8893;
      line-height: 36px;
      cursor: pointer;
    }
    h2:first-child {
      border-right: 1px solid #c7c8cb;
    }
  }
}
.active {
  color: #7eb5e8 !important;
}
.texthover:hover {
  color: #7eb5e8 !important;
}
.home_Chart_contont {
  display: flex;
  height: calc(100% - 36px);
  // justify-content: ;
  > div:nth-of-type(1) {
    height: 100%;
  }
  > div:nth-of-type(2) {
    height: 100%;
    width: 100%;
    display: flex;
  }
  .home_Chart_contont_left {
    max-width: 274px;
    min-width: 274px;
    width: 30%;
    padding-left: 13px;
    h2 {
      font-size: 14px;
      margin: 27px 0;
    }
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 50%;
        display: flex;
        margin-bottom: 48px;
        img {
          width: 36px;
          height: 36px;
          margin-right: 4px;
        }
        h2 {
          margin: 0;
          font-size: 14px;
          color: #7f8893;
          line-height: 1;
          margin-top: 4px;
        }
        h3 {
          margin: 0;
          font-size: 14px;
          color: #7f8893;
          line-height: 1;
          margin-top: 3px;
        }
      }
    }
  }
  .home_Chart_contont_center {
    width: 50%;
    margin-right: 30px;
  }
  .home_Chart_contont_right {
    width: 50%;
  }
}
</style>
