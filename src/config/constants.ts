import { Platform } from 'react-native';

export const API_URL = __DEV__ 
  ? Platform.select({
    android: 'https://binhdinhtour.id.vn',
    ios: 'https://binhdinhtour.id.vn',
    default: 'https://binhdinhtour.id.vn'
  })
  : 'https://binhdinhtour.id.vn';

export const ITEMS_PER_PAGE = 10; 