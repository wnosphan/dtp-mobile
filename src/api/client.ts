import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get token from secure storage
    // const token = await SecureStore.getItemAsync('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        // const newToken = await refreshToken();
        // Update token in secure storage
        // await SecureStore.setItemAsync('token', newToken);
        // Update authorization header
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., redirect to login)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
); 

export default api; 