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

const { width, height } = Dimensions.get('window');

export default function OnboardingWelcome({ navigation }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <View style={styles.topSection}>
        <View style={[styles.iconCircle, { backgroundColor: colors.accent }]}>
          <Ionicons name="walk" size={48} color={colors.buttonText} />
        </View>
        <Text style={[styles.appName, { color: colors.accent }]}>
          Run With Me
        </Text>
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          Find your running community
        </Text>
      </View>

      <View style={styles.illustrationContainer}>
        <View style={[styles.illustration, { backgroundColor: colors.card }]}>
          <Ionicons name="fitness" size={80} color={colors.accent} />
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="footsteps" size={24} color={colors.accent} />
              <Text style={[styles.statText, { color: colors.text }]}>
                Track
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="people" size={24} color={colors.accent} />
              <Text style={[styles.statText, { color: colors.text }]}>
                Connect
              </Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="trophy" size={24} color={colors.accent} />
              <Text style={[styles.statText, { color: colors.text }]}>
                Achieve
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: colors.accent }]}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={[styles.primaryButtonText, { color: colors.buttonText }]}>
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
            I already have an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 16,
    marginTop: 8,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: width - 48,
    height: 220,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
  },
  statItem: {
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
  },
  bottomSection: {
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
