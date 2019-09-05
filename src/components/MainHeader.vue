<template>
  <div class="mianheader">
    <el-button type="danger">设置权限</el-button>
    <el-button type="primary">添加角色</el-button>
    <el-button type="warning">删除角色</el-button>
    <el-button type="success">编辑角色</el-button>
    <div class="search">
      <Input
        search
        enter-button
        :maxlength="100"
        placeholder="请输入要搜索的内容"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "mainheader",
  data() {
    return {};
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
  .search {
    flex: 0 0 500px;
    height: 40px;
    margin-left: 30px;
  }
}
</style>
