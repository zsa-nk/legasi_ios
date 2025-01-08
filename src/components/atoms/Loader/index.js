import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

class Loader extends Component {
    render() {
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container : {
        backgroundColor: 'rgba(0,0,0,0.6)',
        position:'absolute',
        width:'100%',
        height:'100%',
        zIndex:99,
        justifyContent:'center'
    }
})

export default Loader;