import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, StyleSheet, TextInput, CheckBox } from 'react-native';
import {connect} from 'react-redux';
import Modal from 'react-native-modalbox';

 class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responseJson: '',
      ProductName: '',
      isOpen: false,
      counter: 1,
      Total :  parseInt(this.props.product.Price)
    }
  }
  up = () => {
    this.setState({ counter: this.state.counter + 1 ,Total : parseInt(this.state.Total) + parseInt(this.props.product.Price) })
  }
  down = () => {
    if(this.state.counter > 1){
      this.setState({ counter: this.state.counter - 1 ,Total : parseInt(this.state.Total) - parseInt(this.props.product.Price) })
    }
  }
  product_add_to_cart = () =>{
    const  {counter,Total} = this.state;
    const {product , table_id} = this.props;
    this.props.dispatch({
      type : 'ADD_CART',
      table_id :  table_id,
      product_id : product.id,
      nameproduct : product.ProductName,
      quantity : counter,
      price : product.Price,
      Total : Total
    });

    //console.log(this.props.cart , 'list product')
  }

  render() {
    const { product,table_id } = this.props;
    //console.log('Product List ' ,product);
    return (
      <View style={styles.itemContent}>
        <Modal
          style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"} >
          <View style={{ padding: 10 }}>
            <View>
              <Text style={{ color: '#045FB4', fontSize: 15, fontWeight: 'bold' }} >{product.ProductName}</Text>
            </View>
            <View style={styles.priceText}>
              <Text style={{ color: 'red' }}>Giá: {product.Price} VND</Text>
              {/* <Text>$99.9</Text> giam giá */}
              
            </View>

          </View>
          <View style={{ flexDirection: 'row', width: 300,paddingHorizontal:10,paddingVertical:5 }}>
            <TouchableOpacity style={styles.Down} onPress={() => this.down()}>
              <Text style={{color:'#fff'}}>-</Text>
            </TouchableOpacity>
            <View style={{width: 50, borderWidth: 1, height: 30,
             borderRadius: 6,marginLeft : 5,marginRight:5, alignItems: 'center',justifyContent: 'center',}}>
              <Text style={{   }}>
              {this.state.counter}
              </Text>
            </View>
            <TouchableOpacity style={styles.Up} onPress={() => this.up()} >
              <Text style={{color:'#fff'}}>+</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', marginLeft: 'auto',marginVertical:10,   }}>
              <Text style={{ marginLeft: 'auto'}}>
                Total:<Text style={{ color: '#0B0B3B', fontWeight: 'bold', }}>{this.state.Total}</Text>
                </Text>
            </View>
            
          </View>
          <View style={{ flexDirection: 'row',paddingLeft:10}}>
                <TouchableOpacity style={styles.label} onPress={()=>this.product_add_to_cart()}>
                  <Text style={{textAlign: 'center' ,color:'#ffff'}}
                >Lưu vào bàn</Text></TouchableOpacity>
              </View>
        </Modal>
        <View style={styles.iconContainer}>
          <Image source={{ uri: `http://coffeeshop.zanluv.com/lbr/images/${product.Image}` }} style={styles.categoryImage}
          ></Image>
        </View>
        <View style={styles.textContainer}>
          <Text style={{ color: '#045FB4', fontSize: 15, fontWeight: 'bold' }}>{product.ProductName}</Text>
          <View style={styles.downText}>
            <View style={styles.priceText}>
              <Text style={{ marginRight: 10, color: 'red' }}>Giá: {(parseInt(product.Price)).toLocaleString({ style: 'currency', currency: 'VND' })} đ</Text>
              {/* <Text>$99.9</Text> giam giá */}
            </View>
          </View>
          <View style={styles.labelchon}>
            <TouchableOpacity
              onPress={() => this.refs.modal4.open()} style={styles.btnModal}>
                <Text style={{ textAlign: 'center' ,color:'#ffff' }}>Chọn món.
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>


    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    paddingLeft: 10,
    paddingTop: 10,

  },
  container: {
    marginTop: 24,
  },
  itemContent: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    height: 150
  },
  textContainer: {
    flex: 7,
    padding: 10,
    marginLeft:20
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
    backgroundColor: '#045FB4',
    padding: 5,
    width: 100,
    borderRadius: 5,
  },
  labelchon: {
    backgroundColor: '#045FB4',
   
    padding: 5,
    width: 100,
    // marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  categoryImage: {
    height: 100,
    width: 100,
  },
  Down: {
    backgroundColor: '#585858',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginRight: 1,
    width: 40,
    height: 30,

  },
  Up: {
    backgroundColor: '#585858',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginLeft: 1,
    width: 40,
    height: 30,
  },


});

export default connect(state =>({data: state.data }))(ProductList)