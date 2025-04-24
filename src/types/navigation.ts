import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Tours: undefined;
  TourDetail: { id: string };
  Cart: undefined;
  Login: undefined;
  Register: undefined;
  AccountConfirm: { token: string };
  Payment: { id: string };
  Chat: undefined;
  Map: undefined;
  Blog: undefined;
  About: undefined;
  MyAccount: undefined;
  MyBookings: undefined;
  MyReview: undefined;
  MyWallet: undefined;
  Privacy: undefined;
  Profile: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>; 