import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import CollapsibleCard from '../../../../src/CollapsibleCard';
//import SampleEasing from './SampleEasing';

const TentangScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          paddingHorizontal: 10,
          backgroundColor: 'white',
          borderBottom: 'solid',
          borderBottomWidth: 1,
          borderBottomColor: '#cacaca',
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
              source={require('../../../assets/icons/informasi.png')}
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
              Tentang SiBemo
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
                source={require('../../../assets/logo/sibemo1024.png')}
                style={styles.headerLogo}
              />
            </View>
            <View style={styles.headerTitleWrapper}>
              <Text style={styles.headerTitle}>SIBEMO</Text>
              <Text style={styles.headerTitle}>(SIMPEG BErbasis MObile)</Text>
              <Text style={styles.headerSubTitle}>Versi 2.0</Text>
            </View>
          </View>
          {/* Title */}
        </View>
        {/* Hasil Penelusuran */}
        <View style={styles.headingTitleWrapper}></View>
        {/* List Absen */}
        <View style={styles.app}>
          <CollapsibleCard
            title="Tentang Aplikasi"
            style={styles.collapsibleContentWrapper}>
            <View style={{padding: 8}}>
              <Text style={styles.paragraph}>
                SiBemo Kota Bogor merupakan sebuah aplikasi Kepegawaian ASN di
                Lingkungan Pemerintah Kota Bogor yang dapat difungsikan untuk
                melakukan absensi beserta fungsi fungsi lain didalamnya.
              </Text>
            </View>
          </CollapsibleCard>

          {/*  <CollapsibleCard title="Collapsible Card Bezier" useBezier>
                            <View style={{ padding: 8 }}>
                                <Text style={styles.paragraph}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                    ever since the 1500s, when an unknown printer took a galley of type
                                    and scrambled it to make a type specimen book.
                                </Text>
                            </View>
                        </CollapsibleCard> */}
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
    //backgroundColor:'#edf2f5',
    backgroundColor: '#D1E9F4',
    marginBottom: 20,
  },
  headerWrapper: {
    position: 'absolute',
    height: 200,
    width: '100%',
    backgroundColor: '#fff',
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
    fontSize: 16,
    marginTop: -10,
    color: '#000',
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
    marginBottom: 16,
    padding: 5,
  },
});

export default TentangScreen;
