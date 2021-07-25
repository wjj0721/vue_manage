<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin: 20px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: url }"></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "Bread",
  data() {
    return {
      url: "",
    };
  },
  created() {
    console.log(this.$route.path);
    this.url = this.$route.path;
  },
};
</script>

<style scoped>
</style>