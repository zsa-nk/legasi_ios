import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';

const TopSection = () => {
  return (
    <ImageBackground
      source={require('../../../assets/logo/legasi.png')}
      style={styles.topSection}
      imageStyle={{borderBottomLeftRadius: 100, borderBottomRightRadius: 100}}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}></View>
        <View style={styles.logoTitleWrapper}>
          <Text style={styles.whiteTitle}></Text>
          <Text style={styles.blueSubTitle}></Text>
          <Text style={styles.whiteSubTitle}>Version 2.2</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default TopSection;

const styles = StyleSheet.create({
  logo: {
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    flex: 1,
  },
  logoTitleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
  },
  whiteTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginTop: 2,
    color: '#fff',
    textTransform: 'uppercase',
  },
  blueSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: -7,
    color: '#e6f4ff',
  },
  whiteSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    marginTop: 2,
    color: '#e6f4ff',
    opacity: 0.8,
  },
  topSection: {
    height: 300,
    backgroundColor: '#188FC7',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden', // untuk menjaga radius pada background gambar
  },
  header: {
    flex: 1,
    marginVertical: 15,
    paddingHorizontal: 35,
    paddingTop: 15,
    marginTop: 50,
  },
  logoWrapper: {
    justifyContent: 'center',
    width: 90,
    height: 100,
    width: '100%',
  },
});
