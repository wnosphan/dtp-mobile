import api from './client';
import { apiEndpoint } from '../config/api';

export interface PaymentRequest { orderId: string; method: 'VNPay' | 'PayOs'; }
export interface PaymentResponse { paymentId: string; paymentUrl: string; }

export const createPayment = (data: PaymentRequest) =>
  api.post<PaymentResponse>(apiEndpoint.payment, data).then(r => r.data);

export const confirmPayment = (paymentId: string) =>
  api.put<void>(apiEndpoint.paymentConfirm(paymentId));

export const cancelPayment = (paymentId: string) =>
  api.post<void>(apiEndpoint.paymentConfirm(paymentId)); 