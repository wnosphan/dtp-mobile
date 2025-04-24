import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '../types/navigation';
import HomeScreen from '../screens/HomeScreen';
import ToursScreen from '../screens/ToursScreen';
import TourDetailScreen from '../screens/TourDetailScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AccountConfirmScreen from '../screens/AccountConfirmScreen';
import PaymentScreen from '../screens/PaymentScreen';
import ChatScreen from '../screens/ChatScreen';
import MapScreen from '../screens/MapScreen';
import BlogScreen from '../screens/BlogScreen';
import AboutScreen from '../screens/AboutScreen';
import MyAccountScreen from '../screens/MyAccountScreen';
import MyBookingsScreen from '../screens/MyBookingsScreen';
import MyReviewScreen from '../screens/MyReviewScreen';
import MyWalletScreen from '../screens/MyWalletScreen';
import PrivacyScreen from '../screens/PrivacyScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Tours" component={ToursScreen} />
        <Stack.Screen name="TourDetail" component={TourDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="AccountConfirm" component={AccountConfirmScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="MyAccount" component={MyAccountScreen} />
        <Stack.Screen name="MyBookings" component={MyBookingsScreen} />
        <Stack.Screen name="MyReview" component={MyReviewScreen} />
        <Stack.Screen name="MyWallet" component={MyWalletScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 