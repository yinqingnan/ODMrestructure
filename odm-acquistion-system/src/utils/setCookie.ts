/*
 * @Descripttion:  设置cookie
 * @Autor: yqn
 * @Date: 2021-03-31 10:16:50
 * @LastEditTime: 2021-04-12 17:20:46
 * @FilePath: \src\utils\setCookie.ts
 * @LastEditors: yqn
 */
// todo 保存cookie
   function setCookie(cName: string, cPwd: string, exdays: number) {
    const exdate = new Date(); //获取时间
    exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
    //字符串拼接cookie
    window.document.cookie =
      "userName" + "=" + cName + ";path=/;expires=" + exdate.toUTCString();
    window.document.cookie =
      "userPwd" + "=" + cPwd + ";path=/;expires=" + exdate.toUTCString();
  }

  export { setCookie };