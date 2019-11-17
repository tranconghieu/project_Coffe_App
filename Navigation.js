import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Table from './Screens/Table';
import Categoty from './Screens/Category';
import Order from './Screens/Order';
// import Settings from './Screens/Settings';
import IconAnt from 'react-native-vector-icons/FontAwesome';
import Product from './Screens/Product';
import CheckOrder from './Compoment/CheckOrder';
import SignIn from './Screens/login';




function mapStateToProps_table(state) {
  return { 
    count: state.count 
  };
}
const color = {
  ACTIVE: '#0033FF',
  INACTIVE: '#000055',
};



const NavigatorStack = createStackNavigator(
  {
    
    Table, Table,
    Categoty, Categoty,
    Product, Product,
    CheckOrder, CheckOrder,
    Order ,Order,
    SignIn , SignIn
  }
);
NavigatorStack.navigationOptions = {
  tabBarLabel: 'Bàn',
  
  tabBarIcon: ({ focused }) => {

    return <IconAnt name="tablet" size={30} color={focused ? color.ACTIVE : color.INACTIVE}>

    </IconAnt>
  }
}
const OrderStack = createStackNavigator({ Order });
OrderStack.navigationOptions = {
  tabBarLabel: 'Giỏ',
  tabBarIcon: ({ focused }) => {
    return <IconAnt 
    name="shopping-cart"  
    size={ 30 } 
    color={ focused ? color.ACTIVE : color.INACTIVE }
    ></IconAnt>
  }
}
// const SettingsStack = createStackNavigator({ Settings })
// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Settings',
//   tabBarIcon: ({ focused }) => {
//     return <IconAnt name="cogs" size={30} color={focused ? color.ACTIVE : color.INACTIVE}>
//     </IconAnt>
//   }
// }

const AppContainerBottom = createBottomTabNavigator({
  
  NavigatorStack,
  OrderStack,
 
  //SettingsStack,
})



export default AppContainer = createAppContainer(AppContainerBottom);