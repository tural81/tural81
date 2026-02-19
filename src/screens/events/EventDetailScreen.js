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

const ORGANIZERS = [
  { id: '1', name: 'Ahmed Al-Rashid' },
  { id: '2', name: 'Sarah Johnson' },
  { id: '3', name: 'Mike Chen' },
];

export default function EventDetailScreen({ navigation, route }) {
  const { colors } = useTheme();
  const event = route?.params?.event || {
    title: 'Founders Running Club',
    location: 'Dubai, UAE',
    date: 'Sat, 15 Mar',
    time: '17:00',
    attendees: 700,
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.card }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerButton, { backgroundColor: colors.card }]}
        >
          <Ionicons name="share-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Event Banner */}
        <View
          style={[styles.banner, { backgroundColor: colors.accent + '15' }]}
        >
          <View
            style={[styles.bannerIcon, { backgroundColor: colors.accent + '30' }]}
          >
            <Ionicons name="flag" size={40} color={colors.accent} />
          </View>
          <Text style={[styles.bannerTag, { color: colors.accent }]}>
            FRC :: Asia
          </Text>
        </View>

        {/* Event Info */}
        <View style={styles.eventInfo}>
          <Text style={[styles.eventTitle, { color: colors.text }]}>
            {event.title} | {event.location.split(', ')[0]}
          </Text>

          <View style={[styles.tagContainer, { backgroundColor: colors.card }]}>
            <Text style={[styles.tag, { color: colors.accent }]}>#Fitness</Text>
          </View>

          {/* Date & Time */}
          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: colors.card }]}>
              <Ionicons name="calendar" size={20} color={colors.accent} />
            </View>
            <View>
              <Text style={[styles.detailTitle, { color: colors.text }]}>
                Saturday, 15 March
              </Text>
              <Text
                style={[styles.detailSubtitle, { color: colors.textSecondary }]}
              >
                17:00 - 20:00 GMT+4
              </Text>
            </View>
          </View>

          {/* Location */}
          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: colors.card }]}>
              <Ionicons name="location" size={20} color={colors.accent} />
            </View>
            <View>
              <Text style={[styles.detailTitle, { color: colors.text }]}>
                Salt Kite Beach
              </Text>
              <Text
                style={[styles.detailSubtitle, { color: colors.textSecondary }]}
              >
                {event.location}
              </Text>
            </View>
          </View>

          {/* Attendees */}
          <View style={styles.detailRow}>
            <View style={[styles.detailIcon, { backgroundColor: colors.card }]}>
              <Ionicons name="people" size={20} color={colors.accent} />
            </View>
            <View>
              <Text style={[styles.detailTitle, { color: colors.text }]}>
                {event.attendees} people joined
              </Text>
              <Text
                style={[styles.detailSubtitle, { color: colors.textSecondary }]}
              >
                Open registration
              </Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            About
          </Text>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            Join us for an amazing evening run along the beautiful Dubai
            coastline. Whether you're a beginner or an experienced runner,
            everyone is welcome! We'll start at Salt Kite Beach and run along
            the shore with a stunning sunset backdrop. Water stations and
            refreshments will be provided.
          </Text>
        </View>

        {/* Location Map Placeholder */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Location
          </Text>
          <View
            style={[styles.mapPlaceholder, { backgroundColor: colors.card }]}
          >
            <Ionicons name="map" size={48} color={colors.accent} />
            <Text style={[styles.mapText, { color: colors.textSecondary }]}>
              Salt Kite Beach, Dubai
            </Text>
          </View>
        </View>

        {/* Organizers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Organizers
          </Text>
          {ORGANIZERS.map((organizer) => (
            <View
              key={organizer.id}
              style={[styles.organizerRow, { backgroundColor: colors.card }]}
            >
              <View
                style={[
                  styles.organizerAvatar,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Ionicons name="person" size={18} color={colors.accent} />
              </View>
              <Text style={[styles.organizerName, { color: colors.text }]}>
                {organizer.name}
              </Text>
              <Ionicons
                name="chatbubble-outline"
                size={18}
                color={colors.textSecondary}
              />
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.card }]}
        >
          <Ionicons name="bookmark-outline" size={22} color={colors.text} />
          <Text style={[styles.saveText, { color: colors.text }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.joinEventButton, { backgroundColor: colors.accent }]}
        >
          <Text
            style={[styles.joinEventText, { color: colors.buttonText }]}
          >
            Join Event
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  bannerIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerTag: {
    fontSize: 16,
    fontWeight: '700',
  },
  eventInfo: {
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 16,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: '800',
  },
  tagContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tag: {
    fontSize: 13,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  detailIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  detailSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
  },
  mapPlaceholder: {
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  mapText: {
    fontSize: 14,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    marginBottom: 8,
  },
  organizerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  organizerName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    paddingBottom: 32,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 28,
  },
  saveText: {
    fontSize: 15,
    fontWeight: '600',
  },
  joinEventButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 28,
  },
  joinEventText: {
    fontSize: 16,
    fontWeight: '700',
  },
});
