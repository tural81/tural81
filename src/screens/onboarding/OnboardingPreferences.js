import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import Slider from '../../components/Slider';

const { width } = Dimensions.get('window');

const PREFERENCE_STEPS = [
  {
    id: 'runLocation',
    title: 'Where do you like to run?',
    subtitle: 'Select all that apply',
    type: 'grid',
    options: [
      { id: 'park', label: 'Park', icon: 'leaf' },
      { id: 'trail', label: 'Trail', icon: 'trail-sign' },
      { id: 'street', label: 'Street', icon: 'car' },
      { id: 'track', label: 'Track', icon: 'ellipse' },
      { id: 'beach', label: 'Beach', icon: 'water' },
      { id: 'treadmill', label: 'Treadmill', icon: 'fitness' },
    ],
    multiSelect: true,
  },
  {
    id: 'pace',
    title: "What's your running pace?",
    subtitle: 'Average minutes per kilometer',
    type: 'slider',
    min: 3,
    max: 10,
    unit: 'min/km',
  },
  {
    id: 'goal',
    title: "What's your main goal for running?",
    subtitle: 'Select what motivates you most',
    type: 'grid',
    options: [
      { id: 'fitness', label: 'Stay Fit', icon: 'fitness' },
      { id: 'weight', label: 'Lose Weight', icon: 'scale' },
      { id: 'mental', label: 'Mental Health', icon: 'happy' },
      { id: 'social', label: 'Social', icon: 'people' },
      { id: 'compete', label: 'Compete', icon: 'trophy' },
      { id: 'explore', label: 'Explore', icon: 'compass' },
    ],
    multiSelect: false,
  },
  {
    id: 'listening',
    title: 'What do you like listening to while running?',
    subtitle: 'Helps us match you with buddies',
    type: 'grid',
    options: [
      { id: 'music', label: 'Music', icon: 'musical-notes' },
      { id: 'podcasts', label: 'Podcasts', icon: 'mic' },
      { id: 'audiobooks', label: 'Audiobooks', icon: 'book' },
      { id: 'nothing', label: 'Nothing', icon: 'volume-mute' },
    ],
    multiSelect: true,
  },
  {
    id: 'gps',
    title: 'Would you like GPS tracking for your runs?',
    subtitle: 'Track your routes and distance accurately',
    type: 'yesno',
    options: [
      { id: 'yes', label: 'Yes', icon: 'navigate' },
      { id: 'no', label: 'No', icon: 'close-circle' },
    ],
  },
  {
    id: 'comparison',
    title: 'Want to compare performance with others?',
    subtitle: 'See how you stack up against fellow runners',
    type: 'yesno',
    options: [
      { id: 'yes', label: 'Yes', icon: 'podium' },
      { id: 'no', label: 'No', icon: 'close-circle' },
    ],
  },
  {
    id: 'frequency',
    title: 'How often do you run?',
    subtitle: 'We\'ll adjust your goals accordingly',
    type: 'single',
    options: [
      { id: 'daily', label: 'Daily', icon: 'calendar' },
      { id: 'weekly', label: 'Weekly', icon: 'calendar-outline' },
      { id: 'monthly', label: 'Monthly', icon: 'time' },
    ],
  },
  {
    id: 'buddies',
    title: 'Want to find running buddies?',
    subtitle: 'Connect with runners near you',
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes', icon: 'people' },
      { id: 'no', label: 'No', icon: 'close-circle' },
      { id: 'maybe', label: 'Maybe Later', icon: 'time' },
    ],
  },
  {
    id: 'club',
    title: 'Join a virtual running club?',
    subtitle: 'Be part of a running community',
    type: 'single',
    options: [
      { id: 'yes', label: 'Yes', icon: 'shield' },
      { id: 'no', label: 'No', icon: 'close-circle' },
      { id: 'later', label: 'Later', icon: 'time' },
    ],
  },
];

export default function OnboardingPreferences({ navigation }) {
  const { colors } = useTheme();
  const [stepIndex, setStepIndex] = useState(0);
  const [preferences, setPreferences] = useState({});
  const [sliderValue, setSliderValue] = useState(6);

  const currentStep = PREFERENCE_STEPS[stepIndex];
  const totalSteps = PREFERENCE_STEPS.length;
  const progress = (stepIndex + 1) / totalSteps;

  const handleSelect = (optionId) => {
    if (currentStep.multiSelect) {
      const current = preferences[currentStep.id] || [];
      if (current.includes(optionId)) {
        setPreferences({
          ...preferences,
          [currentStep.id]: current.filter((id) => id !== optionId),
        });
      } else {
        setPreferences({
          ...preferences,
          [currentStep.id]: [...current, optionId],
        });
      }
    } else {
      setPreferences({ ...preferences, [currentStep.id]: optionId });
    }
  };

  const isSelected = (optionId) => {
    const val = preferences[currentStep.id];
    if (Array.isArray(val)) return val.includes(optionId);
    return val === optionId;
  };

  const canProceed = () => {
    if (currentStep.type === 'slider') return true;
    const val = preferences[currentStep.id];
    if (Array.isArray(val)) return val.length > 0;
    return !!val;
  };

  const handleNext = () => {
    if (currentStep.type === 'slider') {
      setPreferences({ ...preferences, [currentStep.id]: sliderValue });
    }
    if (stepIndex < totalSteps - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      navigation.navigate('OnboardingLoading', { preferences });
    }
  };

  const handleBack = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderGrid = () => (
    <View style={styles.grid}>
      {currentStep.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.gridItem,
            {
              backgroundColor: isSelected(option.id)
                ? colors.accent + '20'
                : colors.card,
              borderColor: isSelected(option.id)
                ? colors.accent
                : 'transparent',
              borderWidth: 2,
            },
          ]}
          onPress={() => handleSelect(option.id)}
        >
          <Ionicons
            name={option.icon}
            size={32}
            color={isSelected(option.id) ? colors.accent : colors.textSecondary}
          />
          <Text
            style={[
              styles.gridItemText,
              {
                color: isSelected(option.id) ? colors.accent : colors.text,
              },
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderYesNo = () => (
    <View style={styles.yesNoContainer}>
      {currentStep.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.yesNoButton,
            {
              backgroundColor: isSelected(option.id)
                ? colors.accent + '20'
                : colors.card,
              borderColor: isSelected(option.id)
                ? colors.accent
                : 'transparent',
              borderWidth: 2,
            },
          ]}
          onPress={() => handleSelect(option.id)}
        >
          <Ionicons
            name={option.icon}
            size={36}
            color={isSelected(option.id) ? colors.accent : colors.textSecondary}
          />
          <Text
            style={[
              styles.yesNoText,
              {
                color: isSelected(option.id) ? colors.accent : colors.text,
              },
            ]}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSingle = () => (
    <View style={styles.singleContainer}>
      {currentStep.options.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.singleButton,
            {
              backgroundColor: isSelected(option.id)
                ? colors.accent + '20'
                : colors.card,
              borderColor: isSelected(option.id)
                ? colors.accent
                : 'transparent',
              borderWidth: 2,
            },
          ]}
          onPress={() => handleSelect(option.id)}
        >
          <Ionicons
            name={option.icon}
            size={28}
            color={isSelected(option.id) ? colors.accent : colors.textSecondary}
          />
          <Text
            style={[
              styles.singleText,
              {
                color: isSelected(option.id) ? colors.accent : colors.text,
              },
            ]}
          >
            {option.label}
          </Text>
          {isSelected(option.id) && (
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.accent}
              style={styles.checkIcon}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderSlider = () => (
    <View style={styles.sliderContainer}>
      <Text style={[styles.sliderValue, { color: colors.accent }]}>
        {sliderValue} {currentStep.unit}
      </Text>
      <Slider
        min={currentStep.min}
        max={currentStep.max}
        value={sliderValue}
        onValueChange={setSliderValue}
        accentColor={colors.accent}
        trackColor={colors.card}
      />
      <View style={styles.sliderLabels}>
        <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>
          Fast ({currentStep.min})
        </Text>
        <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>
          Slow ({currentStep.max})
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
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
        <Text style={[styles.stepCounter, { color: colors.textSecondary }]}>
          {stepIndex + 1}/{totalSteps}
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {currentStep.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {currentStep.subtitle}
          </Text>
        </View>

        {currentStep.type === 'grid' && renderGrid()}
        {currentStep.type === 'yesno' && renderYesNo()}
        {currentStep.type === 'single' && renderSingle()}
        {currentStep.type === 'slider' && renderSlider()}
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: canProceed() ? colors.accent : colors.card,
            },
          ]}
          onPress={handleNext}
          disabled={!canProceed()}
        >
          <Text
            style={[
              styles.nextButtonText,
              {
                color: canProceed()
                  ? colors.buttonText
                  : colors.textSecondary,
              },
            ]}
          >
            {stepIndex === totalSteps - 1 ? "Let's Go!" : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const gridItemWidth = (width - 48 - 12) / 2;

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
  stepCounter: {
    fontSize: 13,
    fontWeight: '600',
    width: 40,
    textAlign: 'right',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: gridItemWidth,
    height: 110,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  gridItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  yesNoContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  yesNoButton: {
    flex: 1,
    height: 140,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  yesNoText: {
    fontSize: 18,
    fontWeight: '700',
  },
  singleContainer: {
    gap: 12,
  },
  singleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 64,
    borderRadius: 20,
    paddingHorizontal: 20,
    gap: 16,
  },
  singleText: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  sliderContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  sliderValue: {
    fontSize: 48,
    fontWeight: '800',
    marginBottom: 32,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 13,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
