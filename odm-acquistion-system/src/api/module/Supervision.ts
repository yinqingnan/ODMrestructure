import { Interceptors, ResultHandle } from "../interceptors";

export class Supervision {
  public axios: any; // eslint-disable-line
  public Res: any; // eslint-disable-line
  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  // todo 获取考评记录table数据
  public gettabledata(params: object) {
    const url = "/api/tpb/lawarchives/file-evaluate/already/list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          console.log(res);
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //
  // todo 获取考评记录table数据
  public getDailytabledata(params: object) {
    const url = "/api/tpb/lawarchives/file-evaluate/no/list";

    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
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
  // todo  随机抽查table数据
  public getrandomtabledata(params: object) {
    const url = "/api/tpb/lawarchives/file-evaluate/random/list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
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

  //todo 考评设置数据
  public getsettingdata(params: object) {
    const url = "/api/tpb/lawarchives/dm-jfx/getAllList";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
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

  // todo 考评设置 删除 /api/tpb/lawarchives/dm-jfx/delete/{id}
  public Evaluationsetdlt(params: string) {
    const url = "/api/tpb/lawarchives/dm-jfx/delete/" + params;
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
  // todo 考评设置单个保存

  public EvaluationsettingsSave(params: object) {
    const url = "/api/tpb/lawarchives/dm-jfx/save";
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

  // todo 考评设置编辑修改
  public EvaluationsettingsEdit(params: object) {
    const url = "api/tpb/lawarchives/dm-jfx/edit";
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