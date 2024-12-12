import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AuthContext} from '../../../actions/context/AuthContext';
import {API} from '../../../actions/config/config';

export default class PickerDinas extends Component {
  static contextType = AuthContext; // Use contextType for class components

  state = {
    status: 'default',
    options: [],
  };

  componentDidMount() {
    this.fetchOptions();
  }

  fetchOptions = async () => {
    console.log('fetch');
    const {auth} = this.context; // Access auth from context
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', auth.token);

    try {
      console.log('try ' + auth.token);
      const response = await fetch(
        'https://restsimpeg2.kotabogor.go.id/api/getJenisPenyesuaianKehadiran',
        {
          headers: myHeaders,
        },
      );

      const responseJson = await response.json();
      console.log('Raw Response: ..', response);
      if (responseJson.status === 'SUCCESS') {
        this.setState({options: responseJson.data || []});
      } else {
        console.error(
          'Failed to fetch options:',
          responseJson.message || 'Unknown error',
        );
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  render() {
    return (
      <View style={{backgroundColor: '#fff', borderRadius: 8, paddingTop: 0}}>
        <Picker
          selectedValue={this.state.status}
          style={{marginTop: 0}}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({status: itemValue});
            this.props.onChange(itemValue);
          }}>
          <Picker.Item label="-- Pilih Jenis Penyesuaian --" value="default" />

          {this.state.options.map(item => (
            <Picker.Item
              key={item.id}
              label={item.status}
              value={item.status}
            />
          ))}
        </Picker>
      </View>
    );
  }
}
