<template>
  <div id="app">
  <el-container>
    <el-dialog class='login-page' :visible="true" :fullscreen="true" :show-close="false">
    <div align="center" style="color: #fff; font-size: 30px; margin: 8% auto 0;">
    <p>xxxx | xx管理系统</p>
    </div>
    <el-card class="box-card" style="width: 400px;" >
      <div>
        <h3 style="text-align: center; color: white;">请登录</h3>
        <el-form :model="loginData" ref="loginData">
          <el-form-item v-show="false">
            <el-input v-model="loginData.action"></el-input>
          </el-form-item>
          <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户ID'}]">
            <el-input v-model="loginData.username" prefix-icon='el-icon-star-on' placeholder="用户ID"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码'}]">
            <el-input type="password" v-model="loginData.password" prefix-icon='el-icon-view'  placeholder="密码" @keyup.enter.native="loginSubmit"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12" align='left'>
              <el-checkbox v-model="loginData.checked" style="color: white">记住我</el-checkbox>
            </el-col>
            <el-col :span="12" align='right'>
              <el-button type="primary" @click="loginSubmit" :loading="isloading">登 录</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    </el-dialog>
  </el-container>
  </div>
</template>
<script>
import axios from 'axios';

// let service = new DataProvider();
export default {
data() {
    return {
      loginData: {
        username: null,
        password: null,
        checked: false,
        action: "login"
      },
      isloading: false,
      nextPage: '/',
      host: window.location.href.split("/login")[0]
    }
  },
methods: {
  resetForm () {
    this.loginData = {
      username: null,
      password: null,
      checked: false,
      action: "login"
    }
  },

  loginSubmit () {
    if (window.location.href.includes("?next=")){
      this.nextPage = window.location.href.split("?next=")[1];
    }

    let post_data = this.loginData;
    this.isloading = true;
    axios.post('/login/api/v1', post_data)
    .then(res => {
      console.log(res);
      if (res.data.result == 'SUCCESS') {
        this.$message({
          message: '登录成功',
          type: 'success'
        });
        window.location.href= this.host + this.nextPage;
      } else {
        this.$message({
          message: `登录失败：${res.data.message}`,
          type: 'error'
        });
        this.isloading = false;
      }
    })
    .catch(error => {
      console.log(error.response.data);
      this.$message({
        message: `登录失败：${error.response.data.message}`,
        type: 'error'
      });
      this.isloading = false;
    });

  },

  }
}
</script>

<style>
.login-page .el-dialog{
  background-color: #006699;
  background-image: url('/static/img/background.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.box-card{
  margin: 60px auto 0;
  background-color: #cacaca12;
}
</style>
