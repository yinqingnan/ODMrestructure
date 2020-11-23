import { Interceptors } from '../interceptors';
import { message, Modal } from 'ant-design-vue';   // 弹吐司
import router from '../../router/index'
/**
  *@param param 参数
  *@param jwt   是否token校验
  * @param flag          标记
 */
export class OrganizationM {
  public axios: any;
  constructor() {
    this.axios = new Interceptors().getInterceptors()
  }
  // todo 用户管理table
  public getusertable(params: object, jwt = true) {
    const url = "/api/uauth/base/user/list";

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
  // todo 用户角色下拉
  public userroleselect(params: object, jwt = true) {
    const url = "/api/uauth/base/role/select";
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
  // todo 添加时的部门下拉
  public userdeptCodeselect(params: object, jwt = true) {
    const url = "/api/uauth/base/dept/select";
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
  //todo  用户管理添加时 岗位下拉数据 /api/pconfig/base/dict/listByParent
  public userpostlistselect(params: object, jwt = true) {
    const url = "/api/pconfig/base/dict/listByParent";
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
  // todo用户管理分配执法仪账号
  public userzfyzh(params, jwt = true) {
    const url = "/api/uauth/base/user/assignDeviceCode";
    // const body = JSON.stringify({ params })
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 用户管理分配调度台账户

  public userddtzh(params, jwt = true) {
    const url = "/api/uauth/base/user/assignScheduleCode";
    // const body = JSON.stringify({ params })
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 用户重置密码 
  public userresetpwd(params, jwt = true) {
    const url = "/api/uauth/base/user/resetPasswd";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 用户删除 /api/uauth/base/user/delete
  public userdlt(params, jwt = true) {
    const url = "/api/uauth/base/user/delete";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }

  //todo 用户管理保存   
  public usersave(params, jwt = true) {
    const url = "/api/uauth/base/user/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 用户管理修改 
  public userupdate(params, jwt = true) {
    const url = "/api/uauth/base/user/update";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 获取生成二维码的数据 /api/uauth/base/user/getQRcode


  //todo 角色管理table 
  public getroletable(params: object, jwt = true) {
    const url = "/api/uauth/base/role/list";

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

  // todo 角色新增 
  public roleadd(params, jwt = true) {
    const url = "/api/uauth/base/role/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 角色编辑 
  public roleupdate(params, jwt = true) {
    const url = "/api/uauth/base/role/update";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }

  // todo 角色删除 id: 7
  public roledlt(params: object, jwt = true) {
    const url = "/api/uauth/base/role/delete";
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

  //todo 获取当前角色的权限 
  public roleright(params: object, jwt = true) {
    const url = "/api/uauth/base/role/right";
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

  // todo 更新权限项 
  public roleSetright(params, jwt = true) {
    const url = "/api/uauth/base/role/ref/right";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }


  //todo  菜单管理树data 
  public menutreedata(params: object, jwt = true) {
    const url = "/api/uauth/base/menu/tree";
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

  // todo 初始化获取按钮表格table 
  public menubtntable(params: object, jwt = true) {
    const url = "/api/uauth/base/menu/listbtn";
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
  // todo 添加菜单 
  public MenuAdd(params, jwt = true) {
    const url = "/api/uauth/base/menu/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }

  // todo 菜单删除 
  public menuDlt(params: object, jwt = true) {
    const url = "/api/uauth/base/menu/delete";
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
  // todo 菜单通过当前id查找父级 
  public menuquery(params: object, jwt = true) {
    const url = `/api/uauth/base/menu/info/${params}`;
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
  // todo 菜单编辑 /api/uauth/base/menu/update
  public MenuEdit(params, jwt = true) {
    const url = "/api/uauth/base/menu/update";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }

  //todo Menu钮新增 
  public Menubtnadd(params, jwt = true) {
    const url = "/api/uauth/base/menu/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo Menu按钮编辑
  public Menubtnedit(params, jwt = true) {
    const url = "/api/uauth/base/menu/update";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 菜单按钮删除 /api/uauth/base/menu/delete
  public menubtnDlt(params: object, jwt = true) {
    const url = "/api/uauth/base/menu/delete";
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

  // todo 权限管理左侧数据 
  public rightslistdata(params: object, jwt = true) {
    const url = "/api/uauth/base/right/list";
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
  // todo 权限管理新增添加 
  public rightsadd(params, jwt = true) {
    const url = "/api/uauth/base/right/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  //todo 权限管理左侧保存 
  public rightssave(params, jwt = true) {
    const url = "/api/uauth/base/right/update";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
          reject(err.message);
        });
    });
  }
  // todo 权限项删除 
  public rightsDlt(params: object, jwt = true) {
    const url = "/api/uauth/base/right/delete";
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
  // todo 权限管理右侧权限树 
  public rightsTree(params: object, jwt = true) {
    const url = "/api/uauth/base/menu/right/tree";
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
  //todo 右侧树 保存操作   
  public rightsTreesave(params, jwt = true) {
    const url = "/api/uauth/base/right/ref/menu";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {
          headers: { isJwt: jwt },
        })
        .then(res => {
          this.resultHandle(res, resolve);
        })
        .catch(err => {
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