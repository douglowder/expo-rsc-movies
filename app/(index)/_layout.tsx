import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        title: "Search Movies",
      }}
    />
  );
}
