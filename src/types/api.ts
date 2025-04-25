export interface User {
  id: string;
  name: string;
  photo: string;
}

export interface Review {
  id: string;
  review: string;
  rating: number;
  user: User;
  tour: string;
  createdAt: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  about: string;
  price: number;
  duration: number;
  maxGroupSize: number;
  thumbnailUrl: string;
  images: string[];
  startLocation: string;
  locations: string[];
  rating: number;
  ratingsQuantity: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  onlyFromCost: number;
  avgStar: number;
  reviews: Review[];
}

// OData response interface
interface ODataTourResponse {
  value: Tour[];
  '@odata.count': number;
}

// Our app's response interface
export interface TourResponse {
  data: Tour[];
  totalCount: number;
}

export interface TourQueryParams {
  query?: string;
  page?: number;
  pageSize?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  date?: string;
  isPriceFilterActive?: boolean;
  isDateFilterActive?: boolean;
}

export enum TourSortBy {
  PRICE_ASC = "PRICE_ASC",
  PRICE_DESC = "PRICE_DESC",
  RATING = "RATING",
  NEWEST = "NEWEST"
}

export interface DailyTicketSchedule {
  id: string;
  openDate: string;
  closeDate: string;
  availableTickets: number;
  totalTickets: number;
  cost: number;
  tourId: string;
} 