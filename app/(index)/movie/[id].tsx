import { renderMovie } from "@/components/movie-route";
import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator } from "react-native";

export { ErrorBoundary } from "expo-router";

export default function Movie() {
  const { id } = useLocalSearchParams();

  const screen = useMemo(() => renderMovie(id), [id]);

  return (
    <BodyScrollView>
      <Stack.Screen
        options={{
          title: "Movie",
        }}
      />
      <React.Suspense fallback={<ActivityIndicator />}>{screen}</React.Suspense>
    </BodyScrollView>
  );
}
