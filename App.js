import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import Main from './screens/Main';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import SelectStreamer from './screens/ScreensRedeem/SelectStreamer';
import SelectExange from './screens/ScreensRedeem/SelectExange';

const Stack = createNativeStackNavigator();

const colors = require('./assets/colors.json');

const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    // primary: 'rgb(2, 201, 162)',
    background: colors.background
  },
};

enableScreens();

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name='Main'
              component={Main}
            />
            <Stack.Screen 
              name='Streamer'
              component={SelectStreamer}
            />
            <Stack.Screen
              name='Exange'
              component={SelectExange}
            />
          </Stack.Navigator>
        </NavigationContainer>
        {/* Set status bar transparent with light content */}
        <StatusBar backgroundColor='#00000000' translucent={true} barStyle='light-content' />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
