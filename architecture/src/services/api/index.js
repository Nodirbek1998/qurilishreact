import axios from "axios";

const client = axios.create({
  
  baseURL: "http://62.209.143.163:8080/",
  // baseURL: "http://localhost:8080/",
  
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    if (config.url !== "/uz/cas/login") {
      const token = localStorage.getItem("jwtToken");
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default client;
