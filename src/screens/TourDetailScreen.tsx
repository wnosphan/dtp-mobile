import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import tourApi from '../api/tourApi';
import { Tour } from '../types/api';
import { Ionicons } from '@expo/vector-icons';

type TourDetailScreenRouteProp = RouteProp<RootStackParamList, 'TourDetail'>;

export const TourDetailScreen = () => {
  const route = useRoute<TourDetailScreenRouteProp>();
  const navigation = useNavigation();
  
  // Add null check for route.params
  const tourId = route.params?.id;
  if (!tourId) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Tour ID is missing</Text>
      </View>
    );
  }

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchTourDetail = async () => {
      console.log('Fetching tour detail for ID:', tourId);
      try {
        setLoading(true);
        const response = await tourApi.getById(tourId);
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
  }, [tourId]);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this amazing tour: ${tour?.title}`,
        title: tour?.title,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
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

  // Ensure tour.images exists and has items
  const images = tour.images || [];
  const hasImages = images.length > 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.imageGallery}>
        {hasImages ? (
          <>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => {
                const offset = e.nativeEvent.contentOffset.x;
                const newIndex = Math.round(offset / Dimensions.get('window').width);
                setCurrentImageIndex(newIndex);
              }}
              scrollEventThrottle={16}
            >
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.bannerImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            {images.length > 1 && (
              <View style={styles.imagePagination}>
                {images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentImageIndex && styles.paginationDotActive,
                    ]}
                  />
                ))}
              </View>
            )}
          </>
        ) : (
          <View style={styles.noImageContainer}>
            <Ionicons name="image-outline" size={48} color="#ccc" />
            <Text style={styles.noImageText}>No images available</Text>
          </View>
        )}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{tour.title || 'Untitled Tour'}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            From ${tour.onlyFromCost?.toLocaleString() || 0}
          </Text>
          <Text style={styles.duration}>
            {tour.duration || 0} days
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <View style={styles.ratingStars}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>
              {(tour.avgStar || 0).toFixed(1)}
            </Text>
          </View>
          <Text style={styles.reviews}>
            ({tour.ratingsQuantity || 0} reviews)
          </Text>
        </View>

        {tour.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{tour.description}</Text>
          </View>
        )}

        {tour.about && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{tour.about}</Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => {
            // TODO: Implement booking functionality
            console.log('Book now pressed');
          }}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGallery: {
    position: 'relative',
    height: 250,
  },
  noImageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  noImageText: {
    marginTop: 8,
    color: '#666',
  },
  bannerImage: {
    width: Dimensions.get('window').width,
    height: 250,
  },
  imagePagination: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    marginRight: 8,
  },
  reviews: {
    fontSize: 14,
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
  bookButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
}); 