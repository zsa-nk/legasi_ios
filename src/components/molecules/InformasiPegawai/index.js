import React, {useContext} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faInfoCircle,
  faUser,
  faIdCard,
  faBuilding,
  faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../../../actions/context/AuthContext';

const InformasiPegawai = ({onPress, navigation}) => {
  const {auth, logout} = useContext(AuthContext);

  const logoutAlert = () =>
    Alert.alert(
      'Peringatan!',
      'Anda yakin ingin keluar aplikasi ini?',
      [
        {
          text: 'Ask me later',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            logout(navigation);
          },
        },
      ],
      {cancelable: false},
    );

  return (
    <View style={{marginHorizontal: 5, marginTop: 10}}>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 10,
          paddingHorizontal: 10,
          backgroundColor: '#188FC7',
          borderRadius: 20,
        }}>
        <View
          style={{flexDirection: 'column', justifyContent: 'space-between'}}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <FontAwesomeIcon
              icon={faUser}
              size={15}
              style={{color: '#fff', marginRight: 5}}
            />
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-Bold',
                fontSize: 14,
                color: '#fff',
              }}>
              {auth.data.nama}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faIdCard}
              size={15}
              style={{color: '#fff', marginRight: 5}}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                marginTop: 2,
              }}>
              {auth.data.nip}
            </Text>
          </View>
          {/* <View style={{flex:1, marginTop:10}}>
              <Text style={{color:'white', fontFamily:'Poppins-Bold', fontSize:13, textAlign:'left', opacity:0.3}}>Unit Kerja : </Text>
            </View> */}
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesomeIcon
              icon={faBuilding}
              size={15}
              style={{color: '#fff', marginRight: 5}}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                marginTop: 0,
              }}>
              {auth.data.unit_kerja}
            </Text>
          </View>
          <TouchableOpacity onPress={logoutAlert}>
            <View
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
                backgroundColor: '#e1292b',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginTop: 20,
              }}>
              <FontAwesomeIcon
                icon={faUserLock}
                size={15}
                style={{color: '#fff'}}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 12,
                  color: '#fff',
                  marginLeft: 5,
                }}>
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InformasiPegawai;
