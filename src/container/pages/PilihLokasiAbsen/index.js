
import React, {useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { AuthContext } from '../../../actions/context/AuthContext';

const useLocationOption = () => {

  const {auth} = useContext(AuthContext);
  const [locations, setLocations] = useState();

  const getLocations = async () => {
    const response = await fetch(`https://arsipsimpeg.kotabogor.go.id/rest-v3/location`, {
      method: 'GET',
      'Content-Type': 'application/json',
      'Authorization': auth.token
    });
    const json = await response.json();
    return {...json, status: response.status}
  }

  const locationEffect = () => {
    getLocations()
    .then(response => {
      // console.log(response)
      setLocations(response)
    }).catch(err => {
      console.error(err)
    })
  }
  useEffect(locationEffect, []);
  return [locations]
}

const ItemLokasiAbsen = ({item}) => {
  return (
    <View>
      <Text></Text>
      <Text></Text>
    </View>
  );
}

const PilihLokasiAbsen = () => {
  const [location] = useLocationOption();
  return (
    <View>
      <FlatList data={location} renderItem={ItemLokasiAbsen} keyExtractor={item => item.id} />
    </View>
  )
}

export default PilihLokasiAbsen

const styles = StyleSheet.create({})