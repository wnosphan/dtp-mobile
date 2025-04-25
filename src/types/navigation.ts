import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Tours: undefined;
  Profile: undefined;
  TourDetail: { id: string };
  Login: undefined;
  Register: undefined;
  AccountConfirm: undefined;
  Cart: undefined;
  Payment: { orderId: string };
  MyBookings: undefined;
  MyWallet: undefined;
  Chat: undefined;
  Map: undefined;
  Blog: undefined;
  About: undefined;
  MyAccount: undefined;
  MyReview: undefined;
  Privacy: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = 
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 