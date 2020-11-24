/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:45
 * @LastEditTime: 2020-11-24 17:49:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit,
 * @FilePath: \ODMrestructure\vue.config.js
 */
// const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");
const basename = path.basename;
const join = path.join;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const camel2Dash = require("camel-2-dash");

// const options = {
//   antDir: path.join(__dirname, "./node_modules/ant-design-vue"), //antd包位置
//   stylesDir: path.join(__dirname, "./src/styles/theme"), //主题文件所在文件夹
//   varFile: path.join(__dirname, "./src/styles/theme/variables.less"), // 自定义默认的主题色
//   mainLessFile: path.join(__dirname, "./src/styles/theme/index.less"), // 项目中其他自定义的样式（如果不需要动态修改其他样式，该文件可以为空）
//   outputFilePath: path.join(__dirname, "./public/color.less"), //提取的less文件输出到什么地方
//   themeVariables: ["@primary-color"], //要改变的主题变量
//   indexFileName: "./public/index.html", // index.html所在位置
//   generateOnce: false // 是否只生成一次（if you don't want to generate color.less on each chnage in code to make build process fast in development mode, assign it true value. But if you have new changes in your styles, you need to re-run your build process npm start.）
// };

module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // "primary-color": "#1DA57A",
          // "link-color": "#1DA57A",
          // "border-radius-base": "2px"
          // "@ylello": "#FFB6C1"
        },
        javascriptEnabled: true
      }
    }
  },
  publicPath: "/",
  outputDir: "dist"
};
