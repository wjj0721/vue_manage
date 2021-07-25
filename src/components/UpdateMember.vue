<template>
   <el-dialog title="修改管理员信息" @opened="getDate" :before-close="close" :visible.sync="upstatus" width="30%">
      <el-form
      ref="upMemberObj"
        :model="upformdata"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
        prop="memberName"
          label="名称"
          :rules="[
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="upformdata.memberName"></el-input>
        </el-form-item>
        <el-form-item
          prop="memberPass"
          label="密码"
          :rules="[
            {
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="upformdata.memberPass" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="权限" :rules="[
            {
              required: true,
              message: '请选择权限',
              trigger: 'blur',
            },
          ]">
          <el-select v-model="upformdata.role" placeholder="请选择权限">
            <el-option label="管理员" value="1">管理员</el-option>
            <el-option label="超级管理员" value="0">超级管理员</el-option>
          </el-select>
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
    name:"UpdateMember",
    props:['upstatus','upMemberObj'],
    data(){
        return{
        upformdata:{
        memberName:"",
        memberPass:"",
        role:""
      }
        }
    },
    methods:{
      getDate(){
        // console.log(this.$props.upMemberObj)
        this.upformdata=this.$props.upMemberObj
      },
            updatemember(formName){
         let that=this
        this.$refs[formName].validate((valid) => {
            if (valid) {
              that.$axios({
              url:"/adminUpdate",
              method:"post",
              // headers: {
              // token: JSON.parse(sessionStorage.getItem("memeber")).token,
              // },
              data: {
                "id": that.$props.upMemberObj.id,
                "memberName": that.upMemberObj.memberName,
                "memberPass": that.upMemberObj.memberPass,
                "role": parseInt(that.upMemberObj.role),
              },
              }).then(
                function(res){
                  console.log(res)
                  if(res.data.code==200){
                  that.$message({
                type:"success",
                message:"修改成功",
                onClose:function(){
                //   that.addstatus=false
                 that.$parent.upstatus=false
                    that.$parent.getList(pages)
                }  
                  })
              }else{
                that.$message({
                type:"error",
                message:res.data.info,
                 onClose:function(){
                that.$parent.upstatus=false
                    that.$parent.getList(pages)
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
        // done()
        this.$parent.upstatus=false
    }
    }
}
</script>

<style soped>

</style>