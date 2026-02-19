import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const CATEGORIES = ['All', 'Running', 'Walking', 'Trail', 'Marathon'];

const EVENTS = [
  {
    id: '1',
    title: 'Founders Running Club',
    location: 'Dubai, UAE',
    date: 'Sat, 15 Mar',
    time: '17:00',
    attendees: 700,
    tag: 'Running',
  },
  {
    id: '2',
    title: 'Morning Trail Run',
    location: 'Baku, Azerbaijan',
    date: 'Sun, 16 Mar',
    time: '07:00',
    attendees: 45,
    tag: 'Trail',
  },
  {
    id: '3',
    title: 'Marathon Prep Group',
    location: 'Istanbul, Turkey',
    date: 'Mon, 17 Mar',
    time: '06:30',
    attendees: 120,
    tag: 'Marathon',
  },
];

const POPULAR_ROUTES = [
  { id: '1', name: 'Seaside Boulevard', km: 5.2, rating: 4.8 },
  { id: '2', name: 'Highland Park Loop', km: 3.4, rating: 4.6 },
  { id: '3', name: 'City Center Circuit', km: 7.1, rating: 4.3 },
];

export default function DiscoverScreen({ navigation }) {
  const { colors } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Discover</Text>
        </View>

        {/* Search */}
        <View
          style={[styles.searchBar, { backgroundColor: colors.card }]}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search events, routes, runners..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categories}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategory === cat ? colors.accent : colors.card,
                },
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  {
                    color:
                      selectedCategory === cat
                        ? colors.buttonText
                        : colors.textSecondary,
                  },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Events */}
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

          {EVENTS.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { backgroundColor: colors.card }]}
              onPress={() =>
                navigation.navigate('EventDetail', { event })
              }
            >
              <View
                style={[
                  styles.eventIcon,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Ionicons name="flag" size={22} color={colors.accent} />
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
                    styles.eventMeta,
                    { color: colors.textSecondary },
                  ]}
                >
                  {event.date} · {event.time} · {event.location}
                </Text>
              </View>
              <View
                style={[
                  styles.eventTag,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Text style={[styles.eventTagText, { color: colors.accent }]}>
                  {event.attendees}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Routes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Popular Routes
            </Text>
          </View>

          {POPULAR_ROUTES.map((route) => (
            <TouchableOpacity
              key={route.id}
              style={[styles.routeCard, { backgroundColor: colors.card }]}
            >
              <View
                style={[
                  styles.routeIcon,
                  { backgroundColor: colors.accent + '20' },
                ]}
              >
                <Ionicons name="map" size={22} color={colors.accent} />
              </View>
              <View style={styles.routeInfo}>
                <Text style={[styles.routeName, { color: colors.text }]}>
                  {route.name}
                </Text>
                <Text
                  style={[
                    styles.routeDistance,
                    { color: colors.textSecondary },
                  ]}
                >
                  {route.km} km
                </Text>
              </View>
              <View style={styles.routeRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={[styles.ratingText, { color: colors.text }]}>
                  {route.rating}
                </Text>
              </View>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    gap: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  categories: {
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
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
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 10,
  },
  eventIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventInfo: {
    flex: 1,
    gap: 4,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
  },
  eventMeta: {
    fontSize: 12,
  },
  eventTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  eventTagText: {
    fontSize: 12,
    fontWeight: '700',
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    padding: 14,
    borderRadius: 16,
    gap: 12,
    marginBottom: 10,
  },
  routeIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeInfo: {
    flex: 1,
    gap: 4,
  },
  routeName: {
    fontSize: 15,
    fontWeight: '600',
  },
  routeDistance: {
    fontSize: 12,
  },
  routeRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
