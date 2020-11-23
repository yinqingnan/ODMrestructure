/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:44
 * @LastEditTime: 2020-11-23 14:09:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\InterfaceVariable\variable.ts
 */
/**
 * @desc 定义全局变量
 */
import {Page} from './interface'


// 限制输入框最大输入个数
export const LimitInputlength = 20;
export const textarealength = 200

export const page: Page = {
  currentPage: 1, //当前页数
  pageSize: 15, //每页多少条
  totalResult: 200, //总数
}
export const  layouts: Array<string> = [
  "PrevJump",
  "PrevPage",
  "Jump",
  "PageCount",
  "NextPage",
  "NextJump",
  "Sizes",
  "Total",
]
