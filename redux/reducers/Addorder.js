
import saveCart from '../../api/saveCart';
let cart = {
    arraycart: [],
    isloading: false
}
const handle_cart = (state, action) => {
    let cart_table = [];
    if (state.arraycart.length > 0) {
        const newtable_id = state.arraycart.find(e => e.table_id == action.table_id);
        if (newtable_id != undefined) { // ton tai ban nay trong don hang
            const new_item = newtable_id.list_product.find(e => e.id == action.product_id);
            if (new_item != undefined) { // ton tai sp nay trong ban
                cart_table = state.arraycart.map(e => {
                    if (e.table_id == action.table_id) {
                        return {
                            table_id: e.table_id,
                            Total : e.Total + action.Total,
                            list_product: [
                                {
                                    id: new_item.id,
                                    name: new_item.name,
                                    quantity: new_item.quantity + action.quantity,
                                    price : new_item.price
                                }
                            ]// end listproduct
                        } //end return
                    }
                })// end map
            }
            else {
                const table_temp = state.arraycart.find(e => e.table_id == action.table_id);
                const list_temp = table_temp.list_product.concat(
                    [
                        {
                            id: action.product_id,
                            name: action.nameproduct,
                            quantity: action.quantity,
                            price : action.price
                        }
                    ]
                );
                cart_table = state.arraycart.map(e => {
                    if (e.table_id == action.table_id) {
                        return {
                            table_id: e.table_id,
                            Total : e.Total + action.Total,
                            list_product: list_temp
                        } //end return
                    }
                    else {
                        return e;
                    }
                })// end map

            }
        }//end if
        else {
            cart_table = state.arraycart.concat(
                {
                    table_id: action.table_id,
                    Total :  action.Total,
                    list_product: [
                        { 
                            id: action.product_id,
                            name: action.nameproduct,
                            quantity: action.quantity,
                            price : action.price
                        }
                    ]
                }
            )
        }//end else
    }
    else {
        cart_table = state.arraycart.concat(
            {
                table_id: action.table_id,
                Total :  action.Total,
                list_product: [
                    { 
                        id: action.product_id,
                        name: action.nameproduct,
                        quantity: action.quantity,
                        price : action.price
                    }
                ]
            }
        )
    }

    return cart_table;
}

const remove_item_cart = (state, action) => {
    //debugger;
    let cart_table = [];
    const table_temp = state.arraycart.find(e => e.table_id == action.table_id);
    const list_temp = table_temp.list_product.filter(e =>{
        return e.id != (action.product_id) ;
    })
    if(list_temp.length > 0){
        cart_table = state.arraycart.map(e => {
            if (e.table_id == action.table_id) {
                return {
                    table_id: e.table_id,
                    Total :  e.Total - action.price,
                    list_product: list_temp
                } //end return
            }
            else {
                return e;
            }
        })// end map
    }
    else
    {
        //debugger;
        cart_table = state.arraycart.filter(e => {
           return (e.table_id != action.table_id)
        })// end map
    }
    
    return cart_table;
}
const Addorder = (state = cart, action) => {
    let cart_table = [];
    switch (action.type) {
        case 'ADD_CART':
            cart_table = handle_cart(state, action);
            saveCart(cart_table);
            return { ...state, arraycart: cart_table };
        case 'lOAD_ARR_CART':
                //saveCart([]);
            return { ...state, arraycart: action.arraycart, isloading: action.isloading }
        case 'REMOVE_ITEM':
            cart_table = remove_item_cart(state,action);
            saveCart(cart_table);
            return { ...state, arraycart: cart_table };
        default:
            return state;
    }

}


export default Addorder;