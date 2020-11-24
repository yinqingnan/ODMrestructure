<template>
  <div>
    <el-scrollbar class="Column">
      <div>
        <a-menu
          :defaultSelectedKeys="defaultSelectedKeys"
          :openKeys="openKeys"
          mode="inline"
          style="width: 256px;padding-right: 18px;padding-left: 16px;"
          :theme="theme"
          @click="menuClick"
          @openChange="onOpenChange"
        >
          <template v-for="item in list">
            <a-menu-item
              @click="titleClick(item)"
              v-if="!item.children"
              :key="item.name"
              class="menulist"
              ref="menulist"
            >
              <router-link
                :to="{
                  path: '/index' + item.path,
                  params: { title: item.title }
                }"
              >
                <!-- 图标 -->
                <a-icon :type="item.meta.icon" />
                <span>{{ item.meta.title }}</span>
              </router-link>
            </a-menu-item>
            <sub-menu v-else :key="item.name" :menu-info="item" />
          </template>
        </a-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import subMenu from "./SiderMenu/index.vue"
import { namespace } from "vuex-class"
const Tabs = namespace("Tabs")
@Component({
  components: {
    subMenu,
  },
})
export default class LeftMenu extends Vue {
  [x: string]: any
  public Login = new this.$api.configInterface.Login()
  @Tabs.Mutation("addtbs")
  addtabs!: (val: any) => {}
  @Tabs.Mutation("inittabs")
  inittabs!: () => {}
  @Tabs.Mutation("menuadd")
  menuadd!: (val: any) => {}

  private list = []
  private openKeys: any = ['0']
  private defaultSelectedKeys = [this.$route.name]
  private theme = "dark"
  private mounted() {
    this.getdata()
  }
  private getdata() {
    this.Login.getMenudata().then((res) => {
      if (res.code == 0) {
        // this.list = res.data
        this.list = [
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
              permission: null,
            },
            children: null,
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
              permission: null,
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
                    "lawarchives:avDate:twoAdd",
                  ],
                },
                children: null,
              },
              {
                key: "14",
                path: "/Simpleprogram",
                name: "Simpleprogram",
                redirect: null,
                component: "lawarchives/lllegalData.html",
                hidden: false,
                meta: {
                  key: "14",
                  title: "简易程序",
                  icon: "&#xe697;",
                  keepAlive: false,
                  permission: [
                    "lawarchives:lllegalData:addRelated",
                    "lawarchives:lllegalData:download",
                    "lawarchives:lllegalData:delRelated",
                    "lawarchives:lllegalData:file",
                    "lawarchives:lllegalData:look",
                  ],
                },
                children: null,
              },
              {
                key: "141",
                path: "/Coercivemeasures",
                name: "Coercivemeasures",
                redirect: null,
                component: "lawarchives/lllegalData.html",
                hidden: false,
                meta: {
                  key: "141",
                  title: "强制措施",
                  icon: "&#xe697;",
                  keepAlive: false,
                  permission: [
                    "lawarchives:lllegalData:addRelated",
                    "lawarchives:lllegalData:download",
                    "lawarchives:lllegalData:delRelated",
                    "lawarchives:lllegalData:file",
                    "lawarchives:lllegalData:look",
                  ],
                },
                children: null,
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
                  permission: ["lawarchives:config:save"],
                },
                children: null,
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
                    "lawarchives:storageCategory:delete",
                  ],
                },
                children: null,
              },
            ],
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
              permission: null,
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
                    "fileEvaluate:evaluationRecord:look",
                  ],
                },
                children: null,
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
                    "fileEvaluate:evaluationDaily:look",
                  ],
                },
                children: null,
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
                    "fileEvaluate:evaluationRandom:saveEva",
                  ],
                },
                children: null,
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
                  permission: ["fileEvaluate:evSet:save", "fileEvaluate:evSet:add"],
                },
                children: null,
              },
            ],
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
              permission: null,
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
                    "device:matche:active",
                  ],
                },
                children: null,
              },
              {
                key: "210",
                path: "/Repairrecord",
                name: "Repairrecord",
                redirect: null,
                component: "device/matche.html",
                hidden: false,
                meta: {
                  key: "210",
                  title: "报修记录",
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
                    "device:matche:active",
                  ],
                },
                children: null,
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
                    "device:stations:shutdown",
                  ],
                },
                children: null,
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
                    "device:storageFtp:update",
                  ],
                },
                children: null,
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
                  permission: ["device:platform:list", "device:platform:delete"],
                },
                children: null,
              },
            ],
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
              permission: null,
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
                    "edvice:oMonitor:fwqlist",
                  ],
                },
                children: null,
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
                    "system:authorization:delete",
                  ],
                },
                children: null,
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
                    "system:upgrade:update",
                  ],
                },
                children: null,
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
                  permission: ["base:log:list", "base:log:export"],
                },
                children: null,
              },
            ],
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
              permission: null,
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
                    "base:dept:savelow",
                  ],
                },
                children: null,
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
                    "base:user:4glist",
                  ],
                },
                children: null,
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
                    "role:right",
                  ],
                },
                children: null,
              },
              {
                key: "311",
                path: "/Menu",
                name: "Menu",
                redirect: null,
                component: "Menu.html",
                hidden: false,
                meta: {
                  key: "311",
                  title: "菜单管理",
                  icon: "&#xe67b;",
                  keepAlive: false,
                  permission: [
                    "role:update",
                    "role:list",
                    "role:delete",
                    "role:refright",
                    "role:save",
                    "role:right",
                  ],
                },
                children: null,
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
                    "right:save",
                  ],
                },
                children: null,
              },
            ],
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
              permission: null,
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
                    "system:notice:save",
                  ],
                },
                children: null,
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
                    "base:dict:update",
                  ],
                },
                children: null,
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
                  permission: ["system:setting:list", "system:setting:save"],
                },
                children: null,
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
                  permission: ["system:highConfig:list", "system:highConfig:update"],
                },
                children: null,
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
                  permission: null,
                },
                children: null,
              },
            ],
          },
        ];
        if (localStorage.getItem("Tabslist") != null) {
          this.inittabs()
        } else {
          this.addtabs(this.list[0]) //判断为空，即为第一次进入，每次都添加数据的第一条的tabs
        }
        let name = this.$route.name
        this.openKeys = [this.findIndexArray(this.list, name, [])[0]]
      }
    })
  }
  public findIndexArray(data, name, indexArray) {
    let arr = Array.from(indexArray)
    for (let i = 0, len = data.length; i < len; i++) {
      arr.push(data[i].name)
      if (data[i].name === name) {
        return arr
      }
      let children = data[i].children
      if (children && children.length) {
        let result = this.findIndexArray(children, name, arr)
        if (result) return result
      }
      arr.pop()
    }
    return false
  }
  public menuClick({ item, key, keyPath }: any): void {
    if (key === "1") {
      this.openKeys = ["0"]
    }
  }
  public onOpenChange(openKeys: Array<string>[]): void {
    if (openKeys.length !== 0) {
      this.openKeys = [openKeys[1]]
    } else {
      this.openKeys = [""]
    }
  }
  private handleClick(e: any): void {
    console.log("click", e)
  }
  private titleClick(data: any): void {
    this.menuadd(data)
  }
  // @Watch("$route")
  // routechange(to: any, from: any) {
  //   //参数不相等
  //   this.openKeys = [to.name]
  // }
}
</script>

<style lang="less" scope>
.Column {
  height: 100%;
  width: 250px;
  background-image: url("../assets/image/menu.png");
  background-size: 100% 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.el-scrollbar__wrap {
  width: 270px;
  overflow-x: hidden;
  overflow-y: auto;
}
.el-scrollbar__wrap::-webkit-scrollbar {
  background: #fbfafc;
}
.ant-menu-ant-menu-item .ant-menu-item-selected-selected {
  background: rgba(0, 0, 0, 0.2) !important;
}
.ant-menu-item {
  height: 45px !important;
  line-height: 45px !important;
  color: #fff;
}
.Menu {
  background: rgba(0, 0, 0, 0.1);
  margin: 16px;
  border-radius: 10px;
}

.ant-menu-submenu-title {
  margin: 0 !important;
  color: #fff;
  // text-align: center;
}
.ant-menu-item-selected {
  background: rgba(0, 0, 0, 0) !important;
}
.ant-menu {
  background: rgba(0, 0, 0, 0) !important;
}
.ant-menu-item {
  padding-left: 0 !important;
}

.ant-menu-item-selected {
  border-left: 2px solid #fff;
  background: rgba(0, 0, 0, 0.3) !important;
}
.Column .ant-menu-submenu-title {
  span {
    font-size: 12px;
  }
}
.Column .ant-menu-item > a {
  color: #fff;
  // text-align: center;
  span {
    font-size: 12px;
  }
}
.ant-menu-submenu {
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  border-radius: 5px !important;
}
.ant-menu .ant-menu-inline .ant-menu-root .ant-menu-light {
  padding-right: 19px !important;
  padding-left: 16px !important;
}
.ant-menu-submenu .ant-menu-submenu-inline {
  border-radius: 5px !important;
}
.ant-menu-submenu-arrow {
  background: #fff;
  color: #fff;
}
.menulist {
  background: rgba(0, 0, 0, 0.1) !important;
  text-indent: 20px;
}
.ant-menu-dark .ant-menu-inline.ant-menu-sub {
  box-shadow: none;
  text-indent: 20px;
  padding-left: 10px;
  border-radius: 5px !important;
  border-top-left-radius: 2px !important;
  border-bottom-left-radius: 2px !important;
  padding-left: 2px;
}
.clearborderradius {
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}
.ant-menu-dark .ant-menu-item:hover,
.ant-menu-dark .ant-menu-item-active,
.ant-menu-dark .ant-menu-submenu-active,
.ant-menu-dark .ant-menu-submenu-open,
.ant-menu-dark .ant-menu-submenu-selected,
.ant-menu-dark .menulist,
.ant-menu-dark .ant-menu-submenu-title:hover {
  background: rgba(0, 0, 0, 0.1);
}
.menulist:hover {
  background: rgba(0, 0, 0, 0.2) !important;
}
.menulist .ant-menu-submenu-selected .ant-menu-item {
  background: rgba(0, 0, 0, 0.2) !important;
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background: rgba(0, 0, 0, 0.2) !important;
}
</style>
