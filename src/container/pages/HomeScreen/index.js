import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import HomeCoverImg from '../../../components/molecules/HomeCoverImg';
import LogoKijangBogor from '../../../components/atoms/LogoKijangBogor';
import InformasiPegawai from '../../../components/molecules/InformasiPegawai';
import SearchFeature from '../../../components/molecules/SearchFeature';
import BottomNavButton from '../../organisms/BottomNavButton';

import {API, APILAMA} from '../../../actions/config/config';
import {AuthContext} from '../../../actions/context/AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {DestinationContext} from '../../../actions/context/DestinationContext';

const HomeScreen = ({navigation}) => {
  const {auth} = useContext(AuthContext);
  const {getDestination} = useContext(DestinationContext);
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
    getDestination();
  }, []);

  const fetchData = () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('authorization', auth.token);

    fetchRetry(
      API + '/profil',
      {
        method: 'get',
        headers: myHeaders,
      },
      5,
    )
      .then(json => {
        setData(json.data);
      })
      .catch(err => console.log(err));
  };

  function fetchRetry(url, options, n) {
    return fetch(url, options)
      .catch(function (error) {
        if (n === 1) throw error;
        return fetchRetry(url, options, n - 1);
      })
      .then(res => res.json());
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Nav */}
      <View style={styles.headerWrapper}>
        <View style={styles.logoWrapper}>
          <Image
            style={styles.headerLogo}
            source={require('../../../assets/logo/sibemo1024.png')}
          />
        </View>
        <View style={styles.headerTitleWrapper}>
          <Text style={styles.headerTitle}>LEGASI Kota Bogor</Text>
        </View>
        <View></View>
        <View>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingRight: 20,
            }}
            onPress={() => navigation.openDrawer()}>
            <FontAwesomeIcon icon={faBars} color={'#222831'} size={28} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.container} onPress={() => { logout(navigation)  }}>
                        <View style={{display:'flex', flex:1, flexDirection:'column', backgroundColor:'#e1292b', justifyContent:'center', alignItems:'center', borderRadius:5}}>
                            <FontAwesomeIcon icon={ faUserLock } size={15} style={{color:'#fff'}} />
                            <Text style={{fontFamily:'Poppins-Bold', fontSize:10, color:'#fff'}}>Log Out</Text>
                        </View>
                    </TouchableOpacity> */}
      </View>
      {/* Cover */}
      <ScrollView style={styles.contentWrapper}>
        <HomeCoverImg />
        {/* Logo Kijang */}
        <View
          style={{
            height: 180,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{position: 'absolute', height: 130, width: 100, top: 30}}>
            <Image
              source={{uri: data?.photo}}
              style={{
                width: '100%',
                height: 130,
                resizeMode: 'cover',
                flex: 1,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#fff',
              }}
            />
          </View>
        </View>
        {/* Informasi Pegawai */}
        <InformasiPegawai
          navigation={navigation}
          onPress={() => navigation.navigate('ProfileScreen')}
        />
        {/*Search*/}

        {/*MainFeature*/}
        <View style={styles.mainFeatureContainer}>
          <View style={styles.shortCutWrapper}>
            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.ekinerjaButton}
                onPress={() => navigation.navigate('StatistikScreen')}>
                <Image
                  source={require('../../../assets/icons/profilsaya.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>Profil Saya</Text>
            </View>

            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.rekapButton}
                onPress={() => navigation.navigate('RekapitulasiScreen')}>
                <Image
                  source={require('../../../assets/icons/rekapitulasi.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>Rekapitulasi Kehadiran</Text>
            </View>
            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.kgbButton}
                onPress={() => navigation.navigate('PenyesuaianKehadiran')}>
                <Image
                  source={require('../../../assets/icons/penyesuaiankehadiran.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>Penyesuaian Kehadiran</Text>
            </View>

            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.scanButton}
                onPress={() => navigation.navigate('Ekinerja')}>
                <Image
                  source={require('../../../assets/icons/kinerja.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>Kinerja</Text>
            </View>
            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.cutiButton}
                onPress={() => navigation.navigate('PengajuanCuti')}>
                <Image
                  source={require('../../../assets/icons/cuti.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>Cuti</Text>
            </View>

            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.SiPUJANGGAButton}
                onPress={() => navigation.navigate('SiPUJANGGA')}>
                <Image
                  source={require('../../../assets/icons/sipujangga.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>SiPUJANGGA</Text>
            </View>

            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.PamongWalagriButton}
                onPress={() => navigation.navigate('PamongWalagri')}>
                <Image
                  source={require('../../../assets/icons/pamongwalagri.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>Pamong Walagri</Text>
            </View>

            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.TemanKitaButton}
                onPress={() => navigation.navigate('TemanKita')}>
                <Image
                  source={require('../../../assets/icons/temankita.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>Teman Kita</Text>
            </View>

            <View style={styles.shortcut}>
              <TouchableOpacity
                style={styles.jfproButton}
                onPress={() => navigation.navigate('JFPro')}>
                <Image
                  source={require('../../../assets/icons/jfpro.png')}
                  style={styles.buttonIcon}
                />
              </TouchableOpacity>
              <Text style={styles.buttonTitle}>JFPro</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {/*Tombol Absen*/}
      <View style={styles.wrapperBottomNav}>
        <View style={styles.wrapperAbsenMasuk}>
          <TouchableOpacity
            style={styles.tombolAbsen}
            onPress={() => navigation.navigate('AbsenMasukScreen')}>
            <Image
              style={styles.iconTombolAbsen}
              source={require('../../../assets/icons/masuk.png')}
            />
            <Text style={styles.titleTombolAbsen}>Datang</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperAbsenKeluar}>
          <TouchableOpacity
            style={styles.tombolAbsen}
            onPress={() => navigation.navigate('AbsenKeluarScreen')}>
            <Image
              style={styles.iconTombolAbsen}
              source={require('../../../assets/icons/keluar.png')}
            />
            <Text style={styles.titleTombolAbsen}>Pulang</Text>
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
  headerWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.4,
    shadowRadius: 9,
    elevation: 14,
    backgroundColor: '#ffffff',
  },
  logoWrapper: {
    width: 30,
    height: 35,
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerTitleWrapper: {
    flex: 5,
    alignItems: 'flex-start',
  },
  headerLogo: {
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
    flex: 1,
  },
  headerTitle: {
    paddingVertical: 5,
    marginLeft: 10,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  contentWrapper: {
    flex: 1,
    marginHorizontal: 0,
    position: 'relative',
    backgroundColor: '#fff',
  },
  mainFeatureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
  },
  shortCutWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    paddingHorizontal: 40,
  },
  shortcut: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 18,
  },
  rekapButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  buttonIcon: {
    width: 50,
    height: 50,
  },
  kgbButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  informasiButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  statistikButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  ekinerjaButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  SiPUJANGGAButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  PamongWalagriButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  TemanKitaButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  scanButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  cutiButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  jfproButton: {
    width: 80,
    height: 80,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 5,
  },
  buttonTitle: {
    marginTop: 5,
    textAlign: 'center',
  },
  wrapperBottomNav: {
    height: 85,
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.4,
    shadowRadius: 9,
    elevation: 14,
    paddingTop: 1,
  },
  wrapperAbsenMasuk: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b569',
    borderTopLeftRadius: 30,
  },
  tombolAbsen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTombolAbsen: {
    width: 32,
    height: 32,
  },
  titleTombolAbsen: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
    fontFamily: 'Poppins-Bold',
  },
  wrapperAbsenKeluar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e22a2c',
    borderTopRightRadius: 30,
  },
});

export default HomeScreen;
