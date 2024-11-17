"use server";

import TouchableBounce from "@/components/ui/TouchableBounce";
import { Link } from "expo-router";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import * as AC from '@bacons/apple-colors'
import ShowMore from "@/components/ShowMore";
import { Image } from "expo-image";


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
          transition={200}
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
        
        <View style={{ 
          backgroundColor: AC.secondarySystemGroupedBackground, 
          borderRadius: 10,
          marginBottom: 16
        }}>
          {[
            person.birthday && {
              label: "Born",
              value: `${new Date(person.birthday).toLocaleDateString()}${person.place_of_birth ? ` in ${person.place_of_birth}` : ''}`
            },
            person.deathday && {
              label: "Died", 
              value: new Date(person.deathday).toLocaleDateString()
            }
          ].filter(Boolean).map((item, index, array) => (
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
              <Text style={{ fontSize: 16, color: AC.secondaryLabel, flex: 1 }}>{item.label}</Text>
              <Text numberOfLines={1} style={{ fontSize: 16, color: AC.label, flex: 2 }}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View>
            <ShowMore text={person.biography} />
          
        </View>
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
                    transition={200}
                      source={{ 
                        uri: credit.poster_path 
                          ? `https://image.tmdb.org/t/p/w300${credit.poster_path}`
                          : undefined
                      }}
                      style={{
                        borderRadius: 12,
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