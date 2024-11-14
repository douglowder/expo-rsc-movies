/// <reference types="react/canary" />
import { ActivityIndicator, Text, View, ViewBase } from "react-native";

import React, { useEffect, useState } from "react";
import { renderHome } from "@/components/actions";
import { useNavigation } from "expo-router";
import { SearchBarProps } from "react-native-screens";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { label } from "@bacons/apple-colors";
import { BodyScrollView } from "@/components/ui/BodyScrollView";

function useHeaderSearch(options: Omit<SearchBarProps, "ref"> = {}) {
  const [search, setSearch] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const interceptedOptions: SearchBarProps = {
      ...options,
      onSearchButtonPress(e) {
        setSearch(e.nativeEvent.text);
        options.onSearchButtonPress?.(e);
      },
      onCancelButtonPress(e) {
        setSearch("");
        options.onCancelButtonPress?.(e);
      },
    };

    navigation.setOptions({
      headerShown: true,
      headerSearchBarOptions: interceptedOptions,
    });
  }, [options]);

  return search;
}

export default function HomeScreen() {
  const text = useHeaderSearch();

  if (!text) {
    return (
      <BodyScrollView
        contentContainerStyle={{
          height: 360,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            paddingVertical: 24,
          }}
        >
          <IconSymbol name="magnifyingglass.circle" color={label} size={100} />
          <Text style={{ color: label, fontSize: 24, fontWeight: "bold" }}>
            Search for movies
          </Text>
        </View>
      </BodyScrollView>
    );
  }

  return (
    <BodyScrollView
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <React.Suspense fallback={<ActivityIndicator color={label} />}>
        {renderHome(text)}
      </React.Suspense>
    </BodyScrollView>
  );
}
