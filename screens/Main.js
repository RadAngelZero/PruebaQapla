import React, { Component } from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Events from './Events';
import Matches from './Matches';
import Profile from './Profile';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import CustomTouchable from '../components/CustomTouchable';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const MyTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        // primary: 'rgb(2, 201, 162)',
        background: '#111322'
    },
};


export default class Main extends Component {
    render() {
        return (
            <NavigationContainer theme={MyTheme}>
                <TopBar />
                <Tab.Navigator
                    initialRouteName="Events"

                    activeColor='#52C1B3'
                    tabBarOptions={
                        {
                            activeTintColor: '#52C1B3',
                            inactiveTintColor: '#74827f',
                            showIcon: true,
                            indicatorStyle: {
                                flex: 1,
                                // flexGrow:2
                                flexDirection: 'column',
                                height: 2,
                                backgroundColor: '#52C1B3',
                                // marginBottom:72
                                // marginStart:50
                            },
                            style: {
                                backgroundColor: '#111322'
                            },
                            indicatorContainerStyle: {
                                // borderTopWidth:2,
                            },
                            iconStyle: {
                                width: 40,
                                alignItems: 'center'
                            },
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
            </NavigationContainer>

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
