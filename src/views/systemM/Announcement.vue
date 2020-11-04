<template>
  <div id="Announcement">
    <div class="box">
      <div class="header">
        <div class="select">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              筛选<a-icon type="down" />
            </a>
            <a-menu slot="overlay" class="myW">
              <a-form
                :form="form"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }"
                @submit="handleSubmit"
                class="myP"
              >
                <a-form-item label="公告状态">
                  <a-select
                    v-decorator="[
                      'select',
                      {
                        rules: []
                      }
                    ]"
                    placeholder="请选择"
                  >
                    <a-select-option value="china">
                      China
                    </a-select-option>
                    <a-select-option value="usa">
                      U.S.A
                    </a-select-option>
                  </a-select>
                </a-form-item>
                <a-form-item class="btnBox">
                  <a-button html-type="submit" class="reset">
                    重置
                  </a-button>
                  <a-button html-type="submit" class="upData">
                    查询
                  </a-button>
                </a-form-item>
              </a-form>
            </a-menu>
          </a-dropdown>
        </div>
        <div class="btnList">
          <a-button class="upData">添加</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { PropType } from "vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
  components: {}
})

export default class RightContent extends Vue {
  private form: unknown;
  beforeCreate() {
    this.form = this.$form.createForm(this);
  }
  private handleSubmit(e: unknown): void {
    console.log(e);
  }
}
</script>

<style lang="less" scope>
#Announcement {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
#Announcement .box {
  width: calc(100% - 42px);
  height: calc(100% - 32px);
  background: #ffffff;
}
#Announcement .ant-dropdown-link {
  display: block;
  text-align: center;
  line-height: 30px;
  width: 58px;
  height: 30px;
  border: 1px solid #ccc;
  color: #9EA7B3;
}
.header {
  width: calc(100% - 50px);
  margin: 13px auto 0;
  display: flex;
  justify-content: space-between;
}
.myW {
  width: 347px;
}
.myP {
  padding: 10px 0;
}
.reset {
  margin-right: 10px;
  margin-left: 65px;
}
.btnBox {
  margin-top: 5px;
  display: flex;
  justify-content: flex-end;
}
.myW .ant-row.ant-form-item {
  margin-bottom: 0;
}
.upData,
.upData:hover {
  background: #0DB8DF;
  color: #ffffff;
}
</style>
