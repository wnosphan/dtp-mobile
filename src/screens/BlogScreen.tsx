import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';

export default function BlogScreen({ navigation }: RootStackScreenProps<'Blog'>) {
  return (
    <View style={styles.container}>
      <Text>Blog Screen</Text>
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