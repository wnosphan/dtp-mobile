import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { RootStackScreenProps } from '../types/navigation';

const DEFAULT_IMAGE = require('../../assets/icon.png');

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  return (
    <ScrollView className="flex-1 bg-background">
      {/* Hero Section */}
      <View className="h-[300px] w-full relative">
        <Image 
          source={DEFAULT_IMAGE}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
          <Text className="text-white text-3xl font-bold text-center">
            Khám phá Quy Nhơn
          </Text>
          <Text className="text-white text-lg text-center mt-2">
            Trải nghiệm du lịch tuyệt vời
          </Text>
        </View>
      </View>

      {/* Categories Section */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Khám phá theo danh mục
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {/* Add category items here */}
        </View>
      </View>

      {/* Featured Tours Section */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Tour nổi bật
        </Text>
        <View className="space-y-4">
          {/* Add tour cards here */}
        </View>
      </View>

      {/* Activities Section */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Hoạt động phổ biến
        </Text>
        <View className="space-y-4">
          {/* Add activity cards here */}
        </View>
      </View>

      {/* Gallery Section */}
      <View className="p-4">
        <Text className="text-2xl font-bold text-foreground mb-4">
          Thư viện ảnh
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {/* Add gallery images here */}
        </View>
      </View>
    </ScrollView>
  );
} 