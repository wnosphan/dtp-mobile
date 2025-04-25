import api from './client';
import { apiEndpoint } from '../config/api';

export const submitFeedback = (tourScheduleId: string, description: string) =>
  api.post<void>(apiEndpoint.feedback, { tourScheduleId, description }); 