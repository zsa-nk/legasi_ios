import React, { useReducer, createContext } from 'react'
import { removeData, storeObjectData } from '../storageAction'

export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'
export const AUTH = 'AuthData'

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case LOGIN :
            return {
                token: action.token,
                data: action.data
            }
        case AUTHENTICATE: 
            return state
        case LOGOUT : 
            return {
                token: null,
                data: null
            }
        default:
            return state
    }
};

const AuthContextProvider = (props) => {
    const [auth , dispatch] = useReducer(AuthReducer, {})

    const logout = async (navigation) => {
        try {
            dispatch(LOGOUT)
            await removeData(AUTH)
            navigation.replace('LoginScreen');
        } catch (error) {
            console.error(error)
        }
    }

    const login = async (navigation, object) => {
        try {
            await storeObjectData(AUTH, { token: object.token, data: object.data })
            dispatch({ type:object.type, token: object.token, data: object.data})
            navigation.replace('HomeScreen');
        } catch (error) {
            console.log(error)
        }
    }

    const headers = () => {
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('authorization', auth.token);
        return myHeaders 
    }

    return (
        <AuthContext.Provider value={{auth, dispatch, login, logout, headers}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
