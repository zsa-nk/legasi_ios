import React from 'react';

import {View, Text, Image, StyleSheet} from 'react-native';

const TopSection = () => {
  return (
    <View style={styles.topSection}>
      <View style={styles.header}>
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../../assets/logo/kotabogor.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.logoTitleWrapper}>
          <Text style={styles.whiteTitle}>LEGASI</Text>
          <Text style={styles.blueSubTitle}>
            (Layanan Kepegawaian Digital Terintegrasi)
          </Text>
          <Text style={styles.whiteSubTitle}>Version 2.2</Text>
        </View>
      </View>
    </View>
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
    //backgroundColor:'#fff',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
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
