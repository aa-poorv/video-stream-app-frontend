import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseURL } from "../service/base-url";

export const queryClient = new QueryClient();

export const postVideo = async ({ formData }) => {
  const { data } = await axios.post(`${baseURL}/api/video`, formData);
  return data;
};

export const getAllVideos = async ({ pageParam }) => {
  const { data } = await axios.get(`${baseURL}/api/video/?page=` + pageParam);
  return data;
};

export const getVideo = async ({ id }) => {
  const { data } = await axios.get(`${baseURL}/api/video/${id}`);
  return data;
};
