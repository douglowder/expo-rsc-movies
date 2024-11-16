import { BodyScrollView } from "@/components/ui/BodyScrollView";
import { renderPersonDetails } from "@/functions/render-person-details";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ActivityIndicator } from "react-native";

export { ErrorBoundary } from "expo-router";

export default function PersonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const screen = useMemo(() => renderPersonDetails(id), [id]);

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
