import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';

export default function MyWalletScreen({ navigation }: RootStackScreenProps<'MyWallet'>) {
  return (
    <View style={styles.container}>
      <Text>My Wallet Screen</Text>
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