import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

const activities = [
  {
    id: 1,
    title: 'Khám phá văn hóa',
    image: require('../../../assets/images/thap-doi.jpg'),
    description: 'Khám phá Tháp Đôi - Di tích lịch sử văn hóa',
  },
  {
    id: 2,
    title: 'Biển đảo',
    image: require('../../../assets/images/ky-co.jpg'),
    description: 'Khám phá bãi biển Kỳ Co tuyệt đẹp',
  },
  {
    id: 3,
    title: 'Cảnh quan',
    image: require('../../../assets/images/eo-gio.jpg'),
    description: 'Chiêm ngưỡng Eo Gió hùng vĩ',
  },
  {
    id: 4,
    title: 'Đồi cát',
    image: require('../../../assets/images/doi-cat-phuong-mai.jpg'),
    description: 'Khám phá đồi cát Phương Mai',
  },
];

export const ActivitySection = () => {
  return (
    <View className="py-12 px-4">
      <Text className="text-2xl font-bold mb-8 text-center">
        Điểm Đến Nổi Bật
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {activities.map((activity) => (
          <TouchableOpacity 
            key={activity.id}
            className="w-64 rounded-lg overflow-hidden shadow-md bg-white"
          >
            <Image
              source={activity.image}
              className="w-full h-40"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-lg font-semibold mb-2">
                {activity.title}
              </Text>
              <Text className="text-gray-600">
                {activity.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}; 