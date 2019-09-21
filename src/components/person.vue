<template>
  <div class="setrole">
    <Modal
      v-model="modal4"
      title="Modal Title"
      ok-text="OK"
      cancel-text="Cancel"
    >
      <template>
        <div class="Username">
          当前选择用户 :
          <input readonly v-model="username" />
        </div>
        <label v-for="item in userList" :key="item.id" @change="change(item)">
          <input type="checkbox" v-model="item.isChecked" />
          {{ item.des }}
        </label>
      </template>
    </Modal>
  </div>
</template>

<script>
import eventbus from "../eventBus";
import api from "../api/http";

export default {
  name: "setrole",
  props: ["SetRowData"],
  data() {
    return {
      modal4: false,
      userList: [], //拿到请求后台的全部角色
      // roleData: [], //存放当前用户已选中的角色
      username: "",
      userId: "" //当前点击用户的id
    };
  },
  created() {
    eventbus.$on("SetPer", () => {
      console.log(this.SetRowData);
      if (this.SetRowData.length <= 0) {
        return;
      } else {
        this.modal4 = true;
        this.username = this.SetRowData[0].des;
        this.userId = this.SetRowData[0].id;
        // console.log(this.userId); //点击当前点击用户的ID
        this.initUserRole();
      }
    });
  },
  methods: {
    initUserRole() {
      api.getAllRolePower().then(res => {
        let t = res.data;
        api.GetUserIRolePower({ userId: this.userId }).then(res => {
          t.forEach(item => {
            let isChecked = false;

            res.data.forEach(powerId => {
              // console.log(roleId);
              if (powerId.powerId === item.id) {
                isChecked = true;
                item.removeId = parseInt(powerId.id);
              }
            });
            item.isChecked = isChecked;
          });
          this.userList = t;
          console.log(t);
        });
      });
    },
    change(item) {
      // console.log(item);
      if (item.isChecked === true) {
        let data = {
          id: Date.now() + Math.ceil(Math.random() * 100),
          userId: this.userId,
          powerId: item.id,
          del: 0,
          subon: "2019-05-08 16:57:50"
        };
        api.addRolePowerUser(data);
      } else {
        // console.log(item);
        api.deleteRolePowerUser(item);
      }
    }
  }
};
</script>

<style></style>
