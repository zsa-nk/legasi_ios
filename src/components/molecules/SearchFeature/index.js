import React from 'react';
import { View, Text, Image, TextInput} from 'react-native';

const SearchFeature = () => {
    return (
        <View style={{marginHorizontal:17, marginTop:15, flexDirection:'row'}}>
        <View style={{width:100, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontFamily:'Poppins-SemiBold'}}>Pencarian</Text>
        </View>
        <View style={{position:'relative', flex:1}}>
          <TextInput placeholder="Apa yang anda cari?" style={{borderWidth: 1, borderColor:'#E8E8E8', borderRadius:25, height:40, fontSize:13, paddingLeft:20, paddingRight:20, marginRight:15}} />
          <Image source={require('../../../assets/icons/search.png')} style={{position:'absolute', top:9, right:35, width:22, height:22}} />
        </View>
      </View>
    )
}

export default SearchFeature;