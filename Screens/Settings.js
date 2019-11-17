import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {connect } from 'react-redux';
import saveToken from '../api/saveToken';
class Settings extends Component {
    static navigationOptions = {
        title:'Setting',
    }
  on_Logout = ()=>{
    saveToken('');
    this.props.dispatch({ type : 'LOAD_USER' , user : '' })
    
  }
  render() {
    const { text_bnt_order,bnt_order} = styles;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{width: 150,height : 100}}>
               <TouchableOpacity style={bnt_order} onPress={()=> this.on_Logout()}>
              <Text style={text_bnt_order}>Đăng xuất</Text>
            </TouchableOpacity>
            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  bnt_order: {
    backgroundColor: '#045FB4',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text_bnt_order: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold'
  }

})


export default connect(state => ({ data: state.user }))(Settings)