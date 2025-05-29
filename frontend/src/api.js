import axios from 'axios';

const API_URL = 'https://learndsa-backend.onrender.com/api';  

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add JWT token to headers for authorized requests
export const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
