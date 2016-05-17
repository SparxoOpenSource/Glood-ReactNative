import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, PropTypes}  from 'react-native';

import {RecordAudio} from "../utils/RecordAudio";

const propTypes = {
    title: PropTypes.string
};

export class MicItem extends Component {
    constructor() {
        super();
        this.state = {
            w: 70,
            h: 70
        }
    }

    render() {
        return (
            <View style={ { justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title) } ref="view">
                    <Image source={{ uri: "http://192.168.31.162:8081/app/img/background.png" } } style={style.img2}  >
                        <View style={[style.touch2, { width: this.state.w, height: this.state.h }]} >
                            <Image source={{ uri: "http://192.168.31.162:8081/app/img/171604419.jpg" } } style={style.img}  />
                        </View>
                    </Image>

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
        this.setState({
            w: this.state.w + 250,
            h: this.state.h + 4,
            justifyContent: 'center'
        })
        this._play(value);
    }

    //播放声音
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            // _this._voiceCallBack(back);
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
        marginTop: 10,
        width: 320,
        height: 74,
        flexDirection: 'row',
        borderRadius: 37,
        backgroundColor: "#999999",
        justifyContent: 'center',
        alignItems: 'center'
    },
    touch2: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#99999950",
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 70,
        height: 70,
        borderWidth: 0,
        borderRadius: 35,
    },
    img2: {
        width: 320,
        height: 74,
        borderWidth: 0,
        borderRadius: 37,
        justifyContent: 'center',
        alignItems: 'center'
    }
});