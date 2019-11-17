import React, {Component} from 'react';
import AppContainer from '../Navigation';
import SignIn from './login';
import {connect } from 'react-redux';
import {View} from 'react-native';
import getToken from '../api/getToken';
class Abc extends Component {
  componentDidMount (){
      getToken()
      .then(token => {
        const res = JSON.parse( token);
        this.props.dispatch({ type : 'LOAD_USER' , user : res.user })
      })
  }
  //
  render(){
    const {user} = this.props.data;
    //console.log(user);
    return(
      <View style={{flex :1}}>
        { (user != null ?  <AppContainer></AppContainer> :   <SignIn></SignIn>) }
      </View>
    );
  }

}
export default connect(state => ({ data : state.user}))(Abc);