import React from 'react'
import { View, Text, Image, Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

const StatistikPendidikan = ({navigation}) => {
    return(
        <SafeAreaView style={{flex:1}}>
            
                <View style={{flexDirection:'row', height:50, alignItems:'center', paddingHorizontal:10, backgroundColor:'white'}}>
                    <TouchableOpacity style={{width:40, height:40, display:'flex', justifyContent:'center', alignItems:'center'}} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../assets/icons/back.png')} style={{width:16, height:16}} />
                    </TouchableOpacity>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={{width: 32, height: 32, borderRadius: 10, alignItems:'center', justifyContent:'center', backgroundColor:'#e1292b'}} >
                            <Image source={require('../../../assets/icons/mortarboard.png')} style={{width:16, height:16}} />
                        </View>
                        <View style={{flex:1}}>
                            <Text style={{paddingVertical:5, marginLeft:5, fontFamily:'Poppins-Bold', fontSize:16}}>Statistik Pendidikan</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={{flex:1, marginHorizontal:0, position:'relative', backgroundColor:'#edf2f5', marginBottom:0}}>
                   
               
                
                    {/* List Sub Icon */}
                    <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10, backgroundColor:'white', padding:10, marginHorizontal:10, borderRadius:10, marginBottom:20}}>
                    <View style={{justifyContent:'space-between', flexDirection:'row', width:'100%', flexWrap:'wrap', marginTop:20}}>
                       

                    <PieChart
    data={
        [
        {
            name: "SMA",
            jumlah: 11,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#000",
            legendFontSize: 11
        },
        {
            name: "D3",
            jumlah: 5,
            color: "red",
            legendFontColor: "#000",
            legendFontSize: 11
        },
        {
            name: "S1",
            jumlah: 27,
            color: "yellow",
            legendFontColor: "#000",
            legendFontSize: 11
        },
        {
            name: "S2",
            jumlah: 12,
            color: "orange",
            legendFontColor: "#000",
            legendFontSize: 11
        }
       
        ]
    }
    width={Dimensions.get("window").width - 50} // from react-native
    height={220}
    chartConfig={{
        color: (opacity = 1) => `white`,
        labelColor: (opacity = 1) => `white`,
        style: {
            borderRadius: 16
        }
    }}
    backgroundColor="white"
    accessor="jumlah"
    paddingLeft="15"
    absolute
    style={{
        marginVertical: 8,
        borderRadius: 16
    }}
/>
                       
                       
                        
                        
                        
                        
                       
                    </View>
                </View>

                <View style={{flexDirection:'row', flexWrap:'wrap', marginTop:10, backgroundColor:'white', padding:10, marginHorizontal:10, borderRadius:10, marginBottom:20}}>
                    <View style={{justifyContent:'space-between', flexDirection:'row', width:'100%', flexWrap:'wrap', marginTop:20}}>
                       

                    <LineChart
    data={{
    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
    datasets: [
        {
        data: [
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
        ]
        }
    ]
    }}
    width={Dimensions.get("window").width - 50} // from react-native
    height={220}
    yAxisLabel={"Rp"}
    chartConfig={{
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `white`,
    labelColor: (opacity = 1) => `white`,
    style: {
        borderRadius: 16
    }
    }}
    bezier
    style={{
    marginVertical: 8,
    borderRadius: 16
    }}
/>
                       
                       
                        
                        
                        
                        
                       
                    </View>
                </View>


                <View style={{marginHorizontal:20, marginTop:5}}>
                    <Text style={{fontFamily:'Poppins-Light', color:'black', fontSize:18, textAlign:'center'}}>Persentase Pegawai Badan Kepegawaian dan Pengembangan Sumber Daya Manusia Per Tingkat Pendidikan</Text>
                </View>
                   
                    
                   
                   
                   

                </ScrollView>
                <View style={{display:'flex', alignItems:'center'}}>
                    <View style={{position:'absolute', zIndex:9999, bottom:0}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')} style={{width:70, height:70, backgroundColor:'#015887', borderRadius:50, display:'flex', alignItems:'center', justifyContent:'center', shadowColor:'#000', shadowOffset: {width:0, height:5}, shadowOpacity:0.4, shadowRadius: 9, elevation:10}}>
                            <Image source={require('../../../assets/icons/home.png')} style={{width:30, height:30}} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
    )
}
const Styles = StyleSheet.create ({
    topseparator: {
        width:'100%',
        ...Platform.select({
            ios: {
                height:50,
            },
        android: {
            height:0,
        },
    }),
    }
});

export default StatistikPendidikan;
