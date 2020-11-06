import { Interceptors } from '../interceptors';
import { message } from 'ant-design-vue';   // 弹吐司

/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class HighConfig {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  public getData(params: object, jwt: boolean, flag: string,) {
    const url = "";
    const body = {
      data: params,
      tag: flag,
    };

    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any; }) => {
        reject(err.message);
      });
    });
  }


  /**
  * post请求
  * @param params  参数
  * @param jwt   是否token校验
  * @param flag          标记
  */
  public getList(params: object, jwt: boolean, flag: string) {
    const url = "/api/pconfig/base/base-config/page/all";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any; }) => {
        reject(err.message);
      });
    });
  }

  public upData(params: object, jwt: boolean, flag: string) {
    const url = "/api/pconfig/base/base-config/update";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any; }) => {
        reject(err.message);
      });
    });
  }

  /**
 * @param res
 * @param resolve
 */
  public resultHandle(res: any, resolve: { (value?: unknown): void; (value?: unknown): void; (arg0: any): void; }) {
    // 在此处判断res.status状态然后返回值
    // if (res.code === 0) {
    resolve(res);
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