import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, SafeAreaView, TextInput, Button, KeyboardAvoidingView } from 'react-native';

const colors = require('../../assets/colors.json');

const DATA = [
    {
        id: '00-rad',
        streamer: 'RadAngelZero',
        platform: 'twitch'
    },
    {
        id: '01-fer',
        streamer: 'feryfer',
        platform: 'twitch'
    },
    {
        id: '02-die',
        streamer: 'Diewoo',
        platform: 'twitch'
    },
    {
        id: '03-kap',
        streamer: 'kapaQui',
        platform: 'facebook'
    },
    {
        id: '04-cat',
        streamer: 'catSkull',
        platform: 'facebook'
    },
    {
        id: '05-zen',
        streamer: 'Zenifo720',
        platform: 'twitch'
    },
    {
        id: '06-die',
        streamer: 'Diego_Ludus',
        platform: 'twitch'
    },
    {
        id: '07-rst',
        streamer: 'RST_Resident',
        platform: 'twitch'
    },
]

class StreamerButton extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <TouchableHighlight
                style={[{ borderRadius: 20, padding: 10, width: '40%', alignItems: 'center' }, this.props.style]}
                onPress={() => this.props.onPress()}
                // () => {
                // this.selectedId = item.id;
                // console.log(backgroundColor)
                // if (item.id === this.selectedId) {
                //     backgroundColor = '#291947';
                // } else {
                //     backgroundColor = color[item.platform];
                // }
                // }
                // }
                underlayColor={colors[this.props.item.platform + 'Selected']}
            >
                <Text style={{ color: '#fff' }}>{this.props.item.streamer}</Text>
            </TouchableHighlight >
        )
    }
}

class StreamersSeparator extends Component {
    render() {
        return (
            <View style={{ height: 10 }}>

            </View>
        )
    }
}

// class NextButton extends Components {
//     render () {
//         return(

//         )
//     }
// }

export default class SelectStreamer extends Component {
    constructor(props) {
        super(props)
    }

    state = {
        selectedId: 'none',
        selectedIndex: -1,
        customStreamerName: '',
        customPlatform: '',
        nextDisabled: true
    }

    enableNext = (selectedIndex, customStreamerName, customPlatform) => {

        if ((customPlatform && customStreamerName != '') || selectedIndex >= 0) {
            this.setState({ nextDisabled: false })
        }
        else {
            this.setState({ nextDisabled: true })
        }
    }

    RenderItem = ({ item, index }) => {
        var style = {};
        if (item.id === this.state.selectedId) {
            style = {
                backgroundColor: colors[item.platform + 'Selected'],
                borderWidth: 2,
                borderColor: colors.aqua
            }
        } else {
            style = {
                backgroundColor: colors[item.platform],
                borderWidth: 0
            }
        }
        // console.log(buttonStyle(backgroundColor));
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}>
                <StreamerButton
                    item={item}
                    onPress={() => { this.setState({ selectedId: item.id, selectedIndex: index }); this.enableNext(index); }}
                    style={style}
                    selectedId={this.state.selectedId}
                    selectedIndex={this.state.selectedIndex}
                    index={index}
                />
            </View>
        )
    }

    afiliatedStreamers = () => {
        var customBackground = customBackground = this.state.selectedIndex >= 0 ? colors.backgroundHighlight : colors.background;

        return (
            <View
                style={{
                    borderWidth: 2,
                    borderColor: colors.aqua,
                    width: '80%',
                    // height: '60%',
                    paddingVertical: 0,
                    borderRadius: 20,
                    alignItems: 'center',
                    backgroundColor: customBackground,
                }}
            >
                <FlatList
                    data={DATA}
                    renderItem={this.RenderItem}
                    keyExtractor={(item) => item.id}
                    extraData={this.state.selectedId}
                    style={{ width: '100%', borderRadius: 20, height: 300 }}
                    showsVerticalScrollIndicator={true}
                    ItemSeparatorComponent={StreamersSeparator}
                    bounces={true}
                    indicatorStyle={'white'}
                />
            </View>
        )
    }

    customPlatform = () => {
        var twitchBackground = colors.twitch;
        var facebookBackground = colors.facebook;
        var twitchBorderWidth = 0;
        var facebookBorderWidth = 0;
        var customBackground = customBackground = this.state.selectedId == 'custom' ? colors.backgroundHighlight : colors.background;
        if (this.state.selectedId == 'custom') {
            twitchBackground = this.state.customPlatform === 'twitch' ? colors.twitchSelected : colors.twitch;
            facebookBackground = this.state.customPlatform === 'facebook' ? colors.facebookSelected : colors.facebook;
            twitchBorderWidth = this.state.customPlatform === 'twitch' ? 2 : 0;
            facebookBorderWidth = this.state.customPlatform === 'facebook' ? 2 : 0;
        }

        return (
            <View
                style={{
                    alignItems: 'center',
                    marginTop: 10,
                    borderWidth: 2,
                    borderColor: colors.aqua,
                    borderRadius: 20,
                    width: '80%',
                    alignSelf: 'center',
                    padding: 5,
                    backgroundColor: customBackground,
                }}
            >
                <View>
                    <Text style={{ color: '#fff', marginBottom: 5 }}>OTRO STREAMER</Text>
                </View>
                <TextInput
                    style={{
                        borderColor: colors.aqua,
                        borderWidth: 2,
                        width: '50%',
                        fontSize: 15,
                        color: '#000',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: 5,
                        backgroundColor: colors.aquaInactive
                    }}
                    value={this.value}
                    onChangeText={tx => { this.setState({ customStreamerName: tx }); this.enableNext(-1, tx, this.state.customPlatform); }}
                    onFocus={() => { this.setState({ selectedId: 'custom', selectedIndex: -1, nextEnabled: true }); this.enableNext(-1, this.state.customStreamerName, this.state.customPlatform); }}
                    onBlur={() => console.log('deselected')}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20 }}>
                    <View style={{ marginHorizontal: 20, width: '35%' }}>
                        <TouchableHighlight
                            style={{ backgroundColor: twitchBackground, borderRadius: 20, padding: 10, alignItems: 'center', borderColor: colors.aqua, borderWidth: twitchBorderWidth }}
                            onPress={() => {
                                this.setState({ customPlatform: 'twitch', selectedId: 'custom', selectedIndex: -1 });
                                this.enableNext(-1, this.state.customStreamerName, 'twitch');
                            }}
                            underlayColor={colors.twitchSelected}
                        >
                            <Text style={{ color: '#fff', fontSize: 15 }}>Twitch</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{ marginHorizontal: 20, width: '35%' }}>
                        <TouchableHighlight
                            style={{ backgroundColor: facebookBackground, borderRadius: 20, padding: 10, alignItems: 'center', borderColor: colors.aqua, borderWidth: facebookBorderWidth }}
                            onPress={() => {
                                this.setState({ customPlatform: 'facebook', selectedId: 'custom', selectedIndex: -1 });
                                this.enableNext(-1, this.state.customStreamerName, 'twitch');
                            }}
                            underlayColor={colors.facebookSelected}
                        >
                            <Text style={{ color: '#fff', fontSize: 15 }}>Facebook</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }

    NextButton = () => {

        var nextButtonBackground = this.state.nextDisabled ? colors.blueDisabled : colors.blue;

        return (
            <View style={{ marginBottom: 10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <TouchableHighlight
                        style={{ backgroundColor: nextButtonBackground, borderRadius: 20, padding: 10, width: '30%', alignItems: 'center' }}
                        disabled={this.state.nextDisabled}
                        underlayColor={colors.blueHighlight}
                        onPress={() => {
                            // console.log(this.props.navigation);
                            this.props.navigation.navigate('Exange',
                                {
                                    streamerId: this.state.selectedId,
                                    streamerIndex: this.state.selectedIndex,
                                    customStreamerName: this.state.customStreamerName,
                                    customPlatform: this.state.customPlatform,
                                    data: DATA,
                                    Qoins: this.props.route.params.Qoins
                                })
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 15 }}>Siguiente</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View>
                    <View style={{ marginTop: 20, marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff', fontSize: 30 }}>STREAMERS</Text>
                    </View>
                    <View style={{ justifyContent: 'flex-start', }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ color: '#fff', fontSize: 20 }}>AFILIADOS</Text>
                            </View>
                            <this.afiliatedStreamers />
                            <View style={{ width: '75%' }}>
                                <Text style={{ color: '#9f9f9f', fontSize: 15, textAlign: 'center' }}>
                                    Al apoyar a streamers afiliados te descontamos el <Text style={{ color: colors.aqua }}>10%</Text> de los <Text style={{ color: colors.aqua }}>Qaploins</Text> que gastes
                                </Text>
                            </View>
                            </View>
                            <this.customPlatform />
                        </View>
                    </View>
                    <this.NextButton />
                </View>
        )
    }
}