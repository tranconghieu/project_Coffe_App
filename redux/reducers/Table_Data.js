
let defaultState = {
    Table: [],
    isloading: false,
    navigation: []
}

const Table_Data = (state = defaultState, action) => {
    switch (action.type) {
        case "load_table":
            // console.log(action.navigation);
            return { ...state, Table: action.Table, navigation: action.navigation };
        default:
            return state;
    }
};

export default Table_Data