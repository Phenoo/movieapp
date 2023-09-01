import { StyleSheet, Dimensions, Pressable, View} from 'react-native'
import React from 'react'
import { Text } from './Themed'
import { Image } from 'react-native'
import { Link } from 'expo-router';

import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { format } from 'date-fns';


var { width, height } = Dimensions.get("window");


const MovieCard = ({item}) => {
  console.log(item)
  return (
    <Link href={`/movies/${item.id}`} style={{marginHorizontal: 2, marginBottom: 30, width: width, height: 220, borderRadius: 10}}>
        <View style={{ backgroundColor: "transparent", borderRadius: 10,position: "relative"}}>
              <Image 
                source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path}`}} 
                style={{ height: "100%", width: width, borderRadius: 10, position: "relative"}}
                 />
            <View style={{ position: "absolute", top: -1, backgroundColor: "rgba(0, 0, 0, 0.5)", height: "100%" , width: width, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10 }}>

                <View style={{ width:  "100%", backgroundColor: "transparent", flexDirection: "row", alignItems: "center", gap: 10 }}>

                  <Pressable style={{backgroundColor: "#808080", borderRadius: 10}}>
                    <Text style={{  fontSize: 10, padding: 5,color: "#fff"}}> IMdb {item.vote_average}</Text>
                  </Pressable>

                    <Pressable style={{backgroundColor: "#808080", borderRadius: 10}}>
                      <Text style={{  fontSize: 10, padding: 5, color: "#fff"}}> RT {item.popularity}</Text>
                    </Pressable>

                </View>

                  <View style={{backgroundColor: "transparent"}}></View>
                  <View style={{backgroundColor: "transparent", position: "absolute", left: 10, bottom: 10}}>
                    <Text style={{color: "#fff", fontSize: 18, fontWeight: "600"}}>
                      {item.title}
                    </Text>

                    <View style={{ marginTop: 10, flexDirection: "row", gap: 16, alignItems: "center", paddingHorizontal: 10 }}>
                      {
                        !item.video ? (
                          <Text>
                            <Feather name="video-off" size={20} color="#BFEE61" />
                          </Text>
                        ) : (
                          <Text>
                            <Feather name="video" size={20} color="#BFEE61" />
                          </Text>
                        )
                      }
                      <Text style={{color: "white", fontWeight: "500", fontSize: 14}}>
                        {format(new Date(item?.release_date || item.first_air_date), 'yyyy')}
                      </Text>



                    </View>
                  </View>
                  <View>
                    
                  </View>
                </View>
        </View>
    </Link>
  )
}

export default MovieCard

const styles = StyleSheet.create({})