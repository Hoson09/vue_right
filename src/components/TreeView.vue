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
              label: "角色管理"
            },
            {
              id: 3,
              label: "权限管理"
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
  }
};
</script>
<style scoped lang="scss">
.treeview {
  padding: 30px 0 0 10px;
}
</style>
