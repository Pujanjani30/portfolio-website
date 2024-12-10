import api from "./config.js";
import { setAuthorizationHeader } from "./auth.js";

const getLogs = async (page) => {
  try {
    setAuthorizationHeader();

    const response = await api.get(`/admin/logs?page=${page}&limit=10`);

    return response.data.data;
  }
  catch (error) {
    throw error?.response?.data?.message || 'An error occurred';
  }
};

export { getLogs };