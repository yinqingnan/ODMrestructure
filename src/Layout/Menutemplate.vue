<template>
  <!-- 菜单备份 -->
  <div>
    <el-scrollbar class="Column">
      <div>
        <div v-for="item in menudata" :key="item.key" class="Menu">
          <h2>
            {{ item.title }}
          </h2>
          <template>
            <a-menu
              :defaultSelectedKeys="defaultSelectedKeys"
              :openKeys="openKeys"
              mode="inline"
              theme="light"
              @click="select"
              @openChange="onOpenChange"
            >
              <template v-for="el in item.children">
                <!-- 没有子级的 -->
                <a-menu-item v-if="!el.children.length" :key="el.key">
                  <!-- <router-link
                    :to="{
                      path: el.path
                    }"
                  > -->
                  <!-- <a-icon :type="item.meta.icon" /> -->
                  <span>{{ el.meta.title }}</span>
                  <!-- </router-link> -->
                </a-menu-item>
                <!-- 包含子级的 -->
                <a-sub-menu v-else :key="el.key">
                  <span slot="title">
                    <span>{{ el.meta.title }}</span>
                  </span>

                  <template v-for="items in el.children">
                    <a-menu-item :key="items.key">
                      <!-- <router-link
                        :to="{
                          path: items.path
                        }"
                      > -->
                      <!-- <a-icon :type="item.meta.icon" /> -->
                      <span>{{ items.meta.title }}</span>
                      <!-- </router-link> -->
                    </a-menu-item>
                  </template>
                </a-sub-menu>
              </template>
            </a-menu>
          </template>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import subMenu from "./SiderMenu/index.vue";
@Component({
  components: {
    subMenu
  }
})
export default class LeftMenu extends Vue {
  @Prop({
    type: Array,
    required: true
  })
  menudata!: [];

  private defaultSelectedKeys = [];
  private openKeys = [];
  private theme = "light";
  private mounted() {
    console.log(this.menudata);
  }
  public select({ item, key }) {
    console.log(item);
    console.log(key);
    this.defaultSelectedKeys = [];
    // this.openKeys = [];
  }
  public onOpenChange(openKeys: never[]): void {
    console.log(openKeys);
    this.openKeys = openKeys;
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
  // display: none;
  overflow-x: hidden;
}
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  // border-left: 3px solid red;
  border-right: 0;
}
.ant-menu-ant-menu-item .ant-menu-item-selected-selected {
  // border-left: 4px solid #fff !important;
  border-left: 4px solid red !important;
  background: rgba(0, 0, 0, 0.2) !important;
}
.ant-menu-item {
  height: 45px !important;
  line-height: 45px !important;
  color: #fff;
}
.Menu {
  background: rgba(0, 0, 0, 0.1);
}

.ant-menu-submenu-title {
  margin: 0 !important;
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
}
.ant-menu-item-selected {
  background: rgba(0, 0, 0, 0.2) !important;
}
.ant-menu {
  background: rgba(0, 0, 0, 0.1) !important;
}
</style>
