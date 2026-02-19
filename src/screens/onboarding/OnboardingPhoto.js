import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export default function OnboardingPhoto({ navigation, route }) {
  const { colors } = useTheme();
  const [photo, setPhoto] = useState(null);

  const progress = 5 / 6;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { backgroundColor: colors.card }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: colors.accent,
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Add a profile photo
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Help other runners recognize you
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.photoCircle, { backgroundColor: colors.card }]}
          onPress={() => {}}
        >
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photoImage} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={48} color={colors.accent} />
              <Text style={[styles.photoText, { color: colors.textSecondary }]}>
                Tap to add photo
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.optionButton, { backgroundColor: colors.card }]}
          >
            <Ionicons name="camera-outline" size={22} color={colors.accent} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.optionButton, { backgroundColor: colors.card }]}
          >
            <Ionicons name="image-outline" size={22} color={colors.accent} />
            <Text style={[styles.optionText, { color: colors.text }]}>
              Choose from Gallery
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('Preferences')}
        >
          <Text style={[styles.nextButtonText, { color: colors.buttonText }]}>
            Continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Preferences')}
        >
          <Text style={[styles.skipText, { color: colors.textSecondary }]}>
            Skip for now
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  photoCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 32,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    alignItems: 'center',
    gap: 8,
  },
  photoText: {
    fontSize: 13,
  },
  options: {
    width: '100%',
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderRadius: 16,
    paddingHorizontal: 20,
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
    alignItems: 'center',
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  skipText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
