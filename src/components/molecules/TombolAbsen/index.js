import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

const TombolAbsen = (props) => {
    return (
        <View style={{flex: 1, alignItems:'center', justifyContent:'center', backgroundColor:(props.color)}}>
          <TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}} onPress={props.onPress}>
            <Image style={{width: 32, height: 32}} source={props.icon} />
            <Text style={{ fontSize:16, color:'white', marginTop: 4, fontFamily:'Poppins-Bold'}}>{props.title}</Text>
          </TouchableOpacity>
        </View> 
    )
}

export default TombolAbsen;