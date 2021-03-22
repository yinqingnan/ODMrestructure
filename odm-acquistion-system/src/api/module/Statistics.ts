/*
 * @Author: your name
 * @Date: 2020-11-30 14:08:12
 * @LastEditTime: 2021-02-23 11:24:39
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\api\module\Statistics.ts
 */
import { Interceptors, ResultHandle } from "../interceptors";

export class Statistics {
  public axios: any; // eslint-disable-line
  public Res: any; // eslint-disable-line
  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  // todo 时间获取
  public getdate(params: object) {
    const url = "/api/uauth/my/dateDept";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo  摄录统计表格
  public gettabledata(params: object) {
    const url = "/api/tpb/report/recording/user";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //todo 关联统计表格数据
  public getlawcasetable(params: object) {
    const url = "/api/tpb/report/lawcase/unit";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo  考评统计表格
  public getlabeltable(params: EventListenerObject) {
    const url = "/api/tpb/report/label/user";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 资产统计表格
  public getassetstable(params: object) {
    const url = "/api/tpb/report/assets/unit";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
}