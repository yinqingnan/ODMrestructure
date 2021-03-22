import { Interceptors, ResultHandle } from "../interceptors";
/**
 *@param param 参数
 *@param jwt   是否token校验
 * @param flag          标记
 * @param service      服务,默认api
 * @class Api
 */
export class Luckmanagement {
  public axios: any;
  public Res: any; // eslint-disable-line
  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  // todo 接入管理table
  public getIncomingtabledata(params: object) {
    const url = "/api/pconfig/system/authorization/list";
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

  // todo 接入管理新增接入 子平台和采集站
  public accessauthsave(params: object) {
    const url = "/api/pconfig/system/authorization/save";
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

  // todo 平台删除
  public accessauthdlt(params: object) {
    const url = "/api/pconfig/system/authorization/delete";
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

  //todo 升级管理table
  public getUpgradeMtable(params: object) {
    const url = "/upgrade/recorder/pageList";
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
  // todo 升级管理删除
  public Uploaddlt(id: string) {
    const url = `/upgrade/recorder/delete/${id}`;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 文件上传接口
  public Uploadsave(params: object) {
    const url = "/upgrade/recorder/save";
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

  // todo 日志管理获取时间
  public getlogdate(params: object) {
    const url = "/api/uauth/my/date";
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
  // todo 日志管理获取日志类型下拉
  public getlogtype(params: object) {
    const url = "/log/logSelect";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 日志管理获取功能模块下拉
  public getlogfunmodule(logTypeId: string) {
    const url = `/log/logModelSelect/${logTypeId}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo  日志管理table
  public getlogtable(params: object) {
    const url = "/log/pageList";
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
