// const AntDesignThemePlugin = require("antd-theme-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tsImportPluginFactory = require("ts-import-plugin");
const basename = path.basename;
const join = path.join;
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const merge = require("webpack-merge");
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
  // configureWebpack: {
  //   resolve: {
  //     extensions: [".ts", ".tsx", ".js", ".json"]
  //   },
  //   module: {
  //     rules: [{
  //       test: /\.tsx?$/,
  //       loader: "ts-loader",
  //       exclude: /node_modules/,
  //       options: {
  //         appendTsSuffixTo: [/\.vue$/]
  //       }
  //     }]
  //   }
  // }
  // chainWebpack: config => {
  //   config.module
  //     .rule("ts")
  //     .use("ts-loader")
  //     .tap(options => {
  //       options = merge(options, {
  //         transpileOnly: true,
  //         getCustomTransformers: () => ({
  //           before: [
  //             tsImportPluginFactory({
  //               libraryName: "element-ui",
  //               libraryDirectory: "lib",
  //               camel2DashComponentName: true,
  //               style: path =>
  //                 join(
  //                   "element-ui",
  //                   "lib",
  //                   "theme-chalk",
  //                   `${camel2Dash(basename(path, ".js"))}.css`
  //                 )
  //             })
  //           ]
  //         }),
  //         compilerOptions: {
  //           module: "es2015"
  //         }
  //       });
  //       return options;
  //     });
  // }
};
