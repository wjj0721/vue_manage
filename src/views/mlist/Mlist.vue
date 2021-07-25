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
        prop="memberName"
        width="100"
      ></el-table-column>
      <el-table-column label="权限" prop="role" width="180">
        <template v-slot="scope">
          <p>{{ scope.row.role == 0 ? "超级管理员" : "管理员" }}</p>
        </template>
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
<Add-member :addstatus="addstatus"></Add-member>
<Update-member :upstatus="upstatus" :upMemberObj="upMemberObj"></Update-member>
  </div>
</template>

<script>
import AddMember from '@/components/AddMember.vue';
import UpdateMember from '@/components/UpdateMember.vue';
import {getList} from '../../api/member'
export default {
  name: "mlist",
  components:{AddMember,UpdateMember},
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
    // async getList(pages){
    //    let that = this;
    //    that.loading=true
    //    let result=await getList(1,10)
    //    console.log(result)
    //    if(result.data.code==200){
    //       that.tableData = result.data.data.list;
    //       that.memeberListTotal=result.data.data.count
    //       // console.log(that.memeberListTotal);
    //       that.loading=false
    //    }
      getList(pages){
       let that = this;
       that.loading=true
    this.$axios
      .get("/adminList", {
        // headers: {
        //   token: JSON.parse(sessionStorage.getItem("memeber")).token,
        // },
        params: {
          page: pages,
          pageSize: "10",
        },
      })
      .then(
        function (res) {
          that.tableData = res.data.data.list;
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
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       let that=this
    //       that.$axios({
    //         url:"/api/v1/adminUpdate",
    //         method:"post",
    //         headers: {
    //          token: JSON.parse(sessionStorage.getItem("memeber")).token,
    //         },
    //         data: {
    //           "id": that.upMemberObj.id,
    //           "memberName": that.upMemberObj.memberName,
    //           "memberPass": that.upMemberObj.memberPass,
    //           "role": parseInt(that.upMemberObj.role),
    //         },
    //       }).then(function(res){
    //         console.log(res)
    //         if(res.data.code==200){
    //           that.$message({
    //             type:"success",
    //             message:"修改成功",
    //             duration:1000,
    //           })
    //         }else{
    //             that.$message({
    //             type:"error",
    //             message:"修改失败",
    //             duration:1000,
    //           })
    //         }
    //       },
    //       function(err){
    //         console.log(err)
    //       });
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
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
      that.$axios.delete("/adminDel",{
        // headers: {
        //      token: JSON.parse(sessionStorage.getItem("memeber")).token,
        //     },
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
      this.loading = !this.loading;
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