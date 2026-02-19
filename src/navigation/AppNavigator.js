import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import OnboardingWelcome from '../screens/onboarding/OnboardingWelcome';
import OnboardingLogin from '../screens/onboarding/OnboardingLogin';
import OnboardingRegister from '../screens/onboarding/OnboardingRegister';
import OnboardingPhoto from '../screens/onboarding/OnboardingPhoto';
import OnboardingPreferences from '../screens/onboarding/OnboardingPreferences';
import OnboardingLoading from '../screens/onboarding/OnboardingLoading';
import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/profile/ProfileScreen';
import TeamScreen from '../screens/team/TeamScreen';
import EventDetailScreen from '../screens/events/EventDetailScreen';
import RunningScreen from '../screens/running/RunningScreen';
import DayStreakScreen from '../screens/running/DayStreakScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome"
      >
        {/* Onboarding */}
        <Stack.Screen name="Welcome" component={OnboardingWelcome} />
        <Stack.Screen name="Login" component={OnboardingLogin} />
        <Stack.Screen name="Register" component={OnboardingRegister} />
        <Stack.Screen name="ProfilePhoto" component={OnboardingPhoto} />
        <Stack.Screen name="Preferences" component={OnboardingPreferences} />
        <Stack.Screen name="OnboardingLoading" component={OnboardingLoading} />

        {/* Main App */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Team" component={TeamScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="Running" component={RunningScreen} />
        <Stack.Screen name="DayStreak" component={DayStreakScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
