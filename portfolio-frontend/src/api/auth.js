import api from "./config.js";

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
    throw error?.response?.data?.message || 'Uexpected error occurred';
  }
}

const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');

  setAuthorizationHeader();
};

export { login, logout, setAuthorizationHeader };