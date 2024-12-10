import api from "./config.js";
import { setAuthorizationHeader } from "./auth.js";

const getProjects = async () => {
  try {
    const response = await api.get("/project");
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const getAllProjects = async () => {
  try {
    setAuthorizationHeader();
    const response = await api.get("/admin/project");
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const addProject = async (data) => {
  try {
    setAuthorizationHeader();
    const response = await api.post("/admin/project", data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const updateProject = async (id, data) => {
  try {
    setAuthorizationHeader();
    const response = await api.put(`/admin/project/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const deleteProject = async (id) => {
  try {
    setAuthorizationHeader();
    const response = await api.delete(`/admin/project/${id}`);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

export { getProjects, getAllProjects, addProject, updateProject, deleteProject };
