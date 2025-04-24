import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';

export default function ToursScreen({ navigation }: RootStackScreenProps<'Tours'>) {
  return (
    <View style={styles.container}>
      <Text>Tours Screen</Text>
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