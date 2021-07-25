<template>
  <div>
      <el-button @click="addshowstatus" class="add" type="primary" icon="el-icon-search">添加</el-button>
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="tableData"
      style="width: 100%; margin-left: 20px"
    >
      <el-table-column label="ID" prop="id" width="100"> </el-table-column>
      <el-table-column
        label="名称"
        prop="productName"
        width="100"
      ></el-table-column>
          <el-table-column
        label="数量"
        prop="nums"
        width="100"
      ></el-table-column>
          <el-table-column
        label="总价"
        prop="totalPrice"
        width="100"
      ></el-table-column>
          <el-table-column
        label="单位"
        prop="unit"
        width="100"
      ></el-table-column>
          <el-table-column
        label="单价"
        prop="unitPrice"
        width="100"
      ></el-table-column>
          <el-table-column
        label="类别ID"
        prop="cid"
        width="100"
      ></el-table-column>
          <el-table-column
        label="类别名称"
        prop="Cname"
        width="100"
      ></el-table-column>
          <el-table-column
        label="创建时间"
        prop="dateTime"
        width="100"
      >
      <!-- <template  v-slot="scope">
           <p>{{scope.row.dateTime.toLocaleString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')}}</p>
      </template> -->
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="editorMember(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            confirm-button-text="好的"
            cancel-button-text="不用了"
            icon="el-icon-info"
            icon-color="red"
            title="这是一段内容确定删除吗？"
            @confirm="del(scope.row.id)"
          >
            <el-button size="mini" type="danger" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
  background
  layout="prev, pager, next"
  :total="memeberListTotal" @current-change="pagination">
</el-pagination>
<Add-product :addstatus="addstatus"></Add-product>
<Update-product :upstatus="upstatus" :upMemberObj="upMemberObj"></Update-product>
  </div>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue';
import UpdateProduct from '@/components/UpdateProduct.vue';
import {getList} from '../../api/product'
export default {
  name: "clist",
  components:{AddProduct,UpdateProduct},
  data() {
    return {
      adddateForm:{},
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
        memberName: "",
        role: "",
      },
      upMemberObj: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      loading: true,
      isShow: false,
      upstatus:false,
      addstatus:false,
      memeberListTotal:0,
    };
  },
  created() {
   this.getList(1)
  },
  methods: {
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
    this.$axios
      .get("/productList", {
        params: {
          page: pages,
          pageSize: "10",
        },
      })
      .then(
        function (res) {
          console.log(res)
          that.tableData = res.data.data.productList;
          that.memeberListTotal=res.data.data.count
          console.log(that.memeberListTotal);
          that.loading=false
        },
        function (error) {
          console.log(error);
          that.loading=false
        }
      );
    },
    addshowstatus(){
            this.addstatus = true
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    editorMember(obj) {
      console.log(obj)
            this.upMemberObj = obj;
      this.upstatus = true
    },
    del(id) {
      console.log(id);
      let that=this
      that.$axios.delete("/productDel",{
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
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  },
};
</script>

<style scoped>
.add{
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>