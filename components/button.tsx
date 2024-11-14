"use client";

import { Text } from "react-native";

export function Button({ onPress, title }) {
  return (
    <Text
      style={{
        color: "white",
        fontWeight: "bold",
        fontSize: 24,
      }}
      onPress={() => onPress()}
    >
      {title}
    </Text>
  );
}
