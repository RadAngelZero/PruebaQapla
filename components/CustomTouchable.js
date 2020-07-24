import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class CustomTouchable extends Component {
    render() {
        return (
            <View style={styles.container} >
                <TouchableOpacity>
                    <Text>Eventos</Text>
                </TouchableOpacity>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        height: 50,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
});