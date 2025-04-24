import { api } from './client';

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

interface AddToCartParams {
  tourScheduleId: string;
  ticketTypeId: string;
  units: number;
}

interface UpdateCartItemParams {
  id: string;
  units: number;
}

export const cartApi = {
  getCart: async (): Promise<CartItem[]> => {
    const response = await api.get<CartItem[]>('/basket');
    return response.data;
  },

  addToCart: async (params: AddToCartParams): Promise<void> => {
    await api.post('/basket/items', params);
  },

  updateCartItem: async (params: UpdateCartItemParams): Promise<void> => {
    await api.put(`/basket/items/${params.id}`, { units: params.units });
  },

  removeFromCart: async (id: string): Promise<void> => {
    await api.delete(`/basket/items/${id}`);
  },

  clearCart: async (): Promise<void> => {
    await api.delete('/basket');
  },
}; 