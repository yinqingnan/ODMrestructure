<template>
  <div>
    <!-- 考评设置 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div class="contaninerheader evalSet" style>
          <div>
            <h2>考评总分:</h2>
            <h2>{{count}}</h2>
          </div>
          <div>
            <button @click="add">添加</button>
            <button @click="handleSubmit">保存</button>
          </div>
        </div>
        <div class="Simpleprogrambody seting" :style="{height:Height}">
          <el-scrollbar style="height:100%">
            <a-form
              style="display:flex;flex-wrap:wrap"
              autocomplete="off"
              :form="form"
              :label-col="{ span: 4 }"
              :wrapper-col="{ span: 18 }"
              @submit="handleSubmit"
            >
              <a-col style="width:33%" v-for="(item,index) in list" :key="index">
                <a-form-item label="评分项">
                  <a-input
                    :maxLength="LimitInputlength"
                    v-decorator="['jifen'+index, {
                        initialValue: item.jfmc,
                        rules: []
                        }]"
                  />
                </a-form-item>
                <a-form-item label="扣分">
                  <a-input
                    :maxLength="LimitInputlength"
                    v-decorator="['Points'+index, {
                          initialValue: item.jffz,
                          rules: [],
                           getValueFromEvent: (event) => {
                return event.target.value.replace(/[\u4E00-\u9FA5]/g,'')
            }
                        }]"
                  />
                </a-form-item>
                <a-form-item label="没用" v-show="false">
                  <a-input
                    v-decorator="['number'+index, {
                          initialValue: item.jfbh,
                          rules: []
                        }]"
                  />
                </a-form-item>
              </a-col>
            </a-form>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { LimitInputlength } from "@/InterfaceVariable/variable"

@Component({
  components: {},
})
export default class EvalSet extends Vue {
  [x: string]: any
  public form!: any
  private Height = ""
  private list = []
  private count = ""
  public LimitInputlength = LimitInputlength
  public Supervision = new this.$api.configInterface.Supervision()
  public mounted() {
    this.getdata()
  }
  public created() {
    this.form = this.$form.createForm(this)
    this.Height = `${document.documentElement.clientHeight - 210}px`
    console.log(this.Height)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 210}px`
    })
  }
  public getdata() {
    this.Supervision.getsettingdata().then((res) => {
      console.log(res)
      this.list = res.data.list
      this.count = res.data.total
    })
  }
  public EvaluationSave(arr) {
    this.Supervision.EvaluationsettingsSave(arr).then((res) => {
      console.log(res)
      if (res.code == 0) {
        this.$message.success(res.msg)
        this.getdata()
      }
    })
  }
  public handleSubmit(e) {
    e.preventDefault()
    this.form.validateFields((err: any, val: any) => {
      let arr = [],
        val2 = [],
        vals = []
      vals = Object.values(val)

      for (var i = 0; i < vals.length; i += 3) {
        val2.push(vals.slice(i, i + 3))
      }
      val2.map((item) => {
        let obj = {
          jfmc: item[0],
          jfbh: item[2],
          jffz: parseInt(item[1]),
        }
        arr.push(obj)
      })
      let arr2 = []
      arr.map((item) => {
        if (item.jfmc != "") {
          arr2.push(item)
        }
      })
      console.log(arr2)
      this.EvaluationSave(arr2)
    })
  }
  public add() {
    let len = this.list.length
    let obj = {
      jfmc: "",
      jfbh: "",
      jffz: "",
    }
    if (len < 50) {
      this.list.unshift(obj)
    } else {
      this.$message.warning("最大长度不能超过50")
    }
  }
}
</script>

<style lang="less" scope>
.evalSet {
  display: flex;
  justify-content: space-between;
  padding: 0 26px;
  div {
    display: flex;
    h2 {
      font-size: 16px;
      color: #333;
    }
    h2:nth-of-type(2) {
      margin-left: 10px;
      color: red;
    }
    button {
      // width: 58px;
      height: 30px;
      line-height: 1;
      margin-top: 14px;
      cursor: pointer;
      border: 0;
      outline: none;
      background: #2288c1;
      color: #fff;
    }
    button:nth-of-type(2) {
      margin-left: 10px;
    }
  }
}
.seting {
  overflow-y: auto;
}
</style>
