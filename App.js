import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Main from './screens/Main';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>

        {/* Set status bar transparent with light content */}
        <StatusBar backgroundColor='#00000000' translucent={true} barStyle='light-content' />
        <Main />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111322',
  },
});
