import React, {useContext, useEffect, useState} from 'react'

import { AuthContext, AUTH, LOGIN } from '../../actions/context/AuthContext'
import {storeData, getObjectData} from '../../actions/storageAction'

const useAuth = () => {
  const {dispatch, auth} = useContext(AuthContext)
  const [authenticated, setAuthenticated] = useState(false);
  const [isloading, setIsloading] = useState(true);

  const authEffect = () => {
    if(!auth.token){
      getObjectData(AUTH).then(credential => {
        if(credential && credential.token){
          dispatch({
            type: LOGIN,
            token: credential.token,
            data: credential.data
          })
          setAuthenticated(true)
        }else{
          setAuthenticated(false);
        }
        setIsloading(false)
      })
    }else{
      setAuthenticated(true)
    }
  }

  useEffect(authEffect, [])

  return [authenticated, isloading];
}

export default useAuth