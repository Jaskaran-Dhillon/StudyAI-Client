import axios from "axios";

axios.interceptors.request.use((config) => {
  const authToken = JSON.parse(localStorage.getItem("user"))?.token
  if (authToken){
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
});

export default axios;
