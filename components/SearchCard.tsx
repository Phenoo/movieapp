import { StyleSheet, View, Image, Pressable } from 'react-native'
import React from 'react'
import { Link, useNavigation } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text } from './Themed';

const SearchCard = ({item}) => {
    const navigate = useNavigation()
    
  return (

        <Pressable style={{ flexDirection: "row", gap: 20, alignItems: "center", marginVertical: 10 }}>

            <Image
                key={item.id}
                source={{uri: `https://image.tmdb.org/t/p/w500/${item.poster_path || item.backdrop_path}`}} 
                style={{ width: 100, height: 80, borderRadius: 10}}
                />
            
        <Text style={{fontWeight: "600", fontSize: 16, width: 180}}>{item.title}</Text>
        <Link  href={{
        pathname: `/movies/${item.id}`,
        params: { 
            id: item.id, 
        }
      }} onPress={() => navigate.goBack()}>
        <Text>
        <MaterialCommunityIcons name="arrow-top-right-bold-box" size={24}   />
        </Text>
      </Link>
        </Pressable>

  )
}

export default SearchCard

const styles = StyleSheet.create({})