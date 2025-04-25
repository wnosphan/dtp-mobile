import api from './client';
import { apiEndpoint } from '../config/api';

export interface BasketItem { tourScheduleId: string; ticketTypeId: string; units: number; }
export interface Basket { items: BasketItem[]; totalCost: number; }

export const fetchBasket = () =>
  api.get<Basket>(apiEndpoint.basket).then(r => r.data);

export const addToBasket = (tourScheduleId: string, ticketTypeId: string, units = 1) =>
  api.post<void>(apiEndpoint.basketItems, { tourScheduleId, ticketTypeId, units });

export const removeBasketItem = (tourScheduleId: string) =>
  api.delete<void>(apiEndpoint.basketItems, { data: { tourScheduleId } });

export const applyVoucher = (code: string) =>
  api.post<void>(apiEndpoint.applyVoucher, { code }); 