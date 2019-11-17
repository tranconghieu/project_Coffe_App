import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet, TextInput } from 'react-native';
import Modalall from './Addmodal';
export default class ProductList extends Component {
    render() {
        const { product } = this.props;
        return (

         
            <View style={styles.itemContent}>
                <View style={styles.iconContainer}>
                     <Image source={{ uri: `apicoffeeshop.coffeeshop.zanluv.com/apiCoffeeShop/images/${product.Image}` }}
                        style={styles.categoryImage}
                    ></Image>
                </View>
                <View style={styles.textContainer}>
                    <Text style={{color:'#045FB4',fontSize:15,fontWeight:'bold'}}>{product.ProductName}</Text>
                    <View style={styles.downText}>
                        <View style={styles.priceText}>
                            <Text style={{ marginRight: 10,color:'red' }}>Giá: {product.Price} VND</Text>
                            {/* <Text>$99.9</Text> giam giá */}
                        </View>

                        {/* <View style={styles.label}>
                            <Text>Label</Text>
                        </View> */}
                    </View>
                </View>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    iconContainer: {
       paddingLeft:10,
       paddingTop:10,
       },
    container: {
      marginTop: 24,
    },
    itemContent:  {
       flexDirection: 'row',
       paddingTop:20,
    },
    textContainer: {
      flex: 7,
      padding: 10,
    },
    downText: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
  
    priceText: {
      flexDirection: 'row',
    },
    label: {
      textAlign: 'right',
      backgroundColor: 'yellow',
      padding: 3
    },
    categoryImage:{
        height:100,
        width:100,
    }
  });
