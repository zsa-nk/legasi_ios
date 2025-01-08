import React, {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import { debounce } from '../_helper';

const useWatchLocation = () => {
  const [currentPosition, setCurrentPosition] = useState({
    coords: {
      accuracy: 1000,
      altitude: 1000,
      heading: 1000,
      latitude: 1000,
      longitude: 1000,
      speed: 1000,
    },
    mocked: false,
    timestamp: 0,
  });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const watchLocation = Geolocation.watchPosition(
      (position) => {
        // console.log('watclocation', JSON.stringify(position, null, 2))
        setCurrentPosition(position);
        setLocationError(null);
      },
      (err) => {
        setLocationError(err);
      },
      {
        interval: 1000,
        maximumAge: 1000,
        distanceFilter: 2,
        enableHighAccuracy: true,
        useSignificantChanges: false,
        showsBackgroundLocationIndicator: true
      },
    );
  
    return () => {
      Geolocation.clearWatch(watchLocation);
    };
  }, [])

  const refreshLocation = debounce(() => {
    Geolocation.getCurrentPosition((position) => {
      setCurrentPosition(position);
    });
  });

  return {
    currentPosition, 
    setCurrentPosition, 
    locationError, 
    refreshLocation
  };
}

export default useWatchLocation