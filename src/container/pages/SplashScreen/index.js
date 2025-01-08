import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native'
import React, { useEffect } from 'react'
import * as Progress from 'react-native-progress';

import { TopSection } from '../../../components/molecules/LoginFeature'
import useAuth from '../../../app/_hooks/useAuth'

const SplashScreen = ({navigation}) => {
  const [authenticated, isloading] = useAuth();

  const debounce = (func, timeout = 100) => {
    let timer;
    return (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => func.apply(this, args), timeout)
    }
  }

  const checkAuth = () => {
    if(!isloading){
      if(authenticated){
        navigation.replace('HomeScreen');
      }else{
        navigation.replace('LoginScreen');
      }
    }
  }

  useEffect(debounce(checkAuth, 1000), [isloading]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
        <View style={styles.wrapperTopSection}></View>
        <TopSection />
        <View style={styles.center}>
          <Progress.Circle size={50} borderWidth={5} strokeCap="round" indeterminate={true} color="#0000ff" />
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    marginVertical: '20%'
  },
  wrapperTopSection: {
    paddingTop: '25%',
    backgroundColor:'#00689f',
  },
  loadingText: {
    fontFamily: 'Poppins',
    fontSize: 18,
    margin: 5
  }
})