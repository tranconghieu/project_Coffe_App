import React, { Component } from 'react';
import { View , Text,TouchableOpacity,Alert, Image ,StyleSheet} from 'react-native';
export default class CategoryListItem extends  Component {
    render (){
       const {table} = this.props;

        return(
            <View style={{flex:1,alignItems:'center'}}>      
                    {(table.status == '0') ? <Image source={require('../images/round-table.png')}></Image> : <Image source={require('../images/table-used.png')}></Image>}
                    <Text style={styles.TextTable}>{table.Name}</Text> 
                    {/* <TouchableOpacity style={styles.signUpStyle} >
                        <Text style={{color:'#fff'}}>Hóa Đơn {table.Name}</Text>
                     </TouchableOpacity> */}
            </View>
        );
    }
}

const styles= StyleSheet.create({
    TextTable:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        paddingVertical:10,
        color:'#045FB4',
        width:100,
        

        
    },
    signUpStyle: {
        backgroundColor: '#045FB4',
        height:30,
       padding:10,
       textAlign:'center',
       justifyContent:'center'
       
      },
})