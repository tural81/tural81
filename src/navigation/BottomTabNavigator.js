import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import HomeScreen from '../screens/home/HomeScreen';
import StatsScreen from '../screens/stats/StatsScreen';
import DiscoverScreen from '../screens/discover/DiscoverScreen';
import CommunityScreen from '../screens/community/CommunityScreen';

const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  Home: { focused: 'home', unfocused: 'home-outline' },
  Statistics: { focused: 'stats-chart', unfocused: 'stats-chart-outline' },
  Discover: { focused: 'compass', unfocused: 'compass-outline' },
  Community: { focused: 'people', unfocused: 'people-outline' },
};

export default function BottomTabNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, size }) => {
          const iconName = focused
            ? TAB_ICONS[route.name].focused
            : TAB_ICONS[route.name].unfocused;
          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? colors.accent : colors.textSecondary}
            />
          );
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: 'rgba(255,255,255,0.1)',
          borderTopWidth: 0.5,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Statistics" component={StatsScreen} />
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
    </Tab.Navigator>
  );
}
