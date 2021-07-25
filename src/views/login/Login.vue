<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/images/login.jpg" alt="" />
      </div>
      <!-- 表单区域 -->
      <!-- 组件需要到plugins 导入注册成为全局组件 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            prefix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLog">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //这是登录表单的数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      //这是登录表单的验证规则
    //   loginFormRules: {
    //     //验证用户名是否合法
    //     username: [
    //       { require: true, message: "请输入用户名", trigger: "blur" },
    //       { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
    //     ],
    //     //验证密码是否合法
    //     password: [
    //       { require: true, message: "请输入密码", trigger: "blur" },
    //       { min: 3, max: 15, message: "长度在3到15个字符", trigger: "blur" },
    //     ],
    //   },
    };
  },
  methods: {
    //点击重置按钮
    resetLog() {
      //   console.log(this)
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      let _this = this;
      if (this.loginForm.username == "") {
        this.$message({
          message: "用户名不能为空",
          type: "error",
          duration: 1000,
        });
      } else if (this.loginForm.password == "") {
        this.$message({
          message: "密码不能为空",
          type: "error",
          duration: 1000,
        });
      } else {
        this.$axios
          .post("/login", {
            memberName: this.loginForm.username,
            memberPass: this.loginForm.password,
          })
          .then(
            function (res) {
              if (res.data.code == 200 && res.data.data.length != 0) {
                _this.$message({
                  message: "登录成功",
                  type: "success",
                  onClose:function(){
                      sessionStorage.setItem("memeber",JSON.stringify(res.data.data))
                      _this.$router.push('/home')
                  }
                });
              } else {
                  _this.$message({
                  message: "账户或密码不正确",
                  type: "error",
                });
              }
            },
            function (error) {
                console.log(error)
            }
          );
      }
    },
  },
};
</script>
<style Lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>