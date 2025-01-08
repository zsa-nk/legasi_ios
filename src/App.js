import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './router/DrawerNav';
import { getData, storeData } from './actions/storageAction';
import { PermissionsAndroid, Platform } from 'react-native'
import Geolocation from 'react-native-geolocation-service';
import AuthContextProvider from './actions/context/AuthContext'
import DestinationContextProvider from './actions/context/DestinationContext'
import PresensiContextProvider from './actions/context/PresensiContext';

import moment from 'moment'
import 'moment/src/locale/id';
moment.locale("id")

export default function App() {
  useEffect(() => {
    const reqPermission = () => {
      return new Promise(async (resolve, reject) => {
        if (Platform.OS == 'android') {
          let permission = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ]);

          resolve(
            permission['android.permission.ACCESS_COARSE_LOCATION'] &&
            permission['android.permission.ACCESS_FINE_LOCATION'] ==
            PermissionsAndroid.RESULTS.GRANTED
          );
        } else if (Platform.OS == 'ios') {
          let iosGranted = await Geolocation.requestAuthorization(
            'whenInUse',
          );
          resolve(iosGranted);
        } else {
          reject({ error: "permission not granted" })
        }
      });
    };

    reqPermission().then(granted => {
      console.log(granted)
    }).catch(err => {
      console.log(err)
    })

    getData('deviceUniqueToken').then(data => {
      if (data == undefined) {
        let uniqueToken = moment(new Date()).format('X')
        storeData('deviceUniqueToken', uniqueToken);
      }
    })
  }, [])
  
  return (
    <NavigationContainer>
        <AuthContextProvider>
          <DestinationContextProvider>
            <PresensiContextProvider>
            <DrawerNav />
            </PresensiContextProvider>
          </DestinationContextProvider>
        </AuthContextProvider>
    </NavigationContainer>
  );
}