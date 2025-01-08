import React, {useState} from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

const HideUUID = ({imei}) => {
  const [visibility, setVisibility] = useState(false) 
  return (
    <>
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <TouchableOpacity onPress={() => setVisibility(!visibility)}>
        <Image
          source={require('../../../assets/icons/ic_announcement.png')}
          style={{width: 30, height: 30}}
          />
      </TouchableOpacity>
      {visibility ? (
          <Text>Unique ID: {imei}</Text>
      ) : null}
    </View>
    </>
  );
}

export default HideUUID