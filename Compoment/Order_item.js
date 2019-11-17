import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Button, Dimensions,
  TouchableOpacity, FlatList
} from 'react-native';

import Swipeout from 'react-native-swipeout';
import IconAnt from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
const width = Math.round(Dimensions.get('window').width);


class Order_Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      activeRowkey: null,
    }
  }
  onShow = () => {
    this.setState({ isShow: !this.state.isShow });
  }
  remove_item = (table_id , id,price) => {
    this.props.dispatch({
      type : 'REMOVE_ITEM',
      table_id :  table_id,
      product_id : id,
      price : price
    });
  }
  child_item = (item,table_id)=>{
    const { item_cart } = styles;
    const price = parseInt(item.quantity) * parseInt(item.price);
   
    const SwipeoutSetting = {
      autoClose: true,
      backgroundColor: '#ffff',
      right: [//thuoc tinh cua cai nut ben phai listitem
        {
          onPress: () => {
            //alert(table_id);
            this.remove_item(table_id, item.id,price)
          },
          text: 'Xóa', type: 'delete'// value nut
        }
      ],//end right 
      sectionId: 1
    };
    return (
      <Swipeout {...SwipeoutSetting}>
        <View style={item_cart}>
          <View><Text >{item.name}</Text></View>
          <View><Text>Số lượng : {item.quantity}</Text></View>
        </View>
      </Swipeout>
    );
  }
  
  render() {
    const { style_table_id, quantity, vv_title, title_table, model_detail } = styles;
    const { table_id, list_product } = this.props.item_cart_table;
    //console.log(list_product);
    const arr_total = list_product.map(e => e.quantity);
    const total_table = arr_total.reduce((a, b) => a + b);
    return (
      
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <TouchableOpacity onPress={() => { this.onShow() }}>
          <View style={style_table_id}>
            <View style={vv_title} >
              <View style={quantity}><Text style={{ color: '#045FB4' }}>{total_table}x</Text></View>
              <Text style={title_table}>Bàn B{table_id}</Text>
              {this.state.isShow ?<IconAnt name="angle-double-up" size={20} ></IconAnt> : <IconAnt name="angle-double-down" size={20} ></IconAnt>}
            </View>
          </View>
        </TouchableOpacity>
        <View style={this.state.isShow ? model_detail : { display: "none" }}  >
          <FlatList
            data={list_product}
            renderItem={({ item }) => (
                this.child_item(item , table_id)
            )}
            keyExtractor={(item, index) => item.id}
          ></FlatList>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  style_table_id: {
    width: width - 20,
    //flex:10,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#045FB4',
    justifyContent: 'center',

  },
  model_detail: {
    width: width - 20,
    //flex:90,
    flexDirection: "column",
    borderWidth: 1,
    marginBottom: 10,

    borderColor: '#5555',
    paddingVertical: 10,
  },
  vv_title: {
    //margin:10,
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  item_cart: {
    //borderBottomWidth: 1,
    minHeight: 40,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

    alignItems: 'center'
  },
  quantity: {
    borderWidth: 1, paddingHorizontal: 5, paddingVertical: 5
  },
  title_table: {
    color: '#111',
    fontSize: 18
  },
  detail_bnt: {
    backgroundColor: '#045FB4',
    padding: 5,
    width: 100,
    borderRadius: 5,
  },
  bnt_text_detail: {
    textAlign: 'center', color: '#ffff'
  },
  product_name: {
    color: '#045FB4',
  },

})


export default connect()(Order_Item)