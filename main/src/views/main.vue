<template>
  <el-container style="border: 1px solid #eee; min-height: 100vh; height: 100%;">

    <el-aside >
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router='true'
        background-color="#1f282c"
        text-color="#aabfc7"
        active-text-color="#fff">
      <img src='/static/img/logo.png' height='60px' width='300px'
        @click="$router.push('home')"
        style="background-color: #2f749f">
      </img>
      <el-menu-item index="/services">
        <i class="el-icon-menu"></i>
        <span slot="title">module1</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-refresh"></i>
          <span>module2</span>
        </template>
        <el-menu-item index="/iterplan">submodule1</el-menu-item>
        <el-menu-item index="/apptask">submodule2</el-menu-item>
      </el-submenu>
    </el-menu>
    </el-aside>

    <el-container >
      <el-header>
      <el-row>
        <el-col :span='24' style="text-align: right; font-size: 16px;">
          <span>欢迎您，{{ myname }}</span>

          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link" style='color: #fff;'>
              <i class="el-icon-setting"></i>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item command="showDialog">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-col>
      </el-row>


      </el-header>

      <router-view></router-view>

    </el-container>
    <el-dialog :title="`修改密码`" :visible.sync="changePasswdDialog">
      <el-form :model="passwdForm" ref="passwdForm" label-width="120px">
        <el-form-item label="输入旧密码" prop="password" :rules="[{ required: true, message: '请输入新密码!'}]">
          <el-input v-model="passwdForm.password" style="width: 80%" show-password></el-input>
        </el-form-item>

        <el-form-item label="输入新密码" prop="new_password" :rules="[{ required: true, message: '请输入新密码!'}]">
          <el-input v-model="passwdForm.new_password" style="width: 80%" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="changePasswdConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import {ajax_post, ajax_get} from "../tools/tools.js"
export default {
    data() {
        return {
            changePasswdDialog: false,
            passwdForm: {},
            myname: 'Anonymous',
        }
    },
    mounted(){
        this.whoami();
    },
    methods: {
        handleCommand(command) {
            if (command == "showDialog") {
                this.showDialog();
            } else if (command == "logout") {
                this.logout();
            }
        },
        showDialog() {
            this.changePasswdDialog = true;
        },
        cancelDialog() {
            this.changePasswdDialog = false;
            this.passwdForm = {};
        },
        changePasswdConfirm() {
            ajax_post('/login/api/v1', {'action':'changepassword', ...this.passwdForm}).then( res => {
                this.changePasswdDialog = false;
                this.$message({message:"修改密码成功", type:"success"});
                this.passwdForm = {};
            });
        },

        logout(){
            ajax_get('/login/out').then(res => {
                this.$message({message: "登出成功", type:"success"});
                window.location.href = '/login/';
            });
        },

        whoami() {
            ajax_post('/login/api/v1', {'action':'whoami'}).then(res=>{this.myname=res.data.data.username});
        }
    }
}
</script>

<style>
.el-header {
  background-color: #3482b3;
  color: #fff;
  line-height: 60px;
}
.el-menu--collapse {
  width: 64px;
}

.el-menu-vertical-demo {
    height: 100%;
}
</style>
