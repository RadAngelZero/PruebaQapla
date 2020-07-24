import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, } from 'react-native';

export default class BottomBar extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }
    onPress = () => {
        console.log('pressed');
        this.setState({
            count: this.state.count + 1
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={{ flex: 1, }} underlayColor='#12226e' onPress={this.onPress}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#02c9a2' }}>Eventos</Text>
                    </View >
                </TouchableHighlight>

                <TouchableHighlight style={{ flex: 1, }} underlayColor='#12226e' onPress={this.onPress}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#ffffff' }}>Partidas</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight style={{ flex: 1, }} underlayColor='#12226e' onPress={this.onPress}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#ffffff' }}>Perfil</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});