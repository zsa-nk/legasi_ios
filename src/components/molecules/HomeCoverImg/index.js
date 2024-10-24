import React from 'react';
import {View, Text, Image} from 'react-native';

const HomeCoverImg = () => {
  return (
    <View style={{position: 'absolute', height: 290, width: '100%'}}>
      <Image
        source={require('../../../assets/imgs/homecover.png')}
        style={{width: '100%', height: 280, resizeMode: 'cover', flex: 1}}
      />
    </View>
  );
};

export default HomeCoverImg;
