import { Interceptors } from '../interceptors';
import { message } from 'ant-design-vue';   // 弹吐司

/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class DataM {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  // 获取部门菜单数据
  public getMenulist(params: object, jwt: boolean, flag: string) {
    const url = "/api/uauth/base/dept/select/login";
    const body = {
      data: params,
      tag: flag,
    };
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any; }) => {
        reject(err.message);
      });
    });
  }
    // 获取默认时间范围
    public gettimeframe(params: object, jwt: boolean, flag: string) {
      const url = "/api/uauth/my/dateDept";
      const body = {
        data: params,
        tag: flag,
      };
      return new Promise((resolve, reject) => {
        this.axios.get(url, {
          params: body,
          headers: { isJwt: jwt },
        }).then((res: any) => {
          // console.log(res)
          this.resultHandle(res, resolve);
        }).catch((err: { message: any; }) => {
          reject(err.message);
        });
      });
    }
  // 初始化请求表格数据
  // /api/file/filedata/file/list
  public gettabledata(params: object, jwt: boolean, flag: string) {
    const url = "/api/file/filedata/file/list";
    const body = {
      data: params,
      tag: flag,
    };
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any; }) => {
        reject(err.message);
      });
    });
  }




  /**
 * @param res
 * @param resolve
 */
  public resultHandle(res: any, resolve: { (value?: unknown): void; (value?: unknown): void; (arg0: any): void; }) {
    // 在此处判断res.status状态然后返回值
    // if (res.code === 0) {
    resolve(res);
    // } else {
    //   this.errorHandle(res);
    // }
  }
  /**
 * 服务端状态处理,例如中断性异常,退出异常等等(与拦截器http握手状态注意区分,一般都能分清楚吧)
 * @param res
 */
  public errorHandle(res: any) {
    message.warn(res.msg);  // 统一谈服务端提示,我们提示统一由服务端提供
    // 状态码判断
    // switch (res.status) {
    //   case -102:
    //     break;
    //   case -152:
    //     break;
    //   default:
    //   // console.log(other);
    // }
  }
}