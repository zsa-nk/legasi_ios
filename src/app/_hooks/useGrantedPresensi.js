import {useState, useEffect} from 'react'
import Toast from 'react-native-simple-toast';
import moment from 'moment/moment';

import {getData} from '../../actions/storageAction';

export const checkTodayAbsent = async () => {
    const todayAbsentData = await getData(moment().format('DD-MM-YYYY') + '-IN');
    return Promise.resolve(todayAbsentData != null)
  };

export const checkTodaySelfie = async () => {
    const todaySelfieData = await getData(moment().format('DD-MM-YYYY') + '-SELFIE-IN');
    return Promise.resolve(todaySelfieData != null)
};

export const checkTodayAbsentOut = async () => {
  let todayAbsentData = await getData(moment().format('DD-MM-YYYY') + '-OUT');
  return Promise.resolve(todayAbsentData != null)
};

export const checkTodaySelfieOut = async () => {
  let todaySelfieData = await getData(moment().format('DD-MM-YYYY') + '-SELFIE-OUT');
  return Promise.resolve(todaySelfieData != null)
};

const useGrantedPresensi = (destination, currentPosition, diffPosition, distanceLimit) => {
  
    const [grantedAbsent, setGrantedAbsent] = useState(false);
    const [mocked, setMocked] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      if (destination.location && currentPosition.timestamp !== 0) {
        if (currentPosition.coords.accuracy >= 60) {
          setError({message: 'akurasi > 60 dan kurang akurat'});
        } else {
          setError(null);
        }
  
        if (currentPosition.mocked === true) {
          setMocked(true);
          Toast.showWithGravity('Terdeteksi penggunaan lokasi palsu. harap gunakan lokasi asli', Toast.SHORT, Toast.CENTER);
        } else {
          setMocked(false);
        }
  
        if (
          parseInt(diffPosition) <= parseInt(distanceLimit) && 
          currentPosition.coords.accuracy <= 160 && 
          mocked === false
        ) {
          setGrantedAbsent(true);
        } else {
          Toast.showWithGravity('Anda terlalu jauh dari lokasi presensi', Toast.SHORT, Toast.CENTER);
          setGrantedAbsent(false);
        }
      }
    }, [currentPosition.coords.accuracy, currentPosition.mocked, diffPosition, destination.location]);
  
    return {grantedAbsent, mocked, error, setError, setGrantedAbsent, setMocked};
  }

  export default useGrantedPresensi