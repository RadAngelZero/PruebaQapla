import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Image, Button, Modal } from 'react-native';
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
    render() {
        return (
            <View>
                <Text style={{ color: '#fff' }}>Transacciones</Text>
            </View>
        )
    }
}

class ProfileButtons extends Component {

    constructor(props) {
        super(props)
        this.navigation = props.navigation;
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
                <View style={{}}>
                    <TouchableHighlight
                        onPress={() => {
                            this.navigation.dangerouslyGetParent().navigate('Streamer', { Qoins: this.props.Qoins });
                        }}
                        style={{ backgroundColor: colors.blue, borderRadius: 20, padding: 10 }}
                        underlayColor={colors.blueHighlight}
                    >
                        <Text style={{ color: '#fff' }}>CANJEAR</Text>
                    </TouchableHighlight>
                </View>
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
        this.navigation = props.navigation;
        this.Qoins = 600;
    }

    state = {
        buyWindowVisible: false,
    }

    setBuyWindowVisible = (visible) => {
        this.setState({ buyWindowVisible: visible })
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
                            Alert.alert("Modal has been closed.");
                        }}
                        statusBarTranslucent={true}
                    >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center', backgroundColor: '#00000060' }}>
                            <View style={{ backgroundColor: colors.background, margin: 20, borderRadius: 20, padding: 35 }}>
                                <View>
                                    <Text style={{ textAlign: 'center' }}>Webos</Text>
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
                                                        this.Qoins = this.Qoins + 300;
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
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize: 26, marginLeft: -6 }}>{this.Qoins}</Text>
                        </View>

                        <ProfileButtons buyWindowVisible={this.setBuyWindowVisible} navigation={this.navigation} Qoins={this.Qoins} />

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