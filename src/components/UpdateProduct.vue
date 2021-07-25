<template>
   <el-dialog title="修改分类信息" @opened="getDate" :before-close="close" :visible.sync="upstatus" width="30%">
      <el-form
      ref="upMemberObj"
        :model="upformdata"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item prop="ProductName" label="产品名称">
          <el-input v-model="upformdata.productName"></el-input>
        </el-form-item>
          <el-form-item prop="Unit" label="单位">
          <el-input v-model="upformdata.unit"></el-input>
        </el-form-item>
          <el-form-item prop="UnitPrice" label="单价">
          <el-input v-model="upformdata.unitPrice"></el-input>
        </el-form-item>
        <el-form-item prop="Nums" label="数量">
          <el-input v-model="upformdata.nums"></el-input>
        </el-form-item>
        <el-form-item prop="TotalPrice" label="总价">
          <el-input v-model="upformdata.totalPrice" disabled :placeholder="countsum"></el-input>
        </el-form-item>
          <el-form-item prop="Cid" label="类别">
          <el-input v-model="upformdata.cid"></el-input>
        </el-form-item>
          <el-button :plain="true" type="primary" @click="updatemember('upMemberObj')"
            >修改</el-button
          >
          <el-button @click="close">取消</el-button>
      </el-form>            </el-dialog>
</template>

<script>
export default {
    name:"UpdateProduct",
    props:['upstatus','upMemberObj'],
    data(){
        return{
        upformdata:{
        	productName: "",
	        unit: "",
	        unitPrice: "",
	        nums:"",
	        totalPrice: "",
	        cid:""
      }
        }
    },
    computed:{
      countsum(){
        // return 0
          // setTimeout(function(){
            this.upformdata.totalPrice=(this.upformdata.nums*this.upformdata.unitPrice).toFixed(2)
                   return (this.upformdata.nums*this.upformdata.unitPrice).toFixed(2) || 0
          // },1000)
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
              url:"/productUpdate",
              method:"PATCH",
              data: {
                "id": that.$props.upMemberObj.id,
                "ProductName": that.upMemberObj.productName,
	              "Unit":that.upMemberObj.unit,
	              "UnitPrice": parseInt(that.upMemberObj.unitPrice),
	              "Nums":parseInt(that.upMemberObj.nums),
	              "TotalPrice":parseInt(that.upMemberObj.totalPrice),
	              "Cid":parseInt(that.upMemberObj.cid)         
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