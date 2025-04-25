import api from './client';
import { apiEndpoint } from '../config/api';

export interface OrderRequest { tourScheduleId: string; tickets: { ticketTypeId: string; quantity: number }[]; name: string; phoneNumber: string; email: string; voucherCode?: string; }
export interface OrderResponse { orderId: string; paymentLink: string; }

export const createOrder = (data: OrderRequest) =>
  api.post<OrderResponse>(apiEndpoint.order, data).then(r => r.data);

export const fetchOrders = () =>
  api.get<OrderResponse[]>(apiEndpoint.order).then(r => r.data);

export const fetchOrderDetail = (orderId: string) =>
  api.get<OrderResponse>(apiEndpoint.orderDetail(orderId)).then(r => r.data);

export const cancelOrder = (orderId: string) =>
  api.put<void>(apiEndpoint.orderDetail(orderId)); 