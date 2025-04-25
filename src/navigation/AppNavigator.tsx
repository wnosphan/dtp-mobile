import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import { TourDetailScreen } from '../screens/TourDetailScreen';

export type RootStackParamList = {
  Main: undefined;
  TourDetail: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="TourDetail" component={TourDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 