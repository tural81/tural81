import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

export default function OnboardingRegister({ navigation }) {
  const { colors } = useTheme();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const steps = [
    {
      title: "What's your first name?",
      subtitle: "Let's get to know you",
      field: 'firstName',
      placeholder: 'First name',
      icon: 'person-outline',
    },
    {
      title: "What's your last name?",
      subtitle: 'Almost there',
      field: 'lastName',
      placeholder: 'Last name',
      icon: 'person-outline',
    },
    {
      title: "What's your email?",
      subtitle: "We'll use this to sign you in",
      field: 'email',
      placeholder: 'Email address',
      icon: 'mail-outline',
      keyboardType: 'email-address',
    },
    {
      title: 'Create a password',
      subtitle: 'Make it at least 8 characters',
      field: 'password',
      placeholder: 'Password',
      icon: 'lock-closed-outline',
      secure: true,
    },
  ];

  const currentStep = steps[step];
  const progress = (step + 1) / (steps.length + 2); // +2 for photo + preferences

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      navigation.navigate('ProfilePhoto', { formData });
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="light" />

      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { backgroundColor: colors.card }]}
          >
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

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            {currentStep.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {currentStep.subtitle}
          </Text>
        </View>

        <View
          style={[
            styles.inputWrapper,
            { backgroundColor: colors.card, borderColor: colors.accent + '30' },
          ]}
        >
          <Ionicons
            name={currentStep.icon}
            size={20}
            color={colors.textSecondary}
          />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder={currentStep.placeholder}
            placeholderTextColor={colors.textSecondary}
            value={formData[currentStep.field]}
            onChangeText={(text) =>
              setFormData({ ...formData, [currentStep.field]: text })
            }
            keyboardType={currentStep.keyboardType || 'default'}
            secureTextEntry={currentStep.secure}
            autoCapitalize={
              currentStep.field === 'email' ? 'none' : 'words'
            }
            autoFocus
          />
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor: formData[currentStep.field]
                ? colors.accent
                : colors.card,
            },
          ]}
          onPress={handleNext}
          disabled={!formData[currentStep.field]}
        >
          <Text
            style={[
              styles.nextButtonText,
              {
                color: formData[currentStep.field]
                  ? colors.buttonText
                  : colors.textSecondary,
              },
            ]}
          >
            Continue
          </Text>
          <Ionicons
            name="arrow-forward"
            size={20}
            color={
              formData[currentStep.field]
                ? colors.buttonText
                : colors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingTop: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    marginTop: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '700',
  },
});
