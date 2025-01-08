import React, { useContext } from 'react';
import {View, Text, Button} from 'react-native';
import { AuthContext } from '../../../actions/context/AuthContext'

const ProfileScreen = ({ navigation }) => {
    const { logout } = useContext(AuthContext)
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Text>Halaman Profile</Text>
                <Button title="logout" onPress={() => { logout(navigation)  }}/>
            </View>
        )
}


export default ProfileScreen;