module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: "css"
      }
    ],
    // [
    //   "component",
    //   {
    //     libraryName: "element-ui",
    //     styleLibraryName: "theme-chalk"
    //   }
    // ]
  ]
};
