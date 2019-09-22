<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 14:59:35
 * @LastEditTime: 2019-09-21 09:59:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="setrole">
    <Modal v-model="modal4" title="设置角色" @on-ok="ok" @on-cancel="cancel">
      <template>
        <div class="Username">
          当前选择用户 :
          <input readonly v-model="username" />
        </div>
        <label v-for="item in userList" :key="item.id" @change="change(item)">
          <input type="checkbox" v-model="item.isChecked" />
          {{ item.name }}
        </label>
      </template>
    </Modal>
  </div>
</template>

<script>
import eventbus from "../api/eventbus";
import api from "../api/http";

export default {
  name: "setrole",
  data() {
    return {
      modal4: false,
      userList: [], //拿到请求后台的全部角色
      username: "",
      userId: "" //当前点击用户的id
    };
  },
  methods: {
    initUserRole() {
      // 拿到所有的角色
      api.getRole().then(res => {
        let t = res.data;
        console.log(res.data);
        // this.userList = res.data;
        api.GetUserIdentity({ userId: this.userId }).then(res => {
          console.log(res.data);
          t.forEach(item => {
            let isChecked = false;

            res.data.forEach(roleId => {
              console.log(roleId);
              if (roleId.roleId === item.id) {
                isChecked = true;
                item.removeId = parseInt(roleId.id);
              }
            });
            item.isChecked = isChecked;
          });
          this.userList = t;
        });
      });
    },
    change(item) {
      console.log(item);

      if (item.isChecked === true) {
        let data = {
          id: Date.now() + Math.ceil(Math.random() * 100),
          userId: this.userId,
          roleId: item.id,
          del: 0,
          subon: "2019-05-08 16:57:50"
        };
        api.addUserIdentity(data);
      } else {
        console.log(item);
        api.deleteUserIdentity(item);
      }
    },
    ok() {
      this.modal4 = false;
    },
    cancel() {
      // this.$Message.info(" 设置角色失败！");
    }
  },
  props: ["SetRowData"],
  created() {
    eventbus.$on("setRole", () => {
      if (this.SetRowData.length <= 0) {
        //   this.$Message.warning("请选择数据后在设置角色");
        return;
      } else {
        this.modal4 = true;
        this.username = this.SetRowData[0].username;
        this.userId = this.SetRowData[0].id;
        console.log(this.userId); //点击当前点击用户的ID
        this.initUserRole();
      }
    });
  }
};
</script>

<style lang="scss"></style>
