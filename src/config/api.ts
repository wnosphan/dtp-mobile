import Constants from 'expo-constants';

// Base URL for all API requests
export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl || 'https://binhdinhtour.id.vn';

export const nextServer = {
  setToken:     '/api/auth/set-token',
  logout:       '/api/auth/logout',
  refreshToken: '/api/auth/refresh-token',
  login:        '/api/auth/login',
  confirmation: '/api/auth/confirmation',
  resendVerification: '/api/auth/resend-verification',
  // tour
  getAllTours:  '/api/tour/getAll',
  recommendTours:'/api/tour/recommend',
};

export const apiEndpoint = {
  // authentication
  login:           '/api/authentication/login',
  register:        '/api/authentication/register',
  logout:          '/api/authentication/logout',
  refresh:         '/api/authentication/refresh',
  confirmation:    '/api/authentication/confirmation',
  forgotPassword:  '/api/authentication/forget-password',
  resetPassword:   '/api/authentication/reset-password',

  // user
  profile:         '/api/user/me',
  updateProfile:   '/api/user',

  // tour
  tours:           '/api/tour',
  odataTours:      '/odata/tour',
  odataTour:       '/odata/tour',
  tourAll:         '/api/tour/getAll',
  recommendTours:  '/api/tour/recommend',
  tourDetail:      (id: string) => `/api/tour/${id}`,
  tourSchedule:    (id: string) => `/api/tour/schedule/${id}`,
  tourScheduleTicket: '/api/tour/scheduleticket',

  // basket
  basket:          '/api/basket',
  basketItems:     '/api/basket/items',
  applyVoucher:    '/api/basket/apply-voucher',

  // order & payment
  order:           '/api/order',
  orderDetail:     (id: string) => `/api/order/${id}`,
  payment:         '/api/payment',
  paymentConfirm:  (id: string) => `/api/payment/${id}`,

  // feedback & rating
  feedback:        '/api/tour/feedback',
  rating:          '/api/tour/rating',

  // wallet
  wallet:          '/api/wallet',
  otp:             '/api/wallet/otp',
  withdrawWithOtp: '/api/wallet/withdraw',
  deposit:         '/api/wallet/deposit',
  transactions:    '/api/wallet/transactions',

  // chat & blog & subscribe
  chat:            '/api/chat/query',
  blog:            '/api/blogposts',
  subscribe:       '/api/subscribe',
}; 