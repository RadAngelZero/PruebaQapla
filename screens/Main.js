import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Events from './ScreensMain/Events';
import Matches from './ScreensMain/Matches';
import Profile from './ScreensMain/Profile';
import TopBar from '../components/Main/TopBar';
import BottomBar from '../components/BottomBar';

const colors = require('../assets/colors.json');

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const MyTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        // primary: 'rgb(2, 201, 162)',
        background: colors.background
    },
};


export default class Main extends Component {
    constructor(props) {
        super(props)
        this.stackNav = props.navigation;
    }
    render() {
        // console.log(this.stackNav);
        return (
            <View style={{ flex: 1 }}>
                {/* <NavigationContainer theme={MyTheme} independent={true}> */}
                    <TopBar />
                    <Tab.Navigator
                        backBehavior='history'
                        initialRouteName="Events"
                        activeColor={colors.aqua}
                        tabBarOptions={
                            {
                                activeTintColor: colors.aqua,
                                inactiveTintColor: colors.aquaInactive,
                                showIcon: true,
                                indicatorStyle: {
                                    height: 2,
                                    backgroundColor: colors.aqua,
                                    // marginBottom:72  //if enabled, top indicator
                                },
                                style: {
                                    backgroundColor: colors.background
                                },
                                indicatorContainerStyle: {
                                    // borderTopWidth:2,
                                },
                                iconStyle: {
                                    width: 40,
                                    alignItems: 'center'
                                },
                                pressColor: colors.background //if enabled, no Touchable Opacity
                            }
                        }
                        tabBarPosition='bottom'

                    >
                        <Tab.Screen
                            name='Events'
                            component={Events}
                            options={{
                                tabBarLabel: 'Eventos',
                                tabBarIcon: ({ color }) => (
                                    <MaterialCommunityIcons name="ballot-outline" color={color} size={26} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name='Matches'
                            component={Matches}
                            options={{
                                tabBarLabel: 'Partidas',
                                tabBarIcon: ({ focused, color }) => (
                                    <MaterialCommunityIcons name="controller-classic" color={color} size={26} />
                                ),
                            }}
                        />
                        <Tab.Screen
                            name='Profile'
                            component={Profile}
                            options={{
                                tabBarLabel: 'Perfil',
                                tabBarIcon: ({ focused, color }) => (
                                    <MaterialCommunityIcons name="account-circle-outline" color={color} size={26} />
                                ),
                            }}
                        />
                    </Tab.Navigator>
                    {/* <BottomBar /> */}
                {/* </NavigationContainer> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'space-between',
    },
});
