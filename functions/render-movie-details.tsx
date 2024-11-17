"use server";

import { label } from "@bacons/apple-colors";
import { Link, Stack } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import TouchableBounce from "@/components/ui/TouchableBounce";
import React from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { Image } from "expo-image";

export async function renderMovie(id: string) {
  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerTransparent: true,
        }}
      />

      <MovieDetails id={id} />

      <React.Suspense fallback={<ListSkeleton />}>
        <MovieVideos id={id} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <MovieCast id={id} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <MovieCompanies id={id} />
      </React.Suspense>

      <React.Suspense fallback={<ListSkeleton />}>
        <SimilarMovies id={id} />
      </React.Suspense>
    </>
  );
}


function HorizontalList({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Text style={{ fontSize: 20, fontWeight: "600", color: label, marginBottom: 12, paddingHorizontal: 16 }}>
        {title}
      </Text>
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

function MovieHero({ movie }: { movie: any }) {
  return (
    <View style={{ marginBottom: 24 }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
        style={{
          width: "100%",
          height: 300,
          resizeMode: "cover",
        }}
        transition={300}
      />
      <View style={{ padding: 16, marginTop: -60, flexDirection: "row" }}>
        <Image 
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={{
            width: 100,
            height: 150,
            borderRadius: 8,
            marginRight: 16
          }}
          transition={300}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: label, marginBottom: 8 }}>
            {movie.title}
          </Text>
          <Text style={{ fontSize: 15, color: label, opacity: 0.8 }}>
            {movie.tagline}
          </Text>
        </View>
      </View>
    </View>
  );
}

function VideoCard({ video }: { video: any }) {
  return (
    <View style={{ width: 280, marginHorizontal: 4 }}>
      <Image
        source={{ uri: `https://img.youtube.com/vi/${video.key}/0.jpg` }}
        style={{ width: "100%", height: 157, borderRadius: 8 }}
        transition={300}
      />
      <Text style={{ fontSize: 14, color: label, marginTop: 4 }} numberOfLines={1}>
        {video.name}
      </Text>
    </View>
  );
}

function CastCard({ person }: { person: any }) {
  return (
    <Link href={`/person/${person.id}`} asChild>
      <TouchableBounce style={{ width: 100, marginHorizontal: 4 }}>
        <Image
          source={{ 
            uri: person.profile_path 
              ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
              : 'https://via.placeholder.com/100x150'
          }}
          style={{ width: 100, height: 150, borderRadius: 8 }}
          transition={300}
        />
        <Text style={{ fontSize: 14, color: label, marginTop: 4 }} numberOfLines={1}>
          {person.name}
        </Text>
        <Text style={{ fontSize: 12, color: label, opacity: 0.7 }} numberOfLines={1}>
          {person.character}
        </Text>
      </TouchableBounce>
    </Link>
  );
}

function CompanyCard({ company }: { company: any }) {
  return (
    <View style={{ alignItems: "center", marginHorizontal: 8, width: 100 }}>
      {company.logo_path && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w200${company.logo_path}` }}
          style={{ width: 80, height: 80, resizeMode: "contain" }}
          transition={300}
        />
      )}
      <Text style={{ fontSize: 12, color: label, textAlign: "center", marginTop: 4 }} numberOfLines={2}>
        {company.name}
      </Text>
    </View>
  );
}

function SimilarMovieCard({ movie }: { movie: any }) {
  return (
    <Link href={`/movie/${movie.id}`} asChild>
      <TouchableBounce style={{ marginHorizontal: 4 }}>
        <View style={{ width: 140 }}>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w300${movie.poster_path}` }}
            style={{ width: 140, height: 210, borderRadius: 8 }}
            transition={300}
          />
          <Text style={{ fontSize: 14, color: label, marginTop: 4 }} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={{ fontSize: 12, color: label, opacity: 0.7 }}>
            ★ {movie.vote_average.toFixed(1)}
          </Text>
        </View>
      </TouchableBounce>
    </Link>
  );
}

async function MovieDetails({ id }: { id: string }) {
  const movieResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  );
  const movie = await movieResponse.json();

  if (!movieResponse.ok) {
    throw new Error("Failed to fetch movie");
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: movie.title,
        }}
      />

<FadeIn>
      <MovieHero movie={movie} />
</FadeIn>

      <FadeIn>
      <View style={{ marginBottom: 24, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: label, lineHeight: 24 }}>
          {movie.overview}
        </Text>
        </View>
      </FadeIn>

      <FadeIn>
        <View style={{ marginBottom: 24, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "600", color: label, marginBottom: 12 }}>
          About
        </Text>
        <View style={{ backgroundColor: "rgba(120,120,128,0.12)", borderRadius: 10 }}>
          {[
            { label: "Release Date", value: new Date(movie.release_date).toLocaleDateString() },
            { label: "Age Rating", value: movie.adult ? "Adult" : "All Ages" },
            { label: "Runtime", value: `${movie.runtime} minutes` },
            { label: "Budget", value: movie.budget ? `$${(movie.budget/1000000).toFixed(1)}M` : "N/A" },
            { label: "Revenue", value: movie.revenue ? `$${(movie.revenue/1000000).toFixed(1)}M` : "N/A" },
            { label: "Countries", value: movie.production_countries.map((c: {name: string}) => c.name).join(", ") },
            { label: "Languages", value: movie.spoken_languages.map((l: {name: string}) => l.name).join(", ") },
            { label: "Genres", value: movie.genres.map((g: {name: string}) => g.name).join(", ") },
          ].map((item, index, array) => (
            <View 
              key={item.label}
              style={{
                padding: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                borderBottomWidth: index === array.length - 1 ? 0 : 0.5,
                borderBottomColor: "rgba(120,120,128,0.2)",
              }}
            >
              <Text style={{ fontSize: 16, color: label, opacity: 0.8, flex: 1 }}>{item.label}</Text>
              <Text style={{ fontSize: 16, color: label, flex: 2 }}>{item.value}</Text>
            </View>
          ))}
          </View>
        </View>
      </FadeIn>
    </>
  );
}

async function MovieVideos({ id }: { id: string }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.TMDB_API_KEY}`
  );
  const videos = await response.json();

  if (!videos.results.length) return null;

  return (
    <HorizontalList title="Teasers & Trailers">
      {videos.results.map((video: any) => (
        <VideoCard key={video.key} video={video} />
      ))}
    </HorizontalList>
  );
}

async function MovieCast({ id }: { id: string }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}`
  );
  const credits = await response.json();

  return (
    <HorizontalList title="Cast & Crew">
      {credits.cast.slice(0, 10).map((person: any) => (
        <CastCard key={person.id} person={person} />
      ))}
    </HorizontalList>
  );
}

async function MovieCompanies({ id }: { id: string }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}`
  );
  const movie = await response.json();

  return (
    <HorizontalList title="Companies">
      {movie.production_companies.map((company: any) => (
        <CompanyCard key={company.id} company={company} />
      ))}
    </HorizontalList>
  );
}

async function SimilarMovies({ id }: { id: string }) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}`
  );
  const similar = await response.json();

  return (
    <HorizontalList title="More Like This">
      {similar.results.slice(0, 10).map((movie: any) => (
        <SimilarMovieCard key={movie.id} movie={movie} />
      ))}
    </HorizontalList>
  );
}

function MovieSkeleton() {
  return (
    <View style={{ gap: 16 }}>
      <View style={{ height: 300, backgroundColor: "rgba(120,120,128,0.12)" }} />
      <View style={{ height: 100, backgroundColor: "rgba(120,120,128,0.12)", margin: 16 }} />
    </View>
  );
}

function ListSkeleton() {
  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ height: 24, width: 200, backgroundColor: "rgba(120,120,128,0.12)", marginBottom: 12, marginHorizontal: 16 }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12 }}>
        {[1,2,3,4].map(i => (
          <View key={i} style={{ width: 140, height: 210, backgroundColor: "rgba(120,120,128,0.12)", marginHorizontal: 4, borderRadius: 8 }} />
        ))}
      </ScrollView>
    </View>
  );
}
