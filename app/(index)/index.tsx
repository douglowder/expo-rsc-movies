/// <reference types="react/canary" />
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import React from "react";
import { renderSearchContents, renderTrendingMovies, renderTrendingShows } from "@/functions/render-search";
import { label } from "@bacons/apple-colors";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { useHeaderSearch } from "@/hooks/useHeaderSearch";

function Empty() {
  const { width } = useWindowDimensions();
  const cardWidth = 140;
  const cardHeight = 210;
  const gap = 8;
  const numCards = Math.floor(width / (cardWidth + gap));

  function SkeletonRow() {
    return (
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ 
          width: 200, 
          height: 24, 
          backgroundColor: 'rgba(120,120,128,0.12)', 
          borderRadius: 4,
          marginBottom: 12 
        }} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(numCards)].map((_, i) => (
            <View key={i} style={{ 
              width: cardWidth,
              marginRight: gap,
            }}>
              <View style={{ 
                width: cardWidth,
                height: cardHeight,
                backgroundColor: 'rgba(120,120,128,0.12)',
                borderRadius: 8,
                marginBottom: 8
              }} />
              <View style={{
                width: '100%',
                height: 16,
                backgroundColor: 'rgba(120,120,128,0.12)',
                borderRadius: 4,
                marginBottom: 4
              }} />
              <View style={{
                width: '30%',
                height: 14,
                backgroundColor: 'rgba(120,120,128,0.12)', 
                borderRadius: 4
              }} />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <BodyScrollView contentContainerStyle={{ paddingVertical: 16, gap: 24 }}>
      <React.Suspense fallback={<SkeletonRow />}>
        {renderTrendingMovies()}
      </React.Suspense>
      <React.Suspense fallback={<SkeletonRow />}>
        {renderTrendingShows()}
      </React.Suspense>
    </BodyScrollView>
  );
}

export default function HomeScreen() {
  const text = useHeaderSearch({
    placeholder: "Shows, Movies, and More",
  });

  if (!text || text.length < 2) {
    return (
      <Empty />
    )
  }

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}
    >
      <React.Suspense fallback={<ActivityIndicator color={label} />}>
        {renderSearchContents(text)}
      </React.Suspense>
    </BodyScrollView>
  );
}
