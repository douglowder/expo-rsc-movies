"use server";

import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import * as AC from "@bacons/apple-colors";
import { BodyScrollView } from "./ui/BodyScrollView";
import { Link } from "expo-router";
import TouchableBounce from "./ui/TouchableBounce";

async function getMovies(query = "") {
  const API_KEY = process.env.TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

export async function renderHome(query: string) {
  // Query pokemon API
  const movies = await getMovies(query);

  // Render list of pokemon
  return (
    <>
      {movies.map((movie: any) => (
        <Link asChild key={movie.id} href={`/movie/${movie.id}`}>
          <TouchableBounce>
            <View
              style={{
                marginBottom: 16,
                borderWidth: 1,
                borderColor: AC.separator,
                backgroundColor: AC.secondarySystemGroupedBackground,
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <View
                style={{
                  padding: 16,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", color: AC.label }}
                >
                  {movie.title}
                </Text>
              </View>
              {movie.poster_path && (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  }}
                  style={{ width: "100%", height: 200, resizeMode: "cover" }}
                />
              )}
              <View style={{ padding: 16 }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: AC.secondaryLabel,
                    marginBottom: 8,
                  }}
                >
                  Release Date: {movie.release_date}
                </Text>
                <Text
                  style={{ fontSize: 14, color: AC.label, marginBottom: 8 }}
                >
                  {movie.overview}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      padding: 4,
                      backgroundColor: "#e0f7fa",
                      color: AC.systemTeal,
                      borderRadius: 4,
                    }}
                  >
                    Rating: {movie.vote_average.toFixed(1)}/10
                  </Text>
                  <Text
                    style={{
                      padding: 4,
                      backgroundColor: "#e8f5e9",
                      color: AC.systemGreen,
                      borderRadius: 4,
                    }}
                  >
                    Votes: {movie.vote_count}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableBounce>
        </Link>
      ))}
    </>
  );
}
