<!--
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-02-01 14:29:39
 * @LastEditTime: 2021-02-05 17:23:48
 * @FilePath: \src\views\Testviews\Testviews.vue
 * @LastEditors: yqn
-->
<template>
  <div>
    <a-modal
        v-model="visible"
        :title="Title"
        @ok="submit"
        @cancel="cancel"
        :ok-text="confirmbtn "
        :cancel-text="cancelbtn"
    >
      <form-create v-model="fApi" :rule="Rule" :option="option"/>
    </a-modal>

    <a-button type="primary" @click="showModal">提交</a-button>
  </div>
</template>


<script lang="ts">
import {Component, Vue} from "vue-property-decorator"
import moment from "moment"
@Component({
  components: {}
})
export default class Testviews extends Vue {

  private visible = false
  private confirmbtn = "提交"
  private cancelbtn = "重置"
  private Title = "添加"
  //实例对象
  private fApi = {}
  private Rule = [
    {
      type: "input",
      field: "name",
      title: "商品名称",
      value: "iphone14",
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      validate: [{type: "string", required: true, message: "必填项不能为空"}],
      props: {
        // disabled:true,        //是否可禁用
        // allowClear:true,    //是否可清除
      }
    },
    // {
    //   type: 'template',
    //   field: 'department',
    //   title: "树形下拉",
    //   value: '',
    //   labelCol: {span: 4},
    //   wrapperCol: {span: 20},
    //   template: '<a-tree-select treeNodeFilterProp="title" :treeData="treeData" :replaceFields="replaceFields" :showSearch="true" :dropdownStyle="dropdownStyle" v-model="value" :allowClear="true"/>',
    //   vm: new Vue({
    //     data: {
    //       showSearch: true,
    //       value: '10003',
    //       treeData: [
    //         {
    //           code: "100006",
    //           name: "测试Chrome80",
    //           parentCode: "0000-0000-0000-0000",
    //           children: null,
    //           selected: false,
    //           value: "100006"
    //         }, {
    //           code: "100010",
    //           name: "XX交警支队",
    //           parentCode: "0000-0000-0000-0000",
    //           children: [{
    //             code: "13",
    //             name: "发送到",
    //             parentCode: "100010",
    //             children: null,
    //             selected: false,
    //             value: "13"
    //           }],
    //           selected: false,
    //           value: "100010"
    //         }, {
    //           code: "10003",
    //           name: "测试firefox43",
    //           parentCode: "0000-0000-0000-0000",
    //           children: null,
    //           selected: false,
    //           value: "10003"
    //         }, {
    //           code: "111",
    //           name: "111",
    //           parentCode: "0000-0000-0000-0000",
    //           children: null,
    //           selected: false,
    //           value: "111"
    //         }, {
    //           code: "111222",
    //           name: "测试",
    //           parentCode: "0000-0000-0000-0000",
    //           children: null,
    //           selected: false,
    //           value: "111222"
    //         }, {
    //           code: "1112323213",
    //           name: "360安全1兼",
    //           parentCode: "0000-0000-0000-0000",
    //           children: null,
    //           selected: false,
    //           value: "1112323213"
    //         }, {
    //           code: "123",
    //           name: "粉粉粉",
    //           parentCode: "0000-0000-0000-0000",
    //           children: null,
    //           selected: false,
    //           value: "123"
    //         }, {
    //           code: "123123123aaaaaaaaaasddadad",
    //           name: "123123123aaaaaaaaaasddadad",
    //           parentCode: "0000-0000-0000-0000",
    //           children: null,
    //           selected: false,
    //           value: "123123123aaaaaaaaaasddadad"
    //         }],
    //       replaceFields: {
    //         id: 'code',
    //         pId: 'parentCode',
    //         value: 'value',
    //         title: 'name'
    //       },
    //       dropdownStyle: {
    //         maxHeight: '400px',
    //         overflow: 'auto'
    //       },
    //     }
    //   }),
    // },
    {
      type: 'a-tree-select',
      field: 'department',
      title: "部门",
      value: '123',
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      props: {
        defaultValue:'123',
        allowClear:true,
        treeNodeFilterProp: "title",
        showSearch: true,
        replaceFields: {
          id: 'code',
          pId: 'parentCode',
          value: 'value',
          title: 'name'
        },
        dropdownStyle: {
          maxHeight: '400px',
          overflow: 'auto'
        },
        treeData: [
          {
            code: "100006",
            name: "测试Chrome80",
            parentCode: "0000-0000-0000-0000",
            children: null,
            selected: false,
            value: "100006"
          }, {
            code: "100010",
            name: "XX交警支队",
            parentCode: "0000-0000-0000-0000",
            children: [{
              code: "13",
              name: "发送到",
              parentCode: "100010",
              children: null,
              selected: false,
              value: "13"
            }],
            selected: false,
            value: "100010"
          }, {
            code: "10003",
            name: "测试firefox43",
            parentCode: "0000-0000-0000-0000",
            children: null,
            selected: false,
            value: "10003"
          }, {
            code: "111",
            name: "111",
            parentCode: "0000-0000-0000-0000",
            children: null,
            selected: false,
            value: "111"
          }, {
            code: "111222",
            name: "测试",
            parentCode: "0000-0000-0000-0000",
            children: null,
            selected: false,
            value: "111222"
          }, {
            code: "1112323213",
            name: "360安全1兼",
            parentCode: "0000-0000-0000-0000",
            children: null,
            selected: false,
            value: "1112323213"
          }, {
            code: "123",
            name: "粉粉粉",
            parentCode: "0000-0000-0000-0000",
            children: null,
            selected: false,
            value: "123"
          }, {
            code: "123123123aaaaaaaaaasddadad",
            name: "123123123aaaaaaaaaasddadad",
            parentCode: "0000-0000-0000-0000",
            children: null,
            selected: false,
            value: "123123123aaaaaaaaaasddadad"
          }],
      },
      on: {
        change:(val)=>{
          this.Rule.map(item => {
            if(item.type === 'a-tree-select'){
              item.value = val
            }
          })
        }
      },
      // validate: [{type: "string", required: true, message: "必填项不能为空"}],
    },
    {
      type: "select",
      field: "ProductCategories",
      title: "下拉",
      value: ["106"],
      options: [
        {"value": "104", "label": "生态蔬菜", "disabled": false},
        {"value": "106", "label": "肉", "disabled": false},
        {"value": "105", "label": "新鲜水果", "disabled": false},
      ],
      props: {
        multiple: false,
        allowClear: true,
        showSearch: true,
        autoClearSearchValue: true,
        dropdownMatchSelectWidth: true,
        notFoundContent: '没有当前数据',
        disabled: false,
        showArrow: true,
        mode: 'default',
        filterOption(inputValue, option) {
          return (option.componentOptions.children[0].text.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0);
        }
        // optionFilterProp:'label',
      },
    },
    {
      type: "DatePicker",
      field: "Time",
      title: "活动时间",
      value: [moment("2021-02-20"), moment("2021-06-28")],
      props: {
        type: "range",    //'date', 'month', 'week', 'range'
        placeholder: ["开始时间", "结束时间"],
        format: "YYYY-MM-DD",
        allowClear: true
      },
      labelCol: {span: 4},
      wrapperCol: {span: 20},
      className: "RangePicker123123",
      // validate: [{ required: true, message:'请选择日期'}]
    },
    {
      type: "TimePicker",
      field: "section_time",
      title: "活动时间",
      value: '17:24:52',
      className: "RangePicker123123",
    },
    {
      type: "radio",
      title: "是否包邮",
      field: "is_postage",
      value: 0,
      options: [
        {value: 0, label: "不包邮", disabled: false},
        {value: 1, label: "包邮", disabled: false}
      ],
      // 通过value值控制是否显示
      control: [
        {
          value: 1,
          rule: [
            {
              type: "input",
              field: "postage_money",
              title: "满额包邮",
              value: 0
            }
          ]
        }
      ]
    },
    {
      type: "rate",
      field: "rate",
      title: "推荐级别",
      value: 3.5,
      props: {
        count: 10
      },
      validate: [
        {
          required: true,
          type: "number",
          min: 3,
          message: "请大于3颗星",
          trigger: "change"
        }
      ]
    },
    {
      type: "slider",
      field: "slider",
      title: "滑块",
      value: [0, 52],
      props: {
        min: 0,
        max: 100,
        range: true
      }
    },
  ]
  //组件参数配置
  private option = {
    // 显示重置表单按扭
    resetBtn: false,
    submitBtn: false
    //表单提交事件
    // onSubmit: (formData) => {
    //   alert(JSON.stringify(formData))
    //   console.log("获取表单中的数据：", formData)
    //   //按钮进入提交状态
    //   //   this.fApi.btn.loading();
    //   //重置按钮禁用
    //   //   this.fApi.resetBtn.disabled();
    //   //按钮进入可点击状态
    //   //   this.fApi.btn.finish();
    // }
  }
  private showModal() {
    this.visible = true
  }
  private submit() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let form = this.fApi as any
    // console.log(form.formData()) //获取表单的内容
    form.submit((formdata) => {
      // this.Rule[1].vm.value = '123'
      // console.log(this.Rule[1].vm.value)
      // form.setValue({
      //   bumen: '100006'
      // });
      console.log(formdata)
    })
  }

  private cancel() {

    let form = (this.fApi as any)
    form.resetFields() //重置表单
    // form.destroy() // 销毁表单
  }
}
</script>
<style lang="less" scope>
.divbtn {
  display: flex;
  justify-content: center;

  button:first-child {
    margin-right: 10px;
  }
}

.RangePicker123123 {
  .ant-calendar-picker {
    width: 393px;
  }

  .ant-time-picker {
    width: 393px;
  }
}
</style>