<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-20 20:11:24
 * @LastEditTime: 2019-09-21 10:23:28
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- 设置角色 -->
  <div class="setPer">
    <Modal v-model="modal5" title="设置权限" @on-ok="ok" @on-cancel="cancel">
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
import eventbus from "../api/eventbus";
import api from "../api/http";
export default {
  name: "setPer",
  data() {
    return {
      modal5: false,
      userList: [], //拿到请求后台的全部角色
      username: "",
      userId: "" //当前点击用户的id
    };
  },
  props: ["SetPerData"],
  created() {
    eventbus.$on("setPer", () => {
      if (this.SetPerData.length <= 0) {
        // this.$Message.warning("请选择数据后在设置角色");
        return;
      } else {
        this.modal5 = true;
        this.username = this.SetPerData[0].username;
        this.userId = this.SetPerData[0].id;
        // console.log(this.userId); //点击当前点击用户的ID
        this.initUserRole();
      }
    });
  },
  methods: {
    initUserRole() {
      // 拿到所有的权限
      api.getAllPower().then(res => {
        let t = res.data;
        // console.log(res.data);
        // this.userList = res.data;
        api.GetUserIPower({ userId: this.userId }).then(res => {
          // console.log(res.data);
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
        });
      });
    },
    change(item) {
      // console.log(item);

      if (item.isChecked === true) {
        let data = {
          id: Date.now() + Math.ceil(Math.random() * 100),
          userId: this.userId,
          permissionId: item.id,
          del: 0,
          subon: "2019-05-08 16:57:50"
        };
        api.addPowerUser(data);
      } else {
        // console.log(item);
        api.deletePowerUser(item);
      }
    },
    ok() {
      this.modal5 = false;
    },
    cancel() {
      //   this.$Message.info(" 设置权限失败！");
    }
  }
};

// };
</script>

<style scoped lang="scss">
label {
  display: flex;
  line-height: 11px;
  margin-top: 3px;
}
input {
  margin-bottom: 3px;
}
.Username {
  input {
    border: 0 none;
    width: 50px;
  }
}
</style>
