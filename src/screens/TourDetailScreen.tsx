import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import tourApi from '../api/tourApi';
import { Tour } from '../types/api';
import { GallerySection } from '../components/sections/tour-detail/GallerySection';
import { ServiceSection } from '../components/sections/tour-detail/ServiceSection';
import { RatingSection } from '../components/sections/tour-detail/RatingSection';

type TourDetailScreenRouteProp = RouteProp<RootStackParamList, 'TourDetail'>;

export const TourDetailScreen = () => {
  const route = useRoute<TourDetailScreenRouteProp>();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTourDetail = async () => {
      console.log('Fetching tour detail for ID:', route.params?.id);
      try {
        setLoading(true);
        const response = await tourApi.getById(route.params?.id);
        console.log('Tour detail response:', response);
        setTour(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching tour detail:', err);
        setError('Failed to load tour details');
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetail();
  }, [route.params?.id]);

  const handleBookNow = (date: string, quantity: number) => {
    // TODO: Implement booking logic
    console.log('Booking tour:', { date, quantity });
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!tour) {
    return (
      <View style={styles.centerContainer}>
        <Text>Tour not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <GallerySection tour={tour} />
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{tour.title}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${tour.price}</Text>
          <Text style={styles.duration}>Duration: {tour.duration} days</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{tour.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{tour.about}</Text>
        </View>

        <ServiceSection tour={tour} onBookNow={handleBookNow} />
        
        <RatingSection tour={tour} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  duration: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
}); 