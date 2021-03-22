import { Interceptors, ResultHandle } from "../interceptors";
/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class Announcement {
  public axios: any;
  public Res: any; // eslint-disable-line
  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  public getData(params: object, jwt: boolean, flag: string) {
    const url = "";
    const body = {
      data: params,
      tag: flag,
    };

    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body,
          headers: { isJwt: jwt },
        })
        .then((res: any) => {
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
  public getNotices(params: object, jwt: boolean, flag: string) {
    const url = "/api/pconfig/system/notice/list";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body,
          headers: { isJwt: jwt },
        })
        .then((res: any) => {
         this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  public getSelect(params: object, jwt: boolean, flag: string) {
    const url = "/api/uauth/base/dept/select";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body,
          headers: { isJwt: jwt },
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  public saveVal(params: object, jwt: boolean, flag: string) {
    const url = "/api/pconfig/system/notice/save";
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
  public editVal(params: object) {
    const url = "/api/pconfig/system/notice/update";
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
  public removeItem(params: object, jwt: boolean, flag: string) {
    const url = "/api/pconfig/system/notice/delete";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {
          headers: { isJwt: jwt },
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