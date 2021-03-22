import { Interceptors, ResultHandle } from "../interceptors";
export class DeviceM {
  public axios: any;
  public Res: any; // eslint-disable-line

  constructor() {
    this.axios = new Interceptors().getInterceptors();
    this.Res = new ResultHandle();
  }
  // todo执法仪设备table数据
  public gettabledata(params: object) {
    const url = "/recorder/pageList";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 设备型号下拉数据
  public Equipmentmodel(params: object) {
    const url = "/dict/deviceModelSelect";
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
  // todo 设备厂商下拉数据
  public deviceBrandSelect(params: object) {
    const url = "/dict/deviceBrandSelect";
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
  // todo 执法仪删除
  public instrumentdlt(params: object) {
    const url = "/recorder/delete";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo姓名警号 人员接口
  public getPolicepersonneldata(params: object) {
    const url = "/api/uauth/base/user/lists";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // resolve(res);
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //todo 执法仪新增
  public Policepersonnelsave(params: object) {
    const url = "/recorder/save";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 保修接口

  public Sendforrepair(params: object) {
    const url = "/api/mdm/device/matche-repairs/save";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 启用执法仪

  public Enable(params: object) {
    const url = "/api/mdm/device/matche/modify";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // resolve(res);
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 报修记录

  public Repairrecord(params: object) {
    const url = "/api/mdm/device/matche-repairs/list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // resolve(res);
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo采集站table数据

  public stationstable(params: object) {
    const url = "/api/mdm/device/stations/list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // resolve(res);
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  //todo 存储服务器table
  public storetable(params: object) {
    const url = "/api/mdm/device/storage/list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // resolve(res);
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo存储服务器新增
  public storeadd(params: object) {
    const url = "/api/mdm/device/storage/save";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo FTP设置表格数据
  public ftptable(params: object) {
    const url = "/api/mdm/device/storage-ftp/list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo ftp配置新增
  public ftpconfigadd(params: object) {
    const url = "/api/mdm/device/storage-ftp/save";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo ftp设置的删除

  public ftpconfigdlt(params: object) {
    const url = "/api/mdm/device/storage-ftp/delete";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 采集站启用

  public collectionEnable(params: object) {
    const url = "/api/mdm/device/stations/enable";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 采集站重启
  public collectionrestart(params: object) {
    const url = "/api/mdm/device/stations/restart";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 采集站数据同步

  public collectiondatasync(params: object) {
    const url = "/api/mdm/device/stations/sync";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 采集站数据升级
  public collectionupgrade(params: object) {
    const url = "/api/mdm/device/stations/upgrade";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 采集站数据关机

  public collectionShutdown(params: object) {
    const url = "/api/mdm/device/stations/shutdown";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 采集站数据禁用
  public collectionDisable(params: object) {
    const url = "/api/mdm/device/stations/disable";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 采集站数据删除
  public collectionDlt(params: object) {
    const url = "/api/mdm/device/stations/delete";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 子平台table
  public platformtable(params: object) {
    const url = "/api/mdm/device/stations/platform-list";
    return new Promise((resolve, reject) => {
      this.axios
        .get(url, {
          params: params,
        })
        .then((res: any) => {
          // resolve(res);
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  //todo 子平台删除
  public platformdlt(params: object) {
    const url = "/api/mdm/device/stations/delete";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  //todo 存储服务器删除
  public storedlt(params: object) {
    const url = "/api/mdm/device/storage/delete";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }
  // todo 获取采集站版本
  public getversion(params: object) {
    const url = "/workstation/version";
    const body = params;
    return new Promise((resolve, reject) => {
      this.axios
        .post(url, body, {})
        .then((res: any) => {
          this.Res.resultHandle(res, resolve);
        })
        .catch((err: { message: any }) => {
          reject(err.message);
        });
    });
  }

  // todo 警员下拉数据
  public RoleSelect() {
    const url = "/user/select";
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
}