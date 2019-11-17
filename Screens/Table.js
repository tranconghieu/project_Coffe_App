import React from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Alert, View, Text, Image } from 'react-native';
import CategoryListItem from '../Compoment/TableListItem';
import Get_Table from '../api/get_table';
import { connect } from 'react-redux';
import getCart from '../api/get_cart';
import saveToken from '../api/saveToken';

class Table extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
            isloading: false
        };
    }

    componentDidMount() {
        // cap nhat du lieu lien tuc
        const { navigation } = this.props;
        setInterval(this.refresh_table.bind(this), 2000);
        Get_Table
            .then(res => {
                this.props.dispatch({ type: 'load_table', Table: res, navigation: navigation });
            })
            .done(
                getCart().then(arr => {
                    this.props.dispatch({ type: 'lOAD_ARR_CART', arraycart: arr, isloading: true })
                })
            );
    }
    refresh_table() {
        const { navigation } = this.props;
        this.setState({ isloading: true });
        fetch('http://apicoffeeshop.coffeeshop.zanluv.com/table.php')
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);
                if (JSON.stringify(responseJson) != JSON.stringify(this.props.data.Table)) {
                    this.props.dispatch({ type: 'load_table', Table: responseJson, navigation: navigation });
                    this.setState({ isloading: false });
                }

            })


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
        const { navigation } = this.props;
        const { user } = this.props.users;
        const tables = this.props.data.Table;

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.View_headerleft}>
                        <Text style={styles.headerLeft}>Tất Cả Bàn</Text>
                    </View>
                    <View style={styles.View_headerright}>
                        {
                            (user != '') ? this.logout() : this.login()
                        }
                    </View>
                </View>
                <View style={{ flex: 89, addingLeft: 16, }}>
                    <FlatList
                        numColumns={2}
                        data={tables}
                        extraData={this.state.isloading}
                        renderItem={({ item }) =>
                            <View style={styles.rapwar}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Categoty', { table_id: item.id })}>
                                    <CategoryListItem table={item}>
                                    </CategoryListItem>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', width: 300, }}>

                                </View>
                            </View>

                        }
                        keyExtractor={(item) => `${item.id}`}
                    />
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
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
    rapwar: {
        flex: 1,
        paddingTop: 30,
        paddingBottom: 16,
        // paddingHorizontal: 20,
        alignContent: 'center'


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
export default connect(state => ({ data: state.data, users: state.user }))(Table);