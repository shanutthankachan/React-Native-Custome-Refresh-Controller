import React, { useState, useRef } from 'react';
import { View, ActivityIndicator, PanResponder, Animated, StyleSheet } from 'react-native';

const CustomRefreshController = ({ 
  children, 
  onRefresh, 
  loaderColor = '#0000ff',   // Default loader color
  loaderSize = 'large',      // Default loader size
  loaderBackground = 'rgba(255, 255, 255, 0.6)' // Default background for loader overlay
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const pullDown = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0, // Start gesture if user pulls down
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0 && !refreshing) {
          pullDown.setValue(gestureState.dy); // Update the position as the user pulls down
        }
      },
      onPanResponderRelease: async (_, gestureState) => {
        if (gestureState.dy > 100 && !refreshing) {
          await handleRefresh(); // Await the refresh handler
        }
        resetPullDown();
      }
    })
  ).current;

  const handleRefresh = async () => {
    setRefreshing(true);

    if (onRefresh) {
      try {
        await onRefresh(); // Await onRefresh if provided
      } finally {
        setRefreshing(false);
        resetPullDown();
      }
    } else {
      // Simulate delay if no onRefresh function is provided
      setTimeout(() => {
        setRefreshing(false);
        resetPullDown();
      }, 2000);
    }
  };

  const resetPullDown = () => {
    Animated.timing(pullDown, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      {children}
      {refreshing && (
        <View style={[styles.loaderContainer, { backgroundColor: loaderBackground }]}>
          <ActivityIndicator size={loaderSize} color={loaderColor} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Allows the loader to be positioned absolutely
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject, // Position loader to cover the entire screen
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CustomRefreshController;
