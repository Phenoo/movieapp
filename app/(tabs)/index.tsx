import { StyleSheet, ScrollView, FlatList, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native';


import { Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

import MovieCard from '../../components/MovieCard';
import { Link } from 'expo-router';


export default function TabOneScreen() {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("/movie/top_rated")
  const apiKey = '78a89fea1070f9daadf21c27cc6d4ebc'; // Replace with your actual API key
  const query = 'Jack Reacher';
  
  const filters = [
    { name: "popular", endpoint: "/movie/popular" },
    { name: "top rated", endpoint: "/movie/top_rated" },
    { name: "upcoming", endpoint: "/movie/upcoming" },
    { name: "now  playing", endpoint: "/movie/now_playing" },
    { name: "tv series", endpoint: "/tv/on_the_air" },
    ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3${filter}?api_key=${apiKey}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filter]);


  if(!movies){
    return (
      <ActivityIndicator />
    )
  }
  return (
    <SafeAreaView style={{paddingHorizontal: 10}}>
       
        <Pressable style={{flexDirection: "row", justifyContent: "space-between", marginTop: 15, paddingVertical: 6}}>
          <Text>
            <Feather name="menu" size={28} />
          </Text>
          <Pressable style={{flexDirection: "row", gap: 15, alignItems: "center"}}>
          <Text>
            <Link href="/modal" asChild>
              <Ionicons name="search-sharp" size={24} />
            </Link>
          </Text>
          <Text>
            <Octicons name="bell" size={22}  />
          </Text>
          </Pressable>
        </Pressable>


      <ScrollView  
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      >
        <Pressable style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Recommendations for you</Text>
          <Text>
            <Ionicons name="ios-funnel-outline" size={24}  />
          </Text>
        </Pressable>
        <ScrollView 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginBottom: 20 }}
        horizontal>
          {
            filters.map((item) => (
              <TouchableOpacity key={item.name} 
                onPress={() => setFilter(item.endpoint)}
                style={{backgroundColor: filter === item.endpoint ? "#333c20" : "#101010",
                    borderColor: filter === item.endpoint ? "#BFEE61" : "#fff",
                    borderWidth: 2,
                    marginRight: 10,
                    padding: 10,
                    borderRadius: 20,
              }}>
                <Text style={{
                  textTransform: "capitalize",
                  fontSize: 12,
                  color: "white"
                }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))
          }
        </ScrollView>
        <FlatList
              data={movies}
              keyExtractor={(item : any) => item.id}
              renderItem={({ item }) => (
                <MovieCard item={item} />
              )}
      />

    </ScrollView>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
