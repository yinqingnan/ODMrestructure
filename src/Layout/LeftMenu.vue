<template>
  <div>
    <el-scrollbar class="Column">
      <div>
        <div v-for="item in menudata" :key="item.key" class="Menu">
          <h2 class="Title">
            {{ item.title }}
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
                    <a-menu-item
                      :key="items.key"
                      ref="list"
                      @click="btn($event)"
                    >
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
  public btn(e: any): void {
    const el = this.$refs.list;

    el.map((item: any) => {
      item.$el.style.borderLeft = "0px solid transparent";
    });

    setTimeout(() => {
      e.item.$el.style.borderLeft = "3px solid #fff";
    }, 10);
    // e.item.$el.style.borderLeft = "3px solid red ";
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
  width: 266px;
  overflow-x: hidden;
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
}
.ant-menu-item-selected {
  background: rgba(0, 0, 0, 0) !important;
}
.ant-menu {
  background: rgba(0, 0, 0, 0) !important;
}
.Title {
  font-size: 14px;
  text-align: left;
  height: 50px;
  line-height: 50px;
  width: 100%;
  padding-left: 20px;
  color: #fff;
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
  border-right: 0;
}
</style>
