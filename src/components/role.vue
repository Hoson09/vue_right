<template>
  <div class="tables">
    <div class="tables-button">
      <Button @click="handleSelectAll(true)" class="ab">全选</Button>
      <Button @click="handleSelectAll(false)" class="ab" type="primary"
        >取消全选</Button
      >
      <Button class="ab" @click="modal1 = true" type="info">添加</Button>
      <Button class="ab" @click="delUser(data1[i].id)" type="success"
        >删除</Button
      >
      <Button class="ab" type="warning">修改</Button>
      <Input
        class="ac"
        v-model="serchVal"
        placeholder="点击角色查询"
        style="width: 300px"
      />
      <Button class="ab" @click="serch" type="error">查询</Button>
    </div>
    <!-- 模态框 -->
    <Modal v-model="modal1" title="添加用户" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formLeft" label-position="left" :label-width="100">
        <FormItem label="name">
          <Input v-model="formLeft.name" />
        </FormItem>
        <FormItem label="学校">
          <Input v-model="formLeft.school" />
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formLeft.mail" />
        </FormItem>
      </Form>
    </Modal>
    <div>
      <!-- 表格  -->
      <Table border :columns="columns12" :data="data1">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button
            type="primary"
            size="small"
            style="margin-right: 5px"
            @click="edit(row, index)"
            >修改</Button
          >
          <Button type="error" size="small" @click="remove(row, index)"
            >删除</Button
          >
        </template>
      </Table>
    </div>

    <Page
      @on-change="Pagechange"
      @on-page-size-change="nowPagesize"
      :page-size="pageNum"
      :total="totalNum"
      :current="current"
      show-elevator
      show-total
    />
    <!-- <Page @on-change="Pagechange" :total="totalNum" /> -->
    <Modal
      v-model="modal6"
      title="Title"
      :loading="loading"
      @on-ok="asyncOK(formRight)"
    >
      <Form :model="formRight" label-position="left" :label-width="100">
        <FormItem label="name">
          <Input v-model="formRight.name" />
        </FormItem>
        <FormItem label="学校">
          <Input v-model="formRight.school" />
        </FormItem>
        <FormItem label="邮箱">
          <Input v-model="formRight.mail" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
// import { constants } from "crypto";
import api from "../api/http";

export default {
  data() {
    return {
      formLeft: {
        name: "",
        school: "",
        mail: ""
      },
      formRight: {
        name: "",
        school: "",
        mail: ""
      },
      modal6: false,
      loading: true,
      modal1: false,
      // 搜索框
      serchVal: "",
      // 分页器
      totalNum: Number(""),
      pageNum: 10,
      current: 1,

      columns12: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "Name",
          slot: "name"
        },
        {
          title: "邮箱",
          key: "mail"
        },
        {
          title: "学校",
          key: "school"
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
      this.modal6 = true;
      this.formRight = { ...row };
    },
    // 确认修改
    asyncOK(row) {
      axios
        .put(`http://localhost:8888/per/user/${row.id}`, this.formRight)
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
      this.modal6 = false;
    },
    // 删除
    remove(row, index) {
      axios
        .delete("http://localhost:8888/per/user/" + row.id)
          .then(res => {//eslint-disable-line
          this.data1.splice(index, 1);
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message.success("删除失败！", "删除提醒");
        });
    },
    // 添加
    ok() {
      axios
        .post("http://localhost:8888/per/user", this.formLeft)
        .then(res => {
          this.data1.push(res.data);
        })
        .catch(() => {});
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    cancel() {
      console.log(1);
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
    }
  },
  created() {
    this.getUser();
    axios
      .get("http://localhost:8888/per/user")
      .then(res => {
        this.data1 = res.data;
      })
      .catch(() => {
        this.$message.success("数据请求错误");
      });
  }
};
</script>

<style lang="scss">
.tables {
  height: 80px;
  .tables-button {
    height: 80px;
    .ab {
      width: 100px;
      height: 35px;
      margin-top: -130px;
      font-size: 16px;
      margin-right: 20px;
    }
    .ac {
      margin-top: -130px;
    }
  }
  .ivu-table {
    line-height: 20px;
  }
}
</style>
