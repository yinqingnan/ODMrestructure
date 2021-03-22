/**
 * 自动化处理文件：自动引入接口的核心文件
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const merge = require("webpack-merge");
const files = require.context(".", true, /\.ts$/);
// console.log(files);
let configInterface;
/**
 * merge interface
 */

files.keys().forEach(key => {
  if (key === "./index.ts") return;
  const filesConfig = files(key);
  configInterface = merge(
    {},
    configInterface,
    filesConfig.default || filesConfig
  ); // 读取出文件中的default模块
});
export { configInterface };
