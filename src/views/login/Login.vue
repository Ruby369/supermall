<template>
  <div id="login">
    <div class="login-box">
      <div class="login-img">
        <img src="~assets/img/profile/avatar.svg" alt />
      </div>
      <el-form ref="loginRef" :rules="loginRules" :model="loginForm" label-width class="loginForm">
        <!-- 用户名 -->
        <el-form-item class="text_input" prop="username">
          <el-input
            placeholder="请输入账号"
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="text_input" prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="loginClick">登录</el-button>
          <el-button type="info" @click="resetClick">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginhttp, ajax } from "network/login";
export default {
  name: "Login",
  data() {
    return {
      loginForm: { username: "admin", password: "123456" },
      // 表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 13, message: "长度在 3 到 13 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetClick() {
      this.$refs.loginRef.resetFields();
    },
    loginClick() {
      this.$refs.loginRef.validate(valid => {
        if (!valid) return this.$message.error("账号或密码格式不对");
        loginhttp(this.loginForm).then(res => {
          // console.log(res);
          // console.log(this.loginForm);
          let status = res.meta.status;
          if (status !== 200)
            return this.$message.error("登录失败，账号或密码错误");
          this.$message.success("登录成功");
          window.sessionStorage.setItem("token", res.data.token);
          this.$store.commit("AddToken", res.data.token);
          this.$router.replace("/profile");
        });
      });
    }
  }
};
</script>
<style>
#login {
  height: 100vh;
  background: linear-gradient(
    240deg,
    #feb781,
    #ff8199 30%,
    #fe8c8c 70%,
    #feb781
  );
}
.login-box {
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.login-img img {
  width: 100px;
  height: 100px;
}
.loginForm {
  margin: 20px;
}
.el-button--primary {
  background-color: #ff8198;
  border-color: #ff8198;
}
.el-button--primary:hover {
  background-color: #f88da1;
  border-color: #f88da1;
}
.el-button + .el-button {
  margin-left: 25%;
}
.submit {
  margin-top: 30px;
}
.el-message {
  min-width: 300px;
}
</style>