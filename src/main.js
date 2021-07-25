import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {instance} from './utils/request.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$axios=instance//把axios引入全局

Vue.config.productionTip = false
Vue.use(ElementUI);

//全局路由拦截器
router.beforeEach((to, from, next) => {
  if(to.name=='login'&& to.path=='/'){
    if(sessionStorage.getItem('memeber')){
      next('/home')
    }else{
      next()
    }
  }else{
    if(sessionStorage.getItem('memeber')){
      next()
    }else{
      next('/')
    }
  }
}
)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
