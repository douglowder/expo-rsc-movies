"use server";

import TouchableBounce from "@/components/ui/TouchableBounce";
import { Link } from "expo-router";
import { Image, Text, View, ScrollView } from "react-native";
import * as AC from '@bacons/apple-colors'


export async function renderPersonDetails(id: string) {
  // Fetch person details
  const response = await fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`);
  const person = await response.json();

  // Fetch person credits
  const creditsResponse = await fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${process.env.TMDB_API_KEY}`);
  const credits = await creditsResponse.json();

  // Process credits into categories
  const allCredits = credits.cast.concat(credits.crew);
  const actingCredits = credits.cast;
  const crewCredits = credits.crew;
  const directingCredits = crewCredits.filter((credit: any) => credit.job === "Director");

  return (
    <View style={{ flex: 1 }}>
      {/* Hero Section */}
      <View style={{ 
        height: 300,
        backgroundColor: AC.systemGray6,
        justifyContent: "flex-end",
        padding: 16
      }}>
        {person.profile_path && (
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/original${person.profile_path}` }}
            style={{ 
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
            }}
          />
        )}
        <Text style={{ 
          fontSize: 32,
          fontWeight: "bold",
          color: AC.label
        }}>
          {person.name}
        </Text>
        <Text style={{ 
          fontSize: 18,
          color: AC.secondaryLabel
        }}>
          {person.known_for_department}
        </Text>
      </View>

      {/* Overview Section */}
      <View style={{ padding: 16 }}>
        <Text style={{ 
          fontSize: 22,
          fontWeight: "600",
          color: AC.label,
          marginBottom: 12
        }}>
          Overview
        </Text>
        
        <View style={{ marginBottom: 16 }}>
          {person.birthday && (
            <Text style={{ color: AC.label }}>
              Born: {new Date(person.birthday).toLocaleDateString()}
              {person.place_of_birth && ` in ${person.place_of_birth}`}
            </Text>
          )}
          {person.deathday && (
            <Text style={{ color: AC.label }}>
              Died: {new Date(person.deathday).toLocaleDateString()}
            </Text>
          )}
        </View>

        <Text style={{ 
          color: AC.label,
          lineHeight: 20
        }}>
          {person.biography}
        </Text>
      </View>

      {/* Credits Section */}
      <View style={{ flex: 1, marginTop: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16 }}>
          <TouchableBounce style={{ marginRight: 16 }}>
            <Text style={{ color: AC.systemBlue }}>All ({allCredits.length})</Text>
          </TouchableBounce>
          <TouchableBounce style={{ marginRight: 16 }}>
            <Text style={{ color: AC.label }}>Acting ({actingCredits.length})</Text>
          </TouchableBounce>
          <TouchableBounce>
            <Text style={{ color: AC.label }}>Directing ({directingCredits.length})</Text>
          </TouchableBounce>
        </ScrollView>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={{ 
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}>
            {allCredits.map((credit: any) => (
              <Link key={credit.id} href={`/${credit.media_type}/${credit.id}`} asChild>
                <TouchableBounce style={{ 
                  width: "48%",
                  marginBottom: 16
                }}>
                  <View style={{
                    backgroundColor: AC.secondarySystemBackground,
                    borderRadius: 12,
                    overflow: "hidden"
                  }}>
                    <Image
                      source={{ 
                        uri: credit.poster_path 
                          ? `https://image.tmdb.org/t/p/w300${credit.poster_path}`
                          : undefined
                      }}
                      style={{
                        width: "100%",
                        height: 200,
                        backgroundColor: AC.systemGray5
                      }}
                    />
                    <View style={{ padding: 8 }}>
                      <Text numberOfLines={2} style={{ 
                        fontSize: 14,
                        fontWeight: "500",
                        color: AC.label
                      }}>
                        {credit.title || credit.name}
                      </Text>
                      <Text style={{
                        fontSize: 12,
                        color: AC.secondaryLabel
                      }}>
                        {credit.character || credit.job}
                      </Text>
                    </View>
                  </View>
                </TouchableBounce>
              </Link>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}