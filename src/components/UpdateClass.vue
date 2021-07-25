<template>
   <el-dialog title="修改分类信息" @opened="getDate" :before-close="close" :visible.sync="upstatus" width="30%">
      <el-form
      ref="upMemberObj"
        :model="upformdata"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
        prop="classifyName"
          label="名称"
          :rules="[
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="upformdata.classifyName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="updatemember('upMemberObj')"
            >修改</el-button
          >
          <el-button @click="close">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
export default {
    name:"UpdateClass",
    props:['upstatus','upMemberObj'],
    data(){
        return{
        upformdata:{
        classifyName:"",
      }
        }
    },
    methods:{
      getDate(){
        this.upformdata=this.$props.upMemberObj
      },
            updatemember(formName){
         let that=this
        this.$refs[formName].validate((valid) => {
            if (valid) {
              that.$axios({
              url:"/classifyUpdate",
              method:"post",
              data: {
                "id": that.$props.upMemberObj.id,
                "classifyName": that.upMemberObj.classifyName,
              },
              }).then(
                function(res){
                  console.log(res)
                  if(res.data.code==200){
                  that.$message({
                type:"success",
                message:"修改成功",
                onClose:function(){
                 that.$parent.upstatus=false
                    that.$parent.getList(1)
                }  
                  })
              }else{
                that.$message({
                type:"error",
                message:res.data.info,
                 onClose:function(){
                that.$parent.upstatus=false
                    that.$parent.getList(1)
                }  
                  })
              }
                },
                function(err){console.log(err)})
            }
            else{
              return false
            }
        })
    },
    close(){
        this.$parent.upstatus=false
    }
    }
}
</script>

<style soped>

</style>