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
  // todo 获取部门菜单数据
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
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
    // todo 获取默认时间范围
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
        }).catch((err: { message: any }) => {
          reject(err.message);
        });
      });
    }
  // todo 初始化请求表格数据
 
  public gettabledata(params: object, jwt: boolean, flag: string) {
    const url = "/api/file/filedata/file/list";

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
  // todo 简易流程table数据
  public getprogramTable(params: object, jwt: boolean, flag: string) {
    const url = "/api/tpb/lawarchives/case/lllegalDatalist";
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
  // todo 强制措施table数据
  
  public getCoercivemeasuresTable(params: object, jwt: boolean, flag: string) {
    const url = "/api/tpb/lawarchives/case/lllegalDatalist";
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
  // todo 关联设置接口   /api/tpb/lawarchives/config/matchConfig
  public getrelationdata(params: object, jwt: boolean, flag: string) {
    const url = "/api/tpb/lawarchives/config/matchConfig";
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
  //   todo 关联数据保存
  public relationsave(params: object, jwt= true) {
    const url = "/api/tpb/lawarchives/config/matchConfig/save";
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


  // todo 存储类别表格接口
  // 
  public getStoragetable(params: object, jwt=true) {
    const url = "/api/file/filedata/storageCategory/getAllList";
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



    //todo  存储类别添加保存接口
  public storetypesave(params: object, jwt= true) {
    const url = "/api/file/filedata/storageCategory/save";
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
  //todo存储类型删除
   
   public storetypedlt(params: object, jwt= true) {
    const url = "/api/file/filedata/storageCategory/delete";
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