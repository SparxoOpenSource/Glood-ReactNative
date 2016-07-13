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
    DeviceEventEmitter }  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import {fontSizeAndroid} from "../utils/CommonUtils.js";
import {RecordAudio} from "../utils/RecordAudio";

import {QRCodeScreen} from './QRCodeScreen';

var {height, width} = Dimensions.get('window');

const propTypes = {
    navigator: PropTypes.object,
    title: PropTypes.string
};
export class QrcodeReader extends Component {
    constructor() {
        super();
        this.state = {
            content: "You can join a community by scanning\nthe QR code from your tickets",
            torchMode: 'on',
            cameraType: 'back',
        }
    }
    render() {
        return (
            <Image style={{ width: width, height: height, flexDirection: "column", }} source={require('../img/background3.png') }>
                <Common navigator={this.props.navigator} title={this.props.title} page="NoMain"/>
                <View style={{
                    flexDirection: "column",
                }}>
                    {this.returnView() }
                    <Text style={{
                        fontSize: fontSizeAndroid(17),
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

    returnView() {
            return (
                <QRCodeScreen style={{
                    borderRadius: 4,
                    width: width - 80,
                    height: width - 80,
                    marginLeft: 40,
                    marginRight: 40,
                    marginTop: 66,
                }}
                    onBarCodeRead={this.onBarCodeRead.bind(this) }
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType}/>
            );
        }
}
QrcodeReader.propTypes = propTypes