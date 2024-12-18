import api from "./config.js";
import { setAuthorizationHeader } from "./auth.js";

const getEducations = async () => {
  try {
    const response = await api.get("/education");
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const addEducation = async (data) => {
  try {
    setAuthorizationHeader();
    const response = await api.post("/admin/education", data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const updateEducation = async (id, data) => {
  try {
    setAuthorizationHeader();
    const response = await api.put(`/admin/education/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const deleteEducation = async (id) => {
  try {
    setAuthorizationHeader();
    const response = await api.delete(`/admin/education/${id}`);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

export { getEducations, addEducation, updateEducation, deleteEducation };