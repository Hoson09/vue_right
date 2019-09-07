<template>
  <div class="rightview">
    <el-main>
      <main-header></main-header>
      <table-view></table-view>
    </el-main>
    <el-footer>
      <page-view></page-view>
    </el-footer>
  </div>
</template>
<script>
import TableView from "../components/huyicomponents/TableView";
import PageView from "../components/huyicomponents/PageView";
import MainHeader from "../components/huyicomponents/MainHeader";
export default {
  name: "rightview",
  data() {
    return {};
  },
  components: {
    "table-view": TableView,
    "page-view": PageView,
    "main-header": MainHeader
  }
};
</script>
<style scoped lang="scss">
.rightview {
  width: 100%;
  height: 100%;
}
.el-container {
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  .el-main {
    //可以解决这个table撑得过大的bug
    flex: 1 1 500px;
    width: 100%;
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 30px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  .el-footer {
    flex: 0 0 60px;
    width: 100%;
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
}
</style>
