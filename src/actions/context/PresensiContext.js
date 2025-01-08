import React, {
  useReducer, 
  createContext, 
  useContext
} from 'react';

export const PresensiContext = createContext();

const initialState = {
  data: {
      masuk: null,
      keluar: null
  },
  loading: false,
  error: ""
}

const PresensiReducer = (state, action) => {
  switch (action.type) {
    case 'presensi.start':
      return {
        ...state,
        loading: true
      } 
    case 'presensi/masuk':
      return {
        ...state,
        loading: false,
        data: {
          masuk: action.data.masuk
        } 
      }
    case 'presensi/masuk.camera':
      return {
        ...state,
        loading: false,
        data: {
          masuk: {
            ...state.data.masuk,
            file: action.data.masuk.file
          }
        } 
      }
    case 'presensi/keluar':
      return {
        ...state,
        loading: false,
        data: {
          keluar: action.data.keluar
        } 
      }
    case 'presensi/keluar.camera':
      return {
        ...state,
        loading: false,
        data: {
          keluar: {
            ...state.data.keluar,
            file: action.data.keluar.file
          }
        } 
      } 
    case 'presensi/error': 
      return {
        ...state,
        error: action.error
      }
    default:
        return state
  }
}

const PresensiContextProvider = (props) => {
  const [presensi, dispatch] = useReducer(PresensiReducer, initialState);
  return (
    <PresensiContext.Provider value={{presensi, dispatch}}>
      {props.children}
    </PresensiContext.Provider>
  )
}

export default PresensiContextProvider
