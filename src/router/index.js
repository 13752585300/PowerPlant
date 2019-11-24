import Vue from 'vue'
import VueRouter from 'vue-router'
import Duty from "../views/system/duty/Duty";
import Dept from "../views/system/dept/Dept"
import Login from "../views/Login"
import LoginLog from "../views/system/loginlog/LoginLog";

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name:'login',
    component:Login
  },
  {
    path:'/dept',
    name:'dept',
    component:Dept,
  },{
    path:'/duty',
    name:'duty',
    component:Duty
  },{
    path:'/loginlog',
    name:'loginlog',
    component:LoginLog
  }
    //系统管理
  /*{
    path:'/system',
    name:'system',
    component:PageView,
    meta:{title:'系统管理',keepAlive:true,icon:'setting'},
    children:[{
      path:'/system/dept',
      name:'department',
      component:()=>import('@/views/system/dept/Dept'),
      meta:{title:'科室管理',keepAlive:true}
    },
      {
        path:'/system/duty',
        name:'duty',
        component:()=>import('@/views/system/duty/Duty'),
        meta:{title:'职务管理',keepAlive:true}
      },

    ]
  }*/
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
