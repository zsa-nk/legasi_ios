import React, {useReducer, createContext, useContext, useEffect, useState} from 'react';
import {removeData, storeObjectData, getObjectData} from '../storageAction';
import {API} from '../config/config';
import {AuthContext} from './AuthContext';

export const SET_DESTINATION = 'SET_DESTINATION';
export const USE_DESTINATION = 'USE_DESTINATION';
export const DELETE_DESTINATION = 'DELETE_DESTINATION';
export const LOCATION_ERROR = 'LOCATION_ERROR';
export const DestinationContext = createContext();

export const DestinationReducer = (state, action) => {
  switch (action.type) {
    case SET_DESTINATION:
      return {
        location: action.location,
      };
    case USE_DESTINATION:
      return state;
    case DELETE_DESTINATION:
      return null;
    case LOCATION_ERROR:
      return {...state, msg: action.msg};
    default:
      return state;
  }
};

const DestinationContextProvider = (props) => {
  const defaultdestination = {
    location: {
      lat_outer: -6.57301700, 
      latitude: -6.57290000, 
      long_outer: 106.79871200,
      longitude: 106.79894100,
    }
  }

  const [destination, dispatch] = useReducer(DestinationReducer, defaultdestination);
  

  const {auth, headers} = useContext(AuthContext);

  // const getDestination = async () => {
  //   try {
  //     let savedLocation = await getObjectData('absentLocation');
      // if (savedLocation != null) {
      //   let res = await fetch(API + '/locationuk', {
      //     method: 'POST',
      //     headers: headers(),
      //   });
      //   let json = await res.json();
      //   if (savedLocation.longitude !== json.data[0].longitude) {
      //     storeObjectData('absentLocation', json.data[0]);
      //     dispatch({type: SET_DESTINATION, location: json.data[0]});
      //   } else {
          // dispatch({type: SET_DESTINATION, location: savedLocation});
      //   }
      // } else {
      //   let res = await fetch(API + '/locationuk', {
      //     method: 'POST',
      //     headers: headers(),
      //   });
      //   let json = await res.json();
      //   storeObjectData('absentLocation', json.data[0]);
      //   dispatch({type: SET_DESTINATION, location: json.data[0]});
      // }
  //   } catch (err) {
  //     dispatch(LOCATION_ERROR, {msg: err});
  //   }
  // };

  const [locations, setLocations] = useState([])
  const [selectedUK, setSelectedUK] = useState(null);

  const fetchData = (url, method = 'GET') => {
    return fetch(url, {
      method,
      headers: headers()
    }).then(res => res.json());
  }

  const getDestination = async () => {
    let currentDestination = await getObjectData('absentLocation')
    if(currentDestination == null){
      if(locations.length > 0){
        let dst = locations.filter((item) => item.tipe == 'PRIMARY')[0];
        if(dst){
         currentDestination = dst 
         await storeObjectData('absentLocation', dst)
        setSelectedUK(dst.id_unit_kerja)
        dispatch({type: SET_DESTINATION, location: dst})
        return;
        }
      }
    } else {
      setSelectedUK(currentDestination.id_unit_kerja)
      dispatch({type: SET_DESTINATION, location: currentDestination})
      return;
    }
  }
  
  useEffect(() => {
    if(auth.token){      
      fetchData(`https://restsimpeg.kotabogor.go.id/v3/location`, 'GET')
      .then(json => {
        setLocations(json);
      })
      .catch(err => {
        console.log(err)
      })
    }
  }, [auth.token])

  const selectLocation = async (id_unit_kerja) => {
    let payload = locations.filter(item => item.id_unit_kerja == id_unit_kerja)[0];

    let reqpayload = {
      method:'POST',
      headers: headers().map,
      body: {
        tipe: payload.tipe,
        id_unit_kerja: payload.id_unit_kerja
      },
    }

    return fetch(`https://restsimpeg.kotabogor.go.id/v3/setlocation`, reqpayload)
    .then(async res => {
      if(res.status < 400){
        setSelectedUK(id_unit_kerja);
        await storeObjectData('absentLocation', payload);
        dispatch({type:'SET_DESTINATION', location: payload })
      }
      return res;
    }).catch((err) => {
      console.error(err);
    })
  }

  return (
    <DestinationContext.Provider value={{destination, dispatch, getDestination, locations, selectLocation, selectedUK}}>
      {props.children}
    </DestinationContext.Provider>
  );
};

export default DestinationContextProvider;
