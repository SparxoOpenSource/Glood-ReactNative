import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ListView,
    Alert,
    ScrollView,
    TouchableOpacity,
    Image,
    NativeModules,
    PropTypes,
    Platform,
    Dimensions
} from 'react-native';
import { EventListener } from "../listener/EventListener";
import { fontSizeAndroid } from "../utils/CommonUtils.js";
var { height, width } = Dimensions.get('window');
import Singleton from '../utils/Singleton';
import isAndroid from '../utils/isAndroid.js';
var singleton = new Singleton();
const propTypes = {
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
                <Image source={require('../img/menu.png')} style={{
                    width: 26,
                    height: 28,
                    marginLeft: 15
                }} />
            );
        } 
        else if(this.props.page === "Delete"){
            return (
                <Image source={require('../img/back.png')} style={{
                    width: 26,
                    height: 23,
                    marginLeft: 15
                }} />
            );
        }
        else {
            return (
                <Image source={require('../img/back.png')} style={{
                    width: 26,
                    height: 23,
                    marginLeft: 15
                }} />
            );
        }
    }
    renderRightIMG() {
        switch (this.props.rightType) {
            case "Up":
                return <Image source={require('../img/up.png')} style={styles.ImagStyle} />
            case "Down":
                return (
                    <View style={{
                        flexDirection: 'row', width: 36,
                        height: 23,
                        marginTop: 4,
                        marginRight: 15
                    }}>
                        <Image source={require('../img/down_1.png')} style={{
                            width: 18, height: 8,
                            marginTop: 5
                        }} />
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 16, height: 16,
                            borderRadius: 8,
                            backgroundColor: "red",
                            marginTop: -3,
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
                return <Image source={require('../img/share.png')} style={styles.ImagStyle} />
            default:
                return <Image source={require('../img/none.png')} style={styles.ImagStyle} />
        }
    }
    //监听手机自带返回按钮
    render() {
        return (
            <View>
                <View style={styles.view}>
                    <TouchableOpacity style={{
                        justifyContent: 'center', width: 70, height: 64
                    }} onPress={this._onBack.bind(this)}>
                        {this.renderBackImage()}
                    </TouchableOpacity>
                    <View style={styles.TextStyle2}>
                        <Text style={styles.TextStyle} numberOfLines={1}>{singleton.getTitle()}</Text>
                    </View>
                    <TouchableOpacity onPress={this.UpAndDown.bind(this)} style={{
                        alignItems: 'center', width: 70, height: 64, justifyContent: 'center'
                    }} >
                        {this.renderRightIMG()}
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
            singleton.getNav().pop();
        }
    }
    UpAndDown() {

    }
}
Common.PropTypes = propTypes;
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#00000000',
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    ImagStyle: {
        width: 26,
        height: 23,
        marginRight: 15
    },
    TextStyle: {
        fontSize: fontSizeAndroid(22),
        color: 'black',
        fontFamily: 'ProximaNova-Regular',
        backgroundColor: '#00000000',
    },
    TextStyle2: {
        width: width - 70 - 70 - 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000000',
    }
});