import {instance} from '../utils/request'
//主要控制member模块api
//获取列表
function getList(page,pageSize){
    instance.get('/productList',{
        params:{
            page:page,
            pageSize:pageSize
        }
    })
}
//删除
//修改
//添加
export{
    getList
}