<template>
  <div>
    <div class="contaninerheader">
      <template>
        <a-dropdown :trigger="['click']" class="dropdown">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            筛选
            <a-icon type="down" />
          </a>
          <a-menu slot="overlay" class="box">
            <a-form :form="form">
              <a-row :gutter="48">
                <a-col
                  :xs="wrapCol.xs"
                  :xl="wrapCol.xl"
                  v-for="(item, index) in Datalist"
                  :key="index"
                >
                  <!-- 文本域 -->
                  <a-form-item
                    class="tex_textarea"
                    :class="item.cName"
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'Textfield'"
                    style="margin-left:-10px;margin-right:0"
                    allowClear
                  >
                    <a-textarea
                      style="display: flex;height:120px !important;overflow-y:auto;resize: none;"
                      allowClear
                      v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule,
                },
              ]"
                      :placeholder="item.placeholder"
                      :autoSize="{ minRows: 3, maxRows: 3 }"
                    />
                  </a-form-item>
                  <!-- 文本输入框-->
                  <a-form-item
                    autocomplete="off"
                    :disabled="item.disabled"
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                    v-if="item.type == 'input'"
                  >
                    <a-input
                      :disabled="item.disabled"
                      v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule,
                },
              ]"
                      :placeholder="item.placeholder"
                    />
                  </a-form-item>
                  <!-- 数字 -->
                  <a-form-item
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'number'"
                  >
                    <a-input
                      v-decorator="[
                item.code,
                {
                  initialValue: 0,
                  rules: item.rule,
                },
              ]"
                      :placeholder="item.placeholder"
                    />
                  </a-form-item>
                  <!-- 时间选择 -->
                  <a-form-item
                    :class="item.class"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    :label="item.title"
                    v-if="item.type == 'time'"
                  >
                    <a-range-picker
                      v-decorator="[
                        [item.code],
                        {
                          initialValue: item.data,
                          rules: []
                        }
                        ]"
                      showTime
                      :format="item.format"
                    />
                  </a-form-item>
                  <!-- 年月选择 -->
                  <a-form-item
                    class="timeP0"
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'year'"
                  >
                    <a-range-picker v-decorator="[item.code]" class="timeP0" :format="item.format" />
                  </a-form-item>
                  <!-- 日期选择 -->
                  <a-form-item
                    :label="item.title"
                    v-if="item.type == 'riqi'"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    :class="item.class"
                  >
                    <a-date-picker
                      v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                },
              ]"
                      class="timeP0"
                      :placeholder="item.placeholder"
                    />
                  </a-form-item>
                  <!-- 下拉 -->
                  <a-form-item
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'select'"
                  >
                    <a-select
                      :disabled="item.disabled"
                      v-decorator="[
                item.code,
                {
                  rules: item.rule,
                  initialValue: item.iVal,
                },
              ]"
                      :placeholder="item.placeholder"
                    >
                      <a-select-option
                        v-for="(it) in item.data"
                        :value="it.title"
                        :key="it.value"
                      >{{ it.title }}</a-select-option>
                    </a-select>
                  </a-form-item>

                  <a-form-item
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'sCkList'"
                  >
                    <a-select
                      v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule,
                },
              ]"
                      mode="multiple"
                      placeholder="请选择"
                      style="width:165px;"
                    >
                      <a-select-option v-for="it in item.data" :key="it.id">{{ it.title }}</a-select-option>
                    </a-select>
                  </a-form-item>

                  <a-form-item
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'Tselect'"
                  >
                    <a-tree-select
                      style="width:165px;"
                      :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
                      :treeData="item.data"
                      placeholder="请选择"
                      treeDefaultExpandAll
                      v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule,
                },
              ]"
                    >
                      <span style="color: #08c" slot="title" slot-scope="{ value }">{{ value }}</span>
                    </a-tree-select>
                  </a-form-item>

                  <!-- 级联 -->
                  <a-form-item
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'cascader'"
                  >
                    <a-cascader
                      v-decorator="[
                item.code,
                {
                  rules: item.rule,
                },
              ]"
                      placeholder="请选择"
                      :options="item.data"
                    />
                  </a-form-item>

                  <!-- 开关 -->
                  <a-form-item
                    :label="item.title"
                    :label-col="labelCol"
                    :wrapperCol="wrapperCol"
                    v-if="item.type == 'switch'"
                  >
                    <a-switch
                      @change="swChangw(item)"
                      defaultChecked
                      v-decorator="[
                item.code,
                {
                  initialValue: item.iVal,
                  rules: item.rule,
                },
              ]"
                    />
                  </a-form-item>
                  <!-- 图形上传 -->
                  <!-- <a-form-item
                  :label="item.title"
                  :labelCol="labelCol"
                  :wrapperCol="wrapperCol"
                  v-if="item.type == 'imgupload'"
                >
                  <imgupload ref="isUpImg" @datachang="datachang" />
                  </a-form-item>-->

                  <!-- 按钮 -->
                  <a-form-item class="longBox" v-if="item.type == 'BootmBtn'" :class="item.class">
                    <a-button @click="handleReset" style="margin-right:10px">{{item.title1}}</a-button>
                    <a-button type="primary" @click="handleSubmit">{{item.title2}}</a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
          </a-menu>
        </a-dropdown>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
@Component({
  components: {},
})
export default class Popup extends Vue {
  [x: string]: any
  public form!: any
  @Prop({
    type: Object,
    default: () => ({}),
  })
  wrapCol: {} | undefined
  @Prop({
    type: Object,
    default: () => ({}),
  })
  labelCol: {} | undefined
  @Prop({
    type: Object,
    default: () => ({}),
  })
  wrapperCol: {} | undefined
  @Prop({
    type: Array,
    default: [],
  })
  Datalist: [] | undefined
  private created() {
    this.form = this.$form.createForm(this)
  }
  private handleReset() {
    console.log(123)
  }
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      if (!err) {
        console.log(val)
      }
    })
  }
}
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
.bottombtn {
  display: flex;
  justify-content: flex-end;
  padding-right: 29px !important;
}
.riqi .ant-calendar-picker {
  width: 230px !important;
}
</style>
