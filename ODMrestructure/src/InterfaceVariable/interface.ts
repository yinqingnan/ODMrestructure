/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:44
 * @LastEditTime: 2020-12-07 16:11:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \src\InterfaceVariable\interface.ts
 */
/**
 * @desc 定义全局接口信息
 */

// todo表格
interface Page {
  currentPage: number
  pageSize: number
  totalResult: number
}
interface Selecttype {
  id: number;
  title: string;
  value: string;
}

interface Filedetails {
  fileName: string
  deptName: string
  deptCode: string
  userCode: string
  recordDate: string
  uploadDate: string
  fileSize_Name: string
  storageLocation_Name: string
  storageDays: string
  downloadPath: string
  id: string
  fileType_Name: string
  marker: string
  categoryId: string
  userName: string
  fileLevel: string
  httpPath: string
}

interface Sources {
  type: string
  src: string
}
interface ControlBar {
  timeDivider: boolean
  durationDisplay: boolean
  remainingTimeDisplay: boolean
  fullscreenToggle: boolean
}
interface PlayerOptions {
  playbackRates: Array<number>
  autoplay: boolean
  muted: boolean
  loop: boolean
  preload: string
  language: string
  aspectRatio: string
  fluid: boolean
  sources: Sources[]
  poster: string
  notSupportedMessage: string
  controlBar: ControlBar
}
export {
  Page,
  Selecttype,
  Filedetails,
  PlayerOptions
}