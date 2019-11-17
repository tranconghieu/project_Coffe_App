import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
export default class CheckOrder extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('ProductName'),
          headerStyle: {
            backgroundColor: '#045FB4',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 0.9,
            justifyContent: 'center',
            alignSelf: 'center',
          },
        };
    
      }
  render() {
    const { product } = this.props;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Chọn </Text>
      </View>
    );
  }
}