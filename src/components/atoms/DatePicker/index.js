import React, { Component } from 'react';
import { Text, View, Platform, Button, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import moment from 'moment';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faCalendar} from '@fortawesome/free-solid-svg-icons';


export default class DatePicker extends Component {
    state={
        date: new Date(),
        mode:'date',
        show:false,
        showDate:false,
    }


    handleChange = (event, date) => {
        // console.log(date)
        this.setDate(date)
        this.props.handleChange(moment(date).format('YYYY-MM-DD'))
    }

    setDate =(event, newdate) => {
        date = newdate || this.state.date
        this.setState({
            showDate: true,
            show: Platform.OS === 'ios' ? true : false,
            date,
        })
    }

    show = mode => {
        this.setState({
            show:true,
            mode,
        })
    }
    datepicker= () => {
        this.show('date');
    }
    timepicker= () => {
        this.show('time');
    }

    //
    showDatePicker=()=> {
        this.setState({
           showDate:!this.state.showDate, mode:'date' 
        });
    }
    showTimePicker=()=> {
        this.setState({
            showDate:!this.state.showDate, mode:'time'
        });
    }
    
    checkAndroidIos(show, date, mode) {
        if(Platform.OS==='ios') {
            return(
                <View>
                    <View>
                        <TouchableOpacity onPress={this.showDatePicker} style={{height:43, backgroundColor:'#d35d6e', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color:'#fff', fontFamily:'Poppins-Medium', fontSize:16}}>Tentukan Tanggal Dinas</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{height:28}}>
                        <Modal
                            isVisible={this.state.showDate}
                        > 
                        <View style={{backgroundColor:'#fff', height:300, width:'100%', justifyContent:'center', position:'absolute', bottom:0, marginBottom:20, borderRadius:15}}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display='default'
                            onChange={this.handleChange}
                        >
                        </DateTimePicker>
                        <Button title="Tutup" onPress={this.showDatePicker}></Button>
                        </View>

                        </Modal>
                    </View>
                </View>
            )
        } else {
            return(
                <View>
                <View>
                        <TouchableOpacity onPress={this.datepicker} style={{width:'100%', height:55, flexDirection:'row', alignItems:'center', justifyContent:'space-between', backgroundColor:'#fff', paddingLeft:10, borderRadius:13, borderWidth:1, borderColor:'#ebebeb', marginBottom:20}}>
                            <View style={{justifyContent:'center', marginRight:10}}>
                                <Text style={{fontFamily:'Poppins-Bold', fontSize:14}} onChange={this.handleChange}>
                                    {/* {mode === 'date' && moment.utc(date).format('DD/MM/YYYY')} */}
                                    Silahkan Tentukan Tanggal
                                </Text>
                            </View>
                            <View style={{marginRight:20}}>
                                <FontAwesomeIcon icon={ faCalendar } color={'#7E7E7E'} size={20} />
                            </View>
                        </TouchableOpacity>
                </View>
                
                {
                    this.state.show && <DateTimePicker 
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display='default'
                    onChange={this.handleChange}
                    >
                    </DateTimePicker>
                }
            </View>
            )
        }
        
    }
    render() {
        const {show, date, mode}=this.state;
        return (
            <SafeAreaView>
            {this.checkAndroidIos(show, date, mode)}
            </SafeAreaView>
        )
    }
}
