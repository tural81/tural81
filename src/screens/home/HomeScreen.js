import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const { width } = Dimensions.get('window');

const NEARBY_RUNNERS = [
  { id: '1', name: 'Ashley Cole', distance: '0.5 km', pace: '5:30', avatar: null },
  { id: '2', name: 'Natalie Watson', distance: '1.2 km', pace: '6:00', avatar: null },
  { id: '3', name: 'Alex Ferguson', distance: '2.0 km', pace: '5:45', avatar: null },
];

const UPCOMING_EVENTS = [
  {
    id: '1',
    title: 'Founders Running Club',
    location: 'Dubai, UAE',
    date: 'Sat, 15 Mar',
    time: '17:00',
    attendees: 700,
  },
  {
    id: '2',
    title: 'Morning Run Group',
    location: 'Baku, Azerbaijan',
    date: 'Sun, 16 Mar',
    time: '07:00',
    attendees: 45,
  },
];

export default function HomeScreen({ navigation }) {
  const { colors, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Good morning
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              Tural
            </Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: colors.card }]}
            >
              <Ionicons name="notifications-outline" size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.avatarButton, { backgroundColor: colors.accent }]}
              onPress={() => navigation.navigate('Profile', { userId: 'me' })}
            >
              <Ionicons name="person" size={20} color={colors.buttonText} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Start Running Card */}
        <TouchableOpacity
          style={[styles.startCard, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('Running')}
        >
          <View style={styles.startCardContent}>
            <View style={styles.startCardLeft}>
              <Text style={[styles.startCardTitle, { color: colors.buttonText }]}>
                Start Running
              </Text>
              <Text
                style={[styles.startCardSubtitle, { color: colors.buttonText + 'AA' }]}
              >
                Track your run with GPS
              </Text>
            </View>
            <View
              style={[
                styles.startIconCircle,
                { backgroundColor: colors.buttonText + '30' },
              ]}
            >
              <Ionicons name="play" size={32} color={colors.buttonText} />
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.buttonText }]}>
                🔥 3
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.buttonText + 'AA' }]}
              >
                Day Streak
              </Text>
            </View>
            <View
              style={[
                styles.statDivider,
                { backgroundColor: colors.buttonText + '30' },
              ]}
            />
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.buttonText }]}>
                12.5 km
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.buttonText + 'AA' }]}
              >
                This Week
              </Text>
            </View>
            <View
              style={[
                styles.statDivider,
                { backgroundColor: colors.buttonText + '30' },
              ]}
            />
            <View style={styles.statBox}>
              <Text style={[styles.statValue, { color: colors.buttonText }]}>
                5:42
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.buttonText + 'AA' }]}
              >
                Avg Pace
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Day Streak Banner */}
        <TouchableOpacity
          style={[styles.streakBanner, { backgroundColor: colors.card }]}
          onPress={() => navigation.navigate('DayStreak')}
        >
          <Text style={styles.streakEmoji}>🔥</Text>
          <View style={styles.streakInfo}>
            <Text style={[styles.streakTitle, { color: colors.text }]}>
              21 Day Streak!
            </Text>
            <Text
              style={[styles.streakSubtitle, { color: colors.textSecondary }]}
            >
              Don't forget to run tomorrow
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        {/* People Around You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              People around you
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.accent }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {NEARBY_RUNNERS.map((runner) => (
              <TouchableOpacity
                key={runner.id}
                style={[styles.runnerCard, { backgroundColor: colors.card }]}
                onPress={() =>
                  navigation.navigate('Profile', { userId: runner.id })
                }
              >
                <View
                  style={[
                    styles.runnerAvatar,
                    { backgroundColor: colors.accent + '30' },
                  ]}
                >
                  <Ionicons
                    name="person"
                    size={24}
                    color={colors.accent}
                  />
                </View>
                <Text
                  style={[styles.runnerName, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {runner.name}
                </Text>
                <Text
                  style={[
                    styles.runnerDistance,
                    { color: colors.textSecondary },
                  ]}
                >
                  {runner.distance} away
                </Text>
                <Text style={[styles.runnerPace, { color: colors.accent }]}>
                  {runner.pace} /km
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Upcoming Events
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.accent }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {UPCOMING_EVENTS.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { backgroundColor: colors.card }]}
              onPress={() =>
                navigation.navigate('EventDetail', { event })
              }
            >
              <View
                style={[
                  styles.eventDateBadge,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Text style={[styles.eventDateText, { color: colors.accent }]}>
                  {event.date.split(', ')[1]}
                </Text>
                <Text
                  style={[styles.eventMonthText, { color: colors.accent }]}
                >
                  {event.date.split(', ')[0]}
                </Text>
              </View>
              <View style={styles.eventInfo}>
                <Text
                  style={[styles.eventTitle, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {event.title}
                </Text>
                <Text
                  style={[
                    styles.eventLocation,
                    { color: colors.textSecondary },
                  ]}
                >
                  {event.location} · {event.time}
                </Text>
                <Text
                  style={[styles.eventAttendees, { color: colors.accent }]}
                >
                  {event.attendees} people joined
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          ))}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startCard: {
    marginHorizontal: 24,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  startCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  startCardLeft: {},
  startCardTitle: {
    fontSize: 22,
    fontWeight: '800',
  },
  startCardSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  startIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
  },
  streakBanner: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  streakEmoji: {
    fontSize: 28,
  },
  streakInfo: {
    flex: 1,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  streakSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  runnerCard: {
    width: 130,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginLeft: 16,
    gap: 8,
  },
  runnerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  runnerName: {
    fontSize: 13,
    fontWeight: '600',
  },
  runnerDistance: {
    fontSize: 11,
  },
  runnerPace: {
    fontSize: 12,
    fontWeight: '700',
  },
  eventCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  eventDateBadge: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDateText: {
    fontSize: 16,
    fontWeight: '800',
  },
  eventMonthText: {
    fontSize: 10,
    fontWeight: '600',
  },
  eventInfo: {
    flex: 1,
    gap: 2,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  eventLocation: {
    fontSize: 12,
  },
  eventAttendees: {
    fontSize: 12,
    fontWeight: '600',
  },
});
