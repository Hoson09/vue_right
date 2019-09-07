<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 13:51:37
 * @LastEditTime: 2019-09-07 14:01:52
 * @LastEditors: Please set LastEditors
 -->
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
          url: "mainlist",
          children: [
            {
              id: 2,
              label: "用户管理",
              url: "user"
            },
            {
              id: 3,
              label: "角色管理",
              url: "Role"
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
      this.treeClick(data.id);
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
