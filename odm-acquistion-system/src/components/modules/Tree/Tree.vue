<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-02-21 10:34:33
 * @LastEditTime: 2021-03-31 14:47:34
 * @FilePath: \src\components\modules\Tree\Tree.vue
 * @LastEditors: yqn
-->
<template>
  <div @click="btndisappear">
    <a-tree
      class="cScroll"
      :treeData="treedata"
      showLine
      defaultExpandAll
      :replaceFields="{
        children: 'children',
        key: 'code',
        title: 'name'
      }"
      @rightClick="rightClick"
      @select="Onselect"
    />
    <div id="perTreeMenu" v-if="tmDisplay" class="tree_menu" :style="{ ...rightMenu }">
      <ul>
        <li v-isshow="'base:menu:savePc,base:menu:saveWeb'">
          <a-button type @click="add(Statetype)">
            <a-icon type="plus-circle" />新增菜单
          </a-button>
        </li>
        <li v-isshow="'base:menu:deleteMenuBtn'">
          <a-button type @click="edit(Statetype)">
            <a-icon type="edit" />编辑菜单
          </a-button>
        </li>
        <li>
          <a-button type @click="dlt(Statetype)">
            <a-icon type="close-circle" />删除菜单
          </a-button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator"
import {Treepropobj} from '@/InterfaceVariable/interface'
@Component({
  components: {}
})
export default class Tree extends Vue {
  @Prop() private treedata
  @Prop() private Statetype

  @Emit("bindSend") send(msg: string, val: Treepropobj, type: string) {
    //
  }
  
  private tmDisplay = false
  public rightMenu = {}
  public id = ""
  public name = ""
  private Currentmenuname = {}
  private parentName = ""
  public parentid = ""
  private add(type) {
    this.tmDisplay = false
    let obj: Treepropobj = {
      id: this.id,
      parentid: this.parentid,
      parentname: this.parentName
    }
    this.send("add", obj, type)
  }
  private edit(type) {
    let obj: Treepropobj = {
      id: this.id,
      parentid: this.parentid,
      parentname: this.parentName,
      name:this.name
    }
    this.tmDisplay = false
    this.send("edit", obj, type)
  }
  private dlt(type) {
    let obj: Treepropobj = {
      id: this.id,
      parentid: this.parentid,
      parentname: this.parentName,
      name:this.name
    }
    this.tmDisplay = false
    this.send("dlt", obj, type)
  }
  private rightClick(e) {
    this.tmDisplay = false
    this.tmDisplay = true
    this.id = e.node.dataRef.id
    this.parentid = e.node.dataRef.parentId
    this.parentName = e.node.dataRef.parentName,
    this.name = e.node.dataRef.name
    if (e.event.clientY > 850) {
      this.rightMenu = {
        top: e.event.pageY - 80 + "px",
        left: e.event.pageX + 20 + "px"
      }
    } else {
      this.rightMenu = {
        top: e.event.pageY + "px",
        left: e.event.pageX + 20 + "px"
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let _that = this
    document.onclick = function (e) {
      console.log(e.target);
      console.log(document.getElementById("perTreeMenu"));
      if (e.target != document.getElementById("perTreeMenu")) {
        _that.tmDisplay = false
      }
    }
    if(this.tmDisplay){
      setTimeout(() => {
        this.tmDisplay = false
      }, 4000)
    }
    
  }
  private Onselect(selectedKeys, e) {
    console.log(selectedKeys,e);
    let type = 'LeftClick'
    let obj: Treepropobj = {
      id: e.node.dataRef.id,
    }
    this.send("LeftClick", obj, type)
  }
  private btndisappear(){
    this.tmDisplay = false
  }
}
</script>
<style lang="less" scope>
#Tree .tree_menu {
  position: fixed;
  display: block;
  z-index: 100;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  height: 98px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>