import { Interceptors } from '../interceptors';
import { message } from 'ant-design-vue';   // 弹吐司

/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
  * @param service      服务,默认api
  * @class Api
 */
export class Luckmanagement {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  // todo post
  // public collectionDlt(params: object, jwt= true) {
  //   const url = "/api/mdm/device/stations/delete";
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
  // todo get
  // public gettabledata(params: object, jwt=true) {
  //   const url = "/api/mdm/device/matche/list";
  //   return new Promise((resolve, reject) => {
  //     this.axios.get(url, {
  //       params: params,
  //       headers: { isJwt: jwt },
  //     }).then((res: any) => {
  //       // console.log(res)
  //       this.resultHandle(res, resolve);
  //     }).catch((err: { message: any }) => {
  //       reject(err.message);
  //     });
  //   });
  // }

  // todo 接入管理table

  public getIncomingtabledata(params: object, jwt = true) {
    const url = "/api/pconfig/system/authorization/list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

// todo 接入管理新增接入 子平台和采集站  
public accessauthsave(params: object, jwt= true) {
  const url = "/api/system/authorization/save";
  const body = params
  return new Promise((resolve, reject) => {
    this.axios.post(url, body, {
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
    // 在此处判断res.status状态然后返回值
    // if (res.status === 200) {
      resolve(res.data);
    // } else {
    //   this.errorHandle(res);
    // }
  }
  /**
 * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
 * @param res
 */
  public errorHandle(res: any) {
    message.warn(res.msg);  // 统一谈服务端提示,我们提示统一由服务端提供
    // 状态码判断
    switch (res.status) {
      case -102:
        break;
      case -152:
        break;
      default:
      // console.log(other);
    }
  }
}