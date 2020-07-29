import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Modal } from 'react-native';
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
        this.setState({ selectedExange: this.prevPlatform });
        if (this.data.streamerIndex >= 0) {
            this.setState({ TwitchSubPrize: (this.state.TwitchSubPrize - (this.state.TwitchSubPrize * this.state.discount)) })
            this.setState({ QoinsBase: this.state.QoinsBase - (this.state.QoinsBase * this.state.discount), QoinsToUse: this.state.QoinsBase - (this.state.QoinsBase * this.state.discount) })
        }
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
        selectedMoment: '',
        discount: 0.10,
        finalRedeemWindowVisible: false
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setFinalRedeemWindowVisible = (visible) => {
        this.setState({ finalRedeemWindowVisible: visible });
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

    ExangeMomentHandler = () => {

        var iNotifyBackground = this.state.selectedMoment == 'i notify' ? colors.backgroundHighlight : colors.background
        var asapBackground = this.state.selectedMoment == 'asap' ? colors.backgroundHighlight : colors.background

        return (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                            backgroundColor: iNotifyBackground
                        }}
                        onPress={() => {
                            this.ExangeMomentManager('i notify')
                        }}
                        underlayColor={colors.backgroundClicked}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Yo decido (Notificare cuando quiera que se haga la transaccion)</Text>
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
                            backgroundColor: asapBackground
                        }}
                        onPress={() => {
                            this.ExangeMomentManager('asap')
                        }}
                        underlayColor={colors.backgroundClicked}
                    >
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Lo antes posible (Cuando el streamer este en linea)</Text>
                    </TouchableHighlight>
                </View>
            </View >
        )
    }

    ExangeSelectionHandler = () => {

        var bitsStarsBackground = this.state.selectedExange == 'bits/stars' ? colors.backgroundHighlight : colors.background;
        var subBackground = this.state.selectedExange == 'sub' ? colors.backgroundHighlight : colors.background;

        var disableSub = this.data.Qoins < this.state.TwitchSubPrize;
        var subBorder = disableSub ? colors.aquaInactive : colors.aqua;
        var subTextColor = disableSub ? '#858585' : '#fff';

        var bitsTextColor = this.streamerPlatform == 'twitch' ? '#fff' : '#858585';
        var starsTextColor = this.streamerPlatform == 'facebook' ? '#fff' : '#858585';

        var twitchButton;
        var disableBitsStars = this.streamerPlatform == 'facebook';

        var minusDisabled = this.state.Mult == 1;
        var minusViewColor = minusDisabled ? colors.blueDisabled : colors.blue;
        var minusSimbolColor = minusDisabled ? '#858585' : '#fff';
        var plusDisabled = this.data.Qoins < (this.state.QoinsBase * (this.state.Mult + 1));
        var plusViewColor = plusDisabled ? colors.blueDisabled : colors.blue;
        var plusSimbolColor = plusDisabled ? '#858585' : '#fff';

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
                            <Text style={{ color: subTextColor, fontSize: 20, textAlign: 'center' }}>Suscripción Twitch</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons name='currency-usd' size={20} color={subTextColor} />
                                <View style={{ marginLeft: -5 }}>
                                    <Text style={{ color: subTextColor, fontSize: 20, textAlign: 'center' }}>{this.state.TwitchSubPrize}</Text>
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
                                <TouchableHighlight style={{ backgroundColor: minusViewColor, borderRadius: 30, marginHorizontal: 20 }}
                                    onPress={() => { this.QoinsManager(-1); this.ExangeSelectionManager('bits/stars') }}
                                    disabled={minusDisabled}
                                    underlayColor={colors.blueHighlight}
                                >
                                    <MaterialCommunityIcons name='minus' color={minusSimbolColor} size={30} />
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
                                <TouchableHighlight style={{ backgroundColor: plusViewColor, borderRadius: 30, marginHorizontal: 20 }}
                                    onPress={() => { this.QoinsManager(1); this.ExangeSelectionManager('bits/stars') }}
                                    disabled={plusDisabled}
                                    underlayColor={colors.blueHighlight}
                                >
                                    <MaterialCommunityIcons name='plus' color={plusSimbolColor} size={30} />
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

    redeemButton = () => {

        var disabled = (this.state.selectedExange != '' && this.state.selectedMoment != '') ? false : true;
        var background = disabled ? colors.blueDisabled : colors.blue;

        return (
            <View style={{ marginTop: 20, justifyContent: 'center', flex: 1 }}>
                <TouchableHighlight
                    style={{
                        backgroundColor: background,
                        borderRadius: 20,
                        padding: 10,
                        width: 100,
                        alignItems: 'center'
                    }}
                    disabled={disabled}
                    underlayColor={colors.blueHighlight}
                    onPress={() => {
                        this.setFinalRedeemWindowVisible(true)
                    }}
                >
                    <Text style={{ color: '#fff', fontSize: 15 }}>Canjear</Text>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', alignItems: 'center' }}>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.finalRedeemWindowVisible}
                    onRequestClose={() => {
                        this.setState({ finalRedeemWindowVisible: false })
                    }}
                    statusBarTranslucent={true}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center', backgroundColor: '#00000060' }}>
                        <View style={{ backgroundColor: colors.background, margin: 20, borderRadius: 20, padding: 35 }}>
                            <View>
                                <Text style={{ textAlign: 'center', fontSize: 40, color: '#fff' }}>CONFIRMACIÓN</Text>

                                <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'center', marginBottom: 15, alignItems: 'center' }}>
                                    <View style={{}}>
                                        <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>
                                            Se canjearan <Text style={{ color: colors.aqua }}>{this.state.selectedExange == 'bits/stars' ? this.state.QoinsToUse : this.state.TwitchSubPrize}</Text> Qaploins {'\n'}
                                            por <Text style={{ color: this.streamerPlatform == 'twitch' ? colors.twitchHighlight : colors.facebookHighlight }}>{this.state.selectedExange == 'bits/stars' ? this.streamerPlatform == 'twitch' ? (this.state.BitsToExange + ' Bits') : (this.state.StarsToExange + ' Estrellas') : 'una subscripción a Twitch'}</Text>{'\n'}
                                            en el canal de <Text style={{ color: this.streamerPlatform == 'twitch' ? colors.twitchHighlight : colors.facebookHighlight }}>{this.streamerName}</Text> en la plataforma <Text style={{ color: this.streamerPlatform == 'twitch' ? colors.twitchHighlight : colors.facebookHighlight }}>{this.capitalizeFirstLetter(this.streamerPlatform)}</Text> {'\n'}
                                            {this.state.selectedMoment == 'asap' ? 'tan pronto como el streamer este en linea' : 'cuando tu nos indiques que quieras realizar la transacción'}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{}}>
                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.setFinalRedeemWindowVisible(false)
                                                }}
                                                style={{ backgroundColor: colors.nope, borderRadius: 20, padding: 10 }}
                                                underlayColor={colors.nopeHighlight}
                                            >
                                                <Text style={{ color: '#fff' }}>CANCELAR</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                    <View style={{ marginHorizontal: 10 }}>
                                        <View style={{}}>
                                            <TouchableHighlight
                                                onPress={() => {
                                                    this.setFinalRedeemWindowVisible(false);
                                                    this.props.navigation.navigate('Main',
                                                        {
                                                            QaploinsUsed: this.state.QoinsToUse
                                                        });
                                                    this.props.route.params.transactionDoneFunction(this.state.selectedExange == 'bits/stars' ? this.state.QoinsToUse : this.state.TwitchSubPrize);
                                                }}
                                                style={{ backgroundColor: colors.blue, borderRadius: 20, padding: 10 }}
                                                underlayColor={colors.blueHighlight}
                                            >
                                                <Text style={{ color: '#fff' }}>CONFIRMAR</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={{ marginTop: 30, marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 30 }}>INTERCAMBIO</Text>
                    <Text style={{ color: '#fff', fontSize: 15 }}>Qaploins disponibles: {this.data.Qoins}</Text>
                    <Text style={{ color: '#fff', fontSize: 15 }}>Streamer: {this.streamerName}</Text>
                    <Text style={{ color: '#fff', fontSize: 15 }}>Plataforma: {this.capitalizeFirstLetter(this.streamerPlatform)}</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <this.ExangeSelectionHandler />
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 20 }}>Canjear cuando</Text>
                        <this.ExangeMomentHandler />
                    </View>
                </View>
                <this.redeemButton />
            </View >
        )
    }

}