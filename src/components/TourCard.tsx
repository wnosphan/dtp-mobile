import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tour } from '../types/api';

interface TourCardProps {
  tour: Tour;
  onPress: () => void;
}

const TourCard: React.FC<TourCardProps> = ({ tour, onPress }) => {
  // Prepare image URL with a default fallback
  const imageUrl = tour.thumbnailUrl || 'https://res.cloudinary.com/dpwehk7qg/image/upload/v1711035772/placeholder_jlhgx1.jpg';
  
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {tour.title}
        </Text>
        <Text style={styles.location}>
          <Ionicons name="location" size={16} color="#666" /> {tour.startLocation || 'Chưa cập nhật'}
        </Text>
        <View style={styles.footer}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>
              {tour.avgStar ? tour.avgStar.toFixed(1) : '0.0'}
            </Text>
            <Text style={styles.ratingCount}>
              ({tour.ratingsQuantity || 0})
            </Text>
          </View>
          <Text style={styles.price}>
            Từ {(tour.onlyFromCost || 0).toLocaleString('vi-VN')}đ
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#f5f5f5', // Add a background color while loading
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  ratingCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});

export default TourCard; 