import axios from "axios";
import appConfig from "../config";
import { AsyncStorage } from "react-native";

const axiosInstance = axios.create({
    baseURL: appConfig.api_url,
    headers: {
        key: appConfig.apiKey,
        "Content-Type": "application/json",
    },
});

// Add token to each request
axiosInstance.interceptors.request.use(
    async config => {
      let token = await AsyncStorage.getItem('token');
      config = {...config, headers: {...config.headers, 'X-CSRF-TOKEN': token}};
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

export const getData = (url = "") => axiosInstance.get(url);
export const postJsonData = (url = "", data) => axiosInstance.post(url, data);

export default axiosInstance;
