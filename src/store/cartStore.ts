import { create } from 'zustand';

interface CartItem {
  id: string;
  tourId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  date: string;
  ticketType: string;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  loading: false,
  error: null,
  addItem: (item) => set((state) => ({
    items: [...state.items, item],
  })),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ),
  })),
  clearCart: () => set({ items: [] }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
})); 