import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { HeroSection } from '../components/sections/HeroSection';
import { ActivitySection } from '../components/sections/ActivitySection';
import { RecommendedToursSection } from '../components/sections/RecommendedToursSection';
import { SubscribeSection } from '../components/sections/SubscribeSection';

const HomeScreen = () => {
  useEffect(() => {
    console.log('[HomeScreen] Mounting...');
    return () => {
      console.log('[HomeScreen] Unmounting...');
    };
  }, []);

  console.log('[HomeScreen] Rendering...');
  return (
    <ScrollView 
      style={styles.container}
      onScroll={(event) => {
        console.log('[HomeScreen] Scroll position:', event.nativeEvent.contentOffset.y);
      }}
      scrollEventThrottle={500} // Log every 500ms during scroll
    >
      <HeroSection />
      <ActivitySection />
      <RecommendedToursSection />
      <SubscribeSection />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default HomeScreen; 