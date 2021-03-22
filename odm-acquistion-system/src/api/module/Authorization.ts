/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2021-02-08 14:59:12
 * @LastEditTime: 2021-02-23 11:24:51
 * @FilePath: \src\api\module\Authorization.ts
 * @LastEditors: yqn
 */
import { Interceptors, ResultHandle } from "../interceptors";
export class Authorization {
  public axios: any; // eslint-disable-line
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
  public getBiz(params: object) {
    const url = "/api/pconfig/auth/biz";
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

  public software(params: object) {
    const url = "/api/pconfig/auth/software";
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