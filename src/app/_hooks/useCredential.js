import React,{
  useState, 
  useEffect, 
  useCallback
} from "react";

import {getData, storeData} from '../../actions/storageAction'

const useCredential = () => {
  const [credential, setCredential] = useState({ nip: "", password: "" });
  const setNip = useCallback(
    (nip) => {
      setCredential(prev => {
        return {
          ...prev,
          nip
        }
      })
    },
    [credential],
  )

  const setPassword = useCallback(
    (password) => {
      setCredential(prev => {
        return {
          ...prev,
          password
        }
      })
    },
    [credential],
  )

  return [credential, setNip, setPassword]
}

export const useDeviceUniqueToken = () => {
  const [installId, setInstallId] = useState();
  useEffect(() => {
    getData('deviceUniqueToken')
      .then(item => {
        if (item != null) {
          setInstallId(item)
        } else {
          let uniqueToken = new Date().getTime();
          storeData('deviceUniqueToken', uniqueToken);
          setInstallId(uniqueToken)
        }
      });
  }, [installId]);

  return [installId]
}

export default useCredential;