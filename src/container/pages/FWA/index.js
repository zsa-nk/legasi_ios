import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {AuthContext} from '../../../actions/context/AuthContext';
import {getObjectData} from '../../../actions/storageAction';
import {useKeyboard} from '../../../app/_hooks';

const FWA = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [cred, setCred] = useState({nip: '', password: ''});
  useEffect(() => {
    getData();
  }, []);

  const keyboardHeight = useKeyboard();

  const getData = async () => {
    let data = await getObjectData('rawCredential');
    setCred(data);
  };
  let inject = `if(document.querySelector('#txtUserName') != null) document.querySelector('#txtUserName').value = '${cred.nip}';
                if(document.querySelector('#txtPassword') != null) document.querySelector('#txtPassword').value = '${cred.password}'`;
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
              Fleksibilitas Kerja
            </Text>
          </View>
        </View>
      </View>

      <WebView
        // source={{html:`<html><body onload="document.forms[0].submit();"><form action="https://ekinerja.kotabogor.go.id/Login" method="POST">`+
        //         `<input name="txtUserName" id="txtUserName" type="text" value='${cred.nip}'>`+
        //         `<input name="txtPassword" id="txtPassword" type="password" value='${cred.password}'>`+
        //         `</body></html>`
        //       }}
        // source={{uri: `https://bkpsdm.kotabogor.go.id/jfpro`}}
        source={{
          uri: `https://restsimpeg.kotabogor.go.id/fwa/?token=${auth.token}`,
        }}
        //injectedJavaScript={inject}
        javaScriptEnabledAndroid={true}
      />
      <View style={{height: keyboardHeight}}></View>
    </SafeAreaView>
  );
};

export default FWA;
