/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 14:45:17
 * @LastEditTime: 2019-09-20 19:54:56
 * @LastEditors: Please set LastEditors
 */
import axios from "axios";
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

export default {
  login(data) {
    return axios.post("http://localhost:8888/api/userlogin", data);
  },
  asyncOKK(row, data) {
    axios.put(`http://localhost:8888/per/role/${row.id}`, data);
  },
  getUser(page = 1, limit = 10) {
    return axios.get(
      `http://localhost:8888/per/role?_page=${page}&_limit=${limit}`
    );
  },
  // 角色管理里面得设置角色权限
  getAllRolePower(q = "") {
    return axios.get(
      `http://localhost:8888/per/permission/${q ? "?q=" + q : ""}`
    );
  },
  GetUserIRolePower(param) {
    return axios.get(
      `http://localhost:8888/per/role_permission/?userId=${param.userId}`
    );
  },
  deleteRolePowerUser(data) {
    //删除
    return axios.delete(
      "http://localhost:8888/per/role_permission/" + data.removeId
    );
  },
  // 添加
  addRolePowerUser(data) {
    return axios.post("http://localhost:8888/per/role_permission", data);
  },
  getUser1(page = 1, limit = 10) {
    return axios.get(
      `http://localhost:8888/per/user?_page=${page}&_limit=${limit}`
    );
  },
  // 用户列表里面得设置用户角色
  //#region 用户角色  获取所有的角色
  getRole(q = "") {
    return axios.get(`/per/role/${q ? "?q=" + q : ""}`);
  },
  GetUserIdentity(param) {
    return axios.get(`/per/user_role/?userId=${param.userId}`);
  },
  deleteUserIdentity(data) {
    //删除
    return axios.delete("/per/user_role/" + data.removeId);
  },
  // 添加
  addUserIdentity(data) {
    return axios.post("/per/user_role", data);
  },
  // ||||||||||

  // 用户列表里得添加设置权限
  // 获取所有的权限
  getAllPower(q = "") {
    return axios.get(`/per/permission/${q ? "?q=" + q : ""}`);
  },
  GetUserIPower(param) {
    return axios.get(`/per/user_permission/?userId=${param.userId}`);
  },
  deletePowerUser(data) {
    //删除
    return axios.delete("/per/user_permission/" + data.removeId);
  },
  // 添加
  addPowerUser(data) {
    return axios.post("/per/user_permission", data);
  },

  // 角色管理里面得设置角色权限
  getAllRolePower(q = "") {
    return axios.get(`/per/permission/${q ? "?q=" + q : ""}`);
  },
  GetUserIRolePower(param) {
    return axios.get(`/per/user_permission/?userId=${param.userId}`);
  },
  deleteRolePowerUser(data) {
    //删除
    return axios.delete("/per/user_permission/" + data.removeId);
  },
  // 添加
  addRolePowerUser(data) {
    return axios.post("/per/user_permission", data);
  },
  addPowerLast(id) {
    return axios.get(`/per/getUserPer/${id}`);
  }
};
