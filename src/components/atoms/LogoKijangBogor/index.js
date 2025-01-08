import React from 'react';
import {View, Image} from 'react-native';

const LogoKijangBogor = () => {
    return (
        <View style={{height:150}}>
            <View style={{position:'absolute', height:120, width:'100%', top:30}}>
                <Image source={require('../../../assets/logo/bogorkota.png')} style={{width: undefined, height: undefined, resizeMode:'contain', flex:1}} />
            </View>
        </View>
    )
}

export default LogoKijangBogor;