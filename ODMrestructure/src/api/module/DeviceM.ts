import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'

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
  public gettabledata(params: object) {
    const url = "/api/mdm/device/matche/list";
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

  // todo 执法仪删除
  // 
  public instrumentdlt(params: object) {
    const url = "/api/mdm/device/matche/delete";
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
  // todo姓名警号 人员接口
  // 
  public getPolicepersonneldata(params: object) {
    const url = "/api/uauth/base/user/lists";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
      }).then((res: any) => {
        // resolve(res);
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  //todo 执法仪新增 
  public Policepersonnelsave(params: object) {
    const url = "/api/mdm/device/matche/save";
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
  // todo 保修接口

  public Sendforrepair(params: object) {
    const url = "/api/mdm/device/matche-repairs/save";
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

  // todo 启用执法仪

  public Enable(params: object,) {
    const url = "/api/mdm/device/matche/modify";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
        // resolve(res);
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  // todo 报修记录

  public Repairrecord(params: object) {
    const url = "/api/mdm/device/matche-repairs/list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
      }).then((res: any) => {
        // resolve(res);
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }


  // todo采集站table数据

  public stationstable(params: object) {
    const url = "/api/mdm/device/stations/list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
        // resolve(res);
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }






  //todo 存储服务器table  
  public storetable(params: object) {
    const url = "/api/mdm/device/storage/list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
        // resolve(res);
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo存储服务器新增  
  public storeadd(params: object) {
    const url = "/api/mdm/device/storage/save";
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
  // todo FTP设置表格数据 
  public ftptable(params: object) {
    const url = "/api/mdm/device/storage-ftp/list";
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

  // todo ftp配置新增 
  public ftpconfigadd(params: object) {
    const url = "/api/mdm/device/storage-ftp/save";
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
  // todo ftp设置的删除

  public ftpconfigdlt(params: object) {
    const url = "/api/mdm/device/storage-ftp/delete";
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
  // todo 采集站启用

  public collectionEnable(params: object) {
    const url = "/api/mdm/device/stations/enable";
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
  // todo 采集站重启 
  public collectionrestart(params: object) {
    const url = "/api/mdm/device/stations/restart";
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
  // todo 采集站数据同步

  public collectiondatasync(params: object) {
    const url = "/api/mdm/device/stations/sync";
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
  // todo 采集站数据升级
  public collectionupgrade(params: object) {
    const url = "/api/mdm/device/stations/upgrade";
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
  // todo 采集站数据关机

  public collectionShutdown(params: object) {
    const url = "/api/mdm/device/stations/shutdown";
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
  // todo 采集站数据禁用
  public collectionDisable(params: object) {
    const url = "/api/mdm/device/stations/disable";
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
  // todo 采集站数据删除
  public collectionDlt(params: object) {
    const url = "/api/mdm/device/stations/delete";
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

  // todo 子平台table
  public platformtable(params: object,) {
    const url = "/api/mdm/device/stations/platform-list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,

      }).then((res: any) => {
        // resolve(res);
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  //todo 子平台删除  
  public platformdlt(params: object) {
    const url = "/api/mdm/device/stations/delete";
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

  //todo 存储服务器删除 
  public storedlt(params: object) {
    const url = "/api/mdm/device/storage/delete";
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