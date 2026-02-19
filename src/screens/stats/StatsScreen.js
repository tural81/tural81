import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const WEEKLY_DATA = [
  { day: 'Mon', km: 5.2 },
  { day: 'Tue', km: 3.8 },
  { day: 'Wed', km: 7.1 },
  { day: 'Thu', km: 4.5 },
  { day: 'Fri', km: 6.3 },
  { day: 'Sat', km: 8.2 },
  { day: 'Sun', km: 0 },
];

const maxKm = Math.max(...WEEKLY_DATA.map((d) => d.km));

export default function StatsScreen() {
  const { colors } = useTheme();
  const [period, setPeriod] = useState('week');

  const totalKm = WEEKLY_DATA.reduce((sum, d) => sum + d.km, 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Statistics</Text>
        </View>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['week', 'month', 'year'].map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                styles.periodButton,
                {
                  backgroundColor:
                    period === p ? colors.accent : colors.card,
                },
              ]}
              onPress={() => setPeriod(p)}
            >
              <Text
                style={[
                  styles.periodText,
                  {
                    color:
                      period === p ? colors.buttonText : colors.textSecondary,
                  },
                ]}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Overview Cards */}
        <View style={styles.overviewRow}>
          <View style={[styles.overviewCard, { backgroundColor: colors.card }]}>
            <Ionicons name="walk" size={24} color={colors.accent} />
            <Text style={[styles.overviewValue, { color: colors.text }]}>
              {totalKm.toFixed(1)}
            </Text>
            <Text
              style={[styles.overviewLabel, { color: colors.textSecondary }]}
            >
              Total KM
            </Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: colors.card }]}>
            <Ionicons name="flame" size={24} color="#FF6B35" />
            <Text style={[styles.overviewValue, { color: colors.text }]}>
              2,340
            </Text>
            <Text
              style={[styles.overviewLabel, { color: colors.textSecondary }]}
            >
              Calories
            </Text>
          </View>
          <View style={[styles.overviewCard, { backgroundColor: colors.card }]}>
            <Ionicons name="time" size={24} color="#4A7AFF" />
            <Text style={[styles.overviewValue, { color: colors.text }]}>
              5:28
            </Text>
            <Text
              style={[styles.overviewLabel, { color: colors.textSecondary }]}
            >
              Avg Pace
            </Text>
          </View>
        </View>

        {/* Bar Chart */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Distance (km)
          </Text>
          <View style={styles.chart}>
            {WEEKLY_DATA.map((data) => (
              <View key={data.day} style={styles.barContainer}>
                <View style={styles.barWrapper}>
                  <View
                    style={[
                      styles.bar,
                      {
                        backgroundColor:
                          data.km > 0 ? colors.accent : colors.card,
                        height: `${
                          data.km > 0 ? (data.km / maxKm) * 100 : 5
                        }%`,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[styles.barLabel, { color: colors.textSecondary }]}
                >
                  {data.day}
                </Text>
                <Text style={[styles.barValue, { color: colors.text }]}>
                  {data.km > 0 ? data.km : '-'}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Records */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Personal Records
          </Text>
          <View style={[styles.recordCard, { backgroundColor: colors.card }]}>
            <View style={styles.recordRow}>
              <View style={styles.recordItem}>
                <Ionicons name="trophy" size={20} color="#FFD700" />
                <View>
                  <Text style={[styles.recordValue, { color: colors.text }]}>
                    15.2 km
                  </Text>
                  <Text
                    style={[
                      styles.recordLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Longest Run
                  </Text>
                </View>
              </View>
              <View style={styles.recordItem}>
                <Ionicons name="speedometer" size={20} color={colors.accent} />
                <View>
                  <Text style={[styles.recordValue, { color: colors.text }]}>
                    4:12 /km
                  </Text>
                  <Text
                    style={[
                      styles.recordLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Best Pace
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.recordRow}>
              <View style={styles.recordItem}>
                <Ionicons name="flame" size={20} color="#FF6B35" />
                <View>
                  <Text style={[styles.recordValue, { color: colors.text }]}>
                    847 cal
                  </Text>
                  <Text
                    style={[
                      styles.recordLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Most Calories
                  </Text>
                </View>
              </View>
              <View style={styles.recordItem}>
                <Ionicons name="calendar" size={20} color="#34C759" />
                <View>
                  <Text style={[styles.recordValue, { color: colors.text }]}>
                    21 days
                  </Text>
                  <Text
                    style={[
                      styles.recordLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Best Streak
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 24,
  },
  periodButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
  overviewRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 10,
    marginBottom: 28,
  },
  overviewCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  overviewLabel: {
    fontSize: 11,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  barWrapper: {
    flex: 1,
    width: '60%',
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 6,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
  },
  recordCard: {
    borderRadius: 20,
    padding: 20,
    gap: 20,
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  recordValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  recordLabel: {
    fontSize: 11,
    marginTop: 2,
  },
});
