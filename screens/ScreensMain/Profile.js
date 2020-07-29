import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Button, Modal, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DarkTheme, useNavigation } from '@react-navigation/native';

const colors = require('../../assets/colors.json');
const Tab = createMaterialTopTabNavigator();
const MyTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        // primary: 'rgb(2, 201, 162)',
        background: colors.background
    },
};

var TransactionsData = [
    {
        id: '04-cat-1234',
        streamer: 'catSkull',
        platform: 'facebook',
        exangeType: 'stars',
        qaploinsUsed: '300',
        exangeGotted: '150',
        date: '28-07-20',
        moment: 'asap',
        status: 'pending',
    },
    {
        id: 'buy-qaploins-123',
        exangeType: 'buy',
        exangeGotted: '600',
        date: '28-07-20'
    },
    {
        id: '01-fer-aa11',
        streamer: 'feryfer',
        platform: 'twitch',
        exangeType: 'bits',
        qaploinsUsed: '300',
        exangeGotted: '100',
        date: '28-07-20',
        moment: 'i notify',
        status: 'pending',
    },
    {
        id: '05-zen-bb22',
        streamer: 'Zenifo720',
        platform: 'twitch',
        exangeType: 'bits',
        qaploinsUsed: '600',
        exangeGotted: '205',
        date: '25-07-20',
        moment: 'asap',
        status: 'completed',
    },
    {
        id: 'rewardevent-qaploins-123',
        exangeType: 'reward',
        exangeGotted: '50',
        date: '24-07-20'
    },
    {
        id: '00-rad-cc33',
        streamer: 'RadAngelZero',
        platform: 'twitch',
        exangeType: 'sub',
        qaploinsUsed: '1750',
        date: '10-07-20',
        moment: 'i notify',
        status: 'completed',
    },
]

class Stats extends Component {
    render() {
        return (
            <View>
                <Text style={{ color: '#fff' }}>Estadisticas</Text>
            </View>
        )
    }
}

class Transactions extends Component {

    RenderItem = ({ item, index }) => {

        var cancelHandler = (<View></View>)
        if (item.status == 'pending') {
            cancelHandler = (
                <View style={{ alignSelf: 'flex-end', backgroundColor: '#f00', padding: 10, borderRadius: 20, width: 76, alignItems: 'center', marginRight: -20 }}>
                    <Text style={{ color: '#fff' }}>Cancelar</Text>
                </View>
            )
        }

        var backgroundColor;
        var render = (<View></View>)
        var dataShow = (<View></View>)

        if (item.exangeType == 'reward' || item.exangeType == 'buy') {
            var type = item.exangeType == 'reward' ? 'Recompensa' : 'Compra'
            backgroundColor = colors.aqua;
            dataShow = (
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginHorizontal: 10, width: 85 }}>
                        <Text style={{ color: '#000' }}>{type}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10 }}>
                        <View>
                            <MaterialCommunityIcons name='plus' color='#000' size={20} />
                        </View>
                        <View>
                            <MaterialCommunityIcons name='currency-usd' color='#000' size={20} />
                        </View>
                        <View style={{ marginLeft: -5 }}>
                            <Text style={{ fontSize: 15 }}>{item.exangeGotted}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 10, alignSelf: 'flex-end', width: 60, alignItems: 'flex-end' }}>
                        <Text>{item.date}</Text>
                    </View>
                </View>
            )
        } else {
            if (item.status == 'completed') {
                backgroundColor = item.platform == 'twitch' ? colors.twitchSelected : colors.facebookSelected
                var type = item.exangeType == 'sub' ? 'Suscripción' : item.exangeType == 'bits' ? 'Bits' : 'Estrellas'
                dataShow = (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginHorizontal: 10, width: 85 }}>
                                <Text style={{ color: '#fff' }}>{type}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10 }}>
                                <View>
                                    <MaterialCommunityIcons name='minus' color='#fff' size={20} />
                                </View>
                                <View>
                                    <MaterialCommunityIcons name='currency-usd' color='#fff' size={20} />
                                </View>
                                <View style={{ marginLeft: -5 }}>
                                    <Text style={{ fontSize: 15, color: '#fff' }}>{item.qaploinsUsed}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginHorizontal: 10, alignSelf: 'flex-end', width: 60, alignItems: 'flex-end' }}>
                                <Text style={{ color: '#fff' }}>{item.date}</Text>
                            </View>
                        </View>
                    </View>
                )
            } else {
                if (item.platform == 'twitch') {
                    backgroundColor = colors.twitch;
                } else {
                    backgroundColor = colors.facebook
                }

                var type = item.exangeType == 'sub' ? 'Suscripción' : item.exangeType == 'bits' ? 'Bits' : 'Estrellas'

                dataShow = (
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 1, marginHorizontal: 10, width: 85 }}>
                                <Text style={{ color: '#fff' }}>{type}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10, marginLeft: 37 }}>
                                <View>
                                    <MaterialCommunityIcons name='minus' color='#fff' size={20} />
                                </View>
                                <View>
                                    <MaterialCommunityIcons name='currency-usd' color='#fff' size={20} />
                                </View>
                                <View style={{ marginLeft: -5 }}>
                                    <Text style={{ fontSize: 15, color: '#fff' }}>{item.qaploinsUsed}</Text>
                                </View>
                            </View>
                            {cancelHandler}
                            <View style={{ flex: 1, marginHorizontal: 10, alignSelf: 'center', width: 60, alignItems: 'flex-end' }}>
                                <Text style={{ color: '#fff' }}>{item.date}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        }

        return (
            <View style={{ padding: 10, borderRadius: 20, backgroundColor: backgroundColor, }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {dataShow}
                </View>
            </View >
        )
    }

    separator = () => {
        return (
            <View style={{ height: 10 }}>

            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={TransactionsData}
                    renderItem={this.RenderItem}
                    keyExtractor={(item) => item.id}
                    // extraData={this.state.selectedId}
                    style={{ width: '100%', borderRadius: 20, height: 300 }}
                    showsVerticalScrollIndicator={true}
                    ItemSeparatorComponent={this.separator}
                    bounces={true}
                    indicatorStyle={'white'}
                />
            </View>
        )
    }
}

class ProfileButtons extends Component {

    constructor(props) {
        super(props)
        this.navigation = props.navigation;
    }

    state = {

    }

    redeemButton = () => {

        var disableButton = this.props.Qoins < 270;
        var background = disableButton ? colors.blueDisabled : colors.blue

        return (
            <View style={{}}>
                <TouchableHighlight
                    onPress={() => {
                        this.navigation.dangerouslyGetParent().navigate('Streamer',
                            {
                                Qoins: this.props.Qoins,
                                transactionDoneFunction: this.props.transactionDoneFunction
                            });
                    }}
                    style={{ backgroundColor: background, borderRadius: 20, padding: 10 }}
                    underlayColor={colors.blueHighlight}
                    disabled={disableButton}
                >
                    <Text style={{ color: '#fff' }}>CANJEAR</Text>
                </TouchableHighlight>
            </View>
        )

    }

    render() {
        // console.log(this.navigation);
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5 }}>
                <View style={{}}>
                    <TouchableHighlight
                        onPress={() => {
                            this.props.buyWindowVisible(true);
                        }}
                        style={{ backgroundColor: colors.magenta, borderRadius: 20, padding: 10 }}
                        underlayColor={colors.magentaHighlight}
                    >
                        <Text style={{ color: '#fff' }}>ABONAR</Text>
                    </TouchableHighlight>
                </View>
                <this.redeemButton />
                {/* <Text style={{ color: '#fff', textAlign: 'center' }}>Buttons</Text> */}
            </View>

        )
    }
}

class SelectPlatform extends Component {
    render() {
        <View>
            <Text style={{ colore: '#fff' }}>Platform</Text>
        </View>
    }
}

export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.transactionData = props.route.params;
        this.navigation = props.navigation;
    }

    state = {
        Qoins: 600,
        buyWindowVisible: false,
        transactionStatusWindow: false
    }

    setBuyWindowVisible = (visible) => {
        this.setState({ buyWindowVisible: visible })
    }

    showTransactionStatus = () => {
        this.setState({ transactionStatusWindow: true })
    }

    transactionDone = (Qoins) => {
        this.setState({ transactionStatusWindow: true });
        this.discontQoins(Qoins);
    }

    discontQoins = (qoins) => {
        this.setState({ Qoins: this.state.Qoins - qoins });
    }

    render() {
        return (
            <View style={{ flex: 1, paddingTop: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.buyWindowVisible}
                        onRequestClose={() => {
                            this.setBuyWindowVisible(false);
                        }}
                        statusBarTranslucent={true}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center', backgroundColor: '#00000060' }}>
                            <View style={{ backgroundColor: colors.background, margin: 20, borderRadius: 20, padding: 35 }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 40, color: '#fff' }}>Qaploins</Text>

                                    <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'center', marginBottom: 15, alignItems: 'center' }}>
                                        <View>
                                            <MaterialCommunityIcons name='plus' color='#fff' size={30} />
                                        </View>
                                        <View>
                                            <MaterialCommunityIcons name='currency-usd' color='#fff' size={30} />
                                        </View>
                                        <View style={{ marginLeft: -5, }}>
                                            <Text style={{ fontSize: 30, color: '#fff' }}>300</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <View style={{ marginHorizontal: 10 }}>
                                            <View style={{}}>
                                                <TouchableHighlight
                                                    onPress={() => {
                                                        this.setBuyWindowVisible(false);
                                                    }}
                                                    style={{ backgroundColor: colors.nope, borderRadius: 20, padding: 10 }}
                                                    underlayColor={colors.nopeHighlight}
                                                >
                                                    <Text style={{ color: '#fff' }}>CANCELAR</Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                        <View style={{ marginHorizontal: 10 }}>
                                            <View style={{}}>
                                                <TouchableHighlight
                                                    onPress={() => {
                                                        this.setState({ Qoins: this.state.Qoins + 300 });
                                                        this.setBuyWindowVisible(false);
                                                    }}
                                                    style={{ backgroundColor: colors.blue, borderRadius: 20, padding: 10 }}
                                                    underlayColor={colors.blueHighlight}
                                                >
                                                    <Text style={{ color: '#fff' }}>COMPRAR</Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={this.state.transactionStatusWindow}
                        onRequestClose={() => {
                        }}
                        statusBarTranslucent={true}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center', backgroundColor: '#00000060' }}>
                            <View style={{ backgroundColor: colors.background, margin: 20, borderRadius: 20, padding: 35 }}>
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 40, color: '#fff' }}>Transacción exitosa</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                        <View style={{ marginHorizontal: 10 }}>
                                            <View style={{}}>
                                                <TouchableHighlight
                                                    onPress={() => {
                                                        this.setState({ transactionStatusWindow: false })
                                                    }}
                                                    style={{ backgroundColor: colors.blue, borderRadius: 20, padding: 10 }}
                                                    underlayColor={colors.blueHighlight}
                                                >
                                                    <Text style={{ color: '#fff' }}>CONTINUAR</Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', }}>
                        <TouchableHighlight
                            style={{
                                height: 80,
                                width: 80,
                                borderRadius: 40,
                                overflow: 'hidden',
                                borderWidth: 2,
                                borderColor: colors.aqua,
                                alignItems: 'center',
                                alignContent: 'center',
                                justifyContent: 'center'
                            }}>
                            <Image source={require('../../assets/soyadmin.png')}
                                style={{
                                    height: 80,
                                    width: 80,
                                    borderRadius: 40,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}
                            />
                        </TouchableHighlight>
                        <View style={{
                            justifyContent: 'flex-end',
                            marginLeft: 50,
                            marginTop: -20
                        }}>
                            <TouchableHighlight
                                style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 20 / 2,
                                    backgroundColor: colors.gray,
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    justifyContent: 'center'
                                }}>
                                <MaterialCommunityIcons name='pencil-outline' size={10} color='#fff' />
                            </TouchableHighlight>
                        </View>

                        {/* <Text style={{ color: '#fff', textAlign: 'center' }}>PfP</Text> */}
                        <View style={{ paddingTop: 3 }}>
                            <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>RadAngelZero</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='currency-usd' size={32} color='#fff' />
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 26, marginLeft: -6 }}>{this.state.Qoins}</Text>
                        </View>

                        <ProfileButtons buyWindowVisible={this.setBuyWindowVisible} navigation={this.navigation} Qoins={this.state.Qoins} transactionDoneFunction={this.transactionDone} />

                    </View>
                </View>
                <View style={{ flex: 1, paddingTop: 5 }}>
                    <Tab.Navigator
                        backBehavior='none'
                        initialRouteName="Stats"
                        activeColor={colors.aqua}
                        tabBarOptions={{
                            activeTintColor: colors.aqua,
                            inactiveTintColor: colors.aquaInactive,
                            // showIcon: true,
                            indicatorStyle: {
                                height: 2,
                                backgroundColor: colors.aqua,
                                // marginBottom:72  //if enabled, top indicator
                            },
                            style: {
                                backgroundColor: colors.background,
                            },
                            indicatorContainerStyle: {
                                // borderTopWidth:2,
                            },
                            // iconStyle: {
                            //     width: 40,
                            //     alignItems: 'center'
                            // },
                            pressColor: colors.background //if enabled, no Touchable Opacity
                        }}
                    >
                        <Tab.Screen
                            name='Stats'
                            component={Stats}
                            options={{
                                tabBarLabel: 'Estadisticas'
                            }}
                        />
                        <Tab.Screen
                            name='Transactions'
                            component={Transactions}
                            options={{
                                tabBarLabel: 'Transacciones'
                            }}
                        />
                    </Tab.Navigator>
                </View>

                {/* <Text style={{ color: '#ffffff', textAlign: 'center' }}>
                    Pantalla de Perfil
                </Text> */}
            </View>
        )
    }
}