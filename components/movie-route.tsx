"use server";

import { label } from "@bacons/apple-colors";
import { Stack } from "expo-router";
import { Image, Text, View } from "react-native";

export async function renderMovie(id: string) {
  // Fetch movie info
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  );
  const movie = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: movie.title,
        }}
      />

      <View style={{ marginBottom: 20 }}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={{
            width: 200,
            height: 300,
            resizeMode: "cover",
            borderRadius: 10,
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: label,
          marginBottom: 10,
        }}
      >
        {movie.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, color: label }}>
          Release Date: {movie.release_date}
        </Text>
        <Text style={{ fontSize: 18, color: label }}>
          Rating: {movie.vote_average}
        </Text>
      </View>
      <Text style={{ fontSize: 18, color: label, marginBottom: 20 }}>
        Overview: {movie.overview}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Text style={{ fontSize: 18, color: label }}>
          Genre: {movie.genres.map((genre) => genre.name).join(", ")}
        </Text>
        <Text style={{ fontSize: 18, color: label }}>
          Runtime: {movie.runtime} minutes
        </Text>
      </View>
    </>
  );
}
