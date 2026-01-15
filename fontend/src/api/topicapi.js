import axiosInstance from "./axiosInstance";

export const fetchTopics = async () => {
  const res = await axiosInstance.get();
  return res.data;
};

export const createTopic = async () => {
  const res = await axiosInstance.post("/add");
  return res.data;
};

export const updateTopic = async (id, data) => {
  const res = await axiosInstance.patch(`/${id}`, data);
  return res.data;
};

export const deleteTopic = async (id) => {
  await axiosInstance.delete(`/${id}`);
};

export const getTopicById = async (id) => {
  const res = await axiosInstance.get(`/${id}`)
  return res.data
};
