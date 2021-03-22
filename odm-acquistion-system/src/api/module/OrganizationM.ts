import { Interceptors, ResultHandle } from "../interceptors";
export class OrganizationM {
  public axios: any; // eslint-disable-line
  public Res: any; // eslint-disable-line
  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  // 角色下拉
  public roleselect(params: object) {
    const url = "/role/select";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 用户管理table
  public getusertable(params: object) {
    const url = "/user/pageList";

    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 用户角色下拉
  public userroleselect(params: object) {
    const url = "/api/uauth/base/role/select";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 添加时的部门下拉
  public userdeptCodeselect(params: object) {
    const url = "/api/uauth/base/dept/select";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //todo  用户管理添加时 岗位下拉数据 /api/pconfig/base/dict/listByParent
  public userpostlistselect(params: object) {
    const url = "/api/pconfig/base/dict/listByParent";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo用户管理分配执法仪账号
  public userzfyzh(params) {
    const url = "/api/uauth/base/user/assignDeviceCode";
    // const body = JSON.stringify({ params })
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 用户管理分配调度台账户

  public userddtzh(params) {
    const url = "/api/uauth/base/user/assignScheduleCode";
    // const body = JSON.stringify({ params })
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 用户重置密码
  public userresetpwd(params) {
    const url = "/user/resetPassword";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params)
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 用户删除 /api/uauth/base/user/delete
  public userdlt(params) {
    const url = "/user/delete";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  //todo 用户管理保存
  public usersave(params) {
    const url = "/user/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 用户管理修改
  public userupdate(params) {
    const url = "/api/uauth/base/user/update";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 获取生成二维码的数据
  public getQRcode(params: object) {
    const url = "/api/uauth/base/user/getQRcode";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  //todo 角色管理table
  public getroletable(params: object) {
    const url = "/role/pageList";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 角色新增
  public roleadd(params) {
    const url = "/api/uauth/base/role/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 角色编辑
  public roleupdate(params) {
    const url = "/role/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  // todo 角色删除 id: 7
  public roledlt(params: string) {
    const url = `/role/delete/${params}`;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  //todo 获取当前角色的权限
  public roleright(params: object) {
    const url = "/role/Right/" + params;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 更新权限项
  public roleSetright(params) {
    const url = "/role/refRight";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  //todo  获取PC菜单树形
  public webmenutreedata(params: object) {
    const url = "/menu/webTree";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //todo  获取PC菜单树形
  public pcmenutreedata(params: object) {
    const url = "/menu/pcTree";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 初始化获取按钮表格table
  public menubtntable(id: string) {
    const url = `/menu/menuBtnPageList/${id}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 新增PC菜单
  public PCMenuAdd(params) {
    const url = "/menu/savePc";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params)
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 新增WEB菜单
  public WEBMenuAdd(params) {
    const url = "/menu/saveWeb";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  // todo 菜单删除
  public menuDlt(params: string) {
    const url = `/menu/delete/${params}`;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url)
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 获取PC菜单详情
  public GetPCpMenu(params: string) {
    const url = `/menu/pcMenu/${params}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 获取WEB菜单详情
  public GetWEBpMenu(params: string) {
    const url = `/menu/webMenu/${params}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 菜单编辑 /api/uauth/base/menu/update
  public MenuEdit(params) {
    const url = "/api/uauth/base/menu/update";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  //todo 保存Web菜单新增
  public MenuSaveWeb(params) {
    const url = "/menu/saveWeb";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params)
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 按钮新增
  public saveMenuBtn(params) {
    const url = "/menu/saveMenuBtn";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  // todo 菜单按钮删除
  public menubtnDlt(params) {
    const url = `menu/deleteMenuBtn/${params}`;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 权限管理左侧数据
  public rightslistdata(params: object) {
    const url = "/right/list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 权限管理新增添加
  public rightsadd(params) {
    const url = "/right/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 拖拽结束后保存  adjustSort
  public adjustSort(params: object) {
    const url = "/right/adjustSort";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //todo 权限管理左侧保存
  public rightssave(params) {
    const url = "/right/save";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
  // todo 权限项删除
  public rightsDlt(params: string) {
    const url = `/right/delete/${params}`;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 权限管理右侧权限树
  public rightsTree(params: string) {
    const url = `/right/menuTree/${params}`;
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res: any) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //todo 右侧树 保存操作
  public rightsTreesave(params) {
    const url = "/right/refMenu";
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, params, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }
}
