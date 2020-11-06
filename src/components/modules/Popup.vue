<template>
  <div>
    <template>
      <a-dropdown :trigger="['click']" class="dropdown">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          筛选 <a-icon type="down" />
        </a>

        <a-menu slot="overlay" class="box">
          <a-form layout="inline" onSubmit="">
            <a-form-item> </a-form-item>
            <a-form-item>
              <a-button type="primary" htmlType="submit">重置</a-button>
              <a-button type="primary" htmlType="submit">查询</a-button>
            </a-form-item>
          </a-form>
        </a-menu>
      </a-dropdown>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Popup extends Vue {}
</script>

<style lang="less" scope>
.box {
  width: 347px;
  height: 337px;
  background: #ffffff;
  border: 1px solid #f1f1f1;
}
.dropdown {
  width: 58px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #f1f1f1;
  display: block;
  text-align: center;
  color: #a1a9b5;
}
</style>
