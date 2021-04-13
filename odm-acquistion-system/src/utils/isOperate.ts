/*
 * @Descripttion:
 * @Autor: yqn
 * @Date: 2020-12-21 16:23:35
 * @LastEditTime: 2021-04-12 17:20:09
 * @FilePath: \src\utils\isOperate.ts
 */
// todo 用户长时间未操作 退出登录
import router from "@/router";
import { Modal } from "ant-design-vue"; // 弹吐司
import axios from "axios";
import { http } from "@/api/interceptors";
let timer = null;
let lastTime = new Date().getTime(); // 最后一次点击时间
let currentTime = new Date().getTime(); // 当前时间
let timeOut = 900000;  // 允许最长未操作时间
// let timeOut = 6000; // 允许最长未操作时间
let i = 1; // 辅助作用
clearInterval(timer);
function handleInterval() {
  // 定时器
  timer = setInterval(() => {
    currentTime = new Date().getTime(); // 当前时间
    if (currentTime - lastTime > timeOut) {
      // alert('长时间未操作')
      clearInterval(timer); // 清除定时器
      Modal.confirm({
        title: "提示",
        content: "超时自动退出",
        okText: "确认",
        class: "quanxian",
        onOk() {
          Modal.destroyAll();
          axios
            .post(
              `${http}logout`,
              {},
              {
                headers: {
                  Token: localStorage.getItem("token"),
                },
              }
            )
            .then((res) => {
              return res;
            });

          localStorage.clear();
          router.push({ name: "Login" });
        },
      });
    }
  }, 1000);
}
export function claerTime() {
  i = 1;
  lastTime = new Date().getTime();

  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  if (!timer) {
    handleInterval();
  }
}
export function isOperateFun() {
  function handleReset() {
    // 重新赋值最后一次点击时间，清除定时器，重新开始定时器
    // console.log('又点击了！！！！！！')
    i = 1;
    lastTime = new Date().getTime();

    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    if (!timer) {
      handleInterval();
    }
  }
  document.onclick = () => {
    // 单击事件
    handleReset();
  };
  document.ondblclick = () => {
    // 双击事件
    handleReset();
  };
  document.onmousedown = () => {
    // 按下鼠标键时触发
    handleReset();
  };
  document.onmouseup = () => {
    // 释放按下的鼠标键时触发
    handleReset();
  };
  document.onmousemove = () => {
    // 鼠标移动事件
    handleReset();
  };
  document.onmouseover = () => {
    // 移入事件
    handleReset();
  };
  document.onmouseout = () => {
    // 移出事件
    handleReset();
  };
  document.onmouseenter = () => {
    // 移入事件
    handleReset();
  };
  document.onmouseleave = () => {
    // 移出事件
    handleReset();
  };
  handleInterval(); // 一开始程序 默认执行定制器
}
