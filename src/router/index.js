import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'


const originalPush = VueRouter.prototype.push
 
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: ()=>import("@/views/login/Login")
  },
  {
    path: '/home',
    name: 'home',
    component: ()=>import("@/views/home/Home"),
    children:[
      {
        path: '/mlist',
        name: 'mlist',
        component: ()=>import("@/views/mlist/Mlist")
      },
      {
        path: '/classify',
        name: 'clist',
        component: ()=>import("@/views/classify/Classify")
      },
      {
        path: '/product',
        name: 'plist',
        component: ()=>import("@/views/product/Product")
      },
      {
        path: '/order',
        name: 'order',
        component: ()=>import("@/views/order/Order")
      },
      {
        path: '/datashow',
        name: 'datashow',
        component: ()=>import("@/views/data/Data")
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
