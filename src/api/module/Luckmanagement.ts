import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'

/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
  * @param service      服务,默认api
  * @class Api
 */
export class Luckmanagement {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  // todo post
  // public collectionDlt(params: object, jwt= true) {
  //   const url = "/api/mdm/device/stations/delete";
  //   const body = params
  //   return new Promise((resolve, reject) => {
  //     this.axios.post(url, body, {
  //       headers: { isJwt: jwt },
  //     }).then((res: any) => {
  //       this.resultHandle(res, resolve);
  //     }).catch((err: { message: any }) => {
  //       reject(err.message);
  //     });
  //   });
  // }
  // todo get
  // public gettabledata(params: object, jwt=true) {
  //   const url = "/api/mdm/device/matche/list";
  //   return new Promise((resolve, reject) => {
  //     this.axios.get(url, {
  //       params: params,
  //       headers: { isJwt: jwt },
  //     }).then((res: any) => {
  //       // console.log(res)
  //       this.resultHandle(res, resolve);
  //     }).catch((err: { message: any }) => {
  //       reject(err.message);
  //     });
  //   });
  // }

  // todo 接入管理table

  public getIncomingtabledata(params: object, jwt = true) {
    const url = "/api/pconfig/system/authorization/list";
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

  // todo 接入管理新增接入 子平台和采集站  
  public accessauthsave(params: object, jwt = true) {
    const url = "/api/pconfig/system/authorization/save";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  // todo 平台删除 
  public accessauthdlt(params: object, jwt = true) {
    const url = "/api/pconfig/system/authorization/delete";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }


  //todo 升级管理table
  public getUpgradeMtable(params: object, jwt = true) {
    const url = "/api/mdm/system/upgrade/list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res)
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo 升级管理删除 
  public Uploaddlt(params: object, jwt = true) {
    const url = "/api/mdm/system/upgrade/delete";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res)
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo 文件上传接口
  public Uploadsave(params: object, jwt = true) {
    const url = "/api/mdm/system/upgrade/save";
    const body = params
    return new Promise((resolve, reject) => {
      this.axios.post(url, body, {
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  // todo 日志管理获取时间
  public getlogdate(params: object, jwt = true) {
    const url = "/api/uauth/my/date";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res)
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  // todo 日志管理获取日志类型下拉
  public getlogtype(params: object, jwt = true) {
    const url = "/api/pconfig/base/log/logType";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res)
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  // todo 日志管理获取功能模块下拉
  public getlogfunmodule(params: object, jwt = true) {
    const url = "/api/pconfig/base/log/logBiz";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res)
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo  日志管理table  
  public getlogtable(params: object, jwt = true) {
    const url = "/api/pconfig/base/log/list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        resolve(res)
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
    // if (res.status === 200) {
    // resolve(res.data);
    // } else {
    //   this.errorHandle(res);
    // }
    if (res.code == 1002) {
              Modal.confirm({
        title: '提示',
        content: res.msg,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            Modal.destroyAll();
            localStorage.removeItem("activeKey")
            localStorage.removeItem("Tabslist")
            localStorage.removeItem("token");
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
    switch (res.status) {
      case -102:
        break;
      case -152:
        break;
      default:
      // console.log(other);
    }
  }
}