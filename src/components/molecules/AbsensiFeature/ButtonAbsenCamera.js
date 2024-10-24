import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet
} from 'react-native'

const ButtonAbsenCamera = ({selfieStatus, grantedAbsent, openCamera, postAbsent, absentStatus, mode}) => {
  const string = mode == 'keluar' ? 'Presensi Pulang': 'Presensi Masuk';
  if(selfieStatus && grantedAbsent){
    return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={absentStatus ? styles.buttonGreen : styles.buttonRed}
          disabled={absentStatus}
          onPress={postAbsent}>
          <Image source={require('../../../assets/icons/identification.png')} />
        </TouchableOpacity>
        <Text
          style={styles.buttonLabel}>
          {absentStatus ? 'Anda Sudah Melakukan ' + string : 'Tap disini untuk melakukan ' + string }
        </Text>
      </View>
    )
  }

  return (
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={grantedAbsent ? styles.buttonGreen : styles.buttonRed}
          disabled={grantedAbsent ? false : true}
          onPress={openCamera}>
          <Image source={require('../../../assets/icons/ic_camera.png')} />
        </TouchableOpacity>
        <Text style={styles.buttonLabel}>
          {grantedAbsent ? 'Silahkan Melakukan Selfie terlebih dahulu' : 'Anda terlalu jauh dari lokasi presensi'}
        </Text>
      </View>
  )
}

export default ButtonAbsenCamera

const styles = StyleSheet.create({
  buttonWrapper: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
    marginTop: 20,
  },
  buttonGreen:{
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#00b569',
  },
  buttonRed: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#b50f00',
  },
  buttonLabel: {
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    textAlign: 'center',
  }
});