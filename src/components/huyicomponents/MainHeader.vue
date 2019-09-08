<template>
  <div class="mianheader">
    <el-button @click="add" type="primary">添加权限</el-button>
    <el-button @click="del" type="warning">删除权限</el-button>
    <el-button @click="changeRight" type="success">编辑权限</el-button>
    <div class="search">
      <Input
        search
        enter-button
        @on-change="searchFunction2"
        @on-search="searchFunction1"
        @on-enter="searchFunction3"
        :maxlength="100"
        placeholder="请输入要搜索的内容"
      />
    </div>

    <el-dialog :title="rightTitle" :visible.sync="dialogFormVisible">
      <from-content v-on:closedialog="closeDialog"></from-content>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import FromContent from "./FromContent";
import EventBus from "../../eventBus";
import { Message } from "element-ui";
import service from "../../service/index";

export default {
  name: "mainheader",
  data() {
    return {
      dialogFormVisible: false,
      rightTitle: "",
      paramID: ""
    };
  },
  components: {
    "from-content": FromContent
  },
  computed: {
    ...mapState(["buttonId", "selectItem", "tableObj"])
  },
  methods: {
    ...mapMutations(["setDialogType", "getTableObj", "setCurrentPage"]),
    searchFunction3() {
      service
        .findItem(this.paramID)
        .then(res => {
          console.log("sea3", res.data);
          EventBus.$emit("changeTableView", res.data);
          this.getTableObj({ "x-total-count": res.data.length });
        })
        .catch(() => {
          console.log("网络错误");
        });
    },
    searchFunction2(val) {
      if (val.data) {
        this.paramID += val.data;
        // console.log(this.paramID);
      } else {
        let arr = this.paramID.split("");
        arr.splice(arr.length - 1, 1, "");
        this.paramID = arr.join("");
        // console.log(this.paramID, arr);
        !this.paramID &&
          service
            .findItem(this.paramID)
            .then(res => {
              console.log(res.data);
              EventBus.$emit("changeTableView", res.data);
              this.getTableObj({ "x-total-count": res.data.length });
            })
            .catch(() => {
              console.log("网络错误");
            });
      }
    },
    searchFunction1(val) {
      // console.log("val:", val);
      service
        .findItem(val)
        .then(res => {
          console.log(res.data);
          EventBus.$emit("changeTableView", res.data);
          this.getTableObj({ "x-total-count": res.data.length });
        })
        .catch(() => {
          console.log("网络错误");
        });
    },
    changeRight() {
      if (this.selectItem.length == 0 || this.selectItem.length > 1) {
        Message({
          showClose: true,
          message: "请选择要编辑的单一权限",
          type: "warning"
        });
        return;
      }
      this.setDialogType("editOptions");
      this.dialogFormVisible = true;
      // console.log(this.selectItem);
      EventBus.$emit("edit");
      this.rightTitle = "编辑权限";
    },
    add() {
      this.setDialogType("addOptions");
      this.dialogFormVisible = true;
      EventBus.$emit("createID");
      this.rightTitle = "添加权限";
    },
    del() {
      if (this.selectItem.length == 0) {
        Message({
          showClose: true,
          message: "请选择要删除的权限",
          type: "warning"
        });
        return;
      }
      EventBus.$emit("delete");
    },
    closeDialog(e) {
      EventBus.$emit("refresh");
      this.dialogFormVisible = e;
    }
  }
};
</script>
<style scoped lang="scss">
.mianheader {
  flex: 0 0 80px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: rgb(50, 134, 181);
  padding-left: 20px;
  .el-button {
    flex: 0 0 60px;
    height: 40px;
  }
  .t {
    height: 80px;
    width: 100%;
    p {
      height: 100%;
      line-height: 80px;
      font-size: 30px;
      text-align: center;
      color: #fff;
    }
  }
  .search {
    flex: 0 0 300px;
    margin-left: 30px;
  }
  .el-dialog {
    .el-dialog__header {
      line-height: 30px !important;
    }
  }
}
</style>
