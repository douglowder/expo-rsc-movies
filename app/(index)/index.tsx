/// <reference types="react/canary" />
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import React from "react";
import { renderHome } from "@/components/actions";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { label, systemGray2 } from "@bacons/apple-colors";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";

import { useAnimatedHeaderHeight } from "@react-navigation/native-stack";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
function Empty() {
  const headerHeight = useAnimatedHeaderHeight();
  const { height } = useWindowDimensions();
  const footer = useBottomTabOverflow();
  return (
    <View
      style={{
        height: height,
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
        <IconSymbol
          name="magnifyingglass.circle"
          color={systemGray2}
          size={100}
        />
        <Text style={{ color: systemGray2, fontSize: 24, fontWeight: "600" }}>
          Search for movies
        </Text>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const text = useHeaderSearch();

  if (!text) {
    return <Empty />;
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
