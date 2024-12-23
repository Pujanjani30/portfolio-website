import api from "./config.js";
import { setAuthorizationHeader } from "./auth.js";

const getExperiences = async () => {
  try {
    const response = await api.get("/experience");
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const addExperience = async (data) => {
  try {
    setAuthorizationHeader();
    const response = await api.post("/admin/experience", data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const updateExperience = async (id, data) => {
  try {
    setAuthorizationHeader();
    const response = await api.put(`/admin/experience/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const deleteExperience = async (id) => {
  try {
    setAuthorizationHeader();
    const response = await api.delete(`/admin/experience/${id}`);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

export { getExperiences, addExperience, updateExperience, deleteExperience };