import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';

export default function AccountConfirmScreen({ route, navigation }: RootStackScreenProps<'AccountConfirm'>) {
  const { token } = route.params;

  return (
    <View style={styles.container}>
      <Text>Account Confirmation Screen</Text>
      <Text>Token: {token}</Text>
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