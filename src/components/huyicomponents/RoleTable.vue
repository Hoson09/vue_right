<template>
  <div class="roletable">
    <Table border ref="selection" :columns="columns4" :data="data1"></Table>
    <Button size="large" @click="handleSelectItem">关联</Button>
    <Button size="large" @click="cancelSelectItem">取消</Button>
  </div>
</template>
<script>
import service from "../../service/index";
export default {
  name: "roletable",
  data() {
    return {
      columns4: [
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
          title: "是否老师",
          key: "isTeacher"
        }
      ],
      data1: []
    };
  },
  methods: {
    handleSelectItem() {},
    cancelSelectItem() {
      this.$emit("closetable", false);
    }
  },
  created() {
    service
      .getUser()
      .then(res => {
        console.log("user:", res.data);
        this.data1 = res.data;
      })
      .catch(() => {
        console.log("网络错误");
      });
  }
};
</script>
<style scoped lang="scss">
.roletable {
  .ivu-btn {
    margin: 40px 40px 0;
    width: 200px;
  }
}
</style>
