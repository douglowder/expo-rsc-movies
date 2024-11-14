/// <reference types="react/canary" />
import {
  Image,
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";
import { renderHome } from "@/components/actions";
import { useNavigation } from "expo-router";
import { SearchBarProps } from "react-native-screens";

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

    navigation.getParent().setOptions({
      headerShown: true,
      headerSearchBarOptions: interceptedOptions,
    });
  }, [options]);

  return search;
}

export default function HomeScreen() {
  const text = useHeaderSearch();
  if (!text) return null;

  return (
    <React.Suspense fallback={<ActivityIndicator />}>
      {renderHome(text)}
    </React.Suspense>
  );
}
