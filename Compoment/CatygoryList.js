import React, { Component } from 'react';
import { View , Text,TouchableOpacity,Alert, Image ,StyleSheet} from 'react-native';
export default class CatygoryList extends  Component {
    render (){
        const {category} = this.props;
        
        return(
            <View  style={{borderBottomWidth:2,alignItems:'center'}}>
                <Image source={{uri:`http://apicoffeeshop.coffeeshop.zanluv.com/images/${category.images}`}} 
                          style={styles.categoryImage}
                ></Image>
                <Text style={styles.TextTable}>{category.CategoryName}</Text> 
            </View>
        );
    }
}

const styles= StyleSheet.create({
    TextTable:{
        fontSize:12,
        fontWeight:'bold',
        textAlign:'center',
        paddingVertical:10,
        color:'#045FB4',
    },
    categoryImage:{
        width:100,
        height:100,
    },
})