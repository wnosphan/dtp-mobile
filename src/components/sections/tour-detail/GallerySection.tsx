import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Tour } from '../../../types/api';

interface GallerySectionProps {
  tour: Tour;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ tour }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
    setModalVisible(true);
  };

  const renderGalleryImage = ({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity 
      style={styles.imageContainer} 
      onPress={() => handleImagePress(index)}
    >
      <Image
        source={{ uri: item }}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );

  const renderFullScreenImage = () => (
    <Modal
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.closeIcon} />
        </TouchableOpacity>
        <FlatList
          data={tour.images}
          horizontal
          pagingEnabled
          initialScrollIndex={selectedImageIndex}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tour.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderGalleryImage}
        keyExtractor={(_, index) => index.toString()}
      />
      {renderFullScreenImage()}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  imageContainer: {
    width: width * 0.8,
    height: 250,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width,
    height: height * 0.8,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
    padding: 10,
  },
  closeIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
}); 