import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AuthContext} from '../../../actions/context/AuthContext';
import {API, APILAMA} from '../../../actions/config/config';

const UserProfile = ({navigation}) => {
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
      APILAMA + '/profil',
      {
        method: 'get',
        headers: myHeaders,
      },
      5,
    )
      .then(res => res.json())
      .then(json => {
        setData(json.data[0]);
      })
      .catch(err => console.log(err));
  };

  function fetch_retry(url, options, n) {
    return fetch(url, options).catch(function (error) {
      if (n === 1) throw error;
      return fetch_retry(url, options, n - 1);
    });
  }

  const handleChange = (key, value) => {
    setData(...data, {[key]: value});
  };

  const handleSubmit = () => {
    console.log(data);
  };

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
              source={require('../../../assets/icons/biodata.png')}
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
              Profil Anda
            </Text>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={5}
        style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: 50,
              marginBottom: 50,
            }}>
            <View
              style={{
                width: '90%',
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderRadius: 20,
                backgroundColor: 'white',
                alignItems: 'center',
              }}>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Nama</Text>
                {/* <TextInput
                  value={data.nama}
                  style={styles.formInput}
                  onChangeText={t => handleChange('nama', t)}
                  editable = {false}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.nama}
                </Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Tampat, Tanggal Lahir</Text>
                {/* <TextInput
                  value={data.ttl}
                  style={styles.formInput}
                  onChangeText={t => handleChange('ttl', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>{data.ttl}</Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Nip</Text>
                {/* <TextInput
                  value={data.nip}
                  style={styles.formInput}
                  onChangeText={t => handleChange('nip', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>{data.nip}</Text>
              </View>

              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Pangkat</Text>
                {/* <TextInput
                  value={data.pangkat}
                  style={styles.formInput}
                  onChangeText={t => handleChange('pangkat', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.pangkat}
                </Text>
              </View>

              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Golongan</Text>
                {/* <TextInput
                  value={data.golongan}
                  style={styles.formInput}
                  onChangeText={t => handleChange('golongan', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.golongan}
                </Text>
              </View>

              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>TMT Golongan</Text>
                {/* <TextInput
                  value={data.tmt_golongan}
                  style={styles.formInput}
                  onChangeText={t => handleChange('tmt_golongan', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.tmt_golongan}
                </Text>
              </View>

              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Jabatan</Text>
                {/* <TextInput
                  value={data.jabatan}
                  style={styles.formInput}
                  onChangeText={t => handleChange('jabatan', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.jabatan}
                </Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Kelas Jabatan</Text>
                {/* <TextInput
                  value={data.kelas_jabatan}
                  style={styles.formInput}
                  onChangeText={t => handleChange('kelas_jabatan', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.kelas_jabatan}
                </Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Eselonering</Text>
                {/* <TextInput
                  value={data.eselonering}
                  style={styles.formInput}
                  onChangeText={t => handleChange('eselonering', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.eselonering}
                </Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Jenis Kepegawaian</Text>
                {/* <TextInput
                  value={data.jenis_kepegawaian}
                  style={styles.formInput}
                  onChangeText={t => handleChange('jenis_kepegawaian', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.jenis_kepegawaian}
                </Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>Pendidikan terakhir</Text>
                {/* <TextInput
                  value={data.pendidikan_terakhir}
                  style={styles.formInput}
                  onChangeText={t => handleChange('pendidikan_terakhir', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.pendidikan_terakhir}
                </Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>OPD</Text>
                {/* <TextInput
                  value={data.opd}
                  style={styles.formInput}
                  onChangeText={t => handleChange('opd', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>{data.opd}</Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>No Hp</Text>
                {/* <TextInput
                  value={data.opd}
                  style={styles.formInput}
                  onChangeText={t => handleChange('opd', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.no_hp}
                </Text>
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.formLabel}>No Hp</Text>
                {/* <TextInput
                  value={data.opd}
                  style={styles.formInput}
                  onChangeText={t => handleChange('opd', t)}
                /> */}
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>
                  {data.email}
                </Text>
              </View>

              {/*<View style={styles.inputTextWrapper}>
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleSubmit}>
                  <Text style={styles.loginTextButton}>Update</Text>
                </TouchableOpacity>
            </View>*/}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 0,
    backgroundColor: '#edf2f5',
    marginBottom: 20,
  },
  topSection: {
    height: 300,
    backgroundColor: '#00689f',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flex: 1,
    marginVertical: 15,
    paddingHorizontal: 35,
    paddingTop: 15,
    marginTop: 50,
  },
  logoWrapper: {
    justifyContent: 'center',
    width: 90,
    height: 100,
    width: '100%',
  },
  messageWrapper: {
    justifyContent: 'center',
    width: '100%',
  },
  messageText: {
    textAlign: 'center',
    color: 'red',
  },
  logo: {
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    flex: 1,
  },
  logoTitleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
  },
  whiteTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
    marginTop: -20,
    color: 'white',
    textTransform: 'uppercase',
  },
  whiteSubTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
    marginTop: -10,
    color: 'white',
    opacity: 0.8,
  },
  loginWrapper: {
    marginHorizontal: 20,
    marginTop: -60,
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.4,
    shadowRadius: 9,
    elevation: 14,
    alignItems: 'center',
  },
  loginTitleWrapper: {
    marginBottom: 20,
    marginTop: 20,
  },
  loginTitle: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 23,
  },
  inputTextWrapper: {
    position: 'relative',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  formLabel: {
    marginBottom: 5,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#0069a1',
  },
  formInput: {
    backgroundColor: '#efefef',
    borderRadius: 5,
    height: 40,
    fontSize: 13,
    paddingLeft: 20,
    paddingRight: 20,
  },
  loginButton: {
    backgroundColor: '#00b569',
    height: 40,
    marginHorizontal: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  loginTextButton: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
});

export default UserProfile;
