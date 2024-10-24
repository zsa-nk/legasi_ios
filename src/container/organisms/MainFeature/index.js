import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';


class MainFeature extends Component {
    render() {
        
        return (
            <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:30}}>
                    <View style={{justifyContent:'space-between', flexDirection:'row', width:'100%', flexWrap:'wrap', paddingHorizontal:40}}>
                        <View style={{width:'33%', alignItems:'center', marginBottom:18}}>
                            <TouchableOpacity style={{width: 80, height: 80, borderRadius: 18, alignItems:'center', justifyContent:'center', backgroundColor:'red'}} onPress={() => navigation.navigate('RekapitulasiScreen')}>
                                <Image source={require('../../../assets/icons/history.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                                <Text style={{marginTop:5}}>Rekapitulasi</Text>
                        </View>
                        <View style={{width:'33%', alignItems:'center', marginBottom:18}}>
                            <TouchableOpacity style={{width: 80, height: 80, borderRadius: 18, alignItems:'center', justifyContent:'center', backgroundColor:'red'}} onPress={() => navigation.navigate('RekapitulasiScreen')}>
                                <Image source={require('../../../assets/icons/history.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                                <Text style={{marginTop:5}}>Rekapitulasi</Text>
                        </View>
                        <View style={{width:'33%', alignItems:'center', marginBottom:18}}>
                            <TouchableOpacity style={{width: 80, height: 80, borderRadius: 18, alignItems:'center', justifyContent:'center', backgroundColor:'red'}} onPress={() => navigation.navigate('RekapitulasiScreen')}>
                                <Image source={require('../../../assets/icons/history.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                                <Text style={{marginTop:5}}>Rekapitulasi</Text>
                        </View>
                        <View style={{width:'33%', alignItems:'center', marginBottom:18}}>
                            <TouchableOpacity style={{width: 80, height: 80, borderRadius: 18, alignItems:'center', justifyContent:'center', backgroundColor:'red'}} onPress={() => navigation.navigate('RekapitulasiScreen')}>
                                <Image source={require('../../../assets/icons/history.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                                <Text style={{marginTop:5}}>Rekapitulasi</Text>
                        </View>
                        <View style={{width:'33%', alignItems:'center', marginBottom:18}}>
                            <TouchableOpacity style={{width: 80, height: 80, borderRadius: 18, alignItems:'center', justifyContent:'center', backgroundColor:'red'}} onPress={() => navigation.navigate('RekapitulasiScreen')}>
                                <Image source={require('../../../assets/icons/history.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                                <Text style={{marginTop:5}}>Rekapitulasi</Text>
                        </View>
                        <View style={{width:'33%', alignItems:'center', marginBottom:18}}>
                            <TouchableOpacity style={{width: 80, height: 80, borderRadius: 18, alignItems:'center', justifyContent:'center', backgroundColor:'red'}} onPress={() => navigation.navigate('RekapitulasiScreen')}>
                                <Image source={require('../../../assets/icons/history.png')} style={{width:50, height:50}} />
                            </TouchableOpacity>
                                <Text style={{marginTop:5}}>Rekapitulasi</Text>
                        </View>
                    </View>
                </View>
        );
    }
   
        
        
    
}

export default MainFeature ;