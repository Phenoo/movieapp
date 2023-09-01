import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { debounce } from "lodash";

import { Text, View } from '../components/Themed';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchCard from '../components/SearchCard';


export default function ModalScreen() {
    const [movies, setMovies] = useState([]);
    const [term, setTerm] = useState("");
    const apiKey = '78a89fea1070f9daadf21c27cc6d4ebc'; // Replace with your actual API key
  

    const handleTextDebounce = useCallback(
      debounce((input : any) => setTerm(input), 400),
      []
    );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${term}&api_key=${apiKey}`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [term]);

  
  return (
    <View style={{backgroundColor: "transparent"}}>
      <Pressable style={{margin: 10}}>
      <TextInput style={{borderWidth: 2, color: "#fff", borderColor: "#111", height: 40, paddingHorizontal: 8}}
        onChangeText={handleTextDebounce} placeholder='Search movies...'  placeholderTextColor="#808080"
      />

      <View style={{ backgroundColor: "transparent", marginVertical: 20 }}>
        <Text style={{ fontWeight: "600", marginVertical: 10}}>
          Search Results:
        </Text>
        {
          movies.length > 0 ? (
            <SafeAreaView>
              {
                movies.map((item) => (
                  <SearchCard item={item} key={item.id} />
                ))
              }
            </SafeAreaView>
          ) : (
            <View style={{ backgroundColor: "transparent", marginVertical: 30}}>
            <Text style={{fontWeight: "500", fontSize: 18 }}>
                Nothing is here...

            </Text>
          </View>
          )
        }
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </Pressable>
    </View>
  );
}
