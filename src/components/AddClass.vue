<template>
   <el-dialog title="添加分类信息" :before-close="close" :visible.sync="addstatus" width="30%">
      <el-form
      ref="adddateForm"
        :model="addformdata"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
        prop="classifyName"
          label="分类名称"
          :rules="[
            {
              required: true,
              message: '请输入分类名称',
              trigger: 'blur',
            },
          ]"
        >
          <el-input v-model="addformdata.classifyName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :plain="true" type="primary" @click="add('adddateForm')"
            >添加</el-button
          >
          <el-button @click="addstatus=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script>
export default {
    name:"addClass",
    props:['addstatus'],
    data(){
        return{
        addformdata:{
        classifyName:"",
      }
        }
    },
    methods:{
            add(formName){
         let that=this
        this.$refs[formName].validate((valid) => {
            if (valid) {
              that.$axios({
              url:"/classifyAdd",
              method:"post",
              data: {
                "classifyName": that.addformdata.classifyName,
              },
              }).then(
                function(res){
                  console.log(res)
                  if(res.data.code==200){
                  that.$message({
                type:"success",
                message:"添加成功",
                onClose:function(){
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