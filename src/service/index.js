/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-07 13:51:37
 * @LastEditTime: 2019-09-07 14:11:26
 * @LastEditors: Please set LastEditors
 */
import axios from "axios";
// 添加请求拦截器
let axiosIns = axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    let loginToken = sessionStorage.getItem("login_token");
    if (loginToken) {
      // console.log("tokensss", loginToken);
      // config.headers.Authorization = `Bearer ${loginToken}`;
      config.headers.Authorization = `${loginToken}`;
    } else {
      axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

export default {
  login(data) {
    return axios.post("/api/userlogin", data);
  },
  loginOut() {
    //退出登录时调用，销毁掉请求拦截器
    axios.interceptors.request.eject(axiosIns);
  },
  addRight(data) {
    return axios.post("/per/permission", data);
  },
  getRight(page = 1, limit = 10) {
    return axios.get("/per/permission", {
      params: {
        _page: page,
        _limit: limit
      }
    });
  },
  delRight(id) {
    return axios.delete("/per/permission/" + id);
  },
  // ,暂时只能先删除一个
  delAllRight(idArray) {
    let axiosArray = [];
    for (let i = 0; i < idArray.length; i++) {
      axiosArray.push(axios.delete("/per/permission/" + idArray[i]));
    }
    return axios.all(axiosArray);
  },
  changeRight(id, data) {
    return axios.put("/per/permission/" + id, data);
  },
  findItem(value) {
    return axios.get("/per/permission", {
      params: {
        q: value
      }
    });
  },
  getUser() {
    return axios.get("/per/user");
  }
};
