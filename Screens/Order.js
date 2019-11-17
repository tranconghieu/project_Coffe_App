import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity
  , FlatList, ActivityIndicator,Alert
} from 'react-native';
import { connect } from 'react-redux';
import Order_Item from '../Compoment/Order_item';
import add_order from '../api/add_Cart_api';
import saveCart from '../api/saveCart';
import saveToken from '../api/saveToken';
import getCart from '../api/get_cart';
import getTokent from '../api/getToken';
class Order extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount() {
    getCart().then(arr => {
      this.props.dispatch({ type: 'lOAD_ARR_CART', arraycart: arr, isloading: true })
      //console.log(arr,'order')
    });

  }
  render_ActivityIndicator = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }
  render_ListOrder = (arraycart) => {
    return (
      <FlatList
        data={arraycart}
        extraData={this.props}
        renderItem={({ item }) => (
          <Order_Item item_cart_table={item}></Order_Item>
        )}
        keyExtractor={(item, index) => item.table_id}
      ></FlatList>
    )
  }
  add_order_succesfull =(text_massage , callback) =>{
    const { navigation } = this.props;
    //debugger;
      Alert.alert(
        'Thông báo từ máy chủ',
        text_massage,
        [
          {text: 'OK', onPress: () =>{ (typeof(callback) == 'function') && (callback.call(navigation) ) }},
        ]
      );
  }
  async add_order_api() {

    
    const str_token = await getTokent();
    const token =  JSON.parse(str_token).token
    const arr_cart = await getCart();
    const is_success = await add_order(token,arr_cart)
    //debugger
    if (is_success) {
       saveCart([]);
       this.props.dispatch({ type: 'lOAD_ARR_CART', arraycart: [], isloading: true })
       this.add_order_succesfull('Đặt đơn thành công',function(){this.navigate('Table') });
    }
    else {
      alert("Thêm đơn hàng thất bại !")
    }
    // //debugger
      
  }
  login = () => {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.bnt_right}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.text_bnt}>Đăng nhập</Text>
      </TouchableOpacity>
    )
  }
  logout = () => {
    const { navigation } = this.props
    return (
      <TouchableOpacity
        style={styles.bnt_right}
        onPress={() => {
          saveToken('');
          this.props.dispatch({ type: 'LOAD_USER', user: '' });
          navigation.navigate('SignIn')
        }}
      >
        <Text style={styles.text_bnt}>Đăng xuất</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const { headerLeft,View_headerright,text_bnt,bnt_right,View_headerleft,header,from_submit, from_total, text_bnt_order, bnt_order } = styles;
    const { arraycart, isloading } = this.props.cart;
    const item_total = arraycart.map(e => e.Total);
    const { user } = this.props.users;
    let Total = 0;
    if (item_total.length > 0) {
      Total = item_total.reduce((a, b) => a + b);
      //console.log(Total);
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column', }}>
        <View style={header}>
          <View style={View_headerleft}>
            <Text style={headerLeft}>Tất Cả Bàn</Text>
          </View>
          <View style={View_headerright}>
            {
              (user != '') ? this.logout() : this.login()
            }
          </View>
        </View>
        <View style={{ flex: 70, padding: 10 }}>
          {isloading ? this.render_ListOrder(arraycart) : this.render_ActivityIndicator()}
        </View>
        <View style={from_submit}>
          <View style={from_total}>
            <Text style={{}}>Tổng cộng</Text>
            <Text> </Text>
            <Text > {(parseInt(Total)).toLocaleString({ style: 'currency', currency: 'VND' })} đ </Text>
          </View>
          <View style={{ flex: 50, flexDirection: 'row' }}>
            <TouchableOpacity style={bnt_order} onPress={() => this.add_order_api()}>
              <Text style={text_bnt_order}>Đặt đơn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  from_submit: {
    padding: 10,
    flex: 20,
    backgroundColor: '#f7f7f7',
    flexDirection: 'column',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  from_total: {
    justifyContent: 'space-between',
    flex: 50, flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  bnt_order: {
    backgroundColor: '#045FB4',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  text_bnt_order: {
    color: '#ffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  header: {
    flex: 10, borderBottomWidth: 3,
    borderColor: '#dcdcdc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerLeft: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18
  },
  container: {
    flex: 1,
    flexDirection: 'column',

  },
  headerLeft: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  },
  View_headerleft: {
    paddingLeft: 20,
    alignItems: 'center'
  },
  View_headerright: {
    paddingRight: 20
  },
  bnt_right: {
    backgroundColor: '#045FB4',
    borderRadius: 3,
    paddingVertical: 6,
    paddingHorizontal: 7
  },
  text_bnt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13
  }

})


export default connect(state => ({ cart: state.cart, users: state.user }))(Order)