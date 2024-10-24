import React, {useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfilScreen from '../../container/pages/ProfileScreen';
import StatistikScreen from '../../container/pages/StatistikScreen';
import UbahPassword from '../../container/pages/UbahPassword';
import InformasiScreen from '../../container/pages/InformasiScreen';
import TentangScreen from '../../container/pages/TentangScreen';
import SplashScreen from '../../container/pages/SplashScreen';
import useAuth from '../../app/_hooks/useAuth';
import Router from '../StackNav'

const Drawer = createDrawerNavigator();
const DrawerNav = () => {
    
    const [authenticated, isloading] = useAuth();
    let initialroutename = authenticated ? "HomeScreen" : "LoginScreen";
    const createHomeStack = () => <Router initialRouteName={initialroutename} />

    return(
        <Drawer.Navigator initialRouteName="Home" drawerStyle={{backgroundColor:'white', width:'70%'}}>
            <Drawer.Screen name="Home" children={createHomeStack} options={{headerShown: false}} />
            <Drawer.Screen name="Profil Saya" component={StatistikScreen} options={{headerShown: false}}  />
            <Drawer.Screen name="Ubah Password" component={UbahPassword} options={{headerShown: false}}   />
            <Drawer.Screen name="Informasi" component={InformasiScreen} options={{headerShown: false}}   />
            <Drawer.Screen name="Tentang" component={TentangScreen} options={{headerShown: false}}   />
        </Drawer.Navigator>
    );
};

export default DrawerNav;