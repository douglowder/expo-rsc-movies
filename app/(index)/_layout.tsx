import { Stack } from 'expo-router';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'index',
};

export { ErrorBoundary } from 'expo-router';

const scale = 1.5;

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        ...(process.env.EXPO_OS === 'web'
          ? {}
          : {
              headerLargeTitle: true,
              headerTransparent: true,
              headerTitleStyle: {
                fontSize: 30 * scale,
              },
              headerBlurEffect: 'systemChromeMaterial',
              headerLargeTitleShadowVisible: false,
              headerShadowVisible: true,
              headerLargeStyle: {
                // NEW: Make the large title transparent to match the background.
                backgroundColor: 'transparent',
              },
            }),
        title: 'Search',
      }}
    />
  );
}
