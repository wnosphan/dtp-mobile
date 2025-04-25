import api from './client';
import { nextServer, apiEndpoint } from '../config/api';

export interface LoginRequest { email: string; password: string; }
export interface LoginResponse { accessToken: string; refreshToken: string; }
export interface RegisterRequest { userName: string; email: string; password: string; confirmPassword: string; }

export const login = (data: LoginRequest) =>
  api.post<LoginResponse>(nextServer.login, data).then(r => r.data);

export const register = (data: RegisterRequest) =>
  api.post<void>(apiEndpoint.register, data).then(r => r.data);

export const logout = () =>
  api.post<void>(nextServer.logout).then(r => r.data);

export const refreshToken = (token: string) =>
  api.post<{ accessToken: string }>(nextServer.refreshToken, { token }).then(r => r.data);

export const confirmEmail = (token: string) =>
  api.post<void>(nextServer.confirmation, { confirmationToken: token });

export const forgotPassword = (email: string, confirmUrl: string) =>
  api.post<void>(apiEndpoint.forgotPassword, { email, confirmUrl });

export const resetPassword = (token: string, newPassword: string) =>
  api.post<void>(apiEndpoint.resetPassword, { confirmationToken: token, newPassword });

export const resendVerification = (email: string) =>
  api.post<void>(nextServer.resendVerification, { email }); 