<template>
  <div>
    <el-scrollbar class="Column">
      <div>
        <a-menu
          :defaultSelectedKeys="defaultSelectedKeys"
          :openKeys="openKeys"
          mode="inline"
          :style="{height:Height}"
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
                :class="{'Lowerversion':Lowerversion}"
                :to="{
                  path: '/index' + item.path,
                  params: { title: item.title }
                }"
              >
                <!-- 图标 -->
                <span class="iconfont " :class="item.meta.icon" style="margin-left:4px;font-size: 17px;margin-right: 10px;"></span>
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
import { Component, Vue ,Watch} from "vue-property-decorator"
import subMenu from "./SiderMenu/index.vue"
import { namespace } from "vuex-class"
import router from "@/router"
import {list} from '../InterfaceVariable/variable'
import { resetRouter } from "@/router/index" //重置路由信息
import { concatrouter } from "@/router/concatrouter" //生成路由表方法
const Tabs = namespace("Tabs")
const Menu = namespace("Menu")
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
  @Tabs.Mutation("menuadd")
  menuadd!: (val: any) => {}
  @Tabs.Mutation("setactive")
  setactive!: (val: any) => {}
  @Menu.Mutation("addmenu")
  addmenu!: (val: any) => {}
  private icondata_video = "icondata_video"

  private list = []
  private openKeys: any = ['index']
  private defaultSelectedKeys = [this.$route.name]
  private theme = "dark"
  private Height = ""
  private Lowerversion= true
  private mounted() {
    this.getdata()
    this.Height = `${document.documentElement.clientHeight - 74}px`
    const  regStr_chrome = /chrome\/[\d.]+/gi ;
    let agent = window.navigator.userAgent.toLowerCase()
    if(agent.indexOf("chrome") > 0){
      if(Number(agent.match(regStr_chrome)[0].split('/')[1].split('.')[0])>50){
        this.Lowerversion = false;
      }else{
        this.Lowerversion = true;
      }
    }
  }
  private getdata() {
    this.Login.getMenudata().then((res) => {
      if (res.code == 0) {
        this.list = res.data
        // this.list = list
        localStorage.setItem("navlist", JSON.stringify(res.data))
        this.addmenu(concatrouter())
        resetRouter() //重置路由
        router.options.routes = concatrouter()
        router.addRoutes(concatrouter())
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
  @Watch("$route")
  routechange(to: any) {
    this.setactive(to.meta.key)
    this.$set(this.defaultSelectedKeys , 0, to.name)
    let name =  this.findIndexArray(this.list, to.name, [])[0]
    this.$nextTick(()=>{
      this.openKeys = [name]
    })
  }
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
  margin-bottom: 10px !important;
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
.Lowerversion{
  >span:first-child{
    display: none;
  }
}
</style>
