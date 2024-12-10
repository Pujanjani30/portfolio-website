import api from "./config.js";
import { setAuthorizationHeader } from "./auth.js";

const getHomeDetails = async () => {
  try {
    const response = await api.get('/home');
    return response.data.data;
  }
  catch (error) {
    throw error?.response?.data?.message || 'Unexpected error occurred';
  }
};

const updateHomeDetails = async (data) => {
  try {
    setAuthorizationHeader(); // Authorization header required for admin routes

    const response = await api.post('/admin/home', data, {
      headers: {
        'Content-Type': 'multipart/form-data', // update headers for file uploads
      },
    });

    return response.data.data;
  }
  catch (error) {
    throw error?.response?.data?.message || 'Unexpected error occurred';
  }
}

export { getHomeDetails, updateHomeDetails };