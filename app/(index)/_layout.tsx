import { Stack } from "expo-router";
import React from "react";
import { Button } from "react-native";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        title: "Search",
      }}
    />
  );
}
