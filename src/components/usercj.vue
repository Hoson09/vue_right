<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 15:41:33
 * @LastEditTime: 2019-09-05 16:39:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <h1>用户列表管理</h1>
    <Button @click="delUser" type="info">添加用户</Button>
    <Button type="success">删除用户</Button>
    <Button type="warning">编辑用户</Button>
    <Button type="error">查询</Button>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import "iview/dist/styles/iview.css";
import axios from "axios";  //eslint-disable-line
export default {
  name: "user",
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户ID",
          key: "id"
        },
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "密码",
          key: "password"
        },
        {
          title: "头像",
          key: "avatar"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "邮箱",
          key: "mail"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "是否老师",
          key: "isTeacher"
        },
        {
          title: "是否删除",
          key: "del"
        }
      ],
      data1: [
        {
          id: 1000,
          username: "wyd",
          password: "aicoder.com",
          del: false,
          active: true,
          avatar: "http://localhost:8888/server/img/a1.png",
          name: "张三",
          school: "清华大学",
          mail: "y.ajomofyh@hdeju.tj",
          phone: "189222222",
          isTeacher: true
        },

        {
          id: 1001,
          username: "wyd",
          password: "aicoder.com",
          del: false,
          active: true,
          avatar: "http://localhost:8888/server/img/a1.png",
          name: "张三",
          school: "清华大学",
          mail: "y.ajomofyh@hdeju.tj",
          phone: "189222222",
          isTeacher: true
        },
        {
          id: 1002,
          username: "wyd",
          password: "aicoder.com",
          del: false,
          active: true,
          avatar: "http://localhost:8888/server/img/a1.png",
          name: "张三",
          school: "清华大学",
          mail: "y.ajomofyh@hdeju.tj",
          phone: "189222222",
          isTeacher: true
        },
        {
          id: 1003,
          username: "wyd",
          password: "aicoder.com",
          del: false,
          active: true,
          avatar: "http://localhost:8888/server/img/a1.png",
          name: "张三",
          school: "清华大学",
          mail: "y.ajomofyh@hdeju.tj",
          phone: "189222222",
          isTeacher: true
        },
        {
          id: 1004,
          username: "wyd",
          password: "aicoder.com",
          del: false,
          active: true,
          avatar: "http://localhost:8888/server/img/a1.png",
          name: "张三",
          school: "清华大学",
          mail: "y.ajomofyh@hdeju.tj",
          phone: "189222222",
          isTeacher: true
        },
        {
          id: 1005,
          username: "wyd",
          password: "aicoder.com",
          del: false,
          active: true,
          avatar: "http://localhost:8888/server/img/a1.png",
          name: "张三",
          school: "清华大学",
          mail: "y.ajomofyh@hdeju.tj",
          phone: "189222222",
          isTeacher: true
        },
        {
          id: 1006,
          username: "wyd",
          password: "aicoder.com",
          del: false,
          active: true,
          avatar: "http://localhost:8888/server/img/a1.png",
          name: "张三",
          school: "清华大学",
          mail: "y.ajomofyh@hdeju.tj",
          phone: "189222222",
          isTeacher: true
        }
      ]
    };
  },
  methods: {
    delUser(id) {
      console.log(id);
    }
  }
  // created() {
  //   axios
  //     .get("http://localhost:8888/per/user")
  //     .then(res => {
  //       // this.data1 = res.data;
  //       this.data1.push(...res.data);
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // }
};
</script>

<style lang="scss"></style>
