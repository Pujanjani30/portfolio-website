import axios from 'axios';

const BASE_URL = 'https://portfolio-pujanjani.onrender.com/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
});

// Function to retrieve the stored token (e.g., from localStorage)
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Or use sessionStorage or a global state
};

// Function to set Authorization header if a token is available
const setAuthorizationHeader = () => {
  const token = getAuthToken();
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers['Authorization'];  // Remove header if no token
  }
};

const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;

    // Store the token in localStorage
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(response.data.data));

    return response.data.data;
  }
  catch (error) {
    throw error?.response?.data?.message || 'Invalid login credentials';
  }
}

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');

  setAuthorizationHeader();
};

const getHomeDetails = async () => {
  try {
    const response = await api.get('/home');

    return response.data.data;
  }
  catch (error) {
    throw error?.response?.data?.message || 'An error occurred';
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
    throw error?.response?.data?.message || 'An error occurred';
  }
}

export { login, logout, getHomeDetails, updateHomeDetails };