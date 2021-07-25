<template>
  <div>
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          :collapse="status"
          @select="jump"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/mlist">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>管理员管理</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/classify">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>分类管理</span>
            </template>
          </el-menu-item>

           <el-menu-item index="/product">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>产品管理</span>
            </template>
          </el-menu-item>


            <el-menu-item index="/order">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
          </el-menu-item>

               <el-menu-item index="/datashow">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
    };
  },
  props: ["status"],
  methods:{
    jump(index,indexPath){
      console.log(index,indexPath)
       this.$router.push(index)
    }
  }
};
</script>

<style scoped>
</style>