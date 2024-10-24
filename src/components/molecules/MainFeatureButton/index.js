import React from 'react';
import { View, Text, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MainFeatureButton = (props, {navigation}) => {
    return (
        <View style={{width:'33%', alignItems:'center', marginBottom:18}}>
            <TouchableOpacity style={{width: 80, height: 80, borderRadius: 18, alignItems:'center', justifyContent:'center', backgroundColor:(props.color)}} onPress={props.onPress}>
              <Image source={props.icon} style={{width:50, height:50}} />
            </TouchableOpacity>
            <Text style={{marginTop:5}}>{props.title}</Text>
        </View>
    )
}

export default MainFeatureButton ;