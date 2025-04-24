import { create } from 'zustand';

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

interface TourState {
  tours: Tour[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  setTours: (tours: Tour[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPagination: (currentPage: number, totalPages: number) => void;
  setPageSize: (pageSize: number) => void;
}

export const useTourStore = create<TourState>((set) => ({
  tours: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  pageSize: 10,
  setTours: (tours) => set({ tours }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setPagination: (currentPage, totalPages) => set({ currentPage, totalPages }),
  setPageSize: (pageSize) => set({ pageSize }),
})); 