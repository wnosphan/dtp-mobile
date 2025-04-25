import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { Tour, Review } from '../../../types/api';

interface RatingSectionProps {
  tour: Tour;
}

export const RatingSection: React.FC<RatingSectionProps> = ({ tour }) => {
  const renderRatingStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text
            key={star}
            style={[
              styles.star,
              { color: star <= rating ? '#fbbf24' : '#e5e7eb' }
            ]}
          >
            ★
          </Text>
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: item.user.photo }}
          style={styles.userAvatar}
        />
        <View style={styles.reviewHeaderText}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.reviewDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
      </View>
      {renderRatingStars(item.rating)}
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );

  const rating = tour.rating || tour.avgStar || 0;
  const reviews = tour.reviews || [];
  const totalReviews = tour.ratingsQuantity || reviews.length || 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đánh giá</Text>
        <View style={styles.ratingInfo}>
          <Text style={styles.ratingScore}>{rating.toFixed(1)}</Text>
          {renderRatingStars(rating)}
          <Text style={styles.totalReviews}>({totalReviews} đánh giá)</Text>
        </View>
      </View>

      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          renderItem={renderReviewItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      ) : (
        <Text style={styles.noReviews}>Chưa có đánh giá nào</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginVertical: 8,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  ratingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingScore: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 18,
    marginRight: 2,
  },
  totalReviews: {
    color: '#6b7280',
  },
  reviewItem: {
    marginVertical: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewHeaderText: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  reviewDate: {
    color: '#6b7280',
    fontSize: 14,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  noReviews: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    paddingVertical: 16,
  },
}); 