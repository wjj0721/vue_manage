<template>
  <el-container>
    <el-container class="container2">
      <el-aside width="200px">
        <Navigation :status="fold"></Navigation>
      </el-aside>
      <el-main>
          <el-header>
          <el-button class="el-icon-s-fold" @click="openClosed"></el-button>
        </el-header>
        <Bread></Bread>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navigation from "@/components/Navigation";
import Bread from "@/components/Bread";
export default {
  name: "home",
  components: { Navigation, Bread },
  data() {
    return {
      fold: false,
    };
  },
  methods: {
    openClosed() {
      this.fold = !this.fold;
    },
  },
};
</script>

<style scoped>
.container2 {
  display: flex;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-container .el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>