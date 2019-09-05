<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 15:41:33
 * @LastEditTime: 2019-09-04 20:21:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user">
    <h1>用户列表管理</h1>
    <table class="table is-striped is-bordered is-hovered">
      <thead>
        <tr>
          <th>用户ID</th>
          <th>用户名</th>
          <th>密码</th>
          <th>头像</th>
          <th>姓名</th>
          <th>邮箱</th>
          <th>电话</th>
          <th>是否老师</th>
          <th>是否删除</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";  //eslint-disable-line
export default {
  name: "user",
  data() {
    return {};
  }
};
</script>

<style lang="scss"></style>
