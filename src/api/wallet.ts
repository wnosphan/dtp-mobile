import api from './client';
import { apiEndpoint } from '../config/api';

export interface WalletInfo { balance: number; }
export interface Transaction { id: string; amount: number; type: string; date: string; }

export const fetchWallet = () =>
  api.get<WalletInfo>(apiEndpoint.wallet).then(r => r.data);

export const fetchTransactions = (page = 1) =>
  api.get<Transaction[]>(apiEndpoint.transactions, { params: { page } }).then(r => r.data);

export const withdraw = (amount: number, description: string, otp: string) =>
  api.post<void>(apiEndpoint.withdraw, { amount, description }, { headers: { 'X-OTP': otp } });

export const deposit = (amount: number) =>
  api.post<void>(apiEndpoint.deposit, { amount }); 