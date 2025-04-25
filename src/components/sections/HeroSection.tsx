import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HeroSection = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../../assets/images/quynhonbanner.jpg')}
      className="h-[500px] w-full"
    >
      <View className="flex-1 bg-black/50 px-4 py-20">
        <View className="flex-1 justify-center items-center">
          <Text className="text-4xl font-bold text-white text-center mb-4">
            Khám Phá Quy Nhơn Cùng DTP Travel
          </Text>
          <Text className="text-lg text-white text-center mb-8">
            Trải nghiệm những chuyến đi tuyệt vời với dịch vụ đẳng cấp
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tours')}
            className="bg-primary px-8 py-4 rounded-full"
          >
            <Text className="text-white font-semibold">Khám phá ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}; 