<template>
  <div class="treeview">
    <el-tree
      class="filter-tree"
      :data="data"
      icon-class="el-icon-caret-right"
      :props="defaultProps"
      :indent="10"
      ref="tree"
      @node-click="clickHandle"
    >
    </el-tree>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "treeview",
  data() {
    return {
      data: [
        {
          id: 1,
          label: "列表分配",
          children: [
            {
              id: 2,
              label: "用户管理",
              url: ""
            },
            {
              id: 3,
              label: "角色管理",
              url: ""
            },
            {
              id: 4,
              label: "权限管理",
              url: "right"
            },
            {
              id: 5,
              label: "路由权限",
              url: ""
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    ...mapMutations(["treeClick"]),
    clickHandle(data) {
      // this.treeClick(data.url);
      this.$router.push(data.url);
    }
  }
};
</script>
<style scoped lang="scss">
.treeview {
  padding: 30px 0 0 10px;
}
</style>
