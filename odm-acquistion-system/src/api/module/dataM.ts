import { Interceptors, ResultHandle } from "../interceptors";
/**
 *@param param 参数
 *@param jwt   是否token校验
 * @param flag          标记
 */
export class DataM {
  public axios: any;
  public Res: any; // eslint-disable-line
  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }

  //todo 部门删除
  public bumendlt(params) {
    const url = "/file/delete";
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
  // todo 初始化请求表格数据
  public gettabledata(params: object) {
    const url = "/file/pageList";
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
  // todo 关联设置接口
  public videoSnapshot(code: string, second: number) {
    const url = `/file/videoSnapshot/${code}/${second}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  //todo存储类型删除
  public filemark(params: object) {
    const url = "/file/mark";
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
  // todo 弹窗数据获取
  public getfiledetails(id: string) {
    const url = `/file/info/${id}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //预览文件
  public yulanwenjian(id: string) {
    const url = `/file/preview/${id}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // 文件转码
  public convertFormat(code: string, format: string) {
    const url = `/file/convertFormat/${code}/${format}`;
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
  //获取文件转换进度条
  public getprogressVal(code: string, format: string) {
    const url = `/file/convertFormatProgressVal/${code}/${format}`;
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
