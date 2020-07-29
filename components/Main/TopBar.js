import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TopBar extends Component {
    render() {
        return (
            <View style={styles.container} >
                <View style={{ flex: 1, flexDirection:'row', justifyContent:'flex-start', marginLeft: 20, }}>
                    <Text style={{ color: '#ffffff' }}> QaplaLogo</Text>
                </View>
                {/* Add space between logo and the interactable icons */}
                {/* <View style={{ flexGrow: 1 }} /> */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent:'flex-end', marginRight: 20, }}>
                    <View style={{ marginHorizontal: 10 }} >
                        <Text style={{ color: '#ffffff' }}>Bell</Text>
                    </View>
                    <View style={{ marginHorizontal: 10 }} >
                        <Text style={{ color: '#ffffff' }}>Disc</Text>
                    </View>
                    <View style={{ marginLeft: 10 }} >
                        <Text style={{ color: '#ffffff' }}>Opts</Text>
                    </View>
                </View>
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