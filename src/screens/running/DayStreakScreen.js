import React from 'react';
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

const { width } = Dimensions.get('window');

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const COMPLETED_DAYS = [true, true, true, true, true, false, false]; // Mon-Fri done

export default function DayStreakScreen({ navigation, route }) {
  const { colors } = useTheme();
  const stats = route?.params?.stats;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.navigate('MainApp')}
      >
        <Ionicons name="close" size={28} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Streak Badge */}
        <View style={styles.streakSection}>
          <Text style={styles.fireEmoji}>🔥</Text>
          <Text style={[styles.streakNumber, { color: colors.accent }]}>
            21
          </Text>
          <Text style={[styles.streakLabel, { color: colors.text }]}>
            Day Streak!
          </Text>
        </View>

        {/* Run Stats (if coming from running screen) */}
        {stats && (
          <View
            style={[styles.runStatsCard, { backgroundColor: colors.card }]}
          >
            <Text style={[styles.runStatsTitle, { color: colors.accent }]}>
              Today's Run
            </Text>
            <View style={styles.runStatsRow}>
              <View style={styles.runStat}>
                <Text style={[styles.runStatValue, { color: colors.text }]}>
                  {stats.distance}
                </Text>
                <Text
                  style={[
                    styles.runStatLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  KM
                </Text>
              </View>
              <View style={styles.runStat}>
                <Text style={[styles.runStatValue, { color: colors.text }]}>
                  {stats.time}
                </Text>
                <Text
                  style={[
                    styles.runStatLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Time
                </Text>
              </View>
              <View style={styles.runStat}>
                <Text style={[styles.runStatValue, { color: colors.text }]}>
                  {stats.calories}
                </Text>
                <Text
                  style={[
                    styles.runStatLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Cal
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Weekly Progress */}
        <View style={styles.weekSection}>
          <Text style={[styles.weekTitle, { color: colors.text }]}>
            This Week
          </Text>
          <View style={styles.daysRow}>
            {DAYS.map((day, index) => (
              <View key={day} style={styles.dayItem}>
                <View
                  style={[
                    styles.dayCircle,
                    {
                      backgroundColor: COMPLETED_DAYS[index]
                        ? colors.accent
                        : colors.card,
                    },
                  ]}
                >
                  {COMPLETED_DAYS[index] && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={colors.buttonText}
                    />
                  )}
                </View>
                <Text
                  style={[
                    styles.dayText,
                    {
                      color: COMPLETED_DAYS[index]
                        ? colors.accent
                        : colors.textSecondary,
                    },
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Message */}
        <View
          style={[styles.messageCard, { backgroundColor: colors.card }]}
        >
          <Ionicons name="time" size={22} color={colors.accent} />
          <Text style={[styles.messageText, { color: colors.textSecondary }]}>
            Don't forget to run tomorrow, extend your daily streak to{' '}
            <Text style={{ color: colors.accent, fontWeight: '700' }}>
              22 days
            </Text>
            !
          </Text>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.shareButton, { backgroundColor: colors.card }]}
        >
          <Ionicons name="share-social" size={20} color={colors.text} />
          <Text style={[styles.shareText, { color: colors.text }]}>
            Share Streak
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.doneButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('MainApp')}
        >
          <Text style={[styles.doneText, { color: colors.buttonText }]}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  streakSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 32,
  },
  fireEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  streakNumber: {
    fontSize: 64,
    fontWeight: '900',
  },
  streakLabel: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: -4,
  },
  runStatsCard: {
    width: '100%',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
  },
  runStatsTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  runStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  runStat: {
    alignItems: 'center',
  },
  runStatValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  runStatLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  weekSection: {
    width: '100%',
    marginBottom: 24,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dayItem: {
    alignItems: 'center',
    gap: 8,
  },
  dayCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 16,
    width: '100%',
  },
  messageText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    height: 52,
    borderRadius: 26,
  },
  shareText: {
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
