import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    NativeModules,
    PermissionsAndroid,
  } from 'react-native';
  
  import React, {useState, useRef, useEffect, useMemo, useContext} from 'react';
  
  import NetInfo, {useNetInfo} from '@react-native-community/netinfo';
  import Toast from 'react-native-simple-toast';
  import moment from 'moment';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import {Camera, useCameraDevice, useFrameProcessor} from 'react-native-vision-camera';
  import {runOnJS} from 'react-native-reanimated';
  import {CameraRoll} from '@react-native-camera-roll/camera-roll';
  import {storeData} from '../../../actions/storageAction';
  import {PresensiContext} from '../../../actions/context/PresensiContext';
  import {DestinationContext} from '../../../actions/context/DestinationContext';
  import {
    compareArrayOfContour,
    useWatchLocation,
    useHaversine,
    useGrantedPresensi,
  } from '../../../app/_hooks';
  import {AuthContext} from '../../../actions/context/AuthContext';
  import {API} from '../../../actions/config/config';
  import {debounce} from '../../../app/_helper';
  import {useMLKitFaceDetection} from 'react-native-mlkit-face-detection';
  
  const useLocalContour = () => {
    const [arrayofContour, setArrayOfContour] = useState([]);
    const [takeSample, setTakeSample] = useState(false);
  
    useEffect(() => {
      AsyncStorage.getItem('contours')
        .then(result => {
          if (!result) setTakeSample(true);
          if (result) setArrayOfContour(JSON.parse(result));
        })
        .catch(err => console.log(err));
    }, []);
  
    const takeContour = async currentFaces => {
      if (arrayofContour.length > 2) {
        await AsyncStorage.setItem('contours', JSON.stringify(arrayofContour));
        setTakeSample(false);
      } else {
        setArrayOfContour(prev => {
          prev.push(currentFaces);
          return prev;
        });
      }
    };
  
    return [arrayofContour, takeContour, takeSample];
  };
  
  const usePermissionStorage = () => {
    const [granted, setgranted] = useState(false);
  
  
    const checkPermission = async () => {
      if (Platform.OS === 'android') {
        const cameraPermission = PermissionsAndroid.PERMISSIONS.CAMERA;
        const storagePermission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    
        const cameraGranted = await PermissionsAndroid.check(cameraPermission);
        const storageGranted = await PermissionsAndroid.check(storagePermission);
    
        if (cameraGranted && storageGranted) {
          setgranted(true);
        } else {
          const cameraStatus = await PermissionsAndroid.request(cameraPermission);
          const storageStatus = await PermissionsAndroid.request(storagePermission);
          setgranted(cameraStatus === 'granted' && storageStatus === 'granted');
        }
      }
    };
    
  
    useEffect(() => {
      checkPermission();
    }, []);
  
    return [granted, checkPermission];
  };
  
  const AbsenCameraFaceDetection = ({navigation}) => {
    const {auth} = useContext(AuthContext);
    const {presensi, dispatch} = useContext(PresensiContext);
  
    NetInfo.configure({
      reachabilityUrl: API,
      reachabilityTest: async response => response.status === 204,
    });
    const networkStatus = useNetInfo();
  
    const cameraRef = useRef(null);
    const [box, setBox] = useState(null);
    const [postCount, setPostCount] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [matchPercentage, setMatchPercentage] = useState(100);
    const [arrayofContour, takeContour, takeSample] = useLocalContour();
    const [arrayOfLabels, setArrayOfLabels] = useState([]);
    const [currentFaces, setCurrentFaces] = useState(null);
    const [granted, checkPermission] = usePermissionStorage();
  
    const {destination, selectedUK} = useContext(DestinationContext);
    const {currentPosition, refreshLocation} = useWatchLocation();
    const {distanceLimit, diffPosition} = useHaversine(
      currentPosition,
      destination,
    );
    const {grantedAbsent} = useGrantedPresensi(
      destination,
      currentPosition,
      diffPosition,
      distanceLimit,
    );
  
    // const devices = useCameraDevices();
    // const device = devices.front;
    const device = useCameraDevice('front');
    const { hasPermission } = useCameraPermission()
    if (!hasPermission) return <PermissionsPage />
    if (device == null) return <NoCameraDeviceError />
    
    const frameProcessor = useFrameProcessor(frame => {
      'worklet';
      const faces = useMLKitFaceDetection(frame);
      runOnJS(handlerFace)({faces});
    }, []);
  
    const handlerFace = ({faces}) => {
      if (faces.length > 0) {
        const face = faces[0];
        setBox({
          boxs: {
            width: face.bounds.size.width,
            height: face.bounds.size.height,
            x: face.bounds.origin.x,
            y: face.bounds.origin.y,
            yawAngle: face.headEulerAngleY,
            rollAngle: face.headEulerAngleZ,
          },
          rightEyePosition: face.rightEyePosition,
          leftEyePosition: face.leftEyePosition,
          bottomMouthPosition: face.bottomMouthPosition,
        });
  
        let {bounds, ...other} = face;
        setCurrentFaces(other);
        setMatchPercentage(compareArrayOfContour(arrayofContour, other));
      } else {
        setBox(null);
      }
    };
  
    const takePicture = debounce(async (camera, tries = 5) => {
      if (!networkStatus.isInternetReachable || !networkStatus.isConnected) {
        Toast.showWithGravity(
          'Presensi error Network unreachable',
          Toast.SHORT,
          Toast.CENTER,
        );
        return;
      }
  
      setProcessing(true);
      refreshLocation();
      setPostCount(prev => (prev += 1));
      dispatch({type: 'presensi.start'});
      if (granted && grantedAbsent) {
        try {
          const photo = await camera.current.takePhoto({
            qualityPrioritization: 'quality',
            flash: 'off',
          });
          if (granted) {
            dispatch({
              type: 'presensi/masuk.camera',
              data: {masuk: {file: photo.path}},
            });
            postPresensi(photo.path);
          }
        } catch (error) {
          setProcessing(false);
          Toast.showWithGravity(
            'Presensi error ' + error.message,
            Toast.SHORT,
            Toast.CENTER,
          );
        }
      } else {
        checkPermission();
      }
      setProcessing(false);
    }, 2000);
  
    const postData = ({body, token}) => {
      let myHeaders = new Headers();
      myHeaders.append('authorization', token);
      return fetch(`${API}/attendances`, {
        method: 'POST',
        headers: myHeaders,
        body: body,
      })
        .then(res => {
          return res
            .json()
            .then(data => ({
              status_code: res.status,
              ...data,
            }))
            .catch(err => {
              console.log('error 1', err);
              Toast.showWithGravity(
                'Presensi error' + err.message,
                Toast.SHORT,
                Toast.CENTER,
              );
            });
        })
        .catch(err => {
          console.log('error 2', err);
          Toast.showWithGravity(
            'Presensi error' + err.message,
            Toast.SHORT,
            Toast.CENTER,
          );
        });
    };
  
    const postPresensi = fileUri => {
      let form = new FormData();
      let file = {
        uri: fileUri,
        name: `${auth.data.nip}-${moment()}.jpg`,
        type: 'image/jpg',
      };
  
      form.append('longitude', currentPosition.coords.longitude);
      form.append('latitude', currentPosition.coords.latitude);
      form.append('file', file);
      form.append('status', 'CHECK IN');
      form.append('id_unit_kerja', selectedUK);
      form.append('tipe', destination.location.tipe);
  
      if (grantedAbsent) {
        postData({body: form, token: auth.token})
          .then(json => {
            if (json?.status_code === 200) {
              storeData(
                moment().format('DD-MM-YYYY') + '-SELFIE-IN',
                'SUDAH-SELFIE',
              );
              storeData(moment().format('DD-MM-YYYY') + '-IN', 'TERCATAT')
                .then(_ => {
                  Toast.showWithGravity(
                    'Presensi berhasil',
                    Toast.SHORT,
                    Toast.CENTER,
                  );
                  navigation.navigate('RekapitulasiScreen');
                })
                .catch(err => {
                  console.log('error 3', err);
                  Toast.showWithGravity(
                    'Presensi error' + err,
                    Toast.SHORT,
                    Toast.CENTER,
                  );
                });
            } else {
              Toast.showWithGravity(
                'Presensi gagal: ' + json.messages.error,
                Toast.SHORT,
                Toast.CENTER,
              );
              throw new Error(json.messages.error);
            }
          })
          .catch(err => {
            console.log('error 4', err);
            Toast.showWithGravity(
              'Presensi error' + err,
              Toast.SHORT,
              Toast.CENTER,
            );
          });
      }
    };
  
    useEffect(() => {
      if (
        cameraRef &&
        matchPercentage > 70 &&
        takeSample == false &&
        postCount < 1
      ) {
        takePicture(cameraRef.current);
      }
    }, [matchPercentage, takeSample, postCount]);
  
    if (device == null) return <ActivityIndicator />;
  
    return (
      <View style={styles.container}>
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={device}
          isActive={true}
          // photo={true}
          // photoQualityBalance='speed'
          frameProcessor={frameProcessor}
        >
          <View>
            {arrayOfLabels.map((item, index) => (
              <Text key={index}>
                {item.text} - {item.confidence}
              </Text>
            ))}
          </View>
  
          <View style={styles.dotAim}>
            <Text style={{textAlign: 'center', color: 'red', fontSize: 50}}>.</Text>
          </View>
  
          <View style={styles.circle}></View>
  
          {processing ? (
            <View style={styles.processingContainer}>
              <ActivityIndicator animating size="large" color="#0000ff" />
              <Text style={{fontFamily: 'Poppins'}}>PROCESSING</Text>
            </View>
          ) : null}
  
          {box && (
            <>
              <View
                style={styles.bound({
                  width: box.boxs.width,
                  height: box.boxs.height,
                  x: box.boxs.x,
                  y: box.boxs.y,
                  borderColor: matchPercentage > 70 ? '#00b569' : '#b50f00',
                })}
              />
            </>
          )}
  
          {takeSample ? (
            <>
              <View style={styles.buttonContainerSample}>
                <TouchableOpacity onPress={() => takeContour(currentFaces)}>
                  <Image
                    style={styles.capture}
                    source={require('../../../assets/icons/ic_camera.png')}
                  />
                  <Text style={styles.sampleTaken}>{arrayofContour.length}</Text>
                  <Text style={styles.sampleTakenText}>ambil data sampel</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : null}
        </Camera>
        {postCount > 1 ? (
          <View style={styles.buttonContainerSample}>
            <TouchableOpacity onPress={setPostCount(0)}>
              <Image
                style={styles.capture}
                source={require('../../../assets/icons/ic_camera.png')}
              />
              <Text style={styles.sampleTaken}>{arrayofContour.length}</Text>
              <Text style={styles.sampleTakenText}>Coba lagi</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  
  export default AbsenCameraFaceDetection;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gray',
    },
    camera: {
      flexGrow: 1,
    },
    capture: {
      alignSelf: 'center',
      width: 100,
      height: 100,
    },
    buttonContainer: {
      justifyContent: 'center',
      bottom: 0,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 60,
      backgroundColor: '#00b569',
      width: 55,
      height: 55,
      borderRadius: 25,
    },
    buttonContainerSample: {
      justifyContent: 'center',
      bottom: 0,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 60,
    },
    sampleTaken: {
      textAlign: 'center',
      alignSelf: 'center',
      position: 'absolute',
      top: 40,
    },
    sampleTakenText: {
      textAlign: 'center',
      backgroundColor: '#fff',
      padding: 5,
      borderRadius: 3,
      top: -20,
    },
    processingContainer: {
      position: 'absolute',
      marginHorizontal: '35%',
      flex: 1,
      top: '45%',
      backgroundColor: '#ffffff',
      padding: 10,
      borderRadius: 20,
      opacity: 0.5,
    },
    dotAim: {
      position: 'absolute',
      top: '45%',
      marginHorizontal: '49%',
      alignContent: 'center',
    },
    circle: {
      width: '60%',
      height: '50%',
      borderColor: '#f3f3f3',
      borderRadius: 90,
      borderWidth: 1,
      borderStyle: 'dashed',
      top: '25%',
      alignSelf: 'center',
    },
    bound: ({width, height, x, y, borderColor}) => {
      return {
        position: 'absolute',
        top: y,
        left: x - 10,
        height,
        width,
        borderWidth: 5,
        borderColor: borderColor,
        zIndex: 3000,
      };
    },
    glasses: ({rightEyePosition, leftEyePosition, yawAngle, rollAngle}) => {
      return {
        position: 'absolute',
        top: rightEyePosition.y - 60,
        left: rightEyePosition.x - 100,
        resizeMode: 'contain',
        width: Math.abs(leftEyePosition.x - rightEyePosition.x) + 100,
      };
    },
  });
  