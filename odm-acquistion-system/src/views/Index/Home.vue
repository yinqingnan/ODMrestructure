<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-04-20 17:52:23
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\views\Index\Home.vue
-->
<template>
  <div>
    <el-scrollbar class="homecontainer">
      <div class="homeheader">
        <div class="loginmsg">
          <h1>{{user.name}}-{{user.roleNames}}</h1>
          <h2>上次登录时间：{{user.lastLoginTime}}</h2>
          <h2>上次登录IP: {{user.lastLoginIp}}</h2>
        </div>
      </div>
      <div class="Softwareinformation">
        <div>
          <h2>软件版本</h2>
          <div>
            <h2 style="margin:0">桌面软件版本：</h2>
            <h3>{{workStation.pc_ver}}</h3>
            <h2>站点软件版本：</h2>
            <h3>{{workStation.web_ver}}</h3>
          </div>
        </div>
        <div>
          <h2>基础网络信息</h2>
          <div>
            <h2 style="margin:0">IP地址：</h2>
            <h3>{{network.ip}}</h3>
            <h2>MAC地址：</h2>
            <h3>{{network.mac}}</h3>
          </div>
        </div>
        <div>
          <h2>平台接入信息</h2>
          <div v-if="workStation.openCloud">
            <h1>已接入上级平台，用户、设备将在上级平台管理。</h1>
            <h2>平台IP：</h2>
            <h3>{{workStation.cloudIp}}</h3>
            <h2>上次心跳时间：</h2>
            <h3>{{workStation.heartbeatTime}}</h3>
          </div>
          <div v-else>
            <h1>未接入平台</h1>
          </div>
        </div>
      </div>
      <div class="home_Chart">
        <div class="home_Chart_left">
          <h2 class="texthover">音视频数据</h2>
          <div class="home_Chart_left_content">
            <ul>
              <li v-for="(item,index) in myvideolist" :key="index">
                <img :src="item.imgsrc" />
                <div>
                  <h2>{{item.text}}</h2>
                  <h3>{{item.content}}</h3>
                </div>
              </li>
            </ul>
            <div class="Dividing"></div>
            <div class="pie">
              <!-- <h2>上传情况</h2> -->
              <Piechart :UploadRatio='fileStat.uploadRatio'/>
            </div>
          </div>
        </div>

        <div class="home_Chart_right">
          <h2 class="texthover">磁盘信息</h2>
          <Diskmsg :diskSpace='diskSpace'/>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import Piechart from "@/components/Echarts/Bingtu.vue"
import Diskmsg from '@/components/Echarts/Diskmsg.vue'
import { Component, Vue } from "vue-property-decorator"

@Component({
  components: {
    Piechart,Diskmsg
  }
})
export default class Home extends Vue {
  [x: string]: any
  public Login = new this.$api.configInterface.Login()

  private diskSpace = {
    ratio: 0,
    total: "",
    usable: ""
  }
  private fileStat = {
    audio: 0,
    photo: 0,
    total: 0,
    uploadRatio: 0,
    video: 0
  }
  private network = {
    gateway: "",
    ip: "",
    mac: ""
  }
  private user = {
    code: "",
    dataPermission: 0,
    lastLoginIp: "",
    lastLoginTime: "",
    menus: null,
    name: "",
    openCloud: true,
    roleNames: "",
    system: true,
    userId: "4"
  }
  private workStation = {
    cloudIp: "",
    code: "",
    heartbeatTime: "",
    name: "",
    openCloud: true,
    pc_ver: "",
    web_ver: ""
  }
  private myvideolist = []
  public mounted() {
    this.getdata()
  }
  private num = 1
  private getdata() {
    this.Login.homePage().then((res) => {
      res.data.diskSpace.ratio = res.data.diskSpace.ratio.toFixed(2)
      this.diskSpace = res.data.diskSpace
      this.fileStat = res.data.fileStat
      this.network = res.data.network
      this.user = res.data.user
      this.workStation = res.data.workStation
      this.myvideolist = [
        {
          imgsrc: require("../../assets/image/audio_type_whole.png"),
          text: "全部",
          content: this.fileStat.total
        },
        {
          imgsrc: require("../../assets/image/audio_type_video.png"),
          text: "视频",
          content: this.fileStat.video
        },
        {
          imgsrc: require("../../assets/image/audio_type_picture.png"),
          text: "图片",
          content: this.fileStat.photo
        },
        {
          imgsrc: require("../../assets/image/audio_type_recording.png"),
          text: "录音",
          content: this.fileStat.audio
        }
      ]
      if(res.data.fileStat.uploadRatio>0){
        this.fileStat.uploadRatio = Number(res.data.fileStat.uploadRatio.toFixed(2))
      }
    })
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
  margin-top: 17px;
  height: 258px;
  display: flex;
  .texthover {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #333;
    text-indent: 13px;
    background: #e1e2e6;
    margin: 0;
  }
  .home_Chart_left {
    width: 68%;
    min-width: 727px;
    .home_Chart_left_content {
      height: calc(100% - 36px);
      display: flex;
      border: 1px solid #dddddd;
      ul {
        margin: 0;
        max-width: 300px;
        min-width: 300px;
        height: calc(100% - 36px);
        display: flex;
        flex-wrap: wrap;
        padding: 36px 29px 67px 16px;
        li {
          width: 50%;
          display: flex;
          margin-bottom: 30px;
          img {
            width: 36px;
            height: 36px;
            margin-top: 10px;
            margin-right: 6px;
          }
          h2 {
            font-size: 14px;
            color: #7f8893;
            margin: 0;
            margin-top: 5px;
          }
          h3 {
            font-size: 14px;
            color: #7f8893;
            margin: 0;
          }
        }
      }
      .pie{
        width:calc(100% - 300px)
      }
      
    }
  }
  .home_Chart_right {
    width: 33.5%;
    min-width: 358px;
    margin-left: 11px;
    border: 1px solid #dddddd;
  }
}
.Dividing {
  height: 80%;
  margin-top: 23px;
  border-right:1px solid #dcdcdc
}
.active {
  color: #7eb5e8 !important;
}
.home_Chart_contont {
  height: 36px;
  border: 1px solid #e1e1e1;
}

.Softwareinformation {
  display: flex;
  > div {
    width: 33%;
    min-width: 355px;
    height: 187px;
    > h2 {
      background-color: #e1e2e6;
      font-size: 14px;
      color: #333;
      height: 35px;
      line-height: 35px;
      margin: 0;
      text-indent: 11px;
    }
    > div {
      padding: 18px 0 0 12px;
      border: 1px solid #dddddd;
      height: 160px;
      h1 {
        color: #cc0000;
        margin: 0;
        font-size: 12px;
        line-height: 1;
      }
      h2 {
        margin: 0;
        font-size: 12px;
        line-height: 1;
        color: #666;
        font-weight: 600;
        margin-top: 16px;
      }
      h3 {
        margin: 0;
        font-size: 12px;
        line-height: 1;
        color: #666;
        font-weight: 400;
        margin-top: 16px;
      }
    }
  }
  > div:nth-last-of-type(2) {
    margin: 0 9px;
  }
}
</style>
