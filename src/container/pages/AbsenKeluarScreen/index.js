import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  PermissionsAndroid,
  SafeAreaView,
} from 'react-native';

import {
  BoxInfo, 
  BoxLocation, 
  CustomTopBar, 
  ButtonAbsenCamera
} from '../../../components';

import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import Geolocation from 'react-native-geolocation-service';
import {AuthContext} from '../../../actions/context/AuthContext';
import {DestinationContext} from '../../../actions/context/DestinationContext';
import {API} from '../../../actions/config/config';

import Toast from 'react-native-simple-toast';
import {getData, storeData} from '../../../actions/storageAction';
import { useWatchLocation, useHaversine, useTimeInterval, useGrantedPresensi, checkTodayAbsent } from '../../../app/_hooks';
import { PresensiContext } from '../../../actions/context/PresensiContext';
import { debounce } from '../../../app/_helper';
import { checkTodayAbsentOut, checkTodaySelfieOut } from '../../../app/_hooks/useGrantedPresensi';

const AbsenKeluarScreen = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const {destination, locations, selectLocation, selectedUK, dispatch} = useContext(DestinationContext);
  const {presensi} = useContext(PresensiContext); 
  const {currentPosition, setCurrentPosition} = useWatchLocation();
  const {distanceLimit, diffPosition} = useHaversine(currentPosition, destination);
  const [time] = useTimeInterval();

  const { grantedAbsent, setGrantedAbsent, setMocked } = useGrantedPresensi(destination, currentPosition, diffPosition, distanceLimit);

  const [selfieStatus, setSelfieStatus] = useState(true);
  const [absentStatus, setAbsentStatus] = useState(true);
  const [absenIN, setAbsenIn] = useState(true);
  
  const changeLocation = debounce((val) => {
    selectLocation(val).then(res => {
      refreshLocation();
    }).catch(err => {
      console.log(err)
    });
  }, 1000);

  useEffect(() => {
    let focus = navigation.addListener('focus', refreshLocation);
    return focus;
  }, [navigation]);


  const postAbsent = () => {
    // let myHeaders = new Headers();
    // myHeaders.append('authorization', auth.token);

    // let form = new FormData();
    // form.append('longitude', currentPosition.coords.longitude);
    // form.append('latitude', currentPosition.coords.latitude);
    // // penyesuaian api
    // let file = {
    //   uri: presensi.data.keluar.file,
    //   name: `${auth.data.nip}-${moment()}.jpg`,
    //   type: 'image/jpg'
    // }  
    // form.append('file', file);
    // form.append('status', 'CHECK OUT');
    // form.append('id_unit_kerja', destination.id_unit_kerja)
    // form.append('tipe', destination.tipe)

    // // url https://arsipsimpeg.kotabogor.go.id/rest-v3/attendances
    // // url `${API}/checkout`
    //   return fetch(`${API}/attendances`, {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: form,
    //   })
    //   .then((res) => {
    //     return {
    //       status: res.status,
    //       ...res.json()
    //     }
    //   })
    //   .then((json) => {
    //     if (json.status === 200) {
    //       Toast.showWithGravity('Absen berhasil', Toast.SHORT, Toast.CENTER);
    //       storeData(moment().format('DD-MM-YYYY') + '-OUT', 'TERCATAT');
    //       navigation.navigate('RekapitulasiScreen');
    //     } else {
    //       Toast.showWithGravity('Absen gagal', Toast.SHORT, Toast.CENTER);
    //     }
    //   })
    //   .catch((err) => {
    //     Toast.showWithGravity('Absen error ' + err, Toast.SHORT, Toast.CENTER);
    //     console.log(err);
    //   });
  };

  
  const postData = ({body, token}) => {
    let myHeaders = new Headers();
    // url https://arsipsimpeg.kotabogor.go.id/rest-v3/attendances
    // url `${API}/checkin`
    myHeaders.append('authorization', token);
    return fetch(`${API}/attendances`, {
      method: 'POST',
      headers: myHeaders,
      body: body,
    })
    .then(res => {
      return {
        status: res.status,
        ...res.json()
      }
    })
    .then(json => {
      if (json.status === 200) {
        Toast.showWithGravity('Absen berhasil', Toast.SHORT, Toast.CENTER);
        storeData(moment().format('DD-MM-YYYY') + '-IN', 'TERCATAT');
        navigation.navigate('RekapitulasiScreen');
      } else {
        Toast.showWithGravity('Absen gagal', Toast.SHORT, Toast.CENTER);
      }
    }).catch((err) => {
      Toast.showWithGravity('Absen error ' + err, Toast.SHORT, Toast.CENTER);
    });
  }

  const postAbsentx = () => {
    refreshLocation();
    checkTodaySelfie()
      .then(result => {
        if(result){
          checkTodayAbsent()
            .then(result => {
              if(!result){
                let form = new FormData();
                form.append('longitude', currentPosition.coords.longitude);
                form.append('latitude', currentPosition.coords.latitude);
                // penyesuaian api
                let file = {
                  uri: presensi.data.masuk.file,
                  name: `${auth.data.nip}-${moment()}.jpg`,
                  type: 'image/jpg'
                }  
                form.append('file', file);
                form.append('status', 'CHECK OUT');
                form.append('id_unit_kerja', destination.id_unit_kerja)
                form.append('tipe', destination.tipe)
                postData({body: form, token: auth.token});
              }
          }).catch(err => {
            Toast.showWithGravity('Post absen error'+ err, Toast.SHORT, Toast.CENTER);
          });
        }
      }).catch(err => {
        Toast.showWithGravity('Post absen error'+ err, Toast.SHORT, Toast.CENTER);
      });
  };

  const openCamera = () => {
    navigation.navigate('AbsenCameraOut');
  };

  const refreshLocation = debounce(() => {
    // checkTodayAbsent()
    // .then(status => {
    //   console.log('today absent in:', status)
    //   setAbsenIn(status) // set to true if already done
    // })

    checkTodaySelfieOut()
    .then(status => {
      setSelfieStatus(status !== false) // set to false if not selfie
    }).catch(err => {
      console.log(err)
    })

    checkTodayAbsentOut()
    .then(status => {
      setAbsentStatus(status) // set to true if already done
    }).catch(err => {
      console.log(err)
    })

    Geolocation.getCurrentPosition((position) => {
      if (position.mocked === true) {
        setMocked(true);
      } else {
        setMocked(false);
      }
      setCurrentPosition(position);
      if (
          diffPosition < distanceLimit && 
          position.coords.accuracy <= 60 &&
          absenIN == true
        ) {
        setGrantedAbsent(true);
      } else {
        setGrantedAbsent(false);
      }
    });
  });

  return (
    <SafeAreaView style={styles.flex}>
      <CustomTopBar navigation={navigation} color="#b50f00" iconPath={require("../../../assets/icons/keluar.png")} title="Presensi Keluar" />

      <ScrollView style={styles.scrollContainer}>

        <BoxInfo mode="out" time={time} curentPosition={currentPosition} distanceLimit={distanceLimit} diffPosition={diffPosition} />

        <BoxLocation currentPosition={currentPosition} refreshLocation={refreshLocation} />
        
        
        <Picker 
          selectedValue={selectedUK}
          onValueChange={changeLocation}>
          {locations.map(item => {
            return (<Picker.Item key={item.id_unit_kerja} label={item.unit_kerja} value={item.id_unit_kerja} />)
          })}
        </Picker>

        <ButtonAbsenCamera 
          mode="keluar"
          selfieStatus={selfieStatus} 
          grantedAbsent={grantedAbsent && absenIN} 
          openCamera={openCamera} 
          postAbsent={postAbsent} 
          absentStatus={absentStatus} />

      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  topseparator: {
    width: '100%',
    ...Platform.select({
      ios: {
        height: 50,
      },
      android: {
        height: 0,
      },
    }),
  },
  app: {
    flex: 1,
    padding: 24,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
});

export default AbsenKeluarScreen;
