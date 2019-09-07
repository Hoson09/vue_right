<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 15:41:33
 * @LastEditTime: 2019-09-07 13:33:16
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <div class="button-all">
      <Button @click="modal1 = true" type="info">添加用户</Button>
      <Button type="success">删除用户</Button>
      <Button type="warning">编辑用户</Button>
      <Button @click="serch" type="error">查询</Button>
      <Input
        class="search-user"
        search
        v-model="serchVal"
        placeholder="点击用户查询"
        style="width: 300px"
      />
    </div>
    <!-- 添加框 -->
    <Modal v-model="modal1" title="添加用户" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formLeft" label-position="left" :label-width="100">
        <FormItem label="用户名">
          <Input v-model="formLeft.username" />
        </FormItem>
        <FormItem label="密码">
          <Input v-model="formLeft.password" />
        </FormItem>
        <FormItem label="头像">
          <Input v-model="formLeft.avatar" />
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="formLeft.name" />
        </FormItem>

        <FormItem label="邮箱">
          <Input v-model="formLeft.mail" />
        </FormItem>
        <FormItem label="电话">
          <Input v-model="formLeft.phone" />
        </FormItem>
        <FormItem label="是否老师">
          <Radio v-model="formEdit.isTeacher"
            >选中为可删除(不选中为不删除)</Radio
          >
        </FormItem>
        <FormItem label="是否删除">
          <Radio v-model="formEdit.del">选中为可删除(不选中为不删除)</Radio>
        </FormItem>
      </Form>
    </Modal>
    <!-- 修改框 -->
    <Modal
      v-model="modal2"
      title="修改用户"
      @on-ok="saveEdit(formEdit)"
      @on-cancel="cancel"
    >
      <Form :model="formEdit" label-position="left" :label-width="100">
        <FormItem label="用户名">
          <Input v-model="formEdit.username" />
        </FormItem>
        <FormItem label="密码">
          <Input v-model="formEdit.password" />
        </FormItem>
        <FormItem label="头像">
          <Input v-model="formEdit.avatar" />
        </FormItem>
        <FormItem label="姓名">
          <Input v-model="formEdit.name" />
        </FormItem>

        <FormItem label="邮箱">
          <Input v-model="formEdit.mail" />
        </FormItem>
        <FormItem label="电话">
          <Input v-model="formEdit.phone" />
        </FormItem>
        <FormItem label="是否老师">
          <Radio v-model="formEdit.isTeacher"
            >选中为可删除(不选中为不删除)</Radio
          >
        </FormItem>
        <FormItem label="是否删除">
          <Radio v-model="formEdit.del">选中为可删除(不选中为不删除)</Radio>
        </FormItem>
      </Form>
    </Modal>
    <Table class="tab-box" border :columns="columns1" :data="data1">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="edit(row)"
          >编辑</Button
        >
        <Button type="error" size="small" @click="remove(row, index)"
          >删除</Button
        >
      </template>
    </Table>
    <Page
      @on-change="Pagechange"
      @on-page-size-change="nowPagesize"
      :page-size="pageNum"
      :total="totalNum"
      :current="current"
      show-elevator
      show-total
    />
  </div>
</template>

<script>
import "iview/dist/styles/iview.css";
import api from "../api/http";
import axios from "axios";  //eslint-disable-line
export default {
  name: "user",
  data() {
    return {
      serchVal: "",
      modal1: false, //添加框
      modal2: false, //修改框
      formLeft: {
        username: "",
        password: "",
        avatar: "",
        name: "",
        mail: "",
        phone: "",
        isTeacher: "",
        del: ""
      },
      formEdit: {
        username: "",
        password: "",
        avatar: "",
        name: "",
        mail: "",
        phone: "",
        isTeacher: "",
        del: ""
      },
      // 分页器
      totalNum: Number(""),
      pageNum: 10,
      current: 1,
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
    // 查询
    serch() {
      axios
        .get(`http://localhost:8888/per/user?name_like=${this.serchVal}`)
        .then(res => {
          this.data1 = res.data;
        });
    },
    // 点击修改
    edit(row) {
      this.modal2 = true;
      this.formEdit = { ...row };
    },
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
    },
    cancel() {
      console.log(1);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },

    initTable() {
      api
        .getUser(this.page, this.limit, this.serchVal)
        .then(res => { //eslint-disable-line
          this.data1 = res.data;
          this.totalNum = Number(res.headers["x-total-count"]);
        })
        .catch(() => {});
    },
    Pagechange(page) {
      this.page = page;
      this.initTable();
    },
    nowPagesize(size) {
      this.limit = size;
      this.initTable();
    },
    // 分页
    getUser() {
      api.getUser(this.page, this.pageNum).then(res => {
        this.data1 = res.data;
        this.initTable();
      });
    },
    saveEdit(row) {
      axios
        .put(`http://localhost:8888/per/user/${row.id}`, this.formEdit)
        .then(res => {
          // console.log(res.data);
          let editindex = this.data1.findIndex(row => res.data.id === row.id);
          console.log(res.data);
          console.log(row);
          this.$message.success("编辑成功");
          this.data1.splice(editindex, 1, res.data);
        })
        .catch(() => {
          this.$message.success("编辑失败！");
        });
      this.modal2 = false;
    },
    ok() {
      axios
        .post("http://localhost:8888/per/user", this.formLeft)
        .then(res => {
          this.data1.push(res.data);
        })
        .catch(() => {});
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
.button-all {
  display: flex;
  .search-user {
    margin-left: 10px;
  }
}
</style>
