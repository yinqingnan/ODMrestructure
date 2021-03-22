import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'
/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class Supervision {
  public axios: any;
  public Resultprocessing: any
  constructor() {
    this.axios = new Interceptors().getInterceptors()

  }
  // todo 获取考评记录table数据
  public gettabledata(params: object) {
    const url = "/api/tpb/lawarchives/file-evaluate/already/list";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: params,
      }).then((res: any) => {
        console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // 
  // todo 获取考评记录table数据
  public getDailytabledata(params: object) {
    const url = "/api/tpb/lawarchives/file-evaluate/no/list";

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
  // todo  随机抽查table数据
  public getrandomtabledata(params: object) {
    const url = "/api/tpb/lawarchives/file-evaluate/random/list";
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


  //todo 考评设置数据  
  public getsettingdata(params: object) {
    const url = "/api/tpb/lawarchives/dm-jfx/getAllList";
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

  // todo 考评设置 删除 /api/tpb/lawarchives/dm-jfx/delete/{id}
  public Evaluationsetdlt(params: string) {
    const url = "/api/tpb/lawarchives/dm-jfx/delete/" + params;
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
  // todo 考评设置单个保存

  public EvaluationsettingsSave(params: object) {
    const url = "/api/tpb/lawarchives/dm-jfx/save";
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

  // todo 考评设置编辑修改
  public EvaluationsettingsEdit(params: object) {
    const url = "api/tpb/lawarchives/dm-jfx/edit";
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