import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import moment from 'moment';

const BoxInfo = ({ diffPosition, distanceLimit, time, mode }) => {
  return (
    <View style={mode ==  "out" ? styles.mainInfoContainerRed : styles.mainInfoContainer}>
      <View style={styles.mainDiffPositionContainer}>

        <View style={styles.roadIconContainer}>
          <Image
            source={require('../../../assets/icons/road.png')}
            style={{
              width: undefined,
              height: undefined,
              resizeMode: 'contain',
              flex: 1,
            }}
          />
        </View>

        <View style={styles.diffPositionContainer}>
          <Text style={styles.diffPositionText}>
            {diffPosition} m
          </Text>
          <Text
            style={styles.directionText}>
            Jarak ke titik absensi
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.distanceContainer}>
          <Text style={styles.distanceLimitText}>
            {Math.round(distanceLimit).toFixed(1)} m{/* 50 m */}
          </Text>
          <Text style={styles.regularText}>
            Jarak ke titk absensi yang dianjurkan
          </Text>
        </View>
        <View style={styles.dateTimeContainer}>
          <Text style={styles.defaultText}>
            {time}
          </Text>
          <Text style={styles.dateInfo}>
            {moment(new Date()).format('DD MM YYYY')}
          </Text>
        </View>
        <View style={styles.calendarIcon}>
          <Image
            source={require('../../../assets/icons/calendar.png')}
            style={{ width: 32, height: 32 }}
          />
        </View>
      </View>
      
    </View>
  );
}

export default BoxInfo

const styles = StyleSheet.create({
  calendarIcon: {
    flex: 0.4,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingTop: 20,
    marginTop: -120
  },
  dateInfo: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'white',
    marginTop: -5,
  },
  defaultText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: 'white',
  },
  regularText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'white',
    marginTop: -10,
  },
  dateTimeContainer: {
    flex: 1.5,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingRight: 8,
    marginTop: -15
  },
  distanceLimitText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'white',
  },
  distanceContainer: { 
    flex: 2.6, 
    justifyContent: 'flex-start', 
    marginTop: -30 
  },
  infoContainer: { 
    flex: 1, 
    flexDirection: 'row', 
    marginHorizontal: 5 
  },
  mainInfoContainer: {
    position: 'absolute',
    height: 300,
    width: '100%',
    backgroundColor: '#00b569',
  },
  mainInfoContainerRed: {
    position: 'absolute',
    height: 300,
    width: '100%',
    backgroundColor: '#b50f00',
  },
  directionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginTop: -15,
    color: 'white',
    opacity: 0.8,
  },
  diffPositionText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    marginTop: -10,
    color: 'white',
  },
  diffPositionContainer: {
    justifyContent: 'center',
    height: 80,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flex: 4,
  },
  mainDiffPositionContainer: {
    flex: 1,
    marginVertical: 15,
    paddingHorizontal: 35,
    paddingTop: 15,
    flexDirection: 'row',
    marginTop: 40,
  },
  roadIconContainer: { 
    width: 64, 
    height: 64, 
    flex: 1, 
    marginRight: 10 
  }

})