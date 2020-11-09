/* eslint-disable @typescript-eslint/no-this-alias */
<template>
  <div style="height:100%">
    <div class="layout">
      <LeftMenu :data="data" class="hidden-sm-and-down" />
      <RightContent class="right" :myWH="myWH" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import LeftMenu from "@/Layout/LeftMenu.vue";
import RightContent from "@/Layout/RightContent.vue";
const Tabs = namespace("Tabs");
@Component({
  components: {
    LeftMenu,
    RightContent
  }
})
export default class BodyContent extends Vue {
  @Tabs.Mutation("addtbs")
  addtabs!: (val: any) => {};
  private menudata: any = [];
  private num = 10;
  public myWH = {
    width: 1,
    height: 1
  };
  private data = [
    {
      key: "1",
      path: "/home",
      name: "home",
      redirect: null,
      component: "report/home.html",
      hidden: false,
      meta: {
        key: "1",
        title: "系统首页",
        icon: "&#xe6c1;",
        keepAlive: false,
        permission: null
      },
      children: null
    },
    {
      key: "2",
      path: "/report",
      name: "report",
      redirect: null,
      component: "layout/index.vue",
      hidden: false,
      meta: {
        key: "2",
        title: "统计分析",
        icon: "&#xe691;",
        keepAlive: false,
        permission: null
      },
      children: [
        {
          key: "9",
          path: "/recording",
          name: "recording",
          redirect: null,
          component: "report/recording.html",
          hidden: false,
          meta: {
            key: "9",
            title: "摄录统计",
            icon: "&#xe695;",
            keepAlive: false,
            permission: ["recording:export"]
          },
          children: null
        },
        {
          key: "10",
          path: "/lawcase",
          name: "lawcase",
          redirect: null,
          component: "report/lawcase.html",
          hidden: false,
          meta: {
            key: "10",
            title: "关联统计",
            icon: "&#xe694;",
            keepAlive: false,
            permission: ["lawcase:export"]
          },
          children: null
        },
        {
          key: "11",
          path: "/label",
          name: "label",
          redirect: null,
          component: "report/label.html",
          hidden: false,
          meta: {
            key: "11",
            title: "标注考评",
            icon: "&#xe6b4;",
            keepAlive: false,
            permission: ["label:export"]
          },
          children: null
        },
        {
          key: "12",
          path: "/assets",
          name: "assets",
          redirect: null,
          component: "report/assets.html",
          hidden: false,
          meta: {
            key: "12",
            title: "资产统计",
            icon: "&#xe693;",
            keepAlive: false,
            permission: ["assets:export"]
          },
          children: null
        }
      ]
    },
    {
      key: "3",
      path: "/file",
      name: "file",
      redirect: null,
      component: "layout/index.vue",
      hidden: false,
      meta: {
        key: "3",
        title: "数据管理",
        icon: "&#xe664;",
        keepAlive: false,
        permission: null
      },
      children: [
        {
          key: "13",
          path: "/avData",
          name: "avData",
          redirect: null,
          component: "avData/avData.html",
          hidden: false,
          meta: {
            key: "13",
            title: "视音频数据",
            icon: "&#xe66d;",
            keepAlive: false,
            permission: [
              "lawarchives:avDate:foreBtn",
              "lawarchives:avDate:twoTab",
              "lawarchives:avDate:download",
              "lawarchives:avDate:twoDel",
              "lawarchives:avDate:threeBtn",
              "lawarchives:avDate:deletes",
              "lawarchives:avDate:downloads",
              "lawarchives:avDate:oneBtn",
              "lawarchives:avDate:look",
              "lawarchives:avDate:fourTab",
              "lawarchives:avDate:twoAdd"
            ]
          },
          children: null
        },
        {
          key: "14",
          path: "/lllegalData",
          name: "lllegalData",
          redirect: null,
          component: "lawarchives/lllegalData.html",
          hidden: false,
          meta: {
            key: "14",
            title: "违法数据",
            icon: "&#xe697;",
            keepAlive: false,
            permission: [
              "lawarchives:lllegalData:addRelated",
              "lawarchives:lllegalData:download",
              "lawarchives:lllegalData:delRelated",
              "lawarchives:lllegalData:file",
              "lawarchives:lllegalData:look"
            ]
          },
          children: null
        },
        {
          key: "15",
          path: "/lawarchives",
          name: "config",
          redirect: null,
          component: "lawarchives/config.html",
          hidden: false,
          meta: {
            key: "15",
            title: "关联设置",
            icon: "&#xe694;",
            keepAlive: false,
            permission: ["lawarchives:config:save"]
          },
          children: null
        },
        {
          key: "16",
          path: "/recording",
          name: "recording",
          redirect: null,
          component: "lawarchives/storageCategory.html",
          hidden: false,
          meta: {
            key: "16",
            title: "存储类别",
            icon: "&#xe66e;",
            keepAlive: false,
            permission: [
              "lawarchives:storageCategory:save",
              "lawarchives:storageCategory:update",
              "lawarchives:storageCategory:delete"
            ]
          },
          children: null
        }
      ]
    },
    {
      key: "4",
      path: "/supervise",
      name: "supervise",
      redirect: null,
      component: "layout/index.vue",
      hidden: false,
      meta: {
        key: "4",
        title: "监督管理",
        icon: "&#xe6b2;",
        keepAlive: false,
        permission: null
      },
      children: [
        {
          key: "17",
          path: "/evalRecord",
          name: "evalRecord",
          redirect: null,
          component: "fileEvaluate/evaluationRecord.html",
          hidden: false,
          meta: {
            key: "17",
            title: "考评记录",
            icon: "&#xe6b6;",
            keepAlive: false,
            permission: [
              "fileEvaluate:evaluationRecord:download",
              "evaluationRecord:twoTab",
              "fileEvaluate:evaluationRecord:look"
            ]
          },
          children: null
        },
        {
          key: "18",
          path: "/evalDaily",
          name: "evalDaily",
          redirect: null,
          component: "fileEvaluate/evaluationDaily.html",
          hidden: false,
          meta: {
            key: "18",
            title: "日常监督",
            icon: "&#xe6bf;",
            keepAlive: false,
            permission: [
              "fileEvaluate:evaluationDaily:saveEva",
              "evaluationDaily:twoTab",
              "fileEvaluate:evaluationDaily:download",
              "fileEvaluate:evaluationDaily:look"
            ]
          },
          children: null
        },
        {
          key: "19",
          path: "/evalRandom",
          name: "evalRandom",
          redirect: null,
          component: "fileEvaluate/evaluationRandom.html",
          hidden: false,
          meta: {
            key: "19",
            title: "随机抽查",
            icon: "&#xe6b7;",
            keepAlive: false,
            permission: [
              "fileEvaluate:evaluationRandom:look",
              "fileEvaluate:evaluationRandom:download",
              "evaluationRandom:twoTab",
              "fileEvaluate:evaluationRandom:saveEva"
            ]
          },
          children: null
        },
        {
          key: "20",
          path: "/evalSet",
          name: "evalSet",
          redirect: null,
          component: "fileEvaluate/evSet.html",
          hidden: false,
          meta: {
            key: "20",
            title: "考评设置",
            icon: "&#xe6b8;",
            keepAlive: false,
            permission: ["fileEvaluate:evSet:save", "fileEvaluate:evSet:add"]
          },
          children: null
        }
      ]
    },
    {
      key: "5",
      path: "/mdm",
      name: "mdm",
      redirect: null,
      component: "layout/index.vue",
      hidden: false,
      meta: {
        key: "5",
        title: "设备管理",
        icon: "&#xe66b;",
        keepAlive: false,
        permission: null
      },
      children: [
        {
          key: "21",
          path: "/matche",
          name: "matche",
          redirect: null,
          component: "device/matche.html",
          hidden: false,
          meta: {
            key: "21",
            title: "执法仪",
            icon: "&#xe67d;",
            keepAlive: false,
            permission: [
              "device:matche:export",
              "device:matche:list",
              "device:matche:save",
              "device:matcherepairs:acive",
              "device:matche:import",
              "device:matche:delete",
              "device:matcheRepair:list",
              "device:matche:update",
              "device:matche:repair",
              "device:matche:active"
            ]
          },
          children: null
        },
        {
          key: "22",
          path: "/stations",
          name: "stations",
          redirect: null,
          component: "device/stations.html",
          hidden: false,
          meta: {
            key: "22",
            title: "采集站",
            icon: "&#xe67c;",
            keepAlive: false,
            permission: [
              "device:stations:active",
              "device:stations:disable",
              "device:stations:list",
              "device:stations:sync",
              "device:stations:delete",
              "device:stations:restart",
              "device:stations:upgrade",
              "device:stations:export",
              "device:stations:shutdown"
            ]
          },
          children: null
        },
        {
          key: "23",
          path: "/storage",
          name: "storage",
          redirect: null,
          component: "device/storage.html",
          hidden: false,
          meta: {
            key: "23",
            title: "存储服务器",
            icon: "&#xe67e;",
            keepAlive: false,
            permission: [
              "device:storage:delete",
              "device:storage:list",
              "device:storageFtp:delete",
              "device:storage:save",
              "device:storageFtp:save",
              "device:storage:update",
              "device:storage:ftp",
              "device:storageFtp:update"
            ]
          },
          children: null
        },
        {
          key: "24",
          path: "/platform",
          name: "platform",
          redirect: null,
          component: "device/platform.html",
          hidden: false,
          meta: {
            key: "24",
            title: "子平台",
            icon: "&#xe6b9;",
            keepAlive: false,
            permission: ["device:platform:list", "device:platform:delete"]
          },
          children: null
        }
      ]
    },
    {
      key: "6",
      path: "/devops",
      name: "devops",
      redirect: null,
      component: "layout/index.vue",
      hidden: false,
      meta: {
        key: "6",
        title: "运维管理",
        icon: "&#xe6b3;",
        keepAlive: false,
        permission: null
      },
      children: [
        {
          key: "25",
          path: "/oMonitor",
          name: "oMonitor",
          redirect: null,
          component: "oMonitor/oMonitor.html",
          hidden: false,
          meta: {
            key: "25",
            title: "运行监控",
            icon: "&#xe6be;",
            keepAlive: false,
            permission: [
              "edvice:oMonitor:zptlist",
              "edvice:oMonitor:cjzlist",
              "edvice:oMonitor:fwqlist"
            ]
          },
          children: null
        },
        {
          key: "26",
          path: "/accessAuth",
          name: "accessAuth",
          redirect: null,
          component: "system/authorization.html",
          hidden: false,
          meta: {
            key: "26",
            title: "接入管理",
            icon: "&#xe687;",
            keepAlive: false,
            permission: [
              "system:authorization:cjz",
              "system:authorization:update",
              "system:authorization:list",
              "system:authorization:zpt",
              "system:authorization:delete"
            ]
          },
          children: null
        },
        {
          key: "27",
          path: "/upgrade",
          name: "upgrade",
          redirect: null,
          component: "system/upgrade.html",
          hidden: false,
          meta: {
            key: "27",
            title: "升级管理",
            icon: "&#xe6ba;",
            keepAlive: false,
            permission: [
              "system:upgrade:list",
              "system:upgrade:delete",
              "system:upgrade:save",
              "system:upgrade:update"
            ]
          },
          children: null
        },
        {
          key: "28",
          path: "/operationLog",
          name: "operationLog",
          redirect: null,
          component: "base/log.html",
          hidden: false,
          meta: {
            key: "28",
            title: "日志管理",
            icon: "&#xe681;",
            keepAlive: false,
            permission: ["base:log:list", "base:log:export"]
          },
          children: null
        }
      ]
    },
    {
      key: "7",
      path: "/organize",
      name: "organize",
      redirect: null,
      component: "layout/index.vue",
      hidden: false,
      meta: {
        key: "7",
        title: "组织管理",
        icon: "&#xe66a;",
        keepAlive: false,
        permission: null
      },
      children: [
        {
          key: "29",
          path: "/dept",
          name: "dept",
          redirect: null,
          component: "base/dept.html",
          hidden: false,
          meta: {
            key: "29",
            title: "部门管理",
            icon: "&#xe679;",
            keepAlive: false,
            permission: [
              "base:dept:list",
              "base:dept:import",
              "base:dept:delete",
              "base:dept:save",
              "base:dept:export",
              "base:dept:update",
              "base:dept:savelow"
            ]
          },
          children: null
        },
        {
          key: "30",
          path: "/user",
          name: "user",
          redirect: null,
          component: "base/user.html",
          hidden: false,
          meta: {
            key: "30",
            title: "用户管理",
            icon: "&#xe67a;",
            keepAlive: false,
            permission: [
              "base:user:update",
              "base:user:export",
              "base:user:list",
              "base:user:accessdd",
              "base:user:delete",
              "base:user:save",
              "base:user:import",
              "base:user:reset",
              "base:user:access",
              "base:user:4glist"
            ]
          },
          children: null
        },
        {
          key: "31",
          path: "/role",
          name: "role",
          redirect: null,
          component: "role.html",
          hidden: false,
          meta: {
            key: "31",
            title: "角色管理",
            icon: "&#xe67b;",
            keepAlive: false,
            permission: [
              "role:update",
              "role:list",
              "role:delete",
              "role:refright",
              "role:save",
              "role:right"
            ]
          },
          children: null
        },
        {
          key: "33",
          path: "/right",
          name: "right",
          redirect: null,
          component: "Root/rootManagement.html",
          hidden: false,
          meta: {
            key: "33",
            title: "权限管理",
            icon: "&#xe688;",
            keepAlive: false,
            permission: [
              "menu:right:list",
              "right:list",
              "right:refmenu",
              "right:update",
              "right:delete",
              "right:save"
            ]
          },
          children: null
        }
      ]
    },
    {
      key: "8",
      path: "/system",
      name: "system",
      redirect: null,
      component: "layout/index.vue",
      hidden: false,
      meta: {
        key: "8",
        title: "系统管理",
        icon: "&#xe66c;",
        keepAlive: false,
        permission: null
      },
      children: [
        {
          key: "34",
          path: "/Announcement",
          name: "Announcement",
          redirect: null,
          component: "system/notice.html",
          hidden: false,
          meta: {
            key: "34",
            title: "公告管理",
            icon: "&#xe6c3;",
            keepAlive: false,
            permission: [
              "system:notice:update",
              "system:notice:export",
              "system:notice:delete",
              "system:notice:list",
              "system:notice:save"
            ]
          },
          children: null
        },
        {
          key: "35",
          path: "/Dictionary",
          name: "Dictionary",
          redirect: null,
          component: "base/dict.html",
          hidden: false,
          meta: {
            key: "35",
            title: "数据字典",
            icon: "&#xe6bc;",
            keepAlive: false,
            permission: [
              "base:dict:list",
              "base:dict:delete",
              "base:dict:save",
              "base:dict:update"
            ]
          },
          children: null
        },
        {
          key: "36",
          path: "/Setting",
          name: "Setting",
          redirect: null,
          component: "system/setting.html",
          hidden: false,
          meta: {
            key: "36",
            title: "系统设置",
            icon: "&#xe67f;",
            keepAlive: false,
            permission: ["system:setting:list", "system:setting:save"]
          },
          children: null
        },
        {
          key: "37",
          path: "/HighConfig",
          name: "HighConfig",
          redirect: null,
          component: "system/highConfig.html",
          hidden: false,
          meta: {
            key: "37",
            title: "高级设置",
            icon: "&#xe6c0;",
            keepAlive: false,
            permission: ["system:highConfig:list", "system:highConfig:update"]
          },
          children: null
        },
        {
          key: "38",
          path: "/Authorization",
          name: "Authorization",
          redirect: null,
          component: "base/authInfo.html",
          hidden: false,
          meta: {
            key: "38",
            title: "授权信息",
            icon: "&#xe6bd;",
            keepAlive: false,
            permission: null
          },
          children: null
        }
      ]
    }
  ];
  mounted() {
    this.menudata = this.data;
    this.addtabs(this.data[0]);
    // window.onbeforeunload = function(e) {
    //   console.log(e);
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "关闭提示";
    //   }
    //   return "关闭提示";
    // };
    // localStorage.setItem("Tabslist", JSON.stringify(this.data[0]));
  }
}
</script>
<style lang="less" scope>
.layout {
  display: flex;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.right {
  width: 100%;
  background: #fbfafc;
}
</style>
