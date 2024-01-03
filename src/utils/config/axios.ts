import axios from "axios";
import { ACCESSTOKEN, BASEURL } from "./urlConfigs";

let headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + ACCESSTOKEN,
};

const axiosInstance = axios.create({
  baseURL: BASEURL,
  headers,
});

export default axiosInstance;
