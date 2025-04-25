import api from './client';
import { apiEndpoint } from '../config/api';

export interface Tour {
  id: string;
  title: string;
  thumbnailUrl?: string;
  avgStar: number;
  totalRating: number;
  onlyFromCost: number;
  description?: string;
  duration?: string;
  startLocation?: string;
  endLocation?: string;
}

export interface TourSchedule {
  id: string;
  startDate: string;
  netCost: number;
}

export interface TourSearchResult {
  tours: Tour[];
  total: number;
}

export interface ODataParams {
  $filter?: string;
  $orderby?: string;
  $top?: number;
  $skip?: number;
  $select?: string[];
  $search?: string;
  $count?: boolean;
}

export function buildODataQuery(params: {
  search?: string;
  filter?: string;
  orderBy?: string;
  page?: number;
  pageSize?: number;
  select?: string[];
}): Record<string, string> {
  const query: Record<string, string> = {
    $count: 'true'
  };

  // Add search
  if (params.search) {
    query.$search = params.search;
  }

  // Add filter
  if (params.filter) {
    query.$filter = params.filter;
  }

  // Add ordering
  if (params.orderBy) {
    query.$orderby = params.orderBy;
  }

  // Add pagination
  if (params.page && params.pageSize) {
    query.$skip = ((params.page - 1) * params.pageSize).toString();
    query.$top = params.pageSize.toString();
  }

  // Add field selection
  if (params.select) {
    query.$select = params.select.join(',');
  }

  return query;
}

export async function searchTours(params: {
  search?: string;
  filter?: string;
  orderBy?: string;
  page?: number;
  pageSize?: number;
  select?: string[];
}): Promise<TourSearchResult> {
  try {
    const odataParams = buildODataQuery(params);
    
    const response = await api.get(apiEndpoint.odataTours, {
      params: odataParams
    });

    return {
      tours: response.data.value,
      total: response.data['@odata.count'] || 0
    };
  } catch (error) {
    console.error('Error in searchTours:', error);
    throw error;
  }
}

export const fetchRecommendedTours = (limit = 6) =>
  api.get<{ payload: Tour[] }>(apiEndpoint.recommendTours, { params: { limit } })
    .then(r => r.data.payload);

export const fetchTourDetail = (tourId: string) =>
  api.get<Tour>(apiEndpoint.tours + `/${tourId}`).then(r => r.data);

export const fetchTourSchedules = (tourId: string) =>
  api.get<TourSchedule[]>(apiEndpoint.tourSchedule + `/${tourId}`).then(r => r.data);

export const fetchTicketTypes = (scheduleId: string) =>
  api.get<any[]>(apiEndpoint.tourScheduleTicket + `/${scheduleId}`).then(r => r.data); 