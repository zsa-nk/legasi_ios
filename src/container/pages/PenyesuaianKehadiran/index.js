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
import {API} from '../../../actions/config/config';
import CollapsibleCard from '../../../CollapsibleCard';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

import {
  getData,
  storeData,
  storeObjectData,
} from '../../../actions/storageAction';

const PenyesuaianKehadiran = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const [riwayatDinasluar, setRiwayatDinasluar] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', auth.token);

    fetch_retry(
      API + '/attendances/riwayatdinasluar',
      {
        method: 'GET',
        headers: myHeaders,
      },
      5,
    )
      .then(res => res.json())
      .then(json => {
        setRiwayatDinasluar(json);
        storeObjectData('dataDinasUser', json);
      })
      .catch(err => console.log(err));
  };

  function fetch_retry(url, options, n) {
    return fetch(url, options).catch(function (error) {
      if (n === 1) throw error;
      return fetch_retry(url, options, n - 1);
    });
  }

  //const approvalPending = <Text style={{fontSize:14, fontFamily:'Poppins-SemiBold', color:'orange'}}>PENDING</Text>
  //const approvalRejected = <Text style={{fontSize:14, fontFamily:'Poppins-SemiBold', color:'red'}}>REJECTED</Text>
  //const approvalApproved = <Text style={{fontSize:14, fontFamily:'Poppins-SemiBold', color:'green'}}>APPROVED</Text>

  //let statusApproval;
  //if (data.approval = "PENDING") {
  //    statusApproval = approvalPending
  //}
  //else if (data.approval = "REJECTED") {
  //    statusApproval = approvalRejected
  //} else {
  //    statusApproval = approvalApproved
  //}

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
              Penyesuaian Kehadiran
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.contentWrapper}>
        {/* Calendar */}

        {/* Hasil Penelusuran */}

        {/* List Absen */}
        <View style={styles.app}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TambahDinasLuar')}
            style={{
              backgroundColor: '#61b15a',
              padding: 10,
              marginBottom: 20,
              borderRadius: 8,
            }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: 'Poppins-Bold',
                textAlign: 'center',
              }}>
              Tambah Dinas Luar
            </Text>
          </TouchableOpacity>
          {riwayatDinasluar.length > 0
            ? riwayatDinasluar.map((data, index) => (
                // <CollapsibleCard
                //   key={index}
                //   title={"Tanggal : " + data.tgl + "   ---   " + data.status}
                //   style={styles.collapsibleContentWrapper}>
                //   <View style={{padding: 8}}>
                //     <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                //         <Text style={{fontSize:14}}> Status : </Text>
                //         <Text style={{fontSize:14, fontFamily:'Poppins-SemiBold'}}>{data.status}</Text>
                //     </View>
                //     <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                //         <Text style={{fontSize:14}}> Keterangan : </Text>
                //         <Text style={{fontSize:14, fontFamily:'Poppins-SemiBold'}}>{data.keterangan}</Text>
                //     </View>
                //     <View style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
                //         <Text style={{fontSize:14}}> Approval : </Text>
                //         { data.approval == 'PENDING' || data.approval == 'REJECTED'? (
                //         <Text style={{fontSize:14, fontFamily:'Poppins-SemiBold', color:'red'}}>{data.approval}</Text>
                //         ) : (
                //         <Text style={{fontSize:14, fontFamily:'Poppins-SemiBold', color:'green'}}>{data.approval}</Text>
                //         )}
                //     </View>

                //    </View>
                // </CollapsibleCard>

                <View
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    marginBottom: 10,
                    padding: 10,
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FontAwesomeIcon
                      icon={faCalendar}
                      color={'#222831'}
                      size={28}
                      style={{marginBottom: 5}}
                    />
                    <Text style={{fontFamily: 'Poppins'}}>{data.tgl}</Text>
                    <Text
                      style={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}>
                      {data.status}
                    </Text>
                  </View>
                  <View style={{width: '60%'}}>
                    <Text style={{fontFamily: 'Poppins'}}>Keterangan :</Text>
                    <Text
                      style={{
                        fontFamily: 'Poppins-SemiBold',
                        marginBottom: 20,
                      }}>
                      {data.keterangan}
                    </Text>
                    <Text style={{fontFamily: 'Poppins'}}>Approval :</Text>
                    {data.approval == 'PENDING' ||
                    data.approval == 'REJECTED' ? (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          color: 'red',
                        }}>
                        {data.approval}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: 'Poppins-SemiBold',
                          color: 'green',
                        }}>
                        {data.approval}
                      </Text>
                    )}
                  </View>
                </View>
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
    //backgroundColor:'green',
  },
});

export default PenyesuaianKehadiran;
