import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
//import 'moment/min/moment-with-locales'
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../actions/context/AuthContext';
import {API} from '../../../actions/config/config';
import {useFocusEffect} from '@react-navigation/native';

const RekapitulasiScreen = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [absent, setAbsent] = useState([]);

  useEffect(() => {
    _fetchDataAbsen();
  }, []);

  const customBackHandler = React.useCallback(() => {
    const goHome = () => {
      navigation.navigate('HomeScreen');
      return true;
    };

    const sub = BackHandler.addEventListener('hardwareBackPress', goHome);
    return () => sub.remove();
  }, []);

  useFocusEffect(customBackHandler);

  const _fetchDataAbsen = () => {
    let myHeaders = new Headers();
    const payload = new FormData();
    payload.append('month', moment().get('month') + 1);
    payload.append('year', moment().get('year'));

    myHeaders.append('authorization', auth.token);
    fetch(API + '/attendances/log', {
      method: 'POST',
      headers: myHeaders,
      body: payload,
    })
      .then(res => res.json())
      .then(json => {
        setAbsent(json);
      })
      .catch(err => {
        console.log(err);
      });
  };
  var idLocale = require('moment/locale/id');
  moment.locale('id');
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={{width: 16, height: 16}}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              elevation: 5,
            }}>
            <Image
              source={require('../../../assets/icons/rekapitulasi.png')}
              style={{width: 16, height: 16}}
            />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                paddingVertical: 5,
                marginLeft: 5,
                fontFamily: 'Poppins-Bold',
                fontSize: 16,
              }}>
              Rekapitulasi Absen
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          marginHorizontal: 0,
          position: 'relative',
          backgroundColor: '#edf2f5',
          marginBottom: 0,
        }}>
        {/* Calendar */}

        <View style={{position: 'absolute', height: 30, width: '100%'}}>
          {/*<View style={{flex:1, marginHorizontal:100, marginVertical:28}}>
                    <View style={{backgroundColor:'#00b368', justifyContent:'center', alignItems:'center', height:40, borderTopLeftRadius:15, borderTopRightRadius:15}}>
                        <Text style={{fontFamily:'Poppins-Bold', fontSize:23, color:'white'}}>Selasa</Text>
                    </View>
                    <View style={{backgroundColor:'white', justifyContent:'center', alignItems:'center', height:80, borderBottomLeftRadius:15, borderBottomRightRadius:15, flexDirection:'column'}}>
                        <Text style={{fontFamily:'Poppins-Bold', fontSize:50, marginTop:-10}}>18</Text>
                        <Text style={{fontFamily:'Poppins-Bold', fontSize:15, marginTop:-20}}>Feb 2020</Text>
                    </View>
    </View>*/}
          {/* Title */}
          <View
            style={{
              position: 'absolute',
              height: 50,
              width: '100%',
              bottom: -25,
              paddingHorizontal: 20,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#00b368',
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: 'white',
                  fontSize: 16,
                }}>
                Absen Masuk
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: '#e22a2c',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: 'white',
                  fontSize: 16,
                }}>
                Absen Keluar
              </Text>
            </View>
          </View>
        </View>
        {/* Date Picker */}
        <View
          style={{
            marginTop: 60,
            marginHorizontal: 10,
            borderRadius: 10,
            height: 5,
            padding: 0,
            flexDirection: 'row',
          }}></View>
        {/* List Absen */}

        {absent.map((data, index) => (
          <View
            key={index}
            style={{
              backgroundColor: 'white',
              marginTop: 10,
              marginHorizontal: 20,
              borderRadius: 10,
              padding: 10,
              flexDirection: 'column',
              borderLeftColor:
                data.status == 'TERCATAT' || data.status == 'CHECK IN'
                  ? '#00b368'
                  : '#e22a2c',
              borderLeftWidth: 10,
            }}>
            {/* <View style={{alignItems:'center', justifyContent:'center' }}>
                        { data.status == 'TERCATAT' || data.status == 'CHECK IN' ? (
                            <Image source={require('../../../assets/icons/green-dot.png')} style={{width:25, height:25}} />
                        ) : (
                            <Image source={require('../../../assets/icons/red-dot.png')} style={{width:25, height:25}} />
                        )}
                    </View> */}
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#000',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 14,
                }}>
                {moment(data.date_time).format('dddd')},{' '}
                {moment(data.date_time).format('DD MMMM YYYY')}
              </Text>
            </View>
            {/* <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#000', fontFamily:'Poppins-SemiBold', fontSize:14}}>{moment(data.date_time).format('DD-MM-YYYY')}</Text>
                    </View> */}
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  fontFamily: 'Poppins-SemiBold',
                  color:
                    data.status == 'TERCATAT' || data.status == 'CHECK IN'
                      ? '#00b368'
                      : '#e22a2c',
                }}>
                {moment(data.date_time).format('HH:mm')} WIB
              </Text>
            </View>
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontWeight: 'bold', color: '#004874'}}>
                {data.status}
              </Text>
            </View>
          </View>
        ))}

        <View style={{height: 80}}></View>
      </ScrollView>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <View style={{position: 'absolute', zIndex: 9999, bottom: 0}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('HomeScreen')}
            style={{
              width: 70,
              height: 70,
              backgroundColor: '#188FC7',
              borderRadius: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 5},
              shadowOpacity: 0.4,
              shadowRadius: 9,
              elevation: 10,
            }}>
            <Image
              source={require('../../../assets/icons/home.png')}
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
//const [date, setDate] = useState(new Date())
const Styles = StyleSheet.create({
  topseparator: {
    width: '100%',
    ...Platform.select({
      ios: {
        height: 50,
      },
      android: {
        height: 0,
      },
    }),
  },
});
export default RekapitulasiScreen;
