import api from './client';
import { apiEndpoint } from '../config/api';

export const subscribe = (email: string) =>
  api.post<void>(apiEndpoint.subscribe, { email }); 