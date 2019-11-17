import  AsyncStorage  from '@react-native-community/async-storage';
const saveToken = async (token) => {
    const data_user =  JSON.stringify(token);
    try {
        await AsyncStorage.setItem('@token',data_user);
    }
    catch(error){
        console.log(error);
    }
}

export default saveToken;