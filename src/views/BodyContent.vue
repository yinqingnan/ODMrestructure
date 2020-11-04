<template>
  <div>
    <div class="layout">
      <LeftMenu :menudata="menudata" class="hidden-sm-and-down" />
      <RightContent class="right" />
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, Prop, Vue } from "vue-property-decorator";
import LeftMenu from "@/Layout/LeftMenu.vue";
import RightContent from "@/Layout/RightContent.vue";
@Component({
  components: {
    LeftMenu,
    RightContent
  }
})
export default class BodyContent extends Vue {
  private menudata: any = [];
  private num = 10;
  private data = [
    {
      title: "数据中心",
      children: [
        {
          key: "1",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "1",
            title: "音视频数据",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: [
            {
              key: "21",
              path: "/summaryprocedure",
              name: "vue",
              redirect: null,
              component: "",
              hidden: true,
              meta: {
                key: "21",
                title: "简易程序",
                icon: "",
                keepAlive: false,
                permission: null
              },
              children: null
            }
          ]
        },
        {
          key: "2",
          path: "/lawenforcementfile",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "2",
            title: "执法档案",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "3",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "3",
            title: "摄录统计",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "4",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "4",
            title: "关联统计",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        }
      ]
    },
    {
      title: "监督中心",
      children: [
        {
          key: "5",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "5",
            title: "考评结果",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: [
            {
              key: "81",
              path: "/audiodata",
              name: "form",
              redirect: null,
              component: "",
              hidden: false,
              meta: {
                key: "3",
                title: "考评统计--1",
                icon: "",
                keepAlive: false,
                permission: null
              },
              children: []
            },
            {
              key: "82",
              path: "/lawenforcementfile",
              name: "form",
              redirect: null,
              component: "",
              hidden: false,
              meta: {
                key: "3",
                title: "考评统计--2",
                icon: "",
                keepAlive: false,
                permission: null
              },
              children: []
            }
          ]
        },
        {
          key: "6",
          path: "/lawenforcementfile",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "6",
            title: "日常考评",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "7",
          path: "/lawenforcementfile",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "7",
            title: "随机抽查",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "8",
          path: "/lawenforcementfile",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "8",
            title: "考评统计",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        }
      ]
    },
    {
      title: "资产中心",
      children: [
        {
          key: "9",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "9",
            title: "执法仪",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: [
            {
              key: "10",
              path: "/summaryprocedure",
              name: "vue",
              redirect: null,
              component: "",
              hidden: true,
              meta: {
                key: "10",
                title: "执法仪--1",
                icon: "",
                keepAlive: false,
                permission: null
              },
              children: null
            },
            {
              key: "11",
              path: "/coercivemeasures",
              name: "vue",
              redirect: null,
              component: "",
              hidden: true,
              meta: {
                key: "30",
                title: "执法仪--2",
                icon: "",
                keepAlive: false,
                permission: null
              },
              children: null
            }
          ]
        },
        {
          key: "12",
          path: "/lawenforcementfile",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "12",
            title: "采集设备",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "13",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "13",
            title: "存储设备",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "14",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "14",
            title: "升级包管理",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "15",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "15",
            title: "资产统计",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        }
      ]
    },
    {
      title: "配置中心",
      children: [
        {
          key: "16",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "16",
            title: "关联规则",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "17",
          path: "/lawenforcementfile",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "17",
            title: "储存规则",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        },
        {
          key: "18",
          path: "/audiodata",
          name: "form",
          redirect: null,
          component: "",
          hidden: false,
          meta: {
            key: "18",
            title: "考评设置",
            icon: "",
            keepAlive: false,
            permission: null
          },
          children: []
        }
      ]
    }
  ];
  mounted() {
    this.menudata = this.data;
    // 实例化类
  }
}
</script>
<style lang="less" scope>
.layout {
  display: flex;
  height: ~"calc(100vh - 74px)";
}
.right {
  width: 100%;
  background: #fbfafc;
}
</style>
