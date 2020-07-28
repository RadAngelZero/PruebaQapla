import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Events extends Component {
    render() {
        return (
            <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#ffffff', textAlign: 'center' }}>
                    Pantalla de Eventos
                </Text>
            </View>
        )
    }
}