import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'
import qs from  'qs'
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
  public getMenulist(params: object) {
    const url = "/api/uauth/base/dept/select/login";
    const body = {
      data: params,
    };
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params: body,
      }).then((res: any) => {
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  //todo 部门删除 
  public bumendlt(params: object, jwt = true) {
    const url = "/api/file/filedata/file/delete";
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
  public relationsave(params: object, jwt = true) {
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
  public getStoragetable(params: object, jwt = true) {
    const url = "/api/file/filedata/storageCategory/getAllList";
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

  //todo  存储类别添加保存接口
  public storetypesave(params: object, jwt = true) {
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
  //todo  存储类别编辑保存接口
  public storetypedeit(params: object, jwt = true) {
    const url = "/api/file/filedata/storageCategory/update";
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

  public storetypedlt(params: object, jwt = true) {
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


  // todo 弹窗数据获取 
  public getfiledetails(params: object) {
    const url = "/api/file/filedata/file/info/" + params;
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        // params: params,

      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // 标注信息
  public getfiletagging(params: object) {
    const url = "/api/tpb/lawarchives/file-label/info/" + params;
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        // params: params,
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  //todo 弹窗标记下拉数据 
  public getfileselect(params: object) {
    const url = "/api/file/filedata/storageCategory/getAll";
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

  // todo 标记保存 
  public marksave(params: object) {
    const url = "/api/file/filedata/file/mark";
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
  // todo  标注下拉 1    
  private taggingselect1(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/dic-label/select";
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
  // todo  标注下拉 2
  private taggingselect2(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/dic-child-label/select/" + params;
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        // params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

  // todo 标注修改保存 
  public taggingsave(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/file-label/save";
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
  // todo 评价打分  
  private evaluate(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/file-evaluate/info/" + params;
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        // params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }


  //todo 扣分项目 
  private lawarchives(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/dm-jfx/getAll";
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

  // todo 評分baocun 
  public pfsave(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/file-evaluate/save";
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

  //todo  查看案件详情 
  private CaseDetails(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/case/info";
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

  //todo 案件关联信息 /api/tpb/lawarchives/match/files/
  private MatchFiles(params: object, jwt = true) {
    const url = "/api/tpb/lawarchives/match/files/" + params;
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        // params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo是否可以查看其他部门信息接口  
  private roledataright(params: object, jwt = true) {
    const url = "/api/uauth/base/role/data/right";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        // params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }
  // todo 关联文件table查询 
  private Associatedfiles(params: object, jwt = true) {
    const url = "/api/file/filedata/file/caseList";
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        params:params,
        headers: {
          isJwt: jwt,
          'Accept-Language': 'zh-CN,zh;q=0.9'
        },
      }).then((res: any) => {
        // console.log(res)
        this.resultHandle(res, resolve);
      }).catch((err: { message: any }) => {
        reject(err.message);
      });
    });
  }

// todo 关联案件 
public saveRelate(params: object, jwt = true) {
  const url = "/api/tpb/lawarchives/match/saveRelate";
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
// todo 删除关联 
public deleteRelate(params: object, jwt = true) {
  const url = "/api/tpb/lawarchives/match/deleteRelate";
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
  // todo 请求日志信息 
  public getlogmsg(params: object, jwt=TextTrackCueList) {
    const url = "/api/file/filedata/file/getLogText/"+params;
    return new Promise((resolve, reject) => {
      this.axios.get(url, {
        // params: params,
        headers: { isJwt: jwt },
      }).then((res: any) => {
        // resolve(res);
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
    // resolve(res);
    // } else {
    //   this.errorHandle(res);
    // }
    if (res.code == 1002 || res.code == 1004) {
      Modal.confirm({
        title: '提示',
        content: res.msg,
        onOk() {
          return new Promise((resolve, reject) => {
            setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            Modal.destroyAll();
            // localStorage.removeItem("activeKey")
            // localStorage.removeItem("Tabslist")
            // localStorage.removeItem("token");
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
    switch (res.status) {
      case 1002:
        // console.log(12)
        break;
      case -152:
        break;
      default:
      // console.log(other);
    }
  }
}