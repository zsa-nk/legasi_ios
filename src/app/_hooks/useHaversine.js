import React, {useEffect, useState} from "react";

export const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  var R = 6371 * 1000; // Radius of the earth in m
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in m
  return d;
}

export const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
}
  
const useHaversine = (currentPosition, destination) => {
  const [distanceLimit, setDistanceLimit] = useState(50);
  const [diffPosition, setDiffPosition] = useState(100);
  
  useEffect(() => {
    const distance = getDistanceFromLatLonInKm(
      destination.location.latitude,
      destination.location.longitude,
      destination.location.lat_outer,
      destination.location.long_outer,
    ).toFixed();

    setDistanceLimit(distance);

    const diff = getDistanceFromLatLonInKm(
      destination.location.latitude,
      destination.location.longitude,
      currentPosition.coords.latitude,
      currentPosition.coords.longitude,
    ).toFixed();

    setDiffPosition(diff)

  }, [currentPosition])

  return {distanceLimit, diffPosition, setDiffPosition, setDistanceLimit}
}

export default useHaversine