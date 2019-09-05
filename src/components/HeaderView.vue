<template>
  <div class="headerview">
    <div class="left">
      <h1>Vue后台权限管理</h1>
    </div>
    <div class="right">
      <el-button type="danger">退出登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerview"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.headerview {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 0 0 220px;
    text-align: center;
    color: #fff;
  }
  .right {
    flex: 0 0 80px;
    text-align: center;
  }
}
</style>
