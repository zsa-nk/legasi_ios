import React from 'react'

import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native'

const SmallBox  = ({label, value}) => {
  return (
    <View style={{width: '50%'}}>
      <Text style={styles.accuracyValue}>
        {value}
      </Text>
      <Text style={styles.accuracy}>
        {label}
      </Text>
    </View>
  )
}

const BoxLocation = ({ currentPosition, refreshLocation }) => {
  const refreshLocationx = () => {
    refreshLocation();
  }
  return (
    <View style={styles.mainContainer}>
    <View style={{flex: 1, marginBottom: 3}}>
      <Text style={styles.title}>
        Posisi anda saat ini
      </Text>
    </View>
    <View style={styles.container}>
      <SmallBox label="Longitude" value={currentPosition.coords.longitude != 'undefined' ? currentPosition.coords.longitude : 0} />
      <SmallBox label="Latitude" value={currentPosition.coords.latitude != 'undefined' ? currentPosition.coords.latitude : 0} />
      <SmallBox label="Akurasi" value={Math.round(currentPosition.coords.accuracy != 'undefined' ? currentPosition.coords.accuracy : 0)} />

      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={refreshLocation}>
            <View style={styles.refreshLocation}>
              <Text style={styles.refreshLocationText}>
                Refresh Lokasi
              </Text>
            </View>
        </TouchableOpacity>
      </View>

    </View>
  </View>
  )
}

export default BoxLocation;

const styles = StyleSheet.create({
  refreshLocation:{
    padding: 4,
    borderRadius: 20,
    width: '100%',
    marginTop: 4,
    backgroundColor:'#00ccff',
    paddingVertical:10,
    paddingHorizontal:20,
    alignItems:'center'
  },
  refreshLocationText: {
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    fontSize: 12,
  },
  accuracyValue: {
    fontFamily: 'Poppins-Bold',
    color: '#00b569',
    fontSize: 18,
  },
  accuracy: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: -10,
  },
  rowContainer: {
    width: '50%',
    marginTop:20
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontSize: 16,
  },
  mainContainer: {
    marginTop: 220,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    marginBottom: 20,
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
})