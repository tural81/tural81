import React from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Dimensions,
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDER_WIDTH = SCREEN_WIDTH - 48;
const THUMB_SIZE = 28;

export default function Slider({ min, max, value, onValueChange, accentColor, trackColor }) {
  const range = max - min;
  const percentage = ((value - min) / range) * 100;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gestureState) => {
      updateValue(gestureState);
    },
    onPanResponderMove: (_, gestureState) => {
      updateValue(gestureState);
    },
  });

  const updateValue = (gestureState) => {
    const x = gestureState.moveX - 24;
    const ratio = Math.max(0, Math.min(1, x / SLIDER_WIDTH));
    const newValue = Math.round(min + ratio * range);
    onValueChange(newValue);
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View style={[styles.track, { backgroundColor: trackColor }]}>
        <View
          style={[
            styles.fill,
            { backgroundColor: accentColor, width: `${percentage}%` },
          ]}
        />
      </View>
      <View
        style={[
          styles.thumb,
          {
            backgroundColor: accentColor,
            left: `${percentage}%`,
            marginLeft: -(THUMB_SIZE / 2),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
