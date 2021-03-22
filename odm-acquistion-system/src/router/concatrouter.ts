/*
 * @Author: your name
 * @Date: 2020-11-26 10:25:19
 * @LastEditTime: 2021-03-16 18:12:49
 * @LastEditors: yqn
 * @Description: In User Settings Edit
 * @FilePath: \src\router\concatrouter.ts
 */
 function createrouter(routerMap, parent?) {
  let routerarr = [];
  routerMap.map(item => {
    if (item.children == null) {
      routerarr.push(item);
    } else {
      routerarr.push(...item.children);
    }
  });
  // console.log(routerarr);
  return routerarr.map(item => {
    const currentRouter = {
      path: `/index/${item.path}`, // 路由地址 动态拼接生成如 /dashboard/workplace
      name: item.name || item.key || "", // 路由名称
      component: (resolve) => require(["@/views/" + item.component], resolve), // 该路由对应页面的组件
      title: item.name, //标题
      meta: {
        permission: item.permissions,
        key: item.id,
      }, //源信息
      key: item.id, //key值
      hidden: item.hidden, // 是否隐藏 true隐藏
      // redirect:item.redirect
    };
    currentRouter.path = currentRouter.path.replace("//", "/");0
    // item.redirect && (currentRouter.redirect = item.redirect); // 路由重定向
    // console.log(currentRouter);
    return currentRouter;
  });
}
function concatrouter() {
  let obj = JSON.parse(localStorage.getItem("navlist"));
  let arr = createrouter(obj);
  const routers = [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/home",
      name: "Homes",
      redirect: "/index/home",
      meta: { requiresAuth: true },
      component: () =>
        import("@/views/Home.vue"),
      children: [
        {
          path: "/index",
          name: "Index",
          component: () =>
            import("@/views/BodyContent.vue"),
          children:arr
        }
      ]
    },
  ];
  // console.log(routers);
  return routers;
}



export {concatrouter ,createrouter}