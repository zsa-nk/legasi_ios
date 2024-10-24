import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  AppState,
  Text,
  Modal,
  Button,
} from 'react-native';

import moment from 'moment';
import Toast from 'react-native-simple-toast';
import Geolocation from 'react-native-geolocation-service';
import { Picker } from '@react-native-picker/picker';
import { API } from '../../../actions/config/config';
import { AuthContext } from '../../../actions/context/AuthContext';
import { getData, storeData } from '../../../actions/storageAction';
import { DestinationContext } from '../../../actions/context/DestinationContext';
import { ButtonAbsenCamera, BoxLocation, BoxInfo, CustomTopBar } from '../../../components';
import { 
  useWatchLocation, 
  useTimeInterval, 
  useHaversine, 
  useGrantedPresensi, 
  checkTodayAbsent, 
  checkTodaySelfie 
} from '../../../app/_hooks';

import { PresensiContext } from '../../../actions/context/PresensiContext';
import { debounce } from '../../../app/_helper';

const AbsenMasukScreen = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const {presensi} = useContext(PresensiContext); 
  const {destination, locations, selectLocation, selectedUK, dispatch} = useContext(DestinationContext);
  const [time] = useTimeInterval();
  const {currentPosition, setCurrentPosition} = useWatchLocation();
  const {distanceLimit, diffPosition} = useHaversine(currentPosition, destination);
  const {grantedAbsent, setGrantedAbsent, setMocked} = useGrantedPresensi(destination, currentPosition, diffPosition, distanceLimit); 
  const [absentStatus, setAbsentStatus] = useState(false);
  const [selfieStatus, setSelfieStatus] = useState(false);

  useEffect(() => {
    let focus = navigation.addListener('focus', refreshLocation);
    return focus
  }, [navigation]);

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
    .then(async res => {
      return res.json().then(data => ({
         status_code: res.status,
         ...data
       })).catch((err) => {
         Toast.showWithGravity('Presensi error' + err.message, Toast.SHORT, Toast.CENTER);
       })
    }).catch((err) => {
      Toast.showWithGravity('Absen error ' + err, Toast.SHORT, Toast.CENTER);
    });
  }

  const changeLocation = debounce((val) => {
    selectLocation(val).then(res => {
      refreshLocation();
    });
  }, 1000);

  const postAbsent = () => {
    refreshLocation()
    console.log(currentPosition)
    // refreshLocation();
    // if(selfieStatus == true && absentStatus == false){
    //   let form = new FormData();
    //   form.append('longitude', currentPosition.coords.longitude);
    //   form.append('latitude', currentPosition.coords.latitude);
    //   // penyesuaian api
    //   let file = {
    //     uri: presensi.data.masuk.file,
    //     name: `${auth.data.nip}-${moment()}.jpg`,
    //     type: 'image/jpg'
    //   }  
    //   form.append('file', file);
    //   form.append('status', 'CHECK IN');
    //   form.append('id_unit_kerja', destination.id_unit_kerja)
    //   form.append('tipe', destination.tipe)
      
    //   postData({body: form, token: auth.token})
    //   .then(json => {
    //     if (json.status_code === 200) {
    //       Toast.showWithGravity('Absen berhasil', Toast.SHORT, Toast.CENTER);
    //       storeData(moment().format('DD-MM-YYYY') + '-IN', 'TERCATAT');
    //       navigation.navigate('RekapitulasiScreen');
    //     } else {
    //       Toast.showWithGravity('Absen gagal', Toast.SHORT, Toast.CENTER);
    //     }
    //   });
    // }
  };

  const currentLocationTodestination = () => {
    const location = {
      latitude: currentPosition.coords.latitude, 
      longitude: currentPosition.coords.longitude,
      long_outer: (currentPosition.coords.latitude +  0.000001),
      lat_outer:  (currentPosition.coords.longitude + 0.000001),
      tipe: 'SECONDARY',
      id_unit_kerja: selectedUK
    };
    // console.log(JSON.stringify(location, null, 2))
    dispatch({type:'SET_DESTINATION', location})
  }

  const openCamera = () => {
    navigation.navigate('AbsenCamera');
  };

  const refreshLocation = debounce(() => {
    checkTodaySelfie()
    .then(result => {
      setSelfieStatus(result);
    }).catch(err => {
      console.log(err)
    })
    
    checkTodayAbsent()
    .then(result => {
      setAbsentStatus(result)
    }).catch(err => {
      console.log(err)
    });

    Geolocation.getCurrentPosition((position) => {
      if (position.mocked === true) {
        setMocked(true);
      } else {
        setMocked(false);
      }
      setCurrentPosition(position);
      if (parseInt(diffPosition) < parseInt(distanceLimit) && position.coords.accuracy <= 160) {
        setGrantedAbsent(true);
      } else {
        setGrantedAbsent(false);
      }
    });
  });

  return (
    <SafeAreaView style={styles.flex}>
      <CustomTopBar navigation={navigation} iconPath={require("../../../assets/icons/masuk.png")} title="Presensi Masuk" />

      <ScrollView style={styles.scrollContainer}>

        <BoxInfo time={time} curentPosition={currentPosition} distanceLimit={distanceLimit} diffPosition={diffPosition} />

        <BoxLocation currentPosition={currentPosition} refreshLocation={refreshLocation} />

        <Picker 
        selectedValue={selectedUK}
        onValueChange={changeLocation}>
          {locations.map(item => {
            return (<Picker.Item key={item.id_unit_kerja} label={item.unit_kerja} value={item.id_unit_kerja} />)
          })}
        </Picker>
        
        <ButtonAbsenCamera 
          selfieStatus={selfieStatus} 
          // grantedAbsent={grantedAbsent} 
          grantedAbsent={grantedAbsent} 
          openCamera={openCamera} 
          postAbsent={postAbsent} 
          absentStatus={absentStatus} />

          {/* <Button onPress={currentLocationTodestination} title="test data" /> */}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex:{
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    marginHorizontal: 0,
    position: 'relative',
    backgroundColor: '#edf2f5',
    marginBottom: 0,
  }
});

export default AbsenMasukScreen;
