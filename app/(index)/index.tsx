/// <reference types="react/canary" />
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";

import React from "react";
import {
  renderSearchContents,
  renderTrendingMovies,
  renderTrendingShows,
} from "@/functions/render-search";
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
        <View
          style={{
            width: 200,
            height: 24,
            backgroundColor: "rgba(120,120,128,0.12)",
            borderRadius: 4,
            marginBottom: 12,
          }}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(numCards)].map((_, i) => (
            <View
              key={i}
              style={{
                width: cardWidth,
                marginRight: gap,
              }}
            >
              <View
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  backgroundColor: "rgba(120,120,128,0.12)",
                  borderRadius: 8,
                  marginBottom: 8,
                }}
              />
              <View
                style={{
                  width: "100%",
                  height: 16,
                  backgroundColor: "rgba(120,120,128,0.12)",
                  borderRadius: 4,
                  marginBottom: 4,
                }}
              />
              <View
                style={{
                  width: "30%",
                  height: 14,
                  backgroundColor: "rgba(120,120,128,0.12)",
                  borderRadius: 4,
                }}
              />
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
    return <Empty />;
  }

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}
    >
      <React.Suspense
        fallback={
          <View style={{ gap: 24 }}>
            <SkeletonSection />
            <SkeletonSection />
            <SkeletonSection />
          </View>
        }
      >
        {renderSearchContents(text)}
      </React.Suspense>
    </BodyScrollView>
  );
}

const POSTER_WIDTH = 140;
const POSTER_HEIGHT = 210;

const SkeletonItem = () => (
  <View style={{ marginHorizontal: 4 }}>
    <View
      style={{
        width: POSTER_WIDTH,
        backgroundColor: AC.secondarySystemBackground,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          width: POSTER_WIDTH,
          height: POSTER_HEIGHT,
          borderRadius: 12,
          backgroundColor: AC.systemGray5,
        }}
      />
      <View style={{ padding: 8, gap: 4 }}>
        <View
          style={{
            height: 14,
            width: "80%",
            backgroundColor: AC.systemGray5,
            borderRadius: 4,
          }}
        />
        <View
          style={{
            height: 12,
            width: "30%",
            backgroundColor: AC.systemGray5,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  </View>
);

import * as AC from "@bacons/apple-colors";

const SkeletonSection = () => (
  <View>
    <View
      style={{
        width: 100,
        height: 20,
        backgroundColor: AC.systemGray5,
        borderRadius: 4,
        marginBottom: 12,
        marginLeft: 16,
      }}
    />
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12 }}
    >
      {[...Array(4)].map((_, i) => (
        <SkeletonItem key={i} />
      ))}
    </ScrollView>
  </View>
);
