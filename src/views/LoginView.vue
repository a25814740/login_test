<template>
  <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form ref="form" label-width="80px">
        <el-form-item label="帳號">
          <el-input
            v-model="loginForm.username"
            type="text"
            placeholder="帳號"
            required
          />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密碼"
            required
          />
        </el-form-item>
        <el-button type="primary" native-type="submit" @click="handleLogin"
          >登入</el-button
        >
        <el-button @click="removeCookie">清除</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        token: "",
      },
    };
  },
  methods: {
    handleLogin() {
      const token = "mskfijaiwejaoiwer"; // token本身就是加密過的字串，隨意
      let username = this.loginForm.username;
      let password = this.loginForm.password;
      if (username != "" && password != "") {
        this.loginForm.token = token;
      } else {
        alert("帳號密碼不可為空");
      }

      Cookies.set("login", JSON.stringify(this.loginForm), { expires: 1 });
      console.log(this.loginForm);
      if (Cookies.get("login") && this.loginForm.token) {
        this.$router.push({ name: "home" });
      }
    },
    removeCookie() {
      Cookies.remove("login");
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  .el-card {
    width: 340px;
    max-width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
  }
}
</style>