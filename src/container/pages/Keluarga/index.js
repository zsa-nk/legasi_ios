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

const Keluarga = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', auth.token);

    fetch_retry(
      APILAMA + '/riwayatkeluarga',
      {
        method: 'GET',
        headers: myHeaders,
      },
      5,
    )
      .then(res => res.json())
      .then(json => {
        setData(json.data);
        storeObjectData('dataJabatanUser', json.data);
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
              source={require('../../../assets/icons/keluarga.png')}
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
              Keluarga
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
                source={require('../../../assets/icons/keluarga.png')}
                style={styles.headerLogo}
              />
            </View>
            <View style={styles.headerTitleWrapper}>
              <Text style={styles.headerTitle}>Keluarga</Text>
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
          {data.map((data, index) => (
            <CollapsibleCard
              key={index}
              title={data.nama}
              style={styles.collapsibleContentWrapper}>
              <View style={{padding: 8}}>
                {data.nik != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    NIK : {data.nik}
                  </Text>
                ) : null}

                {data.nama != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Nama : {data.nama}
                  </Text>
                ) : null}
                {data.status_keluarga != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Status : {data.status_keluarga}
                  </Text>
                ) : null}
                {data.jenis_kelamin != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Jenis kelamin : {data.jenis_kelamin}
                  </Text>
                ) : null}

                {data.tgl_lahir != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Tanggal Lahir : {data.tgl_lahir}
                  </Text>
                ) : null}

                {data.tgl_menikah != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Tanggal Menikah : {data.tgl_menikah}
                  </Text>
                ) : null}

                {data.tgl_cerai != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Tanggal Cerai : {data.tgl_cerai}
                  </Text>
                ) : null}

                {data.pekerjaan != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Pekerjaan : {data.pekerjaan}
                  </Text>
                ) : null}

                {data.dapat_tunjangan != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Tunjangan : {data.dapat_tunjangan}
                  </Text>
                ) : null}

                {data.keterangan != null ? (
                  <Text style={{padding: 5, fontSize: 15}}>
                    {' '}
                    Keterangan : {data.keterangan}
                  </Text>
                ) : null}
              </View>
            </CollapsibleCard>
          ))}
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

export default Keluarga;
