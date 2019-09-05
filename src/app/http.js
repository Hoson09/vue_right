import axios from "axios";
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

export default {
  login(data) {
    return axios.post("http://localhost:8888/api/userlogin", data);
  }
};
