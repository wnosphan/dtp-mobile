import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';

export default function PaymentScreen({ route, navigation }: RootStackScreenProps<'Payment'>) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>Payment Screen</Text>
      <Text>Payment ID: {id}</Text>
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