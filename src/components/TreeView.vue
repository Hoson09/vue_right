<template>
  <div class="treeview">
    <el-tree
      class="filter-tree"
      :data="data"
      icon-class="el-icon-caret-right"
      :props="defaultProps"
      default-expand-all
      :indent="10"
      ref="tree"
      @node-click="handleNodeClick"
    >
    </el-tree>
  </div>
</template>
<script>
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
              label: "用户管理"
            },
            {
              id: 3,
              label: "角色管理",
              path: "/MainView/role"
            },
            {
              id: 3,
              label: "权限管理",
              path: "/MainView/about"
            },
            {
              id: 4,
              label: "路由权限"
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
    handleNodeClick(obj) {
      console.log(obj); //打印出来看哪个值对你有用
      this.$router.push({ path: obj.path });
    }
  }
};
</script>
<style scoped lang="scss">
.treeview {
  padding: 30px 0 0 10px;
}
</style>
