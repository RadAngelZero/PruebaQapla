import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Matches extends Component {
    render() {
        return (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', textAlign: 'center' }}>
                    Pantalla de Partidas
                </Text>
            </View>
        )
    }
}