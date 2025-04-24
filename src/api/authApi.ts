import { api } from './client';

interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  name: string;
}

export const authApi = {
  login: async (params: LoginParams): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', params);
    return response.data;
  },

  register: async (params: RegisterParams): Promise<void> => {
    await api.post('/auth/register', params);
  },

  confirmAccount: async (token: string): Promise<void> => {
    await api.get(`/auth/confirmation?token=${token}`);
  },

  refreshToken: async (refreshToken: string): Promise<{ token: string }> => {
    const response = await api.post<{ token: string }>('/auth/refresh-token', { refreshToken });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  me: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },
}; 