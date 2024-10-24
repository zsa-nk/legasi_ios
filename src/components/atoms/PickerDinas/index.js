import React, { Component } from 'react';
import { Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';


export default class PickerDinas extends Component {
    state = {
        status: 'default',
      };
    render() {
        return (
            <View style={{backgroundColor:'#fff', borderRadius:8, paddingTop:0}}>
                <Picker
                    selectedValue={this.state.status}
                    style={{marginTop:0}}
                    onValueChange={(itemValue, itemIndex) =>{
                        this.setState({ status: itemValue })
                        this.props.onChage(itemValue)
                    }
                }>
                <Picker.Item label="-- Silahkan Pilih Jenis Dinas --" value="default" />
                <Picker.Item label="Dinas Luar Pagi" value="DLPG" />
                <Picker.Item label="Dinas Luar Pulang" value="DLP" />
                <Picker.Item label="Work From Home" value="wfh" />
                </Picker>
            </View>
        )
    }
}
