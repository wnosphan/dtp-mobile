import axios, { AxiosHeaders } from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.yourdomain.com/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = ''; // TODO: Get from secure storage
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      config.headers.set('Authorization', `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Handle 401 - Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = ''; // TODO: Get from secure storage
        const response = await api.post<{ token: string }>('/auth/refresh-token', { refreshToken });
        const { token } = response.data;
        // TODO: Save new token to secure storage
        if (!originalRequest.headers) {
          originalRequest.headers = new AxiosHeaders();
        }
        originalRequest.headers.set('Authorization', `Bearer ${token}`);
        return api(originalRequest);
      } catch (error) {
        // TODO: Handle refresh token failure (e.g., logout user)
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
); 