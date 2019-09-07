<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 15:41:33
 * @LastEditTime: 2019-09-06 21:16:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <Button type="info">添加用户</Button>
    <Button type="success">删除用户</Button>
    <Button type="warning">编辑用户</Button>
    <Button type="error">查询</Button>
    <Table class="tab-box" border :columns="columns1" :data="data1">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(index)"
          >编辑</Button
        >
        <Button type="error" size="small" @click="remove(row, index)"
          >删除</Button
        >
      </template>
    </Table>
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
          key: "avatar",
          render: h => {
            return h("img", {
              attrs: {
                src: "http://192.168.1.130:8888/server/img/a1.png"
              },
              style: { width: "50px", "border-radius": "25px" }
            });
          }
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
        },
        {
          title: "Action",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data1: []
    };
  },
  methods: {
    remove(row, index) {
      axios
        .delete("http://localhost:8888/per/user/" + row.id)
        .then(res => {  //eslint-disable-line
          this.data1.splice(index, 1);
          this.$Message.success("删除成功");
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  created() {
    axios
      .get("http://localhost:8888/per/user")
      .then(res => {
        this.data1 = res.data;
        // this.data1.push(...res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>

<style lang="scss">
.tab-box {
  line-height: 30px;
}
</style>
