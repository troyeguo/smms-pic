import axios from "axios";
const store = require("./electron-store");

const request = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 10000,
  retry: 4,
  retryDelay: 1000,
});

//请求拦截
request.interceptors.request.use(
  function(config) {
    const token = store.get("token");
    config.headers = {
      "Content-Type": "text/plain;charset=utf-8",
      Authorization: token || undefined,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      crossDomain: true,
    };
    return config;
  },
  function(error) {
    console.error("请求数据失败");
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(function(response) {
  if (response.code !== "success") {
    console.error(response.message);
  }
  return response;
});

export default request;
