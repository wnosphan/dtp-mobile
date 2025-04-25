import api from './client';
import { apiEndpoint } from '../config/api';

export const submitRating = (tourId: string, star: number, comment: string) =>
  api.post<void>(apiEndpoint.rating, { tourId, star, comment }); 