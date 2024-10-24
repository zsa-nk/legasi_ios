import React, {Component} from 'react';
import {View} from 'react-native';
import TombolAbsen from '../../../components/molecules/TombolAbsen';

class BottomNavButton extends Component {
    
    render() {
        
        return(
        <View style={{height: 85,  flexDirection: 'row', backgroundColor:'white', shadowColor:'#000', shadowOffset: {width:0, height:7}, shadowOpacity:0.4, shadowRadius: 9, elevation:14, paddingTop:1}}>
            <TombolAbsen title="Absen Masuk" color='#00b569' icon={require('../../../assets/icons/masuk.png')} />
            <TombolAbsen title="Absen Keluar" color='#e22a2c' icon={require('../../../assets/icons/keluar.png')} />  
        </View>
        )
    }
}

export default BottomNavButton;