/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:44
 * @LastEditTime: 2021-03-31 19:25:13
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\InterfaceVariable\interface.ts
 */
/**
 * @desc 定义全局接口信息
 */

// todo表格
interface Page {
  currentPage: number;
  pageSize: number;
  totalResult: number;
}
interface Selecttype {
  id: number;
  title: string;
  value: string;
}

interface Filedetails {
  fileName?: string;
  deptName?: string;
  deptCode?: string;
  userCode?: string;
  recordDate?: string;
  uploadDate?: string;
  fileSize_Name?: string;
  storageLocation_Name?: string;
  storageDays?: string;
  downloadPath?: string;
  id: string;
  fileType_Name?: string;
  marker?: string;
  categoryId?: string;
  userName?: string;
  fileLevel?: string;
  httpPath?: string;
}

interface Sources {
  type: string;
  src: string;
}
interface ControlBar {
  timeDivider: boolean;
  durationDisplay: boolean;
  remainingTimeDisplay: boolean;
  fullscreenToggle: boolean;
}
interface PlayerOptions {
  playbackRates: Array<number>;
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  preload: string;
  language: string;
  aspectRatio: string;
  fluid: boolean;
  sources: Sources[];
  poster: string;
  notSupportedMessage: string;
  controlBar: ControlBar;
}

interface resetFields {
  (): void;
  (field: string[]): void;
}

interface formData {
  //获取全部数据
  submit(): { [field: string]: any };
  //获取部分字段的数据
  (field: string[]): { [field: string]: any };
}

interface disabled {
  //禁用全部组件
  (status: Boolean): void;
  //禁用指定组件
  (status: Boolean, field: string): void;
  //禁用部分组件
  (status: Boolean, field: string[]): void;
}

interface Treepropobj {
  id?: string;
  parentid?: string;
  parentname?: string;
  name?: string;
}
interface setValue {
  (formData: { [field: string]: any }): void;
  (field: string, value: any): void;
}

interface Videoobj {
  page?: number;
  size?: number;
  keyword?: string;
  file_type_equal?: string;
  file_level_equal?: string;
  upload_date_ge?: string;
  upload_date_le?: string;
  record_date_ge?: string;
  record_date_le?: string;
  order?: string;
  sidx?: string;
}
export {
  disabled,
  resetFields,
  formData,
  Page,
  Selecttype,
  Filedetails,
  PlayerOptions,
  Treepropobj,
  setValue,
  Videoobj,
};
