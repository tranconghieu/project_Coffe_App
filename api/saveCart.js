

import AsyncStorage from '@react-native-community/async-storage';
const saveCart = async (cartArray) => {
    try {
        await AsyncStorage.setItem('@cart',JSON.stringify(cartArray));
    }
    catch(error){
        console.log(error);
    }
}

export default saveCart;