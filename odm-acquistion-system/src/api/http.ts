/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2020-12-18 09:39:16
 * @LastEditTime: 2021-02-23 13:56:59
 * @FilePath: \src\api\http.ts
 * @LastEditors: yqn
 */
/**
 * @title   http请求封装
 * @desc    
 */
// import { Interceptors } from './interceptors';
// import router from '../router/index';
import { configInterface } from './module/index'

// console.log(new configInterface())
export class HttpService {
  // 预先定义接口
  public Interface: any;
  public configInterface: any;

  constructor() {
    this.configInterface = configInterface    
  }
  
}