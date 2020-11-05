<template>
  <div>
    <el-scrollbar class="Column">
      <div>
        <div v-for="item in menudata" :key="item.key" class="Menu">
          <h2 class="Title">
            <span>{{ item.title }}</span>
          </h2>
          <template>
            <a-menu
              :openKeys="openKeys"
              :defaultSelectedKeys="defaultSelectedKeys"
              mode="inline"
              theme="light"
              @click="select($event)"
              @openChange="onOpenChange"
            >
              <template v-for="el in item.children">
                <!-- 没有子级的 -->
                <a-menu-item
                  v-if="!el.children.length"
                  :key="el.key"
                  @click="btn($event)"
                  ref="list"
                >
                  <router-link
                    :to="{
                      path: el.path
                    }"
                  >
                    <!-- <a-icon :type="item.meta.icon" /> -->
                    <span>{{ el.meta.title }}</span>
                  </router-link>
                </a-menu-item>
                <!-- 包含子级的 -->
                <a-sub-menu v-else :key="el.key">
                  <span slot="title">
                    <span>{{ el.meta.title }}</span>
                  </span>

                  <template v-for="items in el.children">
                    <a-menu-item
                      :key="items.key"
                      ref="list"
                      @click="btn($event)"
                    >
                      <router-link
                        :to="{
                          path: items.path
                        }"
                      >
                        <!-- <a-icon :type="item.meta.icon" /> -->
                        <span>{{ items.meta.title }}</span>
                      </router-link>
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
    required: true,
    default: []
  })
  readonly menudata!: unknown[];

  private defaultSelectedKeys = [];
  private openKeys = [];
  // private theme = "light";
  private theme = "dark";
  private mounted() {
    // console.log(this.menudata);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public select({ item, key }: any) {
    // console.log(item);
    // console.log(key);
    // this.defaultSelectedKeys = [key];
  }
  public onOpenChange(openKeys: never[]): void {
    console.log(openKeys);
    this.openKeys = openKeys;
  }
  public btn(e: any): void {
    // const el = this.$refs.list;
    // el.map((item: any) => {
    //   item.$el.style.borderLeft = "0px solid transparent";
    // });
    // setTimeout(() => {
    //   e.item.$el.style.borderLeft = "3px solid #fff";
    // }, 10);
    // e.item.$el.style.borderLeft = "3px solid red ";
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
.ant-menu-vertical .ant-menu-item::after,
.ant-menu-vertical-left .ant-menu-item::after,
.ant-menu-vertical-right .ant-menu-item::after,
.ant-menu-inline .ant-menu-item::after {
  border-left: 3px solid transparent;
  border-left: 0;
  border-color: #fff;
  left: 0;
  border-right: 0;
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
  text-align: center;
}
.ant-menu-item-selected {
  background: rgba(0, 0, 0, 0) !important;
}
.ant-menu {
  background: rgba(0, 0, 0, 0) !important;
}
.Title {
  font-size: 12px;
  text-align: left;
  height: 40px;
  line-height: 40px;
  width: 100%;
  padding-left: 10px;
  color: #fff;
  > span {
    padding: 4px 10px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 17px;
  }
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 0;
}
.Column .ant-menu-submenu-title {
  span {
    font-size: 12px;
  }
}
.Column .ant-menu-item > a {
  color: #fff;
  text-align: center;
  span {
    font-size: 12px;
  }
}
.Column
  .ant-menu-submenu-vertical
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::before,
.ant-menu-submenu-vertical-left
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::before,
.ant-menu-submenu-vertical-right
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::before,
.ant-menu-submenu-inline
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::before,
.ant-menu-submenu-vertical
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical-left
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::after,
.ant-menu-submenu-vertical-right
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::after,
.ant-menu-submenu-inline
  > .ant-menu-submenu-title
  .ant-menu-submenu-arrow::after {
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0.65),
    rgba(255, 255, 255, 0.1)
  );
}
</style>
