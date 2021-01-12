/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-01-11 17:24:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\api\module\Interface.ts
 */
import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'

/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
  * @param service      服务,默认api
  * @class Api
 */
export class Interface {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  public getData(params: object, jwt: boolean, modulename: string,
    flag: string, service = 'api') {
    const url = service + '/' + modulename;
    const body = {
      data: params,
      tag: flag,
    };

    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,

      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }


   /**
   * post请求
   * @param params  参数
   * @param jwt   是否token校验
   * @param modulename    模块
   * @param flag          标记
   * @param service      服务,默认api
   */
  public postData(params: object, jwt=true, modulename: string,
    flag: string, service = 'api') {
    const url = service + '/' + modulename ;
    const body = {
      data: params,
      tag: flag,
    };
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {

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
    if (res.status === 200) {
      resolve(res.data);
    } else {
      this.errorHandle(res);
    }
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