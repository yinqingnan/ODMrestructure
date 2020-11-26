/*
 * @Author: your name
 * @Date: 2020-11-25 20:00:10
 * @LastEditTime: 2020-11-26 13:52:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ODMrestructure\src\router\routers.ts
 */

 const obj =    {
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
      children: [
        {
          path: "home",
          name: "home",
          component: () => import('@/views/Index/Home.vue')
        },
        {
          path: "lawcase",
          name: "lawcase",
          component: () => import('@/views/StatisticalAnalysis/Lawcase.vue')
        },
        {
          path: "label",
          name: "label",
          component: () => import('@/views/StatisticalAnalysis/Label.vue')
        },
        {
          path: "assets",
          name: "assets",
          component: () => import('@/views/StatisticalAnalysis/Assets.vue')
        },
        {
          path: "avData",
          name: "avData",
          component: () => import('@/views/DataM/AvData.vue')
        },
        {
          path: "lawarchives",
          name: "lawarchives",
          component: () => import('@/views/DataM/Lawarchives.vue')
        },
        {
          path: "recording",
          name: "recording",
          component: () => import('@/views/DataM/Recording.vue')
        },
        {
          path: "Simpleprogram",
          name: "Simpleprogram",
          component: () => import('@/views/DataM/Simpleprogram.vue')
        },
        {
          path: "Coercivemeasures",
          name: "Coercivemeasures",
          component: () => import('@/views/DataM/Coercivemeasures.vue')
        },
        {
          path: "evalRecord",
          name: "evalRecord",
          component: () => import('@/views/Supervision/EvalRecord.vue')
        },
        {
          path: "evalDaily",
          name: "evalDaily",
          component: () => import('@/views/Supervision/EvalDaily.vue')
        },
        {
          path: "evalRandom",
          name: "evalRandom",
          component: () => import('@/views/Supervision/EvalRandom.vue')
        },
        {
          path: "evalSet",
          name: "evalSet",
          component: () => import('@/views/Supervision/EvalSet.vue')
        },

        {
          path: "matche",
          name: "matche",
          component: () => import('@/views/Device/Matche.vue')
        },
        {
          path: "stations",
          name: "stations",
          component: () => import('@/views/Device/Stations.vue')
        },
        {
          path: "storage",
          name: "storage",
          component: () => import('@/views/Device/Storage.vue')
        },
        {
          path: "matcheRepair",
          name: "matcheRepair",
          component: () => import('@/views/Device/Repairrecord.vue')
        },
        {
          path: "platform",
          name: "platform",
          component: () => import('@/views/Device/Platform.vue')
        },

        {
          path: "oMonitor",
          name: "oMonitor",
          component: () => import('@/views/DevOps/OMonitor.vue')
        },
        {
          path: "accessAuth",
          name: "accessAuth",
          component: () => import('@/views/DevOps/AccessAuth.vue')
        },
        {
          path: "upgrade",
          name: "upgrade",
          component: () => import('@/views/DevOps/Upgrade.vue')
        },
        {
          path: "operationLog",
          name: "operationLog",
          component: () => import('@/views/DevOps/OperationLog.vue')
        },

        {
          path: "dept",
          name: "dept",
          component: () => import('@/views/Organization/Dept.vue')
        },
        {
          path: "Menu",
          name: "Menu",
          component: () => import('@/views/Organization/Menu.vue')
        },
        {
          path: "user",
          name: "user",
          component: () => import('@/views/Organization/User.vue')
        },
        {
          path: "role",
          name: "role",
          component: () => import('@/views/Organization/Role.vue')
        },
        {
          path: "right",
          name: "right",
          component: () => import('@/views/Organization/Right.vue')
        },
        {
          path: "notice",
          name: "notice",
          component: () => import('@/views/systemM/Announcement.vue')
        },
        {
          path: "authInfo",
          name: "authInfo",
          component: () => import('@/views/systemM/Authorization.vue')
        },
        {
          path: "Dictionary",
          name: "Dictionary",
          component: () => import('@/views/systemM/Dictionary.vue')
        },
        {
          path: "HighConfig",
          name: "HighConfig",
          component: () => import('@/views/systemM/HighConfig.vue')
        },
        {
          path: "Setting",
          name: "Setting",
          component: () => import('@/views/systemM/Setting.vue')
        }
      ]
    },
  ]
}

let arr =[
  {
    path: "/index",
    name: "Index",
    component: () =>
      import("@/views/BodyContent.vue"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import('@/views/Index/Home.vue')
      },
      {
        path: "lawcase",
        name: "lawcase",
        component: () => import('@/views/StatisticalAnalysis/Lawcase.vue')
      },
      {
        path: "label",
        name: "label",
        component: () => import('@/views/StatisticalAnalysis/Label.vue')
      },
      {
        path: "assets",
        name: "assets",
        component: () => import('@/views/StatisticalAnalysis/Assets.vue')
      },
      {
        path: "avData",
        name: "avData",
        component: () => import('@/views/DataM/AvData.vue')
      },
      {
        path: "lawarchives",
        name: "lawarchives",
        component: () => import('@/views/DataM/Lawarchives.vue')
      },
      {
        path: "recording",
        name: "recording",
        component: () => import('@/views/DataM/Recording.vue')
      },
      {
        path: "Simpleprogram",
        name: "Simpleprogram",
        component: () => import('@/views/DataM/Simpleprogram.vue')
      },
      {
        path: "Coercivemeasures",
        name: "Coercivemeasures",
        component: () => import('@/views/DataM/Coercivemeasures.vue')
      },
      {
        path: "evalRecord",
        name: "evalRecord",
        component: () => import('@/views/Supervision/EvalRecord.vue')
      },
      {
        path: "evalDaily",
        name: "evalDaily",
        component: () => import('@/views/Supervision/EvalDaily.vue')
      },
      {
        path: "evalRandom",
        name: "evalRandom",
        component: () => import('@/views/Supervision/EvalRandom.vue')
      },
      {
        path: "evalSet",
        name: "evalSet",
        component: () => import('@/views/Supervision/EvalSet.vue')
      },

      {
        path: "matche",
        name: "matche",
        component: () => import('@/views/Device/Matche.vue')
      },
      {
        path: "stations",
        name: "stations",
        component: () => import('@/views/Device/Stations.vue')
      },
      {
        path: "storage",
        name: "storage",
        component: () => import('@/views/Device/Storage.vue')
      },
      {
        path: "matcheRepair",
        name: "matcheRepair",
        component: () => import('@/views/Device/Repairrecord.vue')
      },
      {
        path: "platform",
        name: "platform",
        component: () => import('@/views/Device/Platform.vue')
      },

      {
        path: "oMonitor",
        name: "oMonitor",
        component: () => import('@/views/DevOps/OMonitor.vue')
      },
      {
        path: "accessAuth",
        name: "accessAuth",
        component: () => import('@/views/DevOps/AccessAuth.vue')
      },
      {
        path: "upgrade",
        name: "upgrade",
        component: () => import('@/views/DevOps/Upgrade.vue')
      },
      {
        path: "operationLog",
        name: "operationLog",
        component: () => import('@/views/DevOps/OperationLog.vue')
      },
      {
        path: "dept",
        name: "dept",
        component: () => import('@/views/Organization/Dept.vue')
      },
      {
        path: "Menu",
        name: "Menu",
        component: () => import('@/views/Organization/Menu.vue')
      },
      {
        path: "user",
        name: "user",
        component: () => import('@/views/Organization/User.vue')
      },
      {
        path: "role",
        name: "role",
        component: () => import('@/views/Organization/Role.vue')
      },
      {
        path: "right",
        name: "right",
        component: () => import('@/views/Organization/Right.vue')
      },
      {
        path: "notice",
        name: "notice",
        component: () => import('@/views/systemM/Announcement.vue')
      },
      {
        path: "authInfo",
        name: "authInfo",
        component: () => import('@/views/systemM/Authorization.vue')
      },
      {
        path: "dict",
        name: "dict",
        component: () => import('@/views/systemM/Dictionary.vue')
      },
      {
        path: "HighConfig",
        name: "HighConfig",
        component: () => import('@/views/systemM/HighConfig.vue')
      },
      {
        path: "Setting",
        name: "Setting",
        component: () => import('@/views/systemM/Setting.vue')
      }
    ]
  },
]