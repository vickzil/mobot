import { AxiosResponse } from "axios";
import axiosInstance from "../config/axios";
import { ACCESSTOKEN } from "../config/urlConfigs";

export const handleAxiosGetRequest = async (url: string) => {
  try {
    const result: any = await axiosInstance
      .get(url, {
        headers: {
          Authorization: "Bearer " + ACCESSTOKEN,
        },
      })
      .then((response) => {
        return response.data;
      });

    return result;
  } catch (error) {}
};
