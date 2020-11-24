/*
 * @Author: your name
 * @Date: 2020-11-17 11:08:44
 * @LastEditTime: 2020-11-24 11:19:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off', // allow console during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development
    // 以下为该项目自定义部分
    'indent': [1, 2], //缩进风格 - 开启缩进6格
    'no-spaced-func': 1, //函数调用时 函数名与()之间不能有空格 - 开启
    'no-const-assign': 0, //禁止修改const声明的变量 - 开启
    'space-before-function-paren': [0, 'always'], //函数定义时括号前面要有空格 - 
    "quotes": [0, "single"],//引号类型 `` "" ''关闭
    "quote-props": [0, "always"],//对象字面量中的属性名是否强制双引号
    "prefer-const": 0,//首选const
    "consistent-this": [0, "that"],//this别名
    'eol-last': 0, //文件以单一的换行符结束 - 关闭
    'camelcase': 0, //强制驼峰法命名 - 关闭
    'no-undef': 0, //不能有未定义的变量 - 关闭
    'no-alert': 0, //禁止使用alert confirm prompt - 关闭
    'arrow-parens': 0, //箭头函数用小括号括起来 - 关闭
    "no-invalid-this": 0,//禁止无效的this，只能用在构造器，类，对象字面量
    "no-mixed-requires": [0, false],//声明时不能混用声明类型
    "comma-dangle": [0, "never"],//对象字面量项尾不能有逗号
    "comma-spacing": 0,//逗号前后的空格
    "comma-style": [2, "last"],//逗号风格，换行时在行首还是行尾
    "no-var": 0,//禁用var，用let和const代替
    "init-declarations": 0,//声明时必须赋初值
    "max-params": [0, 5],//函数最多只能有5个参数
    "no-multiple-empty-lines": [1, { "max": 50 }],//空行最多不能超过50行
    "no-unused-vars": [0, { "vars": "all", "args": "after-used" }],//不能有声明后未被使用的变量或参数
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-closing-bracket-newline': [
      2,
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/max-attributes-per-line': 0,
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],

    // 设置 typescript-eslint 规则
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/docs/rules
    '@typescript-eslint/camelcase': 0, // 目前埋点有部分字段无法更换
    '@typescript-eslint/no-non-null-assertion': 0, // 允许非空断言运算符
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
  }
}