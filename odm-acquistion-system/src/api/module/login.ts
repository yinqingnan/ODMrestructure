import { Interceptors, ResultHandle } from "../interceptors";
export class Login {
  public axios: any; // eslint-disable-line
  public Res: any; // eslint-disable-line

  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  public getData(params: object) {
    const url = "/api/uauth/my/date";
    const body = {
      data: params,
    };
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: body,
        })
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  // 查验权限
  public getjurisdiction(params: object) {
    const url = "/api/uauth/my/date";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  //获取登录界面title
  public gettitle(params: object) {
    const url = "/getSystemName";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  /**
   * post请求
   * @param params  参数
   */
  public login(params: object) {
    const url = "/login";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  // 退出登录
  public outuser(params: object) {
    const url = "/logout";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res) => {
          resolve(res)
          // this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }
  // todo 系统首页接口
  // private async homePage(){
  //   const url = "/homePage";
  //   return await this.axios.get(url)
  // }
  public homePage(params: object) {
    const url = "/homePage";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url)
        .then((res) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  // 获取当前用户基础信息
  public usermsg(params: object) {
    const url = "/api/uauth/my/info";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  // 修改密码
  public editpsd(params: object) {
    const url = "/changePassword";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  // todo 获取公告
  public getNotice(params: object) {
    const url = "/api/pconfig/system/notice/getNotices";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          // console.log(res)
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }

  // todo 获取菜单
  public getMenudata(params: object) {
    const url = "/api/uauth/base/menu/nav";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message }) => {
          reject(err.message);
        });
    });
  }
}
