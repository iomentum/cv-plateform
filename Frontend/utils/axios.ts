import { $accessToken } from "@/store/acess-token";
import axios from "axios";

const API_PROD_URL = "https://api.sign-e.fr/";
const API_DEV_URL = "http://localhost:3000/";
const baseURL = "http://localhost:3001/";
// TODO: Mettre jobbi.com

const axiosClient = () =>
  axios.create({
    baseURL,
    headers: {
      Authorization: $accessToken.get(),
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });

export default axiosClient;
