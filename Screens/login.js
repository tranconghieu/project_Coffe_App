import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
  Dimensions, Image,Alert 
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import login from '../api/login';
import saveToken from '../api/saveToken';
import getToken from '../api/getToken';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class SignIn extends Component {
  static navigationOptions = {
    title: 'Login',
  }
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    }
  }

  componentDidMount() {

  }
  alert_massage = (text_massage, callback) => {
    const { navigation } = this.props;
    //debugger;
    Alert.alert(
      'Thông báo từ máy chủ',
      text_massage,
      [
        { text: 'OK', onPress: () => { (typeof (callback) == 'function') && (callback.call(navigation)) } },
      ]
    );
  }
  onlogin() {

    const { navigation } = this.props;
    const { user, password } = this.state;
    //debugger
    //console.log(user,password);
    login(user, password)
      .then((res) => {
        debugger;
        if(res.status == 'success'){
          saveToken(res);
          this.props.dispatch({ type : 'LOGIN_USER',user : res.user});
          navigation.navigate('Table');
        }
        if(res.status == 'LOGIN_FAILED'){
          this.alert_massage('Đăng nhập thất bại');
        }
        //debugger
      })
      .catch(err => console.log(err))
  }
  render() {
    const { navigation } = this.props
    const { user, password } = this.state;
    const { textStyle, bntForm, bntSignIn, bntSignUp, bntSignInNow, inactiveStyle, activeStyle, fromInput, inputStyle } = styles;

    return (

      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView >
          <View style={{ flex: 20, justifyContent: "center", alignItems: 'center', paddingTop: 20 }}>
            <Image
              style={{ height: 170, width: 170 }}
              source={require('../images/login_logo.png')}
            />
          </View>
          <View style={fromInput}>
            <Sae
              style={inputStyle}
              labelStyle={{ color: '#000', fontSize: 30, fontWeight: '100' }}
              label={'Tên đăng nhập'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'#000'}
              inputPadding={16}
              labelHeight={24}
              // active border height
              inputStyle={textStyle}
              borderHeight={2}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              value={user}
              onChangeText={text => this.setState({ user: text })}
            />
            <Sae
              style={inputStyle}
              inputStyle={textStyle}
              labelStyle={{ color: '#000', fontSize: 25, fontWeight: '100' }}
              label={'Mật khẩu'}
              iconClass={FontAwesomeIcon}
              iconName={'pencil'}
              iconColor={'#000'}
              inputPadding={16}
              labelHeight={24}
              // active border height
              borderHeight={2}
              // TextInput props
              autoCapitalize={'none'}
              autoCorrect={false}
              value={password}
              onChangeText={text => this.setState({ password: text })}
              secureTextEntry={true}
            />

            <TouchableOpacity style={bntSignInNow} onPress={this.onlogin.bind(this)}>
              <Text style={{ color: '#045FB4', fontSize: 18 }}>Đăng Nhập</Text>
            </TouchableOpacity>
          </View>



        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  bntSignInNow: {
    //backgroundColor: '#34B089',
    width: width - 120,
    //paddingHorizontal: 60,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 1,
    paddingVertical: 15,
    borderColor: '#045FB4',
    alignItems: 'center'
  },
  fromInput: {
    flex: 90,
    //backgroundColor: '#34B089',
    alignItems: 'center',
    paddingTop: 15,
    flex: 80,
  },
  textStyle: {
    color: '#000'
  },
  inputStyle: {
    width: width - 120,
    borderColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 20,

  },
  bntForm: {
    flex: 10,
    //backgroundColor: '#34B089',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 100
  },
  inactiveStyle: {
    color: '#34B089',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: "Avenir"
  },
  activeStyle: {
    color: '#4444',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: "Avenir"
  },
  bntSignIn: {
    // paddingHorizontal: 60,
    alignItems: 'center',
    width: (width / 2) - 20,
    paddingVertical: 15
    , backgroundColor: 'white',
    marginRight: 5,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20
  },
  bntSignUp: {
    alignItems: 'center',
    width: (width / 2) - 20,
    paddingVertical: 15
    , backgroundColor: 'white',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20
  }
});

export default connect()(SignIn);