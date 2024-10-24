import React, {Component, useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {API, APILAMA} from '../../../actions/config/config';
import {AuthContext} from '../../../actions/context/AuthContext';
import CollapsibleCard from '../../../../src/CollapsibleCard';
//import SampleEasing from './SampleEasing';

const StatistikScreen = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', auth.token);

    fetch_retry(
      API + '/profil',
      {
        method: 'get',
        headers: myHeaders,
      },
      5,
    )
      .then(res => res.json())
      .then(json => {
        setData(json.data);
      })
      .catch(err => console.log(err));
  };

  function fetch_retry(url, options, n) {
    return fetch(url, options).catch(function (error) {
      if (n === 1) throw error;
      return fetch_retry(url, options, n - 1);
    });
  }
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
          onPress={() => navigation.goBack()}>
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
              source={require('../../../assets/icons/profilsaya.png')}
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
              Profil Saya
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
        <View
          style={{
            position: 'absolute',
            height: 200,
            width: '100%',
            backgroundColor: '#188FC7',
          }}>
          <View
            style={{
              flex: 1,
              marginVertical: 15,
              paddingHorizontal: 35,
              paddingTop: 15,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                width: 60,
                height: 100,
                flex: 1,
              }}>
              <Image
                source={{uri: data.photo}}
                style={{
                  width: '100%',
                  height: 100,
                  resizeMode: 'cover',
                  flex: 1,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#fff',
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 80,
                borderBottomLeftRadius: 15,
                borderBottomRightRadius: 15,
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 13,
                  marginTop: -30,
                  color: 'white',
                }}>
                {auth.data.nama}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Light',
                  fontSize: 10,
                  marginTop: -5,
                  color: 'white',
                }}>
                NIP: {auth.data.nip}
              </Text>
            </View>
          </View>
          {/* Title */}
        </View>
        {/* Hasil Penelusuran */}
        <View style={{marginHorizontal: 20, marginTop: 220}}></View>
        {/* List Sub Icon */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
            backgroundColor: '#D1E9F4',
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 5},
            shadowOpacity: 0.4,
            shadowRadius: 9,
            elevation: 10,
            marginBottom: 20,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              width: '100%',
              flexWrap: 'wrap',
              marginTop: 20,
            }}>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('UserProfile')}>
                <Image
                  source={require('../../../assets/icons/biodata.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5}}>Biodata</Text>
            </View>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('HistoryPendidikan')}>
                <Image
                  source={require('../../../assets/icons/pendidikan.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5}}>Pendidikan</Text>
            </View>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('HistoryJabatan')}>
                <Image
                  source={require('../../../assets/icons/kursi.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5}}>Jabatan</Text>
            </View>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('HistoryKepangkatan')}>
                <Image
                  source={require('../../../assets/icons/pangkat.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5}}>Pangkat</Text>
            </View>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('HistoryDiklat')}>
                <Image
                  source={require('../../../assets/icons/diklat.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5}}>Diklat</Text>
            </View>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('HistoryKGB')}>
                <Image
                  source={require('../../../assets/icons/kgb.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5}}>KGB</Text>
            </View>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('HistorySKP')}>
                <Image
                  source={require('../../../assets/icons/skp.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5, textAlign: 'center'}}>SKP</Text>
            </View>
            <View
              style={{width: '33%', alignItems: 'center', marginBottom: 18}}>
              <TouchableOpacity
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 18,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  elevation: 5,
                }}
                onPress={() => navigation.navigate('Keluarga')}>
                <Image
                  source={require('../../../assets/icons/keluarga.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text style={{marginTop: 5}}>Keluarga</Text>
            </View>
          </View>
        </View>
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

const styles = StyleSheet.create({
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
  app: {
    flex: 1,
    padding: 24,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 19,
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify',
  },
});

export default StatistikScreen;
