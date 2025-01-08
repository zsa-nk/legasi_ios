import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../actions/context/AuthContext';
import {API, APILAMA} from '../../../actions/config/config';
import CollapsibleCard from '../../../CollapsibleCard';

import {
  getData,
  storeData,
  storeObjectData,
} from '../../../actions/storageAction';
import {color} from 'react-native-reanimated';

const HistorySKP = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [riwayatSkp, setRiwayatSkp] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', auth.token);

    fetch_retry(
      APILAMA + '/riwayatskp',
      {
        method: 'GET',
        headers: myHeaders,
      },
      5,
    )
      .then(res => res.json())
      .then(json => {
        setRiwayatSkp(json.data);
        storeObjectData('dataSkpUser', json.data);
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
    <SafeAreaView style={styles.container}>
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
              source={require('../../../assets/icons/skp.png')}
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
              Riwayat SKP
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentWrapper}>
        {/* Calendar */}
        <View style={styles.headerWrapper}>
          <View style={styles.header}>
            <View style={styles.headerLogoWrapper}>
              <Image
                source={require('../../../assets/icons/skp.png')}
                style={styles.headerLogo}
              />
            </View>
            <View style={styles.headerTitleWrapper}>
              <Text style={styles.headerTitle}>Riwayat SKP</Text>
              {/* <Text style={styles.headerSubTitle}>Versi 2.0.1</Text> */}
            </View>
          </View>
          {/* Title */}
        </View>
        {/* Hasil Penelusuran */}
        <View style={styles.headingTitleWrapper}>
          {/* <Text style={styles.headingTitle}>Riwayat Pendidikan</Text> */}
        </View>
        {/* List Absen */}
        <View style={styles.app}>
          {riwayatSkp.length > 0
            ? riwayatSkp.map((data, index) => (
                <CollapsibleCard
                  key={index}
                  title={'ID SKP : ' + data.id_skp}
                  style={styles.collapsibleContentWrapper}>
                  <View style={{padding: 8}}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text style={{fontSize: 14}}> Periode Awal : </Text>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                        {data.periode_awal}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text style={{fontSize: 14}}> Periode Akhir : </Text>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                        {data.periode_akhir}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text style={{fontSize: 14}}> Jabatan Pegawai : </Text>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                        {data.jabatan_pegawai}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text style={{fontSize: 14}}> Jabatan Penilai : </Text>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                        {data.jabatan_penilai}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text style={{fontSize: 14}}> Status : </Text>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                        {data.status}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                      }}>
                      <Text style={{fontSize: 14}}> Unit Kerja : </Text>
                      <Text
                        style={{fontSize: 14, fontFamily: 'Poppins-SemiBold'}}>
                        {data.unit_kerja}
                      </Text>
                    </View>
                  </View>
                </CollapsibleCard>
              ))
            : null}
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
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 0,
    position: 'relative',
    backgroundColor: '#edf2f5',
    marginBottom: 20,
  },
  headerWrapper: {
    position: 'absolute',
    height: 200,
    width: '100%',
    backgroundColor: '#188FC7',
  },
  header: {
    flex: 1,
    marginVertical: 15,
    paddingHorizontal: 35,
    paddingTop: 15,
  },
  headerLogoWrapper: {
    justifyContent: 'center',
    width: '100%',
    height: 350,
    flex: 1,
  },
  headerLogo: {
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    flex: 1,
  },
  headerTitleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginTop: -20,
    color: 'white',
  },
  headerSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    marginTop: -10,
    color: 'white',
    opacity: 0.3,
  },
  headingTitleWrapper: {
    marginHorizontal: 20,
    marginTop: 220,
  },
  headingTitle: {
    fontFamily: 'Poppins-Bold',
    color: '#188FC7',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  collapsibleContentWrapper: {
    marginBottom: 5,
    padding: 5,
  },
});

export default HistorySKP;
