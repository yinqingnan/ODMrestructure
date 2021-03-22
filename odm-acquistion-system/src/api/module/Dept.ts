/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2021-02-08 14:59:12
 * @LastEditTime: 2021-02-23 11:20:51
 * @FilePath: \src\api\module\Dept.ts
 * @LastEditors: yqn
 */
import { Interceptors, ResultHandle } from "../interceptors";
export class Dept {
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
    const url = "/api/uauth/base/dept/queryAll?temm=" + new Date().getTime();
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

  public getSelect(params: object) {
    const url = "/api/uauth/base/dept/select";
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
  public removeID(params: object) {
    const url = "/api/uauth/base/dept/delete";
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
  public saveVal(params: object) {
    const url = "/api/uauth/base/dept/save";
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
