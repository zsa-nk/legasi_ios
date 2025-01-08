import React, {useState, useContext} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

import {AuthContext, LOGIN, AUTH} from '../../../actions/context/AuthContext';

import {storeObjectData} from '../../../actions/storageAction';

import {API} from '../../../actions/config/config';
import {useCredential, useDeviceUniqueToken} from '../../../app/_hooks';
import {TopSection, HideUUID} from '../../../components/molecules/LoginFeature';

const ErrorMessage = ({message}) => {
  if (message != '') {
    return (
      <View style={styles.messageWrapper}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
    );
  }
  return null;
};

const InputContainer = ({children, label}) => {
  return (
    <View style={styles.inputTextWrapper}>
      <Text style={styles.formLabel}>{label}</Text>
      {children}
    </View>
  );
};

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);
  const [credential, setNip, setPassword] = useCredential();
  const [installId] = useDeviceUniqueToken();
  const [hidePass, setHidePass] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const useMesage = message => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  const authenticate = async () => {
    setLoading(true);

    let form = new FormData();
    form.append('nip', credential.nip);
    form.append('password', credential.password);
    form.append('imei', installId);

    try {
      const payload = {method: 'POST', body: form};
      const response = await fetch(
        `https://restsimpeg2.kotabogor.go.id/api/login`,
        payload,
      );
      const json = await response.json();
      if (json.status == 200) {
        setLoading(false);
        storeObjectData('rawCredential', credential);
        login(navigation, {type: LOGIN, token: json.token, data: json.data});
      } else {
        throw new Error(json.msg);
      }
    } catch (error) {
      useMesage(error.toString());
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.container}>
        <TopSection />

        <View style={styles.loginTitleWrapper}>
          <Text style={styles.loginTitle}>LOGIN</Text>
        </View>

        <KeyboardAvoidingView
          keyboardVerticalOffset={5}
          style={styles.loginWrapper}>
          <ErrorMessage message={message} />

          <InputContainer label="Nomor Induk Pegawai">
            <TextInput style={styles.formInput} onChangeText={setNip} />
          </InputContainer>
          <InputContainer label="Password">
            <View style={styles.passwordContainer}>
              <TextInput
                secureTextEntry={hidePass}
                textContentType="password"
                style={{...styles.formInput, width: '90%'}}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={{marginTop: 3}}
                onPress={() => setHidePass(!hidePass)}>
                <Image
                  source={require('../../../assets/icons/ic_remove_red_eye.png')}
                  style={styles.hidePass}
                />
              </TouchableOpacity>
            </View>
          </InputContainer>

          <View style={styles.inputTextWrapper}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={authenticate}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
              ) : (
                <Text style={styles.loginTextButton}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <HideUUID imei={installId} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
    marginHorizontal: 0,
    backgroundColor: '#edf2f5',
    marginBottom: 20,
  },
  messageWrapper: {
    justifyContent: 'center',
    //width:'100%',
    backgroundColor: '#8a0700',
    height: 30,
    marginBottom: 20,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  messageText: {
    textAlign: 'center',
    color: '#fff',
  },
  loginWrapper: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  loginTitleWrapper: {
    marginBottom: 20,
    marginTop: 20,
  },
  loginTitle: {
    fontFamily: 'Poppins-Light',
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 23,
    textAlign: 'center',
  },
  inputTextWrapper: {
    position: 'relative',
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 35,
  },
  formLabel: {
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#12b796',
  },
  formInput: {
    backgroundColor: '#efefef',
    borderRadius: 25,
    height: 50,
    fontSize: 13,
    paddingLeft: 20,
    paddingRight: 20,
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: '#efefef',
    paddingRight: 20,
  },
  loginButton: {
    backgroundColor: '#00b569',
    height: 40,
    width: '100%',
    //marginHorizontal:100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  loginTextButton: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'white',
  },
  hidePass: {
    width: 25,
    height: 25,
    borderRadius: 25,
    ...Platform.select({
      ios: {
        marginTop: 4,
      },
      android: {
        marginTop: 8,
      },
    }),
  },
});
