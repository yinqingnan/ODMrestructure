/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2021-02-23 14:55:00
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\api\module\HighConfig.ts
 */
import { Interceptors, ResultHandle } from "../interceptors";
export class HighConfig {
  public axios: any;
  public Res: any; // eslint-disable-line

  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  public getData(params: object) {
    const url = "";
    const body = {
      data: params,
    };

    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
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
  public getList(params: object) {
    const url = "/config/pageList";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  public upData(params: object) {
    const url = "/config/save";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
}
