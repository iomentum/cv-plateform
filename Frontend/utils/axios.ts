import { $accessToken, logout } from "@/store/acess-token";
import axios from "axios";
const API_PROD_URL = "https://jobbi.fr/";
const API_DEV_URL = "http://localhost:3000/";
const baseURL = "http://localhost:3001/";

const axiosClient = () => {
  const instance = axios.create({
    baseURL: baseURL,
  });

  instance.interceptors.request.use((config) => {
    const token = $accessToken.get();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosClient;
