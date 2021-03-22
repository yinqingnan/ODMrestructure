/*
 * @Descripttion: 
 * @Autor: yqn
 * @Date: 2020-12-29 16:25:03
 * @LastEditTime: 2020-12-29 16:54:11
 * @FilePath: \shims-echart.d.ts
 */
import Vue from 'vue';
   declare module 'vue/types/vue' {
       interface Vue {
         $echarts: any
       }
   }

