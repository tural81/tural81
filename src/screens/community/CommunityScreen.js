import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const TEAMS = [
  {
    id: '1',
    name: 'INTERMITTENT FASTERS',
    members: 5,
    totalKm: 13550,
  },
  {
    id: '2',
    name: 'MORNING RUNNERS',
    members: 12,
    totalKm: 45200,
  },
  {
    id: '3',
    name: 'TRAIL BLAZERS',
    members: 8,
    totalKm: 22300,
  },
];

const CONNECTIONS = [
  { id: '1', name: 'Ashley Cole', status: 'Running now', badge: 'diamond' },
  { id: '2', name: 'Natalie Watson', status: 'Last run 2h ago', badge: 'silver' },
  { id: '3', name: 'Alex Fergusson', status: 'Offline', badge: 'gold' },
  { id: '4', name: 'David Beckham', status: 'Running now', badge: 'silver' },
];

const LEADERBOARD = [
  { id: '1', name: 'Ashley Cole', km: 142, rank: 1 },
  { id: '2', name: 'Tural Yusifov', km: 128, rank: 2 },
  { id: '3', name: 'Alex Fergusson', km: 115, rank: 3 },
];

export default function CommunityScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Community</Text>
        </View>

        {/* Weekly Leaderboard */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Weekly Leaderboard
            </Text>
          </View>

          <View
            style={[styles.leaderboardCard, { backgroundColor: colors.card }]}
          >
            {LEADERBOARD.map((runner) => (
              <TouchableOpacity
                key={runner.id}
                style={styles.leaderRow}
                onPress={() =>
                  navigation.navigate('Profile', { userId: runner.id })
                }
              >
                <Text
                  style={[
                    styles.leaderRank,
                    {
                      color:
                        runner.rank === 1
                          ? '#FFD700'
                          : runner.rank === 2
                          ? '#C0C0C0'
                          : '#CD7F32',
                    },
                  ]}
                >
                  {runner.rank === 1
                    ? '🥇'
                    : runner.rank === 2
                    ? '🥈'
                    : '🥉'}
                </Text>
                <View
                  style={[
                    styles.leaderAvatar,
                    { backgroundColor: colors.accent + '20' },
                  ]}
                >
                  <Ionicons
                    name="person"
                    size={18}
                    color={colors.accent}
                  />
                </View>
                <Text
                  style={[styles.leaderName, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {runner.name}
                </Text>
                <Text style={[styles.leaderKm, { color: colors.accent }]}>
                  {runner.km} km
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* My Connections */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              My Connections
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.accent }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {CONNECTIONS.map((person) => (
            <TouchableOpacity
              key={person.id}
              style={[
                styles.connectionCard,
                { backgroundColor: colors.card },
              ]}
              onPress={() =>
                navigation.navigate('Profile', { userId: person.id })
              }
            >
              <View
                style={[
                  styles.connectionAvatar,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Ionicons
                  name="person"
                  size={20}
                  color={colors.accent}
                />
              </View>
              <View style={styles.connectionInfo}>
                <Text
                  style={[styles.connectionName, { color: colors.text }]}
                >
                  {person.name}
                </Text>
                <View style={styles.statusRow}>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          person.status === 'Running now'
                            ? '#34C759'
                            : colors.textSecondary,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.connectionStatus,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {person.status}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>
                <Ionicons
                  name="chatbubble-outline"
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* My Teams */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              My Teams
            </Text>
            <TouchableOpacity>
              <Text style={[styles.seeAll, { color: colors.accent }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {TEAMS.map((team) => (
            <TouchableOpacity
              key={team.id}
              style={[styles.teamCard, { backgroundColor: colors.card }]}
              onPress={() => navigation.navigate('Team', { team })}
            >
              <View
                style={[
                  styles.teamIcon,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Ionicons name="shield" size={24} color={colors.accent} />
              </View>
              <View style={styles.teamInfo}>
                <Text style={[styles.teamName, { color: colors.text }]}>
                  {team.name}
                </Text>
                <Text
                  style={[
                    styles.teamMeta,
                    { color: colors.textSecondary },
                  ]}
                >
                  {team.members} members · {team.totalKm.toLocaleString()} km
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
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '600',
  },
  leaderboardCard: {
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 6,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  leaderRank: {
    fontSize: 20,
    width: 30,
    textAlign: 'center',
  },
  leaderAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  leaderKm: {
    fontSize: 14,
    fontWeight: '700',
  },
  connectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 8,
  },
  connectionAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectionInfo: {
    flex: 1,
    gap: 4,
  },
  connectionName: {
    fontSize: 15,
    fontWeight: '600',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  connectionStatus: {
    fontSize: 12,
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 8,
  },
  teamIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamInfo: {
    flex: 1,
    gap: 4,
  },
  teamName: {
    fontSize: 15,
    fontWeight: '700',
  },
  teamMeta: {
    fontSize: 12,
  },
});
