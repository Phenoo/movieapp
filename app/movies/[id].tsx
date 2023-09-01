import {  View, ActivityIndicator, Image, Dimensions, Pressable } from 'react-native'
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from '../../components/Themed';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

var { width, height } = Dimensions.get("window");


const MoviePage = () => {
    const { id } = useLocalSearchParams();
    const [movies, setMovies] = useState([]);
    const [images, setImages] = useState([]);

    const apiKey = '78a89fea1070f9daadf21c27cc6d4ebc';
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
          const responsex = await fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`);
          const data = await response.json();
          const datax = await responsex.json();
          setImages(datax.backdrops)
          setMovies(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [id]);


  if(!movies || images.length < 1){
    return (
        <ActivityIndicator />
    )
  }

  return (
    <View>
        <Pressable style={{ position: "relative"}}>
            <Image
            source={{uri: `https://image.tmdb.org/t/p/w500/${movies.poster_path || movies.backdrop_path}`}} 
            style={{ width: "100%", height: 400}} 
            />

                <View style={{width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)",
                    position: "absolute", top: 0,paddingHorizontal: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity style={{marginVertical: 20}} 
                    onPress={() => router.back()}>
                    <View style={{ height: 50, width: 50, padding: 10, alignItems: "center", justifyContent: "center" }}>
                        <Text>
                        <AntDesign name="arrowleft" size={24} color="#fff" />
                        </Text>
                    </View>
                </TouchableOpacity>
             </View>
             <Pressable style={{position: "absolute", bottom: 20,  marginTop: 10, borderRadius: 15, paddingVertical: 5, marginHorizontal: 10}}>
                
                 <View style={{ backgroundColor: "transparent", flexDirection: "row", alignItems: "center", gap: 10 }}>

                  <Pressable style={{backgroundColor: "#808080", borderRadius: 10}}>
                    <Text style={{  fontSize: 10, padding: 5,color: "#fff"}}> IMdb {movies.vote_average}</Text>
                  </Pressable>

                    <Pressable style={{backgroundColor: "#808080", borderRadius: 10}}>
                      <Text style={{  fontSize: 10, padding: 5, color: "#fff"}}> RT {movies.popularity}</Text>
                    </Pressable>

                 </View>

                  
                    <Text style={{ fontSize: 18, marginTop: 16, fontWeight:"500", color: "#fff"   }}>
                        {movies.original_title}
                    </Text>
                    <Text style={{ fontSize: 12, marginTop: 6, color: "#fff" }}>
                        {movies.title}
                    </Text>


                    <View style={{ backgroundColor: "transparent", flexDirection: "row", alignItems: "center", gap: 5 }}>
                        {
                            movies.genres && movies.genres.map((genre) => (
                                <Text key={genre.id} style={{ fontSize: 12, color: "#fff"}}>
                                    <Entypo name="dot-single" size={24} color="white" />
                                    {genre.name}
                                </Text>
                            ))
                        }
                    </View>
                    <View>
                      
                    </View>
                </Pressable>
        </Pressable>

        <ScrollView horizontal style={{backgroundColor: "transparent"}}>
          {
            images.length > 0 ? (
              images.map((image) => (
                <Image
                key={image.id}
                source={{uri: `https://image.tmdb.org/t/p/w500/${image.file_path}`}} 
                style={{ width: 150, height: 150, marginLeft: 10}} resizeMode='contain' 
                />
              ))
            ) : (
              null
            )
          }

        </ScrollView>

        <View style={{backgroundColor: "transparent", marginHorizontal: 10}}>
          <Text style={{fontSize: 22, marginTop: 20, fontWeight: "bold", color: "#bfee61"}}>
            Overview
          </Text>
          <Text style={{marginTop: 10, fontSize: 13}}>
            {movies.overview}
          </Text>
        </View>
      <StatusBar />
    </View>
  )
}

export default MoviePage

