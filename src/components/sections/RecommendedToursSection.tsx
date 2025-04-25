import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchRecommendedTours, Tour } from '../../api/tour';

export const RecommendedToursSection = () => {
  const navigation = useNavigation();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchRecommendedTours(6);
        if (data && Array.isArray(data)) {
          setTours(data);
        } else {
          setTours([]);
          setError('Không thể tải dữ liệu tours');
        }
      } catch (error) {
        console.error('Error loading recommended tours:', error);
        setTours([]);
        setError('Đã có lỗi xảy ra khi tải tours');
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  if (loading) {
    return (
      <View className="py-12 px-4">
        <Text className="text-center">Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-12 px-4">
        <Text className="text-center text-red-500">{error}</Text>
      </View>
    );
  }

  if (!tours || tours.length === 0) {
    return (
      <View className="py-12 px-4">
        <Text className="text-center">Không có tour nào được đề xuất</Text>
      </View>
    );
  }

  return (
    <View className="py-12 px-4">
      <Text className="text-2xl font-bold mb-8 text-center">
        Tour Được Đề Xuất
      </Text>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
      >
        {tours.map((tour) => (
          <TouchableOpacity 
            key={tour.id}
            onPress={() => {
              if (navigation?.navigate) {
                navigation.navigate('TourDetail', { id: tour.id });
              }
            }}
            className="w-72 rounded-lg overflow-hidden shadow-md bg-white"
          >
            <Image
              source={{ uri: tour.thumbnailUrl || 'https://via.placeholder.com/300x200' }}
              className="w-full h-48"
              resizeMode="cover"
            />
            <View className="p-4">
              <Text className="text-lg font-semibold mb-2" numberOfLines={2}>
                {tour.title}
              </Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Text className="text-yellow-500">⭐ {tour?.avgStar?.toFixed(1) || '0.0'}</Text>
                  <Text className="text-gray-500 ml-1">({tour?.totalRating || 0})</Text>
                </View>
                <Text className="text-primary font-semibold">
                  Từ {(tour?.onlyFromCost || 0).toLocaleString('vi-VN')}đ
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}; 