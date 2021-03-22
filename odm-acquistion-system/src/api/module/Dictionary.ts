import { Interceptors, ResultHandle } from "../interceptors";

export class Dictionary {
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
  public getKey(params: object) {
    const url = "/api/pconfig/base/dict/getDictKey";
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
  // todo 数据字典表格查询
  public getList(params: object) {
    const url = "/dict/pageList";
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

  public removeItem(params: object) {
    const url = "/api/pconfig/base/dict/delete";
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
  public saveVal(params: object) {
    const url = "/api/pconfig/base/dict/save";
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

  public EditVal(params: object) {
    const url = "/api/pconfig/base/dict/update";
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
  private getdetails(parentKey: string) {
    const url = `/dict/dictItemList/${parentKey}`;
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
  private saveedittable(params) {
    const url = `/dict/save`;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  private dltdelete(id: string) {
    const url = `/dict/delete/${id}`;
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
}
