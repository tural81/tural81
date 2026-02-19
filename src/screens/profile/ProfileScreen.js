import React from 'react';
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

const BADGE_CONFIG = {
  diamond: { label: 'Diamond', icon: 'diamond', minKm: 5000, color: '#B9F2FF' },
  platinum: { label: 'Platinum', icon: 'medal', minKm: 3000, color: '#E5E4E2' },
  gold: { label: 'Gold', icon: 'medal', minKm: 1000, color: '#FFD700' },
  silver: { label: 'Silver', icon: 'medal', minKm: 100, color: '#C0C0C0' },
  bronze: { label: 'Bronze', icon: 'medal', minKm: 0, color: '#CD7F32' },
};

const MOCK_PROFILE = {
  name: 'Tural Yusifov',
  username: '@tural81',
  totalKm: 3700,
  badge: 'platinum',
  weight: '78 kg',
  goal: '5:00 /km',
  steps: '12,450',
  connections: 156,
  teams: 3,
  lastActivity: {
    distance: '5.2 km',
    time: '28:30',
    pace: '5:28 /km',
    date: 'Today',
  },
  preferences: {
    location: 'Park, Trail',
    pace: '5:00 /km',
    frequency: 'Daily',
    goal: 'Stay Fit',
  },
};

export default function ProfileScreen({ navigation, route }) {
  const { colors } = useTheme();
  const profile = MOCK_PROFILE;
  const badge = BADGE_CONFIG[profile.badge];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View
            style={[
              styles.avatarLarge,
              { backgroundColor: colors.accent + '30' },
            ]}
          >
            <Ionicons name="person" size={48} color={colors.accent} />
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>
            {profile.name}
          </Text>
          <Text style={[styles.profileUsername, { color: colors.textSecondary }]}>
            {profile.username}
          </Text>

          {/* Badge */}
          <View
            style={[styles.badgeContainer, { backgroundColor: colors.card }]}
          >
            <Ionicons
              name={badge.icon}
              size={20}
              color={badge.color}
            />
            <Text style={[styles.badgeText, { color: badge.color }]}>
              {badge.label}
            </Text>
            <Text style={[styles.badgeKm, { color: colors.textSecondary }]}>
              {profile.totalKm.toLocaleString()} km
            </Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {profile.weight}
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.textSecondary }]}
              >
                Weight
              </Text>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.card }]}
            />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {profile.goal}
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.textSecondary }]}
              >
                Goal
              </Text>
            </View>
            <View
              style={[styles.statDivider, { backgroundColor: colors.card }]}
            />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {profile.steps}
              </Text>
              <Text
                style={[styles.statLabel, { color: colors.textSecondary }]}
              >
                Steps
              </Text>
            </View>
          </View>

          {/* Connection / Team counts */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card }]}
            >
              <Ionicons name="people" size={18} color={colors.accent} />
              <Text style={[styles.socialText, { color: colors.text }]}>
                {profile.connections} Connections
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialButton, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('Team')}
            >
              <Ionicons name="shield" size={18} color={colors.accent} />
              <Text style={[styles.socialText, { color: colors.text }]}>
                {profile.teams} Teams
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Last Activity */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Last Activity
          </Text>
          <View style={[styles.activityCard, { backgroundColor: colors.card }]}>
            <View style={styles.activityHeader}>
              <Ionicons name="walk" size={20} color={colors.accent} />
              <Text
                style={[styles.activityDate, { color: colors.textSecondary }]}
              >
                {profile.lastActivity.date}
              </Text>
            </View>
            <View style={styles.activityStats}>
              <View style={styles.activityStat}>
                <Text
                  style={[styles.activityValue, { color: colors.text }]}
                >
                  {profile.lastActivity.distance}
                </Text>
                <Text
                  style={[
                    styles.activityLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Distance
                </Text>
              </View>
              <View style={styles.activityStat}>
                <Text
                  style={[styles.activityValue, { color: colors.text }]}
                >
                  {profile.lastActivity.time}
                </Text>
                <Text
                  style={[
                    styles.activityLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Time
                </Text>
              </View>
              <View style={styles.activityStat}>
                <Text
                  style={[styles.activityValue, { color: colors.text }]}
                >
                  {profile.lastActivity.pace}
                </Text>
                <Text
                  style={[
                    styles.activityLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  Pace
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Running Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Running Preferences
          </Text>
          <View style={[styles.preferencesCard, { backgroundColor: colors.card }]}>
            {Object.entries(profile.preferences).map(([key, value]) => (
              <View key={key} style={styles.preferenceRow}>
                <Text
                  style={[
                    styles.preferenceLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text style={[styles.preferenceValue, { color: colors.text }]}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Connect Button */}
        <View style={styles.connectSection}>
          <TouchableOpacity
            style={[styles.connectButton, { backgroundColor: colors.accent }]}
          >
            <Ionicons
              name="person-add"
              size={20}
              color={colors.buttonText}
            />
            <Text
              style={[styles.connectText, { color: colors.buttonText }]}
            >
              Connect
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
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
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
  },
  profileUsername: {
    fontSize: 14,
    marginTop: 4,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 12,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
  },
  badgeKm: {
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
  },
  socialText: {
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  activityCard: {
    borderRadius: 20,
    padding: 20,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  activityDate: {
    fontSize: 13,
  },
  activityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  activityStat: {
    alignItems: 'center',
  },
  activityValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  activityLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  preferencesCard: {
    borderRadius: 20,
    padding: 20,
    gap: 16,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  preferenceLabel: {
    fontSize: 14,
  },
  preferenceValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  connectSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  connectButton: {
    height: 52,
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  connectText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
