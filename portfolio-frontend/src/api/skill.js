import api from "./config.js";
import { setAuthorizationHeader } from "./auth.js";

const getSkills = async () => {
  try {
    const response = await api.get("/skill");
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
};

const addSkill = async (data) => {
  try {
    setAuthorizationHeader();
    const response = await api.post("/admin/skill", data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
}

const reorderSkills = async (data) => {
  try {
    setAuthorizationHeader();
    const response = await api.post('/admin/skill/reorder', data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
}

const updateSkill = async (id, data) => {
  try {
    setAuthorizationHeader();
    const response = await api.put(`/admin/skill/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
}

const deleteSkill = async (id) => {
  try {
    setAuthorizationHeader();
    const response = await api.delete(`/admin/skill/${id}`);
    return response.data.data;
  } catch (error) {
    throw error?.response?.data?.message || "Unexpected error occurred";
  }
}

export { getSkills, addSkill, reorderSkills, updateSkill, deleteSkill };

