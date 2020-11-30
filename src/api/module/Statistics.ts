/*
 * @Author: your name
 * @Date: 2020-11-30 14:08:12
 * @LastEditTime: 2020-11-30 15:56:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\api\module\Statistics.ts
 */
import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'
/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class Statistics {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
    // todo 考评设置保存按钮
    // public EvaluationsettingsSave(params: object, jwt= true) {
    //   const url = "/api/tpb/lawarchives/dm-jfx/saveList";
    //   const body = params
    //   return new Promise((resolve, reject) => {
    //     this.axios.post(url, body, {
    //       headers: { isJwt: jwt },
    //     }).then((res: any) => {
    //       this.resultHandle(res, resolve);
    //     }).catch((err: { message: any }) => {
    //       reject(err.message);
    //     });
    //   });
    // }
    // todo 时间获取 
  public getdate(params: object, jwt=TextTrackCueList) {
    const url = "/api/uauth/my/dateDept";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo  摄录统计表格 
  public gettabledata(params: object, jwt=TextTrackCueList) {
    const url = "/api/tpb/report/recording/user";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  //todo 关联统计表格数据
  public getlawcasetable(params: object, jwt=TextTrackCueList) {
    const url = "/api/tpb/report/lawcase/unit";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo  考评统计表格 
  public getlabeltable(params: object, jwt=TextTrackCueList) {
    const url = "/api/tpb/report/label/unit";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // 资产统计表格  
  public getassetstable(params: object, jwt=TextTrackCueList) {
    const url = "/api/tpb/report/assets/unit";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  /**
 * @param res
 * @param resolve
 */
  public resultHandle(res: any, resolve: { (value?: unknown): void; (value?: unknown): void; (arg0: any): void }) {
     if (res.code == 1002 || res.code == 1004) {
              Modal.confirm({
        title: '提示',
        content: res.msg,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            Modal.destroyAll();
            localStorage.removeItem("activeKey")
            localStorage.removeItem("Tabslist")
            localStorage.removeItem("token");
            router.push({ name: "Login" })
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
          Modal.destroyAll();
        },
      });
    } else {
      resolve(res);
    }
  }
  /**
 * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
 * @param res
 */
  public errorHandle(res: any) {
    message.warn(res.msg);  // 统一谈服务端提示,我们提示统一由服务端提供
    // 状态码判断
    // switch (res.status) {
    //   case -102:
    //     break;
    //   case -152:
    //     break;
    //   default:
    //   // console.log(other);
    // }
  }
}