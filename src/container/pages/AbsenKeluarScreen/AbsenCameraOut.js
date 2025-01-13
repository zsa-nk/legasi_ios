import React, {PureComponent} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Image,
  Platform
} from 'react-native';
import {RNCamera} from 'react-native-camera';

import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import {
  storeData,
} from '../../../actions/storageAction';
import moment from 'moment';

export default class AbsenCameraOut extends PureComponent {
  componentDidMount() {
    this.hasPermission();
  }

  hasPermission = async () => {
    if(Platform.OS == 'android'){
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }
  };

  takePicture = () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      this.camera
        .takePictureAsync(options)
        .then(data => {
            storeData(moment().format('DD-MM-YYYY') + '-SELFIE-OUT', 'SUDAH-SELFIE').then(() => {
                CameraRoll.save(data.uri, {type: 'photo'});
                this.props.navigation.navigate('AbsenKeluarScreen');
            }).catch((err) => {
                console.log(err);
            })
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={false}
        />
        <View
          style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            >
            <Image style={styles.capture}
              source={require('../../../assets/icons/ic_camera.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 100,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
