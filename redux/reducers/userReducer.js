
let defaultState = {
    user : null
}
const load_user = (state = defaultState, action) =>{
    switch (action.type) {
        case 'LOGIN_USER':
            return { ...state,user : action.user }
        case 'LOAD_USER':
            return { ...state,user : action.user }
        default:
            return state;
    }
}

export default load_user;