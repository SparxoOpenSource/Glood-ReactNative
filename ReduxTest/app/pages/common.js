import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, ScrollView, TouchableOpacity, Image, NativeModules, PropTypes, Platform, Dimensions }  from 'react-native';
import isAndroid from '../utils/isAndroid.js';
import {EventListener} from "../listener/EventListener";
import {fontSizeAndroid} from "../utils/CommonUtils.js";
var {height, width} = Dimensions.get('window');

var _navigator;
var _title = "我是导航";

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object,
    page: PropTypes.string,
    rightType: PropTypes.string
};

export class Common extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuW: 26,
            menuH: 23
        }
    }
    renderBackImage() {
        if (this.props.page === "Main") {
            return (
                <Image source={require('../img/menu.png') } style={{
                    width: 26,
                    height: 28
                }}  />
            );
        } else {
            return (
                <Image source={require('../img/back.png') } style={{
                    width: 26,
                    height: 23
                }}  />
            );
        }
    }
    renderRightIMG() {
        switch (this.props.rightType) {
            case "Up":
                return <Image source={require('../img/up.png') } style={styles.ImagStyle}  />
            case "Down":
                return (
                    <View style={{
                        flexDirection: 'row', width: 34,
                        height: 23,
                        marginTop: 4
                    }}>
                        <Image source={require('../img/down_1.png') } style={{
                            width: 18, height: 8,
                            marginTop: 5
                        }}  />
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 14, height: 14,
                            borderRadius: 7,
                            backgroundColor: "red",
                            marginBottom: 8,
                            marginLeft: 2
                        }}>
                            <Text style={{
                                fontSize: fontSizeAndroid(10),
                                color: 'white',
                                fontFamily: 'ProximaNova-Regular',
                                backgroundColor: '#00000000'
                            }}>16</Text>
                        </View>
                    </View>);
            case "Share":
                return <Image source={require('../img/share.png') } style={styles.ImagStyle}  />
            default:
                return <Image source={require('../img/none.png') } style={styles.ImagStyle}  />
        }
    }
    //监听手机自带返回按钮
    render() {
        return (
            <View>
                <View style = {styles.view}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                    }} onPress={this._onBack.bind(this) }>
                        {this.renderBackImage() }
                    </TouchableOpacity>
                    <View style={styles.TextStyle2}>
                        <Text style={styles.TextStyle} numberOfLines={1}>{this.props.title}</Text>
                    </View>
                    <TouchableOpacity onPress={this.UpAndDown.bind(this) } style={{
                        alignItems: 'center',
                    }} >
                        {this.renderRightIMG() }
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onBack() {
        if (this.props.page === "Main") {
            EventListener.trigger("Drawer", "Open");
        } else {
            EventListener.trigger("RecordStop");
            this.props.navigator.pop();
        }
    }
    UpAndDown() {

    }
}
Common.PropTypes = propTypes;
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#00000000',
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    ImagStyle: {
        width: 26,
        height: 23
    },
    TextStyle: {
        fontSize: fontSizeAndroid(22),
        color: 'black',
        fontFamily: 'ProximaNova-Regular',
        backgroundColor: '#00000000',
    },
    TextStyle2: {
        width: width - 26 - 26 - 15 - 15 - 20,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000',
    }
});