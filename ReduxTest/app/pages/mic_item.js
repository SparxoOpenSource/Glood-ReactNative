import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, PropTypes}  from 'react-native';

import {RecordAudio} from "../utils/RecordAudio";
var ss = 70;
var tt = 70;

const propTypes = {
    title: PropTypes.string
};

export class MicItem extends Component {
    render() {
        return (
            <View style={ { justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title) } ref="view">
                    <Image source={{ uri: "http://192.168.31.162:8081/app/img/171604419.jpg" } } style={style.img}  />
                </TouchableOpacity>
            </View>
        );
    }

    _onPress(value) {
        // var ss=this.refs.view.style.width;
        // if(ss===300){
        //     return;
        // }
        LayoutAnimation.configureNext({
            duration: 10000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 10000
            }
        });
        ss = ss + 250;
        this.refs.view.setNativeProps({
            style: { width: ss, height: tt, justifyContent: "center" }
        })
        this._play(value);
    }

    //播放声音
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            _this._voiceCallBack(back);
        });
    }

    _voiceCallBack(call) {
        Alert.alert(call["name"]);
    }
}

MicItem.propTypes = propTypes;
const style = StyleSheet.create({
    touch: {
        marginLeft: 10,
        marginRight: 10,
        width: 70,
        height: 70,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: "#999999"

    },
    img: {
        width: 70,
        height: 70,
        borderWidth: 0,
        borderRadius: 35,
    }
});