/// <reference types="react/canary" />
import {
  ActivityIndicator,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import React from "react";
import { renderSearchContents, renderTrendingMovies, renderTrendingShows } from "@/components/render-search";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { label, systemGray2 } from "@bacons/apple-colors";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";

function Empty() {
  const { height } = useWindowDimensions();
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
  const text = useHeaderSearch({
    placeholder: "Shows, Movies, and More",
  });

  if (!text || text.length < 2) {
    return (
      <BodyScrollView contentContainerStyle={{ paddingVertical: 16, gap: 2, }}>
        <React.Suspense fallback={<ActivityIndicator color={label} />}>
          {renderTrendingMovies()}
        </React.Suspense>
        <React.Suspense fallback={<ActivityIndicator color={label} />}>
          {renderTrendingShows()}
        </React.Suspense>
      </BodyScrollView>
    )
  }

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
      }}
    >
      <React.Suspense fallback={<ActivityIndicator color={label} />}>
        {renderSearchContents(text)}
      </React.Suspense>
    </BodyScrollView>
  );
}
