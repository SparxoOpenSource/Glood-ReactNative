import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, ScrollView, TouchableOpacity, Image, NativeModules, PropTypes, Platform }  from 'react-native';
import isAndroid from '../utils/isAndroid.js';
import {EventListener} from "../listener/EventListener";
import {fontSizeAndroid} from "../utils/CommonUtils.js";

var _navigator;
var _title = "我是导航";

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object,
    page: PropTypes.string
};

export class Common extends Component {

    renderBackImage() {
        if (this.props.page === "Main") {
            return (
                <Image source={require('../img/menu.png') } style={styles.ImagStyle}  />
            );
        }
        return (
            <Image source={require('../img/back.png') } style={styles.ImagStyle}  />
        );
    }
    //监听手机自带返回按钮
    render() {
        return (
            <View>
                <View style = {styles.view}>
                    <TouchableOpacity onPress={this._onBack.bind(this) }>
                        {this.renderBackImage() }
                    </TouchableOpacity>
                    <Text style={styles.TextStyle}>{this.props.title}</Text>
                    <TouchableOpacity>
                        <Image source={require('../img/none.png') } style={styles.ImagStyle}  />
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
}
Common.PropTypes = propTypes;
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#00000000',
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    ImagStyle: {
        width: 26,
        height: 23,
    },
    TextStyle: {
        fontSize: fontSizeAndroid(26),
        color: 'black',
        fontFamily: 'Myriad Pro',
        backgroundColor: '#00000000',
    }
});