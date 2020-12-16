import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'

/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class Dictionary {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  public getData(params: object) {
    const url = "";
    const body = {
      data: params,
    };
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
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
  public getKey(params: object ) {
    const url = "/api/pconfig/base/dict/getDictKey";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  public getList(params: object) {
    const url = "/api/pconfig/base/dict/list";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  public removeItem(params: object) {
    const url = "/api/pconfig/base/dict/delete";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  public saveVal(params: object) {
    const url = "/api/pconfig/base/dict/save";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {

      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  public EditVal(params: object) {
    const url = "/api/pconfig/base/dict/update";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
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
     if (res.code == 1002 || res.code == 1004) {
              Modal.confirm({
        title: '提示',
        content: res.msg,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            Modal.destroyAll();
            localStorage.clear();
            router.push({ name: "Login" })
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
          Modal.destroyAll();
        },
      });
    } else {
      resolve(res);
    }
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