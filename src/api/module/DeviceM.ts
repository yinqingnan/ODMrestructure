import { Interceptors } from '../interceptors';
import { message } from 'ant-design-vue';   // 弹吐司

/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class DeviceM {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  // todo执法仪设备table数据
  public gettabledata(params: object, jwt=TextTrackCueList) {
    const url = "/api/mdm/device/matche/list";

    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
 
  // todo 执法仪删除
  // 
  public instrumentdlt(params: object, jwt= true) {
    const url = "/api/mdm/device/matche/delete";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo姓名警号 人员接口
  // 
  public getPolicepersonneldata(params: object, jwt=TextTrackCueList) {
    const url = "/api/uauth/base/user/lists";

    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // resolve(res);
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  //todo 执法仪新增 
  public Policepersonnelsave(params: object, jwt= true) {
    const url = "/api/mdm/device/matche/save";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
        headers: { isJwt: jwt },
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }





  /**
 * @param res
 * @param resolve
 */
  public resultHandle(res: any, resolve: { (value?: unknown): void; (value?: unknown): void; (arg0: any): void }) {
    // 在此处判断res.status状态然后返回值
    // if (res.code === 0) {
      resolve(res);
    //   message.success(res.msg)
    // } 
    // else {
    //   message.error(res.msg)
    //   // this.errorHandle(res);
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