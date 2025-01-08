import React, {Component} from 'react';
import {View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import CollapsibleCard from '../../../../src/CollapsibleCard';
//import SampleEasing from './SampleEasing';




const ScanDokumenScreen = ({navigation}) => {
   
   
       
        return(
            <View style={styles.container}>
                 <View style={{flexDirection:'row', height:50, alignItems:'center', paddingHorizontal:10, backgroundColor:'white'}}>
                    <TouchableOpacity style={{width:40, height:40, display:'flex', justifyContent:'center', alignItems:'center'}} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/icons/back.png')} style={{width:16, height:16}} />
                    </TouchableOpacity>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={{width: 32, height: 32, borderRadius: 10, alignItems:'center', justifyContent:'center', backgroundColor:'#c43797'}} >
                            <Image source={require('../../../assets/icons/qr-scan.png')} style={{width:16, height:16}} />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{paddingVertical:5, marginLeft:5, fontFamily:'Poppins-Bold', fontSize:16}}>Scan Dokumen</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.wrapper}>
                    {/* Calendar */}
                    <View style={styles.header}>
                        
                        <View style={styles.headerWrapper}>
                            <View style={styles.logoWrapper}>
                                <Image source={require('../../../assets/logo/kotabogor.png')} style={styles.logo} />
                            </View>
                            <View style={styles.headerTitleWrapper}>
                                <Text style={styles.headerTitle}>Simpeg Mobile Kota Bogor</Text>
                                <Text style={styles.headerSubTitle}>Versi 2.0.1</Text>
                            </View>
                        </View>
                        {/* Title */}
                       
                    </View>
                    {/* Hasil Penelusuran */}
                    <View style={styles.contentWrapper}>
                       <TouchableOpacity style={styles.scanButton}>
                           <Image source={require('../../../assets/icons/qr-scan.png')}  />
                        </TouchableOpacity>
                        <Text style={styles.buttonInfo}>Tap disini untuk melakukan scan dokumen</Text>
                    </View>
                    {/* List Sub Icon */}
                </View>
                <View style={{display:'flex', alignItems:'center'}}>
                    <View style={{position:'absolute', zIndex:9999, bottom:0}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{width:70, height:70, backgroundColor:'#015887', borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center', shadowColor:'#000', shadowOffset: {width:0, height:5}, shadowOpacity:0.4, shadowRadius: 9, elevation:10}}>
                            <Image source={require('../../../assets/icons/home.png')} style={{width:30, height:30}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }


const styles = StyleSheet.create({
    app: {
      flex: 1,
      padding: 24,
      
    },
    paragraph: {
      fontSize: 14,
      lineHeight: 19,
      fontFamily:'Poppins-Regular',
      textAlign:'justify',
    },
    container : {
        flex:1,
    },
    wrapper : {
        flex:1, 
        marginHorizontal:0, 
        position:'relative', 
        backgroundColor:'#edf2f5', 
        marginBottom:0,
    },
    header : {
        position:'absolute', 
        height:200, 
        width:'100%', 
        backgroundColor:'#c33696',
    },
    headerWrapper : {
        flex:1, 
        marginVertical:15, 
        paddingHorizontal:35, 
        paddingTop:15,
    },
    logoWrapper : {
        justifyContent:'center', 
        width:'100%', 
        height:350, 
        flex:1,
    },
    logo : {
        width: undefined, 
        height: undefined, 
        resizeMode:'contain', 
        flex:1,
    },
    headerTitleWrapper : {
        justifyContent:'center', 
        alignItems:'center', 
        height:80, 
        borderBottomLeftRadius:15, 
        borderBottomRightRadius:15, 
        flexDirection:'column',
    },
    headerTitle : {
        fontFamily:'Poppins-Bold', 
        fontSize:22, 
        marginTop:-20, 
        color:'white',
    },
    headerSubTitle : {
        fontFamily:'Poppins-Regular', 
        fontSize:15, 
        marginTop:-10, 
        color:'white', 
        opacity:.3,
    },
    contentWrapper : {
        marginHorizontal:20, 
        marginTop:200, 
        flex:1, 
        justifyContent:'center', 
        alignItems:'center', 
        paddingHorizontal:80,
    },
    scanButton : {
        backgroundColor:'#015786', 
        width:130, 
        height:130, 
        alignItems:'center', 
        justifyContent:'center', 
        borderRadius:100,
    },
    buttonInfo : {
        marginTop:10, 
        fontFamily:'Poppins-Regular', 
        fontSize:15, 
        textAlign:'center',
    }
  });
  

export default ScanDokumenScreen;