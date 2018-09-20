import axios from "axios";
import router from "../router";
import { Notification } from "element-ui";
const baseUrl = "/api/admin";
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
});

const fetch = {
  get(url, data, config) {
    return new Promise((resolve, reject) => {
      instance
        .get(url, { params: data }, config)
        .then(res => {
          if (res.data.code == 401) {
            Notification.error(res.data.msg);
            router.push("/");
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url, data, config) {
    return new Promise((resolve, reject) => {
      instance
        .post(url, data, config)
        .then(res => {
          if (res.data.code == 401) {
            this.$notify({
              title: "警告",
              message: "登录失效，请重新登录",
              type: "warning"
            });
          }
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  axios(url, data, config, methods) {
    return new Promise((resolve, reject) => {
      instance[methods](url, data, config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  put(url, data, config) {
    return this.axios(url, data, config, "put");
  },
  delete(url, data, config) {
    return this.axios(url, data, config, "delete");
  }
};

export default fetch;
