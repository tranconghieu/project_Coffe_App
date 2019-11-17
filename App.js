import React, {Component} from 'react';

import store from './redux/store';
import {Provider } from 'react-redux';
import Abc from './Screens/screen_index';


export default class App extends Component {
  render(){
    return(
      <Provider store = {store}>  
         <Abc></Abc>
      </Provider>   
    );
  }
}
