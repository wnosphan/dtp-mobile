import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';

export default function TourDetailScreen({ route, navigation }: RootStackScreenProps<'TourDetail'>) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>Tour Detail Screen</Text>
      <Text>Tour ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 