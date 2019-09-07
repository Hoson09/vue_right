<template>
  <div class="loginview-box">
    <div class="loginview">
      <h1>欢迎登陆Vue后台权限管理系统</h1>
      <div class="from-box">
        <el-form
          :label-position="labelPosition"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :model="formLabelAlign"
        >
          <el-form-item label="用户名:" prop="username">
            <el-input
              type="text"
              v-model="formLabelAlign.username"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              type="password"
              v-model="formLabelAlign.password"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
    </div>
  </div>
</template>
<script>
import service from "../service/index";
import { Message } from "element-ui";
export default {
  name: "loginview",
  data() {
    return {
      labelPosition: "left",
      formLabelAlign: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名长度在 3 到 12 个字符",
            trigger: "blur"
          },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码长度在 3 到 15 个字符",
            trigger: "blur"
          },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          service
            .login(this.formLabelAlign)
            .then(res => {
              console.log(res.data);
              if (res.data.code === 0) {
                Message({
                  showClose: true,
                  message: "请输入正确的用户名或密码",
                  type: "error"
                });
              } else if (res.data.code == 1) {
                sessionStorage.setItem("login_token", res.data.token);
                this.$router.push("main");
              }
            })
            .catch(() => {
              Message({
                showClose: true,
                message: "本地网络错误",
                type: "warning"
              });
            });
        } else {
          Message({
            showClose: true,
            message: "请输入正确的用户名或密码",
            type: "error"
          });
          return;
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.loginview-box {
  height: 100%;
  padding-top: 100px;
  background: linear-gradient(60deg, red 300px, blue 700px, white 1100px);
}
.loginview {
  width: 500px;
  margin: 0 auto;
  text-align: center;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 30px;
  border: 1px solid #ccc;
  background-color: #fff;
  h1 {
    margin-bottom: 50px;
  }
  .from-box {
    margin-bottom: 50px;
  }
  .el-button {
    width: 100%;
  }
}
</style>

<style lang="scss">
//没有scoped则说明是设置全局的样式
html,
body,
#app {
  height: 100%;
  width: 100%;
}
</style>
