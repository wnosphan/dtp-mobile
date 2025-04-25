import api from './client';
import { apiEndpoint } from '../config/api';

export const queryChat = (query: string) =>
  api.post<{ response: string }>(apiEndpoint.chat, { query }).then(r => r.data); 