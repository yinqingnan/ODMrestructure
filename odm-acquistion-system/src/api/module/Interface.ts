/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-02-23 11:22:08
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\api\module\Interface.ts
 */
import { Interceptors,ResultHandle } from '../interceptors';
export class Interface {
  public axios: any;
   public Res: any; // eslint-disable-line

  constructor() {
    this.axios = new Interceptors().getInterceptors()
    this.Res = new ResultHandle();

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
        this.Res.resultHandle(res, resolve);
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
        this.Res.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
}