import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import ThemeProvider from '@/components/ui/ThemeProvider';

import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export { ErrorBoundary } from 'expo-router';

const scale = 1.5;

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: AC,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarLabelStyle: {
            fontSize: 30 * scale,
            lineHeight: 40 * scale,
            paddingLeft: 10 * scale,
          },
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
              height: 100 * scale,
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="(index)"
          options={{
            title: 'Search',
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={28 * scale}
                name="magnifyingglass"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
