import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import Toast from 'react-native-simple-toast';
import {AuthContext} from '../../../actions/context/AuthContext';
import {API} from '../../../actions/config/config';
const UbahPassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const [notVerify, setNotVerify] = useState(false);
  const [msg, setMsg] = useState();
  const [loading, setLoading] = useState(false);
  const {auth} = useContext(AuthContext);

  useEffect(() => {
    if (msg != '') {
      setTimeout(() => {
        setMsg('');
      }, 5000);
    }
  }, [msg]);

  const updatePassword = () => {
    let myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', auth.token);

    let form = new FormData();
    form.append('oldpass', oldPassword);
    form.append('newpass', newPassword);

    if (
      newPassword === verifyPassword &&
      newPassword != '' &&
      verifyPassword != ''
    ) {
      setLoading(true);
      fetch(API + '/passupdate', {
        method: 'POST',
        headers: myHeaders,
        body: form,
      })
        .then(res => res.json())
        .then(json => {
          if (json.status == 200) {
            setLoading(false);
            Toast.showWithGravity(json.msg, Toast.SHORT, Toast.CENTER);
            setMsg(json.msg);
          } else {
            setLoading(false);
            setMsg(json.msg);
            Toast.showWithGravity(json.msg, Toast.SHORT, Toast.CENTER);
          }
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setNotVerify(true);
      setTimeout(() => {
        setNotVerify(false);
      }, 5000);
    }
  };

  let msgError;
  if (msg) {
    msgError = (
      <View style={styles.messageWrapper}>
        <Text style={styles.messageText}>{msg}</Text>
      </View>
    );
  } else {
    msgError = null;
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
              Ubah Password
            </Text>
          </View>
        </View>
      </View>

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
              padding: 30,
              borderRadius: 20,
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            {msgError}

            {notVerify ? (
              <View style={styles.messageWrapper}>
                <Text style={styles.messageText}>
                  Ulangi Password tidak sama
                </Text>
              </View>
            ) : null}

            <View style={styles.inputTextWrapper}>
              <Text style={styles.formLabel}>Password Saat Ini</Text>
              <TextInput
                onChangeText={setOldPassword}
                style={styles.formInput}
              />
            </View>
            <View style={styles.inputTextWrapper}>
              <Text style={styles.formLabel}>Password Baru</Text>
              <TextInput
                onChangeText={setNewPassword}
                style={styles.formInput}
              />
            </View>

            <View style={styles.inputTextWrapper}>
              <Text style={styles.formLabel}>Ulangi Password Baru</Text>
              <TextInput
                onChangeText={setVerifyPassword}
                style={styles.formInput}
              />
            </View>

            <View style={styles.inputTextWrapper}>
              <TouchableOpacity
                onPress={updatePassword}
                style={styles.loginButton}>
                {loading ? (
                  <ActivityIndicator size="large" color="#fff" />
                ) : (
                  <Text style={styles.loginTextButton}>Ubah Password</Text>
                )}
              </TouchableOpacity>
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
    marginHorizontal: 50,
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

export default UbahPassword;
