<template>
  <div>
    <!-- 考评设置 -->
    <div id="EvalRecord" class="layoutcontainer">
      <div class="containers">
        <div class="evalSet">
          <div>
            <h2 style="font-weight:600">被考评人总分为{{count}}分，请合理设置单个考评项的扣分分值。</h2>
          </div>
          <div>
            <a-button type="primary" @click="add" v-isshow="'fileEvaluate:evSet:save'">添加</a-button>
          </div>
        </div>
        <div class="seting" :style="{height:Height}">
          <el-scrollbar style="height:100%">
            <ul class="ulstyle">
              <li v-for="(item,index) in list" :key="index" class="listyle">
                <div style="display:flex;justify-content: space-between" class="listyleheader">
                  <div style="display:flex;">
                    <h2 style="font-weight:600">扣分分值：</h2>
                    <h2 v-if="item.isEnabled" style="line-height: 32px;">{{item.jffz}}分</h2>
                    <a-input v-else v-model="item.jffz" placeholder="请输入分值" style="width:100px"/>
                  </div>
                  <div class="operation" style="display:flex;">
                    <!-- 编辑 -->
                    <span class="iconfont iconbianjan"  style="margin-right:10px;" @click="edit(item)" v-isshow="'fileEvaluate:evSet:edit'"></span>
                    <!-- 保存 -->
                    <span v-if="!item.isEnabled" class="iconfont iconassets_store"  style="margin-right:10px;"  @click="save(item)" ></span>
                    
                    <!-- 删除 -->
                    <span class="icondelete iconfont" @click="dlt(item)" v-isshow="'fileEvaluate:evSet:del'"></span>
                  </div>
                </div>
                <div class="listylefooter">
                    <h2 style="font-weight:600">扣分说明：</h2>
                    <h2 v-if="item.isEnabled" class="textwidth">
                      <a-tooltip>
                        <template slot="title">
                          {{item.jfmc}}
                        </template>
                        <h2>{{item.jfmc}}</h2>
                      </a-tooltip>
                    </h2>
                    <a-textarea :maxLength="30" v-else placeholder="请输入扣分说明" v-model="item.jfmc" :rows="2"  style="width: 216px;height: 44px;"/>
                </div>
              </li>
            </ul>
            
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
  private visible = false
  public LimitInputlength = LimitInputlength
  public Supervision = new this.$api.configInterface.Supervision()
  public mounted() {
    this.getdata()
  }
  public created() {
    this.form = this.$form.createForm(this)
    this.Height = `${document.documentElement.clientHeight - 196}px`
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _that = this
    window.addEventListener("resize", () => {
      _that.Height = `${document.documentElement.clientHeight - 196}px`
    })
  }
  public getdata() {
    this.Supervision.getsettingdata().then((res) => {
      console.log(res)
      res.data.list.map((item) => {
        item.isEnabled = true
      })
      this.list = res.data.list.reverse()
      this.count = res.data.total
    })
  }
  // public EvaluationSave(arr) {
 
  // }
  
  public handleSubmit(e) {
  // 
  }
  private phonevalidator(rule, value, callback) {
    let reg = new RegExp("^[0-9]*$")
    if (!value) {
      callback()
    } else if (reg.test(value)) {
      callback()
    } else {
      callback("必须为数字")
    }
  }
  private num = true
  public add() {
    // this.savestatus = true
    let len = this.list.length
    let obj = {
      jfmc: "",
      jfbh: "",
      jffz: "",
      pjlx: "",
      isEnabled:false
    }
   
    if (len < 50) {
      if(this.num){
        this.list.unshift(obj)
        this.num = false
      }else{
        this.$message.warning('仅支持单次添加')
      }
    } else {
      this.$message.warning("最大长度不能超过50")
    }
  }
  private jfbh = ''
  private temporarystr = ''
  // private savestatus = true
  private edit(val){
    console.log(val.isEnabled);
    
    val.isEnabled = false
    // let reg: any = new RegExp((/(^[0-9]\d*$)/))
    // if(reg.test(val.jffz) && parseInt(val.jffz) <= 100 ){
    //   if(val.isEnabled){   //编辑保存
    //     let obj = {
    //       jfbh: this.jfbh,
    //       jffz: val.jffz,
    //       jfmc: val.jfmc,
    //       pjlx: "",
    //     }

    //       this.Supervision.EvaluationsettingsEdit(obj).then((res) => {
    //         if (res.code == 0) {
    //           this.$message.success(res.msg)
    //           this.num = true
    //           this.getdata()
    //         } else {
    //           this.$message.error(res.msg)
    //         }
    //       })
        
    //   }
    // }else if(val.jffz === "" || val.jfmc === ""){
    //   val.isEnabled = false
    //   this.$message.error('分值和扣分说明不能为空')
    // }else{
    //   val.jffz = ""
    //   val.isEnabled = false
    //   this.$message.error('分值各式错误，请输入0~100的整数')
    // }
  }
  private save(val){
    console.log(val);
    
    this.jfbh = val.jfbh
    let reg: any = new RegExp((/(^[0-9]\d*$)/))
    if(reg.test(val.jffz) && parseInt(val.jffz) <= 100 ){
      let obj = {
        jfbh: this.jfbh,
        jffz: val.jffz,
        jfmc: val.jfmc,
        pjlx: "",
      }
      if(this.jfbh){
        this.Supervision.EvaluationsettingsEdit(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.num = true
            this.getdata()
          } else {
            this.$message.error(res.msg)
          }
        })
      }else{
        this.Supervision.EvaluationsettingsSave(obj).then((res) => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.num = true
            this.getdata()
          } else {
            this.$message.error(res.msg)
          }
        })
      }
   
    }else if(val.jffz === "" || val.jfmc === ""){
      val.isEnabled = false
      this.$message.error('分值和扣分说明不能为空')
    }else{
      val.jffz = ""
      val.isEnabled = false
      this.$message.error('分值各式错误，请输入0~100的整数')
    }
    
  }
  private dlt(val){
    if(!this.num){
        this.list.shift()
        this.num = true
        this.$message.info('取消新增')
    }else{
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let _that = this
      this.$confirm({
        title: "提示",
        content: `删除后无法恢复，确定要删除扣分说明为：${val.jfmc}吗？`,
        onOk() {
          _that.Supervision.Evaluationsetdlt(val.jfbh).then(res=>{
            console.log(res)
            if(res.code == 0){
              _that.getdata()
              _that.$message.success(res.msg)
            }else{
              _that.$message.error(res.msg)
            }
          })
        },
      })
    }
  }

}
</script>

<style lang="less" scope>
.evalSet {
  min-width: 448px;
  height: 50px;
  background: #ffffff;
  display: flex;
  border-bottom: 1px solid #dddddd;
  line-height: 50px;
  justify-content: space-between;
  padding: 0 18px;
  div {
    display: flex;
    h2 {
      font-size: 12px;
      color: #7f8893;
      line-height: 40px;
    }
    button {
      // width: 58px;
      height: 30px;
      line-height: 1;
      margin-top: 10px;
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
  background: #fff;
  padding: 10px 12px 0 16px;
  overflow-y: auto;
}
.ulstyle{
  display: flex;
  flex-wrap: wrap;
  justify-content: right;
}
.listyle{
  width: 310px;
  // width: 20%;
  height: 115px;
  background: #f5f5f5;
  margin-right: 10px;
  margin-top: 10px;
  border: 1px solid #DDDDDD;
  h2{
    font-size: 12px;
    color: #7F8893;
  }
}
.listyleheader{
  padding: 19px 13px 0 15px;
  h2:nth-of-type(1){
    width: 60px;
    line-height: 32px;
  }

}
.listylefooter{
  display: flex;
  padding-left: 15px;
  margin-top: 4px;
  h2:nth-of-type(1){
    width: 60px;
    line-height: 32px;
  }

}
.textwidth{
  width: 210px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  line-height: 32px;
}
.operation{
  span{
    cursor: pointer;
    font-size: 23px;
    line-height: 1;
  }
}
</style>
