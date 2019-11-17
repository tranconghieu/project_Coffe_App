import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import ProductList from '../Compoment/ProducList';
import IconAnt from 'react-native-vector-icons/FontAwesome';
class Product extends Component {
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
      products: [],
    }
  }
  componentDidMount() {
    const categoryId = this.props.navigation.getParam('categoryId');
    fetch(`http://apicoffeeshop.coffeeshop.zanluv.com/product_by_type.php/?id_type=${categoryId}`)

      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          products: responseJson,
        }, function () {
        });
        //console.log('---------------------------->',responseJson)
      })
      .catch((error) => {
        console.error(error);
      });
  }
  Acess_order = () => {
    const { navigation } = this.props.data;
    navigation.navigate('Order');
  }

  render() {
    const { navigation } = this.props;
    const counter_cart = this.props.cart.arraycart.length
    console.log( counter_cart , 'product');
    const table_id = navigation.getParam('table_id');
    
    return (

      <View style={styles.wrapper}>

        <FlatList
          data={this.state.products}
          renderItem={({ item }) =>
            <View style={{ borderBottomWidth: 1, }}>
              <ProductList product={item} table_id={table_id}></ProductList>

            </View>
          }
          keyExtractor={(item) => `${item.id}`}

        >
        </FlatList>
        <View style={styles.shopping_cart}>
          <TouchableOpacity onPress={() => { this.Acess_order() }}>
            <IconAnt name="shopping-cart" size={30} color={"#ffff"}></IconAnt>
          </TouchableOpacity>
          {(counter_cart > 0) ? 
          <View style = {styles.counter}>
              <Text style ={{color:'#ffff',fontSize :10 , fontWeight: 'bold'}}>
                {counter_cart}
              </Text>
          </View>
          : <View></View>}
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  shopping_cart: {
    backgroundColor: '#045FB4', width: 45, height: 40, position: "absolute"
    , right: 10, bottom: 10, justifyContent: "center", alignItems: 'center',
    borderRadius: 4,
    borderColor : '#000',
    borderWidth:1
  },
  counter :{
    position : "absolute" , backgroundColor : 'red'  , borderRadius:7
    , right : 1,top :-7,
    width : 15,
    justifyContent:'center',
    alignItems : 'center',
    height : 15,

  },

  wrapper: {

    flex: 1
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal4: {
    height: 200
  },
  btnModal: {
    backgroundColor: 'aqua',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    width: 100,
    padding: 3,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10
  },

  text: {
    color: "black",
    fontSize: 22
  }

});

export default connect(state => ({ data: state.data ,cart : state.cart}))(Product)