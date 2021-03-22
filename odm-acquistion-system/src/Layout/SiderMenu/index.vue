<!--
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-02-20 14:21:50
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\Layout\SiderMenu\index.vue
-->
<template>
  <div>
    <a-sub-menu :key="menuInfo.name">
      <span slot="title">
         <span class="iconfont " :class="menuInfo.icon" style="font-size: 17px;margin-right: 10px;"></span>
        <span>{{ menuInfo.name }}</span>
      </span>
      <template v-for="item in menuInfo.children">
        <a-menu-item v-if="!item.children" :key="item.id" @click="btn(item)">
          <router-link
            :to="{
              path: '/index' + item.path,
              params: { sTitle: item.name, title: item.name }
            }"
          >
             <span class="iconfont" :class="item.icon" style="font-size: 17px;margin-right: 10px;"></span>
            <span>{{ item.name }}</span>
          </router-link>
        </a-menu-item>
        <sub-menu v-else :key="item.name" :menu-info="item"/>
      </template>
    </a-sub-menu>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Tabs = namespace("Tabs");
@Component({
  components: {}
})
export default class Index extends Vue {
  @Prop() menuInfo: any;
  @Tabs.Mutation("menuadd")
  menuadd!: (val: any) => {};
  private btn(item: any) {
    this.menuadd(item);
  }
  private iconbaojing1 = "iconuser_user"
}
</script>
