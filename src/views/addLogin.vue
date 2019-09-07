<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 10:06:36
 * @LastEditTime: 2019-09-07 14:06:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="addLogin">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
          name="username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          name="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">登录</el-button>
        <el-button @click="resetForm(ruleForm)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from "../api/http";
import { message } from "element-ui";

export default {
  name: "addLogin",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.ruleForm.validate(valid => {
        console.log(formName);
        console.log(formName.username);
        console.log(formName.password);
        if (valid) {
          // axios
          //   .post("http://localhost:8888/api/userlogin", {
          //     username: formName.username,
          //     password: formName.password
          api
            .login({
              username: formName.username,
              password: formName.password
            })
            .then(res => {
              console.log(res.data.code);
              if (res.data.code === 1) {
                this.$router.push("/main");
              } else {
                message.info("登录失败");
              }
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="stylus" scoped></style>
