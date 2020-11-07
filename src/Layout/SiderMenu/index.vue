<template>
  <div>
    <a-sub-menu :key="menuInfo.name">
      <span slot="title">
        <a-icon :type="menuInfo.meta.icon" />
        <span>{{ menuInfo.meta.title }}</span>
      </span>
      <template v-for="item in menuInfo.children">
        <a-menu-item v-if="!item.children" :key="item.name" @click="btn(item)">
          <router-link
            :to="{
              path: '/index' + item.path,
              params: { sTitle: item.meta.title, title: item.meta.title }
            }"
          >
            <a-icon :type="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
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
}
</script>
