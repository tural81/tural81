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

const TEAM_MEMBERS = [
  { id: '1', name: 'Tural Yusifov', rank: 1, km: 3700, badge: 'platinum' },
  { id: '2', name: 'Ashley Cole', rank: 2, km: 7000, badge: 'diamond' },
  { id: '3', name: 'Alex Fergusson', rank: 3, km: 2500, badge: 'gold' },
  { id: '4', name: 'Natalie Watson', rank: 4, km: 200, badge: 'silver' },
  { id: '5', name: 'David Beckham', rank: 5, km: 150, badge: 'silver' },
];

const BADGE_COLORS = {
  diamond: '#B9F2FF',
  platinum: '#E5E4E2',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
};

export default function TeamScreen({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Team Info */}
        <View style={styles.teamInfo}>
          <View
            style={[styles.teamIcon, { backgroundColor: colors.accent + '20' }]}
          >
            <Ionicons name="shield" size={40} color={colors.accent} />
          </View>
          <Text style={[styles.teamName, { color: colors.text }]}>
            INTERMITTENT FASTERS
          </Text>
          <Text style={[styles.teamDescription, { color: colors.textSecondary }]}>
            A team for runners who practice intermittent fasting
          </Text>

          <View style={styles.teamStats}>
            <View style={styles.teamStat}>
              <Text style={[styles.teamStatValue, { color: colors.text }]}>
                {TEAM_MEMBERS.length}
              </Text>
              <Text
                style={[styles.teamStatLabel, { color: colors.textSecondary }]}
              >
                Members
              </Text>
            </View>
            <View
              style={[styles.teamStatDivider, { backgroundColor: colors.card }]}
            />
            <View style={styles.teamStat}>
              <Text style={[styles.teamStatValue, { color: colors.text }]}>
                {TEAM_MEMBERS.reduce((sum, m) => sum + m.km, 0).toLocaleString()}
              </Text>
              <Text
                style={[styles.teamStatLabel, { color: colors.textSecondary }]}
              >
                Total km
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.joinButton, { backgroundColor: colors.accent }]}
          >
            <Ionicons name="add" size={20} color={colors.buttonText} />
            <Text style={[styles.joinButtonText, { color: colors.buttonText }]}>
              Join Team
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rankings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Rankings
          </Text>

          {TEAM_MEMBERS.map((member) => (
            <TouchableOpacity
              key={member.id}
              style={[styles.memberCard, { backgroundColor: colors.card }]}
              onPress={() =>
                navigation.navigate('Profile', { userId: member.id })
              }
            >
              <View style={styles.rankBadge}>
                <Text
                  style={[
                    styles.rankText,
                    {
                      color:
                        member.rank <= 3 ? colors.accent : colors.textSecondary,
                    },
                  ]}
                >
                  #{member.rank}
                </Text>
              </View>

              <View
                style={[
                  styles.memberAvatar,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Ionicons name="person" size={20} color={colors.accent} />
              </View>

              <View style={styles.memberInfo}>
                <Text style={[styles.memberName, { color: colors.text }]}>
                  {member.name}
                </Text>
                <View style={styles.memberBadgeRow}>
                  <Ionicons
                    name="medal"
                    size={14}
                    color={BADGE_COLORS[member.badge]}
                  />
                  <Text
                    style={[
                      styles.memberKm,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {member.km.toLocaleString()} km
                  </Text>
                </View>
              </View>

              {member.rank <= 3 && (
                <Text style={styles.trophyEmoji}>
                  {member.rank === 1
                    ? '🥇'
                    : member.rank === 2
                    ? '🥈'
                    : '🥉'}
                </Text>
              )}
            </TouchableOpacity>
          ))}
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
  teamInfo: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  teamIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  teamName: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  teamDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 20,
  },
  teamStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 24,
  },
  teamStat: {
    alignItems: 'center',
  },
  teamStatValue: {
    fontSize: 20,
    fontWeight: '800',
  },
  teamStatLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  teamStatDivider: {
    width: 1,
    height: 32,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    marginTop: 20,
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    gap: 12,
  },
  rankBadge: {
    width: 32,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 15,
    fontWeight: '800',
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInfo: {
    flex: 1,
    gap: 4,
  },
  memberName: {
    fontSize: 15,
    fontWeight: '600',
  },
  memberBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  memberKm: {
    fontSize: 12,
  },
  trophyEmoji: {
    fontSize: 20,
  },
});
