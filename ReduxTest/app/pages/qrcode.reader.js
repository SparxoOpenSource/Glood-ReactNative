import React, {Component} from "react";
import { AppRegistry,
    StyleSheet,
    View,
    Text,
    ListView,
    Alert,
    Navigator,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    LayoutAnimation,
    PropTypes,
    Animated,
    Dimensions,
    DeviceEventEmitter,
    NativeModules}  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import {fontSizeAndroid} from "../utils/CommonUtils.js";
import {RecordAudio} from "../utils/RecordAudio";

import {QRCodeScreen} from './QRCodeScreen';
import BarcodeScanner from 'react-native-barcodescanner';
import {EventListener} from "../listener/EventListener";

const Camera = NativeModules.RNBarcodeScannerView;

var {height, width} = Dimensions.get('window');
var temp = <Text style={{ fontSize: fontSizeAndroid(17), color: "#FFFFFF", fontFamily: "ProximaNova-Light" }}>Please wait...</Text>;

const propTypes = {
    navigator: PropTypes.object,
    title: PropTypes.string
};
export class QrcodeReader extends Component {
    constructor() {
        super();
        this.state = {
            content: "You can join a community by scanning\nthe QR code from your tickets",
            torchMode: 'off',
            cameraType: 'back',
            view: temp
        }
        this.returnView();
    }
    render() {
        return (
            <Image style={{ width: width, height: height, flexDirection: "column", }} source={require('../img/background3.png') }>
                <Common navigator={this.props.navigator} title={this.props.title} page="NoMain"/>
                <View style={{
                    flexDirection: "column",
                }}>
                    <View style={{
                        borderRadius: 4,
                        width: width - 80,
                        height: width - 80,
                        marginLeft: 40,
                        marginRight: 40,
                        marginTop: 66,
                        backgroundColor: "#3E767350",
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {
                            this.state.view
                        }
                    </View>
                    <Text style={{
                        fontSize: isAndroid()?fontSizeAndroid(17):height*(18/736),
                        color: "#000000",
                        marginLeft: 40,
                        marginRight: 40,
                        marginTop: 30,
                        backgroundColor: '#00000000',
                        fontFamily: "ProximaNova-Light",
                        lineHeight: 28,
                        width: width - 80,
                    }}>{this.state.content}</Text>
                </View>
            </Image>
        );
    }
    onBarCodeRead(result) {
        RecordAudio.prototype.recordMsg(result.data);
    }
    componentDidMount() {
        if (isAndroid()) {
            EventListener.on("RecordStop").then(this.stopCamera.bind(this));
        }
    }
    stopCamera() {
        Camera.stopCamera();
    }
    returnView() {
        setTimeout(() => {
            if (isAndroid()) {
                var View =
                    <BarcodeScanner style={{
                        borderRadius: 4,
                        width: width - 80,
                        height: width - 80,
                    }}
                        onBarCodeRead={this.onBarCodeRead.bind(this) }
                        torchMode={this.state.torchMode}
                        cameraType={this.state.cameraType}/>
                this.setState(
                    { view: View }
                );
            } else {
                var View =
                    <QRCodeScreen style={{
                        borderRadius: 4,
                        width: width - 80,
                        height: width - 80,
                    }}
                        onBarCodeRead={this.onBarCodeRead.bind(this) }
                        torchMode={this.state.torchMode}
                        cameraType={this.state.cameraType}/>
                this.setState(
                    { view: View }
                );
            }
        }, 500);
    }
}
QrcodeReader.propTypes = propTypes