import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '@/router/index'
/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class Login {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  public getData(params: object) {
    const url = "/api/uauth/my/date";
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
  // 查验权限
  public getjurisdiction(params: object) {
    const url = "/api/uauth/my/date";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  //获取登陆界面title
  public gettitle(params: object) {
    const url = "/api/pconfig/system/setting/getPlatformName";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
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
  public login(params: object) {
    const url = "/api/uauth/login";
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
  // 退出登录
  public outuser(params: object) {
    const url = "/api/uauth/logout";
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

  // 获取当前用户基础信息
  public usermsg(params: object) {
    const url = "/api/uauth/my/info";
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
  // 修改密码
  public editpsd(params: object) {
    const url = "/api/uauth/my/passwd";
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
  // todo 获取公告
  public getNotice(params: object) {
    const url = "/api/pconfig/system/notice/getNotices";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  } 
  // todo 获取菜单 
  public getMenudata(params: object) {
    const url = "/api/uauth/base/menu/nav";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
        // console.log(res)
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
    if (res.code == 1002 ) {
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
    }else if(res.code == 1004){
      Modal.confirm({
        title: '提示',
        content: res.msg,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            Modal.destroyAll();
            // localStorage.clear();
            // router.push({ name: "Login" })
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