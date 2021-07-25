<template>
<div>
  <div class="top">
      <el-button type="primary" @click="addOrderStates=true">添加</el-button>
      <el-button type="primary" @click="showprint">打印</el-button>
      <el-input class="intt"  placeholder="请输入检索内容">
          <template slot="append">
              <el-button type="primary">搜索</el-button>
          </template>
      </el-input>
  </div>
  <div class="orderlist">
   <el-table stripe
    :data="listtableData"
    style="width: 100%" >
        <!-- <el-table-column type="expand"  >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="*ID*" >
            <span>{{props.row.subOrders[0].id}}</span>
          </el-form-item>
          <el-form-item label="商品名称" >
            <span>{{props.row.subOrders[0].pName}}</span>
          </el-form-item>
           <el-form-item label="所属店铺">
            <span>{{props.row.subOrders[0].pUnitName}}</span>
          </el-form-item> 
          <el-form-item label="商品 ID">
            <span>{{props.row.subOrders[0].cid}}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{props.row.subOrders[0].sid}}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{props.row.subOrders[0].cid}}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{props.row.subOrders}}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{props.row.subOrders}}</span>
          </el-form-item> 
        </el-form>
      </template>
    </el-table-column> -->
    <el-table-column type="expand"  >
      <template slot-scope="scope">
         <el-table :data="scope.row.subOrders" style="width: calc(100% - 47px)" class="two-list">
          <el-table-column label="*ID*" prop="id" >
            <!-- <span>{{props.row.subOrders}}</span> -->
          </el-table-column>
          <el-table-column label="商品名称" prop="pName">
            <!-- <span>{{items.pName}}</span> -->
          </el-table-column>
           <el-table-column label="所属店铺" prop="pUnitName">
            <!-- <span>{{ items.pUnitName }}</span> -->
          </el-table-column> 
          <el-table-column label="商品 ID" prop="pNum">
            <!-- <span>{{ items.pNum }}</span> -->
          </el-table-column>
          <el-table-column label="店铺 ID" prop="pUnitPrice">
            <!-- <span>{{ items.pUnitPrice }}</span> -->
          </el-table-column>
          <el-table-column label="商品分类" prop="parentid">
            <!-- <span>{{ items.parentid }}</span> -->
          </el-table-column>
          <el-table-column label="店铺地址" prop="cid">
            <!-- <span>{{ items.cid }}</span> -->
          </el-table-column>
          <el-table-column label="商品描述" prop="sid">
            <!-- <span>{{ items.sid }}</span> -->
          </el-table-column>
         </el-table>
      </template>
    </el-table-column>
    <el-table-column
      label="订单 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="客户名"
      prop="customer">
    </el-table-column>
    <el-table-column
      label="支付方式"
      prop="payType">
    </el-table-column>
    <el-table-column
      label="商户"
      prop="business">
    </el-table-column>
    <el-table-column
      label="备注"
      prop="remarks">
    </el-table-column>
       <el-table-column
      label="创建时间"
      prop="createTime">
    </el-table-column>
           <!-- <el-table-column
      label="子数据"
      prop="subOrders">
    </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" 
          @click="editorMember(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
            @confirm="delupdate(scope.row.id)"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
  </el-table>
  <el-dialog
  title="修改订单"
  :visible.sync="upstatus"
  @opened="getDate"
  width="70%"
  >
  <el-form 
  ref="upMemberObj"
    :model="OrdersData"
    label-width="70px">
  <div class="fromtop">
      <el-form-item label="客户姓名" prop="customer">
    <el-input v-model="OrdersData.customer" placeholder="请输入客户姓名"></el-input>
  </el-form-item>
   <el-form-item label="付款方式"  :value="OrdersData.paytype" :placeholder="OrdersData.paytype">
    <el-select  v-model="OrdersData.paytype" prop="paytype"  :placeholder="OrdersData.paytype">
      <el-option label="微信" value="微信"></el-option>
      <el-option label="支付宝" value="支付宝"></el-option>
      <el-option label="现金" value="现金"></el-option>
      <el-option label="欠款" value="欠款"></el-option>
      <el-option label="银行卡" value="银行卡"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="备注" prop="remarks">
    <el-input v-model="OrdersData.remarks"></el-input>
  </el-form-item>
  <el-form-item label="商家" prop="business">
    <el-input v-model="OrdersData.business" disabled value="派大星">派大星</el-input>
  </el-form-item>
  </div>
  <div class="formbot" style="border:1px solid #333">
      <div class="frombotL" v-for="(item,index) in OrdersData.subOrders" :key="index">
          <el-form-item label="产品名称" prop="pName">
            <el-input v-model="item.pName"  placeholder="请输入产品名称"></el-input>
          </el-form-item>
           <el-form-item label="产品单位" prop="pUnitName">
            <el-input v-model="item.pUnitName" placeholder="请输入单位"></el-input>
          </el-form-item>
           <el-form-item label="单价" prop="pUnitPrice">
            <el-input  v-model="item.pUnitPrice"  placeholder="请输入单价"></el-input>
          </el-form-item>
           <el-form-item label="数量" prop="pNum">
            <el-input  v-model="item.pNum" placeholder="请输入数量"></el-input>
          </el-form-item>
           <el-form-item label="总价" prop="pTotalPrice">
            <el-input  v-model="item.pTotalPrice" disabled :placeholder="totalPrice"></el-input>
          </el-form-item>
      </div>
      <!-- <div class="formbotR">
          <el-table :data="OrdersData.subOrders" style="width: 100%" @row-click="del">
      <el-table-column  v-model="OrdersData.subOrders.pName" label="产品名称"></el-table-column>
      <el-table-column  v-model="OrdersData.subOrders.pUnitName" label="单位"></el-table-column>
      <el-table-column  v-model="OrdersData.subOrders.pNum" label="数量"></el-table-column>
       <el-table-column  v-model="OrdersData.subOrders.pUnitPrice" label="单价"></el-table-column>
        <el-table-column  v-model="OrdersData.subOrders.pTotalPrice" label="总价"></el-table-column>
         <el-table-column  label="操作">
             <el-button type="primary" style="width:40px;height:30px;text-align:center;font-size:10px;line-height:30px">删除</el-button>
         </el-table-column>
    </el-table>
      </div> -->
  </div>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="upstatus = false">取 消</el-button>
    <el-button type="primary" @click="updatemember('upMemberObj')">修改</el-button>
  </span>
</el-dialog>
   <el-pagination
  background
  layout="prev, pager, next"
  :total="orderListTotal" @current-change="pagination">
</el-pagination>
  </div>


  <el-dialog
  title="添加订单"
  :visible.sync="addOrderStates"
   :before-close="close"
  width="70%"
  >
  <el-form v-model="OrdersData"  label-width="70px">
  <div class="fromtop">
      <el-form-item label="客户姓名">
    <el-input v-model="OrdersData.customer" placeholder="请输入客户姓名"></el-input>
  </el-form-item>
   <el-form-item label="付款方式">
    <el-select  v-model="OrdersData.paytype" placeholder="请选择支付方式">
      <el-option label="微信" value="微信"></el-option>
      <el-option label="支付宝" value="支付宝"></el-option>
      <el-option label="现金" value="现金"></el-option>
      <el-option label="欠款" value="欠款"></el-option>
      <el-option label="银行卡" value="银行卡"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="备注">
    <el-input v-model="OrdersData.remarks"></el-input>
  </el-form-item>
  <el-form-item label="商家">
    <el-input v-model="OrdersData.business" disabled value="派大星">派大星</el-input>
  </el-form-item>
  </div>
  <div class="formbot">
      <div class="frombotL">
          <el-form-item label="产品名称">
            <el-input v-model="OrdersObj.pName"  placeholder="请输入产品名称"></el-input>
          </el-form-item>
           <el-form-item label="产品单位">
            <el-input v-model="OrdersObj.pUnitName" placeholder="请输入单位"></el-input>
          </el-form-item>
           <el-form-item label="单价">
            <el-input  v-model="OrdersObj.pUnitPrice"  placeholder="请输入单价"></el-input>
          </el-form-item>
           <el-form-item label="数量">
            <el-input  v-model="OrdersObj.pNum" placeholder="请输入数量"></el-input>
          </el-form-item>
           <el-form-item label="总价">
            <el-input  v-model="OrdersObj.pTotalPrice" disabled :placeholder="totalPrice"></el-input>
          </el-form-item>
          <el-button type="primary" @click="addsubLit">添加</el-button>
      </div>
      <div class="formbotR">
          <el-table :data="OrdersData.subList" style="width: 100%" @row-click="del">
      <el-table-column prop="pName" label="产品名称"></el-table-column>
      <el-table-column prop="pUnitName" label="单位"></el-table-column>
      <el-table-column prop="pNum" label="数量"></el-table-column>
       <el-table-column prop="pUnitPrice" label="单价"></el-table-column>
        <el-table-column prop="pTotalPrice" label="总价"></el-table-column>
         <el-table-column  label="操作">
            <!-- <el-button type="primary" style="width:40px;height:30px;text-align:center;font-size:10px;line-height:30px">删除</el-button> -->
         </el-table-column>
    </el-table>
      </div>
  </div>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addOrderStates = false">取 消</el-button>
    <el-button type="primary" @click="sendData">提交</el-button>
  </span>
</el-dialog>

<el-dialog title="预览" :visible.sync="printStates" width="70%" fullscreen>
    <iframe src="table.html" frameborder="0"></iframe>
      <span slot="footer" class="dialog-footer">
    <el-button @click="printStates = false">取消</el-button>
    <el-button type="primary" @click="print">确定打印</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
export default {
    name:'order',
    data () {
        return {
            loading: true,
            orderListTotal:0,
            printStates:false,
            addOrderStates:false,
            upMemberObj: {},
            upstatus:false,
            OrdersData:{
                "customer":"", 
                "remarks":"", 
                "business":"派大星",
                "paytype":"",
                "subList":[]
            },
            OrdersObj:{
                "pName":"",
                "pUnitName":"",
                "pNum":0,
                "pUnitPrice":0,
                "pTotalPrice":0,
                "cid":12,
                "sid":46,
            },
             tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
          ,
          listtableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          subOrders:{}
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          subOrders:[]
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          subOrders:[]
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333',
          subOrders:[]
        }]
        }
    },
    computed:{//不支持异步操作 watch是异步
        totalPrice(){
            //计算总价
            this.OrdersObj.pTotalPrice=(this.OrdersObj.pNum*this.OrdersObj.pUnitPrice).toFixed(2)
            return (this.OrdersObj.pNum*this.OrdersObj.pUnitPrice).toFixed(2)
        }
    },
    created(){
      this.getList(1)
    },
    methods:{
                  updatemember(formName){
         let that=this
        this.$refs[formName].validate((valid) => {
            if (valid) {
              that.upMemberObj.subOrders.forEach((item) => {
                that.upMemberObj.SubList=item
                  console.log('item',that.upMemberObj.SubList)
              });
              // that.upMemberObj.SubList={...that.upMemberObj.subOrders}
              // console.log(that.upMemberObj.SubList)

              // console.log('SubList',that.upMemberObj.SubList)
            //  var result= that.upMemberObj.subOrders.reduce((item1,item2)=>that.upMemberObj.SubList.assign(item1,item2));
              // console.log('SubList',result)
              that.$axios(
                {
              url:"/orderUpdate",
               method:"PATCH",
              data: {
                "id": parseInt(that.upMemberObj.id),
                "customer":that.upMemberObj.customer, 
                "paytype":that.upMemberObj.paytype, 
                "remarks":that.upMemberObj.remarks, 
                "business":that.upMemberObj.business,
                "suborders":[
                    {
                        "id":parseInt( that.upMemberObj.SubList.id),
                        "pName":  that.upMemberObj.SubList.pName,
                        "pUnitName":  that.upMemberObj.SubList.pUnitName,
                        "pNum":parseFloat(  that.upMemberObj.SubList.pNum),
                        "pUnitPrice":parseFloat(  that.upMemberObj.SubList.pUnitPrice),
                        "pTotalPrice":parseFloat(  that.upMemberObj.SubList.pTotalPrice),
                        "cid":parseInt(  that.upMemberObj.SubList.cid),
                        "sid":parseInt(  that.upMemberObj.SubList.sid),
    
                    }
                ],   
              },
              }).then(
                function(res){
                  console.log(res)
                  if(res.data.code==200){
                  that.$message({
                type:"success",
                message:"修改成功",
                onClose:function(){
                 that.upstatus=false
                    that.getList(1)
                }  
                  })
              }else{
                that.$message({
                type:"error",
                message:res.data.info,
                 onClose:function(){
                that.upstatus=false
                    that.getList(1)
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
        this.upstatus=false
        this.addOrderStates=false
    },
        getDate(){
        this.OrdersData=this.upMemberObj
        console.log('OrdersData',this.OrdersData)
      },
    pagination(pages){
      // console.log(pages)
      this.getList(pages)
      setTimeout(() => {
      this.loading = !this.loading;
    }, 1000);
    },
      getList(pages){
       let that = this;
       that.loading=true
       this.$axios({
              url:"/orderList",
              method:"post",
              data: {
                "page": pages,
                "pageSize":10
              },
              })
      .then(
        function (res) {
            console.log(res)
          //     res.data.data.list.map((item)=>{
          //       for(let i=0;i< res.data.data.list.length;i++){
          //   that.listtableData.subOrders=item[i].subOrders
          //       }
          // })
          // console.log( that.listtableData.subOrders)
          that.listtableData = res.data.data.list;
          console.log(that.listtableData)
          that.orderListTotal=res.data.data.count
           that.loading=false
        },
        function (error) {
          console.log(error);
           that.loading=false
        }
      );
    },
    editorMember(obj){
      this.upMemberObj = obj;
        console.log('upMemberObj',this.upMemberObj)
      this.upstatus = true
    },
       close(){
        this.upstatus=false
    },
        addsubLit(){
            //添加子数据
            this.OrdersData.subList.push({
                "pName":this.OrdersObj.pName,
                "pUnitName":this.OrdersObj.pUnitName,
                "pNum":this.OrdersObj.pNum,
                "pUnitPrice":this.OrdersObj.pUnitPrice,
                "pTotalPrice":this.OrdersObj.pTotalPrice,
                "cid":12,
                "sid":46,
            })
        },
        sendData(){
            //提交数据
            console.log(this.OrdersData)
            //表单验证
            //处理数据
            this.OrdersData.subList.map((item)=>{
                item.pNum=parseInt(item.pNum)
                item.pUnitPrice=parseInt(item.pUnitPrice)
                item.pTotalPrice=parseInt(item.pTotalPrice)
                item.cid=parseInt(item.cid)
                item.sid=parseInt(item.sid)
            })
            let that=this
            this.$axios.post("orderAdd",this.OrdersData).then(
                function(res){
                    console.log(res)
                    if(res.data.code==200){
                        that.$message({
                        type:"success",
                        message:"添加成功",
                        duration:1000,
                        onClose:function(){
                        that.addOrderStates=false
                }
          })
                    }else{
                       that.$message({
                        type:"error",
                        message:res.data.info,
                        duration:1000,
                        onClose:function(){
                        that.addOrderStates=false
                }
          })
                    }
                },
                function(err){
                     console.log(err)
                }
            )
        },
        del(row){
            let that=this
            this.OrdersData.subList.map((item,index)=>{
                if(item.pName==row.pName){
                    that.OrdersData.subList.splice(index,1)
                }
            })
        },
        showprint(){this.printStates=true},
        print(){
        window.print()
        },
        delupdate(id) {
      console.log(id);
      let that=this
      that.$axios.delete("/orderDel",{
            params:{
              id:id
            }
      }).then(function(res){
        if(res.data.code==200){
          that.$message({
                type:"success",
                message:"删除成功",
                duration:1000,
                onClose:function(){
                  that.getList(1)
                }
          })
        }
      })
    },
    }
}
</script>

<style sxoped>
.top{
    width: 100%;
    height: 70px;
    display: flex;
}
.intt{
    width: 200px;
}
.top button{
    height: 40px;
}
.top input{
    width: 200px;
    margin: 0 20px;
}
.fromtop{
    display: flex;
    flex-wrap: wrap;
}
.formbot{
    display: flex;
    justify-content: space-between;
}
.fromtop input{
    width: 250px;
    margin: 0 20px;
}
.formbotL{
    width: 40%;
    border: 1px solid red;
}
.formbotR{
    width: 56%;
    border: 1px solid red;
}
/* list样式 */
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>