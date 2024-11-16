"use server";

import { Image, ScrollView, Text, View } from "react-native";

import * as AC from "@bacons/apple-colors";
import { Link } from "expo-router";
import TouchableBounce from "./ui/TouchableBounce";

async function getMovies(query = "") {
  const API_KEY = process.env.TMDB_API_KEY;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
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

export async function renderTrendingMovies() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=" + process.env.TMDB_API_KEY
  );
  const data = await response.json();
  const movies = data.results.slice(0, 6);
  return renderTrendingSection("Movies", movies);
}

export async function renderTrendingShows() {
  const response = await fetch(
    "https://api.themoviedb.org/3/trending/tv/week?api_key=" + process.env.TMDB_API_KEY
  );
  const data = await response.json();
  const shows = data.results.slice(0, 6);
  return renderTrendingSection("TV Shows", shows);
}

function renderTrendingSection(title: string, items: any[]) {
  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",
        marginBottom: 12,
        paddingHorizontal: 16
      }}>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: "600",
          color: AC.label 
        }}>
          Trending {title}
        </Text>
        <Link href={`/trending/${title.toLowerCase()}`} asChild>
          <TouchableBounce>
            <Text style={{ 
              fontSize: 16,
              color: AC.systemBlue
            }}>
              See All
            </Text>
          </TouchableBounce>
        </Link>
      </View>

      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {items.map((item) => (
          <Link 
            key={item.id}
            href={`/${title === "Movies" ? "movie" : "show"}/${item.id}`}
            asChild
          >
            <TouchableBounce style={{ marginHorizontal: 4 }}>
              <View style={{
                width: 140,
                backgroundColor: AC.secondarySystemBackground,
                borderRadius: 12,
                overflow: "hidden"
              }}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w300${item.poster_path}` }}
                  style={{ width: "100%", height: 210, borderRadius: 12, }}
                />
                <View style={{ padding: 8 }}>
                  <Text 
                    numberOfLines={2}
                    style={{ 
                      fontSize: 14,
                      fontWeight: "500",
                      color: AC.label,
                      marginBottom: 4
                    }}
                  >
                    {item.title || item.name}
                  </Text>
                  <Text style={{ 
                    fontSize: 12,
                    color: AC.systemBlue,
                  }}>
                    ★ {item.vote_average.toFixed(1)}
                  </Text>
                </View>
              </View>
            </TouchableBounce>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}