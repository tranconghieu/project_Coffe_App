import AsyncStorage from '@react-native-community/async-storage';
const getCart = async () =>{
    try {
        const value = await AsyncStorage.getItem('@cart');
        if(value !== null)
        {
            //console.log('lay thanh cong');
            return JSON.parse(value);
            
        }
        else{
            //console.log('du ieu trong');
            return [];
        }
        
    } catch (error) {
        console.log('loi khong lay duoc du lieu');
        return []
    }
}
export default getCart;