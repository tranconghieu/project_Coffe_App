import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Button, Image, styles, Alert } from 'react-native';
import CatygoryList from '../Compoment/CatygoryList';

export default class Categoty extends Component {
  static navigationOptions = ({ navigation }) => {

    return {
      title: navigation.getParam('categoryName'),
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

  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
    }
  }
  componentDidMount() {
    fetch(`http://apicoffeeshop.coffeeshop.zanluv.com/get_type.php`)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          categorys: responseJson,
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    const { navigation } = this.props;
    const table_id = navigation.getParam('table_id');
    const { categorys } = this.state;
    return (
      <View style={{ flex: 1,
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,}}
        >
         
        <FlatList
          numColumns={2}
          data={categorys}
          renderItem={({ item }) =>
            <View style={{  flex: 1,
              paddingTop: 30,
              paddingBottom: 16,
              paddingHorizontal: 20,
              alignContent: 'center'}}>
              <TouchableOpacity onPress={() => navigation.navigate('Product', {
                categoryName: item.CategoryName,
                categoryId: item.id,
                table_id : table_id
              })}>
                <CatygoryList category={item}>
                </CatygoryList>
              </TouchableOpacity>
            </View>

          }
          keyExtractor={(item) => `${item.id}`
          }
        />
      
      </View>
      

    );
  }
}
