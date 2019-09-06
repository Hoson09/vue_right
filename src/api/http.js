import axios from "axios";
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

export default {
  login(data) {
    return axios.post("http://localhost:8888/api/userlogin", data);
  },
  asyncOKK(row, data) {
    axios.put(`http://localhost:8888/per/user/${row.id}`, data);
  },
  getUser(page = 1, limit = 10) {
    return axios.get(
      `http://localhost:8888/per/user?_page=${page}&_limit=${limit}`
    );
  }
};
