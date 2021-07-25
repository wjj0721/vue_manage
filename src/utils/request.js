//封装axios拦截器
import axios from 'axios'
import Vue from 'vue'
// import router from 'router'
import { Promise } from 'core-js'
let vue= new Vue()
axios.defaults.baseURL="/api/v1"
axios.defaults.timeout=2000
let instance=axios.create()

//请求拦截器 在请求接口之前
instance.interceptors.request.use(function(config){
    //拦截之前的业务逻辑
    //token
    let member=JSON.parse(sessionStorage.getItem("memeber"))
    if(member){
        config.headers["token"]=member.token
    }
    return config
},function(err){
    return Promise.reject(err)
})
instance.interceptors.response.use(function(res){
    return res
    // if(res.data.data.code==200){
    //     res=res.data
    // }
},function(err){
    console.log(err.response)
    switch(err.response.status){
        case 401:
            vue.$alert('请设置token', '错误提示', {
                confirmButtonText: '确定',
              });
            break;
        case 403:
            vue.$alert('token失效', '错误提示', {
                confirmButtonText: '确定',
                callback: action => {
                    sessionStorage.removeItem("memeber")
                    location.href="/login"
              }
              })
            break;
        case 404:
            vue.$alert('页面未找到', '错误提示', {
                confirmButtonText: '确定',
                callback: action => {
                    sessionStorage.removeItem("memeber")
                    location.href="/home"
              }
              })
            break;
        case 500:
                vue.$alert('服务器出错了', '错误提示', {
                    confirmButtonText: '确定',
                  })
                break;
    }
})

export{
    instance
}