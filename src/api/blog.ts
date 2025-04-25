import api from './client';
import { apiEndpoint } from '../config/api';

export interface BlogPost { id: string; title: string; content: string; }

export const fetchBlogPosts = () =>
  api.get<BlogPost[]>(apiEndpoint.blog).then(r => r.data); 