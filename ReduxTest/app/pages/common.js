import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, ScrollView, TouchableOpacity, Image, NativeModules, PropTypes,
    BackAndroid, Platform }  from 'react-native';
import {NaviGoBack} from '../utils/CommonUtils';
import Portal from 'react-native/Libraries/Portal/Portal.js';
import isAndroid from '../utils/isAndroid.js';

var _navigator;
var _title = "我是导航";
let tag;

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class Common extends Component {
    //监听手机自带返回按钮
    constructor() {
        super();
        this.goBack = this.goBack.bind(this);
    }
    componentWillMount() {
        if (isAndroid()) {
            tag = Portal.allocateTag();
        }
    }
    goBack() {
        if (Portal.getOpenModals().length != 0) {
            Portal.closeModal(tag);
            return true;
        }
        return NaviGoBack(this.props.navigator);
    }
    componentDidMount() {
        if (isAndroid()) {
            BackAndroid.addEventListener('hardwareBackPress', this.goBack);
        }
    }

    componentWillUnmount() {
        if (isAndroid()) {
            BackAndroid.removeEventListener('hardwareBackPress', this.goBack);
        }
    }
    //监听手机自带返回按钮
    render() {
        return (
            <View>
                <View style = {styles.view}>
                    <TouchableOpacity onPress={this._onBack.bind(this) }>
                        <Image source={require('../img/back.png') } style={styles.ImagStyle}  />
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
        this.props.navigator.pop();
    }
}
Common.PropTypes = propTypes;
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#999999',
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    ImagStyle: {
        width: 26,
        height: 26,
    },
    TextStyle: {
        fontSize: 18,
        color: '#FFFFFF',
    }
});