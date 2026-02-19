import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const { width, height } = Dimensions.get('window');

const MOTIVATIONAL_QUOTES = [
  "You're doing great! Keep pushing!",
  'Every step counts towards your goal.',
  "Don't stop when you're tired, stop when you're done.",
  'Running is the greatest metaphor for life.',
  'The miracle isn\'t finishing. The miracle is beginning.',
];

export default function RunningScreen({ navigation }) {
  const { colors } = useTheme();
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const intervalRef = useRef(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
        setDistance((prev) => prev + 0.002 + Math.random() * 0.001);
        setCalories((prev) => prev + 0.12 + Math.random() * 0.05);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % MOTIVATIONAL_QUOTES.length);
    }, 8000);
    return () => clearInterval(quoteInterval);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    navigation.navigate('DayStreak', {
      stats: {
        distance: distance.toFixed(1),
        time: formatTime(seconds),
        calories: Math.round(calories),
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        {isRunning && (
          <View style={[styles.streakBadge, { backgroundColor: colors.card }]}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={[styles.streakText, { color: colors.accent }]}>
              3 days
            </Text>
          </View>
        )}
      </View>

      {/* Map Placeholder */}
      <View style={[styles.mapArea, { backgroundColor: colors.card }]}>
        <View style={styles.mapContent}>
          <Ionicons name="navigate" size={60} color={colors.accent + '40'} />
          {!isRunning && (
            <Text style={[styles.mapText, { color: colors.textSecondary }]}>
              GPS will track your route
            </Text>
          )}
          {isRunning && (
            <View style={styles.routeSimulation}>
              <View
                style={[styles.routeDot, { backgroundColor: colors.accent }]}
              />
              <View
                style={[
                  styles.routeLine,
                  { backgroundColor: colors.accent + '50' },
                ]}
              />
              <View
                style={[
                  styles.routeDotSmall,
                  { backgroundColor: colors.accent + '70' },
                ]}
              />
            </View>
          )}
        </View>
      </View>

      {/* Stats */}
      <View style={[styles.statsPanel, { backgroundColor: colors.background }]}>
        {/* Motivational Quote */}
        {isRunning && (
          <View style={styles.quoteContainer}>
            <Text style={[styles.quoteText, { color: colors.accent }]}>
              "{MOTIVATIONAL_QUOTES[quoteIndex]}"
            </Text>
          </View>
        )}

        <View style={styles.mainStats}>
          <View style={styles.mainStat}>
            <Text style={[styles.mainStatValue, { color: colors.text }]}>
              {distance.toFixed(1)}
            </Text>
            <Text style={[styles.mainStatUnit, { color: colors.accent }]}>
              KM
            </Text>
            <Text
              style={[styles.mainStatLabel, { color: colors.textSecondary }]}
            >
              Distance
            </Text>
          </View>

          <View
            style={[styles.statSeparator, { backgroundColor: colors.card }]}
          />

          <View style={styles.mainStat}>
            <Text style={[styles.mainStatValue, { color: colors.text }]}>
              {Math.round(calories)}
            </Text>
            <Text style={[styles.mainStatUnit, { color: colors.accent }]}>
              cal
            </Text>
            <Text
              style={[styles.mainStatLabel, { color: colors.textSecondary }]}
            >
              Calories
            </Text>
          </View>

          <View
            style={[styles.statSeparator, { backgroundColor: colors.card }]}
          />

          <View style={styles.mainStat}>
            <Text style={[styles.mainStatValue, { color: colors.text }]}>
              {formatTime(seconds)}
            </Text>
            <Text
              style={[styles.mainStatLabel, { color: colors.textSecondary }]}
            >
              Time
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {!isRunning ? (
            <TouchableOpacity
              style={[styles.startButton, { backgroundColor: colors.accent }]}
              onPress={handleStart}
            >
              <Ionicons name="play" size={36} color={colors.buttonText} />
              <Text
                style={[styles.startButtonText, { color: colors.buttonText }]}
              >
                START
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.runningControls}>
              <TouchableOpacity
                style={[styles.stopButton, { backgroundColor: '#FF3B30' }]}
                onPress={handleStop}
              >
                <Ionicons name="stop" size={28} color="#FFFFFF" />
                <Text style={styles.controlButtonText}>Stop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.pauseButton,
                  {
                    backgroundColor: isPaused
                      ? colors.accent
                      : colors.card,
                  },
                ]}
                onPress={isPaused ? handleResume : handlePause}
              >
                <Ionicons
                  name={isPaused ? 'play' : 'pause'}
                  size={28}
                  color={isPaused ? colors.buttonText : colors.text}
                />
                <Text
                  style={[
                    styles.controlButtonText,
                    {
                      color: isPaused ? colors.buttonText : colors.text,
                    },
                  ]}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  streakEmoji: {
    fontSize: 16,
  },
  streakText: {
    fontSize: 13,
    fontWeight: '700',
  },
  mapArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContent: {
    alignItems: 'center',
    gap: 16,
  },
  mapText: {
    fontSize: 15,
  },
  routeSimulation: {
    position: 'absolute',
    top: 0,
    left: -40,
    right: -40,
    bottom: -20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  routeLine: {
    width: 3,
    height: 60,
  },
  routeDotSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statsPanel: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  quoteContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  quoteText: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  mainStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 28,
  },
  mainStat: {
    alignItems: 'center',
    flex: 1,
  },
  mainStatValue: {
    fontSize: 32,
    fontWeight: '800',
  },
  mainStatUnit: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: -2,
  },
  mainStatLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statSeparator: {
    width: 1,
    height: 40,
  },
  controls: {
    alignItems: 'center',
  },
  startButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '800',
  },
  runningControls: {
    flexDirection: 'row',
    gap: 20,
  },
  stopButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  pauseButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
