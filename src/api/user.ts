import api from './client';
import { endpoints } from '../config/api';

export interface UserProfile { userName: string; email: string; name: string; address: string; phoneNumber: string; }

export const fetchProfile = () =>
  api.get<UserProfile>(endpoints.user.profile).then(r => r.data);

export const updateProfile = (data: Partial<UserProfile>) =>
  api.put<void>(endpoints.user.update, data);

export const changePassword = (oldPassword: string, newPassword: string) =>
  api.post<void>(endpoints.user.changePassword, { oldPassword, newPassword }); 