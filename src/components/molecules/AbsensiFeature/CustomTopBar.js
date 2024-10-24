import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

const CustomTopBar = ({ navigation, iconPath, title, color }) => {
  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuBackButton}
        onPress={() => navigation.goBack()}>
        <Image
          source={require('../../../assets/icons/back.png')}
          style={{ width: 16, height: 16 }}
        />
      </TouchableOpacity>
      <View style={styles.menuAligment}>
        <View style={{...styles.menuIcon, backgroundColor: color ? color : '#00b569'}}>
          <Image
            source={iconPath}
            style={{ width: 16, height: 16 }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.menuName}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default CustomTopBar

const styles = StyleSheet.create({
  menuName: {
    paddingVertical: 5,
    marginLeft: 5,
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  menuIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuAligment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBackButton: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: 'white',
  }

})