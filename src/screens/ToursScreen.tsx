import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ITEMS_PER_PAGE } from '../config/constants';
import tourApi from '../api/tourApi';
import { Tour, TourQueryParams, TourSortBy } from '../types/api';
import TourCard from '../components/TourCard';
import { Ionicons } from '@expo/vector-icons';

const ToursScreen = () => {
  console.log('[ToursScreen] Rendering...');
  const navigation = useNavigation();
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<TourSortBy>(TourSortBy.NEWEST);
  const [filterVisible, setFilterVisible] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('[ToursScreen] Mounting...');
    return () => {
      console.log('[ToursScreen] Unmounting...');
    };
  }, []);

  const fetchTours = useCallback(async (params: TourQueryParams) => {
    console.log('[ToursScreen] Fetching tours with params:', params);
    try {
      setError(null);
      const response = await tourApi.getAll({
        ...params,
        page,
        pageSize: ITEMS_PER_PAGE,
      });
      
      console.log('[ToursScreen] API Response:', {
        dataLength: response?.data?.length,
        totalCount: response?.totalCount,
        firstItem: response?.data?.[0],
      });

      if (response && response.data) {
        if (params.page === 1) {
          console.log('[ToursScreen] Setting initial tours data');
          setTours(response.data);
        } else {
          console.log('[ToursScreen] Appending more tours data');
          setTours(prev => [...prev, ...response.data]);
        }
        
        setHasMore(response.data.length === ITEMS_PER_PAGE);
        console.log('[ToursScreen] Has more:', response.data.length === ITEMS_PER_PAGE);
      } else {
        console.log('[ToursScreen] No data in response');
        setError('Không thể tải dữ liệu tours');
      }
    } catch (error) {
      console.error('[ToursScreen] Error fetching tours:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Có lỗi xảy ra khi tải danh sách tours');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page]);

  useEffect(() => {
    console.log('[ToursScreen] Search params changed:', {
      query: searchQuery,
      sortBy,
      priceRange,
    });
    const params: TourQueryParams = {
      query: searchQuery,
      sortBy,
      page: 1,
      isPriceFilterActive: !!(priceRange.min || priceRange.max),
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    };
    fetchTours(params);
  }, [searchQuery, sortBy, priceRange, fetchTours]);

  const handleRefresh = () => {
    console.log('[ToursScreen] Refreshing...');
    setRefreshing(true);
    setPage(1);
    const params: TourQueryParams = {
      query: searchQuery,
      sortBy,
      page: 1,
      isPriceFilterActive: !!(priceRange.min || priceRange.max),
      minPrice: priceRange.min ? Number(priceRange.min) : undefined,
      maxPrice: priceRange.max ? Number(priceRange.max) : undefined,
    };
    fetchTours(params);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      console.log('[ToursScreen] Loading more... Current page:', page);
      setPage(prev => prev + 1);
    }
  };

  const renderTourItem = ({ item }: { item: Tour }) => (
    <TourCard
      tour={item}
      onPress={() => navigation.navigate('TourDetail', { id: item.id })}
    />
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const renderError = () => {
    if (!error) return null;
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setError(null);
            handleRefresh();
          }}
        >
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm tour..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Ionicons name="filter" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <View style={styles.filterContainer}>
          <View style={styles.priceFilter}>
            <TextInput
              style={styles.priceInput}
              placeholder="Giá từ"
              value={priceRange.min}
              onChangeText={value => setPriceRange(prev => ({ ...prev, min: value }))}
              keyboardType="numeric"
            />
            <Text>-</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="Giá đến"
              value={priceRange.max}
              onChangeText={value => setPriceRange(prev => ({ ...prev, max: value }))}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === TourSortBy.PRICE_ASC && styles.activeSortButton]}
              onPress={() => setSortBy(TourSortBy.PRICE_ASC)}
            >
              <Text>Giá tăng dần</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === TourSortBy.PRICE_DESC && styles.activeSortButton]}
              onPress={() => setSortBy(TourSortBy.PRICE_DESC)}
            >
              <Text>Giá giảm dần</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortButton, sortBy === TourSortBy.RATING && styles.activeSortButton]}
              onPress={() => setSortBy(TourSortBy.RATING)}
            >
              <Text>Đánh giá cao</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {error ? (
        renderError()
      ) : (
        <FlatList
          data={tours}
          renderItem={renderTourItem}
          keyExtractor={item => item.id}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={() =>
            !loading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {searchQuery ? 'Không tìm thấy tour nào' : 'Chưa có tour nào'}
                </Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 12,
    padding: 8,
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  priceFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sortButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeSortButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  listContainer: {
    padding: 16,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#ff3b30',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ToursScreen; 