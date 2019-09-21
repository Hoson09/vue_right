/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 14:45:17
 * @LastEditTime: 2019-09-07 15:05:27
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
  }
};
