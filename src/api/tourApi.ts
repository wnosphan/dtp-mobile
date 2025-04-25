import axios from 'axios';
import { API_URL } from '../config/constants';
import { Tour, TourQueryParams, TourResponse, DailyTicketSchedule } from '../types/api';

// Import ODataTourResponse interface
interface ODataTourResponse {
  value: Tour[];
  '@odata.count': number;
}

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
axiosInstance.interceptors.request.use(
  async (config) => {
    console.log('[API Request]', {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for logging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('[API Response]', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('[API Response Error]', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.message,
      response: error.response?.data,
    });
    return Promise.reject(error);
  }
);

const tourApi = {
  // 1. List & Search Tours using OData endpoint
  getAll: async (params: TourQueryParams): Promise<TourResponse> => {
    console.log('[tourApi.getAll] Called with params:', params);
    try {
      // Construct OData query parameters
      const searchParams = new URLSearchParams();
      
      // Base filter for non-deleted tours
      let filterString = 'isDeleted eq false';
      
      // Add title search if query exists
      if (params.query) {
        filterString += ` and contains(tolower(title), tolower('${params.query.trim()}'))`;
      }
      
      // Add price filter if active
      if (params.isPriceFilterActive && params.minPrice !== undefined && params.maxPrice !== undefined) {
        filterString += ` and onlyFromCost ge ${params.minPrice} and onlyFromCost le ${params.maxPrice}`;
      }
      
      // Add date filter if active
      if (params.isDateFilterActive && params.date) {
        const formattedDate = new Date(params.date).toISOString();
        filterString += ` and tourScheduleResponses/any(t: t/openDate eq ${formattedDate})`;
      }
      
      // Add OData parameters
      searchParams.append('$filter', filterString);
      searchParams.append('$top', params.pageSize?.toString() || '9');
      searchParams.append('$skip', params.page ? ((params.page - 1) * (params.pageSize || 9)).toString() : '0');
      searchParams.append('$count', 'true');
      
      // Add sorting if specified
      if (params.sortBy) {
        let orderBy = '';
        switch (params.sortBy) {
          case 'PRICE_ASC':
            orderBy = 'onlyFromCost asc';
            break;
          case 'PRICE_DESC':
            orderBy = 'onlyFromCost desc';
            break;
          case 'RATING':
            orderBy = 'avgStar desc';
            break;
          case 'NEWEST':
            orderBy = 'createdAt desc';
            break;
        }
        if (orderBy) {
          searchParams.append('$orderby', orderBy);
        }
      }

      console.log('[tourApi.getAll] Final OData query:', searchParams.toString());
      
      const response = await axiosInstance.get<ODataTourResponse>(`/odata/tour?${searchParams.toString()}`);
      
      // Transform OData response to expected format
      return {
        data: response.data.value || [],
        totalCount: response.data['@odata.count'] || 0
      };
    } catch (error) {
      console.error('[tourApi.getAll] Error:', error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw error;
    }
  },

  // 2. Get Tour Detail
  getById: async (id: string): Promise<Tour> => {
    console.log('[tourApi.getById] Called with id:', id);
    try {
      const response = await axiosInstance.get<Tour>(`/api/tour/${id}`);
      return response.data;
    } catch (error) {
      console.error('[tourApi.getById] Error:', error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw error;
    }
  },

  // 3. Get Tour Schedule Tickets
  getScheduleTickets: async (id: string): Promise<DailyTicketSchedule[]> => {
    console.log('[tourApi.getScheduleTickets] Called with id:', id);
    try {
      const response = await axiosInstance.get<DailyTicketSchedule[]>(`/api/tour/scheduleticket/${id}`);
      return response.data;
    } catch (error) {
      console.error('[tourApi.getScheduleTickets] Error:', error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw error;
    }
  },

  // 4. Get Recommended Tours
  getRecommended: async (): Promise<Tour[]> => {
    console.log('[tourApi.getRecommended] Called');
    try {
      const response = await axiosInstance.get<Tour[]>('/api/tour/recommend');
      return response.data;
    } catch (error) {
      console.error('[tourApi.getRecommended] Error:', error);
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        throw new Error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
      }
      throw error;
    }
  }
};

export default tourApi; 