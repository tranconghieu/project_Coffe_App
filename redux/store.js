
import { createStore, combineReducers } from 'redux';
import Addorder from './reducers/Addorder';
import Table_Data from './reducers/Table_Data';
import load_user from './reducers/userReducer';

const reducers = combineReducers({
    data: Table_Data,
    cart: Addorder,
    user : load_user
})
const store = createStore(reducers);

export default store
