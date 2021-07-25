<template>
   <el-dialog title="添加产品信息" :before-close="close" :visible.sync="addstatus" width="30%">
      <el-form
      ref="adddateForm"
        :model="addformdata"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item prop="ProductName" label="产品名称" :rules="[{required: true,message: '请输入分类名称',trigger: 'blur',},]">
          <el-input v-model="addformdata.ProductName"></el-input>
        </el-form-item>
         <el-form-item prop="Unit" label="单位" :rules="[{required: true,message: '请输入分类名称',trigger: 'blur',},]">
          <el-input v-model="addformdata.Unit"></el-input>
        </el-form-item>
         <el-form-item prop="UnitPrice" label="单价" :rules="[{required: true,message: '请输入单价',trigger: 'blur',},]">
            <el-input  v-model="addformdata.UnitPrice"  placeholder="请输入单价"></el-input>
          </el-form-item>
           <el-form-item prop="Nums" label="数量" :rules="[{required: true,message: '请输入数量',trigger: 'blur',},]">
            <el-input  v-model="addformdata.Nums" placeholder="请输入数量"></el-input>
          </el-form-item>
           <el-form-item prop="TotalPrice" label="总价">
            <el-input  v-model="addformdata.TotalPrice" disabled :placeholder="countsum"></el-input>
          </el-form-item>
         <el-form-item prop="Cid" label="分类" :rules="[{required: true,message: '请选择分类',trigger: 'blur',},]">
          <el-input v-model="addformdata.Cid"></el-input>
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
    name:"addProduct",
    props:['addstatus'],
    data(){
        return{
        addformdata:{
        "Nums": 0,
        "ProductName": "",
        "TotalPrice": 0,
        "Unit": "",
        "UnitPrice": 0,
        "Cid":12
      },
        }
    },
    computed:{
      countsum(){
        // return 0
          // setTimeout(function(){
            this.addformdata.TotalPrice=(this.addformdata.Nums*this.addformdata.UnitPrice).toFixed(2)
                   return (this.addformdata.Nums*this.addformdata.UnitPrice).toFixed(2) || 0
          // },1000)
      }
    },
    methods:{
            add(formName){
         let that=this
        this.$refs[formName].validate((valid) => {
            if (valid) {
              that.$axios.post("/productAdd",{
                
                "info":{
		                    "ProductName": that.addformdata.ProductName,
		                    "Unit": that.addformdata.Unit,
		                    "UnitPrice":parseInt(that.addformdata.UnitPrice),
		                    "Nums":parseInt(that.addformdata.Nums),
		                    "TotalPrice":parseInt(that.countsum),
		                    "Cid":parseInt(that.addformdata.Cid)
                }
              
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
                    that.$parent.getList(1)
                }  
                  })
              }else{
                that.$message({
                type:"error",
                message:res.data.info,
                 onClose:function(){
                that.$parent.addstatus=false
                    that.$refs["adddateForm"].resetFields();
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
        // done()
        this.$parent.addstatus=false
    }
    }
}
</script>

<style soped>

</style>