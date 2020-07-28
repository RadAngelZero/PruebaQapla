import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const colors = require('../../assets/colors.json');

export default class SelectExange extends Component {
    constructor(props) {
        super(props)
        this.data = props.route.params;
        this.streamerName = this.data.streamerIndex >= 0 ? this.data.data[this.data.streamerIndex].streamer : this.data.customStreamerName;
        this.streamerPlatform = this.data.streamerIndex >= 0 ? this.data.data[this.data.streamerIndex].platform : this.data.customPlatform;
        this.prevPlatform = this.streamerPlatform == 'facebook' ? 'bits/stars' : '';
    }

    componentDidMount() {
        this.setState({ selectedExange: this.prevPlatform })
    }

    state = {
        QoinsBase: 300,
        BitsBase: 100,
        BitsExtra: 5,
        StarsBase: 150,
        StarsExtra: 10,
        QoinsToUse: 300,
        Mult: 1,
        BitsToExange: 100,
        StarsToExange: 150,
        TwitchSubPrize: 1750,
        selectedExange: '',
        selectedMoment: ''
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    QoinsManager = (multAdd) => {
        this.setState({ QoinsToUse: (this.state.QoinsBase * (this.state.Mult + multAdd)), Mult: (this.state.Mult + multAdd) });
        this.ExangeManager(multAdd);
    }

    ExangeManager = (multAdd) => {
        var extraBits = 0;
        var extraStars = 0;
        if ((this.state.Mult + multAdd) > 1) {
            extraBits = this.state.BitsExtra * (this.state.Mult + multAdd - 1);
            extraStars = this.state.StarsExtra * (this.state.Mult + multAdd - 1);
        } else {
            extraBits = 0;
            extraStars = 0;
        }
        this.setState({
            BitsToExange: (this.state.BitsBase * (this.state.Mult + multAdd) + extraBits),
            StarsToExange: (this.state.StarsBase * (this.state.Mult + multAdd) + extraStars)
        });
    }

    ExangeSelectionManager = (selection) => {
        this.setState({ selectedExange: selection })
    }

    ExangeMomentManager = (moment) => {
        this.setState({ selectedMoment: moment })
    }

    TwitchSubButton = () => {

    }

    ExangeSelectionHandler = () => {

        var bitsStarsBackground = this.state.selectedExange == 'bits/stars' ? colors.backgroundHighlight : colors.background;
        var subBackground = this.state.selectedExange == 'sub' ? colors.backgroundHighlight : colors.background;

        var disableSub = this.streamerPlatform == 'twitch' ? false : true;
        var subBorder = this.streamerPlatform == 'twitch' ? colors.aqua : colors.aquaInactive;

        var bitsTextColor = this.streamerPlatform == 'twitch' ? '#fff' : '#858585';
        var starsTextColor = this.streamerPlatform == 'facebook' ? '#fff' : '#858585';

        var twitchButton;
        var disableBitsStars = this.streamerPlatform == 'facebook' ? true : false

        if (this.streamerPlatform == 'twitch') {
            twitchButton = (
                <View style={{}}>
                    <TouchableHighlight
                        style={{
                            backgroundColor: subBackground,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: subBorder,
                            marginTop: 20
                        }}
                        onPress={() => {
                            this.ExangeSelectionManager('sub')
                        }}
                        disabled={disableSub}
                        underlayColor={colors.backgroundClicked}
                    >
                        <View>
                            <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>Suscripción Twitch</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='currency-usd' size={20} color='#fff' />
                                <View style={{ marginLeft: -5 }}>
                                    <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center' }}>{this.state.TwitchSubPrize}</Text>
                                </View>
                            </View>
                        </View>

                    </TouchableHighlight>
                </View>
            )
        } else {
            twitchButton = (
                <View></View>
            )
        }

        return (
            <View>
                <View>
                    <TouchableHighlight
                        style={{
                            backgroundColor: bitsStarsBackground,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20,
                            borderRadius: 20,
                            borderWidth: 2,
                            borderColor: colors.aqua
                        }}
                        onPress={() => {
                            this.ExangeSelectionManager('bits/stars')
                        }}
                        underlayColor={colors.backgroundClicked}
                        disabled={disableBitsStars}
                    >
                        <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignContent: 'space-around', alignItems: 'center', }}>
                                <TouchableHighlight style={{ backgroundColor: colors.blueDisabled, borderRadius: 30, marginHorizontal: 20 }}
                                    onPress={() => { this.QoinsManager(-1); this.ExangeSelectionManager('bits/stars') }}
                                >
                                    <MaterialCommunityIcons name='minus' color='#858585' size={30} />
                                </TouchableHighlight>
                                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.blueDisabled, paddingHorizontal: 10, borderRadius: 20 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <View style={{ marginTop: 3.5, marginLeft: -8 }}>
                                            <MaterialCommunityIcons name='currency-usd' size={30} color='#fff' />
                                        </View>
                                        <View style={{ marginTop: -2, marginLeft: -5 }}>
                                            <Text style={{ color: '#fff', fontSize: 30 }}>{this.state.QoinsToUse}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableHighlight style={{ backgroundColor: colors.blue, borderRadius: 30, marginHorizontal: 20 }}
                                    onPress={() => { this.QoinsManager(1); this.ExangeSelectionManager('bits/stars') }}
                                >
                                    <MaterialCommunityIcons name='plus' color='#fff' size={30} />
                                </TouchableHighlight>
                            </View>
                            <View>
                                <Text style={{ color: bitsTextColor, fontSize: 20 }}>Bits: {this.state.BitsToExange}</Text>
                            </View>
                            <View>
                                <Text style={{ color: starsTextColor, fontSize: 20 }}>Estrellas: {this.state.StarsToExange}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
                <View>
                    {twitchButton}
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                <View style={{ marginTop: 20, marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>INTERCAMBIO</Text>
                    <Text style={{ color: '#fff', fontSize: 15 }}>Qaploins disponibles: {this.data.Qoins}</Text>
                    <Text style={{ color: '#fff', fontSize: 15 }}>Streamer: {this.streamerName}</Text>
                    <Text style={{ color: '#fff', fontSize: 15 }}>Plataforma: {this.capitalizeFirstLetter(this.streamerPlatform)}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <this.ExangeSelectionHandler />
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Canjear cuando</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableHighlight
                                style={{
                                    padding: 20,
                                    borderWidth: 2,
                                    borderColor: colors.aqua,
                                    borderRadius: 20,
                                    marginTop: 20,
                                    marginHorizontal: 20,
                                    width: '30%',
                                    backgroundColor: colors.backgroundHighlight
                                }}
                            >
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Yo decida (Notificare cuando quiera que se haga la transaccion)</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={{
                                    padding: 20,
                                    borderWidth: 2,
                                    borderColor: colors.aqua,
                                    borderRadius: 20,
                                    marginTop: 20,
                                    marginHorizontal: 20,
                                    width: '30%',
                                    backgroundColor: colors.backgroundHighlight
                                }}
                            >
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Lo antes posible (Cuando el streamer este en linea)</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={{ marginTop: 20, justifyContent: 'center', flex: 1 }}>
                    <TouchableHighlight
                        style={{
                            backgroundColor: colors.blue,
                            borderRadius: 20,
                            padding: 10,
                            width: 100,
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{ color: '#fff', fontSize: 15 }}>Canjear</Text>
                    </TouchableHighlight>
                </View>
            </View >
        )
    }

}