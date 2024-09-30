import { $accessToken, logout } from "@/store/acess-token";
import axios from "axios";
const API_PROD_URL = "https://api.jobbi.fr";
const API_DEV_URL = "http://localhost:3001";

//TODO: Variable env NEXT_PUBLIC_nomdevari

export const API_URL =
  process.env.NODE_ENV === "development" ? API_DEV_URL : API_PROD_URL;

const axiosClient = () => {
  const instance = axios.create({
    baseURL: API_URL,
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
