<template>
   <el-dialog title="添加管理员信息" :before-close="close" :visible.sync="addstatus" width="30%">
      <el-form
      ref="adddateForm"
        :model="addformdata"
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
          <el-input v-model="addformdata.memberName"></el-input>
        </el-form-item>
        <el-form-item
          prop="memberPass"
          label="密码"
          :rules="[
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="addformdata.memberPass" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="role" label="权限" :rules="[
            {
              required: true,
              message: '请选择权限',
              trigger: 'blur',
            },
          ]">
          <el-select v-model="addformdata.role" placeholder="请选择权限">
            <el-option label="管理员" value="1">管理员</el-option>
            <el-option label="超级管理员" value="0">超级管理员</el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="add('adddateForm')"
            >添加</el-button
          >
          <el-button @click="addstatus=false">取消</el-button>
        </el-form-item>
        <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >修改</el-button
        >
      </span> -->
      </el-form>
    </el-dialog>
</template>

<script>
export default {
    name:"addMember",
    props:['addstatus'],
    data(){
        return{
        addformdata:{
        memberName:"",
        memberPass:"",
        role:""
      }
        }
    },
    methods:{
            add(formName){
         let that=this
        this.$refs[formName].validate((valid) => {
            if (valid) {
              that.$axios({
              url:"/adminAdd",
              method:"post",
              // headers: {
              // token: JSON.parse(sessionStorage.getItem("memeber")).token,
              // },
              data: {
                // "id": that.addformdata.id,
                "memberName": that.addformdata.memberName,
                "memberPass": that.addformdata.memberPass,
                "role": parseInt(that.addformdata.role),
              },
              }).then(
                function(res){
                  console.log(res)
                  if(res.data.code==200){
                  that.$message({
                type:"success",
                message:"添加成功",
                onClose:function(){
                //   that.addstatus=false
                 that.$parent.addstatus=false
                    that.$refs["adddateForm"].resetFields();
                    that.$parent.getList(pages)
                }  
                  })
              }else{
                that.$message({
                type:"error",
                message:res.data.info,
                 onClose:function(){
                that.$parent.addstatus=false
                    that.$refs["adddateForm"].resetFields();
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
        this.$parent.addstatus=false
    }
    }
}
</script>

<style soped>

</style>