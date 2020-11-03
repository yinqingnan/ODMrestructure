/**
 * @title   http请求封装
 * @desc    
 */
// import { Interceptors } from './interceptors';
import router from '../router/index';
import {configInterface} from './module/index.js'

// console.log(new configInterface())
export class HttpService {
  // 预先定义接口
  public Interface :any
  public configInterface :any

  constructor(){
    this.configInterface =  configInterface    //接口示例
  }
  
}