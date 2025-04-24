import { api } from './client';

interface TourResponse {
  data: Tour[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

interface Tour {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  location: string;
}

interface TourParams {
  page?: number;
  pageSize?: number;
  fromDate?: string;
  toDate?: string;
  sortBy?: string;
  search?: string;
}

export const tourApi = {
  getAll: async (params: TourParams = {}): Promise<TourResponse> => {
    const response = await api.get<TourResponse>('/tourschedules', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Tour> => {
    const response = await api.get<Tour>(`/tours/${id}`);
    return response.data;
  },

  getUpcoming: async (limit: number = 6): Promise<Tour[]> => {
    const response = await api.get<Tour[]>('/tourschedules/upcoming', {
      params: { limit },
    });
    return response.data;
  },

  getRecommended: async (): Promise<Tour[]> => {
    const response = await api.get<Tour[]>('/tours/recommend');
    return response.data;
  },
}; 