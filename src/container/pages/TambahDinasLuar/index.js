import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DatePicker from '../../../components/atoms/DatePicker';
import {AuthContext} from '../../../actions/context/AuthContext';
import {API} from '../../../actions/config/config';
import Toast from 'react-native-simple-toast';
import PickerDinas from '../../../components/atoms/PickerDinas';
import moment from 'moment';

import DocumentPicker, {types} from 'react-native-document-picker';

const TambahDinasLuar = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [keterangan, setKeterangan] = useState('');
  const [dinas, setDinas] = useState('');
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [file, setFile] = useState(null);

  const handleFileSelect = e => {
    DocumentPicker.pickSingle({
      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
      type: [types.pdf, types.images],
    }).then(values => {
      setFile(values);
    });
  };

  const tambahDinas = () => {
    if (file == null) {
      Toast.showWithGravity('Harap Pilih Eviden', Toast.SHORT, Toast.CENTER);
      return;
    }

    let myHeaders = new Headers();
    myHeaders.append('authorization', auth.token);

    let form = new FormData();

    form.append('tanggal', date);
    form.append('status', dinas);
    form.append('keterangan', keterangan);

    let x = {
      uri: file.uri,
      name: file.name,
      type: file.type,
    };

    form.append('file', x);

    let url = `${API}/attendances/dinasluar`;
    // let url = `${API}/dinasluar`;

    fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body: form,
    })
      .then(res => res.json().then(x => ({...x, status_code: res.status})))
      .then(res => {
        if (res.status_code < 300) {
          Toast.showWithGravity(
            'Berhasil Tambah Data',
            Toast.SHORT,
            Toast.CENTER,
          );
          navigation.navigate('PenyesuaianKehadiran');
        }
      })
      .catch(err => {
        Toast.showWithGravity(
          `Gagal Tambah Data ${err.message}`,
          Toast.SHORT,
          Toast.CENTER,
        );
        console.log(err);
      });
  };

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
              source={require('../../../assets/icons/penyesuaiankehadiran.png')}
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
              Tambah Dinas Luar
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentWrapper}>
        {/* Calendar */}

        {/* Hasil Penelusuran */}

        {/* List Absen */}
        <View style={styles.app}>
          <View style={{flex: 1}}>
            <DatePicker
              handleChange={val => {
                setDate(val);
              }}
            />
          </View>
          <TextInput
            value={date}
            editable={false}
            style={{
              color: '#000',
              borderWidth: 1,
              borderColor: '#ebebeb',
              backgroundColor: '#fff',
              padding: 10,
              borderRadius: 10,
              margin: 2,
              textAlign: 'center',
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16,
            }}
            multiline={true}
            numberOfLines={4}
          />
          <View style={{marginBottom: 20}}>
            <PickerDinas onChage={val => setDinas(val)} />
          </View>
          <View style={{marginBottom: 20}}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 13,
                marginLeft: 10,
                marginBottom: 10,
              }}>
              Keterangan
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: '#ebebeb',
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 10,
              }}
              onChangeText={text => setKeterangan(text)}
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <Button title="Pilih File Eviden" onPress={handleFileSelect} />
            {file && (
              <Text
                style={{
                  fontSize: 14,
                  padding: 10,
                  backgroundColor: '#61b15a',
                  borderRadius: 3,
                  marginVertical: 5,
                  color: '#fff',
                }}>
                {'File yang dipilih' + '\n' + file?.name}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#61b15a',
              padding: 10,
              marginBottom: 20,
              borderRadius: 8,
            }}
            onPress={tambahDinas}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
              }}>
              Kirim
            </Text>
          </TouchableOpacity>
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
    backgroundColor: '#e1292b',
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
    color: '#004670',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  collapsibleContentWrapper: {
    marginBottom: 5,
    padding: 5,
  },
});

export default TambahDinasLuar;
